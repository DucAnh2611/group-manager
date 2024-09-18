import { exportXlsx } from "@/api/action/history";
import DialogAddMember from "@/components/add-member";
import DialogAddMemberCategory from "@/components/add-member-category";
import DialogDeleteMember from "@/components/delete-member";
import MemberHistory from "@/components/member-history";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import DialogUpdateMember from "@/components/update-member";
import { MEMBER_TYPE_TEXT } from "@/constant/member";
import useMember from "@/hooks/useMember";
import useMemberHistory from "@/hooks/useMemberHistory";
import { PencilLine, Trash } from "lucide-react";

export default function MainScreen() {
    const { members } = useMember();
    const { setMember } = useMemberHistory();

    const handleExportXlsx = async () => {
        const response = await exportXlsx();
        if (response) {
            const url = window.URL.createObjectURL(response);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "data.xlsx");
            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
        }
    };

    return (
        <div className="w-full h-full overflow-hidden box-border p-1">
            <Card className=" h-full w-full p-2 flex flex-col">
                <div className="w-full flex gap-1">
                    <DialogAddMember
                        trigger={
                            <Button className="flex-1" variant="outline">
                                Thêm thành viên
                            </Button>
                        }
                    />
                    <DialogAddMemberCategory
                        trigger={
                            <Button className="flex-1" variant="outline">
                                Thêm mục
                            </Button>
                        }
                    />
                    <Button className="flex-1" onClick={handleExportXlsx}>
                        Xuất Excel
                    </Button>
                </div>
                <Separator orientation="horizontal" className="my-3" />
                <div className="w-full flex-1 overflow-y-auto flex flex-col gap-2">
                    {members.map((member) => (
                        <div key={member._id}>
                            <Card
                                className="p-3 flex w-full"
                                onClick={() => setMember(member)}
                            >
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <div className="flex items-center flex-1">
                                            <p className="w-[30px] text-base font-bold text-primary text-center">
                                                {member.point}
                                            </p>
                                            <Separator
                                                orientation="vertical"
                                                className="mx-2"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-primary">
                                                    {
                                                        MEMBER_TYPE_TEXT[
                                                            member.type
                                                        ]
                                                    }
                                                </p>
                                                <p className="text-sm">
                                                    {member.name}
                                                </p>
                                            </div>
                                        </div>
                                    </DrawerTrigger>
                                    <DrawerContent className="h-full flex flex-col">
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                Lịch sử điểm
                                            </DrawerTitle>
                                            <DrawerDescription>
                                                Lịch sử diểm của{" "}
                                                {member && member.name}
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="flex-1 w-full overflow-hidden">
                                            <MemberHistory />
                                        </div>
                                        <DrawerFooter>
                                            <DrawerClose>
                                                <Button
                                                    variant="outline"
                                                    className="w-full"
                                                >
                                                    Thoát
                                                </Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                                <div className="flex gap-2">
                                    <DialogUpdateMember
                                        member={member}
                                        trigger={
                                            <Button size="icon">
                                                <PencilLine size={15} />
                                            </Button>
                                        }
                                    />
                                    <DialogDeleteMember
                                        member={member}
                                        trigger={
                                            <Button
                                                size="icon"
                                                variant="destructive"
                                            >
                                                <Trash size={15} />
                                            </Button>
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
