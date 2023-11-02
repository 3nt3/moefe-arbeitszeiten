<script lang="ts">
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

<main
  class="bg-secondary-300 w-screen h-screen flex justify-center items-center p-8"
>
  <div
    class="bg-zinc-50 p-12 md:p-24 rounded-2xl shadow-2xl gap-6 flex flex-col max-w-[550px] w-full"
  >
    <h1 class="h2">
      <span
        class="bg-gradient-to-br font-bold from-blue-600 to-cyan-400 bg-clip-text text-transparent box-decoration-clone"
        >Arbeitszeitdings</span
      >
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
      <input name="year" type="number" class="input" bind:value={year} />
      <input type="submit" value="Generieren" class="mt-6 btn variant-filled" />
    </form>
  </div>

  <div class="absolute bottom-0 p-4">
    Made with ❤️ by <a href="https://3nt3.de">Nia</a> for 🐦
  </div>
</main>
