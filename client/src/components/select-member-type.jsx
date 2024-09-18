import { MEMBER_TYPE_TEXT } from "@/constant/member";
import useMemberType from "@/hooks/useMemberType";
import { cn } from "@/lib/utils";
import { CommandItem } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function SelectMemberType({ onSelect, defValue }) {
    const { types } = useMemberType();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(defValue);
    }, [defValue]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value ? MEMBER_TYPE_TEXT[value] : "Chọn chức vụ..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0" align="start" side="bottom">
                <Command>
                    <CommandInput placeholder="Tìm chức vụ..." />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy chức vụ nào.</CommandEmpty>
                        <CommandGroup className="flex flex-col gap-3">
                            {Object.keys(types).map((type) => (
                                <CommandItem
                                    key={type}
                                    value={MEMBER_TYPE_TEXT[type]}
                                    onSelect={(currentValue) => {
                                        const [key, value] = Object.entries(
                                            MEMBER_TYPE_TEXT
                                        ).find(
                                            ([_, value]) =>
                                                value === currentValue
                                        );

                                        setValue(key === value ? "" : key);
                                        onSelect(key === value ? "" : key);
                                        setOpen(false);
                                    }}
                                    className="flex gap-3 text-sm py-2 px-2"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === type
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <p>{MEMBER_TYPE_TEXT[type]}</p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
