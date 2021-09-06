<script lang="ts">
  import '../app.postcss';
  import Header from './_Header.svelte';
</script>

<div class="flex justify-center">
  <div class="w-3/4 px-6 pt-6">
    <Header />
    <main>
      <slot />
    </main>
    <footer />
  </div>
</div>
