import {
    UPDATE_CURRENT_TIME,
    UPDATE_DURATION,
    UPDATE_LYRIC_INDEX
} from '../constants/musicTime'

const INITIAL_STATE = {
    currentTime: 0,
    duration: 0,
    lyricIndex: 0
}
  
export default function musicTime (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime
            }
        case UPDATE_DURATION:
            return {
                ...state,
                duration: action.duration
            }
        case UPDATE_LYRIC_INDEX:
            return {
                ...state,
                lyricIndex: action.lyricIndex
            }
        default:
            return state
    }
}