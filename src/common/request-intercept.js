import wepy from 'wepy'
import api from './api'

export default (params) => {
  const {success, fail, url, data, header} = params
  const newSuccess = (response) => {
    const {statusCode} = response
    if (statusCode >= 400) {
      api.logError({
        url,
        data,
        header,
        status_code: statusCode
      })
    }
    success && success.call(null, response)
  }
  const newFail = (response) => {
    api.logError({
      url,
      data,
      header,
      request_fail: response
    })
    fail && fail.call(null, response)
  }
  wepy.request({
    ...params,
    success: newSuccess,
    fail: newFail
  })
}
