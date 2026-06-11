// Mobile navigation toggle.
(function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var menu = document.getElementById("primary-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close the menu when a link is tapped.
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();
