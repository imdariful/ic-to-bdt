import { useState } from "react";
import "./Form.css"

function Form() {
  const [costPrice, setCostPrice] = useState<number | undefined>();
  const [rate, setRate] = useState<number | undefined>();
  const [deliveryCharge, setDeliveryCharge] = useState<number | undefined>();
  const [profitMargin, setProfitMargin] = useState<number | undefined>();
  const [baseResult, setBaseResult] = useState<number | undefined>();
  const [finalResult, setFinalResult] = useState<number | undefined>();

  const calculation = (
    costPrice?: number,
    rate?: number,
    deliveryCharge?: number,
    profitMargin?: number
  ) => {
    if (!costPrice || !rate || !deliveryCharge) return { base: undefined, final: undefined };

    // মূল দাম (Base price)
    const base = costPrice / (rate / 100) + deliveryCharge;

    // লাভসহ দাম (With profit)
    const final = profitMargin ? base * (1 + profitMargin / 100) : undefined;

    return { base, final };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { base, final } = calculation(costPrice, rate, deliveryCharge, profitMargin);
    setBaseResult(base);
    setFinalResult(final);
  };

  const handleReset = () => {
    setCostPrice(undefined);
    setRate(undefined);
    setDeliveryCharge(undefined);
    setProfitMargin(undefined);
    setBaseResult(undefined);
    setFinalResult(undefined);
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | undefined>>
  ) => {
    const value = e.target.value;
    setter(value === "" ? undefined : Number(value));
  };

  return (
    <form onSubmit={handleSubmit} id="form">
      <div>
        <div className="form-group">
          <label>বর্তমান আইসি রেট কত?</label>
          <br />
          <input
            type="number"
            value={rate ?? ""}
            onChange={(e) => handleNumberChange(e, setRate)}
            name="rate"
          />
        </div>

        <div className="form-group">
          <label>বহন খরচ?</label>
          <br />
          <input
            type="number"
            value={deliveryCharge ?? ""}
            onChange={(e) => handleNumberChange(e, setDeliveryCharge)}
            name="deliveryCharge"
          />
        </div>

        <div className="form-group">
          <label>দাম কত?</label>
          <br />
          <input
            type="number"
            value={costPrice ?? ""}
            onChange={(e) => handleNumberChange(e, setCostPrice)}
            name="costPrice"
          />
        </div>

        <div className="form-group">
          <label>লাভের হার (%) — ঐচ্ছিক</label>
          <br />
          <input
            type="number"
            placeholder="যেমন 20"
            value={profitMargin ?? ""}
            onChange={(e) => handleNumberChange(e, setProfitMargin)}
            name="profitMargin"
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <button type="submit">কেল্কুলেট</button>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginLeft: "10px" }}
          >
            মুছুন
          </button>
        </div>

        {(baseResult !== undefined || finalResult !== undefined) && (
          <div style={{ marginTop: "15px" }}>
            {baseResult !== undefined && (
              <h3>মূল দাম: {baseResult.toFixed(2)}</h3>
            )}
            {finalResult !== undefined && (
              <h3 style={{ color: "green" }}>লাভসহ দাম: {finalResult.toFixed(2)}</h3>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
