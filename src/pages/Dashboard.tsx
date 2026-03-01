import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/config";
import { 
  User, Shield, Zap, LogOut, Users, 
  BookOpen, Award, ChevronRight, Crown, 
  Target, Flame, TrendingUp, Rocket
} from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  streak?: number;
  completedLessons: string[];
  completedAssignments: string[];
  createdAt?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
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
        setUser(data);
      } else if (res.status === 401) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "instructor": return "bg-gradient-to-r from-blue-500 to-blue-600";
      default: return "bg-gradient-to-r from-green-500 to-green-600";
    }
  };

  const getLevelTitle = (level: number) => {
    if (level >= 20) return "AI Master";
    if (level >= 15) return "Senior Engineer";
    if (level >= 10) return "AI Developer";
    if (level >= 5) return "Junior Developer";
    return "Beginner";
  };

  const getLevelColor = (level: number) => {
    if (level >= 20) return "from-yellow-400 to-orange-500";
    if (level >= 15) return "from-purple-400 to-pink-500";
    if (level >= 10) return "from-blue-400 to-cyan-500";
    if (level >= 5) return "from-green-400 to-teal-500";
    return "from-gray-400 to-slate-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const lessonsCompleted = user.completedLessons?.length || 0;
  const projectsCompleted = user.completedAssignments?.length || 0;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ESAT</span>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="ghost" 
              className="text-slate-400 hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-slate-400">
            Continue your AI engineering journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* XP Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">
                {user.xp?.toLocaleString() || 0}
              </div>
              <p className="text-slate-400 text-sm">Total XP</p>
            </CardContent>
          </Card>

          {/* Level Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getLevelColor(user.level || 1)} rounded-xl flex items-center justify-center`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Lvl {user.level || 1}</span>
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {getLevelTitle(user.level || 1)}
              </div>
              <p className="text-slate-400 text-sm">
                {((user.level || 1) * 500 - (user.xp || 0))} XP to next level
              </p>
            </CardContent>
          </Card>

          {/* Lessons Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{lessonsCompleted}</div>
              <p className="text-slate-400 text-sm">Lessons Completed</p>
            </CardContent>
          </Card>

          {/* Projects Card */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{projectsCompleted}</div>
              <p className="text-slate-400 text-sm">Projects Built</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your Progress</CardTitle>
              <CardDescription className="text-slate-400">Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{user.email}</h3>
                    <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">
                    Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Button 
                  className="h-auto py-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 justify-start"
                  onClick={() => navigate("/learn")}
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-400" />
                    <div className="text-left">
                      <div className="font-medium text-white">Continue Learning</div>
                      <div className="text-xs text-slate-400">Pick up where you left off</div>
                    </div>
                  </div>
                </Button>

                <Button 
                  className="h-auto py-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 justify-start"
                  onClick={() => navigate("/assignments")}
                >
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-purple-400" />
                    <div className="text-left">
                      <div className="font-medium text-white">View Assignments</div>
                      <div className="text-xs text-slate-400">Build real-world projects</div>
                    </div>
                  </div>
                </Button>

                {(user.role === "admin" || user.role === "instructor") && (
                  <Button 
                    className="h-auto py-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 justify-start"
                    onClick={() => navigate("/instructor")}
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-400" />
                      <div className="text-left">
                        <div className="font-medium text-white">Instructor Dashboard</div>
                        <div className="text-xs text-slate-400">Manage students</div>
                      </div>
                    </div>
                  </Button>
                )}

                {user.role === "admin" && (
                  <Button 
                    className="h-auto py-4 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 justify-start"
                    onClick={() => navigate("/admin")}
                  >
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-yellow-400" />
                      <div className="text-left">
                        <div className="font-medium text-white">Admin Panel</div>
                        <div className="text-xs text-slate-400">Manage users & roles</div>
                      </div>
                    </div>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Sidebar - Quick Links */}
          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button 
                  onClick={() => navigate("/learn")}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-slate-300">Learn</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => navigate("/assignments")}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-slate-300">Assignments</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
                <button 
                  onClick={() => navigate("/community")}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                >
                  <span className="text-slate-300">Community</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Flame className="w-8 h-8 text-white" />
                  <div>
                    <div className="font-semibold text-white">Keep your streak!</div>
                    <div className="text-sm text-white/70">Learn every day to build momentum</div>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-blue-600 hover:bg-white/90"
                  onClick={() => navigate("/learn")}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
