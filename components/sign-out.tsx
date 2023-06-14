"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";

function SignOut() {
  return (
    <Button size="sm" variant="ghost" onClick={() => signOut()}>
      <LogOutIcon />
    </Button>
  );
}

export default SignOut;
