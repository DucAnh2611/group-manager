import { updateMember } from "@/api/action/member";
import { MEMBER_TYPE } from "@/constant/member";
import useMember from "@/hooks/useMember";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
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

export default function DialogUpdateMember({ member, trigger }) {
    const { reload } = useMember();
    const [open, SetOpen] = useState(false);

    const [name, SetName] = useState(member.name);
    const [type, SetType] = useState(member.type);
    const changeName = (e) => {
        SetName(e.target.value);
    };

    const selectType = (type) => {
        SetType(type);
    };

    const onOpen = (open) => {
        if (!open) {
            SetName(member.name);
            SetType(member.type);
        }
        SetOpen(open);
    };

    const onSubmit = async () => {
        const res = await updateMember(member._id, {
            name: name || member.type,
            type: type || MEMBER_TYPE.MEMBER,
        });
        if (res.success) {
            onOpen(false);
            reload();
        }
    };

    useEffect(() => {
        SetName(member.name);
        SetType(member.type);
    }, [member]);

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader className={"text-start"}>
                    <DialogTitle className="font-medium">
                        Cập nhật {member.name}
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Cập nhật tên, chức vụ của thành viên tổ
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
                        <Button onClick={onSubmit}>Xác nhận</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
