import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  User, Mail, BookOpen, Zap, LogOut, ArrowLeft, 
  GraduationCap, Users, FileText, BarChart3, Plus
} from "lucide-react";

const API_URL = "http://localhost:3000";

interface StudentData {
  uid: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  completedLessons: string[];
  completedAssignments: string[];
  createdAt?: string;
}

const Instructor = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<StudentData | null>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeToday: 0,
    avgProgress: 0,
    totalXP: 0
  });

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      if (!idToken) {
        navigate("/");
        return;
      }

      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data);
        
        // Allow both admin and instructor
        if (data.role !== "admin" && data.role !== "instructor") {
          navigate("/dashboard");
          return;
        }
        
        fetchStudents(idToken);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const fetchStudents = async (idToken: string) => {
    try {
      // Fetch all users and filter to students
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        const studentList = data.filter((u: StudentData) => u.role === "student");
        setStudents(studentList);

        // Calculate stats
        const totalXP = studentList.reduce((sum: number, s: StudentData) => sum + (s.xp || 0), 0);
        const avgProgress = studentList.length > 0 
          ? Math.round(studentList.reduce((sum: number, s: StudentData) => {
              const lessons = s.completedLessons?.length || 0;
              const assignments = s.completedAssignments?.length || 0;
              return sum + lessons + assignments;
            }, 0) / studentList.length)
          : 0;

        setStats({
          totalStudents: studentList.length,
          activeToday: Math.floor(studentList.length * 0.3), // Placeholder
          avgProgress,
          totalXP
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getProgressColor = (xp: number) => {
    if (xp >= 2000) return "text-purple-400";
    if (xp >= 1000) return "text-blue-400";
    if (xp >= 500) return "text-green-400";
    return "text-gray-400";
  };

  const getLevelBadge = (level: number) => {
    if (level >= 10) return { bg: "bg-purple-500", label: "Master" };
    if (level >= 7) return { bg: "bg-blue-500", label: "Advanced" };
    if (level >= 4) return { bg: "bg-green-500", label: "Intermediate" };
    return { bg: "bg-gray-500", label: "Beginner" };
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                Instructor Dashboard
              </h1>
              <p className="text-gray-400">Monitor student progress and performance</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <div className="text-sm text-gray-500">Total Students</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{stats.activeToday}</div>
              <div className="text-sm text-gray-500">Active Today</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{stats.avgProgress}</div>
              <div className="text-sm text-gray-500">Avg. Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{stats.totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Total XP Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button 
            className="h-auto py-4 flex flex-col items-center gap-2"
            onClick={() => navigate("/assignments")}
          >
            <FileText className="w-6 h-6" />
            <span>Create Assignment</span>
          </Button>
          <Button 
            className="h-auto py-4 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => navigate("/meetings")}
          >
            <Users className="w-6 h-6" />
            <span>Schedule Office Hours</span>
          </Button>
          <Button 
            className="h-auto py-4 flex flex-col items-center gap-2"
            variant="outline"
            onClick={() => navigate("/community")}
          >
            <BookOpen className="w-6 h-6" />
            <span>Post Announcement</span>
          </Button>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Roster</CardTitle>
            <CardDescription>View and track student progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-400 font-medium">Student</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Level</th>
                    <th className="text-left p-3 text-gray-400 font-medium">XP</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Lessons</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Assignments</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    const levelBadge = getLevelBadge(student.level || 1);
                    return (
                      <tr key={student.uid} className="border-b hover:bg-gray-800">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{student.email}</div>
                              <div className="text-xs text-gray-400">{student.uid.slice(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={`${levelBadge.bg}`}>
                            Level {student.level || 1}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <span className={`font-bold ${getProgressColor(student.xp || 0)}`}>
                            {student.xp?.toLocaleString() || 0} XP
                          </span>
                        </td>
                        <td className="p-3 text-white">
                          {student.completedLessons?.length || 0}
                        </td>
                        <td className="p-3 text-white">
                          {student.completedAssignments?.length || 0}
                        </td>
                        <td className="p-3 text-gray-400">
                          {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              
              {students.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No students found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Instructor;
