"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { admin } from "../data/content";
import { useStore, useStoreUpdate, resetToDefaults } from "../lib/store";
import { Note, QuizQuestion, finalNote } from "../data/content";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AdminPanel({ open, onClose }: Props) {
  const store = useStore();
  const update = useStoreUpdate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const authed = store.adminAuthed;

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (username === admin.username && password === admin.password) {
      update({ adminAuthed: true });
      setLoginError("");
      setUsername("");
      setPassword("");
    } else {
      setLoginError("nope. try again. 😭");
    }
  }

  function logout() {
    update({ adminAuthed: false });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-4 flex items-center justify-between gap-2 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:-mt-6 sm:px-6">
              <h2 className="h-hand text-2xl text-[#3b2a22]">🛠 admin</h2>
              <div className="flex items-center gap-2">
                {authed && (
                  <button onClick={logout} className="btn-ghost text-xs">logout</button>
                )}
                <button onClick={onClose} className="btn-ghost text-xs" aria-label="close">✕</button>
              </div>
            </div>

            {!authed ? (
              <form onSubmit={login} className="mx-auto max-w-sm space-y-3">
                <p className="text-center text-sm text-[#6b4a3a]">login to edit the whole world 💗</p>
                <input
                  aria-label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="input-cute"
                  autoComplete="off"
                />
                <input
                  aria-label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="input-cute"
                  autoComplete="off"
                />
                {loginError && <p className="text-center text-sm text-rose-deep">{loginError}</p>}
                <button type="submit" className="btn-cute w-full">enter ✨</button>
              </form>
            ) : (
              <AdminEditor />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AdminEditor() {
  const store = useStore();
  const update = useStoreUpdate();
  const [tab, setTab] = useState<"site" | "notes" | "quiz" | "final" | "danger">("site");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <TabBtn active={tab === "site"} onClick={() => setTab("site")}>site</TabBtn>
        <TabBtn active={tab === "notes"} onClick={() => setTab("notes")}>notes ({store.notes.length})</TabBtn>
        <TabBtn active={tab === "quiz"} onClick={() => setTab("quiz")}>quiz ({store.quiz.length})</TabBtn>
        <TabBtn active={tab === "final"} onClick={() => setTab("final")}>final note</TabBtn>
        <TabBtn active={tab === "danger"} onClick={() => setTab("danger")}>danger</TabBtn>
      </div>

      {tab === "site" && (
        <div className="space-y-3">
          <Field label="app name" value={store.site.appName} onChange={(v) => update({ site: { ...store.site, appName: v } })} />
          <Field label="her name" value={store.site.herName} onChange={(v) => update({ site: { ...store.site, herName: v } })} />
          <Field label="your name" value={store.site.yourName} onChange={(v) => update({ site: { ...store.site, yourName: v } })} />
          <Field label="tagline" value={store.site.tagline} onChange={(v) => update({ site: { ...store.site, tagline: v } })} />
          <Field label="anniversary date" value={store.site.anniversaryDate} onChange={(v) => update({ site: { ...store.site, anniversaryDate: v } })} />
        </div>
      )}

      {tab === "notes" && (
        <div className="space-y-4">
          {store.notes.map((n, i) => (
            <NoteEditor
              key={n.id}
              note={n}
              onChange={(updated) => {
                const next = [...store.notes];
                next[i] = updated;
                update({ notes: next });
              }}
              onDelete={() => {
                update({ notes: store.notes.filter((_, idx) => idx !== i) });
              }}
            />
          ))}
          <button
            onClick={() => {
              const newNote: Note = {
                id: `n${Date.now()}`,
                type: "note",
                title: "new note",
                body: "write something cute here…",
              };
              update({ notes: [...store.notes, newNote] });
            }}
            className="btn-cute w-full"
          >
            + add a new note
          </button>
        </div>
      )}

      {tab === "quiz" && (
        <div className="space-y-4">
          {store.quiz.map((q, i) => (
            <QuizEditor
              key={q.id}
              q={q}
              onChange={(updated) => {
                const next = [...store.quiz];
                next[i] = updated;
                update({ quiz: next });
              }}
              onDelete={() => {
                update({ quiz: store.quiz.filter((_, idx) => idx !== i) });
              }}
            />
          ))}
          <button
            onClick={() => {
              const newQ: QuizQuestion = {
                id: `q${Date.now()}`,
                question: "new question?",
                options: ["option A", "option B", "option C"],
                correct: 0,
                reaction: "yay 💗",
              };
              update({ quiz: [...store.quiz, newQ] });
            }}
            className="btn-cute w-full"
          >
            + add a quiz question
          </button>
        </div>
      )}

      {tab === "final" && (
        <FinalEditor
          final={store.final}
          onChange={(next) => update({ final: next })}
        />
      )}

      {tab === "danger" && (
        <div className="space-y-3 rounded-2xl bg-rose/5 p-4 ring-1 ring-rose/30">
          <p className="text-sm text-[#6b4a3a]">reset everything to the default cute notes? this can&apos;t be undone.</p>
          <button
            onClick={() => {
              if (confirm("reset all edits? 💔")) {
                resetToDefaults();
                update({ adminAuthed: true });
              }
            }}
            className="rounded-full bg-rose-deep px-5 py-2 text-sm font-semibold text-white shadow"
          >
            reset to defaults
          </button>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active ? "bg-rose text-white shadow" : "bg-white text-[#3b2a22] ring-1 ring-[#FFD3DD] hover:bg-[#FFF6E5]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, textarea, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; rows?: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-[#6b4a3a]">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="input-cute font-sans"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-cute"
        />
      )}
    </label>
  );
}

function NoteEditor({ note, onChange, onDelete }: { note: Note; onChange: (n: Note) => void; onDelete: () => void }) {
  return (
    <div className="rounded-2xl bg-cream/60 p-3 ring-1 ring-[#FFD3DD]">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-[#9a7a6a]">#{note.id}</span>
        <select
          value={note.type}
          onChange={(e) => onChange({ ...note, type: e.target.value as Note["type"] })}
          className="rounded-full bg-white px-2 py-1 text-xs ring-1 ring-[#FFD3DD]"
        >
          <option value="note">note</option>
          <option value="memory">memory (with photo)</option>
          <option value="song">song / lyrics</option>
          <option value="letter">letter</option>
          <option value="time-capsule">time capsule (list)</option>
          <option value="tiny">tiny line</option>
        </select>
        <button onClick={onDelete} className="ml-auto rounded-full bg-rose-deep px-2 py-1 text-xs font-semibold text-white">
          delete
        </button>
      </div>
      <Field label="title" value={note.title ?? ""} onChange={(v) => onChange({ ...note, title: v })} />
      <Field label="body" textarea value={note.body} onChange={(v) => onChange({ ...note, body: v })} />
      {note.type === "memory" && (
        <>
          <Field label="photo path (e.g. /images/photo1.jpg or https://…)" value={note.photo ?? ""} onChange={(v) => onChange({ ...note, photo: v })} />
          <Field label="date label" value={note.date ?? ""} onChange={(v) => onChange({ ...note, date: v })} />
        </>
      )}
    </div>
  );
}

function QuizEditor({ q, onChange, onDelete }: { q: QuizQuestion; onChange: (q: QuizQuestion) => void; onDelete: () => void }) {
  return (
    <div className="rounded-2xl bg-cream/60 p-3 ring-1 ring-[#FFD3DD]">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold text-[#9a7a6a]">#{q.id}</span>
        <button onClick={onDelete} className="ml-auto rounded-full bg-rose-deep px-2 py-1 text-xs font-semibold text-white">
          delete
        </button>
      </div>
      <Field label="question" value={q.question} onChange={(v) => onChange({ ...q, question: v })} />
      <div className="grid gap-2 sm:grid-cols-3">
        {q.options.map((opt, i) => (
          <label key={i} className="block">
            <span className="mb-1 block text-xs font-semibold text-[#6b4a3a]">option {i + 1}</span>
            <input
              value={opt}
              onChange={(e) => {
                const next = [...q.options];
                next[i] = e.target.value;
                onChange({ ...q, options: next });
              }}
              className="input-cute"
            />
          </label>
        ))}
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-[#6b4a3a]">correct option (0, 1, 2)</span>
          <input
            type="number"
            min={0}
            max={q.options.length - 1}
            value={q.correct}
            onChange={(e) => onChange({ ...q, correct: Number(e.target.value) })}
            className="input-cute"
          />
        </label>
        <Field label="reaction" value={q.reaction} onChange={(v) => onChange({ ...q, reaction: v })} />
      </div>
    </div>
  );
}

function FinalEditor({ final, onChange }: { final: typeof finalNote; onChange: (f: typeof finalNote) => void }) {
  return (
    <div className="space-y-3">
      <Field label="date" value={final.date} onChange={(v) => onChange({ ...final, date: v })} />
      <Field label="headline" value={final.headline} onChange={(v) => onChange({ ...final, headline: v })} />
      <Field label="body lines (one per line)" textarea rows={8}
        value={final.body.join("\n")}
        onChange={(v) => onChange({ ...final, body: v.split("\n") })}
      />
      <Field label="final surprise prompt" value={final.finalSurprisePrompt} onChange={(v) => onChange({ ...final, finalSurprisePrompt: v })} />
      <Field label="final surprise message" textarea value={final.finalSurprise} onChange={(v) => onChange({ ...final, finalSurprise: v })} />
    </div>
  );
}