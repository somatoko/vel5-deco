<script>
  import { onDestroy } from "svelte";
  import theme, { updateTheme } from "./theme.js";
  import { Spinner } from "spin.js";

  // updateTheme({ primaryColor: "hotpink" });

  onDestroy(() => {
    if (spinner) {
      spinner.stop();
    }
  });

  export let text = "Submit";

  export let fg = "#444";
  let fgColor = $$props.color ? $$props.color : fg;

  export let bg = "#fff";
  let bgColor = $$props.primary ? theme.primaryColor : bg;

  let spinnerWrapperRef;
  let busy = false;

  var spinnerOptions = {
    lines: 12, // The number of lines to draw
    length: 0, // The length of each line
    width: 3, // The line thickness
    radius: 7, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: fgColor, // CSS color or array of colors
    fadeColor: "transparent", // CSS color or array of colors
    speed: 0.3, // Rounds per second
    animation: "line-fade",
    top: "50%", // Top position relative to parent
    left: "50%" // Left position relative to parent
  };

  const spinner = new Spinner(spinnerOptions);

  $: {
    if ($$props.disabled) {
      spinner.spin(spinnerWrapperRef);
    } else {
      spinner.stop();
    }
  }

  const styleVars = `
    --bg-color:${bgColor};
    --fg-color:${fgColor};
    --outline-color:${theme.outlineColor};
  `;
</script>

<style>
  /* :root {
    --primary-color: tomato;
    --inactive-color: gainsboro;
  } */
  button {
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    padding: 0.5rem 1.3rem;
    border-radius: 4px;
    outline: none;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 1px;
    color: var(--fg-color);
    border: 1px solid transparent;
    background-color: var(--bg-color);
    cursor: pointer;
    overflow: hidden;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  button:active,
  button:focus {
    border: 1px solid white;
    box-shadow: 0 0 0 2px var(--outline-color);
  }
  .busy-button__label {
    position: relative;
    z-index: 3;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;
  }
  .busy-button__spinner {
    position: absolute;
    top: 0%;
    bottom: 0%;
    left: 0;
    right: 0;
    display: inline-flex;
    align-items: baseline;
    justify-content: center;
    line-height: 2;
    z-index: 2;
    opacity: 0;
    pointer-events: none;
    margin-top: 1rem;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all;
  }
  .busy {
    cursor: default;
  }
  .busy > .busy-button__label {
    opacity: 0;
    top: -1rem;
  }
  .busy > .busy-button__spinner {
    opacity: 1;
    margin-top: 0;
  }
  .raised {
    box-shadow: 0 1px 3px 0px #11111160;
    /* outline: 2px red; */
  }
  @keyframes -global-line-fade {
    0%,
    100% {
      opacity: 0; /* minimum opacity */
    }
    1% {
      opacity: 1;
    }
  }
</style>

<button
  class={$$props.class}
  class:busy={$$props.disabled}
  class:raised={$$props.raised}
  style={styleVars}
  on:click
  disabled={$$props.disabled}>
  <span class="busy-button__label">{text}</span>
  <span class="busy-button__spinner" bind:this={spinnerWrapperRef} />
</button>
