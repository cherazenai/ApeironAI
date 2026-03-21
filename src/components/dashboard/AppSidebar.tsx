import {
  LayoutDashboard, MessageSquare, Lightbulb, BookOpen, FileSearch,
  FlaskConical, TestTubes, FolderKanban, User, Settings, LogOut, UserPlus
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo-icon.png";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Research Copilot", url: "/dashboard/copilot", icon: MessageSquare, badge: "BETA" },
  { title: "Hypothesis Generator", url: "/dashboard/hypotheses", icon: Lightbulb },
  { title: "Paper Library", url: "/dashboard/papers", icon: BookOpen },
  { title: "AI Paper Reader", url: "/dashboard/paper-reader", icon: FileSearch },
  { title: "Simulations", url: "/dashboard/simulations", icon: FlaskConical },
  { title: "Experiments", url: "/dashboard/experiments", icon: TestTubes },
  { title: "Saved Projects", url: "/dashboard/projects", icon: FolderKanban },
];

const accountItems = [
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/50">
      <SidebarContent className="bg-sidebar">

        {/* LOGO */}
        <div className="p-4 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logoIcon} alt="ApeironAI" className="w-8 h-8" />
          {!collapsed && (
            <span className="font-heading text-lg text-foreground tracking-tight">ApeironAI</span>
          )}
        </div>

        {/* USER INFO / GUEST BADGE */}
        {!collapsed && user && (
          <div className="px-4 pb-3">
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        )}
        {!collapsed && !user && (
          <div className="px-4 pb-3 space-y-1">
            <p className="text-xs text-primary/80 font-medium">Guest Mode</p>
            {/* GUEST USAGE COUNTER — matches green version */}
            <p className="text-xs text-muted-foreground">0/3 uses remaining</p>
          </div>
        )}

        <div className="mx-3 border-t border-sidebar-border/30 mb-2" />

        {/* RESEARCH TOOLS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-[0.2em] font-body">
            {!collapsed && "Research Tools"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-all duration-200 group"
                      activeClassName="bg-sidebar-accent text-primary font-medium shadow-[inset_2px_0_0_hsl(var(--primary))]"
                    >
                      <item.icon className="h-4 w-4 group-hover:text-primary transition-colors shrink-0" />
                      {!collapsed && (
                        <span className="flex items-center gap-2 flex-1">
                          {item.title}
                          {/* BETA BADGE — matches green version */}
                          {"badge" in item && item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-primary/20 text-primary leading-none">
                              {item.badge}
                            </span>
                          )}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mx-3 border-t border-sidebar-border/30 my-2" />

        {/* ACCOUNT */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground/60 text-[10px] uppercase tracking-[0.2em] font-body">
            {!collapsed && "Account"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-all duration-200 group"
                      activeClassName="bg-sidebar-accent text-primary font-medium shadow-[inset_2px_0_0_hsl(var(--primary))]"
                    >
                      <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GUEST SIGN UP CTA — matches green version */}
        {!collapsed && !user && (
          <div className="mx-3 mt-2 mb-1 p-3 rounded-xl bg-primary/5 border border-primary/10 space-y-2">
            <p className="text-xs text-muted-foreground leading-snug">
              Sign up to save your research and get unlimited access.
            </p>
            <Button
              size="sm"
              className="w-full glow-button h-8 text-xs"
              onClick={() => navigate("/signup")}
            >
              <UserPlus className="h-3.5 w-3.5 mr-1.5" />
              Sign Up Free
            </Button>
          </div>
        )}

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="bg-sidebar border-t border-sidebar-border/30 p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {!collapsed && <span>Logout</span>}
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <User className="h-4 w-4" />
                {!collapsed && <span>Sign In</span>}
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
                }
