<script lang="ts">
  import Card, { ActiveState } from '$lib/components/Card.svelte';
  import { frameworks } from '$lib/stores/frameworks';
  import type { MinerWeapon } from '$lib/types/weapons';
  import { Miner, MinerColor } from '$lib/types/miner';
  import Image from '$lib/components/Image.svelte';
  import { Framework, FrameworkIcon } from '$lib/types/frameworks';
  import { db } from '$lib/db';

  type T = $$Generic<Miner>;
  export let miner: Miner;
  export let framework: Framework;
  export let weapon: MinerWeapon<T>;

  let active = false;
  $: if ($frameworks.loading === false) {
    active =
      $frameworks.frameworks.find(
        (f) => f.weapon === weapon && f.name === framework
      ) !== undefined;
  }

  function toggle() {
    if (active) {
      db.frameworks.where({ weapon, name: framework }).delete();
    } else {
      db.frameworks.add({ weapon, name: framework });
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
        src={FrameworkIcon[framework]}
        alt={framework}
        class="h-[100px] w-[100px]"
      />
    </div>
  </div>
</Card>
