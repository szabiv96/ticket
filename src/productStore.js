const productsArray = [
    {
        "id": "0",
        "name": "Ticket 01",
        "description": "description here description here description here description here description here description here description here ",
        "price": 150
    },
    {
        "id": "1",
        "name": "Ticket 02",
        "description": "description here description here description here description here description here description here description here ",
        "price": 300
    },
    {
        "id": "2",
        "name": "Ticket 03",
        "description": "description here description here description here description here description here description here description here ",
        "price": 400
    },
    {
        "id": "3",
        "name": "Ticket 04",
        "description": "description here description here description here description here description here description here description here ",
        "price": 500
    },
    {
        "id": "4",
        "name": "Ticket 05",
        "description": "description here description here description here description here description here description here description here ",
        "price": 6000
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if(productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
    }

    return productData;
}

export { productsArray, getProductData };