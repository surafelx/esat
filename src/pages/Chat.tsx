import Navbar from "@/components/Navbar";
import AIChat from "@/components/AIChat";
import { motion } from "framer-motion";
import { BookOpen, Lightbulb, Code2, HelpCircle } from "lucide-react";

const quickActions = [
  { label: "Explain this concept", icon: Lightbulb },
  { label: "Help me debug", icon: Code2 },
  { label: "Quiz me", icon: HelpCircle },
  { label: "Summarize lesson", icon: BookOpen },
];

const Chat = () => {
  return (
    <div className="min-h-screen gradient-surface">
      <Navbar />
      <main className="container px-6 pt-24 pb-12 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">AI Tutor</h1>
          <p className="text-muted-foreground">Your intelligent learning companion</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 h-[600px]"
          >
            <AIChat />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((a) => (
                  <button
                    key={a.label}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors text-left"
                  >
                    <a.icon className="w-4 h-4 text-primary" />
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-card border border-border">
              <h3 className="font-display font-semibold text-sm text-foreground mb-2">Current Context</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Module</span>
                  <span className="text-foreground font-medium">ML Fundamentals</span>
                </div>
                <div className="flex justify-between">
                  <span>Lesson</span>
                  <span className="text-foreground font-medium">Gradient Descent</span>
                </div>
                <div className="flex justify-between">
                  <span>Progress</span>
                  <span className="text-foreground font-medium">3/12</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-display font-semibold text-sm text-foreground mb-1">💡 Tip</h3>
              <p className="text-xs text-muted-foreground">
                Ask specific questions about your current lesson for the most helpful responses. The AI tutor adapts to your learning progress.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
