<template>
  <!--로그인 되었을때 시작-->
  <b-sidebar
    v-if="fetchedBookMarkDeals.length > 0"
    class="attentionSideBar"
    id="sidebar-attention"
    title="💡  내 관심 매물"
    right
    shadow
  >
    <!-- 새로운 카드-->
    <div class="container mt-4">
      <div class="row px-2">
        <div
          v-for="(item, index) in fetchedBookMarkDeals"
          class="col-md-12 col-lg-12 px-1"
          :key="'deal' + index"
        >
          <div class="service__card">
            <div class="service__card-content">
              <div class="service__card-title">
                <a
                  v-b-toggle.sidebar-detail
                  :value="index"
                  @click="detailBtn($event)"
                  class="mx-0"
                  style="color: #222; font-size: 20px"
                  >{{ item.aptName }}</a
                >
              </div>
              <div class="service__card-descr">아파트</div>
              <p
                style="font-size: 0.7rem; color: #818a91; margin-bottom: 2px"
                class="card-text"
              >
                {{ item.dong }} {{ item.jibun }}
              </p>
              <hr />
              <p class="card-text" style="font-size: 12px; color: #666">
                <strong>최근 거래일</strong><br />
                {{ item.dealYear }} 년 {{ item.dealMonth }} 월
                {{ item.dealDay }} 일
              </p>
            </div>
            <a
              @click="deleteBookmark($event)"
              class="btn btn-danger btn2"
              :value="item.no"
              >삭제
            </a>
            <a
              @click="detailBookMark($event)"
              class="btn btn-primary"
              v-b-toggle.sidebar-ateention-detail
              :value="index"
              >보기
            </a>
          </div>
        </div>
      </div>
    </div>
  </b-sidebar>

  <b-sidebar
    v-else
    class="attentionSideBar"
    id="sidebar-attention"
    title="내 관심 매물"
    right
    shadow
  >
    <div id="container">
      <div id="error-box">
        <div class="dot"></div>
        <div class="dot two"></div>
        <div class="face2">
          <div class="eye"></div>
          <div class="eye right"></div>
          <div class="mouth sad"></div>
        </div>
        <div class="shadow move"></div>
        <div class="message">
          <h1 class="mt-2 alert" style="font-size:1.3rem;">Opps!</h1>
          <p style="font-size:1rem;color:#fff">
            등록된 관심매물이 없어요!
          </p>
        </div>
        <button v-b-toggle.sidebar-attention class="button-box">
          <h1 class="red">돌아가기</h1>
        </button>
      </div>
    </div>
  </b-sidebar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:400,700');
.service__card .btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  bottom: 1.8rem;
  right: 1rem;
  border-radius: 10%;
  padding: 0;
  width: 5rem;
  height: 3rem;
  transition: all 0.25s ease-in-out;
}
.service__card .btn2 {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  bottom: 1.8rem;
  right: 7rem;
  border-radius: 10%;
  padding: 0;
  width: 5rem;
  height: 3rem;
  transition: all 0.25s ease-in-out;
}
h1 {
  font-size: 0.9em;
  font-weight: 100;
  letter-spacing: 3px;
  padding-top: 5px;
  color: #fcfcfc;
  padding-bottom: 5px;
  text-transform: uppercase;
}

.green {
  color: #4ec07d;
}

.red {
  color: #e96075;
}

.alert {
  font-weight: 700;
  letter-spacing: 5px;
}

p {
  margin-top: -5px;
  font-size: 0.5em;
  font-weight: 100;
  color: #5e5e5e;
  letter-spacing: 1px;
}

button,
.dot {
  cursor: pointer;
}

#error-box {
  font-family: 'Spoqa Han Sans';
  position: absolute;
  width: 80%;
  margin-top: 8rem;
  height: 60%;
  right: 10%;
  background: linear-gradient(to bottom left, #ef8d9c 40%, #ffc39e 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px #cbcdd3;
}

.dot {
  width: 8px;
  height: 8px;
  background: #fcfcfc;
  border-radius: 50%;
  position: absolute;
  top: 4%;
  right: 6%;
}
.dot:hover {
  background: #c9c9c9;
}

.two {
  right: 12%;
  opacity: 0.5;
}

.face {
  position: absolute;
  width: 22%;
  height: 22%;
  background: #fcfcfc;
  border-radius: 50%;
  border: 1px solid #777777;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: bounce 1s ease-in infinite;
}

.face2 {
  position: absolute;
  width: 22%;
  height: 22%;
  background: #fcfcfc;
  border-radius: 50%;
  border: 1px solid #777777;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: roll 3s ease-in-out infinite;
}

.eye {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #777777;
  border-radius: 50%;
  top: 40%;
  left: 20%;
}

.right {
  left: 68%;
}

.mouth {
  position: absolute;
  top: 43%;
  left: 41%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.happy {
  border: 2px solid;
  border-color: transparent #777777 #777777 transparent;
  transform: rotate(45deg);
}

.sad {
  top: 49%;
  border: 2px solid;
  border-color: #777777 transparent transparent #777777;
  transform: rotate(45deg);
}

.shadow {
  position: absolute;
  width: 21%;
  height: 3%;
  opacity: 0.5;
  background: #777777;
  left: 40%;
  top: 43%;
  border-radius: 50%;
  z-index: 1;
}

.scale {
  animation: scale 1s ease-in infinite;
}

.move {
  animation: move 3s ease-in-out infinite;
}

.message {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 40%;
  top: 47%;
}

.button-box {
  position: absolute;
  background: #fcfcfc;
  width: 50%;
  height: 10%;
  border-radius: 20px;
  font-family: 'Spoqa Han Sans';
  font-weight: 500;
  top: 78%;
  left: 25%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba(119, 119, 119, 0.5);
  transition: all 0.5s ease-in-out;
}
.button-box:hover {
  background: #efefef;
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}
@keyframes scale {
  50% {
    transform: scale(0.9);
  }
}
@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}
@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}
footer {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 1em;
  text-transform: uppercase;
  padding: 10px;
  font-family: 'Spoqa Han Sans';
}
</style>
<style>
.b-sidebar > .b-sidebar-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

#sidebar-attention {
  width: 30%;
}
</style>

<script>
import { mapGetters } from 'vuex';
const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI; // env.local에 설정되어있는 서버 url
export default {
  computed: {
    ...mapGetters([
      'fetchedDeals',
      'fetchedDong',
      'fetchedMap',
      'fetchedMarker',
      'fetchedTargetDealIdx',
      'fetchedUserId',
      'fetchedBookMarkDeals',
    ]),
  },
  methods: {
    deleteBookmark($event) {
      var no = $event.target.getAttribute('value');
      const axios = require('axios');
      axios
        .delete(
          `${MY_SERVER_HOST}attention/bookmark/${this.fetchedUserId}/${no}`
        )
        .then(() => {
          this.$store
            .dispatch('FETCH_BOOK_MARK_DEALS', this.fetchedUserId)
            .then(() => {
              this.makeDeleteSuccessToast();
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    makeDeleteSuccessToast() {
      this.$bvToast.toast('관심매물이 삭제되었습니다..', {
        title: '알림',
        variant: 'success',
        solid: true,
      });
    },
    detailBookMark($event) {
      var index = $event.target.getAttribute('value');
      this.$store.dispatch('FETCH_BOOKMARK_DEAL_IDX', index);
    },
  },
};
</script>
