import Router from 'koa-router'
import axios from './utils/axios.js'
import Province from '../dbs/models/Province.js'

let router = new Router({
  prefix: '/geo'
})

const sign = 'c6a3d36c8d43371e21550e1420f0d19e';

router.get('/getPosition', async (ctx) => {
  let { status, data: { province, city } } = await axios.get(`htpp://cp-tools.cn/geo/getPosition?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

router.get('/province', async (ctx) => {
  /*let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }*/
  let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
  ctx.body = {
    province: status === 200 ? province : []
  }
})


router.get('/menu', async (ctx) => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu : []
    }
  }
})


export default router
