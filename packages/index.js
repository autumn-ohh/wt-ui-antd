import WtTable from './wt-table'
// import WtModal from './wt-modal'
import WtRead from './wt-read/wt-read.vue'
import Psd from './wt-read'
import WtUpload from './wt-upload'
import WtUploadFile from './wt-uploadFile'
// import WtHeader from './wt-header'
import WtCard from './wt-card'
import WtForm from './wt-form/index.vue'
// import WtColor from './wt-color/index.vue'
import WtSearch from './wt-search/index.vue'
import {
  directives
} from './directive/index.js'
import dayjs from 'dayjs'
const formatDate = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (value) {
    if (String(value).length > 11 && /^[0-9]*$/g.test(value)) {
      return dayjs(/^[0-9]*$/g.test(value) ? Number(value) : value).format(format)
    } else {
      return value
    }
  } else {
    return ''
  }
}
const formatDay = (value, format = 'YYYY-MM-DD') => {
  if (value) {
    if (String(value).length > 11 && /^[0-9]*$/g.test(value)) {
      return dayjs(/^[0-9]*$/g.test(value) ? Number(value) : value).format(format)
    } else {
      return value
    }
  } else {
    return ''
  }
}


const components = [WtTable, WtUpload, WtCard, WtForm, WtSearch, WtRead, WtUploadFile]
const install = Vue => {
  // 遍历注册组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // 遍历注册自定义指令
  Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key])
  })

  Vue.prototype.$dayjs = dayjs
  Vue.prototype.$formatDate = (value, format) => formatDate(value, format)
  Vue.prototype.$formatDay = formatDay
  Vue.prototype.$psd = Psd

  Vue.filter('datetime', value =>
    value ? formatDate(value, 'YYYY-MM-DD HH:mm:ss') : ''
  )
  Vue.filter('date', value => value ? formatDate(value, 'YYYY-MM-DD') : '-')
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  ...components
}