"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePostModal } from "@/lib/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendPost } from "@/app/dashboard/posts/actions";
import { useSession } from "next-auth/react";

export default function SendPostModal() {
  const session = useSession();
  const [isPending, startTransition] = useTransition();
  const { isPostOpen, OpenPostModal, postData } = usePostModal();
  const [destination, setDestination] = useState("");
  const [res, setRes] = useState("");
  const [err, setErr] = useState("");

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      OpenPostModal();
      setErr("");
      setRes("");
      setDestination("");
    }
  };

  const handleSubmit = () => {
    if (destination == "" || destination == "none" || postData == undefined) {
      setErr("no destination selected");
      return;
    }

    // if( destination == "self") {
    //   setDestination(session.data?.user.id as string)
    // }
    // #FIXME:

    startTransition(() => {
      sendPost(postData, destination)
        .then((res) => setRes(res))
        .catch((err) => setErr(err));
    });
  };

  return (
    <Dialog open={isPostOpen} onOpenChange={handleOnOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отправить пост ...</DialogTitle>
          <DialogDescription>
            Выберете кому отправить этот пост
          </DialogDescription>
        </DialogHeader>

        <div className="grid space-x-2 justify-center items-center ">
          <Select
            onValueChange={(dest) => {
              setErr("");
              setRes("");
              setDestination(dest);
            }}
          >
            <SelectTrigger>
              <SelectValue
                defaultValue="none"
                placeholder="Выберете кому отправить"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" disabled>
                Выберете кому отправить
              </SelectItem>
              <SelectItem value="self">Только себе</SelectItem>
              <SelectItem value="all">Всем пользователям</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter className="items-center">
          <p className="text-green-500">{res}</p>
          <p className="text-red-500">{err}</p>
          <Button onClick={handleSubmit}>
            {isPending ? "Pending..." : "Отправить"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
