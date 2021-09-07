<script lang="ts">
  import { slide } from 'svelte/transition';
  import CardHeader from '$lib/card/CardHeader.svelte';

  let expanded = true;
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<section class="border border-b-0 last:border-b border-gray-500">
  <CardHeader {expanded} on:click={toggleExpand} />
  {#if expanded}
    <div class="p-6 border-gray-500 border-t" transition:slide>
      <h4>Card Content</h4>
    </div>
  {/if}
</section>
