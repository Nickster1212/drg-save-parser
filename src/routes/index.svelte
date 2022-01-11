<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import { Miner, MinerAvatar, MinerColor } from '$lib/types/miner';
  import { MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import WeaponDivider from './_WeaponDivider.svelte';
  import Image from '$lib/components/Image.svelte';
  import { overclocks } from '$lib/stores/overclocks';
  import OverclockCard from './_OverclockCard.svelte';
</script>

{#if $overclocks.loading === true}
  <h1>Loading...</h1>
{:else}
  {#each Object.values(Miner) as miner}
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
            <OverclockCard {miner} {weapon} {overclock} />
          {/each}
        {/each}
      </svelte:fragment>
    </Section>
  {/each}
{/if}
