"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  desc: string;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetch("https://wttr.in/Kingsville?format=j1")
      .then((res) => res.json())
      .then((data) => {
        const current = data.current_condition[0];
        setWeather({
          temp: Math.round(Number(current.temp_F)),
          desc: current.weatherDesc[0].value,
        });
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, []);

  if (!weather) {
    return <div className="text-white font-mono text-2xl opacity-70">...</div>;
  }

  return (
    <div className="flex items-center gap-3 font-mono text-white text-1xl md:text-2xl">
      <span className="font">{weather.temp}°F</span>
      <span className="text-lg md:text-xl opacity-70 capitalize">({weather.desc})</span>
    </div>
  );
}