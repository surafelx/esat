import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

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

interface CommunityThreadProps {
  threads?: Thread[];
}

const CommunityThread = ({ threads = [] }: CommunityThreadProps) => {
  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">No discussions yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Be the first to start a conversation!
        </p>
      </div>
    );
  }

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
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
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
                <span className="text-xs text-muted-foreground">{thread.time}</span>
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
