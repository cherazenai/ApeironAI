
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GuestModeProvider } from "@/hooks/useGuestMode";
import SignupModal from "@/components/SignupModal";
import { Bell, Monitor } from "lucide-react";

// Map routes to readable names
const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/copilot": "Copilot",
  "/dashboard/hypotheses": "Hypothesis Generator",
  "/dashboard/papers": "Paper Library",
  "/dashboard/paper-reader": "AI Paper Reader",
  "/dashboard/simulations": "Simulations",
  "/dashboard/experiments": "Experiments",
  "/dashboard/projects": "Saved Projects",
  "/dashboard/profile": "Profile",
  "/dashboard/settings": "Settings",
};

const DashboardLayout = () => {
  const { user } = useAuth();
  const isGuest = !user;
  const location = useLocation();
  const currentPage = PAGE_TITLES[location.pathname] || "Dashboard";

  return (
    <GuestModeProvider isGuest={isGuest}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background relative">

          {/* Animated grid background */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(191_68%_50%/0.04),transparent_70%)]" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(191 68% 50% / 0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <AppSidebar />

          <div className="flex-1 flex flex-col min-w-0 relative z-10">
            <header className="h-14 flex items-center justify-between border-b border-border/50 px-4 backdrop-blur-xl bg-background/60 sticky top-0 z-30">

              {/* LEFT — trigger + breadcrumb */}
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>ApeironAI</span>
                  <span>/</span>
                  <span className="text-foreground font-medium">{currentPage}</span>
                  {isGuest && (
                    <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      GUEST
                    </span>
                  )}
                </div>
              </div>

              {/* RIGHT — notification bell + avatar */}
              <div className="flex items-center gap-2">
                <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
                  <Bell className="h-4 w-4" />
                  {/* notification dot */}
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors">
                  <Monitor className="h-4 w-4" />
                </button>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer">
                  {user?.user_metadata?.full_name
                    ? user.user_metadata.full_name[0].toUpperCase()
                    : "G"}
                </div>
              </div>

            </header>

            <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
              <Outlet />
            </main>
          </div>

          <SignupModal />
        </div>
      </SidebarProvider>
    </GuestModeProvider>
  );
};

export default DashboardLayout;
