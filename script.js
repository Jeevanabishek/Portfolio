$(document).ready(function () {
  // Scroll to top on page refresh
  setTimeout(() => { $("html, body").scrollTop(0); }, 10);

  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Mobile menu functionality
  $('.menu_icon').click(function (e) {
    e.preventDefault();
    $('.navbar').addClass('show');
    $('.close-btn').show();
    $('.menu_icon').hide();
    $('body').addClass('no-scroll');
  });

  // Combined click handler for links and close button
  $('.navbar').on('click', 'li a, .close-btn', function (e) {
    // Handle close button
    if ($(this).hasClass('close-btn')) {
      e.preventDefault();
      $('.navbar').removeClass('show');
      $('.close-btn').hide();
      $('.menu_icon').show();
      $('body').removeClass('no-scroll');
      return;
    }

    // Handle menu links (only for mobile)
    if ($(window).width() < 768) {
      $('.navbar').removeClass('show');
      $('.close-btn').hide();
      $('.menu_icon').show();
      $('body').removeClass('no-scroll');
    }

    // Smooth scrolling
    var target = $(this).attr("href");
    e.preventDefault();
    if (target === "#home") {
      $("html, body").animate({ scrollTop: 0 }, 500);
    } else {
      var offset = $(target).offset().top - 40;
      $("html, body").animate({ scrollTop: offset }, 500);
    }

    $(".navbar li a").removeClass("active");
    $(this).addClass("active");
  });

  // ScrollReveal animations
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact, .skill", { origin: "bottom" });
  ScrollReveal().reveal(".skills-title", { origin: "top" });

  // Google Sheet contact form submission with current date (DD-MM-YYYY)
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyXSu1rLuouae6opWiDy8flfkpQcMOomKo_IXJ4NW6-vSZzveyMJGirKdK3_OfH8G1r/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Format date as DD-MM-YYYY
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = now.getFullYear();
    const today = `${day}-${month}-${year}`;
    document.getElementById("currentDate").value = today;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.style.color = "green";
        msg.innerHTML = "✅ Message sent successfully!";
        setTimeout(() => msg.innerHTML = "", 5000);
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error.message);
        msg.style.color = "red";
        msg.innerHTML = "❌ Failed to send message.";
        setTimeout(() => msg.innerHTML = "", 5000);
      });
  });

  // Highlight active section on scroll
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition === 0) {
      $(".navbar li a").removeClass("active");
      $(".navbar li a[href='#home']").addClass("active");
      return;
    }

    $("section[id]").each(function () {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();

      if (scrollPosition >= offset - 120 && scrollPosition < offset + height - 120) {
        $(".navbar li a").removeClass("active");
        $(".navbar li a[href='#" + target + "']").addClass("active");
      }
    });
  }

  // Initial run
  updateActiveSection();
});
