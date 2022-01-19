<script lang="ts">
  import '../app.postcss';
  import AnalyzeModal from './_AnalyzeModal.svelte';
  import Header from './_Header.svelte';

  let analyze = false;
</script>

<div class="flex justify-center">
  <div class="w-3/4">
    <Header on:analyze={() => (analyze = true)} />
    <main>
      <slot />
    </main>
    <footer />
  </div>
</div>

{#if analyze}
  <AnalyzeModal on:close={() => (analyze = false)} />
{/if}
