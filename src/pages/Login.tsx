import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Users, Lock } from "lucide-react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation for demo
    if (credentials.username === "admin" && credentials.password === "admin123") {
      toast({
        title: "Login berhasil",
        description: "Selamat datang, Admin Kepegawaian!"
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: "Username atau password salah"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-30 h-16  rounded-full flex items-center justify-center mb-4">
            <img src="lib/14-4.png"  alt="logo"></img>
          </div>
          
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Masuk ke Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;