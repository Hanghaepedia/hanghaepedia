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
  var slideItems = document.querySelectorAll('.slide');
  var manualBtns = document.querySelectorAll('.manual-btn');

  // Set the initial slide index
  var currentSlide = 0;

  // Function to update the slider
  function updateSlider() {
    slides.style.transform = 'translateX(' + -currentSlide * 103 + '%)';
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
