import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialEvent) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialEvent);
  const ref = useRef(null);
  const actionRef = useRef(null);

  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  const toggleClickComponent = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return {
    ref,
    actionRef,
    isComponentVisible,
    setIsComponentVisible,
    toggleClickComponent
  };
}
