<template>
  <div class="login">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="login-heading mb-4">로그인</h3>

                  <div class="form-label-group">
                    <input
                      type="text"
                      id="user-id-input"
                      class="form-control"
                      placeholder="아이디"
                      v-model="user.userId"
                      required
                      autofocus
                    />
                    <label for="user-id-input">아이디</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="password"
                      id="user-pw-input"
                      class="form-control"
                      v-model="user.userPw"
                      placeholder="Password"
                      required
                    />
                    <label for="user-pw-input">비밀번호</label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1"
                      >아이디 기억하기</label
                    >
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                    @click="doLogin"
                  >
                    로그인
                  </button>

                  <a
                    class="text-white btn btn-lg btn-success btn-block btn-login text-uppercase font-weight-bold mb-2"
                    ><router-link to="/" style="color:#fff"
                      >돌아가기</router-link
                    ></a
                  >
                  <div class="text-center">
                    <a class="small" href="/user/password"
                      >비밀번호를 잊어버리셨나요?</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data() {
    // 해당 컴포넌트에서 사용되는 데이터 정의 => user라는 객체로? 객체 안에는 id와 password 변수 존재
    return {
      user: {
        userId: '',
        userPw: '',
      },
      message: '',
    };
  },
  methods: {
    doLogin() {
      // id,pw 쓰고 엔터누르거나, 로그인버튼 눌렀을 때 실행되는 로그인 함수
      this.$store // 현재 컴포넌트에서 저장소 접근하여
        .dispatch('LOGIN', this.user) // 비동기적인 Actions에 접근한다 (현 컴포넌트의 user 데이터를 가지고, 저장소에 LOGIN이라는 Actions에 접근)
        .then(() => this.$router.replace('/')) // 정상적으로 접근했다면 현 컴포넌트의 nextRoute url 값을 대체한다.???
        .catch(() => alert('로그인에 실패했습니다.')); // 비정상적으로 접근했다면, 메세지만 출력한다.
    },
  },
};
</script>
<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 1.5rem;
}
input {
  font-size: 1.5rem;
  font-family: 'Anton' !important;
}
.login,
.image {
  min-height: 100vh;
}

.bg-image {
  background-image: url('https://source.unsplash.com/random/?natural&600x1200');
  background-size: cover;
  background-position: center;
}

.login-heading {
  font-weight: 300;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
  border-radius: 2rem;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: 80px;
  width: 93%;
  font-size: 14px;
  border-radius: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  cursor: text;
  /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: px;
  color: #777;
}
</style>
