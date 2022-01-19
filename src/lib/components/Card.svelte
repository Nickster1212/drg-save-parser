<script context="module" lang="ts">
  export enum ActiveState {
    Active,
    Inactive,
    Partial,
  }
</script>

<script lang="ts">
  export let title: string | undefined = undefined;
  export let active: ActiveState;
</script>

<div
  class="m-2 border border-gray-500 transition-all hover:shadow-xl"
  role="button"
  on:click
>
  {#if title}
    <div
      class="font-bold border-gray-500 truncate transition-all"
      class:inactive={active === ActiveState.Inactive}
      class:active={active === ActiveState.Active}
      class:partial={active === ActiveState.Partial}
    >
      {title}
    </div>
  {/if}
  <div class="flex content-center justify-center p-4">
    <slot />
  </div>
</div>

<style lang="postcss">
  .inactive {
    border-bottom-width: 1px;
    padding: 10px 10px 9px;
  }

  .active {
    border-bottom-width: 1px;
    background-color: var(--active-background-color);
    color: var(--active-text-color);
    padding: 10px 10px 9px;
  }

  .partial {
    padding: 8px;
    border-width: 2px;
    border-color: var(--active-background-color);
  }
</style>
