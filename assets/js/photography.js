(function ($) {
  "use strict";

  $(function () {
    $(".photography-gallery").each(function () {
      $(this).magnificPopup({
        delegate: ".photograph__link",
        type: "image",
        mainClass: "photography-lightbox",
        allowHTMLInTemplate: true,
        closeMarkup: '<button type="button" class="mfp-close" aria-label="Close photograph" title="Close (Esc)">×</button>',
        gallery: {
          enabled: true,
          preload: [1, 1],
          tCounter: "%curr% / %total%",
          arrowMarkup: '<button type="button" class="mfp-arrow mfp-arrow-%dir%" aria-label="%title%" title="%title%"></button>'
        },
        image: {
          titleSrc: function (item) {
            var description = document.createElement("div");
            var title = item.el.attr("data-photo-title");
            var caption = item.el.attr("data-photo-caption");

            if (title) {
              var heading = document.createElement("h2");
              heading.className = "photography-lightbox__title";
              heading.textContent = title;
              description.appendChild(heading);
            }

            if (caption) {
              var paragraph = document.createElement("p");
              paragraph.className = "photography-lightbox__caption";
              paragraph.textContent = caption;
              description.appendChild(paragraph);
            }

            return description.innerHTML;
          }
        },
        closeOnContentClick: false,
        closeBtnInside: false,
        callbacks: {
          open: function () {
            this.wrap.attr({
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Photograph viewer"
            });
          },
          markupParse: function (template, values, item) {
            values.img_alt = item.el.find("img").attr("alt");
          }
        }
      });
    });
  });
})(jQuery);
