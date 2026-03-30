import React, { useEffect, useState, useRef } from "react";
import "./clock.css";
import ClockClicker from './ClockClicker'

const clock = {
  hour: "12",
  minute: "30",
  civil: "AM",
  format: "24"
}

export default function ClockPicker() {
  const [active, setActive] = useState(false);
  const containerRef = useRef(null);

  const handleClick = () => {
    setActive(!active);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isActive = active ? "active" : "disabled";

  return (
    <div className="time_picker_container" ref={containerRef}>
      <div
        className={`react_times_button time_picker_preview ${isActive}`}
        onClick={handleClick}
      >
        <div className="wrapper">
          <div className="preview_container">
            <svg width="48" height="48" viewBox="0 0 48 48">
              <path d="M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zM25 14h-3v12l10.49 6.3L34 29.84l-9-5.34z"></path>
            </svg>
            {`${clock.hour} : ${clock.minute} ${clock.format == 12 ? clock.civil : ""}`}
          </div>
        </div>
      </div>
      <ClockClicker active={isActive} clock={clock}></ClockClicker>
    </div>
  );
}
