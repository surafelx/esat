import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, BarChart, Settings, Package, ChevronRight, Play, CheckCircle, Lock,
  BookOpen, Lightbulb, MessageCircle, FileText, Gamepad2, Code, Clock, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import coursesData from "@/data/courses.json";

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

  const lessonTypeIcons: Record<string, React.ComponentType<any>> = {
    video: Play,
    concept: Lightbulb,
    discourse: MessageCircle,
    blog: FileText,
    interactive: Code,
    quiz: Gamepad2,
  };

  const lessonTypeColors: Record<string, string> = {
    video: "from-blue-500 to-cyan-500",
    concept: "from-purple-500 to-pink-500",
    discourse: "from-green-500 to-emerald-500",
    blog: "from-orange-500 to-amber-500",
    interactive: "from-cyan-500 to-blue-500",
    quiz: "from-yellow-500 to-orange-500",
  };

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 pb-2 shrink-0">
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
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 pt-2 min-h-0 overflow-hidden">
          <div className="bg-card border border-border/50 rounded-2xl h-full overflow-hidden">
            <AnimatePresence mode="wait">
              {/* COURSES VIEW */}
              {view === "courses" && (
                <motion.div 
                  key="courses"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full overflow-y-auto p-6"
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
                  className="h-full overflow-y-auto p-6"
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
                  className="h-full overflow-y-auto p-6"
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
                  className="h-full overflow-y-auto p-6"
                >
                  <div className="max-w-2xl mx-auto">
                    {/* Lesson Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                          selectedModule.lessons[currentLessonIndex].type === "video" ? "bg-blue-500/20 text-blue-400" :
                          selectedModule.lessons[currentLessonIndex].type === "concept" ? "bg-purple-500/20 text-purple-400" :
                          selectedModule.lessons[currentLessonIndex].type === "discourse" ? "bg-green-500/20 text-green-400" :
                          selectedModule.lessons[currentLessonIndex].type === "blog" ? "bg-orange-500/20 text-orange-400" :
                          selectedModule.lessons[currentLessonIndex].type === "interactive" ? "bg-cyan-500/20 text-cyan-400" :
                          "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {selectedModule.lessons[currentLessonIndex].type}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedModule.lessons[currentLessonIndex].duration}
                        </span>
                      </div>
                      <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                        {selectedModule.lessons[currentLessonIndex].title}
                      </h2>
                      <p className="text-muted-foreground">
                        {selectedModule.lessons[currentLessonIndex].description}
                      </p>
                    </div>

                    {/* Lesson Content Placeholder */}
                    <div className="p-8 rounded-2xl bg-muted/30 border border-border text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] flex items-center justify-center mx-auto mb-4">
                        {(() => {
                          const IconComponent = lessonTypeIcons[selectedModule.lessons[currentLessonIndex].type] || BookOpen;
                          return <IconComponent className="w-10 h-10 text-white" />;
                        })()}
                      </div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        {selectedModule.lessons[currentLessonIndex].type === "video" && "Video Lesson"}
                        {selectedModule.lessons[currentLessonIndex].type === "concept" && "Concept Explanation"}
                        {selectedModule.lessons[currentLessonIndex].type === "discourse" && "AI Discussion"}
                        {selectedModule.lessons[currentLessonIndex].type === "blog" && "Article"}
                        {selectedModule.lessons[currentLessonIndex].type === "interactive" && "Interactive Exercise"}
                        {selectedModule.lessons[currentLessonIndex].type === "quiz" && "Quiz"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Content would be rendered here based on lesson type
                      </p>
                      <Button className="bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white border-0">
                        <Play className="w-4 h-4 mr-2" />
                        Start Lesson
                      </Button>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                      <Button 
                        variant="ghost" 
                        onClick={() => currentLessonIndex > 0 && setCurrentLessonIndex(currentLessonIndex - 1)}
                        disabled={currentLessonIndex === 0}
                      >
                        ← Previous
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {currentLessonIndex + 1} / {selectedModule.lessons.length}
                      </span>
                      <Button 
                        className="bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90 text-white border-0"
                        onClick={() => currentLessonIndex < selectedModule.lessons.length - 1 && setCurrentLessonIndex(currentLessonIndex + 1)}
                        disabled={currentLessonIndex === selectedModule.lessons.length - 1}
                      >
                        Next →
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
