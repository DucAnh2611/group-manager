import { listCategory } from "@/api/action/category";
import { MEMBER_TYPE_TEXT } from "@/constant/member";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import SelectCategory from "./select-category";
import { Button } from "./ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function AddCategory({ onCreate, trigger, member, type }) {
    const [open, SetOpen] = useState(false);
    const [value, SetValue] = useState(null);
    const [categories, SetCategories] = useState([]);

    const getCategory = async (member, type) => {
        const response = await listCategory(member._id, type);
        if (response.success) {
            SetCategories(response.data);
        } else {
            SetCategories([]);
        }
    };

    const onChangeNote = (e) => {
        SetValue((v) => ({ ...v, notes: e.target.value }));
    };

    const onSelectCategory = (category) => {
        if (category) {
            SetValue({
                code: category.code,
                pointName: category.title,
                point: category.points,
                pointUnit: category.unit,
                notes: "",
                behavior: category.behavior || "",
                type: type,
                tags: category.tags,
            });
        } else {
            SetValue(null);
        }
    };

    const onOpen = (open) => {
        if (!open) {
            SetCategories([]);
            SetValue(null);
        } else {
            getCategory(member, type);
        }
        SetOpen(open);
    };

    const onConfirm = () => {
        onCreate(value);
        onOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm danh mục</DialogTitle>
                </DialogHeader>
                <div>
                    <div>
                        <Label>Danh mục</Label>
                        <SelectCategory
                            onSelect={onSelectCategory}
                            defValue={value}
                            items={categories}
                        />
                    </div>
                    {value && (
                        <div>
                            <div>
                                <p className="text-sm">
                                    <span className="mr-2 font-medium">
                                        Điểm:
                                    </span>
                                    {value.type}
                                    {value.point}/{value.pointUnit}
                                </p>
                                {value.behavior && (
                                    <p className="text-sm">
                                        <span className="mr-2 font-medium">
                                            Hạnh kiểm:
                                        </span>
                                        {value.behavior}
                                    </p>
                                )}
                                <p className="text-sm">
                                    <span className="mr-2 font-medium">
                                        Áp dụng:
                                    </span>
                                    {value.tags.length
                                        ? value.tags
                                              .map((t) => MEMBER_TYPE_TEXT[t])
                                              .join(", ")
                                        : "Tất cả"}
                                </p>
                            </div>
                        </div>
                    )}
                    <div>
                        <Label>Ghi chú</Label>
                        <Input placeholder="Ghi chú" onChange={onChangeNote} />
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
                        <Button onClick={onConfirm}>Xác nhận</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
