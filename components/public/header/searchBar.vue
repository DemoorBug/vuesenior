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
            @input="input"/>
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
              :key="index">{{ item.name }}</dd>
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
import _ from 'lodash'
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
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      setTimeout(() => {
        this.isFocus = false
      },200)
    },
    input: _.debounce(async function() {
      let _this = this
      let city = this.$store.state.geo.position.city.replace('市','')
      let {status, data: {top}} = await _this.$axios.get('/search/top', {
        params: {
          input: _this.search,
          city
        }
      })
      _this.searchList = top.slice(0, 10)
    }, 300)
  }

}
</script>

<style scoped>
  .msg {
    background: #F8F8F8;
    color: #31BBAC;
  }
</style>
