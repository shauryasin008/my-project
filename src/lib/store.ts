"use client";

import { useEffect, useState, useCallback } from "react";
import {
  notes as defaultNotes,
  quiz as defaultQuiz,
  finalNote as defaultFinal,
  site as defaultSite,
  Note,
  QuizQuestion,
} from "../data/content";

const STORAGE_KEY = "our-little-world:v1";

type StoredContent = {
  notes: Note[];
  quiz: QuizQuestion[];
  final: typeof defaultFinal;
  site: typeof defaultSite;
  adminAuthed: boolean;
  updatedAt: number;
};

const defaults: StoredContent = {
  notes: defaultNotes,
  quiz: defaultQuiz,
  final: defaultFinal,
  site: defaultSite,
  adminAuthed: false,
  updatedAt: 0,
};

let memoryState: StoredContent = defaults;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function loadInitial(): StoredContent {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<StoredContent>;
    return {
      notes: parsed.notes && parsed.notes.length ? parsed.notes : defaults.notes,
      quiz: parsed.quiz && parsed.quiz.length ? parsed.quiz : defaults.quiz,
      final: parsed.final ?? defaults.final,
      site: { ...defaults.site, ...(parsed.site ?? {}) },
      adminAuthed: parsed.adminAuthed ?? false,
      updatedAt: parsed.updatedAt ?? 0,
    };
  } catch {
    return defaults;
  }
}

export function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...memoryState, updatedAt: Date.now() }),
    );
  } catch {
    /* quota / private mode — ignore */
  }
}

export function setState(updater: Partial<StoredContent> | ((s: StoredContent) => StoredContent)) {
  const next = typeof updater === "function" ? updater(memoryState) : { ...memoryState, ...updater };
  memoryState = next;
  persist();
  emit();
}

export function resetToDefaults() {
  memoryState = { ...defaults, updatedAt: Date.now() };
  persist();
  emit();
}

export function useStore() {
  const [state, setLocal] = useState<StoredContent>(memoryState);
  useEffect(() => {
    setLocal(loadInitial());
    const l = () => setLocal({ ...memoryState });
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return state;
}

export function useStoreUpdate() {
  return useCallback((updater: Partial<StoredContent> | ((s: StoredContent) => StoredContent)) => {
    setState(updater);
  }, []);
}