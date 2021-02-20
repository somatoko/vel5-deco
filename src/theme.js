let themeValues = {
  primaryColor: "#DD74A1",
  outlineColor: "#FFCCE2",
  textSelectBg: "#f9d1e0",
  textFg: "#540829",
  labelFg: "#59474F",
  borderColor: "#BFB2B8",
  darkBorderColor: "#bbb",
};

function updateTheme(themeUpdate) {
  themeValues = Object.assign(themeValues, themeUpdate);
}

export default themeValues;

export { updateTheme };
