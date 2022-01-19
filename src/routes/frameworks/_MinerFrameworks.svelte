<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner, MinerAvatar, MinerColor } from '$lib/types/miner';
  import { MinerWeapon, MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import WeaponDivider from '$lib/components/WeaponDivider.svelte';
  import Image from '$lib/components/Image.svelte';
  import { overclocks } from '$lib/stores/overclocks';
  import FrameworkCard from './_FrameworkCard.svelte';
  import { derived } from 'svelte/store';
  import { Frameworks } from '$lib/types/frameworks';
  import { frameworks } from '$lib/stores/frameworks';

  export let miner: Miner;

  const weapons: readonly MinerWeapon<Miner>[] = MinerWeapons[miner];
  const acquired_framework_count = derived(frameworks, ($frameworks) => {
    if ($frameworks.loading === true) return 0;
    return $frameworks.frameworks.filter((f) => weapons.includes(f.weapon))
      .length;
  });
  const framework_count = weapons.reduce((acc) => acc + Frameworks.length, 0);
  $: progress = Math.round(($acquired_framework_count / framework_count) * 100);
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
      {#each Frameworks as framework}
        <FrameworkCard {miner} {weapon} {framework} />
      {/each}
    {/each}
  </svelte:fragment>
</Section>
