import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Brain, Zap, Rocket, User, Check, Flame
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const careerPaths = [
  { 
    id: "ml-engineer", 
    title: "ML Engineer", 
    icon: Brain, 
    color: "from-blue-500 to-purple-500",
    description: "Build and deploy machine learning models at scale",
    questions: [
      { id: "ml-goal", question: "What do you want to build?", type: "text", placeholder: "e.g., Image classifier, recommendation system..." },
    ]
  },
  { 
    id: "developer", 
    title: "AI Developer", 
    icon: Brain, 
    color: "from-green-500 to-teal-500",
    description: "Create AI-powered applications and products",
    questions: [
      { id: "dev-goal", question: "What kind of AI app do you want to create?", type: "text", placeholder: "e.g., Chatbot, automation tool, AI assistant..." },
    ]
  },
  { 
    id: "researcher", 
    title: "AI Researcher", 
    icon: Zap, 
    color: "from-purple-500 to-pink-500",
    description: "Push the boundaries of artificial intelligence",
    questions: [
      { id: "research-interest", question: "What area fascinates you most?", type: "text", placeholder: "e.g., Large language models, computer vision, reinforcement learning..." },
    ]
  },
];

// Typewriter effect component
const TypewriterText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setStarted(false);
    
    const startTimeout = setTimeout(() => {
      setStarted(true);
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-[1em] bg-[hsl(0,84%,55%)] ml-0.5 align-middle"
        />
      )}
    </span>
  );
};

const Onboarding = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
    goal: "",
    interests: [] as string[],
    customAnswer: "",
  });

  // Calculate total questions dynamically based on career path
  const getTotalQuestions = () => {
    if (!formData.role) return 6;
    const path = careerPaths.find(p => p.id === formData.role);
    if (!path) return 6;
    return 6 + path.questions.length;
  };

  const totalQuestions = getTotalQuestions();
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleInteractionStart = () => setIsInteracting(true);
  const handleInteractionEnd = () => setIsInteracting(false);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  }, [currentQuestion, formData]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleNext = () => {
    const path = careerPaths.find(p => p.id === formData.role);
    const pathQuestions = path?.questions || [];
    
    if (currentQuestion === 0) {
      setDirection(1);
      setCurrentQuestion(1);
    } else if (currentQuestion === 1) {
      if (formData.name.trim()) {
        setDirection(1);
        setCurrentQuestion(2);
      }
    } else if (currentQuestion === 2) {
      if (formData.email.trim() && formData.email.includes('@')) {
        setDirection(1);
        setCurrentQuestion(3);
      }
    } else if (currentQuestion === 3) {
      if (formData.role) {
        setDirection(1);
        if (pathQuestions.length > 0) {
          setCurrentQuestion(4);
        } else {
          setCurrentQuestion(5);
        }
      }
    } else if (currentQuestion >= 4 && currentQuestion < 4 + pathQuestions.length) {
      setDirection(1);
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentQuestion === 4 + pathQuestions.length) {
      setDirection(1);
      setCurrentQuestion(5 + pathQuestions.length);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, role: roleId, customAnswer: "" });
  };

  const getPersonalizedGreeting = () => {
    if (!formData.name.trim()) return null;
    return formData.name.trim().split(" ")[0];
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const getCurrentQuestionContent = () => {
    const path = careerPaths.find(p => p.id === formData.role);
    const pathQuestions = path?.questions || [];

    // Question 0: Welcome
    if (currentQuestion === 0) {
      return (
        <div className="text-left max-w-4xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center mb-8 shadow-lg shadow-[hsl(0,84%,55%)]/30"
          >
            <Flame className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            <TypewriterText text="🚀 Welcome to AI School" delay={0.3} />
          </h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-xl text-gray-400 mb-8 max-w-lg"
          >
            Your personalized path to becoming an AI engineer starts here
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <span className="text-sm">Press</span>
            <kbd className="px-3 py-1 bg-white/10 rounded-lg text-white text-sm font-mono">Enter</kbd>
            <span className="text-sm">to continue</span>
          </motion.div>
        </div>
      );
    }

    // Question 1: Name
    if (currentQuestion === 1) {
      const hasName = formData.name.length > 0;
      
      return (
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-left">
            <TypewriterText text="👋 What should we call you?" delay={0} />
          </h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-400 mb-10 text-left"
          >
            This helps us personalize your experience
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
          >
            <div className="relative">
              <User className={`absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 ${hasName ? 'text-white' : 'text-gray-500'}`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your name"
                autoFocus
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                className={`w-full bg-transparent border-b-2 rounded-none pl-10 pr-4 py-4 text-2xl text-white placeholder:text-gray-500 outline-none transition-all ${hasName ? 'border-[hsl(0,84%,55%)]' : 'border-white/20'}`}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 text-gray-500 mt-4"
          >
            <span className="text-sm">Press</span>
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-white text-sm font-mono">Enter</kbd>
            <span className="text-sm">to continue</span>
          </motion.div>
        </div>
      );
    }

    // Question 2: Email
    if (currentQuestion === 2) {
      const hasEmail = formData.email.length > 0;
      const hasAt = formData.email.includes('@');
      
      return (
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-left">
            <TypewriterText text="📧 What's your email?" delay={0} />
          </h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-gray-400 mb-10 text-left"
          >
            We'll send your personalized roadmap here
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            onMouseDown={handleInteractionStart}
            onMouseUp={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
          >
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              autoFocus
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              className={`w-full bg-transparent border-b-2 rounded-none px-4 py-4 text-2xl text-white placeholder:text-gray-500 outline-none transition-all ${hasEmail && hasAt ? 'border-white/50' : hasEmail ? 'border-[hsl(0,84%,55%)]' : 'border-white/20'}`}
            />
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 text-gray-500 mt-4"
          >
            <span className="text-sm">Press</span>
            <kbd className="px-2 py-0.5 bg-white/10 rounded text-white text-sm font-mono">Enter</kbd>
            <span className="text-sm">to continue</span>
          </motion.div>
        </div>
      );
    }

    // Question 3: Role selection
    if (currentQuestion === 3) {
      const greeting = getPersonalizedGreeting();
      const roleText = greeting 
        ? `🎯 Great, ${greeting} — what brings you here?`
        : "🎯 What brings you to AI School?";
      
      return (
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
            <TypewriterText text={roleText} delay={0} />
          </h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xl text-gray-400 mb-10"
          >
            Choose the path that matches your goals
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="space-y-3"
          >
            {careerPaths.map((path, index) => (
              <motion.button
                key={path.id}
                onClick={() => handleRoleSelect(path.id)}
                onMouseDown={handleInteractionStart}
                onMouseUp={handleInteractionEnd}
                onTouchStart={handleInteractionStart}
                onTouchEnd={handleInteractionEnd}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.3 + index * 0.1 }}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group ${
                  formData.role === path.id
                    ? "border-[hsl(0,84%,55%)] bg-[hsl(0,84%,55%)]/10 shadow-glow"
                    : "border-white/20 hover:border-white/40 hover:bg-white/5 hover:border-[hsl(0,84%,55%)]/30"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <path.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{path.title}</h3>
                  <p className="text-sm text-gray-400">{path.description}</p>
                </div>
                {formData.role === path.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-[hsl(0,84%,55%)] flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      );
    }

    // Role-specific questions
    const pathQuestionIndex = currentQuestion - 4;
    if (pathQuestionIndex >= 0 && pathQuestionIndex < pathQuestions.length) {
      const q = pathQuestions[pathQuestionIndex];
      const questionEmojis = ["📊", "🔧", "🎓", "💡"];
      const hasAnswer = formData.customAnswer.length > 0;
      
      return (
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            <TypewriterText text={`${questionEmojis[pathQuestionIndex] || "❓"} ${q.question}`} delay={0} />
          </h1>

          <>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              onMouseDown={handleInteractionStart}
              onMouseUp={handleInteractionEnd}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
            >
              <textarea
                value={formData.customAnswer}
                onChange={(e) => setFormData({ ...formData, customAnswer: e.target.value })}
                placeholder={q.placeholder}
                autoFocus
                rows={3}
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                className={`w-full bg-transparent border-b-2 rounded-none px-4 py-4 text-xl text-white placeholder:text-gray-500 outline-none transition-all resize-none ${hasAnswer ? 'border-white/50' : 'border-white/20'}`}
              />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 text-gray-500 mt-4"
            >
              <span className="text-sm">Press</span>
              <kbd className="px-2 py-0.5 bg-white/10 rounded text-white text-sm font-mono">Enter</kbd>
              <span className="text-sm">to continue</span>
            </motion.div>
          </>
        </div>
      );
    }

    // Completion
    return (
      <div className="text-left max-w-4xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[hsl(0,84%,55%)]/30"
        >
          <Check className="w-12 h-12 text-white" />
        </motion.div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          <TypewriterText text={`🎉 You're all set, ${getPersonalizedGreeting()}!`} delay={0} />
        </h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xl text-gray-400 mb-8"
        >
          Your personalized {careerPaths.find(p => p.id === formData.role)?.title} journey awaits
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              {(() => {
                const path = careerPaths.find(p => p.id === formData.role);
                const Icon = path?.icon || Brain;
                return <Icon className="w-7 h-7 text-white" />;
              })()}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{formData.name}</p>
              <p className="text-gray-400">{careerPaths.find(p => p.id === formData.role)?.title}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p className="text-gray-500 text-sm mb-6">
            You'll receive a personalized learning roadmap based on your goals
          </p>
          
          <Link to="/dashboard">
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white text-lg py-6"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start My Journey
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  };

  const canProceed = () => {
    const path = careerPaths.find(p => p.id === formData.role);
    const pathQuestions = path?.questions || [];
    
    if (currentQuestion === 0) return true;
    if (currentQuestion === 1) return formData.name.trim().length > 0;
    if (currentQuestion === 2) return formData.email.trim().length > 0 && formData.email.includes('@');
    if (currentQuestion === 3) return formData.role.length > 0;
    if (currentQuestion >= 4 && currentQuestion < 4 + pathQuestions.length) return formData.customAnswer.length > 0;
    return true;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col relative">
      {/* Ambient glowing background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[hsl(0,84%,55%)] blur-[300px] opacity-10"
          animate={{ 
            scale: isInteracting ? 1.2 : 1,
            opacity: isInteracting ? 0.15 : 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(25,95%,55%)] blur-[250px] opacity-8"
          animate={{ 
            scale: isInteracting ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Progress bar - Typeform style with smooth animation */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1] // Smooth ease-out
          }}
        />
      </div>

      {/* Question counter with Typeform-style dots */}
      <div className="fixed top-4 right-6 z-50 flex items-center gap-2">
        {Array.from({ length: Math.min(totalQuestions, 8) }).map((_, i) => (
          <motion.div 
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === currentQuestion 
                ? "bg-[hsl(0,84%,55%)] w-6" 
                : i < currentQuestion 
                  ? "bg-white/40 w-1.5" 
                  : "bg-white/20 w-1.5"
            }`}
            animate={{ 
              width: i === currentQuestion ? 24 : 6
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
        {totalQuestions > 8 && (
          <span className="text-gray-500 text-xs ml-1">+{totalQuestions - 8}</span>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 pl-8 md:pl-20">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            className="relative z-10 w-full max-w-5xl"
          >
            {getCurrentQuestionContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer - positioned higher for Typeform-style UX */}
      <div className="fixed bottom-6 left-0 right-0 px-4 z-40">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className={`text-gray-400 hover:text-white ${currentQuestion === 0 ? 'opacity-0' : ''}`}
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back
          </Button>

          <div className="flex gap-1.5 md:hidden">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <motion.div 
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= currentQuestion 
                    ? "bg-[hsl(0,84%,55%)]" 
                    : "bg-white/20"
                }`}
                animate={{ 
                  width: i === currentQuestion ? 24 : 6
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {currentQuestion < totalQuestions - 1 && (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-transparent border border-white/20 text-white hover:bg-white/10 px-4"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;

