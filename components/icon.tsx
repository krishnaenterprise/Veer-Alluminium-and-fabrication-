import {
  AppWindow, DoorOpen, MoveHorizontal, Frame, Layers, Building2, PanelsTopLeft,
  Hammer, Fence, PaintRoller, Store, Home, Ruler, BadgeCheck, Users, Cpu, Clock,
  LifeBuoy, type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  AppWindow, DoorOpen, MoveHorizontal, Frame, Layers, Building2, PanelsTopLeft,
  Hammer, Fence, PaintRoller, Store, Home, Ruler, BadgeCheck, Users, Cpu, Clock, LifeBuoy,
};

export function Icon({ name, ...props }: { name: string } & React.ComponentProps<LucideIcon>) {
  const Cmp = map[name] ?? AppWindow;
  return <Cmp {...props} />;
}
