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


// module.exports = generateString;

// const carts = [
//     {
//         product_id: 1,
//         quantity: 2,
//         price: 12000
//     },
//     {
//         product_id: 2,
//         quantity: 5,
//         price: 12500
//     },
//     {
//         product_id: 3,
//         quantity: 4,
//         price: 13500
//     }
// ]
// const order_id = 8
// buat function dibawah

// const order = (order_id, carts) => {
//     let orderArray = '';
//     carts.forEach(item => {
//         let value = `(${order_id},`
//         // loop object
//         for (key in item) {
//             value += `${item[key]},`
//         }
//         value = value.substring(0, value.length - 1)
//         value += '),'
//         orderArray += value
//     })
    
//     return orderArray.substring(0, orderArray.length - 1)
// };

// console.log(order(order_id, carts))
// output => `(8, 1, 2, 12000), (8, 2, 5, 12500)`
