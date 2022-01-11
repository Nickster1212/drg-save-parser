<script lang="ts">
  import Card, { ActiveState } from '$lib/components/Card.svelte';
  import type { Overclock } from '$lib/types/overclocks';
  import { overclocks } from '$lib/stores/overclocks';
  import { db } from '$lib/db';
  import type { MinerWeapon } from '$lib/types/weapons';
  import { Miner, MinerColor, MinerColorContrastText } from '$lib/types/miner';
  import Image from '$lib/components/Image.svelte';
  import * as frames from '$lib/assets/overclocks/frames';
  import * as icons from '$lib/assets/overclocks/icons';

  type T = $$Generic<Miner>;
  export let miner: Miner;
  export let overclock: Overclock;
  export let weapon: MinerWeapon<T>;

  let active = ActiveState.Inactive;
  $: if ($overclocks.loading === false) {
    const oc = $overclocks.overclocks.find(
      (oc) => oc.weapon === weapon && oc.name === overclock.name
    );
    if (oc) {
      active = oc.isForged ? ActiveState.Active : ActiveState.Partial;
    } else {
      active = ActiveState.Inactive;
    }
  }

  function toggle() {
    switch (active) {
      case ActiveState.Inactive:
        db.overclocks.add({
          weapon,
          name: overclock.name,
          isForged: false,
        });
        break;
      case ActiveState.Partial:
        db.overclocks
          .where({ weapon, name: overclock.name })
          .modify({ isForged: true });
        break;
      case ActiveState.Active:
        db.overclocks
          .where({
            weapon,
            name: overclock.name,
          })
          .delete();
        break;
    }
  }
</script>

<Card
  title={overclock.name}
  {active}
  on:click={toggle}
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

<style lang="postcss">
  .overclock-icon {
    @apply absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2;
  }

  .clean-overclock-icon {
    @apply translate-y-[-57%];
  }
</style>
