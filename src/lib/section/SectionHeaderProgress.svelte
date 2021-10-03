<script lang="ts">
  export let percentage: number;
</script>

<div class="flex mt-1 items-center">
  <div class="w-full h-2 rounded bg-gray-700 mr-2">
    <div
      class="w-full h-full rounded progress-bar"
      style={`width: ${percentage}%;`}
    />
  </div>
  <span class="text-sm">{percentage}%</span>
</div>

<style>
  .progress-bar {
    background: linear-gradient(
      to right,
      var(--start-color) 0%,
      rgb(135, 208, 104) 100%
    );
  }
</style>
