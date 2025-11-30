import { useState } from "react";
import "./Form.css";

function Form() {
  const [costPrice, setCostPrice] = useState<number | undefined>();
  const [rate, setRate] = useState<number | undefined>();
  const [deliveryCharge, setDeliveryCharge] = useState<number | undefined>();
  const [profitMargin, setProfitMargin] = useState<number | undefined>();

  const [baseResult, setBaseResult] = useState<number | undefined>();
  const [finalResult, setFinalResult] = useState<number | undefined>();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculation = (
    costPrice?: number,
    rate?: number,
    deliveryCharge?: number,
    profitMargin?: number
  ) => {
    if (!costPrice || !rate || !deliveryCharge) return { base: undefined, final: undefined };

    const base = costPrice / (rate / 100) + deliveryCharge;

    const final = profitMargin
      ? base * (1 + profitMargin / 100)
      : undefined;

    return { base, final };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!rate) newErrors.rate = "এই ঘরটি পূরণ করুন (রেট দরকার)";
    if (!deliveryCharge) newErrors.deliveryCharge = "এই ঘরটি পূরণ করুন (বহন খরচ দরকার)";
    if (!costPrice) newErrors.costPrice = "এই ঘরটি পূরণ করুন (দাম দরকার)";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setBaseResult(undefined);
      setFinalResult(undefined);
      return;
    }

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
    setErrors({});
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | undefined>>,
    field: string
  ) => {
    const value = e.target.value;
    setter(value === "" ? undefined : Number(value));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>

        {/* Rate */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>বর্তমান আইসি কত?</label>
          <input
            type="number"
            value={rate ?? ""}
            onChange={(e) => handleNumberChange(e, setRate, "rate")}
            style={{
              borderColor: errors.rate ? "red" : "#ccc",
              padding: "6px",
              borderRadius: "5px"
            }}
          />
          {errors.rate && <span style={{ color: "red" }}>{errors.rate}</span>}
        </div>

        {/* Delivery Charge */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>বহন খরচ?</label>
          <input
            type="number"
            value={deliveryCharge ?? ""}
            onChange={(e) => handleNumberChange(e, setDeliveryCharge, "deliveryCharge")}
            style={{
              borderColor: errors.deliveryCharge ? "red" : "#ccc",
              padding: "6px",
              borderRadius: "5px"
            }}
          />
          {errors.deliveryCharge && <span style={{ color: "red" }}>{errors.deliveryCharge}</span>}
        </div>

        {/* Cost Price */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>দাম কত?</label>
          <input
            type="number"
            value={costPrice ?? ""}
            onChange={(e) => handleNumberChange(e, setCostPrice, "costPrice")}
            style={{
              borderColor: errors.costPrice ? "red" : "#ccc",
              padding: "6px",
              borderRadius: "5px"
            }}
          />
          {errors.costPrice && <span style={{ color: "red" }}>{errors.costPrice}</span>}
        </div>

        {/* Profit Margin (Optional) */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>লাভ (%) — ঐচ্ছিক</label>
          <input
            type="number"
            placeholder="যেমন 10"
            value={profitMargin ?? ""}
            onChange={(e) => handleNumberChange(e, setProfitMargin, "profitMargin")}
            style={{
              borderColor: "#ccc",
              padding: "6px",
              borderRadius: "5px"
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <button
            type="submit"
            style={{ backgroundColor: "#004c3f", color: "white", padding: "10px", borderRadius: "5px" }}
          >
            হিসাব করুন
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{ backgroundColor: "#e05656", color: "white", padding: "10px", borderRadius: "5px" }}
          >
            মুছুন
          </button>
        </div>

        {/* Result Section */}
        {(baseResult !== undefined || finalResult !== undefined) && (
          <div style={{ marginTop: "15px" }}>
            {baseResult !== undefined && (
              <h2
                style={{
                  backgroundColor: "#004c3f",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                মূল দাম: {baseResult.toFixed(2)}
              </h2>
            )}

            {finalResult !== undefined && (
              <h2
                style={{
                  backgroundColor: "#198754",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                লাভসহ দাম: {finalResult.toFixed(2)}
              </h2>
            )}
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
