import { addMember } from "@/api/action/member";
import useMember from "@/hooks/useMember";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import SelectMemberType from "./select-member-type";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function DialogAddMember({ trigger }) {
    const { reload } = useMember();
    const [open, SetOpen] = useState(false);
    const [loading, SetLoading] = useState(false);

    const [name, SetName] = useState("");
    const [type, SetType] = useState("");

    const changeName = (e) => {
        SetName(e.target.value);
    };

    const selectType = (type) => {
        SetType(type);
    };

    const onOpen = (open) => {
        if (!open) {
            SetName("");
            SetType("");
            SetLoading(false);
        }
        SetOpen(open);
    };

    const onSubmit = async () => {
        if (loading) return;
        SetLoading(true);

        const res = await addMember({ members: [{ name, type }] });
        if (res.success) {
            onOpen(false);
            reload();
        }

        SetLoading(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader className={"text-start"}>
                    <DialogTitle className="font-medium">
                        Thêm thành viên
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Thêm thành viên vào trong danh sách người cùng lúc
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div>
                        <Label>Tên</Label>
                        <Input
                            placeholde="Tên"
                            onChange={changeName}
                            value={name}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label>Chức vụ</Label>
                        <SelectMemberType
                            onSelect={selectType}
                            defValue={type}
                        />
                    </div>
                </div>
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
                        <Button
                            onClick={onSubmit}
                            disabled={!(!!name && !!type) || loading}
                        >
                            {loading && (
                                <LoaderCircleIcon
                                    size={15}
                                    className="animate-spin mr-1"
                                />
                            )}
                            Thêm thành viên
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
