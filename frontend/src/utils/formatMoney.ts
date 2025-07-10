const convertCentsToDollars = (priceCents: number) => {
  return priceCents / 100;
}

export const formatPriceToCurrency = (priceCents: number, currency='USD') => {
    return new Intl.NumberFormat("en-CA", { 
      style: "currency", 
      currency,
    }).format(
    convertCentsToDollars(priceCents), // convert
  );
}