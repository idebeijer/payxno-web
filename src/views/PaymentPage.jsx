import React from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import isValid from "nano-address-validator";
import { ValidPayment } from "@views/ValidPayment/ValidPayment";

export const PaymentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  let params = useParams();
  const amount = searchParams.get("amount");
  var currency;

  if (searchParams.get("currency")) {
    currency = searchParams.get("currency").toUpperCase();
  }

  if (amount > 0 && ["EUR", "XNO", "USD"].indexOf(currency) >= 0 && isValid(params.address)) {
    return (
      <ValidPayment
        amountIsSet={true}
        currency={currency}
        amount={amount}
        address={params.address}
      />
    );
  } else if (isValid(params.address) && !currency && !amount) {
    return <ValidPayment amountIsSet={false} address={params.address} />;
  } else {
    return <Navigate to="/invalid" />;
  }
};
