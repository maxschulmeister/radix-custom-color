"use client";

import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(({ disabled, value, onChange, onBlur, name, className, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleColorChange = (newColor: string) => {
    setLocalValue(newColor);
    onChange(newColor);
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
        <Button
          {...props}
          className={cn("block", className)}
          name={name}
          onClick={() => {
            setOpen(true);
          }}
          size="icon"
          style={{
            backgroundColor: localValue || "#FFFFFF",
          }}
          variant="outline"
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-grayDark-3 border-grayDark-6">
        <HexColorPicker color={localValue} onChange={handleColorChange} />
        <Input
          maxLength={7}
          onChange={(e) => {
            handleColorChange(e.currentTarget.value);
          }}
          ref={ref}
          value={localValue}
          className="mt-2 bg-gray-2 dark:bg-grayDark-2 text-gray-12 dark:text-grayDark-12 border-gray-7 dark:border-grayDark-7 focus:border-grayDark-8"
        />
      </PopoverContent>
    </Popover>
  );
});
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
