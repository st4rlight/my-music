import {
    UPDATE_SONG_DATA,
    UPDATE_SONG_LYRIC,
    UPDATE_SONG_INFO,
    UPDATE_PLAY_STATE
} from '../constants/playMusic'

const INITIAL_STATE = {
    data: {},
    lyric: [],
    info: {},
    playState: false
}

export default function playMusic(state = INITIAL_STATE, action){
    switch(action.type){
        case UPDATE_SONG_DATA:
            return {
                ...state,
                data: {
                    ...action.payload
                }
            }
        case UPDATE_SONG_LYRIC:
            return {
                ...state,
                lyric: action.payload
            }
        case UPDATE_SONG_INFO:
            return {
                ...state,
                info: action.payload
            }
        case UPDATE_PLAY_STATE:
            return {
                ...state,
                playState: action.playState
            }    
        default:
            return state    
    }
}