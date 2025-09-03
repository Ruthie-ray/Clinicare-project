import DashboardNav from "@/components/DashboardNav";
import MobileNav from "@/components/MobileNav";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/store";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { user } = useAuth();
  return (
    <div className="bg-slate-100">
      <section className="min-h-screen bg-slate-100 lg:flex mx-auto lg:py-2 lg:px-4">
        <Sidebar user={user} />
        <MobileNav user={user} />
        <div className="lg:ml-[200px] flex-1">
          <DashboardNav user={user} />
          {/* <MobileNav /> */}
          <Outlet />
        </div>
      </section>
    </div>
  );
}
