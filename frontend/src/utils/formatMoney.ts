const convertCentsToDollars = (priceCents: number) => {
  return priceCents / 100;
}

export const formatPriceToCAD = (priceCents: number) => {
    return new Intl.NumberFormat("en-CA", { 
      style: "currency", 
      currency: "CAD" 
    }).format(
    convertCentsToDollars(priceCents), // convert
  );
}