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
  gradient?: string;
}

const ProgressCard = ({ title, value, subtitle, icon, trend, className, gradient = "from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]" }: ProgressCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn("p-5 rounded-xl bg-card border border-border hover:border-[hsl(0,84%,55%)]/30 hover:shadow-glow transition-all duration-300 group", className)}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-md", gradient)}>
        {icon}
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-xs text-[hsl(142,69%,45%)] font-medium">
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
      gradient="from-orange-500 to-red-500"
    />
    <ProgressCard
      title="XP Earned"
      value="2,450"
      subtitle="This week: +380"
      icon={<TrendingUp className="w-5 h-5" />}
      trend="+12%"
      gradient="from-yellow-500 to-amber-500"
    />
    <ProgressCard
      title="Lessons Done"
      value="34"
      subtitle="6 remaining in module"
      icon={<BookOpen className="w-5 h-5" />}
      gradient="from-blue-500 to-cyan-500"
    />
    <ProgressCard
      title="Study Hours"
      value="47.5h"
      subtitle="Avg 2.3h per session"
      icon={<Clock className="w-5 h-5" />}
      trend="+8%"
      gradient="from-purple-500 to-pink-500"
    />
  </div>
);

export default ProgressCard;
