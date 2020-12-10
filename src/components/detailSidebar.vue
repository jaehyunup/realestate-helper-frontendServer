<template>
  <b-sidebar bg-variant="gray" id="sidebar-detail" shadow>
    <div class="container-fulid">
      <div v-if="fetchedImgSpinner" style="width:100%;height:214px">
        <template>
          <div class="text-center" style="padding-top:5rem;">
            <b-spinner variant="danger" label="Loading..."></b-spinner>
            <p class="mt-3" style="font-size:0.8rem;font-weight:700">
              이미지 로딩중
            </p>
          </div>
        </template>
      </div>
      <div v-else style="width:100%;height:214px;overflow:hidden;">
        <b-img v-bind:src="fetchedTargetAptImg" fluid></b-img>
      </div>

      <!--상세보기 타이틀부분 -->
      <div class="Inforow mt-4 py-3" v-b-toggle.area1>
        <div class="row">
          <div class="col-md-11 ml-3 py-0">
            <span
              class="ml-1 my-0 py-0"
              style="color:#000;font-weight:700;font-size:1.1rem;"
              >아파트 정보</span
            ><font-awesome-icon
              class="mt-1"
              icon="chevron-right"
              :style="{ color: '#C00000' }"
              pull="right"
            />
          </div>
        </div>
        <hr />
        <b-collapse visible id="area1">
          <div class="row mt-3">
            <div class="col-lg-12 px-4">
              <div
                v-if="fetchedDeals != null"
                class="ml-2 aptTitle"
                style="font-weight:bold;font-size:1.2rem;color:#222;font-weight:600"
              >
                {{ fetchedDeals[fetchedTargetDealIdx].aptName }}
              </div>
            </div>
            <!-- 완공 일자-->
            <div class="col-lg-12 px-4">
              <div
                v-if="fetchedDeals != null"
                class="ml-2 aptTitle"
                style="font-weight:normal;font-size:0.85rem;color:#757575;font-weight:400"
              >
                {{ fetchedDeals[fetchedTargetDealIdx].buildYear }}년 완공
              </div>
            </div>
          </div>
          <!-- 거래정보  -->
          <div v-if="fetchedDeals != null" class="row mt-3">
            <div class="col-lg-12 px-4">
              <!--collapse -->
              <div>
                <div class="row">
                  <div class="col-md-3 px-4 detailKey">유형</div>
                  <div class="col-md-9 px-4 detailValue">아파트 매매</div>
                </div>
                <hr class="style4 my-1" />
                <!-- 주소  -->
                <div class="row">
                  <div class="col-md-3 px-4 my-1 detailKey">주소</div>
                  <div class="col-md-9 px-4 my-1 detailValue">
                    {{ fetchedDeals[fetchedTargetDealIdx].dong }}
                    {{ fetchedDeals[fetchedTargetDealIdx].jibun }}
                  </div>
                </div>
                <hr class="style4 my-1" />
                <!-- 층수  -->
                <div class="row">
                  <div class="col-md-3 px-4 my-1 detailKey">층수</div>
                  <div class="col-md-9 px-4 my-1 detailValue">
                    {{ fetchedDeals[fetchedTargetDealIdx].floor }}층
                  </div>
                </div>
                <hr class="style4 my-1" />

                <!--전용 면적 -->
                <div class="row">
                  <div class="col-md-3 px-4 my-1 detailKey">
                    면적<span style="font-family:'gothic'"> (㎡)</span>
                  </div>
                  <div class="col-md-9 px-4 my-1 detailValue">
                    {{ fetchedDeals[fetchedTargetDealIdx].area
                    }}<span style="font-family:'gothic'">㎡</span>
                  </div>
                </div>
                <hr class="style4 my-1" />
                <!--거래 일자 -->
                <div class="row">
                  <div class="col-md-3 px-4 my-1 detailKey">거래일</div>
                  <div class="col-md-9 px-4 my-1 detailValue">
                    {{ fetchedDeals[fetchedTargetDealIdx].dealYear }}년
                    {{ fetchedDeals[fetchedTargetDealIdx].dealMonth }}월
                    {{ fetchedDeals[fetchedTargetDealIdx].dealDay }}일
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
      </div>

      <div class="Inforow mt-3 py-2" v-b-toggle.area2>
        <!--탭 부분 -->
        <div class="row">
          <div class="col-md-11 ml-3 pt-2">
            <span
              class="ml-1 my-0 py-0"
              style="font-weight:700;font-size:1.1rem;"
              >실거래가 차트</span
            ><font-awesome-icon
              class="mt-1"
              icon="chevron-right"
              :style="{ color: '#C00000' }"
              pull="right"
            />
          </div>
        </div>
        <hr />
        <b-collapse visible id="area2">
          <!--거래 가격 정보-->
          <div class="row mb-0">
            <div>
              <div class="col-lg-12 px-4 mt-3">
                <b-tabs v-if="fetchedAmountArea != null" @input="tabClick">
                  <b-tab
                    active
                    v-for="(area, index) in fetchedAmountArea"
                    v-bind:key="index"
                  >
                    <!--평균 거래가 -->
                    <div class="row">
                      <div class="col-md-11 ml-3 mt-3">
                        <span class="avg-title">
                          평균 평단가&nbsp;<font-awesome-icon icon="info-circle"
                        /></span>
                      </div>
                      <div class="col-md-11 ml-3">
                        <div class="avg-value">
                          {{
                            fetchedAmountChart.data.datasets[0].data
                              | avgAmountOneArea(fetchedTargetArea)
                          }}만<span style="font-family:'gothic'">/3.3㎡</span>
                        </div>
                      </div>
                    </div>
                    <template #title>
                      <b-spinner type="grow" small></b-spinner
                      ><strong> {{ Math.round(area / 3.3) }}평</strong>
                    </template>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 px-4 mt-3">
              <canvas id="amount-chart"> </canvas>
            </div>
          </div>
        </b-collapse>
      </div>

      <div class="Inforow mt-5" v-b-toggle.area3>
        <!--탭 부분 -->
        <div class="row pt-2">
          <div class="col-md-11 ml-3 py-3">
            <span
              class="ml-1 my-0 py-0"
              style="font-weight:700;font-size:1.1rem;"
              >국가인증 안심 병원</span
            ><font-awesome-icon
              class="mt-1"
              icon="chevron-right"
              :style="{ color: '#C00000' }"
              pull="right"
            />
          </div>
        </div>
        <b-collapse visible id="area3">
          <!-- 안심 병원 -->
          <div class="row">
            <!--안심병원 타이틀끝-->
            <div class="col-lg-12 px-4">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>병원명</th>
                    <th>주소</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
                <tbody v-if="fetchedSafetyHospital">
                  <tr
                    v-for="(item, index) in fetchedSafetyHospital"
                    :key="'SafeHospitalItemKey' + index"
                  >
                    <td class="filterable-cell">{{ item.hospital }}</td>
                    <td class="filterable-cell">{{ item.address }}</td>
                    <td class="filterable-cell">{{ item.phonenumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-collapse>
        <!--안심병원 끝-->
      </div>

      <div class="Inforow my-3" v-b-toggle.area4>
        <!--탭 부분 -->
        <div class="row">
          <div class="col-md-11 ml-3 py-3">
            <span
              class="ml-1 my-0 py-0"
              style="font-weight:700;font-size:1.1rem;"
              >주변 보건소</span
            ><font-awesome-icon
              class="mt-1"
              icon="chevron-right"
              :style="{ color: '#C00000' }"
              pull="right"
            />
          </div>
        </div>
        <b-collapse visible id="area4">
          <!-- 안심 진료소 -->
          <div class="row" style="margin-top:-12px;">
            <div class="col-lg-12 px-4 mt-2">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>진료소명</th>
                    <th>주소</th>
                    <th>전화번호</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in fetchedClinic"
                    :key="'SafeHospitalItemKey' + index"
                  >
                    <td class="filterable-cell">{{ item.hospital }}</td>
                    <td class="filterable-cell">{{ item.address }}</td>
                    <td class="filterable-cell">{{ item.phonenumber }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </b-collapse>
        <!--안심진료소 끝-->
      </div>
    </div>
  </b-sidebar>
</template>

<style>
:focus {
  outline: none !important;
  outline-width: 0 !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}
#sidebar-detail {
  width: 25%;
}

#sidebar-detail {
  background-color: #f2f2f2;
}
.b-sidebar-body {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18), 0 6px 6px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.b-sidebar-body:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link {
  font-size: 0.8rem;
}
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #fe2432;
  font-size: 1rem;
}
</style>
<style scoped>
table > tbody > tr > td {
  font-weight: 500;
}
.Inforow {
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.avg-title {
  font-size: 14px;
}
.avg-title > font-awesome-icon {
  font-size: 10px;
}
.avg-value > span {
  font-size: 11px;
  color: #ef2a37;
  font-weight: 600;
}
.avg-value {
  font-size: 20px;
  color: #ef2a37;
  font-weight: bold;
}

img {
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.b-sidebar > .b-sidebar-body::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.b-sidebar-header > strong {
  font-size: 1.3rem;
  font-weight: 400;
}
.detailKey {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}
.detailValue {
  font-size: 13px;
  color: #222;
}
.table-striped > thead > tr > th {
  font-size: 0.8rem;
}

.table-striped > tbody > tr > td {
  font-size: 0.8rem;
}
</style>

<script>
window.chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
};

import Chart from 'chart.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      amountChart: null,
    };
  },
  computed: {
    ...mapGetters([
      'fetchedTargetArea',
      'fetchedAmountChart',
      'fetchedTargetDealIdx',
      'fetchedDeals',
      'fetchedSafetyHospital',
      'fetchedClinic',
      'fetchedDong',
      'fetchedTargetAptImg',
      'fetchedSidebarDetailVisiable',
      'fetchedAmountArea',
      'fetchedImgSpinner',
    ]),
  },
  methods: {
    tabClick(index) {
      // 탭클릭시 인덱스가 반환,(평형별)
      // 인덱스에 해당하는 평수= fetchedAmountArea[index]
      this.$store.dispatch('FETCH_AMOUNT_DATA_BY_DONG_APTNAME', {
        dong: this.fetchedDong,
        aptName: this.fetchedDeals[this.fetchedTargetDealIdx].aptName,
        area: this.fetchedAmountArea[index],
      });
    },
    createAmountChart() {
      var ac = document.getElementById('amount-chart');
      var color = Chart.helpers.color;
      var amountChartConfig = {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            /**첫번째 데이터셋 */
            {
              data: [],
              backgroundColor: color(window.chartColors.red)
                .alpha(0.2)
                .rgbString(),
              borderColor: window.chartColors.red,
              pointRadius: 1.4,
              pointHoverRadius: 5,
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
            xAxes: [
              {
                ticks: {
                  fontColor: 'rgba(12, 13, 13, 1)',
                  fontSize: 8,
                },
                gridLines: {
                  lineWidth: 1,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                  padding: 0,
                },
              },
            ],
          },
        },
      };
      var amountChart = new Chart(ac, amountChartConfig);

      this.$store.dispatch('FETCH_AMOUNT_CHART', amountChart);
    },
  },
  filters: {
    avgAmountOneArea(array, area) {
      let result = array.reduce(function add(sum, currValue) {
        return sum + currValue * 1;
      }, 0);
      let average = (Math.round(result / array.length) + '0000') * 1;
      console.log(average);
      var regexp = /\B(?=(\d{3})+(?!\d))/g;

      console.log(area / 3.3);
      var avgByArea = Math.round(average / (area / 3.3));
      return avgByArea.toString().replace(regexp, ',');
    },
  },
  mounted() {
    this.createAmountChart();
  },
};
</script>
