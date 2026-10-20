import HelloGreeting from "@/components/HelloGreeting";
import Weather from "@/components/Weather";
import Clock from "@/components/Clock";
import CalendarWidget from "@/components/CalendarWidget";
import AppCards from "@/components/AppCards";

export default function Home() {
  return (
    <>

      {/* ── WALLPAPER BACKGROUND ── */}
      <div 
        className="wallpaper-bg" 
        style={{ backgroundImage: "url('/wallpaper.jpg')" }} 
      />
      {/* Wallpaper overlay */}
      <div className="wallpaper-overlay" />
      {/* Main Container */}
      <div className="content-layer flex flex-col justify-between p-12 md:p-16 max-w-7xl mx-auto w-full">
        
        {/* ── TOP ROW (Pushed down with mt-10 and side padding px-8) ── */}
        <div className="w-full flex justify-between items-start mt-10 px-8">
          <HelloGreeting />
          <Weather />
        </div>

        {/* ── MIDDLE ROW ── */}
        <div className="w-full flex-1 flex items-center justify-between px-4 gap-8">
          <div className="flex-1 flex justify-center">
            <Clock />
          </div>
          <div className="flex-1 flex justify-center">
            <CalendarWidget />
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="w-full pb-6 flex justify-center">
          <AppCards />
        </div>

      </div>
    </>
  );
}