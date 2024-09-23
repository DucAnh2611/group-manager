import { POINT_TYPE } from "@/constant/category";
import useMemberHistory from "@/hooks/useMemberHistory";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function MemberHistory({ member }) {
    const { page, limit, count, history, changeQuery, isLoading, setMember } =
        useMemberHistory();

    const handlePrev = () => {
        changeQuery(page - 1, limit);
    };

    const handleNext = () => {
        changeQuery(page + 1, limit);
    };

    useEffect(() => {
        setMember(member);
    }, [member]);

    return (
        <div className="flex flex-col gap-2 w-full h-full overflow-hidden px-4">
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto w-full relative">
                {isLoading && (
                    <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center backdrop-blur-sm bg-gray-500 bg-opacity-15">
                        <div className="flex gap-1 items-center">
                            <span>
                                <LoaderCircleIcon
                                    size={15}
                                    className="animate-spin"
                                />
                            </span>
                            <span>Đang tải</span>
                        </div>
                    </div>
                )}
                {history.map((his) => (
                    <div key={his._id}>
                        <Card className="p-3">
                            <div className="text-sm">
                                <span
                                    className={cn(
                                        "mr-2 font-medium",
                                        his.type === POINT_TYPE.ADD
                                            ? " text-primary"
                                            : "text-destructive"
                                    )}
                                >
                                    Tên danh mục:
                                </span>
                                <span>{his.pointName}</span>
                            </div>
                            <div className="text-sm">
                                <span
                                    className={cn(
                                        "mr-2 font-medium",
                                        his.type === POINT_TYPE.ADD
                                            ? " text-primary"
                                            : "text-destructive"
                                    )}
                                >
                                    Điểm:
                                </span>
                                <span>
                                    {his.type}
                                    {his.point} /{his.pointUnit}
                                </span>
                            </div>
                            {his.behavior && (
                                <div className="text-sm">
                                    <span
                                        className={cn(
                                            "mr-2 font-medium",
                                            his.type === POINT_TYPE.ADD
                                                ? " text-primary"
                                                : "text-destructive"
                                        )}
                                    >
                                        Hạnh kiểm:
                                    </span>
                                    <span>{his.behavior}</span>
                                </div>
                            )}
                            <div className="text-sm">
                                <span
                                    className={cn(
                                        "mr-2 font-medium",
                                        his.type === POINT_TYPE.ADD
                                            ? " text-primary"
                                            : "text-destructive"
                                    )}
                                >
                                    Ghi chú:
                                </span>
                                <span>{his.notes || "Không"}</span>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-between h-fit">
                <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={handlePrev}
                >
                    Trang trước
                </Button>
                <div className="text-sm flex gap-1">
                    <span className="font-medium text-primary">{page}</span>
                    <span>/</span>
                    <span className="font-medium">
                        {Math.ceil(count / limit)}
                    </span>
                </div>
                <Button
                    disabled={page >= Math.ceil(count / limit)}
                    onClick={handleNext}
                >
                    Trang sau
                </Button>
            </div>
        </div>
    );
}
