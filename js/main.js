(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Fixed Navbar
  // $(window).scroll(function () {
  //     if ($(window).width() < 992) {
  //         if ($(this).scrollTop() > 45) {
  //             $('.fixed-top').addClass('bg-white shadow');
  //         } else {
  //             $('.fixed-top').removeClass('bg-white shadow');
  //         }
  //     } else {
  //         if ($(this).scrollTop() > 45) {
  //             $('.fixed-top').addClass('bg-white shadow').css('top', 0);
  //         } else {
  //             $('.fixed-top').removeClass('bg-white shadow').css('top', 0);
  //         }
  //     }
  // });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Project carousel
  $(".project-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    margin: 25,
    loop: true,
    center: true,
    dots: false,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Testimonials carousel
  // $(".testimonial-carousel").owlCarousel({
  //   autoplay: true,
  //   smartSpeed: 1000,
  //   center: true,
  //   margin: 24,
  //   dots: true,
  //   loop: true,
  //   nav: false,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     576: {
  //       items: 1,
  //     },
  //     768: {
  //       items: 2,
  //     },
  //     992: {
  //       items: 3,
  //     },
  //   },
  // });
  $(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
      items: 1,
      itemsDesktop: [1000, 1],
      itemsDesktopSmall: [979, 1],
      itemsTablet: [768, 1],
      pagination: true,
      navigation: true,
      navigationText: ["‹", "›"],
      slideSpeed: 1000,
      autoPlay: 3000,
    });
  });

  // ===== Search Overlay =====//

  const openBtn = document.getElementById("openSearch");
  const overlay = document.getElementById("searchOverlay");
  const closeBtn = document.getElementById("closeSearch");
  const input = document.getElementById("searchInput");

  if (!openBtn || !overlay || !closeBtn || !input) return;

  // Open overlay
  openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    setTimeout(() => input.focus(), 150);
    document.body.style.overflow = "hidden";
  });

  // Close overlay
  function closeOverlay() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeOverlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.classList.contains("active")) {
      if (e.key === "Escape") closeOverlay();
      if (e.key === "Enter" && document.activeElement === input) {
        e.preventDefault();
        const q = input.value.trim();
        if (q) {
          alert("Search: " + q);
          // You can handle search here or closeOverlay();
        }
      }
    }
  });
  // Fixed Navbar
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".fixed-nav");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  document.querySelectorAll(".nav-item.dropdown > a").forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only for mobile devices (below 992px)
      if (window.innerWidth < 992) {
        // If dropdown not open yet, stop redirect
        if (!this.parentElement.classList.contains("show")) {
          e.preventDefault();
          // Manually open dropdown
          new bootstrap.Dropdown(this).toggle();
        }
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const MOBILE_BREAKPOINT = 992;

    document
      .querySelectorAll(".nav-item.dropdown > a.nav-link")
      .forEach((link) => {
        const dropdownMenu = link.nextElementSibling;
        let tappedOnce = false;

        link.addEventListener("click", function (e) {
          const isMobile = window.innerWidth < MOBILE_BREAKPOINT;

          if (isMobile) {
            // --- Mobile logic ---
            if (!tappedOnce) {
              e.preventDefault(); // stop redirect
              const dropdown = bootstrap.Dropdown.getOrCreateInstance(link);
              dropdown.show();
              tappedOnce = true;
              // reset tap state
              setTimeout(() => (tappedOnce = false), 2000);
            } else {
              // second tap → go to link
              window.location = link.getAttribute("href");
            }
          } else {
            // --- Desktop logic ---
            // Always go to the href
            window.location = link.getAttribute("href");
          }
        });
      });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-container");
    const pagination = document.getElementById("pagination");
    const section = document.querySelector(".section-5");

    // Collect all existing blogs in your HTML
    const allBlogs = Array.from(blogContainer.children);

    const blogsPerPage = 8;
    let currentPage = 1;
    const totalPages = Math.ceil(allBlogs.length / blogsPerPage);

    function renderBlogs() {
      blogContainer.innerHTML = "";
      const start = (currentPage - 1) * blogsPerPage;
      const end = start + blogsPerPage;
      const pageBlogs = allBlogs.slice(start, end);
      pageBlogs.forEach((blog) => blogContainer.appendChild(blog));
    }

    function renderPagination() {
      pagination.innerHTML = "";

      // Previous
      const prevLi = document.createElement("li");
      prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
      prevLi.innerHTML = `<a href="#" class="page-link"><i class="fas fa-angle-left"></i></a>`;
      prevLi.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
          currentPage--;
          updatePage();
        }
      });
      pagination.appendChild(prevLi);

      // Page numbers
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a href="#" class="page-link">${i}</a>`;
        li.addEventListener("click", (e) => {
          e.preventDefault();
          currentPage = i;
          updatePage();
        });
        pagination.appendChild(li);
      }

      // Next
      const nextLi = document.createElement("li");
      nextLi.className = `page-item ${
        currentPage === totalPages ? "disabled" : ""
      }`;
      nextLi.innerHTML = `<a href="#" class="page-link"><i class="fas fa-angle-right"></i></a>`;
      nextLi.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
          currentPage++;
          updatePage();
        }
      });
      pagination.appendChild(nextLi);
    }

    function updatePage() {
      renderBlogs();
      renderPagination();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Initialize
    renderBlogs();
    renderPagination();
  });
})(jQuery);
