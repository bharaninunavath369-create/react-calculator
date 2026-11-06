
import React, { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const handleNumber = (value) => {
    if (overwrite) {
      setDisplay(value);
      setOverwrite(false);
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  const handleDecimal = () => {
    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleOperator = (op) => {
    setPrevious(Number(display));
    setOperator(op);
    setOverwrite(true);
  };

  const calculate = () => {
    if (operator === null || previous === null) return;

    const current = Number(display);
    let result;

    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "×":
        result = previous * current;
        break;
      case "÷":
        result = current === 0 ? "Error" : previous / current;
        break;
      default:
        return;
    }

    setDisplay(
      result === "Error"
        ? "Error"
        : String(Number(result.toPrecision(12)))
    );
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  };

  const clear = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setOverwrite(false);
  };

  const deleteLast = () => {
    if (overwrite || display === "Error") {
      setDisplay("0");
      setOverwrite(false);
      return;
    }

    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const percentage = () => {
    if (display !== "Error") {
      setDisplay(String(Number(display) / 100));
      setOverwrite(true);
    }
  };

  const buttons = [
    { label: "AC", action: clear, type: "special" },
    { label: "DEL", action: deleteLast, type: "special" },
    { label: "%", action: percentage, type: "special" },
    { label: "÷", action: () => handleOperator("÷"), type: "operator" },

    { label: "7", action: () => handleNumber("7") },
    { label: "8", action: () => handleNumber("8") },
    { label: "9", action: () => handleNumber("9") },
    { label: "×", action: () => handleOperator("×"), type: "operator" },

    { label: "4", action: () => handleNumber("4") },
    { label: "5", action: () => handleNumber("5") },
    { label: "6", action: () => handleNumber("6") },
    { label: "-", action: () => handleOperator("-"), type: "operator" },

    { label: "1", action: () => handleNumber("1") },
    { label: "2", action: () => handleNumber("2") },
    { label: "3", action: () => handleNumber("3") },
    { label: "+", action: () => handleOperator("+"), type: "operator" },

    { label: "0", action: () => handleNumber("0"), type: "zero" },
    { label: ".", action: handleDecimal },
    { label: "=", action: calculate, type: "equal" },
  ];

  return (
    <div className="calculator">
      <div className="calculator-header">
        <h2>Calculator</h2>
        <span>REACT APP</span>
      </div>

      <div className="display">
        {previous !== null && (
          <div className="previous">
            {previous} {operator}
          </div>
        )}
        <div className="current">
          {display}
        </div>
      </div>

      <div className="buttons">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`btn ${button.type || ""}`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="calculator-footer">
        Made with React.js
      </div>
    </div>
  );
}

export default Calculator;
