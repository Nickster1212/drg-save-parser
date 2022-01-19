<script lang="ts">
  import { Miner } from '$lib/types/miner';
  import { overclocks } from '$lib/stores/overclocks';
  import MinerArmorPaintjobs from './_MinerArmorPaintjobs.svelte';
</script>

{#if $overclocks.loading === true}
  <h1>Loading...</h1>
{:else}
  {#each Object.values(Miner) as miner}
    <MinerArmorPaintjobs {miner} />
  {/each}
{/if}
