// ### 기본 실행 ###
// 쿠키에 토큰 있는지 확인 후,
// 토큰이 존재하면 로그인 상태, 없으면 로그아웃 상태로 보여준다.
$(function () {
  let token = $.cookie('mytoken');

  if (!!token) {
    $('#login-btn').hide();
    $('#signup-btn').hide();
  } else {
    $('#logout-btn').hide();
  }
});

// 유효성(validation) 검증
const inputValChk = (inputType, inputId) => {
  let regex;

  if (inputType === 'userName') {
    // 한글 이름 가능, 영어 이름 가능
    regex = /^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/;
  } else if (inputType === 'userId') {
    // 소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
    regex = /^[a-z0-9_-]{4,20}$/;
  } else if (inputType === 'password') {
    //  8 ~ 10자 영문, 숫자 조합
    regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
  }

  if (!regex.test($('#' + inputId).val())) {
    $('#' + inputId).addClass('input-form-error');
  } else {
    $('#' + inputId).removeClass('input-form-error');
  }
};

// 로그인
const login = () => {
  userId_receive = $('#login-user-id').val();
  password_receive = $('#login-password').val();

  // 유효성 검사
  if (userId_receive === '') {
    $('#login-user-id').addClass('input-form-error');
    return;
  } else if (password_receive === '') {
    $('#login-password').addClass('input-form-error');
    return;
  }
  $.ajax({
    type: 'POST',
    url: '/api/login',
    data: { userId: $('#login-user-id').val(), password: $('#login-user-pw').val() },
    success: function (response) {
      if (response['result'] == 'success') {
        // 로그인이 정상적으로 되면, 토큰을 받아옵니다.
        // 이 토큰을 mytoken이라는 키 값으로 쿠키에 저장합니다.
        $.cookie('mytoken', response['token']);

        window.location.href = '/';
      } else {
        // 로그인이 안되면 에러메시지를 띄웁니다.
        alert(response['msg']);
      }
    },
  });
};

// 회원가입
const signup = () => {
  userName_receive = $('#sign-user-name').val();
  userId_receive = $('#sign-user-id').val();
  password_receive = $('#sign-password').val();
  password_check_receive = $('#password-check').val();

  // 유효성 검사
  if (userName_receive === '') {
    $('#sign-user-name').addClass('input-form-error');
    return;
  } else if (userId_receive === '') {
    $('#sign-user-id').addClass('input-form-error');
    return;
  } else if (password_receive === '') {
    $('#sign-password').addClass('input-form-error');
    return;
  } else if (password_check_receive === '') {
    $('#password-check').addClass('input-form-error');
    return;
  } else if (password_receive !== password_check_receive) {
    $('#password-check').addClass('input-form-error');
    return;
  }
  $.ajax({
    type: 'POST',
    url: '/api/signup',
    data: {
      userName: userId_receive,
      userId: userId_receive,
      password: password_receive,
    },
    success: function (response) {
      if (response['result'] == 'success') {
        // 로그인이 정상적으로 되면, 토큰을 받아옵니다.
        // 이 토큰을 mytoken이라는 키 값으로 쿠키에 저장합니다.
        $.cookie('mytoken', response['token']);

        window.location.href = '/';
      } else {
        // 로그인이 안되면 에러메시지를 띄웁니다.
        alert(response['msg']);
      }
    },
  });
};

// 로그아웃
const logout = () => {
  $.removeCookie('mytoken');
  window.location.href = '/';
};

// 자동 슬라이드
document.addEventListener('DOMContentLoaded', function () {
  // Get the slider elements
  var slides = document.querySelector('.slides');
  var slideItems = document.querySelectorAll('.auto-slide');
  var manualBtns = document.querySelectorAll('.manual-btn');

  // Set the initial slide index
  var currentSlide = 0;

  // Function to update the slider
  function updateSlider() {
    slides.style.transform = 'translateX(' + -currentSlide * 1120 + 'px)';
  }

  // Function to handle manual button click
  function handleManualBtnClick(index) {
    currentSlide = index;
    updateSlider();
  }

  // Event listeners for manual buttons
  manualBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
      handleManualBtnClick(index);
    });
  });

  // Function to auto slide
  function autoSlide() {
    currentSlide = (currentSlide + 1) % slideItems.length;
    updateSlider();
  }

  // Set interval for auto slide (adjust the duration as needed)
  var autoSlideInterval = setInterval(autoSlide, 5000);

  // Pause auto slide on hover
  slides.addEventListener('mouseenter', function () {
    clearInterval(autoSlideInterval);
  });

  // Resume auto slide on mouse leave
  slides.addEventListener('mouseleave', function () {
    autoSlideInterval = setInterval(autoSlide, 5000);
  });
});

//fetch 하기
$(document).ready(function () {
  var swiper = new Swiper('.mySwiper', {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // function movie() {
  //   // 영화진흥위원회 Open API 호출
  //   let base_url = 'https://image.tmdb.org/t/p/w500';
  //   let url =
  //     'https://api.themoviedb.org/3/movie/popular?api_key=127d1ec8dfd28bfe9f6b8d15f689cdd4&language=ko-KR&page=1';

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       let movies = data['results'];

  //       for (var i = 0; i < movies.length; i++) {
  //         let top_movie = movies[i];
  //         let top_img = base_url + top_movie['poster_path'];
  //         let temp_html2 =
  //           '<div class="swiper-slide"><img src="' +
  //           top_img +
  //           '" alt="" loading="lazy"/><div class="swiper-lazy-preloader"></div></div>';
  //         let temp_html = `<div id="swiper-slide"class="swiper-slide"><img src="${top_img}" alt="" loading="lazy"><div class="swiper-lazy-preloader"></div></div>`;
  //         swiper.appendSlide([temp_html2]);
  //         // $('#swiper-wrapper').append(temp_html2);
  //       }
  //     });
  // }
  // movie();

  function movie() {
    // 영화진흥위원회 Open API 호출
    let base_url = 'https://image.tmdb.org/t/p/w500';
    let url =
      'https://api.themoviedb.org/3/movie/popular?api_key=127d1ec8dfd28bfe9f6b8d15f689cdd4&language=ko-KR&page=1';

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let movies = data['results'];
        let rand = Math.floor(Math.random() * 10);
        let today = movies[rand];
        let today_img = base_url + today['backdrop_path'];
        let title = today['title'];
        let overview = today['overview'];
        $('#today').css('background-image', `url('${today_img}')`);
        $('#today > h1').text(title);
        $('#overview').text(overview);
        // let temp_html=`<div id="carousel"class="carousel-item active"><img src="${today_img}" class="d-block w-100" alt="..."></div>`
        // $('#car').append(temp_html);

        for (var i = 0; i < movies.length; i++) {
          let top_movie = movies[i];
          let top_img = base_url + top_movie['poster_path'];
          // let top_today=base_url+top_movie['backdrop_path']
          let temp_html2 =
            '<div class="swiper-slide"><img src="' +
            top_img +
            '" alt="" loading="lazy"/><div class="swiper-lazy-preloader"></div></div>';
          swiper.appendSlide([temp_html2]);
        }
      });
  }
  movie();
});

function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? 'horizontal' : 'horizontal';

  return direction;
}
