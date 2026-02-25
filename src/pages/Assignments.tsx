import Navbar from "@/components/Navbar";
import RubricEvaluator from "@/components/RubricEvaluator";
import { motion } from "framer-motion";
import { ClipboardCheck, Upload, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const assignments = [
  { title: "Linear Regression Implementation", status: "graded", score: 82, due: "Feb 20" },
  { title: "Classification with Decision Trees", status: "submitted", score: null, due: "Feb 25" },
  { title: "Neural Network from Scratch", status: "in-progress", score: null, due: "Mar 2" },
  { title: "NLP Sentiment Analysis", status: "locked", score: null, due: "Mar 10" },
];

const Assignments = () => {
  return (
    <div className="min-h-screen gradient-surface">
      <Navbar />
      <main className="container px-6 pt-24 pb-12 md:pt-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">Assignments</h1>
          <p className="text-muted-foreground">Submit work. Get AI-powered rubric evaluations.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assignment list */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 rounded-xl bg-card border border-border"
          >
            <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              Your Assignments
            </h2>
            <div className="space-y-2">
              {assignments.map((a) => (
                <div
                  key={a.title}
                  className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/20 ${
                    a.status === "graded" ? "border-success/20 bg-success/5" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm text-foreground">{a.title}</h4>
                    {a.score && (
                      <span className="text-xs font-bold text-success">{a.score}%</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      a.status === "graded" ? "bg-success/10 text-success" :
                      a.status === "submitted" ? "bg-primary/10 text-primary" :
                      a.status === "in-progress" ? "bg-warning/10 text-warning" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {a.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {a.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Button variant="glass" size="sm" className="w-full">
                <Upload className="w-3.5 h-3.5" />
                Submit New Assignment
              </Button>
            </div>
          </motion.div>

          {/* Rubric view */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <RubricEvaluator />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Assignments;
