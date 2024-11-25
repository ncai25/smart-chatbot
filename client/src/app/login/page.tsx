import { login, signup } from "../../lib/actions";
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
import SignInWithGoogleButton from "./components/SignInWithGoogle";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="mx-auto w-[350px] p-6">
        <CardContent>
          <form>
            <div className="grid gap-3 mt-6">
              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              {/* Action Buttons */}
              <div className="mt-2">
                <Button type="submit" formAction={login} className="w-full">
                  Log in
                </Button>
              </div>
              <SignInWithGoogleButton />
              <Button type="submit" formAction={signup} className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}