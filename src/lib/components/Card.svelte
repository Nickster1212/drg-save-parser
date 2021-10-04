<script lang="ts">
  export let title: string;
  export let active: boolean;
</script>

<div
  class="m-2 border border-gray-500 transition-all hover:shadow-xl"
  role="button"
  on:click
>
  <div class="p-2 font-bold border-b border-gray-500 truncate" class:active>
    {title}
  </div>
  <div class="flex content-center justify-center p-4">
    <slot />
  </div>
</div>

<style lang="postcss">
  .active {
    background-color: var(--active-background-color);
    color: var(--active-text-color);
  }
</style>
