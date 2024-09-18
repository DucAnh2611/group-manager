import useMember from "@/hooks/useMember";
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

export default function DialogSelectMember({ defValue, onSelect }) {
    const { members } = useMember();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

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
                    {value ? value.name : "Chọn thành viên..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0" align="start" side="bottom">
                <Command>
                    <CommandInput placeholder="Tìm thành viên..." />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy chức vụ nào.</CommandEmpty>
                        <CommandGroup className="flex flex-col gap-3">
                            {members.map((member) => (
                                <CommandItem
                                    key={member._id}
                                    value={`${member._id}-${member.name}`}
                                    onSelect={(currentValue) => {
                                        const mem = members.find(
                                            (mem) =>
                                                `${mem._id}-${mem.name}` ===
                                                currentValue
                                        );

                                        setValue(
                                            value && mem._id === value._id
                                                ? null
                                                : mem
                                        );
                                        onSelect(
                                            value && mem._id === value._id
                                                ? null
                                                : mem
                                        );
                                        setOpen(false);
                                    }}
                                    className="flex gap-3 text-sm py-2 px-2"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value && value._id === member._id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <p>{member.name}</p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
