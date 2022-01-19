import type { ArmorPaintjobEntry } from '$lib/db';
import { liveQuery } from 'dexie';
import { db } from '$lib/db';
import { readable } from 'svelte/store';

export const armorPaintjobs = readable<
  { loading: true } | { loading: false; paintjobs: ArmorPaintjobEntry[] }
>({ loading: true }, (set) => {
  const querySubscription = liveQuery(() =>
    db.armorPaintjobs.toArray()
  ).subscribe({
    next: (result) => set({ loading: false, paintjobs: result }),
  });
  return () => querySubscription.unsubscribe();
});
