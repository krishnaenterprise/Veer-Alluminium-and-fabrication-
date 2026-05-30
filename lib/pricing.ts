// Estimate / quotation engine. All rates live in `defaultPricing` and can be
// overridden by the CMS (persisted via the content store). The calculator and
// the admin panel both read from this single source of truth.

export type Pricing = {
  currency: string;
  // material base rate per sq.ft
  aluminium: { standard: number; premium: number; heavyDuty: number };
  glass: {
    "5mm": number;
    "8mm": number;
    "10mm": number;
    "12mm": number;
    toughened: number;
    laminated: number;
    reflective: number;
  };
  frameFinish: { white: number; black: number; wood: number; custom: number }; // per sq.ft add-on
  addOns: {
    mosquitoMesh: number;
    premiumHardware: number;
    soundproofGlass: number;
    securityLock: number;
    powderCoating: number;
    acpFinish: number;
  }; // per sq.ft add-on
  labourPerSqft: number;
  installationPerSqft: number;
  transportFlat: number;
  gstPercent: number;
  productFactor: Record<string, number>; // complexity multiplier per product
};

export const defaultPricing: Pricing = {
  currency: "₹",
  aluminium: { standard: 320, premium: 480, heavyDuty: 640 },
  glass: {
    "5mm": 90,
    "8mm": 140,
    "10mm": 190,
    "12mm": 250,
    toughened: 220,
    laminated: 280,
    reflective: 240,
  },
  frameFinish: { white: 0, black: 25, wood: 60, custom: 90 },
  addOns: {
    mosquitoMesh: 45,
    premiumHardware: 80,
    soundproofGlass: 160,
    securityLock: 55,
    powderCoating: 70,
    acpFinish: 130,
  },
  labourPerSqft: 70,
  installationPerSqft: 55,
  transportFlat: 1500,
  gstPercent: 18,
  productFactor: {
    "Sliding Window": 1.0,
    "Casement Window": 1.1,
    "Fixed Window": 0.85,
    "Aluminium Door": 1.2,
    "Glass Door": 1.25,
    Partition: 0.95,
    "Balcony Railing": 1.15,
    "ACP Panel": 1.05,
    "Custom Fabrication": 1.3,
  },
};

export type EstimateInput = {
  product: string;
  aluminiumGrade: keyof Pricing["aluminium"];
  glassType: keyof Pricing["glass"];
  frame: keyof Pricing["frameFinish"];
  widthFt: number;
  heightFt: number;
  quantity: number;
  addOns: Partial<Record<keyof Pricing["addOns"], boolean>>;
};

export type EstimateResult = {
  area: number; // total area sq.ft (incl quantity)
  materialCost: number;
  labourCost: number;
  installationCost: number;
  transportationCost: number;
  subTotal: number;
  gst: number;
  grandTotal: number;
  perUnit: number;
};

export function calculateEstimate(input: EstimateInput, pricing: Pricing = defaultPricing): EstimateResult {
  const unitArea = Math.max(0, input.widthFt) * Math.max(0, input.heightFt);
  const qty = Math.max(1, input.quantity || 1);
  const area = +(unitArea * qty).toFixed(2);

  const factor = pricing.productFactor[input.product] ?? 1;

  const aluRate = pricing.aluminium[input.aluminiumGrade] ?? 0;
  const glassRate = pricing.glass[input.glassType] ?? 0;
  const frameRate = pricing.frameFinish[input.frame] ?? 0;

  const addOnRate = (Object.keys(pricing.addOns) as (keyof Pricing["addOns"])[]).reduce(
    (sum, key) => (input.addOns?.[key] ? sum + pricing.addOns[key] : sum),
    0
  );

  const materialPerSqft = (aluRate + glassRate + frameRate + addOnRate) * factor;

  const materialCost = round(materialPerSqft * area);
  const labourCost = round(pricing.labourPerSqft * area * factor);
  const installationCost = round(pricing.installationPerSqft * area);
  const transportationCost = pricing.transportFlat;

  const subTotal = round(materialCost + labourCost + installationCost + transportationCost);
  const gst = round((subTotal * pricing.gstPercent) / 100);
  const grandTotal = round(subTotal + gst);
  const perUnit = round(grandTotal / qty);

  return { area, materialCost, labourCost, installationCost, transportationCost, subTotal, gst, grandTotal, perUnit };
}

function round(n: number) {
  return Math.round(n);
}

export const productTypes = [
  "Sliding Window",
  "Casement Window",
  "Fixed Window",
  "Aluminium Door",
  "Glass Door",
  "Partition",
  "Balcony Railing",
  "ACP Panel",
  "Custom Fabrication",
] as const;

export const aluminiumGrades = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "heavyDuty", label: "Heavy Duty" },
] as const;

export const glassTypes = [
  { value: "5mm", label: "5mm Clear" },
  { value: "8mm", label: "8mm Clear" },
  { value: "10mm", label: "10mm Clear" },
  { value: "12mm", label: "12mm Clear" },
  { value: "toughened", label: "Toughened" },
  { value: "laminated", label: "Laminated" },
  { value: "reflective", label: "Reflective" },
] as const;

export const frameFinishes = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "wood", label: "Wood Finish" },
  { value: "custom", label: "Custom Color" },
] as const;

export const addOnList = [
  { value: "mosquitoMesh", label: "Mosquito Mesh" },
  { value: "premiumHardware", label: "Premium Hardware" },
  { value: "soundproofGlass", label: "Soundproof Glass" },
  { value: "securityLock", label: "Security Lock" },
  { value: "powderCoating", label: "Powder Coating" },
  { value: "acpFinish", label: "ACP Finish" },
] as const;

export function formatINR(n: number) {
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));
}
