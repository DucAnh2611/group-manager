import { addHistory } from "@/api/action/history";
import { POINT_TYPE } from "@/constant/category";
import useMember from "@/hooks/useMember";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import AddCategory from "./add-category";
import DialogSelectMember from "./select-member";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

export default function DialogAddMemberCategory({ trigger }) {
    const { reload } = useMember();

    const [open, SetOpen] = useState(false);
    const [loading, SetLoading] = useState(false);
    const [selectMember, SetSelectMember] = useState(null);
    const [selectCategoriesPlus, SetSelectCategoriesPlus] = useState([]);
    const [selectCategoriesMinus, SetSelectCategoriesMinus] = useState([]);

    const onOpen = (open) => {
        if (!open) {
            SetSelectMember(null);
            SetSelectCategoriesPlus([]);
            SetSelectCategoriesMinus([]);
            SetLoading(false);
        }
        SetOpen(open);
    };

    const onSelectMember = (member) => {
        SetSelectMember(member);
        SetSelectCategoriesMinus([]);
        SetSelectCategoriesPlus([]);
    };

    const onCreateCategory = (type) => (category) => {
        console.log(type, category);
        switch (type) {
            case POINT_TYPE.ADD:
                SetSelectCategoriesPlus((i) => [...i, category]);
                break;
            case POINT_TYPE.MINUS:
                SetSelectCategoriesMinus((i) => [...i, category]);
                break;
            default:
                return;
        }
    };

    const removeCategory = (type, category) => () => {
        switch (type) {
            case POINT_TYPE.ADD:
                SetSelectCategoriesPlus((i) =>
                    i.filter((it) => it.code !== category.code)
                );
                break;
            case POINT_TYPE.MINUS:
                SetSelectCategoriesMinus((i) =>
                    i.filter((it) => it.code !== category.code)
                );
                break;
            default:
                return;
        }
    };

    const onSubmit = async () => {
        if (!selectMember || loading) return;

        SetLoading(true);

        const res = await addHistory(selectMember._id, {
            histories: [...selectCategoriesMinus, ...selectCategoriesPlus],
        });
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
                        Thêm danh mục
                    </DialogTitle>
                    <DialogDescription className="text-sm">
                        Thêm danh mục thành viên để tính điểm
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <div>
                        <Label>Thành viên</Label>
                        <DialogSelectMember
                            defValue={selectMember}
                            onSelect={onSelectMember}
                        />
                    </div>
                    {selectMember && (
                        <div className="w-full flex flex-col gap-2">
                            <div className="w-full">
                                <Label>Điểm cộng</Label>
                                <AddCategory
                                    member={selectMember}
                                    trigger={
                                        <Button className="w-full">
                                            Thêm danh mục
                                        </Button>
                                    }
                                    type={POINT_TYPE.ADD}
                                    onCreate={onCreateCategory(POINT_TYPE.ADD)}
                                />
                                <div className="flex w-full flex-col gap-2 max-h-[200px] overflow-y-auto">
                                    {selectCategoriesPlus.map((c) => (
                                        <div key={c.code}>
                                            <Card className="p-2 flex gap-2 w-full">
                                                <Button
                                                    variant="destructive"
                                                    onClick={removeCategory(
                                                        POINT_TYPE.ADD,
                                                        c
                                                    )}
                                                >
                                                    <TrashIcon size={15} /> Xóa
                                                </Button>
                                                <div className="flex-1 text-sm">
                                                    <p className="flex-1">
                                                        <span className="font-medium mr-1">
                                                            Danh mục:
                                                        </span>
                                                        <span className="">
                                                            {c.pointName}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            Điểm:
                                                        </span>
                                                        <span>
                                                            {`( ${c.point} / ${
                                                                c.pointUnit
                                                            }${
                                                                c.behavior
                                                                    ? ` / ${c.behavior}`
                                                                    : ""
                                                            } )`}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            Ghi chú:
                                                        </span>
                                                        <span>
                                                            {c.notes ||
                                                                "Không có"}
                                                        </span>
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Label>Điểm trừ</Label>
                                <AddCategory
                                    member={selectMember}
                                    trigger={
                                        <Button className="w-full">
                                            Thêm danh mục
                                        </Button>
                                    }
                                    type={POINT_TYPE.MINUS}
                                    onCreate={onCreateCategory(
                                        POINT_TYPE.MINUS
                                    )}
                                />
                                <div className="flex w-full flex-col gap-2 max-h-[200px] overflow-y-auto">
                                    {selectCategoriesMinus.map((c) => (
                                        <div key={c.code}>
                                            <Card className="p-2 flex gap-2 w-full">
                                                <Button
                                                    variant="destructive"
                                                    onClick={removeCategory(
                                                        POINT_TYPE.MINUS,
                                                        c
                                                    )}
                                                >
                                                    <TrashIcon size={15} /> Xóa
                                                </Button>
                                                <div className="flex-1 text-sm">
                                                    <p className="flex-1">
                                                        <span className="font-medium mr-1">
                                                            Danh mục:
                                                        </span>
                                                        <span className="">
                                                            {c.pointName}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            Điểm:
                                                        </span>
                                                        <span>
                                                            {`( ${c.point} / ${
                                                                c.pointUnit
                                                            }${
                                                                c.behavior
                                                                    ? ` / ${c.behavior}`
                                                                    : ""
                                                            } )`}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="font-medium mr-1">
                                                            Ghi chú:
                                                        </span>
                                                        <span>
                                                            {c.notes ||
                                                                "Không có"}
                                                        </span>
                                                    </p>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
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
                            disabled={
                                loading ||
                                (!selectCategoriesMinus.length &&
                                    !selectCategoriesPlus.length)
                            }
                        >
                            {loading && (
                                <LoaderCircleIcon
                                    size={15}
                                    className="animate-spin mr-1"
                                />
                            )}
                            Xác nhận
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
