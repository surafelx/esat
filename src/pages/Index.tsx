import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Zap, Users, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />
        
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(262,83%,58%)] blur-[300px] opacity-15" />

        {/* Content */}
        <div className="relative z-10 container px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[hsl(262,83%,58%)] animate-pulse" />
              <span className="text-sm text-gray-400">
                AI-Powered Learning Platform
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Learn AI Engineering{" "}
              <span className="text-[hsl(262,83%,58%)]">the Right Way</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
            >
              Structured roadmaps, intelligent tutoring, and community-driven learning. 
              Go from beginner to hired AI engineer in months, not years.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 flex-wrap mb-16"
            >
              <Link to="/dashboard">
                <Button size="lg" className="bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white border-0 text-lg px-6">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 text-lg px-6">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Roadmap
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-gray-500">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-white/60" 
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="container px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose AI School?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              We combine structured learning with AI-powered tools to accelerate your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(262,83%,58%)]/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[hsl(262,83%,58%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Tutoring</h3>
              <p className="text-gray-400">
                Get instant help from our AI assistant. Learn concepts faster with personalized explanations.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(262,83%,58%)]/20 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-[hsl(262,83%,58%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Structured Roadmaps</h3>
              <p className="text-gray-400">
                Follow proven learning paths designed by industry experts. Know exactly what to learn next.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[hsl(262,83%,58%)]/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[hsl(262,83%,58%)]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Support</h3>
              <p className="text-gray-400">
                Join a community of learners. Get feedback, collaborate on projects, and grow together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0f] to-[#12121a]">
        <div className="container px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-400 mb-8">
              Join hundreds of students already learning AI engineering with us.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-[hsl(262,83%,58%)] hover:bg-[hsl(262,83%,48%)] text-white border-0 text-lg px-8">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-500">
              © 2024 AI School. Built for learners.
            </div>
            <div className="flex items-center gap-6 text-gray-500">
              <span className="hover:text-white cursor-pointer transition-colors">About</span>
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
