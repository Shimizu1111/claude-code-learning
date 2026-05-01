// This code has several bugs - can you find them?

function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {  // Bug: off-by-one
    total += items[i].price * items[i].quantity;
  }
  return total;
}

function findUser(users, name) {
  for (let user of users) {
    if (user.name == name) {  // Bug: loose comparison
      return user;
    }
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth();  // Bug: getMonth() returns 0-11
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}

function removeDuplicates(arr) {
  const result = [];
  for (let item of arr) {
    if (!result.includes(item)) {
      result.push(item);
    }
  }
  return arr;  // Bug: returns original array instead of result
}

function getDiscount(price, discountPercent) {
  if (discountPercent > 0) {
    return price - (price * discountPercent);  // Bug: should be / 100
  }
}

module.exports = { calculateTotal, findUser, formatDate, removeDuplicates, getDiscount };
