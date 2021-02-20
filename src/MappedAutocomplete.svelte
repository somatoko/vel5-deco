<script>
  import { createEventDispatcher } from "svelte";
  import Autocomplete from "./Autocomplete.svelte";

  const dispatch = createEventDispatcher();

  export let label = "";
  export let value = "";
  export let tuples = [];
  export let error = "";

  let mappedName = "";

  function initialize() {
    if (value && value.length > 0) {
      const entry = tuples.find(entry => entry[0] === value);
      if (entry) {
        mappedName = entry[1];
      }
    }
  }
  initialize();

  function syncToValue() {
    if (mappedName) {
      // map from name to value
      const entry = tuples.find(entry => entry[1] === mappedName);
      value = entry ? entry[0] : "";
      dispatch("update", { value });
    }
  }

  function handleChange(e) {
    syncToValue();
    // closeList();
  }

  $: names = tuples.map(entry => entry[1]);
</script>

<style>

</style>

<div>
  <Autocomplete
    {label}
    bind:value={mappedName}
    required={!!$$props.required}
    {error}
    nameList={names}
    on:update={handleChange}
    on:input={() => syncToValue()} />
</div>
