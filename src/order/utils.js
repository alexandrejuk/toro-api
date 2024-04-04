const { applySpec, pathOr, concat } = require('ramda');

const buildAvg = (position, order, stock) => {
  const currentAmount = pathOr(0, ['amount'], position);
  const orderAmount =  pathOr(0, ['amount'], order);
  const amount = currentAmount + orderAmount;
  const currentPricePosition = currentAmount * pathOr(0, ['currentPrice'], position)
  const orderPrice = orderAmount * pathOr(0, ['currentPrice'], stock)
  const currentPrice = (currentPricePosition + orderPrice) / amount;
  return { amount, currentPrice };
};

const buildPosition = ({ customer = {}, stock = {}, order = {} }) => {
  const positions = pathOr([], ['positions'], customer);
  const findStock = positions.find(({ symbol }) => symbol === order.symbol);
  if(findStock) {
    return positions.map(position => (
      position.symbol === findStock.symbol 
        ? ({...position, ...buildAvg(findStock, order, stock )}) 
        : position 
      )
    )
  }
  
  const newPositionOrder = [{
    symbol: stock.symbol, 
    currentPrice: stock.currentPrice, 
    amount: order.amount,
  }]

  return concat(positions, newPositionOrder);
};

const DecrementBalance = ({ customer = {}, stock = {}, order = {} }) => {
  return (customer.checkingAccountAmount - (order.amount * stock.currentPrice))
}

const customerPosition = applySpec({
  checkingAccountAmount: DecrementBalance,
  positions: buildPosition
});

const checkBalanceAvailability = (checkingAccountAmount, obj) => {
  const requiredAmount = pathOr(0, ['order', 'amount'], obj) * pathOr(0, ['stock', 'currentPrice'], obj);
  return checkingAccountAmount >= requiredAmount;
}

module.exports = {
  customerPosition,
  checkBalanceAvailability,
};
