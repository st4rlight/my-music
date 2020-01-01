import {
    UPDATE_PLAY_MODE,
    UPDATE_PLAY_LIST
} from '../constants/playList'

export const update_play_mode = (playMode) => {
    return {
        type: UPDATE_PLAY_MODE,
        playMode
    }
}

export const update_play_list = (playList) => {
    return {
        type: UPDATE_PLAY_LIST,
        playList
    }
}