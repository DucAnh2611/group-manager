import { deleteMember } from "@/api/action/member";
import useMember from "@/hooks/useMember";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";

export default function DialogDeleteMember({ member, trigger }) {
    const { reload } = useMember();
    const [open, SetOpen] = useState(false);

    const onOpen = (open) => {
        SetOpen(open);
    };

    const onSubmit = async () => {
        const res = await deleteMember(member._id);
        if (res.success) {
            onOpen(false);
            reload();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader className={"text-start"}>
                    <DialogTitle className="font-medium">
                        Xóa {member.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Xóa thành viên
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="w-full flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            onClick={() => {
                                onOpen(false);
                            }}
                        >
                            Huỷ
                        </Button>
                        <Button onClick={onSubmit} variant="destructive">
                            Xác nhận
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
