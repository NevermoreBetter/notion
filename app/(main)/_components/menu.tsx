"use client";

import { Button } from "@/components/ui/button";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IMenu {
 documentId: Id<"documents">;
}

const Menu = ({ documentId }: IMenu) => {
 const router = useRouter();
 const { user } = useUser();
 const archive = useMutation(api.documents.archive);

 const onArchive = () => {
  const promise = archive({ id: documentId });

  toast.promise(promise, {
   loading: "Moving to trash",
   success: "Moved to trash",
   error: "Could not move to trash",
  });
  router.push("/documents");
 };

 return (
  <DropdownMenu>
   <DropdownMenuTrigger>
    <Button size={"sm"} variant={"ghost"}>
     <MoreHorizontal className="h-4 w-4" />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
    <DropdownMenuItem onClick={onArchive}>
     <Trash className=" h-4 w-4 mr-2" />
     Delete
    </DropdownMenuItem>
    <DropdownMenuSeparator className="text-xs text-muted-foreground" />
    <div>Last edited by: {user?.username || user?.fullName}</div>
   </DropdownMenuContent>
  </DropdownMenu>
 );
};

export default Menu;
