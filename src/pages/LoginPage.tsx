import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LoginHook from './../components/logic/LoginHook';

const LoginPage = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [email,pass,emailMessage,passMessage,generalMessage,emailLoginRef,passLoginRef,onChangeEmail,onChangePass,onSubmitLogin,loading,press]=LoginHook();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    // Here you would typically handle the login logic
    toast({
      title: "Login Attempt",
      description: "This is a demo. Integration with authentication will be added later.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to Shelfy
          </CardTitle>
          <CardDescription className="text-gray-600">
            Sign in to manage your library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) =>onChangeEmail(e)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) =>onChangePass(e)}
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-sm rgb(27 174 169 / 0.1) hover:rgb(27 174 169 / 0.1)"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit" className="w-full rgb(27 174 169 / 0.1) hover:rgb(27 174 169 / 0.6)" onClick={(e)=>onSubmitLogin(e)}>
              Sign in
            </Button>
            <p className="text-center text-red-500">{generalMessage}</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;