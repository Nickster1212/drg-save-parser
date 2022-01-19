import type { FrameworkEntry } from '$lib/db';
import { liveQuery } from 'dexie';
import { db } from '$lib/db';
import { readable } from 'svelte/store';

export const frameworks = readable<
  { loading: true } | { loading: false; frameworks: FrameworkEntry[] }
>({ loading: true }, (set) => {
  const querySubscription = liveQuery(() => db.frameworks.toArray()).subscribe({
    next: (result) => set({ loading: false, frameworks: result }),
  });
  return () => querySubscription.unsubscribe();
});
