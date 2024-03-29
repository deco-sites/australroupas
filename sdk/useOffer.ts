import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

import { formatPrice } from "$store/sdk/format.ts";

const bestOffer = (aggregateOffer?: AggregateOffer) =>
  aggregateOffer?.offers[0];

export const inStock = (offer?: AggregateOffer) =>
  bestOffer(offer)?.availability === "https://schema.org/InStock";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
) => {
  const { billingDuration, billingIncrement } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  return `${billingDuration}x de ${formatPrice(billingIncrement)}`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const seller = offer?.seller;
  const price = offer?.price;
  const availability = offer?.availability;

  return {
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    installments: installment && price
      ? installmentToString(installment)
      : null,
  };
};
