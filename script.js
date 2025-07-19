$(document).ready(function() { 
  // Sticky header
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
    updateActiveSection();
  });

  // Mobile menu functionality
  $('.menu_icon').click(function(e) {
    e.preventDefault();
    $('.navbar').addClass('show');
    $('.close-btn').show();
    $('.menu_icon').hide();
    $('body').addClass('no-scroll');
  });

  // Combined click handler for links and close button
  $('.navbar').on('click', 'li a, .close-btn', function(e) {
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
    
    // Handle smooth scrolling
    var target = $(this).attr("href");
    if ($(target).hasClass("active-section")) return;
    
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

  // Initial content revealing js
  ScrollReveal({ distance: "100px", duration: 2000, delay: 200 });
  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", { origin: "left" });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", { origin: "right" });
  ScrollReveal().reveal(".project-title, .contact-title", { origin: "top" });
  ScrollReveal().reveal(".projects, .contact", { origin: "bottom" });
  ScrollReveal().reveal(".skills-title", { origin: "top" });
  ScrollReveal().reveal(".skill", { origin: "bottom" });

  // Contact form
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = "Message sent successfully";
        setTimeout(function() { msg.innerHTML = ""; }, 5000);
        form.reset();
      })
      .catch(error => console.error('Error!', error.message));


  });

  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition === 0) {
      $(".navbar li a").removeClass("active");
      $(".navbar li a[href='#home']").addClass("active");
      return;
    }
    
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
      
      if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
        $(".navbar li a").removeClass("active");
        $(".navbar li a[href='#" + target + "']").addClass("active");
      }
    });
  }

$('#resumeBtn').click(function(e) {
  e.preventDefault();
  const driveUrl = $(this).attr('href');
  
  // Open in new tab for viewing
  window.open(driveUrl, '_blank');
  
  // Force download (alternative method for Google Drive)
  const downloadUrl = driveUrl.replace('/view?usp=sharing', '/export?format=pdf');
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'Jeevan_Abishek_Data_Analyst.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
});
