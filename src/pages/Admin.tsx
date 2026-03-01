import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  User, Mail, Shield, Zap, LogOut, ArrowLeft, 
  Save, Trash2, Crown, BookOpen, UserPlus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/config";

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
      case "admin": return "bg-purple-500";
      case "instructor": return "bg-blue-500";
      default: return "bg-green-500";
    }
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
                <Crown className="w-6 h-6 text-purple-500" />
                Admin Panel
              </h1>
              <p className="text-gray-400">Manage users and roles</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">{users.filter(u => u.role === "admin").length}</div>
              <div className="text-sm text-gray-500">Admins</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{users.filter(u => u.role === "instructor").length}</div>
              <div className="text-sm text-gray-500">Instructors</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>Click on a role to change it</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-gray-400 font-medium">User</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Role</th>
                    <th className="text-left p-3 text-gray-400 font-medium">XP</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Level</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Joined</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.uid} className="border-b hover:bg-gray-800">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.email}</div>
                            <div className="text-xs text-gray-400">{user.uid}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => updateUserRole(user.uid, e.target.value)}
                          disabled={saving === user.uid}
                          className={`px-3 py-1 rounded-full text-white text-sm cursor-pointer ${
                            user.role === "admin" ? "bg-purple-500" :
                            user.role === "instructor" ? "bg-blue-500" : "bg-green-500"
                          }`}
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3 text-white">{user.xp || 0}</td>
                      <td className="p-3 text-white">{user.level || 1}</td>
                      <td className="p-3 text-gray-400">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="p-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => updateUserRole(user.uid, user.role === "admin" ? "student" : "admin")}
                        >
                          {saving === user.uid ? "Saving..." : "Toggle Admin"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="text-center py-8 text-gray-400">
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
