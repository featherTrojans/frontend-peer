const amountFormatter = (value: string) => {
  return (
    Number(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,") || "0.00"
  );
};

export default amountFormatter;
