import { NextResponse } from "next/server";
// @ts-ignore
import ical from "ical";

export async function GET() {
  const url = process.env.PROTON_CALENDAR_URL;

  if (!url) {
    return NextResponse.json({ error: "No calendar URL configured" }, { status: 400 });
  }

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.text();
    const parsed = ical.parseICS(data);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const events = Object.values(parsed)
      .filter((item: any) => item && item.type === "VEVENT" && item.start)
      .map((event: any) => {
        const start = new Date(event.start);
        return {
          summary: event.summary || "Untitled Event",
          start: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          startDate: start,
        };
      })
      // Filter for events happening strictly today
      .filter((event) => event.startDate >= today && event.startDate < tomorrow)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return NextResponse.json({ events });
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse calendar" }, { status: 500 });
  }
}