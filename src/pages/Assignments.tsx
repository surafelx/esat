import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";
import coursesData from "@/data/courses.json";

const Assignments = () => {
  const courses = coursesData.courses;

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        <div className="p-6 h-[calc(100vh-0px)] overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-bold text-white mb-2">
                Assignments
              </h1>
              <p className="text-gray-400">
                Practice what you've learned with hands-on projects
              </p>
            </motion.div>

            {/* Coming Soon Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center mb-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-[hsl(262,83%,58%)]/20 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[hsl(262,83%,58%)]" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Assignments Coming Soon
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                We're working on exciting hands-on projects for each course. 
                Check back soon to start building real AI applications!
              </p>
            </motion.div>

            {/* Course Previews - using JSON data */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[hsl(262,83%,58%)]" />
                Upcoming Assignments
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {courses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="p-5 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{course.title}</h4>
                        <p className="text-xs text-gray-500">{course.modules.length} modules</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{course.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assignments;
