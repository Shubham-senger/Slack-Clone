"use client";

import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input"
import { Button } from "@/components/ui/button";

import { UseCreateWorkspaceModal } from "../store/use-create-workspace-modal";
import { useCreateWorkspace } from "../api/use-create-workspaces";
import { useState } from "react";
import { useRouter } from "next/navigation";


export const CreateWorkspaceModel = () =>{
    const router = useRouter();
    const [open,setOpen] = UseCreateWorkspaceModal();
    const [name,setName] = useState("");

    const {mutate,isPending } = useCreateWorkspace();
    



    const handleClose = ()=>{
        setOpen(false);
        setName("");
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        mutate({name},{
            onSuccess(id){
                toast.success("Workspace created");
                router.push(`workspace/${id}`);
                handleClose();
            }
        })
    }

    

    return (
        <Dialog open = {open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        disabled = {isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="Wokspace name e.g.'Work','Personal','Home'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}