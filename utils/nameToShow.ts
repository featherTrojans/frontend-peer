

export const nameToShow = (value: string) => {
    if (!value) return "";
    const newvalue = value.replace(/\s+/g, " ");
    if (newvalue?.split(" ").length > 1) {
      return newvalue?.split(" ")[1];
    } else {
      return newvalue;
    }
  };
