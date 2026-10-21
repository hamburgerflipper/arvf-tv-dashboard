"use client";

import { useState, useEffect } from "react";

interface CalendarEvent {
  summary: string;
  start: string;
}

export default function CalendarWidget() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data) => {
        if (data.events) {
          setEvents(data.events);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-tv-gray/50 backdrop-blur-sm border border-white/5 p-6 w-full max-w-sm">
      <h3 className="font-mono text-sm text-tv-text-dim uppercase tracking-widest mb-4">
        // today&apos;s schedule
      </h3>
      <div className="space-y-3">
        {loading ? (
          <p className="font-mono text-tv-text-dim text-sm italic animate-pulse">
            [ loading schedule... ]
          </p>
        ) : events.length === 0 ? (
          <p className="font-mono text-tv-text-dim text-sm italic">
            [ no events scheduled today ]
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((evt, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm font-mono">
                <span className="text-tv-text font-medium truncate mr-2">{evt.summary}</span>
                <span className="text-tv-text-dim text-xs shrink-0">{evt.start}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}