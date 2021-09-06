<script lang="ts">
  import CardHeader from '$lib/card/CardHeader.svelte';

  let expanded = true;
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<section class="border border-gray-500 rounded-sm">
  <CardHeader {expanded} on:click={toggleExpand} />
  <div />
</section>
