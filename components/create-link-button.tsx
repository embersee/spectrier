"use client";

import { useLinkModal } from "@/lib/store";
import { Button } from "./ui/button";

export default function CreateLink() {
  const openModal = useLinkModal((state) => state.OpenLinkModal);
  const setLinkData = useLinkModal((state) => state.setLinkData);

  const linkModal = () => {
    // setPostData(postData);
    openModal();
  };

  return (
    <Button variant="secondary" onClick={linkModal}>
      Создать
    </Button>
  );
}
