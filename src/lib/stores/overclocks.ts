import { derived } from 'svelte/store';
import type { OverclockEntry } from './db';
import { liveQuery } from 'dexie';
import { db } from './db';

export const overclocks = derived<
  typeof db,
  { loading: true } | { loading: false; overclocks: OverclockEntry[] }
>(
  db,
  (database, set) => {
    const querySubscription = liveQuery(() =>
      database.overclocks.toArray()
    ).subscribe({
      next: (result) => set({ loading: false, overclocks: result }),
    });
    return () => querySubscription.unsubscribe();
  },
  { loading: true }
);
