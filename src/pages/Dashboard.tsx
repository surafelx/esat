import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StatCards } from "@/components/ProgressCard";
import Navbar from "@/components/Navbar";
import { 
  ArrowRight, BookOpen, Brain, Sparkles, Target, 
  Trophy, Users, Zap, ChevronRight, Star, Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

const badges = [
  { name: "First Lesson", icon: "🎯", earned: true },
  { name: "Week Streak", icon: "🔥", earned: true },
  { name: "Code Master", icon: "💻", earned: true },
  { name: "Quick Learner", icon: "⚡", earned: true },
  { name: "Collaborator", icon: "🤝", earned: false },
  { name: "AI Explorer", icon: "🧠", earned: false },
];

const recentActivity = [
  { action: "Completed lesson", detail: "Gradient Descent Basics", xp: 50, time: "2h ago" },
  { action: "Submitted assignment", detail: "Linear Regression Implementation", xp: 100, time: "5h ago" },
  { action: "Asked in community", detail: "How does attention mechanism differ...", xp: 10, time: "1d ago" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen gradient-surface">
      <Navbar />
      <main className="container px-6 pt-24 pb-12 md:pt-20">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            Welcome back, Alex 👋
          </h1>
          <p className="text-muted-foreground">
            You're on a <span className="text-primary font-semibold">14-day streak</span>. Keep going!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCards />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Current Progress */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 p-6 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Current Learning Path
              </h2>
              <Link to="/learn" className="text-sm text-primary hover:underline flex items-center gap-1">
                View Roadmap <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">AI Engineering Track</h3>
                  <p className="text-xs text-muted-foreground">Module 3: ML Fundamentals</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-lg font-display font-bold text-primary">42%</span>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "42%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full gradient-primary"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/learn">
                <Button variant="hero" size="lg">
                  <Rocket className="w-4 h-4" />
                  Continue Learning
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="glass" size="lg">
                  <Sparkles className="w-4 h-4" />
                  Ask AI Tutor
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-xl bg-card border border-border"
          >
            <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-xp" />
              Badges
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                    badge.earned
                      ? "bg-xp/5 border-xp/20"
                      : "bg-muted/30 border-border opacity-40"
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-6 rounded-xl bg-card border border-border"
        >
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-2 h-2 rounded-full gradient-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-foreground">{item.action}</span>
                  <span className="text-sm text-muted-foreground"> · {item.detail}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-xp-foreground bg-xp/10 px-2 py-0.5 rounded-full shrink-0">
                  <Star className="w-3 h-3 text-xp" />
                  +{item.xp} XP
                </div>
                <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Career Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-6 rounded-xl gradient-hero text-primary-foreground"
        >
          <h2 className="font-display font-semibold text-lg mb-2 flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Career Opportunities Unlocked
          </h2>
          <p className="text-sm opacity-80 mb-4">
            Completing the AI Engineering path prepares you for roles such as AI Engineer, Applied AI Developer, or Machine Learning Engineer.
          </p>
          <div className="flex flex-wrap gap-2">
            {["AI Engineer", "ML Engineer", "Applied AI Developer", "Data Scientist", "MLOps Engineer"].map((role) => (
              <span
                key={role}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary-foreground/10 border border-primary-foreground/20"
              >
                {role}
              </span>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
