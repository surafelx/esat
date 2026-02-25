import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Star } from "lucide-react";

interface RubricDimension {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
}

interface EvaluationResult {
  title: string;
  overallScore: number;
  maxScore: number;
  dimensions: RubricDimension[];
  summary: string;
  improvements: string[];
}

const sampleEvaluation: EvaluationResult = {
  title: "Assignment 3: Linear Regression Implementation",
  overallScore: 82,
  maxScore: 100,
  summary: "Strong implementation with good understanding of core concepts. Code is clean and well-structured. Some room for improvement in optimization techniques and edge case handling.",
  dimensions: [
    { name: "Technical Correctness", score: 18, maxScore: 20, feedback: "Correct implementation of gradient descent. Minor issue with learning rate scheduling." },
    { name: "Conceptual Understanding", score: 17, maxScore: 20, feedback: "Clear grasp of linear regression theory. Could elaborate more on assumptions and limitations." },
    { name: "Code Quality", score: 16, maxScore: 20, feedback: "Well-organized code with good naming conventions. Consider adding type hints and docstrings." },
    { name: "Explanation Clarity", score: 15, maxScore: 20, feedback: "Good explanations overall. The loss function section could use more visual aids." },
    { name: "Problem Solving", score: 16, maxScore: 20, feedback: "Creative approach to feature engineering. Try exploring regularization techniques." },
  ],
  improvements: [
    "Add learning rate decay to improve convergence",
    "Include more comprehensive edge case testing",
    "Consider using vectorized operations for better performance",
    "Add visualization of the loss curve during training",
  ],
};

const RubricEvaluator = ({ evaluation = sampleEvaluation }: { evaluation?: EvaluationResult }) => {
  const scorePercent = (evaluation.overallScore / evaluation.maxScore) * 100;
  const scoreColor = scorePercent >= 80 ? "text-success" : scorePercent >= 60 ? "text-warning" : "text-destructive";

  return (
    <div className="space-y-5">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-xl bg-card border border-border text-center"
      >
        <h3 className="font-display font-semibold text-foreground mb-4">{evaluation.title}</h3>
        <div className={cn("text-5xl font-display font-bold mb-2", scoreColor)}>
          {evaluation.overallScore}<span className="text-xl text-muted-foreground">/{evaluation.maxScore}</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">{evaluation.summary}</p>
      </motion.div>

      {/* Dimensions */}
      <div className="space-y-3">
        {evaluation.dimensions.map((dim, i) => {
          const pct = (dim.score / dim.maxScore) * 100;
          return (
            <motion.div
              key={dim.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-medium text-sm text-foreground">{dim.name}</h4>
                <span className="text-sm font-semibold text-foreground">
                  {dim.score}/{dim.maxScore}
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                  className={cn(
                    "h-full rounded-full",
                    pct >= 80 ? "bg-success" : pct >= 60 ? "bg-warning" : "bg-destructive"
                  )}
                />
              </div>
              <p className="text-xs text-muted-foreground">{dim.feedback}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Improvements */}
      <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
        <h4 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-primary" />
          Suggested Improvements
        </h4>
        <ul className="space-y-2">
          {evaluation.improvements.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RubricEvaluator;
