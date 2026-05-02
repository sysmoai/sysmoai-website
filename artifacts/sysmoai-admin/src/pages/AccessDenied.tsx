import { useClerk, useUser } from "@clerk/react";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AccessDeniedPage() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-destructive/15 text-destructive flex items-center justify-center">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Access denied</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {email ? (
                <>
                  <span className="font-medium text-foreground">{email}</span>{" "}
                  is not on the SYSmoAI admin allowlist.
                </>
              ) : (
                "Your account is not on the SYSmoAI admin allowlist."
              )}
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signOut()}
            data-testid="button-sign-out-denied"
          >
            Sign out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
