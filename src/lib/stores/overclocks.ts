import type { OverclockEntry } from '$lib/db';
import { liveQuery } from 'dexie';
import { db } from '$lib/db';
import { readable } from 'svelte/store';

export const overclocks = readable<
  { loading: true } | { loading: false; overclocks: OverclockEntry[] }
>({ loading: true }, (set) => {
  const querySubscription = liveQuery(() => db.overclocks.toArray()).subscribe({
    next: (result) => set({ loading: false, overclocks: result }),
  });
  return () => querySubscription.unsubscribe();
});
