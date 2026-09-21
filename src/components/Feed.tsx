"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BearA, BearB } from "./Char";
import { Note, QuizQuestion, finalNote as DefaultFinal } from "../data/content";

type FeedProps = {
  notes: Note[];
  quiz: QuizQuestion[];
  final: typeof DefaultFinal;
  onOpenAdmin: () => void;
  adminAuthed: boolean;
};

export function Feed({ notes, quiz, final, onOpenAdmin, adminAuthed }: FeedProps) {
  // Build a rich feed: scatter quiz card + final card among notes.
  const slots = buildSlots(notes.length, quiz.length);

  return (
    <div className="relative">
      {/* sticky mascot strip at top */}
      <StickyMascot onOpenAdmin={onOpenAdmin} adminAuthed={adminAuthed} />

      <Hero />

      <div className="mx-auto max-w-3xl px-4 pb-32">
        {slots.map((slot, i) => {
          if (slot.kind === "note") {
            const note = notes[slot.index];
            return <NoteCard key={`n-${note.id}-${i}`} note={note} index={i} />;
          }
          if (slot.kind === "quiz") {
            const q = quiz[slot.index];
            return <QuizCard key={`q-${q.id}-${i}`} q={q} index={i} />;
          }
          if (slot.kind === "final") {
            return <FinalCard key="final" final={final} />;
          }
          if (slot.kind === "interlude") {
            return <Interlude key={`i-${i}`} index={slot.index} />;
          }
          return null;
        })}

        <EndCard />
      </div>
    </div>
  );
}

function StickyMascot({ onOpenAdmin, adminAuthed }: { onOpenAdmin: () => void; adminAuthed: boolean }) {
  return (
    <div className="sticky top-0 z-20 mx-auto -mb-2 flex w-full max-w-3xl items-center justify-between gap-2 bg-cream/80 px-4 py-2 backdrop-blur">
      <div className="flex items-center gap-1">
        <span className="text-xl">🐻💗🐻</span>
        <span className="hidden text-xs font-semibold text-[#6b4a3a] sm:inline">our little world</span>
      </div>
      <button
        onClick={onOpenAdmin}
        className="btn-ghost text-xs"
        title={adminAuthed ? "open admin" : "admin login"}
      >
        {adminAuthed ? "🛠 admin" : "admin"}
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-3xl px-4 pb-6 pt-2 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-cute"
      >
        <div className="flex items-end justify-center gap-2">
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
            <BearA size={90} mood="love" />
          </motion.div>
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, delay: 0.4 }}>
            <BearB size={90} mood="love" />
          </motion.div>
        </div>
        <h1 className="h-hand mt-2 text-4xl text-[#3b2a22] sm:text-5xl">our little world 💗</h1>
        <p className="mt-1 text-sm text-[#6b4a3a]">scroll slow. every page is a little love letter.</p>
        <div className="mt-3 flex justify-center gap-2 text-xs">
          <span className="sticker">📜 notes</span>
          <span className="sticker">💞 memories</span>
          <span className="sticker">🎵 songs</span>
          <span className="sticker">✨ easter eggs</span>
        </div>
        <div className="h-hand mt-4 inline-block rounded-full bg-rose/15 px-3 py-1 text-rose-deep">↓ start scrolling ↓</div>
      </motion.div>
    </section>
  );
}

function NoteCard({ note, index }: { note: Note; index: number }) {
  const ref = useInViewRef<HTMLDivElement>(0.18);
  const tilt = ((index * 7) % 5) - 2;
  const palette = paletteFor(index);

  if (note.type === "tiny") {
    return (
      <motion.div
        ref={ref.ref}
        initial={{ opacity: 0, y: 18 }}
        animate={ref.inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="my-10 text-center"
      >
        <div
          className="mx-auto inline-block max-w-md rounded-2xl bg-white/80 px-5 py-3 text-base text-[#3b2a22] shadow ring-1 ring-white/60"
          style={{ transform: `rotate(${tilt}deg)` }}
        >
          {note.body}
        </div>
        <div className="mt-2 text-rose/80 text-sm">💗</div>
      </motion.div>
    );
  }

  if (note.type === "time-capsule") {
    return (
      <motion.section
        ref={ref.ref}
        initial={{ opacity: 0, y: 24 }}
        animate={ref.inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="my-8"
      >
        <div className="card-cute" style={{ background: palette.bg, transform: `rotate(${tilt * 0.5}deg)` }}>
          {note.title && (
            <h2 className="h-hand mb-2 text-3xl text-[#3b2a22]">{note.title}</h2>
          )}
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-[#3b2a22]">{note.body}</pre>
        </div>
      </motion.section>
    );
  }

  if (note.type === "song") {
    return (
      <motion.section
        ref={ref.ref}
        initial={{ opacity: 0, y: 24 }}
        animate={ref.inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="my-8"
      >
        <div className="card-cute" style={{ background: palette.bg, transform: `rotate(${tilt * 0.4}deg)` }}>
          {note.title && <h2 className="h-hand mb-2 text-3xl text-[#3b2a22]">{note.title}</h2>}
          <pre className="whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-[#3b2a22]">{note.body}</pre>
        </div>
        <div className="mt-2 text-center text-sm text-[#6b4a3a]">🎵 press play in your head 🎵</div>
      </motion.section>
    );
  }

  if (note.type === "letter") {
    return (
      <motion.section
        ref={ref.ref}
        initial={{ opacity: 0, y: 24 }}
        animate={ref.inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="my-10"
      >
        <div
          className="card-cute mx-auto max-w-2xl"
          style={{
            background: "repeating-linear-gradient(180deg, #fffaf0 0px, #fffaf0 28px, #f3e3cf 29px)",
            transform: `rotate(${tilt * 0.3}deg)`,
          }}
        >
          {note.title && <h2 className="h-hand mb-2 text-3xl text-rose-deep">{note.title}</h2>}
          <p className="font-hand text-[18px] leading-[28px] text-[#3b2a22]">{note.body}</p>
          <div className="mt-3 text-right text-sm text-rose-deep h-hand text-xl">— yours, always 💗</div>
        </div>
      </motion.section>
    );
  }

  if (note.type === "memory") {
    return (
      <motion.section
        ref={ref.ref}
        initial={{ opacity: 0, y: 24 }}
        animate={ref.inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="my-8"
      >
        <div className="card-cute" style={{ background: palette.bg, transform: `rotate(${tilt * 0.4}deg)` }}>
          {note.title && <h2 className="h-hand mb-1 text-3xl text-[#3b2a22]">{note.title}</h2>}
          {note.date && <p className="text-xs text-[#9a7a6a]">{note.date}</p>}
          {note.photo && (
            <div className="mt-3 overflow-hidden rounded-2xl bg-white p-2 shadow-inner ring-1 ring-[#FFD3DD]">
              <Photo src={note.photo} alt={note.title ?? "memory"} adjustment={note.photoAdjustment} />
            </div>
          )}
          <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-[#3b2a22]">{note.body}</p>
        </div>
      </motion.section>
    );
  }

  // default 'note'
  return (
    <motion.section
      ref={ref.ref}
      initial={{ opacity: 0, y: 24 }}
      animate={ref.inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-8"
    >
      <div
        className="card-cute mx-auto max-w-xl"
        style={{ background: palette.bg, transform: `rotate(${tilt * 0.5}deg)` }}
      >
        {note.title && <h2 className="h-hand mb-2 text-3xl text-[#3b2a22]">{note.title}</h2>}
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-[#3b2a22]">{note.body}</p>
      </div>
    </motion.section>
  );
}

function Photo({
  src,
  alt,
  adjustment,
}: {
  src: string;
  alt: string;
  adjustment?: Note["photoAdjustment"];
}) {
  const [errored, setErrored] = useState(false);
  const hasAdjustment = Boolean(adjustment);
  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#FFE9F2] to-[#FFF6E5] ${hasAdjustment ? "aspect-auto" : "aspect-[4/3]"}`}
      style={adjustment ? { width: `${adjustment.width}px`, height: `${adjustment.height}px`, maxWidth: "100%" } : undefined}
    >
      {!errored ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setErrored(true)}
          className={`h-full w-full ${adjustment?.fit === "contain" ? "object-contain" : "object-cover"}`}
          loading="lazy"
        />
      ) : (
        <div className="grid h-full w-full place-items-center text-center text-xs text-[#9a7a6a]">
          <div>
            <div className="text-3xl">🖼️</div>
            <div>add a photo to <code className="font-mono">{src}</code></div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuizCard({ q, index }: { q: QuizQuestion; index: number }) {
  const ref = useInViewRef<HTMLDivElement>(0.18);
  const [picked, setPicked] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setShow(true);
  }

  return (
    <motion.section
      ref={ref.ref}
      initial={{ opacity: 0, y: 24 }}
      animate={ref.inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-10"
    >
      <div className="card-cute mx-auto max-w-xl text-center">
        <div className="sticker mb-2">a tiny quiz 💌</div>
        <h2 className="h-hand text-2xl text-[#3b2a22] sm:text-3xl">{q.question}</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.correct;
            const isPicked = picked === i;
            return (
              <button
                key={i}
                onClick={() => pick(i)}
                className={`rounded-2xl border-2 px-3 py-3 text-sm font-semibold transition ${
                  picked === null
                    ? "border-[#FFD3DD] bg-white hover:border-[#FF7AA2]"
                    : isCorrect
                    ? "border-[#7FD1B9] bg-[#E7F9F1]"
                    : isPicked
                    ? "border-[#FFB3C1] bg-[#FFEAEF]"
                    : "border-[#FFE3D3] bg-white opacity-60"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {show && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm font-semibold text-rose-deep"
          >
            {picked === q.correct ? "yes!! 💖 " : "haha "}
            {q.reaction}
          </motion.p>
        )}
        <div className="mt-3 text-xs text-[#9a7a6a]">question {index + 1}</div>
      </div>
    </motion.section>
  );
}

function FinalCard({ final }: { final: typeof DefaultFinal }) {
  const ref = useInViewRef<HTMLDivElement>(0.2);
  return (
    <motion.section
      ref={ref.ref}
      initial={{ opacity: 0, y: 30 }}
      animate={ref.inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="my-14"
    >
      <div className="card-cute text-center" style={{ background: "linear-gradient(180deg,#FFE3EE,#FFF1C9)" }}>
        <div className="h-hand text-sm text-rose-deep">{final.date}</div>
        <h1 className="h-hand mt-1 text-4xl text-[#3b2a22] sm:text-5xl">{final.headline}</h1>
        <div className="mx-auto my-3 flex items-end justify-center gap-1">
          <BearA size={110} mood="love" />
          <BearB size={110} mood="love" />
        </div>
        <div className="mx-auto max-w-md space-y-2 text-[15px] leading-relaxed text-[#3b2a22]">
          {final.body.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <FinalReveal final={final} />
      </div>
    </motion.section>
  );
}

function FinalReveal({ final }: { final: typeof DefaultFinal }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      {!open ? (
        <button onClick={() => setOpen(true)} className="btn-cute">
          {final.finalSurprisePrompt}
        </button>
      ) : (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto inline-block"
        >
          <div className="h-hand whitespace-pre-line rounded-2xl bg-white/95 px-5 py-3 text-2xl text-rose-deep shadow-lg ring-1 ring-white/70">
            {final.finalSurprise}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function Interlude({ index }: { index: number }) {
  const lines = [
    { emoji: "🌸", text: "keep scrolling, my love." },
    { emoji: "🫶", text: "you're doing amazing and you don't even know it." },
    { emoji: "🌙", text: "I think about you at the weirdest times." },
    { emoji: "🍓", text: "did you eat today? please eat." },
    { emoji: "✨", text: "you make ordinary feel like a movie." },
    { emoji: "🐻", text: "I love you. just in case you forgot today." },
  ];
  const line = lines[index % lines.length];
  const ref = useInViewRef<HTMLDivElement>(0.2);
  return (
    <motion.div
      ref={ref.ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={ref.inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="my-12 text-center"
    >
      <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-semibold text-[#3b2a22] shadow ring-1 ring-white/60">
        <span className="text-xl">{line.emoji}</span>
        <span className="h-hand text-xl">{line.text}</span>
      </div>
    </motion.div>
  );
}

function EndCard() {
  const ref = useInViewRef<HTMLDivElement>(0.2);
  return (
    <motion.div
      ref={ref.ref}
      initial={{ opacity: 0, y: 20 }}
      animate={ref.inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="my-16 text-center"
    >
      <div className="card-cute mx-auto inline-block">
        <div className="h-hand text-2xl text-[#3b2a22]">you reached the end. 💗</div>
        <p className="mt-1 text-sm text-[#6b4a3a]">go back up. read it again. I added a few new things.</p>
        <p className="mt-1 text-sm text-[#6b4a3a]">I love you. that was always the point.</p>
      </div>
    </motion.div>
  );
}

// ----- helpers -----

function useInViewRef<T extends Element>(amount: number) {
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

function paletteFor(i: number) {
  const palettes = [
    { bg: "#FFF6E5" },
    { bg: "#FFEAEF" },
    { bg: "#EAF6FF" },
    { bg: "#F1E8FF" },
    { bg: "#E7F9F1" },
    { bg: "#FFF1F7" },
  ];
  return palettes[i % palettes.length];
}

function buildSlots(notesCount: number, quizCount: number) {
  // Place a quiz card every ~6 notes and a final card at the end,
  // plus a few interludes for breathing room.
  const slots: (
    | { kind: "note"; index: number }
    | { kind: "quiz"; index: number }
    | { kind: "final" }
    | { kind: "interlude"; index: number }
  )[] = [];

  let noteIdx = 0;
  let quizIdx = 0;
  let interIdx = 0;
  const totalNotes = notesCount;

  for (let i = 0; i < totalNotes; i++) {
    slots.push({ kind: "note", index: noteIdx++ });
    if ((i + 1) % 4 === 0) {
      slots.push({ kind: "interlude", index: interIdx++ });
    }
    if ((i + 1) % 6 === 0 && quizIdx < quizCount) {
      slots.push({ kind: "quiz", index: quizIdx++ });
    }
  }
  // any remaining quizzes
  while (quizIdx < quizCount) {
    slots.push({ kind: "quiz", index: quizIdx++ });
    slots.push({ kind: "interlude", index: interIdx++ });
  }
  slots.push({ kind: "interlude", index: interIdx++ });
  slots.push({ kind: "final" });
  return slots;
}