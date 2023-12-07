// ### 기본 실행 ###
// 쿠키에 토큰 있는지 확인 후,
// 토큰이 존재하면 로그인 상태, 없으면 로그아웃 상태로 보여준다.
$(function () {
  let token = $.cookie('mytoken');
  console.log('token : ', !!token);
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
