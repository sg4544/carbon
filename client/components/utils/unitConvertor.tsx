export const unitConvertor = (
  value: number,
  convert: "miToKm" | "mpgToL/100km" | "gToTonnes"
) => {
  switch (convert) {
    case "miToKm":
      return value * 1.6093;
    case "mpgToL/100km":
      return 282.4809363 / value;
    case "gToTonnes":
      return value / 1000000;
    default:
      return value;
  }
};
