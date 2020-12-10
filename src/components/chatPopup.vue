<template>
  <div id="chatdiv">
    <b-sidebar id="chat-popup" title="👨‍👨‍👦‍👦  채팅방" shadow>
      <div class="wrapper">
        <div class="main">
          <div class="px-2 scroll">
            <!--중앙텍스트시작-->
            <div class="text-center">
              <span class="between"
                >채팅방에 참여하였습니다.<br />
                {{ getCurrentDate }}</span
              >
            </div>
            <template v-for="(data, index) in chatList">
              <!--내 말 시작-->
              <div
                v-if="data.socketid == $socket.id"
                class="d-flex align-items-center text-right justify-content-end "
                :key="index"
              >
                <div class="pr-2">
                  <span class="name">나</span>
                  <p class="msg me">{{ data.msg }}</p>
                </div>
                <div>
                  <img
                    src="https://img.icons8.com/color/40/000000/guest-male.png"
                    width="30"
                    class="img1"
                  />
                </div>
              </div>
              <!--내말끝-->

              <!--상대방 말 시작-->
              <div
                v-else
                class="d-flex align-items-center"
                :key="index + broadcase"
              >
                <div class="text-left pr-1">
                  <img
                    src="https://img.icons8.com/color/40/000000/guest-male.png"
                    width="30"
                    class="img1"
                  />
                </div>
                <div class="pr-2 pl-1">
                  <span class="name">익명사용자</span>
                  <p class="msg">{{ data.msg }}</p>
                </div>
              </div>
            </template>
            <!--중앙 공지텍스트 끝-->
          </div>
          <nav
            class="navbar bg-white navbar-expand-sm d-flex justify-content-between"
          >
            <input
              type="text number"
              name="text"
              v-model="message"
              class="form-control"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
            />
            <div
              class="icondiv d-flex justify-content-end align-content-center text-center ml-2"
            >
              <i class="fa fa-paperclip icon1"></i>
              <i class="fa fa-arrow-circle-right icon2"></i>
            </div>
          </nav>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<style scoped>
@import '../assets/css/chat.css';

#chatdiv >>> .b-sidebar {
  right: 2rem;

  left: auto;
}

#chatdiv >>> .b-sidebar >>> .b-sidebar-header {
  display: none;
}
#chatdiv >>> .b-sidebar {
  display: flex;
  flex-direction: column;
  position: fixed !important;
  top: 37%;
  height: 60vh;
  width: 20rem;
  max-width: 40% !important;
  margin: 0 !important;
  outline: 0;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

#chatdiv >>> .b-sidebar >>> .b-sidebar-body {
  padding: 20px;
}
</style>

<script>
import { mapGetters } from 'vuex';
//const MY_SERVER_HOST = process.env.VUE_APP_BACKEND_SERVER_HOST_URI; // env.local에 설정되어있는 서버 url

export default {
  name: 'Chat',
  mounted() {
    console.log(this.$socket);
    /*다른사람의 메세지 전송*/
    this.$socket.on('serverChat', (data) => {
      this.chatList.push(JSON.parse(data));
      console.log(this.chatList);
      this.scrollDown();
    });
  },
  data() {
    return {
      textarea: '',
      message: '',
      chatList: [],
      socket: null,
    };
  },
  methods: {
    /*내 메시지 전송 이벤트*/
    scrollDown() {
      var divdiv = document.getElementsByClassName('scroll')[0];
      divdiv.scrollTop = divdiv.scrollHeight;
    },
    sendMessage() {
      this.scrollDown();
      var sendMsg = {
        msg: this.message,
        socketid: this.$socket.id,
      };
      var stringfysendMsg = JSON.stringify(sendMsg);
      this.$socket.emit('chat', stringfysendMsg);
      this.chatList.push(sendMsg);
      this.scrollDown();
      this.message = '';
    },
    leadingZeros(n, digits) {
      var zero = '';
      n = n.toString();

      if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++) zero += '0';
      }
      return zero + n;
    },
  },

  computed: {
    ...mapGetters(['fetchedUserId']),
    getCurrentDate() {
      var d = new Date();
      var s =
        this.leadingZeros(d.getFullYear(), 4) +
        '-' +
        this.leadingZeros(d.getMonth() + 1, 2) +
        '-' +
        this.leadingZeros(d.getDate(), 2) +
        ' ' +
        this.leadingZeros(d.getHours(), 2) +
        ':' +
        this.leadingZeros(d.getMinutes(), 2) +
        ':' +
        this.leadingZeros(d.getSeconds(), 2);

      return s;
    },
  },
};
</script>
