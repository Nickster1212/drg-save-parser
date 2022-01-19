<script lang="ts">
  import Card, { ActiveState } from '$lib/components/Card.svelte';
  import { armorPaintjobs } from '$lib/stores/armorPaintjobs';
  import { db } from '$lib/db';
  import { Miner, MinerColor } from '$lib/types/miner';
  import Image from '$lib/components/Image.svelte';
  import type { ArmorPaintjob } from '$lib/types/armor';

  export let miner: Miner;
  export let paintjob: ArmorPaintjob;

  let active = false;
  $: if ($armorPaintjobs.loading === false) {
    active =
      $armorPaintjobs.paintjobs.find(
        (p) => p.miner === miner && p.name === paintjob.name
      ) !== undefined;
  }

  function toggle() {
    if (active) {
      db.armorPaintjobs.where({ miner, name: paintjob.name }).delete();
    } else {
      db.armorPaintjobs.add({ miner, name: paintjob.name });
    }
  }
</script>

<Card
  active={active ? ActiveState.Active : ActiveState.Inactive}
  on:click={toggle}
  --body-active-background-color={MinerColor[miner]}
>
  <div class="relative h-[100px] w-[100px]">
    <div
      class="absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2"
    >
      <Image
        src={paintjob.icon}
        alt={paintjob.name}
        class="h-[100px] w-[100px]"
      />
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
