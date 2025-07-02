export const formatPriceToCAD = (rawPrice: number) => {
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(
    rawPrice,
  );
}