<script>
  import { autoModeWatcher } from "@skeletonlabs/skeleton";
</script>

<svelte:head
  >{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}</svelte:head
>

<slot />

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
