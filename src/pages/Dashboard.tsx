import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { Calendar } from "@/components/ui/calendar";
import { 
  Brain, Trophy, Zap, ChevronRight, Star, Rocket,
  Flame, Clock, Award, TrendingUp, Play, Bell, BookOpen, MessageSquare, Volume2, VolumeX
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const badges = [
  { name: "First Lesson", icon: "🎯", earned: true, color: "from-pink-500 to-rose-500" },
  { name: "Week Streak", icon: "🔥", earned: true, color: "from-orange-500 to-red-500" },
  { name: "Code Master", icon: "💻", earned: true, color: "from-blue-500 to-cyan-500" },
  { name: "Quick Learner", icon: "⚡", earned: true, color: "from-yellow-500 to-amber-500" },
];

const recentActivity = [
  { action: "Completed lesson", detail: "Gradient Descent Basics", xp: 50, time: "2h ago", color: "bg-[hsl(0,84%,55%)]" },
  { action: "Submitted assignment", detail: "Linear Regression", xp: 100, time: "5h ago", color: "bg-[hsl(25,95%,55%)]" },
  { action: "Asked in community", detail: "Attention mechanism", xp: 10, time: "1d ago", color: "bg-[hsl(45,95%,55%)]" },
];

const upcomingEvents = [
  { time: "10:00 AM", title: "AI Fundamentals Review", type: "lesson", color: "bg-blue-500/10 text-blue-500" },
  { time: "2:00 PM", title: "Office Hours - ML", type: "qa", color: "bg-purple-500/10 text-purple-500" },
  { time: "4:30 PM", title: "Peer Study Group", type: "group", color: "bg-green-500/10 text-green-500" },
];

const statButtons = [
  { label: "14 Day Streak", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { label: "2,450 XP", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
  { label: "Lvl 12", icon: Award, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/30" },
  { label: "42% Complete", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
];

const quickActions = [
  { label: "Continue Learning", icon: Play, link: "/learn", color: "text-[hsl(0,84%,55%)]", bg: "bg-[hsl(0,84%,55%)]/10", border: "border-[hsl(0,84%,55%)]/30" },
  { label: "Ask AI Tutor", icon: MessageSquare, link: "/chat", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
];

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        {/* Header with title, stats, and quick actions */}
        <div className="p-4 pb-2">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3"
          >
            <h1 className="text-2xl font-display font-bold text-foreground">
              Welcome back, Alex 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              You're on a <span className="text-[hsl(0,84%,55%)] font-semibold">14-day streak</span>. Keep going!
            </p>
          </motion.div>
          
          {/* Stats + Quick Actions row */}
          <div className="flex gap-2 overflow-x-auto">
            {statButtons.map((stat, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${stat.bg} border ${stat.border} hover:opacity-80 transition-all whitespace-nowrap`}
              >
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm font-medium text-foreground">{stat.label}</span>
              </motion.button>
            ))}
            {/* Quick Actions */}
            {quickActions.map((action, i) => (
              <Link key={i} to={action.link}>
                <motion.button
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${action.bg} border ${action.border} hover:opacity-80 transition-all whitespace-nowrap`}
                >
                  <action.icon className={`w-4 h-4 ${action.color}`} />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </motion.button>
              </Link>
            ))}
          </div>
        </div>

        {/* Big card container */}
        <div className="p-4 pt-2 h-[calc(100vh-120px)]">
          <div className="bg-card border border-border/50 rounded-2xl h-full overflow-hidden flex shadow-lg">
            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-fire">
              {/* Video Progress Wrapper */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-5"
              >
                {/* Video Card */}
                <div className="relative rounded-2xl overflow-hidden border border-[hsl(0,84%,55%)]/30 shadow-glow group">
                  {/* Video Background/Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-[hsl(0,10%,8%)] via-[hsl(0,10%,12%)] to-[hsl(0,10%,15%)] relative">
                    {/* Animated fire particles */}
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 rounded-full"
                          style={{ 
                            left: `${10 + i * 8}%`, 
                            bottom: '10%',
                            background: i % 2 === 0 ? 'hsl(0,84%,55%)' : 'hsl(25,95%,55%)'
                          }}
                          animate={{ 
                            y: [0, -200 - i * 20],
                            opacity: [0.8, 0],
                            scale: [1, 0.3]
                          }}
                          transition={{ 
                            duration: 2 + i * 0.2, 
                            repeat: Infinity, 
                            ease: "easeOut",
                            delay: i * 0.15
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Progress Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,10%,15%)] via-transparent to-transparent" />
                    
                    {/* Center Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center shadow-glow-lg hover:shadow-glow transition-all"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.button>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "42%" }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full rounded-full bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]" 
                      />
                    </div>

                    {/* Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-white" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>

                    {/* Info Overlay */}
                    <div className="absolute bottom-12 left-6 right-6">
                      <h3 className="font-display font-semibold text-lg text-white mb-1">Your Learning Journey</h3>
                      <p className="text-sm text-white/60">42% complete • AI Engineering Track</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid - Smaller & More Distinct */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5"
              >
                {[
                  { label: "Lessons Completed", value: "24/56", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
                  { label: "Current Streak", value: "14 days", icon: Flame, color: "from-orange-500 to-red-500" },
                  { label: "Total XP", value: "2,450", icon: Zap, color: "from-yellow-500 to-amber-500" },
                  { label: "Achievements", value: "12", icon: Trophy, color: "from-purple-500 to-pink-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-xl bg-card border border-border hover:border-[hsl(0,84%,55%)]/30 transition-all cursor-pointer group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 shadow-md`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-xl font-display font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Current Progress */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2 p-4 rounded-xl bg-gradient-to-br from-[hsl(0,84%,55%)]/10 to-[hsl(25,95%,55%)]/5 border border-[hsl(0,84%,55%)]/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[hsl(0,84%,55%)]" />
                      Current Learning Path
                    </h2>
                    <Link to="/learn" className="text-sm text-[hsl(0,84%,55%)] hover:underline flex items-center gap-1">
                      View Roadmap <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-3 rounded-lg bg-card/80 border border-border mb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center shadow-glow">
                        <Brain className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-foreground">AI Engineering Track</h3>
                        <p className="text-xs text-muted-foreground">Module 3: ML Fundamentals</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-display font-bold text-[hsl(0,84%,55%)]">42%</span>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "42%" }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link to="/learn">
                      <Button size="sm" className="bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white border-0">
                        <Play className="w-4 h-4 mr-1" />
                        Continue
                      </Button>
                    </Link>
                    <Link to="/chat">
                      <Button variant="glass" size="sm">
                        <Rocket className="w-4 h-4 mr-1" />
                        Ask AI
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Badges - Unique & Colored */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <h2 className="font-display font-semibold text-base text-foreground flex items-center gap-2 mb-3">
                    <Trophy className="w-5 h-5 text-[hsl(45,93%,58%)]" />
                    Badges
                  </h2>
                  <div className="grid grid-cols-2 gap-2">
                    {badges.map((badge, i) => (
                      <motion.div
                        key={badge.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border bg-gradient-to-br ${badge.color}/10 border-white/10`}
                      >
                        <span className="text-2xl">{badge.icon}</span>
                        <span className="text-xs font-medium text-foreground text-center">
                          {badge.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity - Colorful Items */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4 p-4 rounded-xl bg-card border border-border"
              >
                <h2 className="font-display font-semibold text-base text-foreground mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[hsl(0,84%,55%)]" />
                  Recent Activity
                </h2>
                <div className="space-y-2">
                  {recentActivity.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground">{item.action}</span>
                        <span className="text-sm text-muted-foreground"> · {item.detail}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-foreground bg-[hsl(45,93%,58%)]/10 px-2 py-0.5 rounded-full shrink-0">
                        <Star className="w-3 h-3 text-[hsl(45,93%,58%)]" />
                        +{item.xp}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right sidebar with calendar */}
            <div className="w-72 border-l border-border/50 p-4 hidden lg:flex flex-col gap-4 overflow-y-auto scrollbar-fire">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-lg" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-semibold text-sm text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[hsl(0,84%,55%)]" />
                    Today's Schedule
                  </h3>
                  <button className="p-1 rounded hover:bg-muted">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-2">
                  {upcomingEvents.map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="p-2.5 rounded-lg bg-card border border-border"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{event.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded ${event.color}`}>
                          {event.type}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
