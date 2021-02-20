<script>
  import { createEventDispatcher } from "svelte";
  import theme from "./theme.js";

  export let text = "Submit";

  const dispatch = createEventDispatcher();

  export let fg = theme.textFg;
  export let bg = "#fff";

  $: bg = $$props.primary ? theme.primaryColor : bg;

  $: raised = $$props.raised;
  $: disabled = $$props.disabled;

  $: styleVars = `
    --outline-color:${theme.outlineColor};
    --label-color:${theme.labelFg};
    --text-color:${fg};
    --border-color:${theme.borderColor};
    --bg:${bg};
  `;
</script>

<style>
  button {
    padding: 0.5rem 1.2rem;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--text-color);
    background-color: var(--bg);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    -webkit-appearance: none;
  }
  button:active,
  button:focus {
    /* border-color: var(--outline-color); */
    border: 1px solid #fff;
    box-shadow: 0 0 0 2px var(--outline-color);
  }
  button:disabled {
    opacity: 0.5;
  }
  .raised {
    box-shadow: 0 1px 3px 0px #11111160;
    /* outline: 2px red; */
  }
</style>

<button
  class:raised
  class={$$props.class}
  style={styleVars}
  on:click
  {disabled}>
  {text}
</button>
