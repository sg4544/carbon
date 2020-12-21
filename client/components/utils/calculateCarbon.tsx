export const calculateCarbon = (
  value: string,
  unit: string,
  weight: number = 1
) => {
  return (
    (parseFloat(value === "" ? "0" : value) *
      parseFloat(unit === "" ? "0" : unit)) /
    weight
  );
};
