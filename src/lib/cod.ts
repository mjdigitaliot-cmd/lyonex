type TotalsInput = {
  subtotal: number;
  discountAmount: number;
  shippingAmount: number;
  taxAmount: number;
};

export function calculateCodTotal(input: TotalsInput) {
  const subtotal = round2(input.subtotal);
  const discountAmount = round2(input.discountAmount);
  const shippingAmount = round2(input.shippingAmount);
  const taxAmount = round2(input.taxAmount);

  if ([subtotal, discountAmount, shippingAmount, taxAmount].some((v) => Number.isNaN(v) || v < 0)) {
    throw new Error("INVALID_TOTALS_INPUT");
  }

  const totalAmount = round2(subtotal - discountAmount + shippingAmount + taxAmount);
  if (totalAmount < 0) {
    throw new Error("NEGATIVE_ORDER_TOTAL");
  }

  return {
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    totalAmount,
    codAmountDue: totalAmount
  };
}

function round2(value: number) {
  return Math.round(value * 100) / 100;
}
