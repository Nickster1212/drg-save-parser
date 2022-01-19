import type { SaveFile } from 'drg-save-parser';
import { Pickaxes } from '$lib/types/pickaxes';
import type { PickaxeParts, PickaxeSets } from '$lib/types/pickaxes';
import type { PickaxeEntry } from '$lib/db';

/**
 * The save file just contains a list of GUIDs of the acquired pickaxe parts.
 * This one is simple and simply checks the GUIDs in the save file's
 * UnlockedPickaxeParts[] against all the GUIDs in data/pickaxes.ts
 */
export const getPickaxesFromSaveFile = ({
  UnlockedPickaxeParts: unlockedPickaxeParts,
}: SaveFile): PickaxeEntry[] => {
  const acquiredParts: PickaxeEntry[] = [];
  Object.values(unlockedPickaxeParts).forEach((unlockedPartId) => {
    if (unlockedPartId === undefined) return;

    // Checks each GUID in the save file against all PartIDs in each Pickaxe Set
    for (const pickaxe of Pickaxes) {
      Object.entries(pickaxe.partIDs).forEach(([partType, id]) => {
        if (id === unlockedPartId) {
          acquiredParts.push({
            name: pickaxe.name as typeof PickaxeSets[number],
            part: partType as PickaxeParts,
          });
        }
      });
    }
  });
  return acquiredParts;
};
