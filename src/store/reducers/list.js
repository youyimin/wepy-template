import {handleActions} from 'redux-actions'
import {
  LIST__RECEIVE,
  LIST__REQUEST,
  LIST__REMOVE,
  LIST__EMPTY
} from '../types/list'

const initialState = {}
export default handleActions({
  [LIST__REQUEST](state, action) {
    const {listKey, isReload} = action.payload
    return {
      ...state,
      [listKey]: {
        ...state[listKey],
        itemIds: isReload ? [] : state[listKey].itemIds,
        meta: isReload ? {} : state[listKey].meta,
        isLoading: true
      }
    }
  },
  [LIST__RECEIVE](state, action) {
    const {listKey, itemIds, meta, isReload} = action.payload
    return {
      ...state,
      [listKey]: {
        ...state[listKey],
        isLoading: false,
        itemIds: isReload ? itemIds : state[listKey].itemIds.concat(itemIds),
        meta
      }
    }
  },
  [LIST__EMPTY](state, action) {
    const {listKey} = action.payload
    return {
      ...state,
      [listKey]: {}
    }
  },
  [LIST__REMOVE](state, action) {
    const {listKey, itemIds} = action.payload
    return {
      ...state,
      [listKey]: {
        ...state[listKey],
        itemIds
      }
    }
  }
}, {
  ...initialState
})
