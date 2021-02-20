<script>
  export let width = "20";
  export let color = "#444";

  const elements = {
    checkmark: "M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"
  };

  let stroke = "none";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  baseProfile="tiny"
  version="1.2"
  {width}
  height={width}
  viewBox="0 0 16 16">
  >
  <path
    fill={color}
    {stroke}
    stroke-width="0px"
    transform=""
    d={elements.checkmark} />
</svg>
