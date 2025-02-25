const url = "https://v2.api.noroff.dev/rainy-days";
//console.log("url", url);
const productlist = document.getElementById("product-list");
const filter = document.getElementById("filter");
console.log(filter);
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
    createGenre(Object.values(data.data));
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
  const link = document.createElement("a");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const tags = document.createElement("ul");
  const colors = document.createElement("p");

  link.href = `pages/productpage.html?id=${product.id}`;

  title.innerText = product.title;
  img.src = product.image.url;
  price.innerText = product.price;

  product.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.innerText = tag;
    tags.appendChild(li);
  });

  title.classList.add("product-title");
  img.classList.add("product-image");
  container.classList.add("product-container");
  price.classList.add("product-price");
  tags.classList.add("product-tags");
  colors.classList.add("product-colors");
  link.classList.add("product-link");

  container.appendChild(img);
  container.appendChild(title);
  container.appendChild(price);
  container.appendChild(tags);
  container.appendChild(colors);
  link.appendChild(container);
  productlist.appendChild(link);
}

function createGenre(products) {
  const genres = [...new Set(products.flatMap((product) => product.tags))];
  console.log(genres);
  genres.forEach((genre) => {
    const div = document.createElement("div");
    div.textContent = genre;

    div.onclick = () => {
      console.log("clicked", genre);
      filterProducts(genre, products);
    };

    filter.appendChild(div);
  });
}
function filterProducts(genre, products) {
  productlist.innerHTML = "";
  const filteredProducts = products.filter((product) =>
    product.tags.includes(genre)
  );
  filteredProducts.forEach((product) => {
    createProduct(product);
  });
}
