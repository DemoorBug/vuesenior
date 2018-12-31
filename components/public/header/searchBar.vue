<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col
        :span="3"
        class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团外卖">
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @keyup.down.native="numberSerace"
            @keyup.up.native="upSerace"/>
          <button class="el-button el-button--primary"><i class="el-icon-search"/></button>
          <dl
            v-if="isHotPlace"
            class="hotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item, index) of hotPlace"
              :key="index">{{ item }}</dd>
          </dl>
          <dl
            v-if="isSearchList"
            ref="hoste"
            class="searchList">
            <dd
              v-for="(item, index) of searchList"
              :ref= "index"
              :key="index">{{ item }}</dd>
          </dl>
        </div>
        <p class="suggset">
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
          <a href="#">故宫博物院</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link
              to="/"
              class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="apartment">
              民宿/公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              to="/"
              class="business">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col
        :span="6"
        class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意面免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFocus: false,
      search: '',
      hotPlace: ['热门搜索', 'nice'],
      searchDate: ['哈哈2哈哈1', '也没2有那么1', '搜索2吗1', '北京1烤鸭', '偶是1'],
      searchList: [],
      show: true,
      number: 0,
      what: false,
      hidone: false
    }
  },
  computed: {
    isHotPlace () {
      return this.isFocus && !this.search
    },
    isSearchList () {
      return this.isFocus && this.search
    }
  },
  watch: {
    search () {
      if (!this.search) {
        this.searchList = []
        return
      }
      if (this.what) {
        return
      }
      const result = []
      this.searchDate.forEach((value, index) => {
        if (value.indexOf(this.search) > -1) {
          result.push(value)
        }
      })
      /*和这层代码没关系*/
      for (let i = 0; i < this.searchList.length; i++) {
        this.$refs[i][0].className = ''
      }
      this.number = 0
      /*-------------*/
      this.searchList = result
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      setTimeout(() => {
        this.isFocus = false
      },200)
    },
    numberSerace () {
      // 点击键盘down执行事件，写的很乱，不过功能还可以
      if (!this.search) return
      this.what = true
      this.hidone = true
      if (this.number >= this.searchList.length) {
        this.number = 0
      }
      for (let i = 0; i < this.searchList.length; i++) {
        this.$refs[i][0].className = ''
      }
      this.$refs[this.number][0].className = "msg"
      this.search = this.searchList[this.number]
      setTimeout(() => {
        this.what = false
      }, 200)

      this.number++
    },
    upSerace () {
      //点击键盘up执行事件
      if (!this.search) return

      this.what = true
      if (this.hidone) {
        this.number--
      }
      this.hidone = false
      this.number--
      if (this.number < 0) {
        this.number = this.searchList.length-1
      }
      for (let i = 0; i < this.searchList.length; i++) {
        this.$refs[i][0].className = ''
      }
      this.$refs[this.number][0].className = "msg"
      this.search = this.searchList[this.number]
      setTimeout(() => {
        this.what = false
      }, 200)

    }
  }

}
</script>

<style scoped>
  .msg {
    background: #F8F8F8;
    color: #31BBAC;
  }
</style>
