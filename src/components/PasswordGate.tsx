"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { passwordGate } from "../data/content";
import { BearA, BearB } from "./Char";

type Props = { onUnlock: () => void };

export function PasswordGate({ onUnlock }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const unlockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (unlockTimer.current) clearTimeout(unlockTimer.current);
    };
  }, []);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (success) return;
    if (passwordGate.accepted.includes(value.trim())) {
      setError(false);
      setSuccess(true);
      unlockTimer.current = setTimeout(onUnlock, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <BackgroundGate />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.form
              key="g"
              onSubmit={submit}
              className={`card-cute w-full max-w-md text-center ${error ? "anim-shake" : ""}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="mx-auto mb-2 flex w-full items-end justify-center gap-2">
                <BearA size={84} mood="happy" />
                <BearB size={84} mood="happy" />
              </div>
              <h1 className="h-hand text-3xl text-[#3b2a22]">a tiny secret awaits 💌</h1>
              <p className="mt-2 text-sm text-[#6b4a3a]">{passwordGate.intro}</p>
              <p className="mt-4 text-sm font-semibold text-[#3b2a22]">{passwordGate.question} ❤️</p>
              <input
                aria-label="secret password"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={passwordGate.placeholder}
                className="input-cute mt-3 text-center"
                autoComplete="off"
                spellCheck={false}
                autoFocus
              />
              <button type="submit" className="btn-cute mt-3 w-full">
                {passwordGate.cta}
              </button>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm font-semibold text-[#cc4b6a]"
                >
                  {passwordGate.failTitle}
                  <br />
                  {passwordGate.failSubtitle}
                </motion.p>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="ok"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card-cute w-full max-w-md text-center"
            >
              <div className="mx-auto flex items-end justify-center gap-2">
                <BearA size={100} mood="love" />
                <BearB size={100} mood="love" />
              </div>
              <h2 className="h-hand mt-2 text-3xl text-[#3b2a22]">✨ access granted ✨</h2>
              <p className="mt-1 text-base text-[#3b2a22]">I knew it was you. ❤️</p>
              <div className="mx-auto mt-3 h-1.5 w-44 overflow-hidden rounded-full bg-[#FFE3D3]">
                <motion.div
                  className="h-full bg-rose"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BackgroundGate() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ background: "linear-gradient(180deg, #CDEBFF 0%, #FFE9F2 70%, #FFF6E5 100%)" }}
      aria-hidden
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="absolute h-12 w-12 rounded-full bg-white/70 blur-xl anim-floaty"
          style={{
            top: `${10 + i * 14}%`,
            left: `${5 + (i * 19) % 80}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={`h${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-rose/60"
          style={{
            top: `${(i * 17) % 80}%`,
            left: `${(i * 23) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}