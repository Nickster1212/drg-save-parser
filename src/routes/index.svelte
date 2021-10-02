<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner } from '$lib/types/miner';
  import { MinerWeapons, WeaponOutlines } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import { assets } from '$app/paths';
  import Card from '$lib/card/Card.svelte';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';

  function enumKeys<O extends object, K extends keyof O = keyof O>(
    obj: O
  ): K[] {
    return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
  }
</script>

{#each enumKeys(Miner) as miner}
  <Section>
    <svelte:fragment slot="header">
      <img
        src={`${assets}/portraits/Driller_portrait.png`}
        alt="Driller portrait"
        width="64"
        height="64"
        class="mr-2"
      />
      <div class="flex flex-col w-full mt-2">
        <h3 class="font-medium">{miner}</h3>
        <SectionHeaderProgress percentage={100} />
      </div>
    </svelte:fragment>
    <svelte:fragment>
      {#each MinerWeapons[miner] as weapon}
        <div class="weapon-icon-divider col-span-full p-2 w-full flex">
          <img
            src={WeaponOutlines[weapon].webp}
            alt={weapon}
            class="px-4 h-[75px]"
          />
        </div>
        {#each Overclocks[weapon] as overclock}
          <Card title={overclock.name} />
        {/each}
      {/each}
    </svelte:fragment>
  </Section>
{/each}

<style lang="postcss">
  .weapon-icon-divider::before,
  .weapon-icon-divider::after {
    @apply border-solid border-t border-t-gray-600 transform translate-y-1/2 w-1/2;
    content: '';
  }
</style>
