import Sidebar from "@/components/Sidebar";
import { Calendar } from "@/components/ui/calendar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Video, Calendar as CalendarIcon, Clock, Users, 
  BookOpen, Brain, MessageSquare, ChevronLeft, ChevronRight,
  Play, Mic, MicOff, VideoOff, ScreenShare, PhoneOff
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const meetings = [
  { 
    id: 1, 
    title: "AI Fundamentals Review", 
    time: "10:00 AM", 
    duration: "30 min",
    type: "lesson",
    instructor: "Dr. Sarah Chen",
    attendees: 12,
    status: "upcoming"
  },
  { 
    id: 2, 
    title: "Office Hours - ML Questions", 
    time: "2:00 PM", 
    duration: "45 min",
    type: "qa",
    instructor: "Prof. Mike Johnson",
    attendees: 8,
    status: "upcoming"
  },
  { 
    id: 3, 
    title: "Peer Study Group", 
    time: "4:30 PM", 
    duration: "60 min",
    type: "group",
    instructor: null,
    attendees: 5,
    status: "upcoming"
  },
];

const upcomingSessions = [
  { day: "Mon", date: 26, title: "Gradient Descent", type: "lesson" },
  { day: "Tue", date: 27, title: "Office Hours", type: "qa" },
  { day: "Wed", date: 28, title: "Study Group", type: "group" },
  { day: "Thu", date: 29, title: "Neural Networks", type: "lesson" },
  { day: "Fri", date: 30, title: "Project Review", type: "review" },
];

const statButtons = [
  { label: "3 Today", icon: Video, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "12 This Week", icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  { label: "2 Lessons", icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "1 Q&A", icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-500/10" },
];

const Meetings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        {/* Tiny stat buttons above the card */}
        <div className="p-4 pb-2 flex gap-2">
          {statButtons.map((stat, i) => (
            <button
              key={i}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${stat.bg} border border-border/50 hover:border-primary/30 transition-all`}
            >
              <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
              <span className="text-xs font-medium text-foreground">{stat.label}</span>
            </button>
          ))}
        </div>

        {/* Big card container */}
        <div className="p-4 pt-2 h-[calc(100vh-80px)]">
          <div className="bg-card border border-border rounded-2xl h-full overflow-hidden flex">
            {/* Main content area */}
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6"
              >
                <h1 className="text-2xl font-display font-bold text-foreground mb-1">Meetings & Schedule</h1>
                <p className="text-muted-foreground text-sm">Join live sessions, office hours, and study groups</p>
              </motion.div>

              {/* Today's meetings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <h2 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" />
                    Today's Meetings
                  </h2>
                  <div className="space-y-2">
                    {meetings.map((meeting, i) => (
                      <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setSelectedMeeting(meeting)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedMeeting?.id === meeting.id 
                            ? "bg-primary/10 border-primary/30" 
                            : "border-border hover:border-primary/20"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-xs text-foreground">{meeting.title}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                            meeting.type === "lesson" ? "bg-blue-500/10 text-blue-500" :
                            meeting.type === "qa" ? "bg-purple-500/10 text-purple-500" :
                            "bg-green-500/10 text-green-500"
                          }`}>
                            {meeting.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {meeting.time}
                          </span>
                          <span>{meeting.duration}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {meeting.attendees}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Week preview */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <h2 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                    This Week
                  </h2>
                  <div className="grid grid-cols-5 gap-2">
                    {upcomingSessions.map((session, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="p-2 rounded-lg bg-muted/50 border border-border text-center hover:border-primary/20 transition-colors cursor-pointer"
                      >
                        <div className="text-[9px] text-muted-foreground">{session.day}</div>
                        <div className="text-sm font-semibold text-foreground">{session.date}</div>
                        <div className={`text-[8px] mt-1 ${
                          session.type === "lesson" ? "text-blue-500" :
                          session.type === "qa" ? "text-purple-500" :
                          session.type === "group" ? "text-green-500" :
                          "text-orange-500"
                        }`}>
                          {session.type}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Quick join section */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-xl gradient-hero text-primary-foreground"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-semibold text-lg mb-1">Ready to join?</h2>
                    <p className="text-xs opacity-80">Click on any meeting to join or view details</p>
                  </div>
                  <Button variant="hero" size="lg" className="bg-primary-foreground text-foreground">
                    <Play className="w-4 h-4" />
                    Join Now
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Calendar sidebar */}
            <div className="w-72 border-l border-border p-4 hidden lg:block overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-lg"
                />
              </motion.div>
              
              <div className="mt-4">
                <h3 className="font-display font-semibold text-xs text-foreground mb-2">Scheduled Sessions</h3>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <Video className="w-3 h-3 text-blue-500" />
                      <span className="font-medium text-foreground">10:00 AM</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">AI Fundamentals Review</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <MessageSquare className="w-3 h-3 text-purple-500" />
                      <span className="font-medium text-foreground">2:00 PM</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Office Hours - ML</p>
                  </div>
                  <div className="p-2 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-3 h-3 text-green-500" />
                      <span className="font-medium text-foreground">4:30 PM</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Peer Study Group</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Meetings;
