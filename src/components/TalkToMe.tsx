import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, User, MessageSquare } from "lucide-react";

// Use environment variables for secrets
const WEBHOOK_URL = import.meta.env.VITE_TALKTOME_WEBHOOK_URL;
const API_KEY = import.meta.env.VITE_MAKE_API_KEY;

const TalkToMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setShowMessageBox(false);
        setSent(false);
        setMessage("");
      }, 300);
    }
  }, [isOpen]);

  const handleStartChat = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowMessageBox(true);
    }, 400);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-make-apikey": API_KEY
        },
        body: JSON.stringify({
          username: username.trim() || "Anonymous",
          message: message.trim(),
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        setSent(true);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
          
          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center shadow-lg">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          
          {/* Pulse indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-gradient-to-b from-card to-background border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative px-5 py-4 bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white">Feedback</h3>
                      <p className="text-xs text-white/70">Send us your thoughts</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleClose} 
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
                
                {/* Decorative curve */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-background" style={{ borderTopLeftRadius: '50%', borderTopRightRadius: '50%' }} />
              </div>

              {/* Content */}
              <div className="p-5 min-h-[240px]">
                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full border-3 border-[hsl(0,84%,55%)]/20" />
                      <div className="absolute inset-0 rounded-full border-3 border-[hsl(0,84%,55%)] border-t-transparent animate-spin" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Sending...</p>
                  </div>
                )}

                {/* Welcome Screen */}
                {!loading && !showMessageBox && !sent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[hsl(0,84%,55%)]/20 to-[hsl(25,95%,55%)]/20 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-[hsl(0,84%,55%)]" />
                    </div>
                    <p className="text-foreground mb-2 font-medium">Have feedback or a question?</p>
                    <p className="text-sm text-muted-foreground mb-6">We'd love to hear from you. Send us a message!</p>
                    <Button 
                      onClick={handleStartChat} 
                      className="bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white border-0 px-6"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                )}

                {/* Message Form */}
                {!loading && showMessageBox && !sent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Username Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Your name (optional)</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          value={username} 
                          onChange={(e) => setUsername(e.target.value)} 
                          placeholder="What's your name?" 
                          className="w-full h-10 bg-muted/50 border border-border rounded-lg pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(0,84%,55%)]/50 focus:border-[hsl(0,84%,55%)]" 
                        />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">Your message</label>
                      <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        onKeyDown={handleKeyPress}
                        placeholder="Tell us what's on your mind..." 
                        rows={4}
                        autoFocus
                        className="w-full bg-muted/50 border border-border rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:ring-2 focus:ring-[hsl(0,84%,55%)]/50 focus:border-[hsl(0,84%,55%)]" 
                      />
                    </div>

                    <Button 
                      onClick={handleSend} 
                      disabled={!message.trim()} 
                      className="w-full h-10 bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white border-0 text-sm font-medium"
                    >
                      <Send className="w-4 h-4 mr-2" /> 
                      Send Message
                    </Button>
                  </motion.div>
                )}

                {/* Success State */}
                {!loading && sent && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-1">Message Sent!</p>
                    <p className="text-sm text-muted-foreground mb-4">Thanks for sharing your thoughts.</p>
                    
                    {message && (
                      <div className="text-left bg-muted/50 rounded-lg p-3 mb-4 border border-border/50">
                        <p className="text-xs text-muted-foreground mb-1">Your message:</p>
                        <p className="text-sm text-foreground">{message}</p>
                      </div>
                    )}
                    
                    <Button 
                      onClick={() => setSent(false)} 
                      variant="outline" 
                      className="border-border hover:bg-muted text-sm"
                    >
                      Send Another
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TalkToMe;
