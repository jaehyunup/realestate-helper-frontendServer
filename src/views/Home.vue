<template>
  <div class="home" @click="$store.dispatch('FETCH_SERVICE_STATUS', true)">
    <main-nav-bar></main-nav-bar>
    <kakao-map></kakao-map>
    <deal-side-bar v-on:shown="hideAnotherSideBar()"></deal-side-bar>
    <attention-detail-sidebar></attention-detail-sidebar>
    <report-side-bar></report-side-bar>
    <detail-side-bar></detail-side-bar>
    <attention-side-bar></attention-side-bar>
    <my-page-sidebar></my-page-sidebar>
    <chat-popup></chat-popup>
    <notice-popup></notice-popup>
  </div>
</template>

<script>
// @ is an alias to /src
import kakaoMap from '@/components/kakaoMap.vue';
import DealSideBar from '@/components/dealSideBar.vue';
import ReportSideBar from '@/components/reportSideBar.vue';
import MainNavBar from '@/components/mainNavBar.vue';
import AttentionSideBar from '@/components/attentionSideBar.vue';
import DetailSideBar from '@/components/detailSidebar.vue';
import MyPageSidebar from '@/components/myPageSidebar.vue';
import { mapGetters } from 'vuex';
import AttentionDetailSidebar from '../components/attentionDetailSidebar.vue';
import ChatPopup from '../components/chatPopup.vue';
import NoticePopup from '../components/noticePopup.vue';

export default {
  name: 'home',
  computed: {
    ...mapGetters(['fetchedServiceStatus']),
  },
  components: {
    kakaoMap,
    DealSideBar,
    MainNavBar,
    ReportSideBar,
    AttentionSideBar,
    DetailSideBar,
    MyPageSidebar,
    AttentionDetailSidebar,
    ChatPopup,
    NoticePopup,
  },
  methods: {
    polygonDongChange() {
      this.$store.state.customOverlay;
    },
  },
};
</script>
<style>
.b-sidebar-header {
  color: #222;
}
</style>
