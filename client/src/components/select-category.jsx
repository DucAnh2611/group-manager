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

export default function SelectCategory({ onSelect, defValue, items }) {
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
                    className="w-full justify-between h-fit"
                >
                    <p className="max-w-[200px] text-ellipsis line-clamp-2 whitespace-normal break-words text-left">
                        {value ? value.pointName : "Chọn danh mục..."}
                    </p>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-auto max-w-[280px] p-0"
                align="start"
                side="bottom"
            >
                <Command>
                    <CommandInput placeholder="Tìm danh mục..." />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy chức vụ nào.</CommandEmpty>
                        <CommandGroup className="flex flex-col gap-3 overflow-y-auto">
                            {items.map((item) => (
                                <CommandItem
                                    key={item.code}
                                    value={item.title}
                                    onSelect={(currentValue) => {
                                        const fValue = items.find(
                                            (v) => v.title === currentValue
                                        );

                                        setValue(
                                            value && fValue.code === value.code
                                                ? null
                                                : fValue
                                        );
                                        onSelect(
                                            value && fValue.code === value.code
                                                ? null
                                                : fValue
                                        );
                                        setOpen(false);
                                    }}
                                    className="flex gap-3 text-sm py-2 px-2"
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value && value.code === item.code
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    <p className="flex-1">{item.title}</p>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
