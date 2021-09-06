<script lang="ts">
  import { assets } from '$app/paths';

  import CardHeaderProgress from './CardHeaderProgress.svelte';

  export let expanded: boolean;
</script>

<header class="p-2 flex bg-gray-800">
  <img
    src={`${assets}/portraits/Driller_portrait.png`}
    alt="Driller portrait"
    width="64"
    height="64"
    class="mr-2"
  />
  <CardHeaderProgress />
  <button class="flex items-center ml-2" on:click>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {#if expanded}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      {:else}
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      {/if}
    </svg>
  </button>
</header>
