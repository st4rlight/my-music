import {
    UPDATE_CURRENT_TIME,
    UPDATE_DURATION,
    UPDATE_LYRIC_INDEX
} from '../constants/musicTime'

export const update_current_time = (currentTime) => {
    return {
        type: UPDATE_CURRENT_TIME,
        currentTime
    }
}
export const update_duration = (duration) => {
    return {
        type: UPDATE_DURATION,
        duration
    }
}

export const update_lyric_index = (lyricIndex) => {
    return {
        type: UPDATE_LYRIC_INDEX,
        lyricIndex
    }
}