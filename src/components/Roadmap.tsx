import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Lock, Play, Star } from "lucide-react";

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  xp: number;
  lessons: number;
}

const defaultNodes: RoadmapNode[] = [
  { id: "1", title: "Python Foundations", description: "Variables, functions, data types", status: "completed", xp: 200, lessons: 8 },
  { id: "2", title: "Data Structures", description: "Lists, dicts, sets, algorithms", status: "completed", xp: 300, lessons: 10 },
  { id: "3", title: "ML Fundamentals", description: "Linear regression, classification", status: "current", xp: 400, lessons: 12 },
  { id: "4", title: "Deep Learning", description: "Neural networks, backpropagation", status: "locked", xp: 500, lessons: 14 },
  { id: "5", title: "NLP & Transformers", description: "Attention, BERT, GPT architectures", status: "locked", xp: 600, lessons: 16 },
  { id: "6", title: "AI Engineering", description: "Deployment, MLOps, production", status: "locked", xp: 700, lessons: 12 },
];

interface RoadmapProps {
  nodes?: RoadmapNode[];
}

const Roadmap = ({ nodes = defaultNodes }: RoadmapProps) => {
  return (
    <div className="relative flex flex-col gap-2">
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative flex items-start gap-4"
        >
          {/* Connector line */}
          {i < nodes.length - 1 && (
            <div className={cn(
              "absolute left-5 top-12 w-0.5 h-[calc(100%+8px)]",
              node.status === "completed" ? "bg-success" : "bg-border"
            )} />
          )}

          {/* Status indicator */}
          <div className={cn(
            "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
            node.status === "completed" && "bg-success text-success-foreground shadow-sm",
            node.status === "current" && "gradient-primary text-primary-foreground shadow-glow animate-pulse-glow",
            node.status === "locked" && "bg-muted text-muted-foreground"
          )}>
            {node.status === "completed" && <Check className="w-4 h-4" />}
            {node.status === "current" && <Play className="w-4 h-4" />}
            {node.status === "locked" && <Lock className="w-4 h-4" />}
          </div>

          {/* Card */}
          <div className={cn(
            "flex-1 p-4 rounded-xl border transition-all",
            node.status === "completed" && "bg-card border-success/20",
            node.status === "current" && "bg-card border-primary/30 shadow-glow",
            node.status === "locked" && "bg-muted/30 border-border opacity-60"
          )}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-display font-semibold text-foreground">{node.title}</h3>
              <div className="flex items-center gap-1 text-xs text-xp-foreground bg-xp/10 px-2 py-0.5 rounded-full">
                <Star className="w-3 h-3 text-xp" />
                {node.xp} XP
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{node.description}</p>
            <span className="text-xs text-muted-foreground">{node.lessons} lessons</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Roadmap;
