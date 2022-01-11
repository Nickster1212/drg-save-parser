<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner, MinerAvatar, MinerColor } from '$lib/types/miner';
  import { MinerWeapon, MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import WeaponDivider from './_WeaponDivider.svelte';
  import Image from '$lib/components/Image.svelte';
  import { overclocks } from '$lib/stores/overclocks';
  import OverclockCard from './_OverclockCard.svelte';
  import { derived } from 'svelte/store';

  export let miner: Miner;

  const weapons: readonly MinerWeapon<Miner>[] = MinerWeapons[miner];
  const acquired_overclocks = derived(overclocks, ($overclocks) => {
    if ($overclocks.loading === true) return [];
    return $overclocks.overclocks.filter((overclock) =>
      weapons.includes(overclock.weapon)
    );
  });

  let progress = 0;
  $: {
    const weapons: readonly MinerWeapon<Miner>[] = MinerWeapons[miner];
    const overclock_count = weapons.reduce(
      (acc, weapon) => acc + Overclocks[weapon].length,
      0
    );
    const acquired_overclock_count = $acquired_overclocks.length;
    progress = Math.round((acquired_overclock_count / overclock_count) * 100);
  }
</script>

<Section>
  <svelte:fragment slot="header">
    <Image
      src={MinerAvatar[miner]}
      alt={`${miner} Portrait`}
      width="64"
      height="64"
      class="mr-2"
    />
    <div class="flex flex-col w-full mt-2">
      <h3 class="font-medium">{miner}</h3>
      <SectionHeaderProgress
        percentage={progress}
        --start-color={MinerColor[miner]}
      />
    </div>
  </svelte:fragment>
  <svelte:fragment>
    {#each MinerWeapons[miner] as weapon}
      <WeaponDivider {weapon} />
      {#each Overclocks[weapon] as overclock}
        <OverclockCard {miner} {weapon} {overclock} />
      {/each}
    {/each}
  </svelte:fragment>
</Section>
