const url = "https://v2.api.noroff.dev/rainy-days";
//console.log("url", url);
const productlist = document.getElementById("product-list");
/*

}
const container = document.createElement("div");
container.innerText = "Hello World";
const caroline = document.createElement("div");
caroline.innerText = "Casper";
caroline.classList.add("style");

console.log(caroline);
productlist.appendChild(caroline);


productlist.appendChild(container);

console.log(container);
*/

//console.log(productlist);

async function getProducts() {
  try {
    const res = await fetch("https://v2.api.noroff.dev/rainy-days");
    console.log(res);
    const data = await res.json();
    console.log(data);
    console.log(Object.values(data.data));
    Object.values(data.data).forEach((product) => {
      createProduct(product);
    });
  } catch (error) {
    console.error(error);
  }
}
getProducts();

function createProduct(product) {
  const container = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const sizes = document.createElement("ul");
  const tags = document.createElement("ul");
  const colors = document.createElement("p");

  title.innerText = product.title;
  img.src = product.image.url;
  price.innerText = product.price;
  product.sizes.forEach((size) => {
    const li = document.createElement("li");
    li.innerText = size;
    sizes.appendChild(li);
  });
  product.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.innerText = tag;
    tags.appendChild(li);
    });

    title.classList.add("product-title");
    img.classList.add("product-image");
    container.classList.add("product-container");
    price.classList.add("product-price");
    sizes.classList.add("product-sizes");
    tags.classList.add("product-tags");
    colors.classList.add("product-colors");

    container.appendChild(img);
    container.appendChild(title);
    container.appendChild(price);
    container.appendChild(sizes);
    container.appendChild(tags);
    container.appendChild(colors);
    productlist.appendChild(container);
  });
}