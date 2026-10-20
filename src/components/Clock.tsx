"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<string>("");
  const [period, setPeriod] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      setTime(`${hours}:${minutes}:${seconds}`);
      setPeriod(ampm);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-baseline gap-3">
      <span className="font-digital text-8xl md:text-9xl text-tv-red clock-glow leading-none">
        {time}
      </span>
      <span className="font-digital text-3xl text-tv-red opacity-70">
        {period}
      </span>
    </div>
  );
}