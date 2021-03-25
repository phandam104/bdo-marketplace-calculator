import React, { useState } from "react";
import { Form, Formik, Field } from "formik";
import { VALUE_PACK_BUFF, LOCAL_TAX, MARKETPLACE_TAX } from "../Constants";
import * as Yup from "yup";

export const StandardCalculator = () => {
  const [profit, setProfit] = useState(0);

  return (
    <>
      <h2>Standard Calculator</h2>
      <Formik
        initialValues={{
          valuePack: false,
          itemPrice: 0,
          quantity: 1
        }}
        validationSchema={Yup.object().shape({
          valuePack: Yup.boolean(),
          itemPrice: Yup.number("Item Price must be numeric")
            .required("Item Price is required")
            .min(0, "Item Price must be a positive number"),
          quantity: Yup.number()
            .required("Quantity is required")
            .min(1, "Quantity must be greater than Zero")
        })}
        onSubmit={({ valuePack, itemPrice, quantity }) => {
          const vpBuff = valuePack ? VALUE_PACK_BUFF : 0;
          const price = itemPrice * quantity;
          setProfit(
            Math.floor(
              (price - (price * LOCAL_TAX + price * MARKETPLACE_TAX)) *
                (1 + vpBuff)
            )
          );
        }}
      >
        {({ errors }) => (
          <Form noValidate>
            <div className="row g-2 align-items-center">
              <div className="col-auto form-check">
                <Field
                  type="checkbox"
                  name="valuePack"
                  id="value-pack-std-calc"
                  className="form-check-input"
                />
                <label
                  htmlFor="value-pack-std-calc"
                  className="form-check-label"
                >
                  Value Pack
                </label>
              </div>
            </div>
            <div className="row g-2 align-items-center">
              <div className="col-2">
                <label htmlFor="item-price-std-calc" className="col-form-label">
                  Item Price
                </label>
              </div>
              <div className="col-auto">
                <Field
                  type="number"
                  name="itemPrice"
                  id="item-price-std-calc"
                  aria-describedby="item-price-error-std-calc"
                  className="form-control"
                  required="required"
                />
              </div>
              <div className="col-auto">
                <span id="item-price-error-std-calc" className="text-danger">
                  {errors.itemPrice}
                </span>
              </div>
            </div>
            <div className="row g-2 align-items-center">
              <div className="col-2">
                <label htmlFor="quantity-std-calc" className="col-form-label">
                  Quantity
                </label>
              </div>
              <div className="col-auto">
                <Field
                  type="number"
                  name="quantity"
                  id="quantity-std-calc"
                  aria-describedby="quantity-error-std-calc"
                  className="form-control"
                  required="required"
                />
              </div>
              <div className="col-auto">
                <span id="quantity-error-std-calc" className="text-danger">
                  {errors.quantity}
                </span>
              </div>
            </div>
            <div className="row g-2">
              <button type="submit" className="btn btn-primary col-auto">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="card container">
        <h2>Profit</h2>
        <p>
          <span>
            <i className="fas fa-coins"></i>&nbsp;
            {Intl.NumberFormat().format(profit)}
          </span>
        </p>
      </div>
    </>
  );
};
