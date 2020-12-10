<template>
  <b-sidebar id="sidebar-report" title="🔎  거래 동향분석" right shadow>
    <div class="container-fulid">
      <!--부동산 거래량 조회행-->
      <div class="row my-5">
        <div class="col-md-10 offset-md-1">
          <h5 style="color:#ef2a37">{{ this.fetchedDong }} 지역구내</h5>
          <h5>부동산 거래량</h5>
          <b-collapse class="mb-4 mt-5" id="collapse-history">
            <canvas id="trading-history-chart"></canvas>
          </b-collapse>
          <div class="float-md-right">
            <b-button class="btn btn-danger mt-3" v-b-toggle.collapse-history>
              <span class="when-opened">
                닫기
                <font-awesome-icon icon="chevron-up"/>
              </span>
              <span class="when-closed" @click="updateHistoryChart">
                {{ this.fetchedDong }} 거래량 조회
                <font-awesome-icon icon="chevron-right"/>
              </span>
            </b-button>
          </div>
        </div>
      </div>
      <!--지역구내 부동산 거래량 조회행 끝-->
      <hr/>
      <!-- 유동인구 내 인구나이 분포-->
      <div class="row my-5">
        <div class="col-md-10 offset-md-1">
          <h5 style="color:#ef2a37">{{ this.fetchedDong }}의</h5>
          <h5>도시 나이 분석</h5>
          <b-collapse class="mb-4 mt-5" id="collapse-cityage">
            <canvas id="cityage-chart"></canvas>
          </b-collapse>
          <div class="float-md-right">
            <b-button class="btn btn-danger mt-3" v-b-toggle.collapse-cityage>
              <span class="when-opened"
              >닫기<font-awesome-icon icon="chevron-up"/>
              </span>
              <span class="when-closed" @click="updateCityAgeChart">
                {{ this.fetchedDong }} 도시 나이 보기
                <font-awesome-icon icon="chevron-right"/>
              </span>
            </b-button>
          </div>
        </div>
        <!--인구 변화량 조회 끝-->
      </div>

      <hr/>
      <!-- 탑 20 아파트-->
      <div class="row my-5">
        <div class="col-md-10 offset-md-1">
          <h5 style="color:#ef2a37">{{ this.fetchedDong }}의</h5>
          <h5>TOP 20 아파트</h5>
          <b-collapse class="mb-4 mt-5" id="collapse-topChart">
            <canvas id="top-chart"></canvas>
          </b-collapse>
          <div class="float-md-right">
            <b-button class="btn btn-danger mt-3" v-b-toggle.collapse-topChart>
              <span class="when-opened"
              >닫기<font-awesome-icon icon="chevron-up"/>
              </span>
              <span class="when-closed" @click="updateTopChart">
                {{ this.fetchedDong }} TOP20 보기
                <font-awesome-icon icon="chevron-right"/>
              </span>
            </b-button>
          </div>
        </div>
      </div>

      <hr/>
      <!-- 인구 변화량 조회-->
      <div class="row my-5">
        <div class="col-md-10 offset-md-1">
          <h5 style="color:#ef2a37">{{ this.fetchedDong }}의</h5>
          <h5>도시 지표 분석</h5>
          <b-collapse class="mb-4 mt-5" id="collapse-indicate">
            <canvas id="indicate-chart"></canvas>
          </b-collapse>
          <div class="float-md-right">
            <b-button class="btn btn-danger mt-3" v-b-toggle.collapse-indicate>
              <span class="when-opened"
              >닫기<font-awesome-icon icon="chevron-up"/>
              </span>
              <span class="when-closed" @click="createIndicateChart">
                {{ this.fetchedDong }} 도시 지표 조회
                <font-awesome-icon icon="chevron-right"/>
              </span>
            </b-button>
          </div>
        </div>
        <!--인구 변화량 조회 끝-->
      </div>
    </div>
  </b-sidebar>
</template>

<style>
.b-sidebar > .b-sidebar-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

#sidebar-report {
  width: 50%;
}

.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>

<script>
import {mapGetters} from 'vuex';
import Chart from 'chart.js';

const corsOption = {
  origin: '*',
  methods: 'GET, PUT, PATCH, POST, DELETE',
  exposedHeaders: '*',
};
const MY_OPEN_API_KEY = process.env.VUE_APP_MY_OPEN_API_KEY;
export default {
  data() {
    return {
      indicateDongCode: '',
      historyChart: '',
      historyChartConfig: '',

      gugunTradingLabel: this.fetchedGugunTradingLabel,

      cityAgeChartLabel: '',
      cityAgeChartDataMale: '',
      cityAgeChartDataFeMale: '',
      cityAgeChart: '',
      cityAgeChartConfig: '',

      topChartLabels: [],
      topChartData: [],
      topChart: null,
      topChartConfig: null,
    };
  },
  mounted() {
    this.createHistoryChart();
    this.createCityAgeChart();
    this.createTopChart();
  },
  computed: {
    ...mapGetters([
      'fetchedDong',
      'fetchedGugunTradingLabel',
      'fetchedGugunTradingData',
      'fetchedGugunCode',
    ]),
  },
  watch: {},
  methods: {
    createTopChart() {
      // /deal/top20/{dong}
      var ct = document.getElementById('top-chart');
      this.topChartConfig = {
        data: {
          labels: [], // 아파트 이름 넣기
          datasets: [
            {
              data: [],
              backgroundColor: [],
            },
          ],
        },
        options: {
          responsive: true,
          legend: {
            position: 'right',
          },
          scale: {
            ticks: {
              beginAtZero: true,
            },
            reverse: false,
          },
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      };
      this.topChart = Chart.PolarArea(ct, this.topChartConfig);
    },
    createIndicateChart() {
      const axios = require('axios');
      /* 거래 불러오기*/
      axios
          .get('http://localhost:8888/indicate/' + this.fetchedDong)
          .then((data) => {
            this.indicateDongCode = data.data.dongCode;
            this.getPersonDataByDong();
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    getPersonDataByDong() {
      // 인구변화율 지표 받아오기
      const axios = require('axios');
      console.log('인구데이터고');
      var url =
          'http://apis.data.go.kr/1611000/DceDgnssIdxService/getIdxEmd'; /*URL*/
      var queryParams =
          '?' +
          encodeURIComponent('signguCd') +
          '=' +
          encodeURIComponent('41500'); /**/
      queryParams +=
          '&' +
          encodeURIComponent('emdCd') +
          '=' +
          encodeURIComponent('3121051'); /**/
      queryParams +=
          '&' +
          encodeURIComponent('idxCd') +
          '=' +
          encodeURIComponent('VALUE00043'); /**/
      queryParams +=
          '&' +
          encodeURIComponent('year') +
          '=' +
          encodeURIComponent('2015'); /**/
      queryParams +=
          '&' +
          encodeURIComponent('serviceKey') +
          '=' +
          encodeURIComponent(
              MY_OPEN_API_KEY
          ); /**/
      queryParams +=
          '&' +
          encodeURIComponent('type') +
          '=' +
          encodeURIComponent('JSON'); /**/
      queryParams +=
          '&' +
          encodeURIComponent('numOfRows') +
          '=' +
          encodeURIComponent('1'); /**/
      queryParams +=
          '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      axios
          .get(url + queryParams)
          .then((data) => {
            console.log(data);
            console.log('psersondong끝');
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    updateHistoryChart() {
      this.$store
          .dispatch('FETCH_GUGUN_CODE', {dong: this.fetchedDong})
          .then(() => {
            console.log(this.fetchedGugunCode);
            this.$store
                .dispatch('FETCH_TRADING_DATA_BY_GUGUN', {
                  gugunCode: this.fetchedGugunCode,
                })
                .then(() => {
                  console.log('거래량 차트반영시작 ');
                  this.historyChart.data.datasets[0].data = this.fetchedGugunTradingData;
                  this.historyChart.data.labels = this.fetchedGugunTradingLabel;
                  this.historyChart.update();
                });
          });
    },
    createHistoryChart() {
      const ctx = document.getElementById('trading-history-chart');
      this.historyChartConfig = {
        type: 'line',
        data: {
          labels: 0,
          datasets: [
            /**첫번째 데이터셋 */
            {
              data: 0,
              borderColor: 'rgba(75, 192, 192, 0)',
              backgroundColor: 'rgba(239, 42, 55, 0.69)',
              pointRadius: 1.5,
              pointHoverRadius: 10,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          responsive: true,
          lineTension: 80,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 0,
                },
              },
            ],
          },
        },
      };
      this.historyChart = new Chart(ctx, this.historyChartConfig);
    },
    createCityAgeChart() {
      var ca = document.getElementById('cityage-chart');
      this.cityAgeChartConfig = {
        type: 'horizontalBar',
        data: {
          labels: [
            '0-9세',
            '10-14세',
            '15-19세',
            '20-24세',
            '25-29세',
            '30세-34세',
            '35세-39세',
            '40세-44세',
            '45세-50세',
            '50세-54세',
            '55세-60세',
            '60세-64세',
            '65세-70세',
            '70세-74세',
          ],
          datasets: [
            {
              label: '남성',
              data: [1, 2, 3, 4],
            },
            {
              label: '여성',
              data: [1, 2, 3, 4],
            },
          ],
        },
        options: {
          elements: {
            rectangle: {
              borderWidth: 10,
            },
          },
          responsive: true,
          legend: {
            position: 'right',
          },
        },
      };
      this.cityAgeChart = new Chart(ca, this.cityAgeChartConfig);
    },
    updateTopChart() {
      var color = Chart.helpers.color;

      if (this.topChart.data.datasets[0].data.length > 0) {
        this.topChart.data.datasets[0].data = [];
        this.topChart.data.labels = [];
      }
      const axios = require('axios');

      var randomColor = require('randomcolor');
      console.log(this.topChart);
      axios
          .get('http://localhost:8888/deal/top20/' + this.fetchedDong)
          .then((response) => {
            console.log(response);
            for (let index = 0; index < response.data.length; index++) {
              var element = response.data[index];
              var amt = element.dealAmount.replace(',', '') * 1;
              var aptName = element.aptName;

              this.topChart.data.labels.push(aptName);
              this.topChart.data.datasets[0].backgroundColor.push(
                  color(randomColor())
                      .alpha(0.5)
                      .rgbString()
              );
              this.topChart.data.datasets[0].data.push(amt);
              this.topChart.update();
            }
          })
          .catch(function (error) {
            console.log(error);
          });

    },
    updateCityAgeChart() {
      if (this.cityAgeChart.data.datasets[0].data.length > 0) {
        this.cityAgeChart.data.datasets[0].data = [];
        this.cityAgeChart.data.datasets[1].data = [];
        this.cityAgeChart.data.datasets[1].borderColor = null;
        this.cityAgeChart.data.datasets[0].borderColor = null;
      }
      const axios = require('axios');
      /* 거래 불러오기*/
      axios
          .get('http://localhost:8888/indicate/' + this.fetchedDong)
          .then((data) => {
            this.indicateDongCode = data.data.dongCode;
            this.pushCityAgeChartDate();
          })
          .catch(function (error) {
            console.log(error);
          });
      /*안심 병원*/
      // this.cityAgeChart.data.datasets[0].data = this.fetchedGugunTradingData;
      // this.cityAgeChart.data.labels = this.fetchedGugunTradingLabel;
      // this.cityAgeChart.update();
      // console.log(this.historyChart);
    },
    pushCityAgeChartDate() {
      const axios = require('axios');
      var randomColor = require('randomcolor');
      var color = Chart.helpers.color;
      /* 도시나이 api */
      axios
          .get(
              'http://openapi.seoul.go.kr:8088/5a5a487673706a683934676c45466e/json/SPOP_LOCAL_RESD_DONG/1/424/',
              corsOption
          )
          .then((data) => {
            var spotData = data.data.SPOP_LOCAL_RESD_DONG.row;
            spotData.forEach((element) => {
              // 동 코드 일치하는곳
              if (element.ADSTRD_CODE_SE.includes(this.indicateDongCode)) {
                for (var key in element) {
                  if (
                      key == 'ADSTRD_CODE_SE' ||
                      key == 'STDR_DE_ID' ||
                      key == 'TMZON_PD_SE' ||
                      key == 'TOT_LVPOP_CO'
                  ) {
                    continue;
                  }

                  //var fmKey = key.match('F[0-9]+T[0-9]+');
                  if (key.includes('FEMALE')) {
                    this.cityAgeChart.data.datasets[1].data.push(element[key]);
                    this.cityAgeChart.data.datasets[1].borderColor = color(
                        randomColor()
                    )
                        .alpha(0.5)
                        .rgbString();
                  } else {
                    this.cityAgeChart.data.datasets[0].data.push(element[key]);
                    this.cityAgeChart.data.datasets[0].borderColor = color(
                        randomColor()
                    )
                        .alpha(0.5)
                        .rgbString();
                  }
                  this.cityAgeChart.update();
                }
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    },
  },
};
</script>
