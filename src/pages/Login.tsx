import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/lib/config";
import { Zap, Shield, Rocket, ArrowRight } from "lucide-react";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      let userCredential;
      
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      
      const idToken = await getIdToken(userCredential.user);
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          idToken
        }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Authentication failed");
        setLoading(false);
        return;
      }
      
      // Login successful - will redirect due to auth state change
      navigate("/dashboard");
    } catch (err) {
      const error = err as { code?: string; message?: string };
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email already registered");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (error.code === "auth/network-request-failed") {
        setError("Network error. Check your connection");
      } else {
        setError(error.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ESAT</span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Master AI Engineering
          </h1>
          <p className="text-slate-400 text-lg max-w-md">
            Build real-world AI projects with hands-on learning. Join thousands of developers transforming their careers.
          </p>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Project-Based Learning</h3>
              <p className="text-slate-400 text-sm">Build real applications, not just tutorials</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Expert Feedback</h3>
              <p className="text-slate-400 text-sm">Get personalized code reviews from industry experts</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Earn XP & Level Up</h3>
              <p className="text-slate-400 text-sm">Track your progress and showcase achievements</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <p className="text-slate-500 text-sm">
            Join 2,000+ developers building the future with AI
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md border-0 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ESAT</span>
            </div>
            <CardTitle className="text-2xl">
              {isLogin ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Sign in to continue your learning journey" 
                : "Start building AI projects today"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-11"
                />
              </div>
              
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-11"
                  />
                </div>
              )}
              
              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Please wait...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {isLogin ? "Sign In" : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => { setIsLogin(false); setError(""); }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign up free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => { setIsLogin(true); setError(""); }}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
