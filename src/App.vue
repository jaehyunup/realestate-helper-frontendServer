<template>
  <div id="app">
    <!-- 네비바 시작-->
    <!--라우터 컴포넌트 시작-->
    <router-view />
  </div>
</template>

<script></script>

<style>
/**  App (전역) 그룹 스타일 */
:root {
  --input-padding-x: 1.8rem;
  --input-padding-y: 1.8rem;
}
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
  color: #222 !important;
}
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: 'BMHANNAAir', Helvetica, Arial, sans-serif !important;
}
body {
  font-family: 'BMHANNAAir';
}

@font-face {
  font-family: 'Spoqa Han Sans';
  font-weight: 700;
  src: url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Bold.woff2'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Bold.woff'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Bold.ttf');
}
@font-face {
  font-family: 'BMHANNAAir';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Spoqa Han Sans';
  font-weight: 400;
  src: url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Regular.woff2'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Regular.woff'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Regular.ttf');
}

@font-face {
  font-family: 'Spoqa Han Sans';
  font-weight: 300;
  src: url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Light.woff2'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Light.woff'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Light.ttf');
}

@font-face {
  font-family: 'Spoqa Han Sans';
  font-weight: 100;
  src: url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Thin.woff2')
      format('woff2'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Thin.woff')
      format('woff'),
    url('~@/assets/fonts/SpoqaHanSans_subset/Spoqa Han Sans Thin.ttf');
}

#app {
  color: #333;
}
html::-webkit-scrollbar {
  display: none;
}
</style>
