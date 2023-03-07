const divDisplayProducts = document.querySelector(".all-products");
const divQuickView = document.querySelector(".quick-view-product");
const btnCard = document.querySelector("nav .card");
const divCardDropdown = document.querySelector("nav .card-dropdown");
const numOfProductInCard = document.querySelector("nav .card .num-of-item");
let products = [
    {
        id: 1,
        name: "nike product1",
        price: 300,
        imageSrc: "images/product-1.png",
        addToCard: false,
        bgColor: "#cbe4b0",
    },
    {
        id: 2,
        name: "nike product2",
        price: 250,
        imageSrc: "images/product-2.png",
        addToCard: false,
        bgColor: "#98C8D6",
    },
    {
        id: 3,
        name: "nike product3",
        price: 200,
        imageSrc: "images/product-3.png",
        addToCard: false,
        bgColor: "#9897B9",
    },
    {
        id: 4,
        name: "nike product4",
        price: 250,
        imageSrc: "images/product-4.png",
        addToCard: false,
        bgColor: "#DCD7DB",
    },
    {
        id: 5,
        name: "nike product5",
        price: 150,
        imageSrc: "images/product-5.png",
        addToCard: false,
        bgColor: "#B5BDCF",
    },
    {
        id: 6,
        name: "nike product6",
        price: 350,
        imageSrc: "images/product-6.png",
        addToCard: false,
        bgColor: "#BECBC2",
    },
];
let productsInCard = [];
if (localStorage.getItem("products")) {
    productsInCard = JSON.parse(localStorage.getItem("products"));
}
// ---------------------------------------------
products.forEach((itemProduct) => {
    displayAllProducts(itemProduct);
});
// ---------------------------------------------
function setProductData(products) {
    localStorage.setItem("products", JSON.stringify(products));
}
// ---------------------------------------------
function getProductData() {
    let dataLocal = localStorage.getItem("products");
    if (dataLocal) {
        let productsInLocal = JSON.parse(dataLocal);
        products=productsInLocal;
    }
}
getProductData();
BuyIt();
// ---------------------------------------------
function displayAllProducts(products) {
    const productBox = document.createElement("div");
    productBox.classList.add("product");
    productBox.setAttribute("style", `--i: ${products.bgColor}`);
    productBox.innerHTML = `
        <div class="product-img">
            <img src=${products.imageSrc} alt=${products.name} />
        </div>
        <div class="product-details" >
            <div class="quick-view" id="btn-quick-view">
                <span class="material-symbols-outlined">
                    visibility
                </span>
            </div>
            <p>${products.name}</p>
            <p>${products.price}$</p>
            <button>add to card</button>
        </div>
        `;
    divDisplayProducts.appendChild(productBox);
}

// ---------------------------------------------
const btnQuickView = document.querySelectorAll(".quick-view");
btnQuickView.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        createQuickView(products[index]);
    });
});
// ---------------------------------------------
const createQuickView = (product) => {
    divQuickView.setAttribute("style", `--i: ${product.bgColor}`);
    divQuickView.style.display = "flex";
    divQuickView.innerHTML = `
    <div class="close">
                <span class="material-symbols-outlined"> close </span>
            </div>
            <div class="images-product">
                <div class="display-image">
                    <img src="${product.imageSrc}" alt="${product.name}" />
                </div>
                <div class="some-image">
                    <img src="${product.imageSrc}" alt="${product.name}" />
                    <img src="${product.imageSrc}" alt="${product.name}" />
                    <img src="${product.imageSrc}" alt="${product.name}" />
                </div>
            </div>
            <div class="details-product">
                <p>${product.name}</p>
                <p>collaboration with fragement</p>
                <div class="size">
                    <p>xs</p>
                    <p>s</p>
                    <p>m</p>
                    <p>l</p>
                    <p>xl</p>
                    <p>xxl</p>
                </div>
                <button>Add To Card</button>
                <p>${product.price}$</p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iusto accusantium, hic, pariatur id quaerat libero rerum ut
                    repellat quas expedita aliquam. A ut unde quaerat delectus
                    nihil animi inventore et!Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Iusto accusantium, hic,
                    pariatur id quaerat libero rerum ut repellat quas expedita
                    aliquam. A ut unde quaerat delectus nihil animi inventore
                    et!
                </p>
            </div>
    `;

    const btnQuickViewClose = document.querySelector(
        ".quick-view-product .close"
    );
    btnQuickViewClose.addEventListener("click", () => {
        divQuickView.style.display = "none";
    });

    const btnAddToCard = document.querySelector(".details-product button");
    btnAddToCard.addEventListener("click", () => {
        product.addToCard = true;
        BuyIt();
    });
};
// ---------------------------------------------
btnCard.addEventListener("click", () => {
    if (productsInCard.length === 0) {
        divCardDropdown.classList.remove("active");
    } else {
        divCardDropdown.classList.toggle("active");
    }
});
// ---------------------------------------------
const btnAddToCard = document.querySelectorAll(".all-products .product button");
btnAddToCard.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        products[index].addToCard = true;
        BuyIt();
    });
});
// ---------------------------------------------
function BuyIt() {
    productsInCard = [];
    products.forEach((p) => {
        if (p.addToCard === true) {
            productsInCard.push({
                id: p.id,
                name: p.name,
                price: p.price,
                imageSrc: p.imageSrc,
                addToCard: true,
                bgColor: p.bgColor,
            });
        }
    });
    setProductData(products);
    showProductsInCard();
    if (productsInCard.length === 0) {
        divCardDropdown.classList.remove("active");
    }
}
// ---------------------------------------------
function showProductsInCard() {
    divCardDropdown.innerHTML = ``;
    productsInCard.forEach((product) => {
        const divProductInCard = document.createElement("div");
        divProductInCard.classList.add("product");
        divProductInCard.innerHTML = `
        <div class="img-product">
            <img src="${product.imageSrc}" alt="${product.name}" />
        </div>
        <div class="details" id="${product.id}">
            <p>${product.name}</p>
            <p>total: <span>${product.price}$</span></p>
            <button>remove</button>
        </div>
        `;
        divCardDropdown.appendChild(divProductInCard);
        const btnRemoveProduct = document.querySelectorAll(
            ".card-dropdown .product .details button"
        );
        btnRemoveProduct.forEach((btn, index) => {
            btn.addEventListener("click", (e) => {
                const numId = +btn.parentElement.id;
                products[numId - 1].addToCard = false;
                BuyIt();
            });
        });
    });
    // console.log(products);
    updateNumOfCard();
}
// ---------------------------------------------
let num = 0;
function updateNumOfCard() {
    numOfProductInCard.innerHTML = `${productsInCard.length}`;
}
// ---------------------------------------------
