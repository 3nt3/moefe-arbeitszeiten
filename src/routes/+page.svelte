<script lang="ts">
  import { LightSwitch } from "@skeletonlabs/skeleton";

  const months = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ].map((month, index) => ({ index, month }));

  // month index -> starting at januar = 0
  let monthIndex: number = new Date().getMonth();
  let year: number = new Date().getFullYear();

  // FIXME: do not use any
  function monthChanged(event: any) {
    monthIndex = months.indexOf(event.target.value);
    console.log(monthIndex);
  }
</script>

<main class="w-screen min-h-screen flex-col flex">
  <nav class="w-screen flex justify-center items-center py-8">
    <div class="flex flex-col items-center text-surface-700 w-full">
      <h1 class="text-3xl tracking-widest text-surface-700 -mb-1">
        ARBEITSZEITDINGS
      </h1>
      <span class="uppercase">est. 2023</span>
    </div>
  </nav>
  <div class="w-full h-full flex justify-center items-center p-8">
    <div
      class="card p-12 md:p-24 rounded-2xl shadow-2xl gap-6 flex flex-col max-w-[550px] w-full mt-8"
    >
      <h1 class="h2 flex gap-2 justify-between items-center">
        <span class="font-bold">Arbeitszeitdings</span>
        <LightSwitch class="mb-1 mr-1" />
      </h1>
      <blockquote class="blockquote">
        Arbeiten? Das steht auf meiner Not-To-Do-Liste.

        <p class="mt-2">
          &mdash; <cite>Das Känguru</cite>
        </p>
      </blockquote>
      <form method="GET" action="/generate" class="flex flex-col">
        <label for="month" class="label">Monat *</label>
        <select
          required
          name="month"
          class="select mb-2"
          on:change={monthChanged}
          bind:value={monthIndex}
          class:input-error={monthIndex === undefined}
        >
          {#each months as month}
            <option value={month.index}>{month.month}</option>
          {/each}
        </select>
        <label class="label" for="year">Jahr *</label>
        <input
          required
          name="year"
          type="number"
          class="input"
          bind:value={year}
          class:input-error={!year}
        />
        <input
          type="submit"
          value="Generieren"
          class="mt-6 btn variant-filled"
        />
      </form>
    </div>

    <div class="absolute bottom-0 p-4">
      Made with ❤️ by <a href="https://3nt3.de">Nia</a> for Leo
    </div>
  </div>
</main>
