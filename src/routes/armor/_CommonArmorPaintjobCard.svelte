<script lang="ts">
  import Card, { ActiveState } from '$lib/components/Card.svelte';
  import { commonArmorPaintjobs } from '$lib/stores/commonArmorPaintjobs';
  import { db } from '$lib/db';
  import { Miner, MinerColor } from '$lib/types/miner';
  import Image from '$lib/components/Image.svelte';
  import type { CommonArmorPaintjob } from '$lib/types/armor';

  export let paintjob: CommonArmorPaintjob;

  let active = false;
  $: if ($commonArmorPaintjobs.loading === false) {
    active =
      $commonArmorPaintjobs.paintjobs.find((p) => p.name === paintjob.name) !==
      undefined;
  }

  function toggle() {
    if (active) {
      db.commonArmorPaintjobs.where({ name: paintjob.name }).delete();
    } else {
      db.commonArmorPaintjobs.add({ name: paintjob.name });
    }
  }
</script>

<Card
  active={active ? ActiveState.Active : ActiveState.Inactive}
  on:click={toggle}
  --body-active-background-color="#A8A8A8"
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
