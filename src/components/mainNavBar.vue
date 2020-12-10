<template>
  <b-navbar class="outerDiv">
    <b-navbar-brand href="#">
      <img src="@/assets/img/House-logo2.png" height="60" alt="happyhouse" />
    </b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <!-- 우측 메뉴-->
      <b-navbar-nav class="outerDiv ml-auto">
        <b-nav-item v-b-toggle.sidebar-deal>
          <button class="btn navbtn">
            <font-awesome-icon icon="house-user" />&nbsp;&nbsp;<strong
              >실거래가 검색</strong
            >
          </button>
        </b-nav-item>
        <b-nav-item v-b-toggle.sidebar-report>
          <button class="btn navbtn btn-waring">
            <font-awesome-icon icon="chart-area" />&nbsp;&nbsp;<strong
              >최근거래동향</strong
            >
          </button>
        </b-nav-item>
        <b-nav-item
          v-if="fetchedUserName != null"
          v-b-toggle.sidebar-attention
          @click="bookMarkBtn"
        >
          <button class="btn navbtn btn-waring">
            <font-awesome-icon icon="flag-checkered" />&nbsp;&nbsp;내 관심매물
          </button>
        </b-nav-item>
        <b-nav-item>
          <a class="navbtn mr-3" v-b-toggle.chat-popup>
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
              class="bi bi-chat"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
              />
            </svg>
            &nbsp;&nbsp;<strong>채팅방</strong>
          </a>
        </b-nav-item>
        <b-nav-item>
          <a class="navbtn mr-3" v-b-toggle.notice-popup @click="doFetchNotice">
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 20 20"
              class="bi bi-journal-text"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"
              />
              <path
                d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"
              />
              <path
                fill-rule="evenodd"
                d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            &nbsp;&nbsp;<strong>공지사항</strong>
          </a>
        </b-nav-item>
        <b-nav-item
          v-if="fetchedUserName == null"
          class="user-text"
          @click="moveLoginPage"
          href="#"
          style="font-size:11px;"
          >로그인</b-nav-item
        >
        <b-nav-item
          v-if="fetchedUserName == null"
          class="user-text mr-4"
          @click="moveJoinPage"
          style="font-size:11px;"
          >회원가입</b-nav-item
        >

        <b-nav-item-dropdown v-if="fetchedUserName != null" no-caret>
          <template #button-content>
            <div class="row outerDiv userStatus">
              <div class="row ml-2">
                <div class="col-md-3 mt-1">
                  <img
                    src="@/assets/img/default-profile2.png"
                    style="width:28px;height:28px;margin-top:auto;"
                  />
                </div>
                <div class="col-md-8 offset-md-1">
                  <div class="user_name_text">{{ fetchedUserName }}</div>
                  <div class="user_type_text">일반사용자</div>
                </div>
              </div>
            </div>
          </template>
          <div class="row">
            <div
              class="col-md-10 offset-md-1 mt-2 mb-4"
              style="text-align:center"
            >
              <div class="myPageTitle my-4">
                {{ fetchedUserName }}님 <br />반갑습니다.
              </div>

              <img
                src="@/assets/img/default-profile2.png"
                style="width:28px;height:28px;"
              />
            </div>
          </div>
          <b-dropdown-item v-b-toggle.sidebar-mypage
            ><font-awesome-icon icon="address-book" />&nbsp;&nbsp;
            마이페이지</b-dropdown-item
          >
          <b-dropdown-item @click="doLogout">
            <font-awesome-icon
              icon="sign-out-alt"
            />&nbsp;&nbsp;로그아웃</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MainNavBar',

  computed: {
    ...mapGetters([
      'fetchedDong',
      'fetchedGugunTradingLabel',
      'fetchedGugunTradingData',
      'fetchedUserName',
      'fetchedUserId',
    ]),
  },
  methods: {
    bookMarkBtn() {
      this.$store
        .dispatch('FETCH_BOOK_MARK_DEALS', this.fetchedUserId)
        .then(() => console.log('관심매물 패치완료'));
    },
    moveLoginPage() {
      this.$router.push('/login');
    },
    moveJoinPage() {
      this.$router.push('/regist');
    },
    doLogout() {
      this.$store
        .dispatch('LOGOUT')
        .then(alert('로그아웃 되었습니다.'));
    },
    doFetchNotice() {
      this.$store
        .dispatch('FETCH_NOTICES');
    },
  },
};
</script>
<style>
.navbar-expand .navbar-nav .dropdown-menu {
  margin-left: -3rem;
}
</style>
<style scoped>
.navbtn {
  font-family: 'BMHANNAAir' !important;

  color: #000;
  font-size: 1.15rem;
}
.navbtn:hover {
  font-weight: bold;
  color: #fff;
}
.outerDiv {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.user_name_text {
  color: #222;
  font-family: AppleSDGothicNeoL;
  font-size: 0.8rem;
  font-weight: bold;
}
.user_type_text {
  font-family: AppleSDGothicNeoL;
  font-size: 0.7rem;
  color: #666;
}
.navbar {
  border: 1px solid rgb(0, 0, 0, 0.22);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.navbar:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.user-text {
  border-radius: 20px;
  margin-left: 0px;
  margin-right: 0px;
}

.user-text > a {
  margin-top: 3px;
  font-size: 12px;
  color: #666666 !important;
  font-weight: 400;
}
.user-text > a:hover {
  font-weight: bold;
  font-size: 12px;
  color: #fff !important;
  background-color: #12232e;
}
.navbar-light .navbar-nav .nav-link {
  border-radius: 20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: black;
  font-size: 0.9rem;
  font-weight: 600;
}
.navbar-light .navbar-nav .nav-link:hover {
  background-color: #ef2a37;
  color: aliceblue;
}
</style>
