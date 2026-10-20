"use client";

import {useState, useEffect, useCallback} from "react";

const greetings = [

    "Hello, Angel.",
    "Hola, Angel.",
    "Bonjour, Angel.",
    "こんにちは, Angel.",
    "مرحبا, Angel.",
    "안녕하세요, Angel.",
    "Olá, Angel.",
    "Ciao, Angel.",
    "Hallo, Angel.",
    "Привет, Angel.",

];

const TYPING_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

export default function HelloGreeting() {
  const [displayed, setDisplayed] = useState("");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentGreeting = greetings[greetingIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      if (displayed.length < currentGreeting.length) {
        setDisplayed(currentGreeting.slice(0, displayed.length + 1));
        return TYPING_SPEED;
      } else {
        // Done typing — pause then start deleting
        setIsDeleting(true);
        return PAUSE_AFTER_TYPE;
      }
    } else {
      // Deleting
      if (displayed.length > 0) {
        setDisplayed(currentGreeting.slice(0, displayed.length - 1));
        return DELETE_SPEED;
      } else {
        // Done deleting — move to next greeting
        setIsDeleting(false);
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        return PAUSE_AFTER_DELETE;
      }
    }
  }, [displayed, isDeleting, currentGreeting]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextDelay = tick();
      // nextDelay is handled by the next render cycle
    }, isDeleting
      ? (displayed.length === 0 ? PAUSE_AFTER_DELETE : DELETE_SPEED)
      : (displayed.length === currentGreeting.length ? PAUSE_AFTER_TYPE : TYPING_SPEED)
    );

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentGreeting, tick]);

  return (
    <div className="text-2xl font-mono font-light tracking-wide text-tv-text">
      <span>{displayed}</span>
      <span className="cursor animate-blink" />
    </div>
  );
}