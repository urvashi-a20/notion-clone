"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Id} from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Search, Trash, Type, Undo } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "@/components/modals/confirm-modal";


export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick =(documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLButtonElement>,
        documentId: Id<"documents">
      ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });
      
        toast.promise(promise, {
          loading: "Restoring note...",
          success: "Note restored",
          error: "Failed to restore note.",
        });
      };
      
      const onRemove = (documentId: Id<"documents">) => {
        const promise = remove({ id: documentId });
      
        toast.promise(promise, {
          loading: "Deleting note...",
          success: "Note deleted!",
          error: "Failed to delete note.",
        });
      
        if (params.documentId === documentId) {
          router.push("/documents");
        }
      };
      

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size ="lg"/>
            </div>
        )
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4"/>
                <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
                placeholder="Filter by page title..."
                />
            </div>
            <div className="mt-2 px-1 pd-1">
                <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
                    No documents found.
                </p>
                {filteredDocuments?.map((document) => (
                    <button
                    key={document._id}
                    type="button"
                    onClick={() => onClick(document._id)}
                    className="text-sm rounded-sm w-full hover:bg:primary/5 flex 
                    item_center text-primary justify-between"
                    >
                        <span className="truncate pl-2">
                            {document.title}
                        </span>
                        <div className="flex items-center">
                        <button
                        onClick={(e) => onRestore(e, document._id)}
                        type="button"
                        className="rounded-sm p-2 hover:bg-neutral-200
                         dark:hover:bg-neutral-600"
                        >
                            <Undo className="h-4 w-4 text-muted-foreground"/>
                        </button>
                        <ConfirmModal onConfirm={() => onRemove(document._id)}>
                        <button
                        type="button"
                        className="rounded-sm p-2 hover:bg-neutral-200 
                         dark:hover:bg-neutral-600"
                        >
                           <Trash className="h-4 w-4 text-muted-foreground"/>
                        </button>
                        </ConfirmModal>
                        </div>

                    </button>
                )) }
            </div> 
        </div>
        
    )
}