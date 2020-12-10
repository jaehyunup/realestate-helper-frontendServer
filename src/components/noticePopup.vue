<template>
  <div id="noticediv">
    <b-sidebar id="notice-popup" title="📣  공지사항" shadow>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="chat_container">
              <div class="job-box">
                <div class="job-box-filter">
                  <div class="row">
                    <div class="col-md-6 col-sm-6">
                      <label
                        >Show
                        <select
                          name="datatable_length"
                          class="form-control input-sm"
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                        entries</label
                      >
                    </div>
                    <div class="col-md-6 col-sm-6">
                      <div class="filter-search-box text-right">
                        <label
                          >Search:<input
                            type="search"
                            class="form-control input-sm"
                            placeholder=""
                        /></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="fetchedNotices != null" class="inbox-message">
                  <ul>
                    <li
                      v-for="(notice, index) in fetchedNotices"
                      :key="'notice' + index"
                    >
                      <a href="#">
                        <div class="message-avatar">
                          <img
                            src="@/assets/img/default-profile2.png"
                            style="width:53px;height:53px;margin-top:auto;"
                          />
                        </div>
                        <div class="message-body">
                          <div class="message-body-heading">
                            <h5
                              :aria-controls="'collapse-' + index"
                              :aria-expanded="'true'"
                            >
                              {{ notice.notice_title }}
                              <span
                                v-if="notice.notice_status == 'important'"
                                class="important"
                                >공지</span
                              >
                              <span
                                v-else-if="notice.notice_status == 'pending'"
                                class="pending"
                                >정보</span
                              >
                              <span v-else class="unread">안내</span>
                            </h5>
                            <span>{{ notice.notice_date }}</span>
                          </div>
                          <p>
                            {{
                              notice.notice_describ.length > 150
                                ? notice.notice_describ.substr(0, 150) + '...'
                                : notice.notice_describ
                            }}
                          </p>
                        </div>
                      </a>
                      <b-collapse :id="'collapse-' + index" :class="'collapse'">
                        <b-card>I am collapsible content!</b-card>
                        <b-card>I am collapsible content!</b-card>
                        <b-card>I am collapsible content!</b-card>
                        <b-card>I am collapsible content!</b-card>
                      </b-collapse>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<style scoped>
#noticediv >>> .b-sidebar {
  right: 1rem;
  left: auto;
}

#noticediv >>> .b-sidebar >>> .b-sidebar-header {
  display: none;
}
#noticediv >>> .b-sidebar {
  display: flex;
  flex-direction: column;
  position: fixed !important;
  top: 5rem;
  height: 50rem;
  width: 60rem;
  max-width: 40% !important;
  margin: 0 !important;
  outline: 0;
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

#noticediv >>> .b-sidebar >>> .b-sidebar-body {
  padding: 20px;
}

/*================================
Filter Box Style
====================================*/
.container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.job-box-filter label {
  width: 100%;
}
.job-box-filter select.input-sm {
  display: inline-block;
  max-width: 120px;
  margin: 0 5px;
  border: 1px solid #e8eef1;
  border-radius: 2px;
  height: 34px;
  font-size: 15px;
}
.job-box-filter label input.form-control {
  max-width: 200px;
  display: inline-block;
  border: 1px solid #e8eef1;
  border-radius: 2px;
  height: 34px;
  margin-left: 5px;
  font-size: 15px;
}
.text-right {
  text-align: right;
}
.job-box-filter {
  padding: 12px 15px;
  background: #ffffff;
  border-bottom: 1px solid #e8eef1;
  margin-bottom: 20px;
}
.job-box {
  background: #ffffff;
  display: inline-block;
  width: 100%;
  padding: 0 0px 40px 0px;
  border: 1px solid #e8eef1;
}
.job-box-filter a.filtsec {
  margin-top: 8px;
  display: inline-block;
  margin-right: 15px;
  padding: 4px 10px;
  font-family: 'Quicksand', sans-serif;
  transition: all ease 0.4s;
  background: #edf0f3;
  border-radius: 50px;
  font-size: 13px;
  color: #81a0b1;
  border: 1px solid #e2e8ef;
}
.job-box-filter a.filtsec.active {
  color: #ffffff;
  background: #16262c;
  border-color: #16262c;
}
.job-box-filter a.filtsec i {
  color: #03a9f4;
  margin-right: 5px;
}
.job-box-filter a.filtsec:hover,
.job-box-filter a.filtsec:focus {
  color: #ffffff;
  background: #07b107;
  border-color: #07b107;
}
.job-box-filter a.filtsec:hover i,
.job-box-filter a.filtsec:focus i {
  color: #ffffff;
}
.job-box-filter h4 i {
  margin-right: 10px;
}

/*=====================================
Inbox Message Style
=======================================*/
.inbox-message ul {
  padding: 0;
  margin: 0;
}
.inbox-message ul li {
  list-style: none;
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid #e8eef1;
}
.inbox-message ul li:hover,
.inbox-message ul li:focus {
  background: #eff6f9;
}
.inbox-message .message-avatar {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
}
.message-avatar img {
  display: inline-block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
}
.inbox-message .message-body {
  margin-left: 85px;
  font-size: 15px;
  color: #62748f;
}
.message-body-heading h5 {
  font-weight: 600;
  display: inline-block;
  color: #62748f;
  margin: 0 0 7px 0;
  padding: 0;
}
.message-body h5 span {
  border-radius: 50px;
  line-height: 14px;
  font-size: 12px;
  color: #fff;
  font-style: normal;
  padding: 4px 10px;
  margin-left: 5px;
  margin-top: -5px;
}
.message-body h5 span.unread {
  background: #07b107;
}
.message-body h5 span.important {
  background: #dd2027;
}
.message-body h5 span.pending {
  background: #2196f3;
}
.message-body-heading span {
  float: right;
  color: #62748f;
  font-size: 14px;
}
.messages-inbox .message-body p {
  margin: 0;
  padding: 0;
  line-height: 27px;
  font-size: 15px;
}

a:hover {
  text-decoration: none;
}
</style>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'notice',
  mounted() {},
  data() {
    return {};
  },
  methods: {

  },

  computed: {
    ...mapGetters(['fetchedNotices']),
  },
};
</script>
