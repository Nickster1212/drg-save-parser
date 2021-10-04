<script lang="ts">
  import Section from '$lib/section/Section.svelte';
  import {
    Miner,
    MinerAvatar,
    MinerColor,
    MinerColorContrastText,
  } from '$lib/types/miner';
  import { MinerWeapons } from '$lib/types/weapons';
  import { Overclocks } from '$lib/types/overclocks';
  import Card from '$lib/components/Card.svelte';
  import SectionHeaderProgress from '$lib/section/SectionHeaderProgress.svelte';
  import WeaponDivider from './_WeaponDivider.svelte';
  import Image from '$lib/components/Image.svelte';
  import * as frames from '$lib/assets/overclocks/frames';
  import * as icons from '$lib/assets/overclocks/icons';
  import { overclocks } from '$lib/stores/overclocks';

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
          <Card
            title={overclock.name}
            active={true}
            --active-background-color={MinerColor[miner]}
            --active-text-color={MinerColorContrastText[miner]}
          >
            <div class="relative h-[100px] w-[100px]">
              <div class="overclock-icon">
                <Image
                  src={frames[overclock.type]}
                  alt={overclock.type}
                  class="inline-block h-auto w-auto"
                />
                <div
                  class="overclock-icon"
                  class:clean-overclock-icon={overclock.type === 'Clean'}
                >
                  <Image
                    src={icons[overclock.icon]}
                    alt={overclock.icon}
                    class="inline-block h-auto w-auto"
                  />
                </div>
              </div>
            </div>
          </Card>
        {/each}
      {/each}
    </svelte:fragment>
  </Section>
{/each}

<style lang="postcss">
  .overclock-icon {
    @apply absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2;
  }

  .clean-overclock-icon {
    @apply translate-y-[-57%];
  }
</style>
