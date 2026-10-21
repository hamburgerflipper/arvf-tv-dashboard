import HelloGreeting from "@/components/HelloGreeting";
import Weather from "@/components/Weather";
import Clock from "@/components/Clock";
import CalendarWidget from "@/components/CalendarWidget";
import AppCards from "@/components/AppCards";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Wallpaper overlay */}
      <div className="wallpaper-overlay" />
      {/* ── WALLPAPER BACKGROUND ── */}
      <div 
        className="wallpaper-bg" 
        style={{ backgroundImage: "url('/wallpaper.jpg')" }} 
      />
      <div className="wallpaper-overlay" />

      {/* ── TOP ROW ── */}
      <div className="absolute top-3 left-5 right-5 flex justify-between items-start z-10">
        <HelloGreeting />
        <Weather />
      </div>

      {/* ── MIDDLE ROW ── */}
      <div className="absolute top-[47%] -translate-y-1/2 left-0 right-0 flex items-center justify-center gap-12 px-12 z-10">
        <div className="flex-1 flex justify-center">
          <Clock />
        </div>
        <div className="flex-1 flex justify-center">
          <CalendarWidget />
        </div>
      </div>

      {/* ── BOTTOM ROW (App Dock) ── */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
        <AppCards />
      </div>
    </main>
  );
}