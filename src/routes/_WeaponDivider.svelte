<script lang="ts">
  import type { Miner } from '$lib/types/miner';
  import type { MinerWeapon } from '$lib/types/weapons';
  import { WeaponOutlines } from '$lib/types/weapons';
  import { fade } from 'svelte/transition';

  export let weapon: MinerWeapon<Miner>;

  // We need to get the img element's bounding rect so we can ensure that
  // the tooltip is positioned directly to the right of it, since the tooltip
  // needs to use absolute positioning
  let img: HTMLImageElement;
  $: imgClientRect = img && img.getBoundingClientRect();
  $: tooltipPosition = imgClientRect
    ? `left: calc(${imgClientRect.right}px - 1rem);`
    : '';

  let hovering: boolean = false;
  function enter() {
    hovering = true;
  }
  function leave() {
    hovering = false;
  }
</script>

<div class="weapon-icon-divider col-span-full p-2 w-full flex">
  <img
    src={WeaponOutlines[weapon].webp}
    alt={weapon}
    class="px-4 h-[75px] w-auto"
    bind:this={img}
    on:mouseenter={enter}
    on:mouseleave={leave}
  />
  {#if hovering}
    <div
      class="absolute flex-row items-center flex mb-6 z-10 transform translate-y-6"
      style={tooltipPosition}
      transition:fade={{ duration: 100 }}
    >
      <div class="w-3 h-3 -mr-2 rotate-45 bg-gray-500" />
      <span
        class="relative p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-500"
        >{weapon}</span
      >
    </div>
  {/if}
</div>

<style lang="postcss">
  .weapon-icon-divider::before,
  .weapon-icon-divider::after {
    @apply border-solid border-t border-t-gray-600 transform translate-y-1/2 w-1/2;
    content: '';
  }
</style>
