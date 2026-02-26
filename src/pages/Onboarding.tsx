import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Brain, Target, Zap, Rocket, User, Mail, Lock, Check
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const careerPaths = [
  { 
    id: "ml-engineer", 
    title: "ML Engineer", 
    icon: Brain, 
    color: "from-blue-500 to-purple-500",
    description: "Build and deploy ML models"
  },
  { 
    id: "developer", 
    title: "AI Developer", 
    icon: Rocket, 
    color: "from-green-500 to-teal-500",
    description: "Create AI-powered applications"
  },
  { 
    id: "researcher", 
    title: "AI Researcher", 
    icon: Zap, 
    color: "from-purple-500 to-pink-500",
    description: "Push the boundaries of AI"
  },
];

const learningStyles = [
  { id: "structured", title: "Structured", icon: Target, description: "Guided curriculum" },
  { id: "project", title: "Project-Based", icon: Rocket, description: "Build real projects" },
  { id: "flexible", title: "Flexible", icon: Brain, description: "Learn at your pace" },
];

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [selectedCareer, setSelectedCareer] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(262,83%,58%)] blur-[300px] opacity-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i <= step ? "bg-[hsl(262,83%,58%)]" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[hsl(262,83%,58%)]/20 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-[hsl(262,83%,58%)]" />
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome to AI School
              </h1>
              <p className="text-gray-400 mb-8">
                Your journey to becoming an AI engineer starts here
              </p>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Brain, label: "AI Tutoring" },
                  { icon: Target, label: "Roadmaps" },
                  { icon: Rocket, label: "Projects" },
                ].map((feature) => (
                  <div
                    key={feature.label}
                    className="p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <feature.icon className="w-5 h-5 text-[hsl(262,83%,58%)] mx-auto mb-1" />
                    <p className="text-xs text-gray-400">{feature.label}</p>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleNext} 
                className="w-full bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Basic Info */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-xl font-bold text-white mb-2">
                What's your name?
              </h1>
              <p className="text-gray-400 mb-6">
                Let's personalize your experience
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Your name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[hsl(262,83%,58%)]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={handlePrev} className="flex-1 text-gray-400">
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!formData.name}
                  className="flex-1 bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Career Path */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-xl font-bold text-white mb-2">
                Choose your path
              </h1>
              <p className="text-gray-400 mb-6">
                What do you want to become?
              </p>

              <div className="space-y-3 mb-6">
                {careerPaths.map((path) => (
                  <button
                    key={path.id}
                    onClick={() => setSelectedCareer(path.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                      selectedCareer === path.id
                        ? "border-[hsl(262,83%,58%)] bg-[hsl(262,83%,58%)]/10"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center`}>
                      <path.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{path.title}</h3>
                      <p className="text-xs text-gray-400">{path.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={handlePrev} className="flex-1 text-gray-400">
                  Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!selectedCareer}
                  className="flex-1 bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Learning Style */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              
              <h1 className="text-xl font-bold text-white mb-2">
                You're all set!
              </h1>
              <p className="text-gray-400 mb-6">
                Ready to start learning AI engineering?
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-left">
                <p className="text-white font-medium mb-1">{formData.name || "Learner"}</p>
                <p className="text-xs text-gray-400">
                  {careerPaths.find(c => c.id === selectedCareer)?.title}
                </p>
              </div>

              <Link to="/dashboard">
                <Button className="w-full bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white">
                  <Rocket className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </Link>
            </motion.div>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          Step {step} of 4
        </p>
      </motion.div>
    </div>
  );
};

export default Onboarding;
