import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BookOpen, MessageSquare, ClipboardCheck, 
  LayoutDashboard, Flame, Home
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/learn", label: "Learn", icon: BookOpen },
  { path: "/chat", label: "AI Tutor", icon: MessageSquare },
  { path: "/assignments", label: "Assignments", icon: ClipboardCheck },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 md:w-20 z-50 glass-card border-r border-border/50 flex flex-col" style={{ background: 'hsla(0,0%,8%,0.95)' }}>
      {/* Logo */}
      <div className="p-3 md:p-4 flex justify-center">
        <Link to="/" className="flex items-center justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center shadow-glow hover:shadow-glow-lg transition-all duration-300">
            <Flame className="w-5 h-5 text-white" />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-2 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 group",
                isActive
                  ? "text-[hsl(0,84%,55%)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5" />
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute inset-0 bg-[hsl(0,84%,55%)]/10 rounded-xl border border-[hsl(0,84%,55%)]/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User avatar at bottom */}
      <div className="p-3 md:p-4 border-t border-border/50 flex justify-center">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center text-xs font-bold text-white">
          A
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
