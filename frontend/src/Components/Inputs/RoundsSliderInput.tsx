import { useState } from "react";
import { DualRangeSlider } from "../ui/slider";
import { Label } from "../ui/label";

const RoundsSliderInput = ({ value, onChange, ...props }) => {
  const [values, setValues] = useState([1, 12]);

  const handleValueChange = (newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div className="flex flex-col gap-1 min-w-1/5">
      <Label htmlFor="rangeSlider">Funding rounds</Label>
      <div className="">
        <DualRangeSlider
          {...props}
          id="roundsSlider"
          label={(value) => <span>{value}</span>}
          value={values}
          onValueChange={handleValueChange}
        />
      </div>
    </div>
  );
};
export default RoundsSliderInput;
