<script>
  import { createEventDispatcher } from "svelte";
  import theme from "./theme.js";
  import Icon from "./Icon.svelte";

  const dispatch = createEventDispatcher();

  export let stepTitles = ["Step 1", "Step 2"];
  export let currentStepIndex = 0;
  export let primaryColor = theme.primaryColor;
  export let inactiveColor = theme.darkBorderColor;

  $: rootStyle = `--primary-color: ${primaryColor}; --inactive-color: ${inactiveColor};`;
</script>

<style>
  /* :root {
    --primary-color: tomato;
    --inactive-color: gainsboro;
  } */
  .steps {
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    font-family: sans-serif;
  }
  .step-item {
    flex: 1 1 0;
    text-align: center;
    position: relative;
  }
  .step-item:not(:first-child)::before {
    content: "";
    width: 100%;
    height: 4px;
    position: absolute;
    top: 7px;
    left: -50%;
    background-color: var(--primary-color);
  }
  .step-item > div {
    color: var(--primary-color);
    display: inline-block;
    padding: 1.3rem 0.5rem 0;
    font-size: 14px;
  }
  .step-item > div::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    position: absolute;
    top: 4px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    /* border: 2px solid #fff; */
    background-color: var(--primary-color);
    z-index: 1;
  }
  .step-item.active > div::before {
    background-color: #fff;
    border: 2px solid var(--primary-color);
  }
  .step-item.active ~ .step-item::before {
    background: var(--inactive-color);
  }
  .step-item.active ~ .step-item > div {
    color: var(--inactive-color);
  }
  .step-item.active ~ .step-item > div::before {
    background: var(--inactive-color);
    top: 3px;
    width: 12px;
    height: 12px;
    border: 2px solid #fff;
  }
</style>

<ul class={`steps ${$$props.class}`} style={rootStyle}>
  {#each stepTitles as stepTitle, index}
    <li class="step-item" class:active={index === currentStepIndex}>
      <div>{stepTitle}</div>
    </li>
  {/each}
</ul>
