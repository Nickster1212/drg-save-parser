<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import Image from '$lib/components/Image.svelte';
  import CommonArmorPaintjobCard from './_CommonArmorPaintjobCard.svelte';
  import { derived } from 'svelte/store';
  import { CommonArmorPaintjobs } from '$lib/types/armor';
  import { commonArmorPaintjobs } from '$lib/stores/commonArmorPaintjobs';
  import { PlayerRankIcon } from '$lib/assets/other';

  const acquired_paintjob_count = derived(
    commonArmorPaintjobs,
    ($armorPaintjobs) => {
      if ($armorPaintjobs.loading === true) return 0;
      return $armorPaintjobs.paintjobs.length;
    }
  );
  $: progress = Math.round(
    ($acquired_paintjob_count / CommonArmorPaintjobs.length) * 100
  );
</script>

<Section>
  <svelte:fragment slot="header">
    <Image
      src={PlayerRankIcon}
      alt="Common Armor Components"
      width="64"
      height="64"
      class="mr-2"
    />
    <div class="flex flex-col w-full mt-2">
      <h3 class="font-medium">Common</h3>
      <SectionHeaderProgress percentage={progress} --start-color="#A8A8A8" />
    </div>
  </svelte:fragment>
  <svelte:fragment>
    {#each CommonArmorPaintjobs as paintjob}
      <CommonArmorPaintjobCard {paintjob} />
    {/each}
  </svelte:fragment>
</Section>
