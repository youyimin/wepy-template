import _ from 'underscore'
import wepy from 'wepy'
import {LOG_CREATE_URL} from "../store/urls";

export default {
  //log error
  logError({request_fail = '', url = '', status_code = '', header = '', data = ''} = {}) {
    wepy.request({
      url: LOG_CREATE_URL,
      method: 'POST',
      data: {
        request_fail,
        request_status_code: status_code,
        request_url: url,
        request_header: header,
        request_data: data
      }
    })
  },
  getScrollViewHeight(subtractHeight = 0) {
    if (!this.sys) {
      this.sys = wepy.getSystemInfoSync()
    }
    const {windowHeight, screenWidth} = this.sys
    return windowHeight - subtractHeight * (screenWidth / 750)
  },
  setData(key, data) {
    wx.setStorageSync(key, data)
  },
  getData(key) {
    return wx.getStorageSync(key)
  },
  getErrorMessage(data) {
    return _.values(data)[0]
  },
  arrayToObjectIndexedById(arr, idColumnName = 'id') {
    return arr.reduce((acc, item) => {
      acc[item[idColumnName]] = item
      return acc
    }, {})
  },
  getCsrfToken(store) {
    return store.getState().userCenter.csrfToken || ''
  },
  getAccessToken(store) {
    return (this.getData('access_token') || store.getState().userCenter.userInfo.access_token) || ''
  },
  getCommonHeader(store) {
    return {
      'X-CSRF-Token': this.getCsrfToken(store),
      'Access-Token': this.getAccessToken(store)
    }
  },
  secondsToTimeStr(seconds) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds - h * 3600) / 60)
    const s = seconds - h * 3600 - m * 60
    const strArr = [this.doubleInt(h), this.doubleInt(m), this.doubleInt(s)]
    if (h > 0) {
      return `${strArr[0]}:${strArr[1]}:${strArr[2]}`
    } else {
      return `${strArr[1]}:${strArr[2]}`
    }
  },
  doubleInt(num) {
    return (num + '').length > 1 ? num : '0' + num
  },
  get2decimalNumber(str) {
    return Number.parseFloat(str).toFixed(2)
  },
  getCurrentPageUrl() {
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length - 1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    return url
  },
  getCurrentPageUrlWithArgs() {
    let pages = getCurrentPages()    //获取加载的页面
    let currentPage = pages[pages.length - 1]    //获取当前页面的对象
    let url = currentPage.route    //当前页面url
    let options = currentPage.options    //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    let urlWithArgs = url + '?'
    for (let key in options) {
      let value = options[key]
      urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
  }
}

