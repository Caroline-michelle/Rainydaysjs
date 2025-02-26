const productList = document.querySelector(".cartproducts");
const purchase = document.querySelector(".purchase-button");
purchase.addEventListener("click", () => {
  alert("Thank you for your purchase!");
  localStorage.clear();
  window.location.reload();
});
async function getProduct() {
  try {
    const res = await fetch(`https://v2.api.noroff.dev/rainy-days/`);
    const data = await res.json();
    console.log(data);
    const localItems = Object.keys(localStorage);
    console.log(localItems);
    const filteredProducts = data.data.filter((product) => {
      return localItems.includes(product.id);
    });
    console.log(filteredProducts);
    filteredProducts.forEach((product) => {
      console.log(product.description);
      createProduct(product);
    });
  } catch (error) {
    console.error(error);
  }
}
getProduct();

function createProduct(product) {
  console.log(product);
  const card = document.createElement("div");
  const cardImage = document.createElement("div");
  const cardDetails = document.createElement("div");
  const cardRemove = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("p");
  const price = document.createElement("p");
  const category = document.createElement("ul");
  const remove = document.createElement("button");

  card.classList.add("card");
  cardImage.classList.add("img-container");
  cardDetails.classList.add("info-container");
  cardRemove.classList.add("remove-container");
  img.classList.add("product-image");
  title.classList.add("product-title");
  price.classList.add("product-price");
  category.classList.add("product-category");
  remove.classList.add("product-remove");

  img.src = product.image.url;
  img.alt = product.image.alt;
  title.innerText = product.title;
  price.innerText = product.price;
  product.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.innerText = tag;
    category.appendChild(li);
  });
  remove.innerText = "Remove";
  remove.addEventListener("click", () => {
    localStorage.removeItem(product.id);
  });

  cardImage.appendChild(img);
  cardDetails.appendChild(title);
  cardDetails.appendChild(price);
  cardDetails.appendChild(category);
  cardRemove.appendChild(remove);
  card.appendChild(cardImage);
  card.appendChild(cardDetails);
  card.appendChild(cardRemove);

  productList.appendChild(card);
}
