import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, BookOpen, ChevronRight, CheckCircle, Brain, 
  ExternalLink, Lightbulb, FlaskConical, Target, 
  Layers, Star, Folder, FolderOpen
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import guidedAssignmentsData from "@/data/guided-assignments.json";

const Assignments = () => {
  const assignments = guidedAssignmentsData.guidedAssignments;
  const [currentAssignmentIndex] = useState(0);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["module-0"]));
  const [selectedNode, setSelectedNode] = useState<{type: string, moduleIndex: number, sectionIndex?: number} | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  
  const currentAssignment = assignments[currentAssignmentIndex];

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (type: string, moduleIndex: number, sectionIndex?: number) => {
    if (type === "module") {
      toggleNode(`module-${moduleIndex}`);
    }
    setSelectedNode({ type, moduleIndex, sectionIndex });
  };

  const isNodeExpanded = (nodeId: string) => expandedNodes.has(nodeId);

  const getModuleProgress = (moduleIndex: number) => {
    const module = currentAssignment.modules[moduleIndex];
    let completed = 0;
    module.sections.forEach((section: any) => {
      if (completedSections.has(`${currentAssignmentIndex}-${moduleIndex}-${section.type}`)) {
        completed++;
      }
    });
    return { completed, total: module.sections.length };
  };

  const getOverallProgress = () => {
    let completed = 0;
    let total = 0;
    currentAssignment.modules.forEach((module: any, mi: number) => {
      module.sections.forEach((section: any) => {
        total++;
        if (completedSections.has(`${currentAssignmentIndex}-${mi}-${section.type}`)) {
          completed++;
        }
      });
    });
    return { completed, total };
  };

  const markSectionComplete = () => {
    if (!selectedNode || selectedNode.sectionIndex === undefined) return;
    const key = `${currentAssignmentIndex}-${selectedNode.moduleIndex}-${currentAssignment.modules[selectedNode.moduleIndex].sections[selectedNode.sectionIndex].type}`;
    setCompletedSections(prev => new Set([...prev, key]));
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "learning-objectives": return Target;
      case "resources": return BookOpen;
      case "creative-learning": return Lightbulb;
      case "testing": return FlaskConical;
      default: return Layers;
    }
  };

  const getSectionColor = (type: string) => {
    switch (type) {
      case "learning-objectives": return "text-blue-400 bg-blue-500/20";
      case "resources": return "text-green-400 bg-green-500/20";
      case "creative-learning": return "text-purple-400 bg-purple-500/20";
      case "testing": return "text-orange-400 bg-orange-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  const overallProgress = getOverallProgress();

  // Section Detail View
  if (selectedNode && selectedNode.sectionIndex !== undefined) {
    const module = currentAssignment.modules[selectedNode.moduleIndex];
    const section = module.sections[selectedNode.sectionIndex];
    const SectionIcon = getSectionIcon(section.type);
    const sectionColor = getSectionColor(section.type);
    const isComplete = completedSections.has(`${currentAssignmentIndex}-${selectedNode.moduleIndex}-${section.type}`);

    return (
      <div className="min-h-screen bg-[#0a0a0f]">
        <Sidebar />
        <main className="pl-16 md:pl-20 h-screen flex flex-col">
          <div className="p-6 pb-2 shrink-0">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <button 
                onClick={() => setSelectedNode(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Ladder
              </button>
              
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${sectionColor}`}>
                  <SectionIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">{section.title}</h1>
                  <p className="text-xs text-gray-500 capitalize">{section.type.replace('-', ' ')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pt-2">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                {section.type === "learning-objectives" && (
                  <ul className="space-y-4">
                    {section.content?.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-white">
                        <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "resources" && (
                  <div className="space-y-3">
                    {section.items?.map((item: any, i: number) => (
                      <div key={i} className="bg-white/5 rounded-xl p-4">
                        <span className="text-sm font-medium text-green-400">{item.category}</span>
                        <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                        {item.url && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-green-400 hover:underline flex items-center gap-1 mt-2">
                            Learn more <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "creative-learning" && (
                  <div className="space-y-3">
                    {section.items?.map((item: any, i: number) => (
                      <div key={i} className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-400">{item.method}</span>
                        </div>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === "testing" && (
                  <div className="space-y-3">
                    {section.items?.map((item: any, i: number) => (
                      <div key={i} className="bg-orange-500/10 rounded-xl p-5 border border-orange-500/20">
                        <p className="text-gray-300 mb-3">{item.description}</p>
                        {item.assertion && (
                          <div className="flex items-center gap-2 text-sm text-orange-400 bg-orange-500/10 px-3 py-2 rounded-lg">
                            <CheckCircle className="w-4 h-4" />
                            {item.assertion}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Back to Ladder
                </Button>
                
                {!isComplete && (
                  <Button onClick={markSectionComplete} className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Ladder View
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen flex flex-col">
        <div className="p-6 pb-2 shrink-0">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <Brain className="w-6 h-6 text-[hsl(262,83%,58%)]" />
              {currentAssignment.title}
            </h1>
            <p className="text-gray-400 text-sm mb-4">{currentAssignment.description}</p>
            
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(overallProgress.completed / overallProgress.total) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-400">
                {overallProgress.completed}/{overallProgress.total}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 pt-4">
          <div className="flex gap-4 min-w-max h-full items-start px-8 pt-8">
            {/* Ladder Connection Lines */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[hsl(262,83%,58%)]/30 via-[hsl(262,83%,58%)]/50 to-transparent z-0" style={{ transform: 'translateY(120px)' }} />
            
            {currentAssignment.modules.map((module: any, moduleIndex: number) => {
              const progress = getModuleProgress(moduleIndex);
              const isExpanded = isNodeExpanded(`module-${moduleIndex}`);
              const moduleCompleted = progress.completed === progress.total;
              
              // Ladder offset - each module slightly lower than previous
              const ladderOffset = moduleIndex * 40;
              
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: moduleIndex * 0.1 }}
                  className="relative z-10"
                  style={{ 
                    marginTop: `${ladderOffset}px`,
                    marginBottom: `${(currentAssignment.modules.length - moduleIndex - 1) * 40}px`
                  }}
                >
                  {/* Module Node */}
                  <div className={`w-56 rounded-xl border-2 transition-all duration-300 ${
                    moduleCompleted
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-card border-white/20 hover:border-[hsl(262,83%,58%)]/50"
                  }`}>
                    {/* Clickable area */}
                    <button
                      onClick={() => handleNodeClick("module", moduleIndex)}
                      className="w-full p-4 text-left"
                    >
                      {/* Node Circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-14 mb-3 mx-auto bg-gradient-to-br ${
                        moduleCompleted ? "from-green-500 to-emerald-500" :
                        "from-[hsl(262,83%,58%)] to-[hsl(262,83%,48%)]"
                      }`}>
                        {moduleCompleted ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : isExpanded ? (
                          <FolderOpen className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-bold">{moduleIndex + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h4 className="font-semibold text-white text-sm mb-1">{module.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{module.duration}</p>
                        
                        {/* Progress */}
                        <div className="flex items-center justify-center gap-2">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-[60px]">
                            <div 
                              className="h-full bg-[hsl(262,83%,58%)]"
                              style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            {progress.completed}/{progress.total}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Expandable Sections */}
                    {isExpanded && (
                      <div className="border-t border-white/10 pt-2 pb-2">
                        {/* Connector line to sections */}
                        <div className="w-0.5 h-4 bg-[hsl(262,83%,58%)]/30 mx-auto" />
                        
                        {/* Section nodes */}
                        <div className="flex justify-center gap-2 px-2">
                          {module.sections.map((section: any, sectionIndex: number) => {
                            const SectionIcon = getSectionIcon(section.type);
                            const isComplete = completedSections.has(`${currentAssignmentIndex}-${moduleIndex}-${section.type}`);
                            
                            return (
                              <motion.button
                                key={section.type}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: sectionIndex * 0.05 }}
                                onClick={() => setSelectedNode({ type: "section", moduleIndex, sectionIndex })}
                                className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all hover:scale-110 ${
                                  isComplete
                                    ? "bg-green-500/20 border-green-500/50"
                                    : "bg-white/5 border-white/20 hover:border-[hsl(262,83%,58%)]/50"
                                }`}
                              >
                                {isComplete ? (
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                ) : (
                                  <SectionIcon className="w-4 h-4 text-gray-400" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Bonus nodes */}
                        {module.extras && module.extras.length > 0 && (
                          <>
                            <div className="w-0.5 h-2 bg-yellow-500/20 mx-auto" />
                            <div className="flex justify-center gap-1 px-2">
                              {module.extras.map((extra: any, ei: number) => (
                                <motion.button
                                  key={ei}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.2 + ei * 0.05 }}
                                  className="w-8 h-8 rounded-lg border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-center hover:scale-110 transition-all"
                                >
                                  <Star className="w-3 h-3 text-yellow-400" />
                                </motion.button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Connection to next node */}
                  {moduleIndex < currentAssignment.modules.length - 1 && (
                    <div className="absolute top-1/2 -right-4 w-4 h-0.5 bg-gradient-to-r from-[hsl(262,83%,58%)]/50 to-[hsl(262,83%,58%)]/30" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assignments;
