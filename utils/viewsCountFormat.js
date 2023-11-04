function viewsCountFormat(number) {
  const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

  // Determine the appropriate SI symbol for the number
  const tier = (Math.log10(Math.abs(number)) / 3) | 0;

  // If the tier is greater than or equal to the length of the SI_SYMBOL array, use the largest available symbol
  const suffix = tier < SI_SYMBOL.length ? SI_SYMBOL[tier] : "";

  // Scale the number and add the symbol
  return (number / Math.pow(10, tier * 3)).toFixed(1) + suffix;
}

export default viewsCountFormat;
