import type { CommonArmorPaintjobEntry } from '$lib/db';
import { liveQuery } from 'dexie';
import { db } from '$lib/db';
import { readable } from 'svelte/store';

export const commonArmorPaintjobs = readable<
  { loading: true } | { loading: false; paintjobs: CommonArmorPaintjobEntry[] }
>({ loading: true }, (set) => {
  const querySubscription = liveQuery(() =>
    db.commonArmorPaintjobs.toArray()
  ).subscribe({
    next: (result) => set({ loading: false, paintjobs: result }),
  });
  return () => querySubscription.unsubscribe();
});
