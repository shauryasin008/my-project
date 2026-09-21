"use client";

import { useEffect, useState } from "react";
import { PasswordGate } from "../components/PasswordGate";
import { Feed } from "../components/Feed";
import { AdminPanel } from "../components/AdminPanel";
import { SurpriseSystem } from "../components/SurpriseFloats";
import { useStore, loadInitial, setState } from "../lib/store";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    loadInitial();
    // Force a re-render of subscribers with the loaded initial state.
    setState((s) => ({ ...s }));
    setUnlocked(window.sessionStorage.getItem("our-little-world:unlocked") === "true");
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="h-hand text-3xl text-[#3b2a22]">loading our little world… 💗</div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <PasswordGate
        onUnlock={() => {
          window.sessionStorage.setItem("our-little-world:unlocked", "true");
          setUnlocked(true);
        }}
      />
    );
  }

  return <UnlockedApp />;
}

function UnlockedApp() {
  const store = useStore();
  const [adminOpen, setAdminOpen] = useState(false);
  return (
    <main className="relative min-h-screen w-full">
      <Feed
        notes={store.notes}
        quiz={store.quiz}
        final={store.final}
        onOpenAdmin={() => setAdminOpen(true)}
        adminAuthed={store.adminAuthed}
      />
      <SurpriseSystem enabled={true} />
      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </main>
  );
}