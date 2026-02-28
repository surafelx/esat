import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { 
  User, Mail, Shield, Zap, Plus, RefreshCw, 
  LogIn, Save, Users, Lock, Key
} from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:3000";

interface UserProfile {
  uid?: string;
  email?: string;
  role?: string;
  xp?: number;
  level?: number;
  streak?: number;
}

const AuthTest = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [xpAmount, setXpAmount] = useState(50);
  const [updateRole, setUpdateRole] = useState("student");
  const [response, setResponse] = useState<any>(null);

  const handleLogin = async () => {
    if (!token.trim()) {
      setError("Please enter a Firebase ID token");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      
      setUser(data);
      setResponse(data);
    } catch (err: any) {
      setError(`Connection failed: ${err.message}. Is the server running?`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetProfile = async () => {
    if (!token.trim()) {
      setError("No token - please login first");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to get profile");
        return;
      }
      
      setUser(data);
      setResponse(data);
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!token.trim()) {
      setError("No token - please login first");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: updateRole }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to update profile");
        return;
      }
      
      setUser(data);
      setResponse(data);
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddXP = async () => {
    if (!token.trim()) {
      setError("No token - please login first");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${API_URL}/auth/xp`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ xp: xpAmount }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to add XP");
        return;
      }
      
      setResponse(data);
      // Refresh profile
      await handleGetProfile();
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetUsers = async () => {
    if (!token.trim()) {
      setError("No token - please login first");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${API_URL}/auth/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Failed to get users");
        return;
      }
      
      setResponse(data);
    } catch (err: any) {
      setError(`Connection failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-surface">
      <Sidebar />
      <main className="pl-16 md:pl-20 h-screen">
        <div className="p-4 pt-2 h-[calc(100vh-32px)]">
          <div className="bg-card border border-border rounded-2xl h-full overflow-hidden flex">
            <div className="flex-1 overflow-y-auto p-6">
              <motion.div 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="mb-6"
              >
                <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                  Auth API Test
                </h1>
                <p className="text-muted-foreground text-sm">
                  Test the authentication endpoints
                </p>
              </motion.div>

              {/* Token Input */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Key className="w-4 h-4 inline mr-2" />
                  Firebase ID Token
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Paste Firebase ID token here..."
                    className="flex-1 bg-muted/50 border border-border rounded-lg px-4 py-2 text-sm font-mono"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Get token from Firebase Auth: signInWithEmailAndPassword() → user.getIdToken()
                </p>
              </motion.div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Current User Display */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[hsl(0,84%,55%)]/10 to-[hsl(25,95%,55%)]/5 border border-[hsl(0,84%,55%)]/20"
                >
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-[hsl(0,84%,55%)]" />
                    Current User
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">UID:</span>
                      <p className="font-mono text-foreground truncate">{user.uid}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="text-foreground">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Role:</span>
                      <p className="text-foreground flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {user.role}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">XP:</span>
                      <p className="text-foreground flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        {user.xp || 0} (Level {user.level || 1})
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="bg-gradient-to-r from-[hsl(0,84%,55%)] to-[hsl(25,95%,55%)] hover:opacity-90"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login / Register
                </Button>

                <Button
                  onClick={handleGetProfile}
                  disabled={loading}
                  variant="outline"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                  Get Profile
                </Button>

                <Button
                  onClick={handleUpdateProfile}
                  disabled={loading}
                  variant="outline"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Role
                </Button>

                <Button
                  onClick={handleAddXP}
                  disabled={loading}
                  variant="outline"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add XP
                </Button>

                <Button
                  onClick={handleGetUsers}
                  disabled={loading}
                  variant="outline"
                  className="col-span-2"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Get All Users (Admin)
                </Button>
              </div>

              {/* XP Input */}
              <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border">
                <label className="block text-sm font-medium text-foreground mb-2">
                  XP Amount to Add
                </label>
                <div className="flex gap-2">
                  {[25, 50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setXpAmount(amount)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        xpAmount === amount
                          ? "bg-[hsl(0,84%,55%)] text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      +{amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role Update */}
              <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Update Role To
                </label>
                <div className="flex gap-2">
                  {["student", "instructor", "admin"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setUpdateRole(role)}
                      className={`px-3 py-1 rounded-lg text-sm flex items-center gap-1 ${
                        updateRole === role
                          ? "bg-[hsl(0,84%,55%)] text-white"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Display */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-muted/30 border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-2">Last Response:</h3>
                  <pre className="text-xs font-mono text-green-400 overflow-x-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthTest;
