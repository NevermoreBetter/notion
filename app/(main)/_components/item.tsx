import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";

import { useMutation } from "convex/react";
import {
 ChevronDown,
 ChevronRight,
 LucideIcon,
 MoreHorizontal,
 Plus,
 Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IItem {
 id?: Id<"documents">;
 documentIcon?: string;
 active?: boolean;
 onExpand?: () => void;
 expanded?: boolean;
 isSearching?: boolean;
 level?: number;
 label: string;
 icon: LucideIcon;
 onClick?: () => void;
}

const Item = ({
 label,
 icon: Icon,
 onClick,
 id,
 documentIcon,
 onExpand,
 active,
 expanded,
 isSearching,
 level = 0,
}: IItem) => {
 const { user } = useUser();
 const router = useRouter();
 const create = useMutation(api.documents.create);
 const archive = useMutation(api.documents.archive);
 const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
  onExpand?.();
 };
 const ChevronIcon = expanded ? ChevronDown : ChevronRight;

 const onArchive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
  if (!id) return;
  const promise = archive({ id });

  toast.promise(promise, {
   loading: "Archiving...",
   success: "Archived!",
   error: "Error archiving document",
  });
 };

 const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  e.stopPropagation();
  if (!id) return;
  const promise = create({ title: "Untitled", parentDocument: id }).then(
   (documentId) => {
    if (!expanded) {
     onExpand?.();
    }
    // router.push(`/documents/${documentId}`);
   }
  );
  toast.promise(promise, {
   loading: "Creating document...",
   success: "Document created!",
   error: "Error creating document",
  });
 };

 return (
  <div
   onClick={onClick}
   role="button"
   style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
   className={cn(
    "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
    active && "bg-primary/5 text-primary"
   )}
  >
   {!!id && (
    <div
     role="button"
     className="mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600"
     onClick={handleExpand}
    >
     <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
    </div>
   )}
   {documentIcon ? (
    <div className="mr-2 shrink-0 text-[18px]">{documentIcon}</div>
   ) : (
    <Icon className="mr-2 h-[18px] shrink-0 text-muted-foreground" />
   )}

   <span className="truncate">{label}</span>
   {isSearching && (
    <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
     <span className="text-xs">CTRL</span>
    </kbd>
   )}
   {!!id && (
    <div className="ml-auto flex items-center gap-x-2">
     <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
       <div
        role="button"
        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
       >
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
       </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
       className="w-60"
       align="start"
       side="right"
       forceMount
      >
       <DropdownMenuItem onClick={onArchive}>
        <Trash className="h-4 w-4 mr-2" />
        Delete
       </DropdownMenuItem>
       <DropdownMenuSeparator />
       <div className="text-xs text-muted-foreground p-2">
        Last edited by: {user?.fullName}
       </div>
      </DropdownMenuContent>
     </DropdownMenu>
     <div
      role="button"
      onClick={onCreate}
      className="ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600"
     >
      <Plus className="h-4 w-4 text-muted-foreground/50" />
     </div>
    </div>
   )}
  </div>
 );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
 return (
  <div
   style={{ padding: level ? `${level * 12 + 12}px` : "12px" }}
   className="flex gap-x-2 py-[3px]"
  >
   <Skeleton className="h-4 w-4 " />
   <Skeleton className="h-4 w-[30%] " />
  </div>
 );
};

export default Item;
