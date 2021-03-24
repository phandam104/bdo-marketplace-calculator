import React, { useState } from "react";
import classNames from "classnames";
import "./styles.css";
import { StandardCalculator } from "./calculators/StandardCalculator";

export default function App() {
  const [calculatorType, setCalculatorType] = useState("STANDARD");

  return (
    <div className="App">
      <main className="container">
        <h1>Black Desert Online Marketplace Calculator</h1>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={classNames("nav-link", {
                active: calculatorType === "STANDARD"
              })}
              onClick={() => setCalculatorType("STANDARD")}
            >
              Standard Calculator
            </button>
          </li>
        </ul>
        {calculatorType === "STANDARD" && <StandardCalculator />}
      </main>
    </div>
  );
}
