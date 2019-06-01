import Router from 'koa-router'
import axios from './utils/axios.js'
import Poi from '../dbs/models/poi.js'

let router = new Router({
  prefix: '/search'
})

const sign = 'c6a3d36c8d43371e21550e1420f0d19e';


router.get('/top', async (ctx) => {
  let {status, data: {top}} = await axios.get(`htpp://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

export default router
