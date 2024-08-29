import { ColorPicker } from "@/components/ui/color-picker";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  onBlur?: () => void;
}

const ColorField: React.FC<ColorFieldProps> = ({
  label,
  value,
  onChange,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const formatColor = (color: string) => {
    if (!color.startsWith("#")) {
      return `#${color}`;
    }
    return color;
  };

  const validateColor = (color: string) => {
    const validateHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    return validateHex.test(color);
  };

  const handleColorChange = (newColor: string) => {
    setInputValue(newColor);
    onChange(newColor);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = formatColor(e.target.value);
    setInputValue(color);
    if (validateColor(color)) {
      onChange(color);
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium text-gray-11 dark:text-grayDark-11">
        {label}
      </label>
      <div className="relative flex items-center">
        <ColorPicker
          value={inputValue}
          onChange={handleColorChange}
          className="absolute w-8 h-8 -translate-y-1/2 left-1 top-1/2"
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => {
            if (validateColor(inputValue)) {
              onChange(inputValue);
            } else {
              setInputValue(value);
            }
            onBlur?.();
          }}
          className="pl-10 uppercase bg-gray-1 dark:bg-grayDark-1 text-gray-12 dark:text-grayDark-12 border-gray-6 dark:border-grayDark-6"
          placeholder="#FFFFFF"
        />
      </div>
    </div>
  );
};

export default ColorField;
