/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */

 document.addEventListener("DOMContentLoaded", function() {
    fetch('skincare-data.json')
        .then(response => response.json())
        .then(data => {
            window.skinCareProducts = data; 
            showCards(window.skinCareProducts); 
        })
        .catch(error => console.error('Cannot Load Data!:', error));
});


function showCards(skinCareProducts) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; 

    skinCareProducts.forEach(product => {
        const nextCard = document.createElement("div");
        nextCard.classList.add("card");
        nextCard.style.cursor = "pointer"; 
        nextCard.onclick = () => window.open(product.url, "_blank"); 

        const cardContentHTML = `
            <h2>${product.brand}</h2>
            <p class="product-item">${product.item}</p>
            <img src="${product.image}" alt="${product.item} Poster">
            <p>Sale: ${product.sale}</p>
            <p>Price: £${product.price}</p>
        `;
        
        nextCard.innerHTML = cardContentHTML;
        cardContainer.appendChild(nextCard);
    });
}



function sortCatalogue() {
    // Check if the skincare products data is loaded
    console.log('Sorting started');
    if (!window.skinCareProducts) {
        console.error("Skincare products data is not loaded yet.");
        return;
    }

    const sortBy = document.getElementById('sort-menu').value;
    let products = [...window.skinCareProducts]; 
    switch(sortBy) {
        case 'price-asc':
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'sale-desc':
            products.sort((a, b) => parseFloat(a.sale) - parseFloat(b.sale));
            break;
        case 'sale-asc':
            products.sort((a, b) => parseFloat(b.sale) - parseFloat(a.sale));
            break;
        case 'alpha-asc':
            products.sort((a, b) => a.item.localeCompare(b.item));
            break;
        case 'alpha-desc':
            products.sort((a, b) => b.item.localeCompare(a.item));
            break;
    }

    showCards(products); // Re-display the sorted products
}

function searchCatalog() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
    

    const filteredProducts = window.skinCareProducts.filter(product => 
        product.brand.toLowerCase().includes(searchText) || 
        product.item.toLowerCase().includes(searchText)
    );
    

    showCards(filteredProducts);
}


function editCardContent(card, newTitle, newImageURL) {
    card.style.display = "block";

    const cardHeader = card.querySelector("h2");
    cardHeader.textContent = newTitle;

    const cardImage = card.querySelector("img");
    cardImage.src = newImageURL;
    cardImage.alt = newTitle + " Poster";

    // You can use console.log to help you debug!
    // View the output by right clicking on your website,
    // select "Inspect", then click on the "Console" tab
    console.log("new card:", newTitle, "- html: ", card);
}

// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
    console.log("Button Clicked!")
    alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
}

function removeLastCard() {
    if (window.skinCareProducts && window.skinCareProducts.length > 0) {
        window.skinCareProducts.pop(); 
        showCards(window.skinCareProducts); 
    }
}

