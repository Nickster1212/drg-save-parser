<script lang="ts">
  import { assets } from '$app/paths';
  import { page } from '$app/stores';

  $: path = $page.path;
</script>

<header class="px-6 pt-6">
  <div class="flex justify-between">
    <div class="text-xl flex leading-9">
      <img
        src={`${assets}/assignment.png`}
        alt="Assignment Icon"
        class="w-10 h-10 mr-3"
      />
      <h1 class="font-semibold">DRG Completionist</h1>
    </div>
    <h2 class="text-gray-400 font-medium leading-10">
      Leave No Rock or Stone Unturned!
    </h2>
  </div>
  <nav class="flex space-x-6 mt-5">
    <a href="/" class:active={path === '/'}>Overview</a>
    <a href="overclocks" class:active={path === '/overclocks'}> Overclocks </a>
    <a href="frameworks" class:active={path === '/frameworks'}> Frameworks </a>
    <a href="armor" class:active={path === '/armor'}>Armor</a>
    <a href="pickaxes" class:active={path === '/pickaxes'}> Pickaxes </a>
  </nav>
</header>

<style lang="postcss">
  .active {
    @apply border-blue-500 text-blue-400 border-b-2;
  }

  nav > a {
    @apply py-2;
  }
</style>
