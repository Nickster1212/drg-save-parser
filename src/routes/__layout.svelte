<script lang="ts">
  import '../app.postcss';
  import Header from './_Header.svelte';
</script>

<div class="flex justify-center">
  <div class="w-3/4">
    <Header />
    <main>
      <slot />
    </main>
    <footer />
  </div>
</div>
