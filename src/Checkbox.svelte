<script>
  import { createEventDispatcher } from "svelte";
  import theme from "./theme.js";
  import Icon from "./Icon.svelte";

  const dispatch = createEventDispatcher();

  export let labelBefore = "";
  export let labelAfter = "";
  export let value = false;
  export let color = theme.primaryColor;

  function handleInput(e) {
    value = e.target.checked;
    dispatch("change", { value });
  }
</script>

<style>
  .checkbox-container {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0;
    cursor: pointer;
    user-select: none;
    position: relative;
    font-family: sans-serif;
    font-size: 14px;
    color: var(--label-color);
  }
  .checkbox-container > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    appearance: none;
  }
  input:focus + span,
  input:active + span {
    border-color: var(--outline-color);
    box-shadow: 0 0 0 1px var(--outline-color);
  }
  .checkbox-container > span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    outline: none;
    border: 1px solid transparent;
  }
  .label-right {
    position: relative;
    top: 2px;
    margin-left: 0.5rem;
  }
</style>

<label
  class="checkbox-container"
  style="--outline-color:{theme.outlineColor}; --label-color:{theme.labelFg};">
  {#if labelBefore}{labelBefore}&nbsp;{/if}
  <input type="checkbox" on:input={handleInput} bind:checked={value} />
  <span>
    {#if value}
      <Icon width="14" {color} />
    {/if}
  </span>
  {#if labelAfter}
    <div class="label-right">{labelAfter}</div>
  {/if}
</label>
