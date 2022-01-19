import type { SaveFile } from 'drg-save-parser';
import { Overclocks } from '$lib/types/overclocks';
import type { Overclock } from '$lib/types/overclocks';
import type { OverclockEntry } from '$lib/db';
import type { Miner } from '$lib/types/miner';
import type { MinerWeapon } from '$lib/types/weapons';

/**
 * The save file just contains a list of GUIDs of the acquired overclocks ("schematics").
 * We need to translate that into the weapon / overclock name pair we use to track progress.
 */
export const getOverclocksFromSaveFile = ({
  SchematicSave: {
    SchematicSave: {
      ForgedSchematics: forgedSchematics,
      OwnedSchematics: unforgedSchematics,
    },
  },
}: SaveFile): OverclockEntry[] => {
  const acquiredOverclocks: OverclockEntry[] = [];
  Object.entries(Overclocks).forEach(([weapon, overclocks]) => {
    for (const overclock of overclocks) {
      if (
        forgedSchematics !== undefined &&
        forgedSchematics.some((f) => overclock.id === f)
      ) {
        acquiredOverclocks.push({
          weapon: weapon as MinerWeapon<Miner>,
          name: overclock.name,
          isForged: true,
        });
      }
      if (
        unforgedSchematics !== undefined &&
        unforgedSchematics.some((f) => overclock.id === f)
      ) {
        acquiredOverclocks.push({
          weapon: weapon as MinerWeapon<Miner>,
          name: overclock.name,
          isForged: false,
        });
      }
    }
  });
  return acquiredOverclocks;
};
