import {
    UPDATE_SONG_DATA,
    UPDATE_SONG_LYRIC,
    UPDATE_SONG_INFO,
    UPDATE_PLAY_STATE
} from '../constants/playMusic'

export const update_song_data = (payload) => {
    return {
        type: UPDATE_SONG_DATA,
        payload
    }
}
export const update_song_lyric = (payload) => {
    return {
        type: UPDATE_SONG_LYRIC,
        payload
    }
}
export const update_song_info = (payload) => {
    return {
        type: UPDATE_SONG_INFO,
        payload
    }
}
export const update_play_state = (playState) => {
    return {
        type: UPDATE_PLAY_STATE,
        playState
    }
}