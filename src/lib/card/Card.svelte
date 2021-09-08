<script lang="ts">
  export let title: string;
</script>

<div
  class="m-2 border border-gray-500 transition-all hover:shadow-xl"
  role="button"
  on:click
>
  <div class="p-2 bg-yellow-300 text-black font-bold">{title}</div>
  <div>Content!</div>
</div>
