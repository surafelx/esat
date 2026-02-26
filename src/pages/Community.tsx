import Sidebar from "@/components/Sidebar";
import CommunityThread from "@/components/CommunityThread";
import { motion } from "framer-motion";
import { Users, TrendingUp, MessageSquare, Search, Zap, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Community = () => {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "Deep Learning", "ML", "AI Engineering", "NLP"];

  const statButtons = [
    { label: "2,341 Members", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "156 Threads", icon: MessageSquare, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "92% Response", icon: ThumbsUp, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "89% Solved", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        {/* Tiny stat buttons above the card */}
        <div className="p-4 pb-2 flex gap-2">
          {statButtons.map((stat, i) => (
            <button
              key={i}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${stat.bg} border border-border/50 hover:border-primary/30 transition-all`}
            >
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-xs font-medium text-foreground">{stat.label}</span>
            </button>
          ))}
        </div>

        {/* Big card container that fills the page */}
        <div className="p-4 pt-2 h-[calc(100vh-80px)]">
          <div className="bg-card border border-border rounded-2xl h-full overflow-hidden flex">
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h1 className="text-2xl font-display font-bold text-foreground mb-1">Community</h1>
                    <p className="text-muted-foreground text-sm">Learn together, grow together</p>
                  </div>
                  <Button variant="hero" size="sm">
                    <MessageSquare className="w-3 h-3" />
                    New Post
                  </Button>
                </div>
              </motion.div>

              {/* Search & Filters */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <div className="bg-muted/30 border border-border rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        placeholder="Search discussions..."
                        className="w-full bg-muted/50 border border-border rounded-lg pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {filters.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                          filter === f
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {f === "all" ? "All Topics" : f}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-[calc(100%-180px)]"
              >
                <CommunityThread />
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
