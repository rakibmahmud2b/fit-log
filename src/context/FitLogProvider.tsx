"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { useToast } from "@/components/ui/ToastProvider";
import type { FitLogContextValue, FitLogState, PlanCollection, Workout } from "@/types/fitlog";

const STORAGE_KEY = "fitlog-state-v1";
const EMPTY_STATE: FitLogState = { todayPlan: [], saved: [], doneIds: [] };
const EMPTY_SNAPSHOT = JSON.stringify(EMPTY_STATE);
const FitLogContext = createContext<FitLogContextValue | null>(null);
const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  window.addEventListener("storage", callback);

  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function subscribeHydration() {
  return () => {};
}

function getSnapshot(): string {
  return window.localStorage.getItem(STORAGE_KEY) || EMPTY_SNAPSHOT;
}

function getServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

function getState(snapshot: string): FitLogState {
  try {
    const savedState = JSON.parse(snapshot);
    return {
      todayPlan: Array.isArray(savedState.todayPlan) ? savedState.todayPlan : [],
      saved: Array.isArray(savedState.saved) ? savedState.saved : [],
      doneIds: Array.isArray(savedState.doneIds) ? savedState.doneIds : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(state: FitLogState): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  subscribers.forEach((callback) => callback());
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
}

interface FitLogProviderProps {
  children: React.ReactNode;
}

export default function FitLogProvider({ children }: FitLogProviderProps) {
  const { showToast } = useToast();
  const state = getState(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);

  function addToPlan(workout: Workout): boolean {
    const current = getState(getSnapshot());

    if (current.todayPlan.some((item) => item.id === workout.id)) {
      showToast("Already in today's plan", "info");
      return false;
    }

    if (current.todayPlan.length >= 5) {
      showToast("Today's plan is full. Remove a lift to add another.", "error");
      return false;
    }

    writeState({ ...current, todayPlan: [...current.todayPlan, workout] });
    showToast("Added to today's plan");
    return true;
  }

  function saveWorkout(workout: Workout): boolean {
    const current = getState(getSnapshot());

    if (current.saved.some((item) => item.id === workout.id)) {
      showToast("Already saved for later", "info");
      return false;
    }

    writeState({ ...current, saved: [...current.saved, workout] });
    showToast("Saved for later");
    return true;
  }

  function removeWorkout(id: number, collection: PlanCollection = "todayPlan"): void {
    const current = getState(getSnapshot());
    if (collection !== "todayPlan" && collection !== "saved") return;

    writeState({
      ...current,
      [collection]: current[collection].filter((workout) => workout.id !== id),
      ...(collection === "todayPlan"
        ? { doneIds: current.doneIds.filter((doneId) => doneId !== id) }
        : {}),
    });
    showToast(collection === "saved" ? "Removed from saved" : "Removed from today's plan", "info");
  }

  function markDone(id: number): void {
    const current = getState(getSnapshot());
    if (current.doneIds.includes(id)) return;
    writeState({ ...current, doneIds: [...current.doneIds, id] });
    showToast("Workout marked as done");
  }

  return (
    <FitLogContext.Provider
      value={{
        ...state,
        hydrated,
        addToPlan,
        saveWorkout,
        removeWorkout,
        markDone,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}
