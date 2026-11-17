/* Автоподбор: меню, аккордеон, появление, заявка в WhatsApp */
(function () {
  "use strict";
  var PHONE = "375296405270";

  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__item");
      var panel = item.querySelector(".faq__a");
      var wasOpen = item.classList.contains("open");
      item.parentElement.querySelectorAll(".faq__item.open").forEach(function (o) {
        if (o !== item) {
          o.classList.remove("open");
          o.querySelector(".faq__a").style.maxHeight = null;
          o.querySelector(".faq__q").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("open", !wasOpen);
      q.setAttribute("aria-expanded", wasOpen ? "false" : "true");
      panel.style.maxHeight = wasOpen ? null : panel.scrollHeight + "px";
    });
  });

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var lead = document.getElementById("lead-form");
  if (lead) {
    lead.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (document.getElementById("l-name").value || "").trim();
      var phone = (document.getElementById("l-phone").value || "").trim();
      var carEl = document.getElementById("l-car");
      var car = carEl ? (carEl.value || "").trim() : "";
      if (phone.replace(/\D/g, "").length < 6) {
        var f = document.getElementById("l-phone");
        f.style.borderColor = "#D7F24A";
        f.focus();
        return;
      }
      var msg = "Здравствуйте! Заявка с сайта — автоподбор.\n" +
        (name ? "Имя: " + name + "\n" : "") +
        "Телефон: " + phone + "\n" +
        (car ? "Авто или город: " + car + "\n" : "") +
        "Прошу связаться и подсказать по осмотру.";
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg), "_blank");
    });
  }
})();
