<script lang="ts">
  import { slide } from 'svelte/transition';
  import SectionHeader from './SectionHeader.svelte';

  let expanded = true;
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<section class="border border-b-0 last:border-b border-gray-500">
  <SectionHeader {expanded} on:click={toggleExpand} />
  {#if expanded}
    <div
      class="p-2 border-gray-500 border-t grid grid-cols-3"
      transition:slide|local
    >
      <div class="m-2 border border-gray-500 transition-all hover:shadow-xl">
        <div class="p-2 bg-yellow-300 text-black font-bold">Lighter Tanks</div>
        <div>Content!</div>
      </div>
      <div
        class="m-2 border border-gray-500 transition-all hover:shadow-xl"
        role="button"
      >
        <div class="p-2 bg-yellow-300 text-black font-bold">
          Sticky Additave
        </div>
        <div>Content!</div>
      </div>
      <div class="m-2 border border-gray-500 transition-all hover:shadow-xl">
        <div class="p-2 bg-yellow-300 text-black font-bold">Lighter Tanks</div>
        <div>Content!</div>
      </div>
    </div>
  {/if}
</section>
