// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import { Package, Loader2 } from 'lucide-react';
// import { z } from 'zod';

// const emailSchema = z.string().email('Invalid email address');
// const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

// export default function Auth() {
//   const navigate = useNavigate();
//   const { user, signIn, signUp, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(false);
  
//   // Login form
//   const [loginEmail, setLoginEmail] = useState('');
//   const [loginPassword, setLoginPassword] = useState('');
  
//   // Signup form
//   const [signupEmail, setSignupEmail] = useState('');
//   const [signupPassword, setSignupPassword] = useState('');
//   const [fullName, setFullName] = useState('');

//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard');
//     }
//   }, [user, navigate]);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       emailSchema.parse(loginEmail);
//       passwordSchema.parse(loginPassword);
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         toast.error(err.errors[0].message);
//         return;
//       }
//     }

//     setLoading(true);
//     const { error } = await signIn(loginEmail, loginPassword);
//     setLoading(false);

//     if (error) {
//       if (error.message.includes('Invalid login credentials')) {
//         toast.error('Invalid email or password');
//       } else {
//         toast.error(error.message);
//       }
//     } else {
//       toast.success('Welcome back!');
//       navigate('/dashboard');
//     }
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     try {
//       emailSchema.parse(signupEmail);
//       passwordSchema.parse(signupPassword);
//     } catch (err) {
//       if (err instanceof z.ZodError) {
//         toast.error(err.errors[0].message);
//         return;
//       }
//     }

//     setLoading(true);
//     const { error } = await signUp(signupEmail, signupPassword, fullName);
//     setLoading(false);

//     if (error) {
//       if (error.message.includes('already registered')) {
//         toast.error('This email is already registered. Please sign in instead.');
//       } else {
//         toast.error(error.message);
//       }
//     } else {
//       toast.success('Account created! Welcome to StockSync.');
//       navigate('/dashboard');
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <div className="p-2 bg-primary rounded-xl">
//               <Package className="h-8 w-8 text-primary-foreground" />
//             </div>
//             <span className="text-3xl font-bold text-foreground">StockSync</span>
//           </div>
//           <p className="text-muted-foreground">Inventory Management System</p>
//         </div>

//         <Card className="border-border/50 shadow-xl">
//           <Tabs defaultValue="login" className="w-full">
//             <CardHeader className="pb-4">
//               <TabsList className="grid w-full grid-cols-2">
//                 <TabsTrigger value="login">Sign In</TabsTrigger>
//                 <TabsTrigger value="signup">Sign Up</TabsTrigger>
//               </TabsList>
//             </CardHeader>
            
//             <CardContent>
//               <TabsContent value="login" className="mt-0">
//                 <CardTitle className="text-xl mb-2">Welcome back</CardTitle>
//                 <CardDescription className="mb-6">
//                   Enter your credentials to access your inventory
//                 </CardDescription>
                
//                 <form onSubmit={handleLogin} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="login-email">Email</Label>
//                     <Input
//                       id="login-email"
//                       type="email"
//                       placeholder="you@company.com"
//                       value={loginEmail}
//                       onChange={(e) => setLoginEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="login-password">Password</Label>
//                     <Input
//                       id="login-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={loginPassword}
//                       onChange={(e) => setLoginPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
//                     Sign In
//                   </Button>
//                 </form>
//               </TabsContent>
              
//               <TabsContent value="signup" className="mt-0">
//                 <CardTitle className="text-xl mb-2">Create account</CardTitle>
//                 <CardDescription className="mb-6">
//                   Start managing your inventory today
//                 </CardDescription>
                
//                 <form onSubmit={handleSignup} className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="full-name">Full Name</Label>
//                     <Input
//                       id="full-name"
//                       type="text"
//                       placeholder="John Doe"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-email">Email</Label>
//                     <Input
//                       id="signup-email"
//                       type="email"
//                       placeholder="you@company.com"
//                       value={signupEmail}
//                       onChange={(e) => setSignupEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="signup-password">Password</Label>
//                     <Input
//                       id="signup-password"
//                       type="password"
//                       placeholder="••••••••"
//                       value={signupPassword}
//                       onChange={(e) => setSignupPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <Button type="submit" className="w-full" disabled={loading}>
//                     {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
//                     Create Account
//                   </Button>
//                 </form>
//               </TabsContent>
//             </CardContent>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Package, Loader2 } from "lucide-react";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function Auth() {
  const navigate = useNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);

    if (error) {
      toast.error(
        error.message.includes("Invalid login credentials")
          ? "Invalid email or password"
          : error.message
      );
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
    }

    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, fullName);
    setLoading(false);

    if (error) {
      toast.error(
        error.message.includes("already registered")
          ? "Email already registered. Please sign in."
          : error.message
      );
    } else {
      toast.success("Account created! Welcome to StockSync.");
      navigate("/dashboard");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00d187]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-[#00d187] rounded-xl">
              <Package className="h-7 w-7 text-black" />
            </div>
            <span className="text-3xl font-bold text-white">StockSync</span>
          </div>
          <p className="text-gray-400">Inventory Management System</p>
        </div>

        <Card className="bg-[#0d0d0d] border border-[#00d187]/30 shadow-[0_0_30px_rgba(0,209,135,0.2)]">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2 bg-[#141414] text-white">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              {/* LOGIN */}
              <TabsContent value="login" className="mt-0">
                <CardTitle className="text-xl mb-2 text-white">
                  Welcome back
                </CardTitle>
                <CardDescription className="mb-6 text-gray-200">
                  Enter your credentials to access your inventory
                </CardDescription>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2 text-white">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="user@gamil.com"
                      className="bg-[#141414] border-[#222] text-white placeholder:text-gray-200"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 text-white">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-[#141414] border-[#222] text-white placeholder:text-gray-400"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00d187] text-black hover:bg-[#00c07a]"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* SIGNUP */}
              <TabsContent value="signup" className="mt-0">
                <CardTitle className="text-xl mb-2 text-white">
                  Create account
                </CardTitle>
                <CardDescription className="mb-6 text-white">
                  Start managing your inventory today
                </CardDescription>

                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2 text-white">
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Enter your name"
                      className="bg-[#141414] border-[#222] text-white placeholder:text-gray-400"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 text-white">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="user@gmail.com"
                      className="bg-[#141414] border-[#222] text-white placeholder:text-gray-400"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2 text-white">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-[#141414] border-[#222] text-white placeholder:text-gray-400"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#00d187] text-black hover:bg-[#00c07a]"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
