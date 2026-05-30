import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pt-20">
      <AdminDashboard />
    </div>
  );
}
