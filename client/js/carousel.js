document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var options = {
    onCycleTo: function (ele) {
      console.log(ele);
      console.log($(ele).index()); // the slide's index
    },
  };

  var instances = M.Carousel.init(elems, options);
});

// Solid color slide js
$(document).ready(function () {
  $(".carousel").carousel({
    dist: 0,
    padding: 0,
    fullWidth: true,
    indicators: true,
    duration: 100,
  });
});

autoplay();
function autoplay() {
  $(".carousel").carousel("next");
  setTimeout(autoplay, 4500);
}

// fancy multi container carousel
$(document).ready(function () {
  $("#demo-carousel").carousel();
});
