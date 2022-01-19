import type { SaveFile } from 'drg-save-parser';
import { FrameworkIDs } from '$lib/types/frameworks';
import type { Framework } from '$lib/types/frameworks';
import type { FrameworkEntry } from '$lib/db';
import { flipObject } from '$lib/utils/object';
import { WeaponIDs } from '$lib/types/weapons';

export const getFrameworksFromSaveFile = ({
  UnlockedItemSkins: unlockedItemSkins,
}: SaveFile): FrameworkEntry[] => {
  const acquiredFrameworks: FrameworkEntry[] = [];
  const weaponIDs = flipObject(WeaponIDs);
  Object.entries(unlockedItemSkins).forEach(([weaponID, frameworkIDs]) => {
    const weapon = weaponIDs[weaponID];
    if (weapon === undefined) {
      return;
    }
    const frameworks = frameworkIDs
      .map(
        (frameworkID) =>
          flipObject(FrameworkIDs[weapon])[frameworkID] as Framework | undefined
      )
      .filter((f) => f !== undefined) as Framework[];
    for (const framework of frameworks) {
      acquiredFrameworks.push({ weapon: weapon, name: framework });
    }
  });
  return acquiredFrameworks;
};
