<template>
  <div id="map">
    <div
      id="over"
      v-if="fetchedDong == null"
      v-bind:class="{ unvisible: fetchedServiceStatus }"
    >
      <div class="container">
        <div
          class="d-flex justify-content-center text-white mb-3"
          style="margin-top:30rem;"
        >
          <div class="row header-body">
            <div id="ui">
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
              <div class="text">HAPPY HOUSE :)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import '../assets/css/main.css';
</style>
<style>
#map {
  z-index: -999;
  width: 100%;
  height: 990px;
}
.overlayed {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    display: none;
    opacity: 0;
  }
}
#over {
  position: fixed;
  top: 5.5rem;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.unvisible {
  animation: 1s fadeOut;
  animation-fill-mode: forwards;
}
</style>

<script>
import { mapGetters } from 'vuex';
const MY_KAKAO_API_KEY = process.env.VUE_APP_KAKAO_API_KEY;

export default {
  data: function() {
    return {
      dealData: '',
      clusterer: '',
      areas: '',
      customOverlay: '',
      infowindow: '',
    };
  },
  computed: {
    ...mapGetters(['fetchedMap', 'fetchedDong', 'fetchedServiceStatus']),
    dongStatus() {
      if (this.fetchedDong == null) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey='+MY_KAKAO_API_KEY+'&libraries=services,clusterer,drawing';
      document.head.appendChild(script);
    }
  },
  updated() {
    this.initMap();
  },
  methods: {
    initMap() {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 8,
      };

      this.$store
        .dispatch('FETCH_MAP', {
          map: new kakao.maps.Map(container, options),
        })
        .then();
    },
    displayArea() {
      var mouseoverOption = {
        fillColor: '#EFFFED',
        fillOpacity: 0.8,
      };
      for (var i = 0, len = this.areas.length; i < len; i++) {
        let area = this.areas[i];
        // 다각형을 생성합니다
        var polygon = new kakao.maps.Polygon({
          map: this.map,
          path: area.path,
          strokeWeight: 2,
          strokeColor: '#004c80',
          strokeOpacity: 0.8,
          fillColor: '#fff',
          fillOpacity: 0.7,
        });
        kakao.maps.event.addListener(polygon, 'mouseover', () => {
          polygon.setOptions(mouseoverOption);
        });
      }
    },
  },
};
</script>
