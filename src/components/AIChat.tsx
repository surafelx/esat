import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hey! 👋 I'm your AI learning companion. I'm here to help you understand concepts, debug code, and guide you through your learning path. What would you like to explore today?",
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "Great question! Let me break that down for you. The key concept here is understanding how neural networks learn through backpropagation...\n\nThink of it like this: when a network makes a prediction, it compares that prediction to the actual answer. The difference (called the loss) flows backward through the network, adjusting each weight proportionally to its contribution to the error.\n\n**Key steps:**\n1. Forward pass — compute predictions\n2. Calculate loss\n3. Backward pass — compute gradients\n4. Update weights\n\nWould you like me to show you a code example?",
        "That's a fundamental concept in ML! Here's how I'd approach it:\n\nFirst, let's understand the intuition. A **transformer** processes all tokens in parallel (unlike RNNs). The attention mechanism lets each token \"look at\" every other token to understand context.\n\n```python\n# Simplified attention\nscores = Q @ K.T / sqrt(d_k)\nweights = softmax(scores)\noutput = weights @ V\n```\n\nThe magic is in the self-attention: each word decides which other words are relevant. Want to dive deeper into multi-head attention?",
        "Excellent thinking! 🎯 Let me help you connect those dots.\n\nThe relationship between **loss functions** and **gradient descent** is central to training. The loss function defines *what* to optimize, while gradient descent defines *how*.\n\nCommon loss functions:\n- **MSE** → regression tasks\n- **Cross-entropy** → classification\n- **Contrastive** → embeddings\n\nEach gives different gradient landscapes. Should we explore which one fits your current project?"
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-sm text-foreground">AI Tutor</h3>
          <p className="text-xs text-muted-foreground">Context: ML Fundamentals · Lesson 3</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
            >
              <div className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0",
                msg.role === "assistant" ? "gradient-accent" : "bg-secondary"
              )}>
                {msg.role === "assistant" ? (
                  <Sparkles className="w-3.5 h-3.5 text-accent-foreground" />
                ) : (
                  <User className="w-3.5 h-3.5 text-secondary-foreground" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "assistant"
                  ? "bg-muted text-foreground"
                  : "gradient-primary text-primary-foreground"
              )}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
            <div className="bg-muted rounded-xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask anything about your lesson..."
            className="flex-1 bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          <Button onClick={sendMessage} size="icon" variant="hero" className="rounded-lg shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
