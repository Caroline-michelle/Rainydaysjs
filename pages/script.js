console.log("Hello World");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const productpage = document.getElementById("product-page");
//console.log(id);
async function getProduct() {
  try {
    const res = await fetch(`https://v2.api.noroff.dev/rainy-days/${id}`);
    const data = await res.json();
    //console.log(data);
    createProductPage(data.data);
  } catch (error) {
    console.error(error);
  }
}
getProduct();
function createProductPage(product) {
  const container = document.createElement("div");
  const imgcontainer = document.createElement("img");
  const detailscontainer = document.createElement("div");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const tags = document.createElement("ul");
  const colors = document.createElement("p");
  const sizescontainer = document.createElement("ul");
  const addtocart = document.createElement("button");

  container.classList.add("product-container");
  imgcontainer.classList.add("productpageimg");
  detailscontainer.classList.add("productpagedetails");
  title.classList.add("productpagetitle");
  price.classList.add("productpageprice");
  tags.classList.add("producpagetags");
  colors.classList.add("productpagecolors");
  sizescontainer.classList.add("productpagesizes");
  addtocart.classList.add("productpageaddtocart");

  imgcontainer.src = product.image.url;
  imgcontainer.alt = product.image.alt;
  title.innerText = product.title;
  price.innerText = product.price;
  colors.innerText = product.baseColor;
  addtocart.innerText = "Add to cart";
  product.tags.forEach((tag) => {
    const li = document.createElement("li");
    li.innerText = tag;
    tags.appendChild(li);
  });
  console.log(product);
  product.sizes.forEach((size) => {
    const li = document.createElement("li");
    li.innerText = size;
    sizescontainer.appendChild(li);
  });
  container.appendChild(imgcontainer);
  detailscontainer.appendChild(title);
  detailscontainer.appendChild(price);
  detailscontainer.appendChild(tags);
  detailscontainer.appendChild(colors);
  detailscontainer.appendChild(sizescontainer);
  detailscontainer.appendChild(addtocart);
  container.appendChild(detailscontainer);
  productpage.appendChild(container);
}
