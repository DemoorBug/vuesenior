<template>
  <section class="m-istyle">
    <dl @mouseover="moue">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item, index) of curdetail"
        :key="index"
        style="height: auto">
        <el-card>
          <img :src="item.img">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos">
              <span
                v-for="(item, index) of item.pos"
                :key="index">{{ item }}</span>
            </li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data () {
    return {
      kind: 'all',
      artistic: [{
        type: 'all',
        child: [{
          title: '木北造型（崇文门新世界店）',
          img: '//p1.meituan.net/wedding/8d26f93de654d433b17774e60a1fc5bd1028431.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: ['亲子场景酒店','发票推荐','亲子酒店点评'],
          price: '685'
        }, {
          title: '北京新侨诺富特饭店',
          img: '//p1.meituan.net/dnaimgdark/42487acaeaa40e3a97b41443f75566142443096.jpg@368w_208h_1e_1c',
          pos: ['亲子场景酒店','亲子酒店','房量充足'],
          price: '536'
        }]
      }, {
        type: 'part',
        child: [{
          title: '分米鸡 DM Chicken（合景·摩方店）',
          img: '//p1.meituan.net/msmerchant/a361a5683dcfc8db85d61f15639f9bfd61437.jpg@368w_208h_1e_1c',
          pos: ['分米鸡10DM套餐1份，有赠品'],
          price: '308'
        }, {
          title: 'COSTA COFFEE（东方新天地店）',
          img: '//p0.meituan.net/merchantpic/b5bc200ff96056aa58e2441c37b0097d58192.jpg@368w_208h_1e_1c',
          pos: ['巧克力酥卷小美式，建议单人使用'],
          price: '18'
        }]
      }, {
        type: 'spa',
        child: [{
          title: '魅贝克美发沙龙（崇文门新世界店）',
          img: '//p0.meituan.net/wedding/15570fc8c02870c37c21d4d250489cf9212844.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: ['魅贝克美发沙龙（崇文门新世界店）'],
          price: '282'
        }, {
          title: 'TONI&GUY（东方广场店）',
          img: '//p0.meituan.net/wedding/bdfdfa650660bc9c4b06c6a95f50492132697.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c',
          pos: ['TONI&GUY（东方广场店）'],
          price: '896'
        }]
      }, {
        type: 'movie',
        child: [{
          title: '金泉港IMAX国际影城',
          img: '//p0.meituan.net/poi/c2b482474377fc31a8311f46055f40b0442616.png@368w_208h_1e_1c',
          pos: ['免押金,可停车,有情侣座,儿童票,有WIFI,IMAX厅,杜比全景声厅,4DX厅'],
          price: '43'
        }, {
          title: '中影国际影城(丰台千禧街店)',
          img: '//p1.meituan.net/deal/__29661209__6853522.jpg@368w_208h_1e_1c',
          pos: ['免押金,可停车,有情侣座,儿童票,可刷卡,休息区,中国巨幕厅,60帧厅'],
          price: '19.9'
        }]
      }, {
        type: 'travel',
        child: [{
          title: '新鲜酒店',
          img: '//p1.meituan.net/tdchotel/3a2020cce42f452cb089eb274b67d6d18153330.jpg@368w_208h_1e_1c',
          pos: ['新客超值优惠','酒店套餐','亲子酒店'],
          price: '358'
        }, {
          title: '北京商旅智选北京INN公寓',
          img: '//p1.meituan.net/tdchotel/7d2e528c129d1376224df99dac1d3b382809929.jpg@368w_208h_1e_1c',
          pos: ['新客超值优惠','酒店套餐','亲子酒店'],
          price: '404'
        }]
      }]
    }
  },
  computed: {
    curdetail () {
      return this.artistic.filter((item) => item.type==this.kind)[0].child
    }
  },
  methods: {
    moue (e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      if (tag == 'dd') {
        this.kind = dom.getAttribute('kind')
      }
    }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
