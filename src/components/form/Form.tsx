import { useState } from "react";
import "./Form.css";

function Form() {
  const [costPrice, setCostPrice] = useState<number | undefined>();
  const [rate, setRate] = useState<number | undefined>();
  const [deliveryCharge, setDeliveryCharge] = useState<number | undefined>();
  const [result, setResult] = useState<number | undefined>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const calculation = (costPrice?: number, rate?: number, deliveryCharge?: number) => {
    if (!costPrice || !rate || !deliveryCharge) return undefined;
    return costPrice / (rate / 100) + deliveryCharge;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!rate) newErrors.rate = "এই ঘরটি পূরণ করুন (রেট দরকার)";
    if (!deliveryCharge) newErrors.deliveryCharge = "এই ঘরটি পূরণ করুন (বহন খরচ দরকার)";
    if (!costPrice) newErrors.costPrice = "এই ঘরটি পূরণ করুন (দাম দরকার)";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setResult(undefined);
      return;
    }

    setResult(calculation(costPrice, rate, deliveryCharge));
  };

  const handleReset = () => {
    setCostPrice(undefined);
    setRate(undefined);
    setDeliveryCharge(undefined);
    setResult(undefined);
    setErrors({});
  };

  // Helper to handle numeric input safely
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | undefined>>,
    field: string
  ) => {
    const value = e.target.value;
    setter(value === "" ? undefined : Number(value));

    // Clear field-specific error when typing
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        {/* Rate Input */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>বর্তমান আইসি কত?</label>
          <input
            type="number"
            value={rate ?? ""}
            onChange={(e) => handleNumberChange(e, setRate, "rate")}
            name="rate"
            style={{
              borderColor: errors.rate ? "red" : "#ccc",
              outline: "none",
              padding: "6px",
              borderRadius: "5px",
            }}
          />
          {errors.rate && <span style={{ color: "red", fontSize: "0.9em" }}>{errors.rate}</span>}
        </div>

        {/* Delivery Charge Input */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>বহন খরচ?</label>
          <input
            type="number"
            value={deliveryCharge ?? ""}
            onChange={(e) => handleNumberChange(e, setDeliveryCharge, "deliveryCharge")}
            name="deliveryCharge"
            style={{
              borderColor: errors.deliveryCharge ? "red" : "#ccc",
              outline: "none",
              padding: "6px",
              borderRadius: "5px",
            }}
          />
          {errors.deliveryCharge && (
            <span style={{ color: "red", fontSize: "0.9em" }}>{errors.deliveryCharge}</span>
          )}
        </div>

        {/* Cost Price Input */}
        <div style={{ display: "grid", width: "100%", marginBottom: "10px" }}>
          <label>দাম কত?</label>
          <input
            type="number"
            value={costPrice ?? ""}
            onChange={(e) => handleNumberChange(e, setCostPrice, "costPrice")}
            name="costPrice"
            style={{
              borderColor: errors.costPrice ? "red" : "#ccc",
              outline: "none",
              padding: "6px",
              borderRadius: "5px",
            }}
          />
          {errors.costPrice && (
            <span style={{ color: "red", fontSize: "0.9em" }}>{errors.costPrice}</span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginTop: "20px", gap: "10px" }}>
          <button
            type="submit"
            style={{ backgroundColor: "#004c3f", color: "#fffff0", padding: "10px", borderRadius: "5px" }}
          >
            হিসাব করুন
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{ backgroundColor: "#e05656", color: "#fffff0", padding: "10px", borderRadius: "5px" }}
          >
            মুছুন
          </button>
        </div>

        {/* Result */}
        {result !== undefined && (
          <div style={{ marginTop: "15px" }}>
            <h2
              style={{
                backgroundColor: "#004c3f",
                color: "#fffff0",
                padding: "10px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              ফলাফল: {result}
            </h2>
          </div>
        )}
      </div>
    </form>
  );
}

export default Form;
