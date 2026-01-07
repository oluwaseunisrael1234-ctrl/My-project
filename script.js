/* ===============================
   SHOP FUNCTIONALITY SCRIPT
================================ */

const productsGrid = document.getElementById("productsGrid");
const products = Array.from(document.querySelectorAll(".product-card"));

const filterButtons = document.querySelectorAll(".category-list button");
const sortSelect = document.getElementById("sortSelect");
const priceRange = document.getElementById("priceRange");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

/* ===============================
   PAGINATION SETTINGS
================================ */
let currentPage = 1;
const itemsPerPage = 6;
let filteredProducts = [...products];

/* ===============================
   DISPLAY PRODUCTS
================================ */
function displayProducts() {
  productsGrid.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const paginatedItems = filteredProducts.slice(start, end);

  paginatedItems.forEach(product => {
    productsGrid.appendChild(product);
  });

  pageInfo.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = end >= filteredProducts.length;
}

/* ===============================
   CATEGORY FILTER
================================ */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    filteredProducts = products.filter(product => {
      return category === "all" || product.dataset.category === category;
    });

    currentPage = 1;
    displayProducts();
  });
});

/* ===============================
   PRICE FILTER
================================ */
priceRange.addEventListener("input", () => {
  const maxPrice = priceRange.value;

  filteredProducts = products.filter(product => {
    const price = parseInt(
      product.querySelector(".price").textContent.replace(/[₦,]/g, "")
    );
    return price <= maxPrice;
  });

  currentPage = 1;
  displayProducts();
});

/* ===============================
   SORTING
================================ */
sortSelect.addEventListener("change", () => {
  const value = sortSelect.value;

  if (value === "low") {
    filteredProducts.sort((a, b) => {
      return getPrice(a) - getPrice(b);
    });
  }

  if (value === "high") {
    filteredProducts.sort((a, b) => {
      return getPrice(b) - getPrice(a);
    });
  }

  if (value === "latest") {
    filteredProducts = [...products];
  }

  currentPage = 1;
  displayProducts();
});

function getPrice(product) {
  return parseInt(
    product.querySelector(".price").textContent.replace(/[₦,]/g, "")
  );
}

/* ===============================
   PAGINATION CONTROLS
================================ */
nextBtn.addEventListener("click", () => {
  if (currentPage * itemsPerPage < filteredProducts.length) {
    currentPage++;
    displayProducts();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
});

/* ===============================
   INIT
================================ */
displayProducts();



  let menuBtn = document.getElementById("menuBtn");
let mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const dropBtn = document.querySelector(".drop-btn");
const dropdown = document.querySelector(".dropdown");


    dropBtn.addEventListener("click", (e) => {
  e.preventDefault();
  dropdown.classList.toggle("open");
});
});




  const seeMore = document.querySelector(".see-more");
  const text = document.querySelector(".footer-text");

  seeMore.addEventListener("click", () => {
    text.classList.toggle("expanded");
    seeMore.textContent = text.classList.contains("expanded")
      ? "See less"
      : "See more";
  });

