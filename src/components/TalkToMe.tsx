import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, User } from "lucide-react";

// Use environment variables for secrets
const WEBHOOK_URL = import.meta.env.VITE_TALKTOME_WEBHOOK_URL ;
const API_KEY = import.meta.env.VITE_MAKE_API_KEY;
const memeVideo = "/feedback.mp4";

const TalkToMe = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartChat = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowMessageBox(true);
    }, 500);
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
    setTimeout(() => {
      setShowMessageBox(false);
      setSent(false);
    }, 300);
  };

  return (
    <>
      {/* Floating Meme Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        <video
          src={memeVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-14 h-14 rounded-full object-cover border-2 border-[hsl(262,83%,58%)]"
        />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 z-50 w-80 bg-[#1a1a24] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[hsl(262,83%,58%)]" />
                <span className="font-medium text-white">Talk to Me</span>
              </div>
              <button onClick={handleClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 min-h-[200px]">
              {loading && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-8 h-8 rounded-full border-2 border-[hsl(262,83%,58%)] border-t-transparent animate-spin" />
                </div>
              )}

              {!loading && !showMessageBox && !sent && (
                <div className="text-center py-6">
                  <p className="text-gray-400 mb-6">Have a question or just want to chat?</p>
                  <Button onClick={handleStartChat} className="bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white">
                    Say Something
                  </Button>
                </div>
              )}

              {!loading && showMessageBox && !sent && (
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      placeholder="Leave empty for anonymous" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-gray-500 text-sm" 
                    />
                  </div>

                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message..." 
                    rows={3} 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder:text-gray-500 text-sm resize-none" 
                  />

                  <Button 
                    onClick={handleSend} 
                    disabled={!message.trim()} 
                    className="w-full bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white text-sm"
                  >
                    <Send className="w-4 h-4 mr-2" /> Send
                  </Button>
                </div>
              )}

              {!loading && sent && (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-white font-medium mb-1">Sent!</p>
                  <p className="text-gray-400 text-sm mb-3">{username || "Anonymous"} said:</p>
                  <p className="text-gray-300 text-sm bg-white/5 rounded-lg p-2 mb-4">{message}</p>
                  <Button 
                    onClick={() => setSent(false)} 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 text-sm"
                  >
                    Send Another
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TalkToMe;
