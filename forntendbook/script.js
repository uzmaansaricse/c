// menu toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navItems = document.querySelector(".nav-items");

    menuToggle.addEventListener("click", function () {
        navItems.classList.toggle("actives");
    });
});





  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".profile-dropdown-toggle");
    const dropdownContainer = document.getElementById("profile-dropdown-section");

    if (toggleBtn && dropdownContainer) {
      toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Toggle the 'show' class to show/hide the dropdown menu
        dropdownContainer.classList.toggle("show");
      });

      // Optional: Hide dropdown when clicking outside
      document.addEventListener("click", function (event) {
        if (!dropdownContainer.contains(event.target) && !toggleBtn.contains(event.target)) {
          dropdownContainer.classList.remove("show");
        }
      });
    }
  });



  
  // learn more div
  function openPopup(popupId, overlayId) {
    document.getElementById(popupId).style.display = "block";
    document.getElementById(overlayId).style.display = "block"; 
  }
  
  function closePopup(popupId, overlayId) {
    document.getElementById(popupId).style.display = "none";
    document.getElementById(overlayId).style.display = "none"; 
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      let cartCount = localStorage.getItem("cartCount") ? parseInt(localStorage.getItem("cartCount")) : 0;
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  
      updateCartNotification();
  
      document.querySelectorAll(".buy-btn").forEach((button) => {
          button.addEventListener("click", function () {
              let bookCard = this.closest(".card");
              let bookTitle = bookCard.querySelector(".book-title").textContent;
              let bookPrice = bookCard.querySelector("p").innerHTML;
              let bookImage = bookCard.querySelector("img").src;
  
              let book = {
                  title: bookTitle,
                  price: bookPrice,
                  image: bookImage,
              };
  
              cartItems.push(book);
              cartCount++;
  
              localStorage.setItem("cart", JSON.stringify(cartItems));
              localStorage.setItem("cartCount", cartCount);
  
              updateCartNotification();
              alert("Book added to cart!");
          });
      });
  
      function updateCartNotification() {
          const cartBadge = document.getElementById("cart-count");
          if (cartBadge) {
              cartBadge.textContent = cartItems.length;
          }
      }
  });
  
  
  
  // Search bar functionality
  
  
  async function searchBooks(query) {
      if (!query) {
          document.getElementById("books-container").innerHTML = "<p>Please enter a search term.</p>";
          return;
      }

      try {
          const res = await fetch(`/api/Searchbook?search=${encodeURIComponent(query)}`);
          const data = await res.json();
          const books = data.books;

          const container = document.getElementById("books-container");
          container.innerHTML = ""; // Clear previous results

          if (books && books.length > 0) {
              books.forEach(book => {
                  const card = `
                      <div class="book-card">
                          <img src="${book.bookImage}" alt="${book.title}" />
                          <h3>${book.title}</h3>
                          <p><strong>Author:</strong> ${book.author}</p>
                          <p><strong>Price:</strong> ₹${book.price} | <strong>Offer:</strong> ₹${book.offerPrice}</p>
                          <p><strong>ISBN:</strong> ${book.isbn}</p>
                          <p><strong>Pages:</strong> ${book.pageNumber}</p>
                          <p><strong>Language:</strong> ${book.language}</p>
                          <p><strong>Weight:</strong> ${book.weight} kg</p>
                          <p><strong>Description:</strong> ${book.description}</p>
                          <div class="rating-overlay">
                              ${generateStars(book.averageRating)}
                              <span class="avg-text">(${book.averageRating || 0} ⭐)</span>
                              <span class="total-reviews">${book.totalReviews || 0} reviews</span>
                          </div>
                      </div>
                  `;
                  container.innerHTML += card;
              });
          } else {
              container.innerHTML = "<p>No books found.</p>";
          }
      } catch (error) {
          console.error("Error fetching books:", error);
          document.getElementById("books-container").innerHTML = "<p>Error fetching books.</p>";
      }
  }

  function generateStars(rating) {
      rating = parseFloat(rating) || 0;
      let stars = '';
      for (let i = 1; i <= 5; i++) {
          if (i <= rating) {
              stars += `<i class="fas fa-star" style="color: gold;"></i>`;
          } else if (i - rating < 1) {
              stars += `<i class="fas fa-star-half-alt" style="color: gold;"></i>`;
          } else {
              stars += `<i class="far fa-star" style="color: gold;"></i>`;
          }
      }
      return stars;
  }



// Render books in card format
function renderBooks(books) {
    const container = document.getElementById("books-container");
    container.innerHTML = ""; // Clear previous data

    books.forEach(book => {
        const bookCard = `
            <div class="col-sm-3">
                <div class="book-card" style="border: 1px solid #ccc; border-radius: 10px; padding: 15px; margin-bottom: 20px; text-align: center; box-shadow: 2px 2px 8px rgba(0,0,0,0.1); transition: 0.3s; cursor: pointer;">
                    <img src="${book.image}" alt="${book.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 8px;" />
                    <h5 style="margin: 10px 0;">${book.title}</h5>
                    <p>Author: ${book.author}</p>
                    <p>Price: ₹${book.price}</p>
                </div>
            </div>
        `;
        container.innerHTML += bookCard;
    });
}
  // baner
  // fatch banner
  let currentIndex = 0;
  let intervalId;
  
  async function fetchBanners() {
      try {
          const response = await fetch("/api/banners");
          const result = await response.json();
          if (result.success && result.banners.length > 0) {
              const container = document.getElementById("bannerContainer");
              container.innerHTML = ""; // Purane banners remove karein
              
              result.banners.forEach(img => {
                  const div = document.createElement("div");
                  div.classList.add("slide");
  
                  const imgEl = document.createElement("img");
                  imgEl.src = img.url;
                  imgEl.alt = "Banner Image";
  
                  div.appendChild(imgEl);
                  container.appendChild(div);
              });
  
              startSlider();
          } else {
              console.error("No banners found");
          }
      } catch (error) {
          console.error("Error fetching banners:", error);
      }
  }
  
  function showSlide(index) {
      const slides = document.querySelectorAll(".slide");
      const totalSlides = slides.length;
  
      if (totalSlides === 0) return; // Agar slides nahi hain to kuch mat karo
  
      if (index >= totalSlides) {
          currentIndex = 0;
      } else if (index < 0) {
          currentIndex = totalSlides - 1;
      } else {
          currentIndex = index;
      }
  
      document.getElementById("bannerContainer").style.transform = `translateX(-${currentIndex * 100}%)`;
  }
  
  function nextSlide() {
      showSlide(currentIndex + 1);
  }
  
  function prevSlide() {
      showSlide(currentIndex - 1);
  }
  
  function startSlider() {
      if (intervalId) clearInterval(intervalId); // Pehle se chal raha ho to stop karein
      intervalId = setInterval(nextSlide, 3000);
  }
  
  fetchBanners();
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
     // fetchTopSellerBooks();
      //fetchFictionBooks();
  });
  
 
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navItems = document.querySelector(".nav-items");
    menuToggle.addEventListener("click", function () {
        navItems.classList.toggle("active");
    });
});




  // 📌  new book & New Arrivals
  async function fetchNewBooks() {
    try {
      const response = await fetch('/getNewBooks');  
      const data = await response.json();
      console.log("Fetched Books:", data);

      const newBooksContainer = document.getElementById("newBooksContainer");
      newBooksContainer.innerHTML = "";

      data.books.forEach(book => {
        if (!book || !book._id || !book.title) {
          console.warn("Skipping invalid book:", book);
          return;
        }

        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
          <img class="book-image" src="${book.bookImage || 'default.jpg'}" alt="${book.title}">
          <div class="rating-overlay">
            ${generateStars(book.averageRating)}
            <span class="avg-text">(${book.averageRating || 0} ⭐)</span>
          </div>
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author || 'Unknown'}</div>
          <div class="book-price">
            ₹${book.price || 0} <span class="offer-price">₹${book.offerPrice || book.price || 0}</span>
          </div>
          <button class="add-cart">Add to Cart</button>
          <button class="go-cart" style="display: none;">Go to Cart</button>
        `;

        bookCard.querySelector(".book-image").addEventListener("click", () => {
          window.location.href = `/newbookDetelies.html?id=${book._id}`;
        });

        const addCartBtn = bookCard.querySelector(".add-cart");
        const goCartBtn = bookCard.querySelector(".go-cart");

        addCartBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          addToCart(book._id, book.title, book.bookImage, book.offerPrice || book.price);

          // ✅ SweetAlert2 Notification
          Swal.fire({
            icon: 'success',
            title: 'Book Added!',
            text: `"${book.title}" has been added to your cart.`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });

          addCartBtn.style.display = "none";
          goCartBtn.style.display = "inline-block";
        });

        goCartBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          window.location.href = "Cart Page with Checkout.html";
        });

        newBooksContainer.appendChild(bookCard);
      });

    } catch (err) {
      console.error("Error fetching books:", err);
     
    }
  }

  function generateStars(rating) {
    rating = parseFloat(rating) || 0;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += `<i class="fas fa-star" style="color: gold;"></i>`;
      } else if (i - rating < 1) {
        stars += `<i class="fas fa-star-half-alt" style="color: gold;"></i>`;
      } else {
        stars += `<i class="far fa-star" style="color: gold;"></i>`;
      }
    }
    return stars;
  }

  function addToCart(id, title, image, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ id, title, image, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartNotification();
  }

  function updateCartNotification() {
    const cartBadge = document.querySelector("sup#cart-count");
    if (!cartBadge) return;
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalQuantity;
    cartBadge.style.display = totalQuantity === 0 ? "none" : "inline-block";
  }

  document.addEventListener("DOMContentLoaded", () => {
    fetchNewBooks();
    updateCartNotification();
  });


  

  
  // silder book btn
 


  
  function scrollBooks(direction) {
      let container = document.getElementById("booksContainer");
      let scrollAmount = 300; // Scroll distance
  
      if (direction === "next") {
          container.scrollLeft += scrollAmount;
      } else {
          container.scrollLeft -= scrollAmount;
      }
  }



