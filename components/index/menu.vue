<template>
  <div class="m-menu">
    <dl
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) of home.menu"
        :key="index"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail"
      @mouseleave="Eenter"
      @mouseenter="Emousele">
      <template v-for="(item, index) of curdetail">
        <h4 :key="index">{{ item.title }}</h4>
        <span
          v-for="v of item.child"
          :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      kind: '',
      /*menu: [{
        type: 'food',
        name: '美食',
        child: [{
          title: '美食',
          child: ['代金券','饮品','火锅','自助餐']
        }]
      }, {
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: ['美团','饿了么','百度外卖','自助餐']
        }]
      }]*/
    }
  },
  computed: {
    ...mapState(['home']),
    curdetail () {
      return this.home.menu.filter((item) => item.type==this.kind)[0].child
    }
  },
  methods: {
    mouseleave () {
      this._timer = setTimeout(() => {
        this.kind= ''
      }, 150)
    },
    enter (e) {
      this.kind = e.target.querySelector('i').className
    },
    Emousele () {
      clearTimeout(this._timer)
    },
    Eenter () {
      this.kind = ''
    }
  }
}
</script>

<style>

</style>
