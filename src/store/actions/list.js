import wepy from 'wepy'
import {
  LIST__REQUEST,
  LIST__RECEIVE,
  DATA__UPDATE_LIST,
  LIST__EMPTY
} from '../types'
import {createAction} from 'redux-actions'
import {getStore} from 'wepy-redux'
import zsqRequest from '../../common/request-intercept'
import api from '../../common/api'
import {} from '../urls'

const store = getStore()
/**
 * 获取list数据
 * @param listType 数据类型
 * @param listKey 数据索引
 */
const listUrlMap = {}

export const listRequestList = createAction(LIST__RECEIVE, ({listType, listKey, params = {page: 1}, itemKey = 'id', reload = false}, successCallback) => {
  return new Promise(resolve => {
    const isReload = reload || (params.page === 1)
    store.dispatch({
      type: LIST__REQUEST, payload: {
        listKey,
        isReload
      }
    })
    const listUrl = listUrlMap[listType]
    zsqRequest({
      url: listUrl,
      method: 'GET',
      header: {
        ...api.getCommonHeader(store)
      },
      data: {
        ...params
      },
      success: (response) => {
        const {data} = response.data
        renderData(data)
        api.setData(listKey, data)
        successCallback && successCallback(data)
      },
      fail() {
        const data = api.getData(listKey)
        if (data) {
          renderData(data)
        } else {
          console.warn('no network,no data')
        }
      }
    })

    function renderData(data) {
      const {items = [], meta = {}} = data
      let newItems = [...items]
      //存储页面数据
      resolve({
        listKey,
        itemIds: newItems.map(item => item[itemKey]),
        meta,
        isReload
      })
      //更新数据列表
      store.dispatch({
        type: DATA__UPDATE_LIST,
        payload: {
          listType,
          items: api.arrayToObjectIndexedById(newItems, itemKey)
        }
      })
    }
  })
})

export const listEmptyList = createAction(LIST__EMPTY, (listKey) => {
  return {listKey}
})

