import { NextResponse } from "next/server";
import ical from "node-ical";

export async function GET() {
  const calendarUrl = process.env.PROTON_CALENDAR_URL;

  if (!calendarUrl) {
    return NextResponse.json({ events: [] });
  }

  try {
    const response = await fetch(calendarUrl, { cache: "no-store" });
    const icalText = await response.text();
    const parsedData = ical.parseICS(icalText);

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const todayEvents: { summary: string; start: string; rawDate: Date }[] = [];

    for (const key in parsedData) {
      if (!Object.prototype.hasOwnProperty.call(parsedData, key)) continue;

      const ev = parsedData[key];

      // Ensure ev exists and is a calendar VEVENT
      if (ev && ev.type === "VEVENT") {
        // Cast to any to bypass strict node-ical union type checks
        const eventItem = ev as any;
        const summary = eventItem.summary || "Untitled Event";

        // 1. Single events
        if (eventItem.start) {
          const eventStart = new Date(eventItem.start);
          if (eventStart >= startOfToday && eventStart <= endOfToday) {
            todayEvents.push({
              summary,
              start: eventStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              rawDate: eventStart,
            });
          }
        }

        // 2. Recurring events
        if (eventItem.rrule) {
          const recurrences = eventItem.rrule.between(startOfToday, endOfToday, true);
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

    // Sort chronologically
    todayEvents.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime());

    return NextResponse.json({ events: todayEvents });
  } catch (error) {
    console.error("Calendar fetch error:", error);
    return NextResponse.json({ events: [], error: "Failed to parse calendar" }, { status: 500 });
  }
}