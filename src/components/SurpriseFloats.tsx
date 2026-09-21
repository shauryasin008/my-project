"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { BearA, BearB } from "./Char";

type Surprise =
  | "peek-left"
  | "peek-right"
  | "wave"
  | "rain"
  | "butterfly"
  | "couple"
  | "sticker"
  | "trip"
  | "secret-note"
  | "balloon"
  | "spin";

const SURPRISES: { kind: Surprise; weight: number }[] = [
  { kind: "peek-left", weight: 1.5 },
  { kind: "peek-right", weight: 1.5 },
  { kind: "wave", weight: 1.2 },
  { kind: "rain", weight: 0.7 },
  { kind: "butterfly", weight: 1.3 },
  { kind: "couple", weight: 0.6 },
  { kind: "sticker", weight: 1.4 },
  { kind: "trip", weight: 0.7 },
  { kind: "secret-note", weight: 0.5 },
  { kind: "balloon", weight: 1.0 },
  { kind: "spin", weight: 1.0 },
];

function pick(): Surprise {
  const total = SURPRISES.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const s of SURPRISES) {
    r -= s.weight;
    if (r <= 0) return s.kind;
  }
  return "peek-left";
}

const STICKERS = [
  "ps… you're cute 💗",
  "I love you. just so you know.",
  "hi. I'm thinking about you.",
  "you're my favourite person.",
  "go to sleep, my love 🌙",
  "wait… come back 🥺",
  "did you eat today? 🍓",
  "you matter. a lot.",
];

const SECRET_NOTES = [
  "I still get nervous around you.",
  "I'm proud of you. for the small things too.",
  "I keep a photo of you in my wallet. just so you know.",
  "you make me brave.",
  "I'm not good with words but I am good with you.",
];

export function SurpriseSystem({ enabled }: { enabled: boolean }) {
  const [active, setActive] = useState<{ id: number; kind: Surprise } | null>(null);
  const [lastAt, setLastAt] = useState(0);

  // Random trigger every 6-12 seconds
  useEffect(() => {
    if (!enabled) return;
    const tick = () => {
      const wait = 6000 + Math.random() * 6000;
      const t = setTimeout(() => {
        const now = Date.now();
        if (now - lastAt > 5000) {
          setLastAt(now);
          setActive({ id: now, kind: pick() });
        }
        tick();
      }, wait);
      return () => clearTimeout(t);
    };
    const cleanup = tick();
    return () => cleanup && cleanup();
  }, [enabled, lastAt]);

  if (!enabled) return null;

  return (
    <AnimatePresence>
      {active && (
        <Surprise key={active.id} kind={active.kind} onDone={() => setActive(null)} />
      )}
    </AnimatePresence>
  );
}

function Surprise({ kind, onDone }: { kind: Surprise; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, kind === "rain" ? 4500 : 3000);
    return () => clearTimeout(t);
  }, [kind, onDone]);

  if (kind === "peek-left") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-2 left-2 z-30"
        initial={{ x: -130, y: 30 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: -130, y: 30 }}
        transition={{ type: "spring", stiffness: 130, damping: 16 }}
      >
        <BearA size={120} mood="shy" />
      </motion.div>
    );
  }
  if (kind === "peek-right") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-2 right-2 z-30"
        initial={{ x: 130, y: 30 }}
        animate={{ x: 0, y: 0 }}
        exit={{ x: 130, y: 30 }}
        transition={{ type: "spring", stiffness: 130, damping: 16 }}
      >
        <div style={{ transform: "scaleX(-1)" }}>
          <BearB size={120} mood="shy" />
        </div>
      </motion.div>
    );
  }
  if (kind === "wave") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-3 left-1/2 z-30 -translate-x-1/2 flex items-end gap-1"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
      >
        <motion.div animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 1, repeat: 2 }}>
          <BearA size={100} />
        </motion.div>
        <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 1, repeat: 2 }}>
          <div style={{ transform: "scaleX(-1)" }}>
            <BearB size={100} />
          </div>
        </motion.div>
      </motion.div>
    );
  }
  if (kind === "rain") {
    return (
      <div className="pointer-events-none fixed inset-0 z-30">
        {Array.from({ length: 26 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-xl"
            style={{ left: `${(i * 41) % 100}%`, top: -30 }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3 + (i % 4), delay: i * 0.08, ease: "linear" }}
          >
            {["💗", "💖", "💕", "🌸", "💗"][i % 5]}
          </motion.span>
        ))}
      </div>
    );
  }
  if (kind === "butterfly") {
    return (
      <motion.div
        className="pointer-events-none fixed z-30 text-3xl"
        initial={{ x: -50, y: "40vh" }}
        animate={{ x: "110vw", y: ["40vh", "30vh", "50vh", "35vh", "45vh"] }}
        transition={{ duration: 5, ease: "easeInOut" }}
      >
        🦋
      </motion.div>
    );
  }
  if (kind === "couple") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-3 left-1/2 z-30 -translate-x-1/2"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
      >
        <div className="flex items-end gap-1">
          <BearA size={110} mood="love" />
          <BearB size={110} mood="love" />
        </div>
      </motion.div>
    );
  }
  if (kind === "sticker") {
    const text = STICKERS[Math.floor(Math.random() * STICKERS.length)];
    return (
      <motion.div
        className="pointer-events-none fixed left-1/2 top-1/3 z-30 -translate-x-1/2"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 20 }}
      >
        <div className="h-hand rotate-[-4deg] rounded-2xl bg-white/95 px-5 py-3 text-2xl text-[#3b2a22] shadow-lg ring-1 ring-white/70">
          {text}
        </div>
      </motion.div>
    );
  }
  if (kind === "trip") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-3 left-6 z-30"
        initial={{ y: 80, opacity: 0, rotate: 0 }}
        animate={{ y: 0, opacity: 1, rotate: [0, -22, 12, -4, 0] }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 1.4 }}
      >
        <BearA size={120} mood="happy" />
        <div className="h-hand text-center text-xs text-rose-deep">oops</div>
      </motion.div>
    );
  }
  if (kind === "secret-note") {
    const text = SECRET_NOTES[Math.floor(Math.random() * SECRET_NOTES.length)];
    return (
      <motion.div
        className="pointer-events-none fixed left-1/2 top-1/3 z-30 -translate-x-1/2"
        initial={{ y: -30, opacity: 0, rotate: -8 }}
        animate={{ y: 0, opacity: 1, rotate: -8 }}
        exit={{ y: -30, opacity: 0, rotate: -8 }}
      >
        <div className="card-cute max-w-xs text-center">
          <div className="h-hand text-xl text-rose-deep">a tiny secret</div>
          <p className="mt-1 text-sm">{text}</p>
        </div>
      </motion.div>
    );
  }
  if (kind === "balloon") {
    return (
      <motion.div
        className="pointer-events-none fixed bottom-0 z-30"
        style={{ left: `${20 + Math.random() * 60}%` }}
        initial={{ y: 0, opacity: 0 }}
        animate={{ y: "-110vh", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 7, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <div className="text-4xl">🎈</div>
        </div>
      </motion.div>
    );
  }
  if (kind === "spin") {
    return (
      <motion.div
        className="pointer-events-none fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-6xl"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        exit={{ scale: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        💖
      </motion.div>
    );
  }
  return null;
}