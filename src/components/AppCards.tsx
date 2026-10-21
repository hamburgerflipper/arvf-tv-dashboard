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
    icon: "/icons/njpw.png",
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
          className="app-card bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 w-30 h-30 cursor-pointer hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-lg"
        >
          <div className="w-12 h-12 relative">
            <Image
              src={app.icon}
              alt={app.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <span className="font-mono text-xs text-white/90 text-center leading-tight">
            {app.name}
          </span>
        </a>
      ))}
    </div>
  );
}