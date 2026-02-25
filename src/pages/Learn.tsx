import Navbar from "@/components/Navbar";
import Roadmap from "@/components/Roadmap";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const domains = [
  { name: "AI Engineering", active: true, modules: 6, progress: 42 },
  { name: "Web Development", active: false, modules: 8, progress: 0 },
  { name: "Data Science", active: false, modules: 7, progress: 0 },
];

const skills = [
  "Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch",
  "NLP", "Computer Vision", "MLOps", "Deployment"
];

const Learn = () => {
  return (
    <div className="min-h-screen gradient-surface">
      <Navbar />
      <main className="container px-6 pt-24 pb-12 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">Learning Roadmap</h1>
          <p className="text-muted-foreground mb-8">Follow your personalized path to mastery</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Domains */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Learning Domains
            </h2>
            <div className="space-y-2">
              {domains.map((d) => (
                <div
                  key={d.name}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    d.active
                      ? "bg-primary/5 border-primary/20 shadow-glow"
                      : "border-border hover:border-primary/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-foreground">{d.name}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.modules} modules</span>
                  {d.active && (
                    <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                      <div className="h-full rounded-full gradient-primary" style={{ width: `${d.progress}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Skills You'll Gain
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, i) => (
                  <span
                    key={s}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                      i < 4
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-display font-semibold text-sm text-foreground mb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-primary" />
                Careers Unlocked
              </h3>
              <p className="text-xs text-muted-foreground">
                AI Engineer · ML Engineer · Applied AI Developer · Data Scientist
              </p>
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  AI Engineering Track
                </h2>
                <Link to="/chat">
                  <Button variant="glass" size="sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Ask AI Tutor
                  </Button>
                </Link>
              </div>
              <Roadmap />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
