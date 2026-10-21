import { NextResponse } from "next/server";
import ical from "node-ical";

export async function GET() {
  const calendarUrl = process.env.PROTON_CALENDAR_URL;

  if (!calendarUrl) {
    return NextResponse.json({ events: [] });
  }

  try {
    // Fetch the raw iCal feed from Google Calendar
    const response = await fetch(calendarUrl, { cache: "no-store" });
    const icalText = await response.text();

    // Parse the iCal feed
    const parsedData = ical.parseICS(icalText);

    // Get Start and End of TODAY in local time
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const todayEvents: { summary: string; start: string; rawDate: Date }[] = [];

    for (const key in parsedData) {
      const ev = parsedData[key];

      if (ev.type === "VEVENT") {
        const summary = ev.summary || "Untitled Event";
        
        // 1. Handle standard single events
        if (ev.start) {
          const eventStart = new Date(ev.start);

          if (eventStart >= startOfToday && eventStart <= endOfToday) {
            todayEvents.push({
              summary,
              start: eventStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              rawDate: eventStart,
            });
          }
        }

        // 2. Handle recurring events (if Google Calendar provides rrule)
        if (ev.rrule) {
          const recurrences = ev.rrule.between(startOfToday, endOfToday, true);
          for (const date of recurrences) {
            todayEvents.push({
              summary,
              start: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              rawDate: date,
            });
          }
        }
      }
    }

    // Sort events chronologically (earliest first)
    todayEvents.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

    return NextResponse.json({ events: todayEvents });
  } catch (error) {
    console.error("Calendar fetch error:", error);
    return NextResponse.json({ events: [], error: "Failed to parse calendar" }, { status: 500 });
  }
}