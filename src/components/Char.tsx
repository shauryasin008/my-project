"use client";

import { motion } from "framer-motion";

type Size = number;

export function BearA({ size = 120, mood = "happy" }: { size?: Size; mood?: "happy" | "love" | "shy" | "sleep" | "wink" }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden>
      <ellipse cx="70" cy="128" rx="34" ry="6" fill="rgba(0,0,0,0.12)" />
      <circle cx="38" cy="38" r="11" fill="#8E5A3B" />
      <circle cx="102" cy="38" r="11" fill="#8E5A3B" />
      <circle cx="38" cy="38" r="6" fill="#FFC2B0" />
      <circle cx="102" cy="38" r="6" fill="#FFC2B0" />
      <circle cx="70" cy="58" r="32" fill="#A06A48" />
      <ellipse cx="70" cy="66" rx="22" ry="18" fill="#FFD9C4" />
      {mood === "wink" ? (
        <>
          <circle cx="60" cy="60" r="3.6" fill="#2A1A12" />
          <path d="M77 60 q3 -3 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : mood === "sleep" ? (
        <>
          <path d="M57 60 q3 -3 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M77 60 q3 -3 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="60" cy="60" r="3.6" fill="#2A1A12" />
          <circle cx="80" cy="60" r="3.6" fill="#2A1A12" />
          <circle cx="61" cy="59" r="1.2" fill="#fff" />
          <circle cx="81" cy="59" r="1.2" fill="#fff" />
        </>
      )}
      <circle cx="54" cy="70" r="3" fill="#FF9DA8" opacity="0.7" />
      <circle cx="86" cy="70" r="3" fill="#FF9DA8" opacity="0.7" />
      {mood === "love" ? (
        <g>
          <circle cx="70" cy="75" r="2" fill="#2A1A12" />
          <circle cx="64" cy="74" r="1.4" fill="#2A1A12" />
          <circle cx="76" cy="74" r="1.4" fill="#2A1A12" />
        </g>
      ) : mood === "shy" ? (
        <path d="M64 74 Q70 78 76 74" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M64 74 Q70 80 76 74" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      <path
        d="M34 90 Q40 110 70 110 Q100 110 106 90 Q104 84 96 82 L44 82 Q36 84 34 90 Z"
        fill="#7FD1B9"
      />
      <path d="M50 100 Q70 108 90 100" stroke="#4FB59A" strokeWidth="2" fill="none" />
      <circle cx="34" cy="98" r="7" fill="#7FD1B9" />
      <circle cx="106" cy="98" r="7" fill="#7FD1B9" />
      <g transform="translate(70 96)">
        <path
          d="M0 3 C-4 -3 -10 0 -6 5 L0 10 L6 5 C10 0 4 -3 0 3 Z"
          fill="#FF6B8A"
        />
      </g>
    </svg>
  );
}

export function BearB({ size = 120, mood = "happy" }: { size?: Size; mood?: "happy" | "love" | "shy" | "sleep" | "wink" }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} aria-hidden>
      <ellipse cx="70" cy="128" rx="34" ry="6" fill="rgba(0,0,0,0.12)" />
      <circle cx="38" cy="38" r="11" fill="#E8C4D4" />
      <circle cx="102" cy="38" r="11" fill="#E8C4D4" />
      <circle cx="38" cy="38" r="6" fill="#FFE2EC" />
      <circle cx="102" cy="38" r="6" fill="#FFE2EC" />
      <circle cx="70" cy="58" r="32" fill="#F2C5D6" />
      <ellipse cx="70" cy="66" rx="22" ry="18" fill="#FFEAE0" />
      {mood === "wink" ? (
        <>
          <path d="M57 60 q3 -4 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="80" cy="62" r="1.6" fill="#2A1A12" />
          <circle cx="78" cy="68" r="0.8" fill="#FF6B8A" />
        </>
      ) : mood === "sleep" ? (
        <>
          <path d="M57 60 q3 -4 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M77 60 q3 -4 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M57 60 q3 -4 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M77 60 q3 -4 6 0" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="60" cy="62" r="1.6" fill="#2A1A12" />
          <circle cx="80" cy="62" r="1.6" fill="#2A1A12" />
        </>
      )}
      <circle cx="54" cy="72" r="3.4" fill="#FFA8B6" opacity="0.85" />
      <circle cx="86" cy="72" r="3.4" fill="#FFA8B6" opacity="0.85" />
      {mood === "love" ? (
        <g>
          <circle cx="70" cy="76" r="2" fill="#2A1A12" />
          <circle cx="64" cy="74" r="1.4" fill="#2A1A12" />
          <circle cx="76" cy="74" r="1.4" fill="#2A1A12" />
        </g>
      ) : mood === "shy" ? (
        <path d="M64 74 Q70 78 76 74" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M64 74 Q70 80 76 74" stroke="#2A1A12" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}
      <path
        d="M28 100 Q34 124 70 124 Q106 124 112 100 Q110 90 100 86 L40 86 Q30 90 28 100 Z"
        fill="#FFC2D8"
      />
      <path d="M30 108 Q70 116 110 108" stroke="#FF9DB7" strokeWidth="2" fill="none" />
      <circle cx="26" cy="106" r="8" fill="#FFC2D8" />
      <circle cx="114" cy="106" r="8" fill="#FFC2D8" />
      <g transform="translate(70 112)">
        <path
          d="M0 3 C-3 -2 -8 0 -5 4 L0 8 L5 4 C8 0 3 -2 0 3 Z"
          fill="#FF4F75"
        />
      </g>
      <g transform="translate(94 32)">
        <path d="M0 0 L-10 -6 L-10 6 Z" fill="#FF6B8A" />
        <path d="M0 0 L10 -6 L10 6 Z" fill="#FF6B8A" />
        <circle cx="0" cy="0" r="3" fill="#E14E70" />
      </g>
    </svg>
  );
}

export function FloatingBear({
  side,
  pose = "stand",
  delay = 0,
}: {
  side: "left" | "right";
  pose?: "stand" | "wave" | "peek" | "jump" | "love";
  delay?: number;
}) {
  const Bear = side === "left" ? BearA : BearB;
  const mood = pose === "love" ? "love" : "happy";

  const anim = pickAnim(pose, delay);
  return (
    <motion.div
      className="pointer-events-none fixed z-30 select-none"
      style={side === "left" ? { left: 8, bottom: 8 } : { right: 8, bottom: 8 }}
      initial={anim.initial}
      animate={anim.animate}
      transition={anim.transition}
    >
      <div style={{ transform: side === "right" ? "scaleX(-1)" : undefined }}>
        <Bear size={110} mood={mood} />
      </div>
    </motion.div>
  );
}

function pickAnim(pose: string, delay: number) {
  switch (pose) {
    case "wave":
      return {
        initial: { y: 0, rotate: 0 },
        animate: { y: [0, -8, 0], rotate: [0, -8, 8, 0] },
        transition: { duration: 1.6, repeat: Infinity, delay },
      };
    case "peek":
      return {
        initial: { y: 60 },
        animate: { y: [60, 0, 0, 60] },
        transition: { duration: 4, repeat: Infinity, delay, times: [0, 0.2, 0.7, 1] },
      };
    case "jump":
      return {
        initial: { y: 0 },
        animate: { y: [0, -20, 0] },
        transition: { duration: 1.1, repeat: Infinity, delay },
      };
    case "love":
      return {
        initial: { y: 0, scale: 1 },
        animate: { y: [0, -6, 0], scale: [1, 1.05, 1] },
        transition: { duration: 1.4, repeat: Infinity, delay },
      };
    default:
      return {
        initial: { y: 0 },
        animate: { y: [0, -4, 0] },
        transition: { duration: 2.4, repeat: Infinity, delay, ease: "easeInOut" },
      };
  }
}