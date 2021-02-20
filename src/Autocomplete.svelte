<script>
  import { createEventDispatcher, tick } from "svelte";
  import Input from "./Input.svelte";
  import theme from "./theme.js";

  const dispatch = createEventDispatcher();

  export let value = "";
  export let label = "";
  export let error = "";
  export let nameList = [];

  let filteredNames = [];
  let active = false;
  let textFieldRef = null;
  let selectedIndex = -1;

  function selectValue(selectedValue) {
    value = selectedValue;
    closeList();
    dispatch("update", { value });
  }

  function closeList(e) {
    if (e && e.target === textFieldRef) {
      return;
    }
    filteredNames = [];
    active = false;
    selectedIndex = -1;
  }

  function handleKeyDown(e) {
    const { keyCode } = e;
    if (keyCode === 40) {
      // down
      if (filteredNames.length > 0) {
        selectedIndex = (selectedIndex + 1) % filteredNames.length;
      }
    } else if (keyCode === 38) {
      // up
      selectedIndex = selectedIndex - 1;
      selectedIndex =
        selectedIndex < 0 ? filteredNames.length - 1 : selectedIndex;
    } else if (keyCode === 13) {
      // enter
      if (active && selectedIndex >= 0) {
        e.preventDefault();
        selectValue(filteredNames[selectedIndex]);
      } else {
        active = !active;
      }
    } else if (keyCode === 8) {
      // delete
      if (!active) {
        active = true;
      }
    } else if (keyCode === 27) {
      // esc
      textFieldRef.blur();
      closeList();
    }
    // console.log(keyCode);
  }

  function handleInputBlur(e) {
    setTimeout(() => {
      closeList();
    }, 40);
  }

  const hasSubstring = (str, needle) => {
    return (
      str.substring(0, needle.length).toUpperCase() === needle.toUpperCase()
    );
  };

  function handleChange(e) {
    // console.log("> change", e.target);
    // closeList();
  }

  $: {
    if (value === "") {
      filteredNames = [];
    } else if (active) {
      filteredNames = nameList.filter(entry => hasSubstring(entry, value));
    }
  }
  $: resultsCount = filteredNames.length;

  const styleVars = `
    --outline-color:${theme.outlineColor};
    --label-color:${theme.labelFg};
    --text-color:${theme.textFg};
    --err-color:${theme.primaryColor};
    --select-color:${theme.textSelectBg};
  `;
</script>

<style>
  .container {
    position: relative;
    padding: 0.5rem 0;
  }
  .autocomplete-items {
    position: absolute;
    /* top: 100%; */
    /*position the autocomplete items to be the same width as the container:*/
    left: 0;
    right: 0;
    max-height: 300px;
    overflow-y: scroll;
    z-index: 99;
    font-family: sans-serif;
    background-color: #fff;
    /* border: 1px solid #eee; */
    border-radius: 0 0 4px 4px;
    box-shadow: 0 3px 3px 0px #88888850;
  }
  .autocomplete-items div {
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    color: var(--text-color);
    font-size: 15px;
  }
  .autocomplete-items div:hover {
    background-color: #ddd;
  }
  input {
    border: 1px solid #ddd;
    margin: 0;
    padding: 0.5rem 0.4rem;
    appearance: none;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    color: var(--text-color);
    outline: none;
  }
  input:focus,
  input:active {
    border-color: var(--outline-color);
    box-shadow: 0 0 0 1px var(--outline-color);
  }
  label {
    display: block;
    width: 100%;
    font-family: sans-serif;
    font-size: 14px;
    color: var(--label-color);
    padding-bottom: 0.2rem;
  }
  .selected-entry {
    background-color: var(--select-color) !important;
  }
  .error {
    display: block;
    min-height: 20px;
    padding-top: 0.2rem;
    margin-bottom: 0.5rem;
    font-family: sans-serif;
    font-size: 14px;
    color: var(--err-color);
    /* border: 1px solid yellowgreen; */
  }
  .required-mark {
    position: absolute;
    top: 0px;
    padding-top: 0.2rem;
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 1.2rem;
    color: var(--err-color);
  }
</style>

<svelte:window on:click={e => closeList(e)} />
<div class="container" style={styleVars}>
  <label>
    {label}
    {#if $$props.required}
      <span class="required-mark">*</span>
    {/if}
  </label>
  <input
    type="text"
    autocomplete="off_hack"
    bind:this={textFieldRef}
    bind:value
    on:input
    on:change
    on:keydown={handleKeyDown}
    on:blur={handleInputBlur}
    on:click|capture={() => (active = true)} />

  {#if active && resultsCount > 0}
    <div class="autocomplete-items">
      {#each filteredNames as entry, index}
        <div
          key={entry}
          on:click={() => selectValue(entry)}
          class:selected-entry={index === selectedIndex}>
          {entry}
        </div>
      {/each}
    </div>
  {/if}
  {#if error}
    <div class="error">{error}</div>
  {/if}
</div>
