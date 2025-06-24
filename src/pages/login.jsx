import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Loader2 } from "lucide-react";

import api from '@/api/client';
import useApi from '@/hooks/useApi';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, request } = useApi();
  const { loading: googleLoading, request: googleRequest } = useApi();
  const { loading: githubLoading, request: githubRequest } = useApi();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await request(
      () => api.post("/auth/login", { username, password }),
    );

    if (result.success) {
      const { access, refresh } = result.token;
      const expiryTime = Date.now() + 10 * 60 * 1000;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("expiry", expiryTime.toString());

      navigate("/dashboard");
    }
  };



  const handleGoogleLogin = async () => {
    const result = await googleRequest(() =>
      api.get("/auth/login/google")
    );

    if (result && result.success) {
      setTimeout(
        () => {
          window.location.href = result.url;
        }, 500
      )
    }
  };

  const handleGithubLogin = async () => {
    const result = await githubRequest(() =>
      api.get("/auth/login/github")
    );

    if (result && result.success) {
      setTimeout(
        () => {
          window.location.href = result.url;
        }, 500
      )
    }
  };

  return (
    <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      <div className="flex items-center justify-center min-h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid gap-4">
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
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  Login
                  {loading && <Loader2 className="animate-spin" />}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleLogin}
                  disabled={googleLoading}
                >
                  <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 mr-2">
                    <path
                      fill="currentColor"
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    ></path>
                  </svg>
                  Login with Google
                  {googleLoading && <Loader2 className="animate-spin" />}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleGithubLogin}
                  disabled={githubLoading}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Login with GitHub {githubLoading && <Loader2 className="animate-spin" />}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
