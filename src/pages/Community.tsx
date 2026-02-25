import Navbar from "@/components/Navbar";
import CommunityThread from "@/components/CommunityThread";
import { motion } from "framer-motion";
import { Users, TrendingUp, MessageSquare, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Community = () => {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "Deep Learning", "ML", "AI Engineering", "NLP"];

  return (
    <div className="min-h-screen gradient-surface">
      <Navbar />
      <main className="container px-6 pt-24 pb-12 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-1">Community</h1>
              <p className="text-muted-foreground">Learn together, grow together</p>
            </div>
            <Button variant="hero">
              <MessageSquare className="w-4 h-4" />
              New Post
            </Button>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-6 mb-6 p-4 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">2,341 members</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">156 threads this week</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="text-muted-foreground">92% response rate</span>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Search discussions..."
                className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f === "all" ? "All Topics" : f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CommunityThread />
        </motion.div>
      </main>
    </div>
  );
};

export default Community;
