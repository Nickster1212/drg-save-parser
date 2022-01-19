<script lang="ts">
  import { getArmorPaintJobsFromSaveFile } from '$lib/analyze/getArmorPaintjobsFromSaveFile';
  import { getCommonArmorPaintJobsFromSaveFile } from '$lib/analyze/getCommonArmorPaintjobsFromSaveFile';
  import { getFrameworksFromSaveFile } from '$lib/analyze/getFrameworksFromSaveFile';
  import { getOverclocksFromSaveFile } from '$lib/analyze/getOverclocksFromSaveFile';
  import { getPickaxesFromSaveFile } from '$lib/analyze/getPickaxesFromSaveFile';
  import { getPickaxeUniquesFromSaveFile } from '$lib/analyze/getPickaxeUniquesFromSaveFile';
  import Modal from '$lib/components/Modal.svelte';
  import { db } from '$lib/db';
  import init, { parse_save_file } from 'drg-save-parser';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  // Parse the selected save file and update the internal database
  async function parseSaveFile(file: File) {
    await init();
    const saveFile = await parse_save_file(file);

    // Extract the relevant information from the parsed save file
    const overclocks = getOverclocksFromSaveFile(saveFile);
    const frameworks = getFrameworksFromSaveFile(saveFile);
    const pickaxes = getPickaxesFromSaveFile(saveFile);
    const pickaxeUniques = getPickaxeUniquesFromSaveFile(saveFile);
    const armorPaintjobs = getArmorPaintJobsFromSaveFile(saveFile);
    const commonArmorPaintjobs = getCommonArmorPaintJobsFromSaveFile(saveFile);

    // Update the store with the new save file data
    await db.transaction('rw', db.tables, async () => {
      await db.clearAll();
      await db.overclocks.bulkAdd(overclocks);
      await db.frameworks.bulkAdd(frameworks);
      await db.pickaxes.bulkAdd(pickaxes);
      await db.pickaxeUniques.bulkAdd(pickaxeUniques);
      await db.armorPaintjobs.bulkAdd(armorPaintjobs);
      await db.commonArmorPaintjobs.bulkAdd(commonArmorPaintjobs);
    });

    dispatch('close');
  }

  // Open the file picker dialog and wait for the user to select their save
  // file.
  function openFile() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.sav';
    input.onchange = async (_) => {
      if (!input.files) {
        return;
      }
      await parseSaveFile(Array.from(input.files)[0]);
      input.remove();
    };
    input.click();
  }
</script>

<Modal on:close>
  <div class="p-8">
    <h3 class="text-lg leading-6 font-medium " id="modal-title">
      Analyze Save File
    </h3>
    <p class="text-sm text-gray-200">
      Tired of all that clicking around just to input your current progress?
      Upload your save file and let Bosco do all the hard work for you!
    </p>
    <p class="text-sm text-gray-200">
      The file is located in your Steam folder by default:
    </p>
    <p class="text-sm text-gray-200">
      <code>
        C:\Program Files (x86)\Steam\steamapps\common\Deep Rock
        Galactic\FSD\Saved\SaveGames\[STEAM_ID]_Player.sav
      </code>
    </p>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex mx-auto my-6"
      on:click={openFile}
    >
      Select Save File
    </button>
    <p class="text-sm text-gray-400">
      <span class="text-gray-200 font-bold">Note:</span> Bosco analyzes your save
      file in your browser locally to keep it safe from pointy-eared leaf-lovers.
    </p>
  </div>
</Modal>

<style lang="postcss">
  p {
    @apply my-3;
  }

  p:last-child {
    @apply mb-0;
  }
</style>
