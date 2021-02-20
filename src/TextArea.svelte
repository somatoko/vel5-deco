<script>
  import { createEventDispatcher } from "svelte";
  import theme from "./theme.js";
  const dispatch = createEventDispatcher();

  export let label = "";
  export let value = "";
  export let error = "";

  const styleVars = `
    --outline-color:${theme.outlineColor};
    --label-color:${theme.labelFg};
    --text-color:${theme.textFg};
    --err-color:${theme.primaryColor};
    --border-color:${theme.borderColor};
  `;
</script>

<style>
  .container {
    display: inline-block;
    width: 100%;
    padding: 0.5rem 0;
  }
  textarea {
    border: 1px solid var(--border-color);
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
  textarea::placeholder {
    opacity: 0.6;
    font-size: 14px;
  }
  textarea:focus,
  textarea:active {
    border-color: var(--outline-color);
    box-shadow: 0 0 0 1px var(--outline-color);
  }
  label {
    position: relative;
    display: block;
    width: 100%;
    font-family: sans-serif;
    font-size: 14px;
    color: var(--label-color);
    padding-bottom: 0.2rem;
  }
  span {
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
    top: -6px;
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 1.2rem;
  }
</style>

<div class="container" on:click style={styleVars}>
  <label>
    {label}
    {#if $$props.required}
      <span class="required-mark">*</span>
    {/if}
  </label>
  <textarea
    type="text"
    rows={$$props.rows}
    cols={$$props.cols}
    placeholder={$$props.placeholder}
    bind:value
    on:input />
  {#if error}
    <span>{error}</span>
  {/if}
</div>
