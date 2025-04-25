import React, { useState, useEffect, useCallback } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { debounce } from "../../helpers";

interface OrgSearchTextInputProps {
  name: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

const OrgSearchTextInput: React.FC<OrgSearchTextInputProps> = ({
  name,
  value = "",
  placeholder = "🔍 Search in names and descriptions",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Update the input value when the prop changes
  const debouncedOnChange = useCallback(
    debounce((newValue) => {
      onChange(newValue as string);
    }),
    [onChange]
  );

  useEffect(() => {
    debouncedOnChange(inputValue);
  }, [inputValue, debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={name}>Filter organizations by phrase:</Label>
      <Input
        id={name}
        type="text"
        name={name}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default OrgSearchTextInput;
