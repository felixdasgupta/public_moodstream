import { useState } from "react";

export const useSlider = (initialValue = 50) => {
  const [sliderValue, setSliderValue] = useState(initialValue);

  const handleSliderChange = function(event) {
    setSliderValue(event.target.value);
  };

  return {
    sliderValue,
    handleSliderChange
  };
};
