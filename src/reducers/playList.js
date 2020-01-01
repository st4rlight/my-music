import {
    UPDATE_PLAY_MODE,
    UPDATE_PLAY_LIST
} from '../constants/playList'

const INITIAL_STATE = {
    playMode: 0,
    playList: []
}
  
export default function detail (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_PLAY_MODE:
            return {
                ...state,
                playMode: action.playMode
            }
        case UPDATE_PLAY_LIST:
            return {
                ...state,
                playList: action.playList
            }
        default:
            return state
    }
}