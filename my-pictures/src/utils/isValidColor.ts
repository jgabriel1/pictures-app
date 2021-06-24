export const isValidColor = (colorString: string) => {
  const style = new Option().style;

  style.color = colorString;

  return !!style.color;
};
