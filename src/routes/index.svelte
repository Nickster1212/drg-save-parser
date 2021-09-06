<script lang="ts">
  import { assets } from '$app/paths';

  let expanded = true;
  function toggleExpand() {
    expanded = !expanded;
  }
</script>

<section class="border border-gray-500 rounded-sm">
  <header class="p-2 flex bg-gray-800">
    <img
      src={`${assets}/portraits/Driller_portrait.png`}
      alt="Driller portrait"
      width="64"
      height="64"
      class="mr-2"
    />
    <div class="flex flex-col flex-shrink w-full mt-2">
      <h3 class="font-medium">Driller</h3>
      <div class="flex mt-1 items-center">
        <div class="w-full h-2 rounded bg-gray-700 mr-2">
          <div
            class="w-full h-full rounded"
            style="background: linear-gradient(to right, rgb(209, 151, 36) 0%, rgb(135, 208, 104) 100%); width: 50%;"
          />
        </div>
        <span class="text-sm">50%</span>
      </div>
    </div>
    <button class="flex items-center ml-2" on:click={toggleExpand}>
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
</section>
