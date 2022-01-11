<script lang="ts">
  import { slide } from 'svelte/transition';
  import SectionHeader from './SectionHeader.svelte';
  import Card from '$lib/components/Card.svelte';

  let expanded = true;
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<section class="border border-b-0 last:border-b border-gray-500">
  <SectionHeader {expanded} on:click={toggleExpand}>
    <slot name="header" />
  </SectionHeader>
  {#if expanded}
    <div
      class="p-2 border-gray-500 border-t grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2"
      transition:slide|local
    >
      <slot />
    </div>
  {/if}
</section>
