import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, BookOpen, Clock, Flame } from "lucide-react";

interface ProgressCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

const ProgressCard = ({ title, value, subtitle, icon, trend, className }: ProgressCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("p-5 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300 group", className)}
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:shadow-glow transition-all">
        {icon}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs text-success font-medium">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-display font-bold text-foreground">{value}</h3>
    <p className="text-sm font-medium text-foreground mt-0.5">{title}</p>
    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
  </motion.div>
);

export const StatCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <ProgressCard
      title="Current Streak"
      value="14 days"
      subtitle="Best: 21 days"
      icon={<Flame className="w-5 h-5" />}
      trend="+3"
    />
    <ProgressCard
      title="XP Earned"
      value="2,450"
      subtitle="This week: +380"
      icon={<TrendingUp className="w-5 h-5" />}
      trend="+12%"
    />
    <ProgressCard
      title="Lessons Done"
      value="34"
      subtitle="6 remaining in module"
      icon={<BookOpen className="w-5 h-5" />}
    />
    <ProgressCard
      title="Study Hours"
      value="47.5h"
      subtitle="Avg 2.3h per session"
      icon={<Clock className="w-5 h-5" />}
      trend="+8%"
    />
  </div>
);

export default ProgressCard;
