const generateString = (order_id, carts) => {
    let orderArray = '';
    carts.forEach(item => {
        let value = `(${order_id},`
        // loop object
        for (key in item) {
            value += `${item[key]},`
        }
        value = value.substring(0, value.length - 1)
        value += '),'
        orderArray += value
    })
    
    return orderArray.substring(0, orderArray.length - 1)
};

module.exports = generateString;