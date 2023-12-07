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


// 로그인
const login = () => {
  userId_receive = $('#login-user-id').val();
  password_receive = $('#login-password').val();

  // 유효성 검사
  if (userId_receive === '') {
    alert('아이디를 입력해주세요!');
    return;
  } else if (password_receive === '') {
    alert('비밀번호를 입력해주세요!');
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
    alert('이름을 입력해주세요!');
    return;
  } else if (userId_receive === '') {
    alert('아이디를 입력해주세요!');
    return;
  } else if (password_receive === '') {
    alert('비밀번호를 입력해주세요!');
    return;
  } else if (password_check_receive === '') {
    alert('비밀번호 확인을 입력해주세요!');
    return;
  } else if (password_receive !== password_check_receive) {
    alert('비밀번호가 다릅니다.');
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

        alert('회원가입 완료!');
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


//fetch 하기
$(document).ready(function(){

  
 
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  
function movie(){
	// 영화진흥위원회 Open API 호출
  let base_url = "https://image.tmdb.org/t/p/w500"
  let url = 'https://api.themoviedb.org/3/movie/popular?api_key=127d1ec8dfd28bfe9f6b8d15f689cdd4&language=ko-KR&page=1'

  fetch(url).then(res => res.json()).then((data) => {
    let movies = data['results'];
    let rand = Math.floor(Math.random() * 10)
    let today= movies[rand]
    let today_img = base_url+today['backdrop_path']
    let title=today['title']
    let overview=today['overview']
    $('#today').css('background-image',`url('${today_img}')`)
    $('#today > h1').text(title)
    $('#overview').text(overview)
    // let temp_html=`<div id="carousel"class="carousel-item active"><img src="${today_img}" class="d-block w-100" alt="..."></div>`
    // $('#car').append(temp_html);
    

    for(var i=0 ; i<movies.length; i++){
      let top_movie = movies[i]
      let top_img= base_url+top_movie['poster_path']
      // let top_today=base_url+top_movie['backdrop_path']
      let temp_html2 = '<div class="swiper-slide"><img src="' + top_img + '" alt="" loading="lazy"/><div class="swiper-lazy-preloader"></div></div>'
      swiper.appendSlide([temp_html2]);
      
      }
    });


}
movie();

  
});


function getDirection() {
  var windowWidth = window.innerWidth;
  var direction = window.innerWidth <= 760 ? "horizontal" : "horizontal";

  return direction;
}