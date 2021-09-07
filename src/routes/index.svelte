<script lang="ts">
  import { browser } from '$app/env';

  import Card from '$lib/card/Card.svelte';
  import { overclocks } from '$lib/stores/overclocks';

  $: if (browser) {
    console.log($overclocks);
  }
</script>

<Card />
<Card />
<Card />
<Card />
