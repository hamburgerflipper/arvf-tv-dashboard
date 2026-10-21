"use client";

import Image from "next/image";

interface AppLink {
  name: string;
  url: string;
  icon: string; // path in /public/icons/
}

const apps: AppLink[] = [
  {
    name: "HBO Max",
    url: "https://play.max.com",
    icon: "/icons/hbo.jpg",
  },
  {
    name: "SportsSurge",
    url: "https://isportsurge.ws/index9",
    icon: "/icons/sportssurge.jpg",
  },
  {
    name: "YouTube",
    url: "https://youtube.com",
    icon: "/icons/youtube.png",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com",
    icon: "/icons/spotify.png",
  },
  {
    name: "WatchWrestling",
    url: "https://watch-wrestling.eu/home-15/",
    icon: "/icons/lucha.jpg",
  },
    {
    name: "Cinejoy",
    url: "https://cinejoy.pk/",
    icon: "/icons/cinejoy.png",
  },
];

export default function AppCards() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {apps.map((app) => (
        <a
          key={app.name}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className="app-card bg-tv-gray/60 backdrop-blur-sm rounded-2xl p-4 flex flex-col items-center justify-center gap-3 w-36 h-36 cursor-pointer"
        >
          <div className="w-12 h-12 relative">
            <Image
              src={app.icon}
              alt={app.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <span className="font-mono text-xs text-tv-text-dim text-center leading-tight">
            {app.name}
          </span>
        </a>
      ))}
    </div>
  );
}