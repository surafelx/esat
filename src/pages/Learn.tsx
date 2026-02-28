import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, BarChart, Settings, Package, ChevronRight, Play, CheckCircle, Lock,
  BookOpen, Lightbulb, MessageCircle, FileText, Gamepad2, Code, Clock, Zap, Trophy, Sparkles, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import coursesData from "@/data/courses.json";
import { sileo } from "sileo";

// XP constants
const XP_PER_LESSON = 50;
const XP_PER_QUIZ = 25;
const XP_PER_PROJECT = 100;

// Icon mapping
const iconMap: Record<string, React.ComponentType<any>> = {
  Brain, BarChart, Settings, Package, BookOpen, Lightbulb, MessageCircle, FileText, Gamepad2
};

type ViewState = "courses" | "modules" | "roadmap" | "lesson";

const Learn = () => {
  const [view, setView] = useState<ViewState>("courses");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [showProject, setShowProject] = useState(false);

  // Get courses from JSON
  const courses = coursesData.courses;

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setView("modules");
  };

  const handleModuleSelect = (module: any) => {
    setSelectedModule(module);
    setView("roadmap");
  };

  const handleLessonSelect = (index: number) => {
    setCurrentLessonIndex(index);
    setView("lesson");
    setShowQuiz(false);
    setQuizScore(null);
    setShowProject(false);
  };

  const handleBack = () => {
    if (view === "lesson") {
      setView("roadmap");
    } else if (view === "roadmap") {
      setView("modules");
      setSelectedModule(null);
    } else if (view === "modules") {
      setView("courses");
      setSelectedCourse(null);
    }
  };

  const addXP = (amount: number) => {
    setTotalXP(prev => prev + amount);
    
    // Show sileo toast notification with theme styling
    sileo.success({
      title: `+${amount} XP earned!`,
      description: "Keep up the great work!",
      position: "top-right",
      fill: "#0a0a0f",
      styles: {
        title: "text-white!",
        description: "text-gray-400!",
        badge: "bg-[hsl(0,84%,55%)]!",
      },
    });
  };

  const completeLesson = () => {
    const lesson = selectedModule?.lessons[currentLessonIndex];
    if (!lesson || completedLessons.has(lesson.id)) return;

    // Mark lesson as completed
    setCompletedLessons(prev => new Set([...prev, lesson.id]));

    // Add XP based on lesson type
    let xp = XP_PER_LESSON;
    if (lesson.type === "interactive" || lesson.type === "project") {
      xp = XP_PER_PROJECT;
    }
    addXP(xp);

    // Move to next lesson if available
    if (currentLessonIndex < selectedModule.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handleQuizSubmit = () => {
    const lesson = selectedModule?.lessons[currentLessonIndex];
    if (!lesson?.content?.quiz) return;

    const quiz = lesson.content.quiz;
    let correct = 0;
    quiz.questions.forEach((q: any, i: number) => {
      if (quizAnswers[i] === q.correctIndex) correct++;
    });

    const score = Math.round((correct / quiz.questions.length) * 100);
    setQuizScore(score);

    if (score >= 70) {
      addXP(XP_PER_QUIZ);
    }
  };

  const lessonTypeIcons: Record<string, React.ComponentType<any>> = {
    video: Play,
    concept: Lightbulb,
    discourse: MessageCircle,
    blog: FileText,
    interactive: Code,
    quiz: Gamepad2,
    project: Trophy,
  };

  const lessonTypeColors: Record<string, string> = {
    video: "from-blue-500 to-cyan-500",
    concept: "from-purple-500 to-pink-500",
    discourse: "from-green-500 to-emerald-500",
    blog: "from-orange-500 to-amber-500",
    interactive: "from-cyan-500 to-blue-500",
    quiz: "from-yellow-500 to-orange-500",
    project: "from-red-500 to-pink-500",
  };

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 pb-2 shrink-0 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-2">
            <div className="flex items-center gap-2">
              {view !== "courses" && (
                <button onClick={handleBack} className="p-1 rounded hover:bg-muted transition-colors">
                  <ChevronRight className="w-5 h-5 text-muted-foreground rotate-180" />
                </button>
              )}
              <h1 className="text-xl font-display font-bold text-foreground">
                {view === "courses" && "Choose Your Path"}
                {view === "modules" && selectedCourse?.title}
                {view === "roadmap" && selectedModule?.title}
                {view === "lesson" && selectedModule?.lessons[currentLessonIndex]?.title}
              </h1>
            </div>
            <p className="text-xs text-muted-foreground ml-7">
              {view === "courses" && "Select a course to begin your journey"}
              {view === "modules" && "Select a module to continue learning"}
              {view === "roadmap" && "Complete lessons to unlock the next module"}
              {view === "lesson" && `Lesson ${currentLessonIndex + 1} of ${selectedModule?.lessons?.length || 0}`}
            </p>
          </motion.div>
          {/* XP Display - Top Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(0,84%,55%)]/20 to-[hsl(25,95%,55%)]/20 border border-[hsl(0,84%,55%)]/30"
          >
            <Trophy className="w-5 h-5 text-[hsl(0,84%,55%)]" />
            <span className="text-lg font-bold text-[hsl(0,84%,55%)]">{totalXP} XP</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 pt-2 min-h-0 overflow-hidden">
          <div className="bg-card border border-border/50 rounded-2xl h-full overflow-hidden scrollbar-fire">
            <AnimatePresence mode="wait">
              {/* COURSES VIEW */}
              {view === "courses" && (
                <motion.div 
                  key="courses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full overflow-y-auto p-6 scrollbar-fire"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {courses.map((course: any, i: number) => {
                      const IconComponent = iconMap[course.icon] || Brain;
                      return (
                        <motion.button
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          onClick={() => handleCourseSelect(course)}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/30 border border-border hover:border-[hsl(0,84%,55%)]/50 transition-all duration-300 text-left group"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all`}>
                              <IconComponent className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display font-semibold text-lg text-foreground mb-1">{course.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <BookOpen className="w-3 h-3" />
                                {course.modules?.length || 0} modules
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* MODULES VIEW */}
              {view === "modules" && selectedCourse && (
                <motion.div 
                  key="modules"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full overflow-y-auto p-6 scrollbar-fire"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {selectedCourse.modules?.map((module: any, i: number) => (
                      <motion.button
                        key={module.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleModuleSelect(module)}
                        className="p-5 rounded-xl bg-card border border-border hover:border-[hsl(0,84%,55%)]/50 hover:shadow-glow transition-all duration-300 text-left group"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center">
                            <span className="text-white font-bold">{i + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-display font-semibold text-foreground">{module.title}</h4>
                            <p className="text-xs text-muted-foreground">{module.lessons?.length || 0} lessons</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-[hsl(0,84%,55%)] flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {module.lessons?.length * 50 || 0} XP
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ROADMAP VIEW */}
              {view === "roadmap" && selectedModule && (
                <motion.div 
                  key="roadmap"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full overflow-y-auto p-6 scrollbar-fire"
                >
                  <div className="max-w-3xl mx-auto">
                    {/* Roadmap Nodes */}
                    <div className="relative">
                      {/* Connection Line */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[hsl(0,84%,55%)] via-[hsl(25,95%,55%)] to-muted" />
                      
                      {selectedModule.lessons?.map((lesson: any, i: number) => {
                        const IconComponent = lessonTypeIcons[lesson.type] || BookOpen;
                        const colorClass = lessonTypeColors[lesson.type] || "from-gray-500 to-gray-600";
                        const isCompleted = i < currentLessonIndex;
                        const isCurrent = i === currentLessonIndex;
                        
                        return (
                          <motion.button
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => handleLessonSelect(i)}
                            className={`relative flex items-start gap-4 p-4 mb-3 rounded-xl border transition-all duration-300 text-left w-full ${
                              isCurrent 
                                ? "bg-[hsl(0,84%,55%)]/10 border-[hsl(0,84%,55%)]/50 shadow-glow" 
                                : isCompleted
                                  ? "bg-success/5 border-success/30 hover:border-success/50"
                                  : "bg-card border-border hover:border-[hsl(0,84%,55%)]/30"
                            }`}
                          >
                            {/* Node Circle */}
                            <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br ${colorClass} ${
                              isCurrent ? "shadow-glow" : ""
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : (
                                <IconComponent className="w-5 h-5 text-white" />
                              )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0 pt-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-display font-semibold text-foreground truncate">{lesson.title}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase shrink-0 ${
                                  lesson.type === "video" ? "bg-blue-500/20 text-blue-400" :
                                  lesson.type === "concept" ? "bg-purple-500/20 text-purple-400" :
                                  lesson.type === "discourse" ? "bg-green-500/20 text-green-400" :
                                  lesson.type === "blog" ? "bg-orange-500/20 text-orange-400" :
                                  lesson.type === "interactive" ? "bg-cyan-500/20 text-cyan-400" :
                                  "bg-yellow-500/20 text-yellow-400"
                                }`}>
                                  {lesson.type}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">{lesson.description}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {lesson.duration}
                              </div>
                            </div>
                            
                            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0 mt-3" />
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LESSON VIEW */}
              {view === "lesson" && selectedModule && selectedModule.lessons[currentLessonIndex] && (
                <motion.div 
                  key="lesson"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="h-full flex flex-col relative"
                >
                  {/* Lesson Header - Clean & Simple */}
                  <div className="px-6 py-3 border-b border-border/50 shrink-0">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wide ${
                            selectedModule.lessons[currentLessonIndex].type === "video" ? "bg-blue-500/20 text-blue-400" :
                            selectedModule.lessons[currentLessonIndex].type === "concept" ? "bg-purple-500/20 text-purple-400" :
                            selectedModule.lessons[currentLessonIndex].type === "discourse" ? "bg-green-500/20 text-green-400" :
                            selectedModule.lessons[currentLessonIndex].type === "blog" ? "bg-orange-500/20 text-orange-400" :
                            selectedModule.lessons[currentLessonIndex].type === "interactive" ? "bg-cyan-500/20 text-cyan-400" :
                            selectedModule.lessons[currentLessonIndex].type === "project" ? "bg-red-500/20 text-red-400" :
                            "bg-yellow-500/20 text-yellow-400"
                          }`}>
                            {selectedModule.lessons[currentLessonIndex].type}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {selectedModule.lessons[currentLessonIndex].duration}
                          </span>
                        </div>
                        {/* XP Display */}
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[hsl(0,84%,55%)]/20 to-[hsl(25,95%,55%)]/20 border border-[hsl(0,84%,55%)]/30">
                          <Trophy className="w-4 h-4 text-[hsl(0,84%,55%)]" />
                          <span className="text-sm font-bold text-[hsl(0,84%,55%)]">{totalXP} XP</span>
                        </div>
                      </div>
                      <h2 className="text-xl font-display font-bold text-foreground">{selectedModule.lessons[currentLessonIndex].title}</h2>
                    </div>
                  </div>

                  {/* Content Area - More Space */}
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-fire">
                    <div className="max-w-3xl mx-auto pb-24">
                      <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden">
                        {/* Video Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "video" && (
                          <div className="p-5 space-y-5">
                            <div className="aspect-video rounded-xl bg-black/80 flex items-center justify-center mb-5 overflow-hidden shadow-inner">
                              {(() => {
                                const videoUrl = selectedModule.lessons[currentLessonIndex].content?.videoUrl || '';
                                const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
                                
                                if (isYouTube && videoUrl) {
                                  let embedUrl = videoUrl;
                                  if (videoUrl.includes('youtube.com/watch')) {
                                    const videoId = new URL(videoUrl).searchParams.get('v');
                                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                                  } else if (videoUrl.includes('youtu.be/')) {
                                    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
                                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                                  }
                                  return (
                                    <iframe 
                                      src={embedUrl}
                                      className="w-full h-full"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  );
                                } else if (videoUrl) {
                                  return (
                                    <iframe 
                                      src={videoUrl}
                                      className="w-full h-full"
                                      allowFullScreen
                                    />
                                  );
                                }
                                return <Play className="w-12 h-12 text-muted-foreground" />;
                              })()}
                            </div>

                            {/* Video Recap / Summary */}
                            {selectedModule.lessons[currentLessonIndex].content?.transcript && (
                              <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-5 border-l-4 border-blue-500">
                                <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4" />
                                  Video Recap
                                </h4>
                                <p className="text-sm text-foreground leading-relaxed">{selectedModule.lessons[currentLessonIndex].content?.transcript}</p>
                              </div>
                            )}

                            {/* Key Points from Video */}
                            {selectedModule.lessons[currentLessonIndex].content?.topics && (
                              <div className="bg-muted/30 rounded-lg p-5">
                                <h4 className="text-sm font-semibold text-foreground mb-3">Key Concepts</h4>
                                <ul className="space-y-2">
                                  {selectedModule.lessons[currentLessonIndex].content.topics.map((topic: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                      {topic}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Exercise */}
                            {selectedModule.lessons[currentLessonIndex].content?.exercise && (
                              <div className="bg-orange-500/10 rounded-lg p-5 border border-orange-500/20">
                                <h4 className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                                  <Trophy className="w-4 h-4" />
                                  Practice Exercise
                                </h4>
                                <p className="text-sm text-muted-foreground">{selectedModule.lessons[currentLessonIndex].content.exercise}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Concept Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "concept" && (
                          <div className="p-5 space-y-5">
                            {selectedModule.lessons[currentLessonIndex].content?.sections?.map((section: any, i: number) => (
                              <div key={i} className="bg-muted/30 rounded-lg p-5">
                                <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                                  <span className="w-6 h-6 rounded-full bg-[hsl(0,84%,55%)]/20 flex items-center justify-center text-[hsl(0,84%,55%)] text-xs font-bold">{i + 1}</span>
                                  {section.title}
                                </h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{section.body}</p>
                              </div>
                            ))}

                            {/* Topics for concept lessons */}
                            {selectedModule.lessons[currentLessonIndex].content?.topics && (
                              <div className="bg-purple-500/10 rounded-lg p-5 border border-purple-500/20">
                                <h4 className="text-sm font-semibold text-purple-400 mb-3">Topics Covered</h4>
                                <div className="flex flex-wrap gap-2">
                                  {selectedModule.lessons[currentLessonIndex].content.topics.map((topic: string, i: number) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Blog Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "blog" && (
                          <div className="p-5 space-y-5">
                            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-lg p-5 border-l-4 border-orange-500">
                              <p className="text-base text-foreground font-medium">{selectedModule.lessons[currentLessonIndex].content?.summary}</p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{selectedModule.lessons[currentLessonIndex].content?.body}</p>
                            {selectedModule.lessons[currentLessonIndex].content?.keyPoints && (
                              <div className="bg-muted/30 rounded-lg p-5">
                                <h4 className="text-sm font-semibold text-foreground mb-3">Key Takeaways</h4>
                                <ul className="space-y-2">
                                  {selectedModule.lessons[currentLessonIndex].content.keyPoints.map((point: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Interactive Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "interactive" && (
                          <div className="p-5 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                              {selectedModule.lessons[currentLessonIndex].content?.terms?.slice(0, 4).map((term: any, i: number) => (
                                <div key={i} className="p-5 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                                  <span className="text-sm font-medium text-foreground">{term.term}</span>
                                </div>
                              ))}
                            </div>

                            {/* Interactive Exercise */}
                            {selectedModule.lessons[currentLessonIndex].content?.exercise && (
                              <div className="bg-cyan-500/10 rounded-lg p-5 border border-cyan-500/20">
                                <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                                  <Code className="w-4 h-4" />
                                  Hands-on Exercise
                                </h4>
                                <p className="text-sm text-muted-foreground">{selectedModule.lessons[currentLessonIndex].content.exercise}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Project Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "project" && (
                          <div className="p-5 space-y-5">
                            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-xl p-5 border-l-4 border-red-500">
                              <h4 className="text-base font-semibold text-red-400 mb-3 flex items-center gap-2">
                                <Trophy className="w-5 h-5" />
                                Project Challenge
                              </h4>
                              <p className="text-sm text-foreground leading-relaxed">{selectedModule.lessons[currentLessonIndex].description}</p>
                            </div>

                            {/* Project Steps */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-semibold text-foreground">Project Steps:</h5>
                              {[1, 2, 3].map((step, i) => (
                                <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                                  <div className="w-6 h-6 rounded-full bg-[hsl(0,84%,55%)]/20 flex items-center justify-center text-[hsl(0,84%,55%)] text-xs font-bold shrink-0">
                                    {i + 1}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {i === 0 && "Plan your project architecture and identify key components"}
                                    {i === 1 && "Implement the core functionality based on what you've learned"}
                                    {i === 2 && "Test your solution and prepare for the next module"}
                                  </p>
                                </div>
                              ))}
                            </div>

                            {/* Expected Output */}
                            <div className="bg-green-500/10 rounded-lg p-5 border border-green-500/20">
                              <h4 className="text-sm font-semibold text-green-400 mb-2">💡 Expected Output</h4>
                              <p className="text-sm text-muted-foreground">
                                A working implementation that demonstrates understanding of the concepts covered in this module.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Quiz Section */}
                        {selectedModule.lessons[currentLessonIndex].content?.quiz && !showQuiz && (
                          <div className="p-5 border-t border-border/50">
                            <Button
                              onClick={() => setShowQuiz(true)}
                              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white"
                            >
                              <Gamepad2 className="w-4 h-4 mr-2" />
                              Take Quiz (+{XP_PER_QUIZ} XP)
                            </Button>
                          </div>
                        )}

                        {/* Quiz View */}
                        {showQuiz && selectedModule.lessons[currentLessonIndex].content?.quiz && (
                          <div className="p-5 border-t border-border/50 bg-yellow-500/5">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-base font-semibold text-foreground">Quick Quiz</h4>
                              <button onClick={() => setShowQuiz(false)} className="p-1 hover:bg-muted rounded">
                                <X className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>

                            {quizScore === null ? (
                              <div className="space-y-4">
                                {selectedModule.lessons[currentLessonIndex].content.quiz.questions.map((question: any, qIndex: number) => (
                                  <div key={qIndex} className="space-y-2">
                                    <p className="text-sm font-medium text-foreground">{qIndex + 1}. {question.question}</p>
                                    <div className="space-y-1">
                                      {question.options.map((option: string, oIndex: number) => (
                                        <button
                                          key={oIndex}
                                          onClick={() => setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                                          className={`w-full p-3 text-left text-sm rounded-lg border transition-all ${
                                            quizAnswers[qIndex] === oIndex
                                              ? "border-[hsl(0,84%,55%)] bg-[hsl(0,84%,55%)]/10 text-foreground"
                                              : "border-border hover:border-[hsl(0,84%,55%)]/50 text-muted-foreground"
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                <Button
                                  onClick={handleQuizSubmit}
                                  disabled={Object.keys(quizAnswers).length < selectedModule.lessons[currentLessonIndex].content.quiz.questions.length}
                                  className="w-full mt-4 bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)]"
                                >
                                  Submit Quiz
                                </Button>
                              </div>
                            ) : (
                              <div className="text-center py-4">
                                <div className={`text-3xl font-bold mb-2 ${quizScore >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                                  {quizScore}%
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                  {quizScore >= 70 ? '🎉 Great job! You passed!' : '📚 Review the lesson and try again.'}
                                </p>
                                {quizScore >= 70 && (
                                  <p className="text-sm text-[hsl(0,84%,55%)]">+{XP_PER_QUIZ} XP earned!</p>
                                )}
                                <Button
                                  onClick={() => {
                                    setShowQuiz(false);
                                    setQuizScore(null);
                                    setQuizAnswers({});
                                  }}
                                  className="mt-4"
                                  variant="outline"
                                >
                                  Continue
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Navigation - Sticky at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/95 backdrop-blur-sm border-t border-border/50 shrink-0">
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        onClick={() => currentLessonIndex > 0 && setCurrentLessonIndex(currentLessonIndex - 1)}
                        disabled={currentLessonIndex === 0}
                        className="gap-2"
                      >
                          <ChevronRight className="w-4 h-4 rotate-180" />
                          Previous
                      </Button>
                      <div className="flex items-center gap-3">
                        {selectedModule.lessons.map((_: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => setCurrentLessonIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              i === currentLessonIndex 
                                ? "bg-[hsl(0,84%,55%)] w-6" 
                                : completedLessons.has(selectedModule.lessons[i].id)
                                  ? "bg-green-500" 
                                  : "bg-muted hover:bg-muted/70"
                            }`}
                          />
                        ))}
                      </div>
                      <Button 
                        className="gap-2 bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)] text-white border-0"
                        onClick={completeLesson}
                      >
                          {completedLessons.has(selectedModule.lessons[currentLessonIndex].id) ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              Next
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;
