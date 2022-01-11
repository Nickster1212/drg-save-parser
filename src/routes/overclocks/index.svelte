<script lang="ts">
  import { Miner } from '$lib/types/miner';
  import { overclocks } from '$lib/stores/overclocks';
  import MinerOverclocks from './_MinerOverclocks.svelte';
</script>

{#if $overclocks.loading === true}
  <h1>Loading...</h1>
{:else}
  {#each Object.values(Miner) as miner}
    <MinerOverclocks {miner} />
  {/each}
{/if}
