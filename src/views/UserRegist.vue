<template>
  <div class="regist">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div class="col-md-8 col-lg-6">
          <div class="login d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div id="regiForm" class="col-md-9 col-lg-8 mx-auto">
                  <h3 class="login-heading mb-4">회원가입</h3>
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputId"
                      v-model="user.userId"
                      class="form-control"
                      placeholder="아이디"
                      @focusout="idCheck()"
                      v-bind:valid="idAllow"
                      required
                      autofocus
                    />
                    <label for="inputId">아이디</label>
                    <div
                      v-if="!this.idCondition && !idAllow"
                      class="valid-feedback"
                    >
                      가능합니다
                    </div>
                    <div v-else class="invalid-feedback">
                      중복된 아이디입니다
                    </div>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="password"
                      name="user_pw"
                      v-model="user.userPw"
                      id="inputPassword"
                      class="form-control"
                      placeholder="비밀번호"
                      required
                    />
                    <label for="inputPassword">비밀번호</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="text"
                      name="user_name"
                      v-model="user.userName"
                      id="inputName"
                      class="form-control"
                      placeholder="닉네임"
                      @focusout="nameCheck()"
                      v-bind:valid="nameAllow"
                      required
                    />
                    <label for="inputName">닉네임</label>
                    <div
                      v-if="!this.nameCondition && !nameAllow"
                      class="valid-feedback"
                    >
                      가능합니다
                    </div>
                    <div v-else class="invalid-feedback">
                      중복된 닉네임입니다
                    </div>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="number"
                      name="user_age"
                      v-model="user.userAge"
                      id="inputAge"
                      class="form-control"
                      placeholder="비밀번호"
                      required
                    />
                    <label for="inputAge">나이</label>
                  </div>
                  <button
                    class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                    @click="doUserRegister"
                  >
                    Sign in
                  </button>
                  <router-link
                    to="/"
                    class="text-white btn btn-lg btn-success btn-block btn-login text-uppercase font-weight-bold mb-2"
                    >돌아가기</router-link
                  >
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
const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI; // env.local에 설정되어있는 서버 url
const axios = require('axios');
export default {
  name: 'regist',
  computed: {
    idCondition() {
      return !this.idAllow;
    },
    nameCondition() {
      return !this.nameAllow;
    },
  },
  data() {
    // 해당 컴포넌트에서 사용되는 데이터 정의 => user라는 객체로? 객체 안에는 id와 password 변수 존재
    return {
      user: {
        userId: '',
        userPw: '',
        userName: '',
        userAge: '',
      },
      idAllow: false,
      nameAllow: false,
      message: '',
    };
  },
  methods: {
    doUserRegister() {
      if (this.idAllow && this.nameAllow) {
        axios
          .post(`${MY_SERVER_HOST}user`, this.user)
          .then(() => {
            this.$router.replace('/');
            alert('회원가입이 완료되었습니다');
          })
          .catch(() => {
            alert('알수없는 이유로 회원가입에 실패했습니다');
          });
      } else {
        this.$bvToast.toast(`회원가입 정보를 다시확인하세요`, {
          title: '회원가입 실패',
          autoHideDelay: 5000,
        });
      }
    },
    idCheck() {
      const regiForm = document.getElementById('regiForm');
      if (this.user.userId != '') {
        regiForm.classList.remove('was-validated');
        axios
          .get(`${MY_SERVER_HOST}user/check/id/${this.user.userId}`)
          .then((response) => {
            this.idAllow = response.data;
            if (response.data == false) {
              this.user.userId = '';
            }
            regiForm.classList.add('was-validated');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    nameCheck() {
      const regiForm = document.getElementById('regiForm');

      if (this.user.userName != '') {
        regiForm.classList.remove('was-validated');
        axios
          .get(`${MY_SERVER_HOST}user/check/name/${this.user.userName}`)
          .then((response) => {
            this.nameAllow = response.data;
            if (response.data == false) {
              this.user.userName = '';
            }
            regiForm.classList.add('was-validated');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
<style scoped>
input {
  font-size: 30px;
  font-family: 'Anton' !important;
}
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
  padding: var(--input-padding-y) var(--input-padding-x);
  height: 80px;
  width: 93%;
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
