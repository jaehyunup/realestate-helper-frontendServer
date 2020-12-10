<template>
  <b-sidebar
    v-if="fetchedDong == null"
    class="dealSideBar"
    id="sidebar-deal"
    right
    shadow
    bg-variant="dark"
    title="법정동 검색"
    text-variant="light"
  >
    <div class="container-fulid" style="margin-top:400px;">
      <div class="row">
        <div class="col-md-12 mx-1">
          <div>
            <b-form>
              <b-form-group
                id="input-group-1"
                label="법정동명을 입력해주세요"
                label-for="input-1"
                style="text-align: center"
              >
              </b-form-group>
            </b-form>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div v-if="fetchedDong == null">
          <div class="row form-group">
            <div class="col-md-8 offset-md-1">
              <b-form-input
                id="search-keyword-input"
                v-model="keyword"
                type="text"
                required
                placeholder="법정동"
              ></b-form-input>
            </div>
            <div class="col-md-3 p-0">
              <b-button
                @click="selectDong"
                class="btn input-block-level btn-signiture"
                variant="primary"
                >검색</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-sidebar>
  <!--로그인 되었을때 시작-->
  <b-sidebar
    v-else
    class="dealSideBar"
    id="sidebar-deal"
    title="💰  실거래정보"
    right
    shadow
  >
    <div class="mt-5 container-fulid">
      <div class="row">
        <div class="col-md-12 mx-1">
          <div>
            <b-form>
              <b-form-group
                id="input-group-1"
                label-for="input-1"
                style="text-align: center"
              >
              </b-form-group>
            </b-form>
          </div>
        </div>
      </div>

      <div class="col-md-12">
        <div class="row form-group">
          <div class="col-md-8 offset-md-1">
            <b-form-input
              id="search-keyword-input"
              v-model="keyword"
              type="text"
              required
              placeholder="법정동"
            ></b-form-input>
          </div>
          <div class="col-md-3 p-0">
            <b-button
              @click="selectDong"
              class="btn input-block-level btn-signiture"
              variant="primary"
              >검색</b-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 새로운 카드-->
    <div class="container">
      <div class="row px-2">
        <div
          v-for="(item, index) in fetchedDeals"
          class="col-md-12 col-lg-12 px-1"
          :key="'deal' + index"
        >
          <div class="service__card">
            <a
              href="#"
              class="service__card-top"
              :style="{
                backgroundImage: `url('${require('../assets/img/aptdefault.jpg')}')`,
              }"
            ></a>
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
              <p
                class="card-text money"
                style="font-size: 1.4rem; color: #222; margin-bottom: 1px"
              >
                {{
                  (
                    item.dealAmount.replace(',', '') + '0000'.toString()
                  ).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }}원
              </p>

              <p class="card-text" style="font-size: 14px; color: #666">
                {{ item.floor }}층, {{ item.area }}㎡
              </p>
              <hr />
              <p class="card-text" style="font-size: 12px; color: #666">
                <strong>최근 거래일</strong><br />
                {{ item.dealYear }} 년 {{ item.dealMonth }} 월
                {{ item.dealDay }} 일
              </p>
            </div>
            <a
              v-if="fetchedUserId != null"
              class="btn btn-primary"
              @click="addBookmark"
              :value="item.no"
              ><font-awesome-icon icon="plus" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<style>
input {
  font-family: 'BMHANNAAir' !important;
}
.btn-signiture {
  background-color: #fe2432;
  border: none;
  color: #fff;

  height: 60px;
}
#search-keyword-input {
  height: 60px;
  font-size: 1.5rem;
}

.btn-signiture:hover {
  background-color: #222;
  border: none;
  color: #fff;
}
.b-sidebar > .b-sidebar-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.b-sidebar-header > strong {
  font-weight: 200;
}

#sidebar-deal {
  width: 20%;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12), 4px 4px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.money {
  font-size: 18px;
  color: #222 !important;
  font-weight: bold;
  margin-bottom: 5px;
}
.service__card .btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  bottom: 1.8rem;
  right: 20px;
  border-radius: 50%;
  padding: 0;
  width: 3rem;
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
  right: 80px;
  border-radius: 50%;
  padding: 0;
  width: 3rem;
  height: 3rem;
  transition: all 0.25s ease-in-out;
}

.service__card .btn .icon {
  width: 70%;
  height: 70%;
  transition: all 0.25s ease-in-out;
}

.service__card {
  overflow: hidden;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
}
.service__card-top {
  display: block;
  height: 150px;
  background-size: cover;
}
.service__card-content {
  padding: 20px;
}
.service__card-title {
  font-size: 20px;
  color: #222;
  font-weight: bold;
}
.service__card-title a {
  color: #222;
  display: block;
}
.service__card-descr {
  font-size: 13px;
  margin-left: 0px;
  color: #222;
}
.card-text > p {
  margin-left: 5px;
}
.service__card-more {
  display: inline-block;
  color: #414141;
  position: relative;
  padding-right: 40px;
}
.service__card-more:hover {
  color: #414141;
}
.service__card-more:hover::before,
.service__card-more:hover::after {
  right: -5px;
}
.service__card-more::before {
  content: '';
  position: absolute;
  height: 2px;
  width: 10px;
  background: #414141;
  right: 0;
  left: 3;
  top: 0;
  margin-top: 13px;
  transition: all 0.2s ease;
}
.service__card-more::after {
  content: '';
  position: absolute;
  height: 6px;
  width: 6px;
  border: 2px solid #414141;
  border-top: none;
  border-left: none;
  transform: rotate(-45deg);
  right: 0;
  top: 0;
  margin-top: 11px;
  transition: all 0.2s ease;
}

.service__card-title > a {
  color: #fe2432;
}
p .card-text {
  text-align: left;
  margin-bottom: 5px;
}
</style>

<script>
import { mapGetters } from 'vuex';
const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI; // env.local에 설정되어있는 서버 url

export default {
  data: () => {
    return {
      dealList: {},
      currentDeal: -1,
      keyword: '',
      show: true,
      circles: [],
      markers: [],
      currentAddress: '',
    };
  },
  mounted() {
    const axios = require('axios');
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown == true) {
        if (collapseId == 'sidebar-detail') {
          this.$store
            .dispatch('FETCH_TARGET_APT_IMG', {
              keyword: this.currentAddress,
            })
            .then(() => {
              /*해당 아파트의 모든 평수를 확인 */
              axios
                .get(
                  `${MY_SERVER_HOST}location/area/${this.fetchedDong}/${
                    this.fetchedDeals[this.fetchedTargetDealIdx].aptName
                  }`
                )
                .then((response) => {
                  this.$store.dispatch('FETCH_AMOUNT_AREA', response.data);
                })
                .catch(function(error) {
                  console.log(error);
                });
            });
        }
      }
    });
  },
  computed: {
    ...mapGetters([
      'fetchedDeals',
      'fetchedDong',
      'fetchedMap',
      'fetchedMarker',
      'fetchedTargetDealIdx',
      'fetchedUserId',
    ]),
  },
  methods: {
    makeAddBockMarkSuccessToast() {
      this.$bvToast.toast('관심매물에 추가되었습니다', {
        title: '알림',
        variant: 'success',
        solid: true,
      });
    },
    makeAddBookMarkFailToast() {
      this.$bvToast.toast('이미 등록된 관심매물입니다!', {
        title: '알림',
        variant: 'danger',
        solid: true,
      });
    },

    makeAddBookMarkServerFailToast() {
      this.$bvToast.toast('알수없는 문제로 관심매물 등록에 실패하였습니다.', {
        title: '알림',
        variant: 'danger',
        solid: true,
      });
    },
    /*북마크(관심매물 추가)*/
    addBookmark($event) {
      var no = $event.target.getAttribute('value');
      const axios = require('axios');
      axios
        .get(`${MY_SERVER_HOST}attention/bookmark/${this.fetchedUserId}/${no}`)
        .then((response) => {
          console.log(response);
          if (response.data == 'Allow') {
            axios
              .post(
                `${MY_SERVER_HOST}attention/bookmark/${this.fetchedUserId}/${no}`
              )
              .then(() => {
                this.makeAddBockMarkSuccessToast();
              })
              .catch(() => {
                this.makeAddBookMarkServerFailToast();
              });
          } else {
            this.makeAddBookMarkFailToast();
          }
        })
        .catch(() => {
          this.makeAddBookMarkServerFailToast();
        });
    },
    selectDong() {
      this.$store.dispatch('FETCH_DONG', this.keyword);
      // deal 목록 갱신
      this.$store
        .dispatch('FETCH_DEALS', { dong: this.keyword })
        .then(() => {
          /** 마커찍기  */
          // 주소-> 좌표 변환기
          var geocoder = new window.kakao.maps.services.Geocoder();
          // 거래리스트를 돌면서 마커
          var map = this.fetchedMap;
          /** 기존 원 반경 제거하기 */
          if (this.circles) {
            this.circles.forEach((tcircle) => {
              tcircle.setMap(null);
            });
            this.circles.length = 0;
          }
          /** 기존 마커 제거하기 */
          if (this.markers) {
            this.markers.forEach((tmarker) => {
              tmarker.setMap(null);
            });
            this.markers.length = 0;
          }

          /*동 주소를 좌표로 변환하여 해야할 행위들*/
          geocoder.addressSearch(this.fetchedDong, (result, status) => {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
              var coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );
              /*그려질 반경 원 객체생성 합니다*/
              var circle = new window.kakao.maps.Circle({
                center: coords, // 원의 중심좌표입니다
                radius: 1100, // 원의 반지름입니다 m 단위 이며 선 객체를 이용해서 얻어옵니다
                strokeWeight: 1, // 선의 두께입니다
                strokeColor: '#00a0e9', // 선의 색깔입니다
                strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
                strokeStyle: 'solid', // 선의 스타일입니다
                fillColor: '#00a0e9', // 채우기 색깔입니다
                fillOpacity: 0.1, // 채우기 불투명도입니다
              });
              circle.setMap(map);
              map.setLevel(3);
              map.panTo(coords);
              this.circles.push(circle);
              // 결과값으로 받은 위치 중심으로 맵을 변환합니다.
            } else {
              console.log(status);
            }
          });

          var imageSrc = require('@/assets/img/marker.png'), // 마커이미지의 주소입니다
            imageSize = new window.kakao.maps.Size(32, 32), // 마커이미지의 크기입니다
            imageOption = { offset: new window.kakao.maps.Point(16, 16) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          var markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );

          for (let index = 0; index < this.fetchedDeals.length; index++) {
            var address =
              this.fetchedDong + ' ' + this.fetchedDeals[index].jibun;
            geocoder.addressSearch(address, (result, status) => {
              // 정상적으로 검색이 완료됐으면
              if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(
                  result[0].y,
                  result[0].x
                );
                // 결과값으로 받은 위치를 마커로 표시합니다
                // 결과값으로 받은 위치를 마커로 표시합니다

                var tempMarker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords,
                  image: markerImage,
                });
                // 마커 핸들링 어레이에 push
                this.markers.push(tempMarker);
              } else {
                console.log(status);
              }
            });

            //this.$store.dispatch("FETCH_MARKER", { marker: tempMarker });
          }

          this.$store.dispatch('FETCH_CLINIC', { dong: this.keyword });
          this.$store.dispatch('FETCH_SAFETY_HOSPITAL', { dong: this.keyword });
        })
        .catch();
    },
    moneyWithComma() {
      var money = this.value + '0000';
      this.text = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    detailBtn($event) {
      this.$root.$emit('bv::toggle::collapse', 'my-collapse-id');
      // 현재 거래 인덱스 변경요청
      this.$store.dispatch('FETCH_TARGET_DEAL_IDX', {
        idx: $event.target.getAttribute('value'),
      });

      var map = this.fetchedMap;
      this.currentAddress =
        this.fetchedDong +
        ' ' +
        this.fetchedDeals[this.fetchedTargetDealIdx].jibun;
      // window.kakao geocoder로 주소->좌표 변환기 선언
      /*아파트 이미지 변경요청*/

      var geocoder = new window.kakao.maps.services.Geocoder();
      // 아파트 선택시 주소 검색 후 중심좌표 이동
      geocoder.addressSearch(this.currentAddress, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          // 정상적으로 검색이 완료됐으면
          var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시합니다
          map.setLevel(2);
          map.panTo(coords);
        } else {
          //실패시
          console.log(status);
        }
      });
    },
  },
};
</script>
