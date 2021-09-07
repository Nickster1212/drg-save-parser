import { Dexie } from 'dexie';
import type {
  ArmorPaintjobNames,
  CommonArmorPaintjobNames,
} from '$lib/types/armor';
import type { Framework } from '$lib/types/frameworks';
import type {
  PickaxeSets,
  PickaxeParts,
  PickaxeUniquePartNames,
} from '$lib/types/pickaxes';
import type { Miner } from '$lib/types/miner';
import type { MinerWeapon } from '$lib/types/weapons';
import { readable } from 'svelte/store';

export type OverclockEntry = {
  weapon: MinerWeapon<Miner>;
  name: string;
  isForged: boolean;
};

export type FrameworkEntry = { weapon: MinerWeapon<Miner>; name: Framework };

export type PickaxeEntry = {
  name: typeof PickaxeSets[number];
  part: PickaxeParts;
};

export type PickaxeUniquePartEntry = {
  name: typeof PickaxeUniquePartNames[number];
};

export type ArmorPaintjobEntry = {
  miner: Miner;
  name: typeof ArmorPaintjobNames[Miner][number];
};

export type CommonArmorPaintjobEntry = {
  name: typeof CommonArmorPaintjobNames[number];
};

class AppDatabase extends Dexie {
  overclocks: Dexie.Table<OverclockEntry, number>;
  frameworks: Dexie.Table<FrameworkEntry, number>;
  pickaxes: Dexie.Table<PickaxeEntry, number>;
  pickaxeUniques: Dexie.Table<PickaxeUniquePartEntry, number>;
  armorPaintjobs: Dexie.Table<ArmorPaintjobEntry, number>;
  commonArmorPaintjobs: Dexie.Table<CommonArmorPaintjobEntry, number>;

  constructor() {
    super('DRG-Completionist');
    this.version(3).stores({
      overclocks: '[weapon+name], weapon',

      frameworks: '[weapon+name], weapon',

      pickaxes: '[part+name], name',
      pickaxeUniques: 'name',

      armorPaintjobs: '[miner+name], miner',
      commonArmorPaintjobs: 'name',
    });

    this.overclocks = this.table('overclocks');

    this.frameworks = this.table('frameworks');

    this.pickaxes = this.table('pickaxes');
    this.pickaxeUniques = this.table('pickaxeUniques');

    this.armorPaintjobs = this.table('armorPaintjobs');
    this.commonArmorPaintjobs = this.table('commonArmorPaintjobs');
  }

  /** Async call to clear all current IndexedDB tables completely. */
  clearAll = () => Promise.all(this.tables.map((t) => t.clear()));
}

export const db = readable(new AppDatabase());
