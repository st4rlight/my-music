import {
    SHOW_DETAIL,
    CLOSE_DETAIL,
    SHOW_PLAY_LIST,
    CLOSE_PLAY_LIST
} from '../constants/show'

const INITIAL_STATE = {
  showDetail: false,
  showList: false
}

export default function show (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_DETAIL:
    case CLOSE_DETAIL:
       return {
           ...state,
           showDetail: action.showDetail
       }
    case SHOW_PLAY_LIST:
    case CLOSE_PLAY_LIST:
        return {
            ...state,
            showList: action.showList
        }  
    default:
       return state
  }
}
