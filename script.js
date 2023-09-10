const open = document.querySelector('.shopping');
const close = document.querySelector('.close');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
let body = document.querySelector('body');

open.addEventListener('click', () => {
	body.classList.add('active');
})

close.addEventListener('click', () => {
	body.classList.remove('active');
})

let products = [
	{
		id: 1,
		name: 'PERFUME 1',
		image: 'perfume1.jpg',
		price: 289
	},
	{
		id: 2,
		name: 'PERFUME 2',
		image: 'perfume2.jpg',
		price: 329
	},
	{
		id: 3,
		name: 'PERFUME 3',
		image: 'perfume3.jpg',
		price: 300
	},
	{
		id: 4,
		name: 'PERFUME 4',
		image: 'perfume4.jpg',
		price: 370
	},
	{
		id: 5,
		name: 'PERFUME 5',
		image: 'perfume5.jpg',
		price: 349
	},
	{
		id: 6,
		name: 'PERFUME 6',
		image: 'perfume6.jpg',
		price: 679
	}
];

let listCards = [];

function initApp() {
	products.forEach((value, key) => {
		let newDiv = document.createElement('div');
		newDiv.classList.add('item');
		newDiv.innerHTML = `
            <div class="title">${value.name}</div>
			<img src="image/${value.image}">
            <div class="price">${value.price.toLocaleString()} PLN</div>
            <button onclick="addToCard(${key})"> Add +</button>`;
		list.appendChild(newDiv);
	})
}
initApp();

function addToCard(key) {
	if (listCards[key] == null) {
		listCards[key] = JSON.parse(JSON.stringify(products[key]));
		listCards[key].quantity = 1;
	}
	reloadCard();
}

function reloadCard() {
	listCard.innerHTML = '';
	let count = 0;
	let totalPrice = 0;
	listCards.forEach((value, key) => {
		totalPrice = totalPrice + value.price;
		count = count + value.quantity;
		if (value != null) {
			let newDiv = document.createElement('li');
			newDiv.innerHTML = `
                <div>${value.name}</div>
                <div><img src="./image/${value.image}"/></div>
                <div>${value.price.toLocaleString()} PLN</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
			listCard.appendChild(newDiv);
		}
	})
	total.innerText = totalPrice.toLocaleString() + ` PLN`;
	quantity.innerText = count;
}

function changeQuantity(key, quantity) {
	if (quantity == 0) {
		delete listCards[key];
	} else {
		listCards[key].quantity = quantity;
		listCards[key].price = quantity * products[key].price;
	}
	reloadCard();
}