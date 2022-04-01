// Variables
const url = 'https://course-api.com/javascript-store-products';
const productsDOM = document.querySelector('.products-center');
const productsContainer = productsDOM.querySelector('.products-container');

// Fetch products
const fetchProducts = async() => {
	// Loading
	productsDOM.innerHTML = `<div class="loading"></div>`;
	// Try / catch
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch(error){
		// Erreur
		productsDOM.innerHTML = '<p class="error">There was an error...</p>';
	}
};
fetchProducts();

// Display products
const displayProducts = (list) => {
	const productList = list.map((product) => {
		const { id, fields:{ name, price } } = product;
		const { thumbnails:{ large:{ url:img } } } = product.fields.image[0];
		return(
			`<a href="product.html?id=${ id }" title="more details..." class="single-product">
				<img src="${ img }" alt="${ name }" class="single-product-img img">
				<footer>
					<h5 class="name">${ name }</h5>
					<span class="price">$${ price / 100 }</span>
				</footer>
			</a>`
		);
	}).join('');
	productsDOM.innerHTML = `<div class="products-container">${ productList }</div>`;
};

// Init
/* Approche différente, nous aurions pu passer displayProducts directement 
dans le try/catch de fetchProducts ... */
const init = async() => {
	const data = await fetchProducts();
	displayProducts(data);
};
init();