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
                  className="h-full flex flex-col"
                >
                  {/* Lesson Header - Clean & Simple */}
                  <div className="px-6 py-3 border-b border-border/50 shrink-0">
                    <div className="max-w-3xl mx-auto">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wide ${
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
                      <h2 className="text-xl font-display font-bold text-foreground">{selectedModule.lessons[currentLessonIndex].title}</h2>
                    </div>
                  </div>

                  {/* Content Area - More Space */}
                  <div className="flex-1 overflow-y-auto p-4 scrollbar-fire">
                    <div className="max-w-3xl mx-auto pb-24">
                      <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden">
                        {/* Video Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "video" && (
                          <div className="p-5">
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
                            <div className="bg-muted/30 rounded-lg p-5">
                              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selectedModule.lessons[currentLessonIndex].content?.transcript}</p>
                            </div>
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

                        {/* Discourse Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "discourse" && (
                          <div className="p-5 space-y-5">
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-5 border-l-4 border-green-500">
                              <h4 className="text-base font-semibold text-foreground mb-2">Discussion Topic</h4>
                              <p className="text-sm text-muted-foreground">{selectedModule.lessons[currentLessonIndex].content?.topic}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {selectedModule.lessons[currentLessonIndex].content?.aiEngineering && (
                                <div className="p-5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                  <h5 className="text-sm font-semibold text-blue-400 mb-2">AI Engineering</h5>
                                  <p className="text-sm text-muted-foreground">{selectedModule.lessons[currentLessonIndex].content.aiEngineering.definition}</p>
                                </div>
                              )}
                              {selectedModule.lessons[currentLessonIndex].content?.mlEngineering && (
                                <div className="p-5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                  <h5 className="text-sm font-semibold text-purple-400 mb-2">ML Engineering</h5>
                                  <p className="text-sm text-muted-foreground">{selectedModule.lessons[currentLessonIndex].content.mlEngineering.definition}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Interactive Lesson */}
                        {selectedModule.lessons[currentLessonIndex].type === "interactive" && (
                          <div className="p-5">
                            <div className="grid grid-cols-2 gap-4">
                              {selectedModule.lessons[currentLessonIndex].content?.terms?.slice(0, 4).map((term: any, i: number) => (
                                <div key={i} className="p-5 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                                  <span className="text-sm font-medium text-foreground">{term.term}</span>
                                </div>
                              ))}
                            </div>
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
                                : i < currentLessonIndex 
                                  ? "bg-green-500" 
                                  : "bg-muted hover:bg-muted/70"
                            }`}
                          />
                        ))}
                      </div>
                      <Button 
                        className="gap-2 bg-[hsl(0,84%,55%)] hover:bg-[hsl(0,84%,45%)] text-white border-0"
                        onClick={() => currentLessonIndex < selectedModule.lessons.length - 1 && setCurrentLessonIndex(currentLessonIndex + 1)}
                        disabled={currentLessonIndex === selectedModule.lessons.length - 1}
                      >
                          Next
                          <ChevronRight className="w-4 h-4" />
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
