$(document).ready(function () {
  $(".carousel__items").slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="./img/slider/chevron-left.png" alt="left" /></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="./img/slider/chevron-right.png" alt="right" /></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: false,
          arrows: false,
        },
      },
    ],
  });

  //TABS
  $("ul.catalog__tabs").on(
    "click",
    "li:not(.catalog__tab_active)",
    function () {
      $(this)
        .addClass("catalog__tab_active")
        .siblings()
        .removeClass("catalog__tab_active")
        .closest("div.container")
        .find("div.catalog__row")
        .removeClass("catalog__row_active")
        .eq($(this).index())
        .addClass("catalog__row_active");
    }
  );
  /*
  $(".catalog-card__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-card__content")
        .eq(i)
        .toggleClass("catalog-card__content_active");
      $(".catalog-card__list").eq(i).toggleClass("catalog-card__list_active");
    });
  });

  $(".catalog-card__back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".catalog-card__content")
        .eq(i)
        .toggleClass("catalog-card__content_active");
      $(".catalog-card__list").eq(i).toggleClass("catalog-card__list_active");
    });
  });
*/
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".catalog-card__content")
          .eq(i)
          .toggleClass("catalog-card__content_active");
        $(".catalog-card__list").eq(i).toggleClass("catalog-card__list_active");
      });
    });
  }

  toggleSlide(".catalog-card__link");
  toggleSlide(".catalog-card__back");

  // Modal
  $('[data-modal="consultation"]').on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });

  $(".modal__close").on("click", function () {
    $(".overlay, .modal").fadeOut("slow");
  });

  $(".button__buy").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__text").text($(".catalog-card__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });

  //Validate Form

  function validForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      //Если нужна поменять язык информации
      messages: {
        name: "Пожалуйста, введите имя",
        phone: "Пожалуйста, введите номер телефона",
        email: {
          required: "Пожалуйста, введите адрес почты",
          email: "Неправильно введен адрес почты",
        },
      },
    });
  }

  validForms("#consultation-form");
  validForms("#consultation form");
  validForms("#order form");

  //Маска ввода номера телефона (чтоб работало нужно в HTML убрать в type=number)
  $("input[name=phone]").mask("+38 (999) 999-99-99");

  //Отправка писем с сайта
  $("form").submit(function (e) {
    e.preventDefault();
    if (!$(this).valid()) {
      return;
    }
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overlay, #thanks").fadeIn();

      $("form").trigger("reset");
    });
    return false;
  });

  //Появление значка скрола при пролистывании страницы и медленный скрол вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });

  $("a[href=#up]").on("click", function () {
    const hash = this.hash;
    $("html, body").animate({
      scrollTop: $(hash).offset().top,
    });
    return false;
  });
  //Подключаем скрипты для animate.css
  new WOW().init();
});
