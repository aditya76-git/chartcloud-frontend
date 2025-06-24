import { useState } from "react";
import { LogInIcon, Loader2, Github } from "lucide-react";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import api from "@/api/client";
import useApi from "@/hooks/useApi";

const Signup = () => {
  const [username, setUsername] = useState("test1231");
  const [email, setEmail] = useState("test1231@gmail.com");
  const [password, setPassword] = useState("adityaraj7612");

  const { loading, request } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await request(() =>
      api.post("/auth/signup", { email, password, username }),
      {
        toastMessages: {
          success: "Account created successfully 🎉",
          error: "Signup failed ❌",
        },
      }
    );
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>
              Enter your credentials to create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="off"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      autoComplete="off"
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  <LogInIcon className="mr-2 h-4 w-4" />
                  Signup
                  {loading && <Loader2 className="ml-2 animate-spin h-4 w-4" />}
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 mr-2">
                    <path
                      fill="currentColor"
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    ></path>
                  </svg>
                  Signup with Google
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  <Github className="h-4 w-4 mr-2" />
                  Signup with GitHub
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
