<template>
  <b-collapse visible id="header-collapse">
    <div class="service-hello">
      <header>
        <div class="overlay"></div>
        <video
          playsinline="playsinline"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
        >
          <source
            src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
            type="video/mp4"
          />
        </video>

        <div class="container h-100">
          <div class="d-flex h-100 text-center align-items-center">
            <div class="w-100 text-white">
              <h1 class="display-3">HAPPY HOUSE</h1>
              <p class="lead mb-0">해피하우스로 성공적인 투자를</p>
              <br />
              <button v-b-toggle.header-collapse class="btn btn-lg btn-danger">
                시작하기
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  </b-collapse>
</template>

<style scoped>
header {
  position: relative;
  background-color: black;
  height: 94vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

header video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

header .container {
  position: relative;
  z-index: 2;
}

header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

@media (pointer: coarse) and (hover: none) {
  header {
    background: url('https://source.unsplash.com/XT5OInaElMw/1600x900') black
      no-repeat center center scroll;
  }
  header video {
    display: none;
  }
}
</style>
<script>
// @ is an alias to /src

export default {
  name: 'ServieHello',
  mounted() {
    this.$root.$on('bv::collapse::state', (collapseId, isJustShown) => {
      if (isJustShown == false) {
        if (collapseId == 'header-collapse') {
          this.$store.dispatch('FETCH_SERVICE_STATUS', true);
        }
      }
    });
  },
  methods: {},
};
</script>
<style scoped>
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 1.5rem;
}

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
</style>
