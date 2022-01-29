<script lang="ts">
  import { overclocks } from '$lib/stores/overclocks';
  import { Overclocks } from '$lib/types/overclocks';
</script>

<section class="border border-b-0 last:border-b border-gray-500">
  <h2>Overclocks</h2>
  {#if $overclocks.loading === false}
    <p>
      {$overclocks.overclocks.length} / {Object.values(Overclocks).flat()
        .length}
    </p>
  {/if}
  <h2>Frameworks</h2>
  <h2>Armor</h2>
  <h2>Pickaxes</h2>
</section>

<style lang="postcss">
  h2 {
    @apply text-xl;
  }
</style>
