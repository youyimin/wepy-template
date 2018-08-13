import {handleActions} from 'redux-actions'
import {DATA__UPDATE_LIST} from '../types/data'
import api from '../../common/api'

const initialState = {}
export default handleActions({
  [DATA__UPDATE_LIST](state, action) {
    const {listType, items} = action.payload
    return {
      ...state,
      [listType]: {
        ...state[listType],
        ...items
      }
    }
  },
}, {
  ...initialState
})
