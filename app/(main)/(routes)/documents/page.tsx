"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DocumentsPage = () => {
 const { user } = useUser();
 const router = useRouter();
 const create = useMutation(api.documents.create);

 const onCreate = () => {
  const promise = create({ title: "Untitled" }).then((documentid) =>
   router.push(`/documents/${documentid}`)
  );
  toast.promise(promise, {
   loading: "Creating a new note...",
   success: "New note created!",
   error: "Error creating a new note",
  });
 };

 return (
  <div className="flex h-full flex-col items-center justify-center space-y-4">
   <Image
    src="/empty.png"
    height={300}
    width={300}
    alt="empty"
    className="dark:hidden"
   />
   <Image
    src="/empty-dark.png"
    height={300}
    width={300}
    alt="empty"
    className="hidden dark:block"
   />
   <h2 className="text-lg font-medium">
    Welcome to {user?.username || user?.fullName}`s Notion
   </h2>
   <Button onClick={onCreate}>
    <PlusCircle className="mr-2 h-4 w-4" />
    Create a note
   </Button>
  </div>
 );
};

export default DocumentsPage;
