import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, Lightbulb, Code2, HelpCircle, MessageSquare, Sparkles, 
  Bot, User, Send, BookOpen, Briefcase, Wand2, Zap, Clock, Eye
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Message {
  id: number;
  role: "user" | "agent";
  agentId?: string;
  content: string;
}

const agents = [
  { id: "tutor", name: "AI Tutor", icon: Brain, color: "text-blue-500", bg: "bg-blue-500/10", description: "Helps with lessons" },
  { id: "coder", name: "Code Helper", icon: Code2, color: "text-green-500", bg: "bg-green-500/10", description: "Coding problems" },
  { id: "career", name: "Career Guide", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10", description: "Career advice" },
  { id: "project", name: "Project Mentor", icon: Wand2, color: "text-orange-500", bg: "bg-orange-500/10", description: "Project help" },
];

const initialMessages: Message[] = [
  { id: 1, role: "agent", agentId: "tutor", content: "Hi! I'm your AI Tutor. What would you like to learn today?" },
];

const statButtons = [
  { label: "4 Agents", icon: Bot, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Tutor Active", icon: Brain, color: "text-green-500", bg: "bg-green-500/10" },
];

const quickActions = [
  { label: "Explain Concept", icon: Lightbulb, action: "Explain gradient descent" },
  { label: "Debug Code", icon: Code2, action: "Help me debug" },
  { label: "Quiz Me", icon: HelpCircle, action: "Quiz me" },
  { label: "View Lessons", icon: BookOpen, link: "/learn" },
];

const Chat = () => {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: messages.length + 1, role: "user", content: inputValue };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setTimeout(() => {
      const agentResponse: Message = {
        id: messages.length + 2,
        role: "agent",
        agentId: selectedAgent.id,
        content: "I'd be happy to help! Let me explain this concept in detail...",
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        {/* Header with title, stats, and quick actions */}
        <div className="p-4 pb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
            <h1 className="text-2xl font-display font-bold text-foreground">AI Tutor</h1>
            <p className="text-sm text-muted-foreground">Chat with AI agents specialized in different areas</p>
          </motion.div>
          
          <div className="flex gap-2 overflow-x-auto">
            {statButtons.map((stat, i) => (
              <button key={i} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg ${stat.bg} border border-border/50 whitespace-nowrap`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm font-medium text-foreground">{stat.label}</span>
              </button>
            ))}
            {quickActions.map((action, i) => (
              action.link ? (
                <Link key={i} to={action.link}>
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted border border-border/50 hover:border-primary/30 whitespace-nowrap">
                    <action.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                  </button>
                </Link>
              ) : (
                <button key={i} onClick={() => setInputValue(action.action)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-muted border border-border/50 hover:border-primary/30 whitespace-nowrap">
                  <action.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              )
            ))}
          </div>
        </div>

        {/* Big card container */}
        <div className="p-4 pt-2 h-[calc(100vh-120px)]">
          <div className="bg-card border border-border rounded-2xl h-full overflow-hidden flex">
            {/* Agents sidebar */}
            <div className="w-64 border-r border-border p-4 hidden lg:block overflow-y-auto">
              <h3 className="font-display font-semibold text-xs text-muted-foreground mb-3">AI AGENTS</h3>
              <div className="space-y-2">
                {agents.map((agent, i) => (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedAgent(agent)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                      selectedAgent.id === agent.id 
                        ? "bg-primary/10 border border-primary/30" 
                        : "hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${agent.bg} flex items-center justify-center`}>
                      <agent.icon className={`w-5 h-5 ${agent.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{agent.name}</span>
                        <span className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <p className="text-xs text-muted-foreground">{agent.description}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${selectedAgent.bg} flex items-center justify-center`}>
                  <selectedAgent.icon className={`w-5 h-5 ${selectedAgent.color}`} />
                </div>
                <div>
                  <h2 className="font-display font-semibold text-foreground">{selectedAgent.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedAgent.description}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        msg.role === "user" ? "bg-primary/20" : agents.find(a => a.id === msg.agentId)?.bg || "bg-muted"
                      }`}>
                        {msg.role === "user" ? <User className="w-4 h-4 text-primary" /> : <Bot className={`w-4 h-4 ${agents.find(a => a.id === msg.agentId)?.color || "text-muted-foreground"}`} />}
                      </div>
                      <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                        msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 border border-border"
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message ${selectedAgent.name}...`}
                    className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm"
                  />
                  <Button variant="hero" size="icon" onClick={handleSend}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
