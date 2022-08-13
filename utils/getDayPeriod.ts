export  const getPeriod = () => {
    const hour = new Date().getHours();
    var textMessage =
      hour < 12
        ? "Good Morning"
        : hour < 18
        ? "Good Afternoon"
        : "Good Evening";

    return textMessage;
  };