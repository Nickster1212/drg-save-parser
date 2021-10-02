<script lang="ts">
  export let expanded: boolean;
</script>

<header class="p-2 flex bg-gray-800" role="button" on:click>
  <slot />
  <button class="flex items-center ml-2">
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

<style>
  header > img {
    height: 64px;
    width: 64px;
  }
</style>
