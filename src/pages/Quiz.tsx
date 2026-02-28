import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, CheckCircle, XCircle, Trophy, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sileo } from "sileo";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizData {
  lessonTitle: string;
  questions: QuizQuestion[];
}

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get quiz data from navigation state
  const quizData: QuizData = location.state?.quizData || {
    lessonTitle: "Quiz",
    questions: []
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    quizData.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correctIndex) correct++;
    });
    return Math.round((correct / quizData.questions.length) * 100);
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);

    // Show toast notification
    if (finalScore >= 70) {
      sileo.success({
        title: `+25 XP earned!`,
        description: finalScore === 100 ? "Perfect score!" : "Great job!",
        position: "top-right",
        fill: "#171717",
        styles: {
          title: "text-white!",
          description: "text-red-400!",
        },
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === quizData.questions[currentQuestion]?.correctIndex;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Lesson</span>
          </button>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[hsl(0,84%,55%)]/20 to-[hsl(25,95%,55%)]/20 border border-[hsl(0,84%,55%)]/30">
            <Trophy className="w-4 h-4 text-[hsl(0,84%,55%)]" />
            <span className="text-sm font-bold text-[hsl(0,84%,55%)]">+25 XP</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-4 py-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / quizData.questions.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {showResults ? (
            // Results View
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className={`text-6xl font-bold mb-4 ${score >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                {score}%
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {score >= 70 ? '🎉 Congratulations!' : '📚 Keep Learning!'}
              </h2>
              <p className="text-gray-400 mb-8">
                {score >= 70 
                  ? "You've passed the quiz! Great understanding of the material." 
                  : "Review the lesson and try again. You need 70% to pass."}
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={handleRetake}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Retake Quiz
                </Button>
                <Button 
                  onClick={() => navigate(-1)}
                  className="bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)] text-white"
                >
                  Back to Lesson
                </Button>
              </div>
            </motion.div>
          ) : (
            // Question View
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">
                {quizData.questions[currentQuestion]?.question}
              </h2>

              <div className="space-y-3">
                {quizData.questions[currentQuestion]?.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                      selectedAnswers[currentQuestion] === idx
                        ? "border-[hsl(0,84%,55%)] bg-[hsl(0,84%,55%)]/10 text-white"
                        : "border-white/10 hover:border-white/30 bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === idx
                          ? "border-[hsl(0,84%,55%)] bg-[hsl(0,84%,55%)]"
                          : "border-gray-500"
                      }`}>
                        {selectedAnswers[currentQuestion] === idx && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button 
                  variant="ghost" 
                  onClick={handlePrevQuestion}
                  disabled={currentQuestion === 0}
                  className="text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentQuestion === quizData.questions.length - 1 ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < quizData.questions.length}
                    className="bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)] text-white"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNextQuestion}
                    disabled={!isAnswered}
                    className="bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)] text-white"
                  >
                    Next
                    <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
