import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { API_URL } from "@/lib/config";
import { 
  User, Mail, Shield, Zap, LogOut, Users, 
  BookOpen, Award, ChevronRight, Crown
} from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  streak?: number;
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
      case "admin": return "bg-purple-500";
      case "instructor": return "bg-blue-500";
      default: return "bg-green-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400">Welcome back!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{user.email}</CardTitle>
                  <CardDescription>Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</CardDescription>
                </div>
              </div>
              <Badge className={getRoleBadgeColor(user.role)}>
                <Shield className="w-3 h-3 mr-1" />
                {user.role}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-gray-100 text-center">
                <Zap className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                <div className="text-2xl font-bold">{user.xp || 0}</div>
                <div className="text-sm text-gray-600">Total XP</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 text-center">
                <Award className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold">{user.level || 1}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 text-center">
                <BookOpen className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Lessons</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-100 text-center">
                <Users className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:bg-gray-800 transition-colors">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="font-medium text-white">Continue Learning</div>
                  <div className="text-sm text-gray-400">Pick up where you left off</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </CardContent>
          </Card>

          {user.role === "admin" && (
            <Card 
              className="cursor-pointer hover:bg-gray-800 transition-colors"
              onClick={() => navigate("/admin")}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8 text-purple-500" />
                  <div>
                    <div className="font-medium text-white">Admin Panel</div>
                    <div className="text-sm text-gray-400">Manage users and roles</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
