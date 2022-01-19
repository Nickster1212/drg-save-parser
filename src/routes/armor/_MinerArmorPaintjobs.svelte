<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner, MinerAvatar, MinerColor } from '$lib/types/miner';
  import { MinerWeapon, MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import Image from '$lib/components/Image.svelte';
  import { overclocks } from '$lib/stores/overclocks';
  import ArmorPaintjobCard from './_ArmorPaintjobCard.svelte';
  import { derived } from 'svelte/store';
  import { ArmorPaintjobs } from '$lib/types/armor';
  import { armorPaintjobs } from '$lib/stores/armorPaintjobs';

  export let miner: Miner;

  const acquired_paintjob_count = derived(armorPaintjobs, ($armorPaintjobs) => {
    if ($armorPaintjobs.loading === true) return 0;
    return $armorPaintjobs.paintjobs.filter((p) => p.miner === miner).length;
  });
  $: progress = Math.round(
    ($acquired_paintjob_count / ArmorPaintjobs[miner].length) * 100
  );
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
    {#each ArmorPaintjobs[miner] as paintjob}
      <ArmorPaintjobCard {miner} {paintjob} />
    {/each}
  </svelte:fragment>
</Section>
