<script lang="ts">
  export let src: ImgSrc;
  export let alt: string;

  function isPNG(pet: ImgSrc): pet is PNGSrc {
    return (pet as PNGSrc).png !== undefined;
  }
</script>

<picture>
  <source type="image/webp" srcSet={src.webp} />
  {#if isPNG(src)}
    <source type="image/png" srcSet={src.png} />
  {:else}
    <source type="image/jpeg" srcSet={src.jpg} />
  {/if}
  <img src={isPNG(src) ? src.png : src.jpg} {alt} {...$$restProps} />
</picture>

<style lang="postcss">
  img {
    @apply max-w-none inline-block;
  }
</style>
