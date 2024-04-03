module.exports.top5Stocks = async (event) => {
  const trends = [
    {
      symbol: "PETR4",
      currentPrice: 28.44
    },
    {
      symbol: "MGLU3",
      currentPrice: 25.91
    },
    {
      symbol: "VVAR3",
      currentPrice: 25.91
    },
    {
      symbol: "SANB11",
      currentPrice: 40.77
    },
    {
      symbol: "TORO4",
      currentPrice: 115.98
    }
  ];

  const response = {
    statusCode: 200,
    body: JSON.stringify(trends),
  };

  return response;
};
