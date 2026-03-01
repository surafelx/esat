import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL } from "@/lib/config";
import { 
  User, Shield, Zap, LogOut, ArrowLeft, Crown, BookOpen, Users
} from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  createdAt?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

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
        
        if (data.role !== "admin") {
          navigate("/dashboard");
          return;
        }
        
        fetchUsers(idToken);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      navigate("/");
    }
  };

  const fetchUsers = async (idToken: string) => {
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data);
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

  const updateUserRole = async (uid: string, newRole: string) => {
    setSaving(uid);
    try {
      const idToken = await auth.currentUser?.getIdToken();
      
      const res = await fetch(`${API_URL}/auth/users/${uid}/role`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ 
          role: newRole 
        }),
      });

      if (res.ok) {
        setUsers(users.map(u => 
          u.uid === uid ? { ...u, role: newRole } : u
        ));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(null);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-gradient-to-r from-purple-500 to-purple-600";
      case "instructor": return "bg-gradient-to-r from-blue-500 to-blue-600";
      default: return "bg-gradient-to-r from-green-500 to-green-600";
    }
  };

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate("/dashboard")}
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">ESAT</span>
              </div>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            Admin Panel
          </h1>
          <p className="text-slate-400">Manage users, roles, and platform settings</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">{users.length}</div>
                  <div className="text-slate-400 text-sm">Total Users</div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {users.filter(u => u.role === "admin").length}
                  </div>
                  <div className="text-slate-400 text-sm">Admins</div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    {users.filter(u => u.role === "instructor").length}
                  </div>
                  <div className="text-slate-400 text-sm">Instructors</div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">All Users</CardTitle>
            <CardDescription className="text-slate-400">
              Click on a role to change it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left p-3 text-slate-400 font-medium">User</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Role</th>
                    <th className="text-left p-3 text-slate-400 font-medium">XP</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Level</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Joined</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.uid} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.email}</div>
                            <div className="text-xs text-slate-500">{user.uid.slice(0, 12)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.uid, e.target.value)}
                          disabled={saving === user.uid}
                          className={`px-3 py-1.5 rounded-full text-white text-sm cursor-pointer ${
                            getRoleBadgeColor(user.role)
                          }`}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3 text-white">{user.xp?.toLocaleString() || 0}</td>
                      <td className="p-3 text-white">{user.level || 1}</td>
                      <td className="p-3 text-slate-400">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateUserRole(user.uid, user.role === "admin" ? "student" : "admin")}
                          disabled={saving === user.uid}
                          className="text-slate-400 hover:text-white"
                        >
                          {saving === user.uid ? "Saving..." : "Toggle"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  No users found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
