import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, ArrowRight, Brain, Users, ClipboardCheck, 
  MessageSquare, Rocket, BookOpen, Zap, Star, Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Tutoring",
    description: "Context-aware AI mentor that adapts to your learning progress and provides deep, personalized guidance.",
  },
  {
    icon: Target,
    title: "Structured Roadmaps",
    description: "Follow domain-to-lesson learning paths with clear progression, skill tracking, and career mapping.",
  },
  {
    icon: ClipboardCheck,
    title: "Rubric Evaluation",
    description: "Get multi-dimensional AI grading with transparent scoring and actionable improvement feedback.",
  },
  {
    icon: Users,
    title: "Community Knowledge",
    description: "Learn from peers through threaded discussions, knowledge sharing, and collaborative problem solving.",
  },
  {
    icon: Rocket,
    title: "Career Discovery",
    description: "See which careers unlock as you progress, with market relevance and portfolio project suggestions.",
  },
  {
    icon: Zap,
    title: "Gamified Progress",
    description: "Earn XP, collect badges, maintain streaks, and level up as you master new concepts.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full border border-primary-foreground/5"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full border border-primary-foreground/5"
          />
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary-foreground/20"
              style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
              animate={{ y: [-10, 10], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
            />
          ))}
        </div>

        <div className="relative container px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 mb-8">
              <Sparkles className="w-4 h-4 text-primary-foreground/80" />
              <span className="text-sm text-primary-foreground/80 font-medium">
                The future of learning is here
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Learn Smarter with{" "}
              <span className="relative">
                AI School
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-accent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              An AI-native learning operating system. Structured roadmaps, intelligent tutoring, 
              community knowledge, and career discovery — all in one place.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90 shadow-lg">
                  <Rocket className="w-5 h-5" />
                  Start Learning
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="glass" size="xl" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  <BookOpen className="w-5 h-5" />
                  Explore Roadmap
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-16 flex-wrap"
          >
            {[
              { value: "10K+", label: "Learners" },
              { value: "500+", label: "Lessons" },
              { value: "95%", label: "Completion Rate" },
              { value: "4.9★", label: "Rating" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-display font-bold text-primary-foreground">{s.value}</div>
                <div className="text-xs text-primary-foreground/50">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 gradient-surface">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-foreground mb-4">
              Everything you need to{" "}
              <span className="text-gradient">master AI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              A complete learning ecosystem designed to take you from beginner to professional.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:shadow-glow transition-all">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl gradient-hero p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to start your journey?
            </h2>
            <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
              Join thousands of learners building real-world AI skills with personalized guidance.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="xl" className="bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
                <Star className="w-5 h-5" />
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
