import {
  DATA__UPDATE_LIST
} from '../types/data'
import {createAction} from 'redux-actions'
import {getStore} from 'wepy-redux'

const store = getStore()
export const dataUpdateList = createAction(DATA__UPDATE_LIST, ({listType, items}) => {
  return new Promise(resolve => {
    resolve({
      listType,
      items
    })
  })
})
