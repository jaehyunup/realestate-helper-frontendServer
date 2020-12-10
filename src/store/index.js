import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI;
const MY_OPEN_API_KEY = process.env.VUE_APP_MY_OPEN_API_KEY;
const MY_PYTHON_SERVER_HOST = process.env.VUE_APP_MY_PYTHON_SERVER_HOST_URI;
const axios = require('axios');
export default new Vuex.Store({
  state: {
    accessToken: null,
    userId: null,
    userName: null,
    sidebarDetailVisiable: false,
    polygonList: {},
    polygonCount: 0,
    targetDealIdx: 0,
    SafetyHospital: '',
    dong: null,
    deals: null,
    clinic: '',
    marker: '',
    map: '',
    gugunCode: '',
    gugunTradingLabel: [],
    gugunTradingData: [],
    targetAptImg: '',
    amountChart: '',
    amountArea: null,
    targetarea: null,
    aptImgSpinner: false,
    bookMarkDeals: [],
    serviceStatus: false,
    bookMarkDealIndex: null,
    notices: null,
  },
  getters: {
    fetchedDeals(state) {
      return state.deals;
    },
    fetchedDong(state) {
      return state.dong;
    },
    fetchedTargetDealIdx(state) {
      return state.targetDealIdx;
    },
    fetchedMap(state) {
      return state.map;
    },
    fetchedMarker(state) {
      return state.marker;
    },
    fetchedSafetyHospital(state) {
      return state.SafetyHospital;
    },
    fetchedClinic(state) {
      return state.clinic;
    },
    fetchedGugunCode(state) {
      return state.gugunCode;
    },
    fetchedGugunTradingLabel(state) {
      return state.gugunTradingLabel;
    },
    fetchedGugunTradingData(state) {
      return state.gugunTradingData;
    },
    fetchedAccessToken(state) {
      return state.accessToken;
    },
    fetchedUserId(state) {
      return state.userId;
    },
    fetchedUserName(state) {
      return state.userName;
    },
    fetchedTargetAptImg(state) {
      return state.targetAptImg;
    },
    fetchedSidebarDetailVisiable(state) {
      return state.sidebarDetailVisiable;
    },
    fetchedAmountChart(state) {
      return state.amountChart;
    },
    fetchedAmountArea(state) {
      return state.amountArea;
    },
    fetchedTargetAreaAmount(state) {
      return state.amountChart.data.datasets[0];
    },
    fetchedTargetArea(state) {
      return state.targetarea;
    },
    fetchedImgSpinner(state) {
      return state.aptImgSpinner;
    },
    fetchedBookMarkDeals(state) {
      return state.bookMarkDeals;
    },
    fetchedServiceStatus(state) {
      return state.serviceStatus;
    },
    fetchedBookMarkDealIndex(state) {
      return state.bookMarkDealIndex;
    },
    fetchedNotices(state) {
      return state.notices;
    },
  },
  mutations: {
    SET_SERVICE_STATUS(state, status) {
      state.serviceStatus = status;
    },
    SET_TARGET_AREA(state, area) {
      state.targetarea = area;
    },
    SET_DEALS(state, deals) {
      state.deals = deals;
    },
    SET_DONG(state, dong) {
      state.dong = dong;
    },
    SET_TARGET_DEAL_IDX(state, idx) {
      state.targetDealIdx = idx;
    },
    SET_MAP(state, map) {
      state.map = map;
    },
    SET_CLINIC(state, clinicList) {
      state.clinic = clinicList;
    },
    SET_MARKER(state, marker) {
      state.marker = marker;
    },
    SET_SAFETY_HOSPITAL(state, SafetyHospitalList) {
      state.SafetyHospital = SafetyHospitalList;
    },
    SET_GUGUN_CODE(state, gugunCode) {
      state.gugunCode = gugunCode;
    },
    SET_GUGUN_TRADING_LABEL(state, gugunTradingLabel) {
      state.gugunTradingLabel = gugunTradingLabel;
    },
    SET_GUGUN_TRADING_DATA(state, gugunTradingData) {
      state.gugunTradingData = gugunTradingData;
    },
    SET_USER_AUTH_DATA(state, payload) {
      state.accessToken = payload['auth-token'];
      state.userId = payload['userId'];
      state.userName = payload['userName'];
    },
    SET_USER_AUTH_DATA_LOGOUT(state) {
      // 로그아웃시, 모든 정보 초기화
      state.accessToken = null;
      state.userId = null;
      state.userName = null;
    },
    SET_TARGET_APT_IMG(state, payload) {
      state.targetAptImg = payload.result;
    },
    SET_SIDEBAR_DETAIL_VISIABLE(state, status) {
      state.sidebarDetailVisiable = status;
    },
    SET_AMOUNT_CHART(state, chart) {
      state.amountChart = chart;
    },
    SET_AMOUNT_DATA(state, amountDTOList) {
      state.amountChart.data.datasets[0].data = [];
      state.amountChart.data.labels = [];
      for (let index = 0; index < amountDTOList.length; index++) {
        const amountDto = amountDTOList[index];
        var dateTime = amountDto.dealMonth + '월' + amountDto.dealDay + '일';
        var amount = amountDto.dealAmount.replace(',', '');
        if (isNaN(amount)) {
          continue;
        }
        state.amountChart.data.datasets[0].data.push(amount);
        state.amountChart.data.labels.push(dateTime);
        state.amountChart.update();
      }
    },
    SET_AMOUNT_AREA(state, areaList) {
      state.amountArea = areaList;
    },
    SET_APT_IMG_SPINNER(state, status) {
      state.aptImgSpinner = status;
    },
    SET_BOOK_MARK_DEALS(state, deals) {
      state.bookMarkDeals = deals;
    },
    SET_BOOK_MARK_DEAL_INDEX(state, index) {
      state.bookMarkDealIndex = index;
    },
    SET_USER_NAME(state, userName) {
      state.userName = userName;
    },
    SET_NOTICES(state, notices) {
      state.notices = notices;
    },
  },
  actions: {
    FETCH_SERVICE_STATUS(context, status) {
      context.commit('SET_SERVICE_STATUS', status);
    },
    FETCH_BOOK_MARK_DEALS(context, userId) {
      axios
        .get(`${MY_SERVER_HOST}attention/bookmark/` + userId)
        .then((data) => {
          context.commit('SET_BOOK_MARK_DEALS', data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_AMOUNT_CHART(context, chart) {
      context.commit('SET_AMOUNT_CHART', chart);
    },
    FETCH_SIDEBAR_DETAIL_VISIABLE(context, status) {
      context.commit('SET_SIDEBAR_DETAIL_VISIABLE', status);
    },
    FETCH_SAFETY_HOSPITAL(context, payload) {
      axios
        .get(`${MY_SERVER_HOST}safetyhospital/` + payload.dong)
        .then((data) => {
          context.commit('SET_SAFETY_HOSPITAL', data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_CLINIC(context, payload) {
      /*안심 진료소*/
      axios
        .get(`${MY_SERVER_HOST}clinic/` + payload.dong)
        .then((data) => {
          context.commit('SET_CLINIC', data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_GUGUN_CODE(context, payload) {
      /*거래 분석 보기*/
      /*1. 동을 기준으로 구/군 state 업데이트 */
      return axios
        .get(`${MY_SERVER_HOST}location/gugun/` + payload.dong)
        .then((data) => {
          context.commit('SET_GUGUN_CODE', data.data.gugunCode);
        })
        .catch(function(error) {
          console.log(error);
        });
      /*2. 구/군 기준 거래 내역 불러오기*/
    },
    FETCH_TRADING_DATA_BY_GUGUN(context, payload) {
      return axios
        .get(
          'http://openapi.kab.co.kr/OpenAPI_ToolInstallPackage/service/rest/RealEstateTradingSvc/getRealEstateTradingCount?startmonth=201811&endmonth=202011&region=' +
            payload.gugunCode +
            `&tradingtype=01&serviceKey=${MY_OPEN_API_KEY}`
        )
        .then((data) => {
          /*구군 월별 거래개수 변동 내역 불러오기*/
          var gugunLabel = [];
          var gugunData = [];
          data.data.response.body.item.rsRow.split('|').forEach((row) => {
            let history = row.split(',');
            gugunLabel.push(
              history[0].substring(0, 4) + '-' + history[0].substring(4, 6)
            );
            gugunData.push(history[1]);
          });
          context.commit('SET_GUGUN_TRADING_LABEL', gugunLabel);
          context.commit('SET_GUGUN_TRADING_DATA', gugunData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_DONG(context, dong) {
      context.commit('SET_DONG', dong);
    },
    FETCH_DEALS(context, payload) {
      return axios
        .get(`${MY_SERVER_HOST}deal/` + payload.dong)
        .then((data) => {
          context.commit('SET_DEALS', data.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_TARGET_APT_IMG(context, payload) {
      context.commit('SET_APT_IMG_SPINNER', true);
      axios
        .get(`${MY_PYTHON_SERVER_HOST}base64Image?keyword=` + payload.keyword)
        .then((data) => {
          context.commit('SET_TARGET_APT_IMG', data.data);
          context.commit('SET_APT_IMG_SPINNER', false);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    FETCH_TARGET_DEAL_IDX(context, payload) {
      context.commit('SET_TARGET_DEAL_IDX', payload.idx);
    },
    // MAP 패치
    FETCH_MAP(context, payload) {
      context.commit('SET_MAP', payload.map);
    },
    // 마커 패치
    FETCH_MARKER(context, payload) {
      context.commit('SET_MARKER', payload.marker);
    },
    /** 유저관련  Actions */
    LOGIN(context, user) {
      return axios //
        .post(`${MY_SERVER_HOST}/user/login`, user) // 서버의 매핑
        .then((response) => {
          alert('로그인 되었습니다.');
          context.commit('SET_USER_AUTH_DATA', response.data);
          //axios default 헤더에 현재 token 적재
          axios.defaults.headers.common[
            'auth-token'
          ] = `${response.data['auth-token']}`;
        });
    },
    LOGOUT(context) {
      context.commit('SET_USER_AUTH_DATA_LOGOUT');
    },
    FETCH_AMOUNT_DATA_BY_DONG_APTNAME(context, payload) {
      // 평수인덱스와 동,아파트네임 axios요청
      return axios //
        .get(
          `${MY_SERVER_HOST}location/area/${payload.dong}/${payload.aptName}/${payload.area}`
        )
        .then((response) => {
          context.commit('SET_TARGET_AREA', payload.area);
          context.commit('SET_AMOUNT_DATA', response.data);
        }); // 서버의 매핑
    },
    FETCH_AMOUNT_AREA(context, areaList) {
      context.commit('SET_AMOUNT_AREA', areaList);
    },
    FETCH_USER_NAME(context, userName) {
      context.commit('SET_USER_NAME', userName);
    },
    FETCH_BOOKMARK_DEAL_IDX(context, no) {
      context.commit('SET_BOOK_MARK_DEAL_INDEX', no);
    },
    FETCH_NOTICES(context) {
      return axios //
        .get(`${MY_SERVER_HOST}notice/all`)
        .then((response) => {
          context.commit('SET_NOTICES', response.data);
        }); // 서버의 매핑
    },
  },
  modules: {},
});
