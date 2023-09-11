const amountFormatter = (value: string) => {
  if (!value) {
    return "0.00";
  }
  return (
    Number(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
  );
};

export default amountFormatter;
