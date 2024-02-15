document.addEventListener('DOMContentLoaded', function() {
    
    const buttons = document.querySelectorAll('.image-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let category = this.textContent.trim().toUpperCase(); 
            fetchProducts(category);
        });
    });
});

function fetchProducts(category) {
   
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
           
            const categoryData = data.categories.find(cat => cat.category_name.toUpperCase() === category);
            if (categoryData) {
                displayProducts(categoryData.category_products);
            }
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products) {
    const container = document.querySelector('.container-product');
    container.innerHTML = ''; 

  
    products.forEach(product => {
        const discountsPercentage = calculatediscounts(product.price, product.compare_at_price);
        const card = document.createElement('div');
        card.className = 'product-card';


        let badgeTextHTML = '';
        if (product.badge_text) {
            badgeTextHTML = `<div class="badge">${product.badge_text}</div>`;
        }

     
        const priceDetails = ` Rs ${product.price}.00 <del class="original-price">${product.compare_at_price}.00</del> `;


        card.innerHTML = `
        ${badgeTextHTML}
            <img src="${product.image}" alt="${product.title}">
            <div class="details">
            <p><span class="product-title">${product.title}</span> • <span class="vendor">${product.vendor}</span></p>
                <p>${priceDetails}<span class="discounts">${discountsPercentage}% off</span></p> <!-- Include discounts percentage here -->
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

      
        container.appendChild(card);
    });
}




function calculatediscounts(price, compareAtPrice) {
    price = parseFloat(price);
    compareAtPrice = parseFloat(compareAtPrice);
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}