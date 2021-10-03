<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner, MinerAvatar, MinerColor } from '$lib/types/miner';
  import { MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import Card from '$lib/components/Card.svelte';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import WeaponDivider from './_WeaponDivider.svelte';
  import Image from '$lib/components/Image.svelte';

  function enumKeys<O extends object, K extends keyof O = keyof O>(
    obj: O
  ): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }
</script>

{#each enumKeys(Miner) as miner}
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
          percentage={100}
          --start-color={MinerColor[miner]}
        />
      </div>
    </svelte:fragment>
    <svelte:fragment>
      {#each MinerWeapons[miner] as weapon}
        <WeaponDivider {weapon} />
        {#each Overclocks[weapon] as overclock}
          <Card title={overclock.name} />
        {/each}
      {/each}
    </svelte:fragment>
  </Section>
{/each}
