<template>
  <b-sidebar id="sidebar-mypage" title="🙍‍♂️  마이페이지" shadow>
    <div class="container-fulid">
      <form id="mypageForm" class="was-validated">
        <!--아이디 -->
        <div>
          <div class="form-label-group">
            <input
              type="text"
              id="mypage-id"
              v-bind:value="fetchedUserId"
              class="form-control"
              placeholder="아이디"
              required
              disabled
              autofocus
            />
            <label for="mypage-id">아이디</label>
          </div>
        </div>

        <!--닉네임 노출창-->
        <div>
          <div v-if="!isModify" class="form-label-group">
            <input
              type="text"
              id="mypage-nickname"
              v-bind:value="fetchedUserName"
              class="form-control"
              placeholder="닉네임"
              disabled
              required
              autofocus
            />
            <label for="mypage-nickname">{{ message }}</label>
          </div>
          <!--닉네임 변경요청시-->
          <div v-else class="form-label-group">
            <input
              type="text"
              id="modify-nickname"
              v-model="userName"
              class="form-control"
              @focusout="nameCheck"
              placeholder="닉네임"
              required
              autofocus
            />
            <label for="modify-nickname">닉네임</label>
            <div
              v-if="!this.nameCondition && !nameAllow"
              class="valid-feedback"
            >
              가능합니다
            </div>
            <div v-else class="invalid-feedback">
              닉네임을 확인해주세요
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3" v-if="isModify">
            <button
              @click.prevent="doModify"
              class="btn btn-lg btn-info text-white btn-block btn-login text-uppercase font-weight-bold mb-2"
            >
              수정 반영
            </button>
          </div>
          <div v-if="isModify" class="col-md-3">
            <button
              @click.prevent="modifyStop"
              class="btn btn-lg btn-danger text-white btn-block btn-login text-uppercase font-weight-bold mb-2"
            >
              수정 취소
            </button>
          </div>
          <div v-else class="col-md-6">
            <button
              @click.prevent="modifyStart"
              class="btn btn-lg btn-danger text-white btn-block btn-login text-uppercase font-weight-bold mb-2"
            >
              닉네임 변경하기
            </button>
          </div>

          <div class="col-md-6">
            <button
              class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
            >
              비밀번호 변경
            </button>
          </div>
        </div>

        <figure aria-hidden="true">
          <div class="person-body"></div>
          <div class="neck skin"></div>
          <div class="head skin">
            <div class="eyes"></div>
            <div class="mouth"></div>
          </div>
          <div class="hair"></div>
          <div class="ears"></div>
          <div class="shirt-1"></div>
          <div class="shirt-2"></div>
        </figure>
      </form>
    </div>
  </b-sidebar>
</template>

<style scoped>
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
.form-label-group >>> #mypage {
  font-size: 2rem;
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
  width: 100%;
  height: 80px;
  border-radius: 2rem;
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
  font-size: 12px;
  color: #777;
}

form {
  --background: white;
  --border: rgba(0, 0, 0, 0.125);
  --borderDark: rgba(0, 0, 0, 0.25);
  --borderDarker: rgba(0, 0, 0, 0.5);
  --bgColorH: 0;
  --bgColorS: 0%;
  --bgColorL: 98%;
  --fgColorH: 210;
  --fgColorS: 50%;
  --fgColorL: 38%;
  --shadeDark: 0.3;
  --shadeLight: 0.7;
  --shadeNormal: 0.5;
  --borderRadius: 0.125rem;
  --highlight: #306090;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-shadow: 0 1rem 1rem -0.75rem var(--border);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

form .email,
form .email a {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.825rem;
  order: 4;
  text-align: center;
  margin-top: 0.25rem;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  display: inline;
}

form a:hover {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  transition: color 0.25s;
}

form a:focus {
  color: hsl(var(--fgColorH), var(--fgColorS), calc(var(--fgColorL) * 0.85));
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

form > div {
  order: 2;
}

label {
  display: flex;
  flex-direction: column;
}

.label-show-password {
  order: 3;
}

label > span {
  color: var(--borderDarker);
  display: block;
  font-size: 0.825rem;
  margin-top: 0.625rem;
  order: 1;
  transition: all 0.25s;
}

label > span.required::after {
  content: '*';
  color: #dd6666;
  margin-left: 0.125rem;
}

label input {
  order: 2;
  outline: none;
}

label input::placeholder {
  color: var(--borderDark);
}

/* trick from https://css-tricks.com/snippets/css/password-input-bullet-alternatives/ */
label input[name='password'] {
  -webkit-text-security: disc;
}

input[name='show-password']:checked ~ div label input[name='password'] {
  -webkit-text-security: none;
}

label:hover span {
  color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

input[type='checkbox'] + div label:hover span::before,
label:hover input.text {
  border-color: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

label input.text:focus,
label input.text:active {
  border-color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  box-shadow: 0 1px
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
}

input.text:focus + span,
input.text:active + span {
  color: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
}

input {
  border: 1px solid var(--border);
  border-radius: var(--borderRadius);
  box-sizing: border-box;
  font-size: 1rem;
  height: 2.25rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  order: 2;
  padding: 0.25rem 0.5rem;
  width: 15rem;
  transition: all 0.25s;
}

input[type='submit'] {
  color: hsl(var(--bgColorH), var(--bgColorS), var(--bgColorL));
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
  font-size: 0.75rem;
  font-weight: bold;
  margin-top: 0.625rem;
  order: 4;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  padding-left: 0;
  text-transform: uppercase;
}

input[type='checkbox']:focus + label span::before,
input[type='submit']:focus {
  outline: 1px dashed
    hsl(
      var(--fgColorH),
      calc(var(--fgColorS) * 2),
      calc(var(--fgColorL) * 1.15)
    );
  outline-offset: 2px;
}

input[type='submit']:focus {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type='submit']:hover {
  background: hsl(
    var(--fgColorH),
    var(--fgColorS),
    calc(var(--fgColorL) * 0.85)
  );
}

input[type='submit']:active {
  background: hsl(
    var(--fgColorH),
    calc(var(--fgColorS) * 2),
    calc(var(--fgColorL) * 1.15)
  );
  transition: all 0.125s;
}

/** Checkbox styling */
.a11y-hidden {
  position: absolute;
  top: -1000em;
  left: -1000em;
}

input[type='checkbox'] + label span {
  padding-left: 1.25rem;
  position: relative;
}

input[type='checkbox'] + label span::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
}

input[type='checkbox']:checked + label span::after {
  content: '';
  display: block;
  position: absolute;
  top: 0.1875rem;
  left: 0.1875rem;
  width: 0.375rem;
  height: 0.375rem;
  border: 1px solid var(--borderDark);
  border-radius: var(--borderRadius);
  transition: all 0.25s;
  outline: 1px dashed transparent;
  outline-offset: 2px;
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

/** PERSON */
figure {
  --skinH: 30;
  --skinS: 100%;
  --skinL: 87%;
  --hair: rgb(180, 70, 60);
  background: hsl(var(--fgColorH), calc(var(--fgColorS) * 2), 95%);
  border: 1px solid rgba(0, 0, 0, 0.0625);
  border-radius: 50%;
  height: 0;
  margin: auto auto;
  margin-bottom: 2rem;
  order: 1;
  padding-top: 60%;
  position: relative;
  width: 60%;
  overflow: hidden;
}

figure div {
  position: absolute;
  transform: translate(-50%, -50%);
}

figure .skin {
  background: hsl(var(--skinH), var(--skinS), var(--skinL));
  box-shadow: inset 0 0 3rem
    hsl(var(--skinH), var(--skinS), calc(var(--skinL) * 0.95));
}

figure .head {
  top: 40%;
  left: 50%;
  width: 60%;
  height: 60%;
  border-radius: 100%;
  box-shadow: 0 -0.175rem 0 0.125rem var(--hair);
}

figure .ears {
  top: 47%;
  left: 50%;
  white-space: nowrap;
}

figure .ears::before,
figure .ears::after {
  content: '';
  background: hsl(var(--skinH), var(--skinS), var(--skinL));
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin: 0 2.1rem;
}

figure .head .eyes {
  top: 55%;
  left: 50%;
  white-space: nowrap;
}

@-webkit-keyframes blink {
  0%,
  90%,
  100% {
    height: 10px;
  }
  95% {
    height: 0;
  }
}

@keyframes blink {
  0%,
  90%,
  100% {
    height: 10px;
  }
  95% {
    height: 0px;
  }
}

figure .head .eyes::before,
figure .head .eyes::after {
  content: '';
  background: var(--borderDarker);
  border-radius: 50%;
  width: 10px;
  height: 10px;
  display: inline-block;
  margin: 0 0.5rem;
  -webkit-animation: blink 5s infinite;
  animation: blink 5s infinite;
  transition: all 0.15s;
}

figure .head .mouth {
  border: 0.125rem solid transparent;
  border-bottom: 0.125rem solid var(--borderDarker);
  width: 25%;
  border-radius: 50%;
  transition: all 0.5s;
}

form:invalid figure .head .mouth {
  top: 75%;
  left: 50%;
  height: 10%;
}

form:valid figure .head .mouth {
  top: 60%;
  left: 50%;
  width: 40%;
  height: 40%;
}

figure .hair {
  top: 40%;
  left: 50%;
  width: 66.66%;
  height: 66.66%;
  border-radius: 100%;
  overflow: hidden;
}

figure .hair::before {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--hair);
  border-radius: 50%;
  top: -60%;
  left: -50%;
  box-shadow: 4rem 0 var(--hair);
}

figure .neck {
  width: 10%;
  height: 40%;
  top: 62%;
  left: 50%;
  background: hsl(var(--skinH), var(--skinS), calc(var(--skinL) * 0.94));
  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 0.25rem var(--border);
}

figure .person-body {
  width: 60%;
  height: 100%;
  border-radius: 50%;
  background: red;
  left: 50%;
  top: 126%;
  background: hsl(var(--fgColorH), var(--fgColorS), var(--fgColorL));
}

figure .shirt-1,
figure .shirt-2 {
  width: 12%;
  height: 7%;
  background: hsl(var(--bgColorH), var(--bgColorS), var(--bgColorL));
  top: 76%;
  left: 36.5%;
  transform: skew(-10deg) rotate(15deg);
}

figure .shirt-2 {
  left: 52.5%;
  transform: skew(10deg) rotate(-15deg);
}
</style>

<style>
.b-sidebar > .b-sidebar-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
#sidebar-mypage {
  width: 35%;
}
</style>

<script>
import { mapGetters } from 'vuex';
// @ is an alias to /src
const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI; // env.local에 설정되어있는 서버 url
const axios = require('axios');
export default {
  data() {
    return {
      isModify: false,
      isPasswordAllow: false,
      password: '',
      userName: '',
      nameAllow: false,
      message: '닉네임',
    };
  },
  computed: {
    ...mapGetters(['fetchedUserName', 'fetchedUserId', 'fetchedAccessToken']),
    nameCondition() {
      return !this.nameAllow;
    },
  },
  methods: {
    passwordCheck() {},
    nameCheck() {
      const mypage = document.getElementById('mypageForm');
      if (this.userName != '') {
        mypage.classList.remove('was-validated');
        axios
          .get(`${MY_SERVER_HOST}user/check/name/${this.userName}`)
          .then((response) => {
            this.nameAllow = response.data;
            if (response.data == false) {
              this.userName = '';
            }

            mypage.classList.add('was-validated');
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    modifyStart() {
      this.isModify = true;
      // 수정버튼 클릭시
    },
    modifyStop() {
      this.isModify = false;
    },
    makeSuccessToast() {
      this.$bvToast.toast('닉네임변경에 성공했습니다.', {
        title: '알림',
        variant: 'success',
        solid: true,
      });
    },
    doModify() {
      const config = {
        headers: { 'auth-token': this.fetchedAccessToken },
      };
      axios
        .get(
          `${MY_SERVER_HOST}user/change/${this.fetchedUserId}/${this.userName}`,
          config
        )
        .then((response) => {
          console.log(response.data);
          this.isModify = false;
          this.isPasswordAllow = false;
          (this.password = ''), (this.nameAllow = false);
          this.$store.dispatch('FETCH_USER_NAME', this.userName);
          this.makeSuccessToast();
        })
        .catch((error) => {
          console.log(error);
          this.isModify = false;
          this.isPasswordAllow = false;
          (this.password = ''), (this.userName = ''), (this.nameAllow = false);
        });
    },
  },
};
</script>
