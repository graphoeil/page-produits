// Variables
const url = 'https://course-api.com/javascript-store-single-product';
const productDOM = document.querySelector('.product');

// Fetch data
const fetchProduct = async() => {
	// Loading
	productDOM.innerHTML = '<h4 class="product-loading">Loading...</h4>';
	// Try, catch
	try {
		// Récupérer l'id depuis la barre d'adresse
		const params = new URLSearchParams(window.location.search);
		const id = params.get('id');
		const response = await fetch(`${ url }?id=${ id }`);
		const data = await response.json();
		return data;
	} catch(error){
		productDOM.innerHTML = '<p class="error">There was a problem loading the product. Please try again later...</p>';
	}
};

// Display product
const displayProduct = (product) => {
	// Variables
	const { fields:{ name:title, price, description, colors, company, image } } = product;
	const { thumbnails:{ large:{ url:img } } } = image[0];
	// Titre de la page avec majuscule ,-)
	document.title = title.slice(0,1).toUpperCase() + title.slice(1);
	// Colors
	const colorsList = colors.map((color) => {
		return `<span class="product-color" style="background-color: ${ color }"></span>`;
	}).join('');
	// Produit
	productDOM.innerHTML = `<div class="product-wrapper">
		<img src="${ img }" class="img" alt="${ title }">
		<div class="product-info">
			<h3>${ title }</h3>
			<h5>${ company }</h5>
			<span>$${ price / 100 }</span>
			<div class="colors">${ colorsList }</div>
			<p>${ description }</p>
			<button class="btn">Add to cart</button>
		</div>
	</div>`;
};

// Init
const init = async() => {
	const data = await fetchProduct();
	displayProduct(data);
};
init();