document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const sortOrder = document.getElementById('sortOrder');


    Promise.all([
        fetch('https://fakestoreapi.com/products').then(response => response.json()),
        fetch('https://fakestoreapi.com/products/categories').then(response => response.json())
    ]).then(([products, categories]) => {
      
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });

       
        displayProducts(products);

    
        categoryFilter.addEventListener('change', function () {
            const selectedCategory = this.value;
            const filteredProducts = selectedCategory ?
                products.filter(product => product.category === selectedCategory) :
                products;
            displayProducts(filteredProducts);
        });

        searchInput.addEventListener('input', function () {
            const searchTerm = this.value.trim().toLowerCase();
            const filteredProducts = products.filter(product =>
                product.title.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });


        sortOrder.addEventListener('change', function () {
            const sortedProducts = products.slice().sort((a, b) => {
                if (this.value === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
            displayProducts(sortedProducts);
        });
    });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
            `;
            productList.appendChild(productItem);
        });
    }
});
