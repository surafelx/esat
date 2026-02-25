import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Thread {
  id: string;
  author: string;
  avatar: string;
  title: string;
  preview: string;
  replies: number;
  votes: number;
  time: string;
  tags: string[];
}

const sampleThreads: Thread[] = [
  {
    id: "1",
    author: "Sarah Chen",
    avatar: "SC",
    title: "How does attention mechanism differ from RNN memory?",
    preview: "I'm trying to understand the fundamental difference between how transformers and RNNs handle sequence information...",
    replies: 12,
    votes: 34,
    time: "2h ago",
    tags: ["Deep Learning", "NLP"],
  },
  {
    id: "2",
    author: "Marcus R.",
    avatar: "MR",
    title: "Best practices for feature engineering in tabular data?",
    preview: "Working on a Kaggle competition and curious about the community's approach to feature creation...",
    replies: 8,
    votes: 21,
    time: "5h ago",
    tags: ["ML", "Feature Engineering"],
  },
  {
    id: "3",
    author: "Priya K.",
    avatar: "PK",
    title: "Gradient vanishing in deep networks — practical solutions",
    preview: "I compiled a list of techniques that helped me address vanishing gradients. Sharing here for others...",
    replies: 19,
    votes: 56,
    time: "1d ago",
    tags: ["Deep Learning", "Tips"],
  },
  {
    id: "4",
    author: "Alex Wong",
    avatar: "AW",
    title: "Building a RAG pipeline — architecture decisions",
    preview: "For my capstone project, I'm implementing retrieval-augmented generation. Would love feedback on my architecture...",
    replies: 7,
    votes: 15,
    time: "3h ago",
    tags: ["AI Engineering", "RAG"],
  },
];

interface CommunityThreadProps {
  threads?: Thread[];
}

const CommunityThread = ({ threads = sampleThreads }: CommunityThreadProps) => {
  return (
    <div className="space-y-3">
      {threads.map((thread, i) => (
        <motion.div
          key={thread.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="p-4 rounded-xl bg-card border border-border hover:border-primary/20 hover:shadow-sm transition-all cursor-pointer group"
        >
          <div className="flex gap-3">
            {/* Vote column */}
            <div className="flex flex-col items-center gap-1 pt-1">
              <button className="w-8 h-8 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-semibold text-foreground">{thread.votes}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                  {thread.avatar}
                </div>
                <span className="text-xs text-muted-foreground">{thread.author}</span>
                <span className="text-xs text-muted-foreground/50">·</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {thread.time}
                </span>
              </div>

              <h4 className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors mb-1">
                {thread.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-1">{thread.preview}</p>

              <div className="flex items-center gap-2 mt-2.5">
                {thread.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-primary/5 text-[10px] font-medium text-primary border border-primary/10"
                  >
                    {tag}
                  </span>
                ))}
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="w-3 h-3" />
                  {thread.replies}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CommunityThread;
