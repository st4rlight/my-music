import {
    SHOW_DETAIL,
    CLOSE_DETAIL,
    SHOW_PLAY_LIST,
    CLOSE_PLAY_LIST
} from '../constants/show'

export const show_detail = (showDetail) => {
    return {
        type: SHOW_DETAIL,
        showDetail
    }
}
export const close_detail = (showDetail) => {
    return {
        type: CLOSE_DETAIL,
        showDetail
    }
}

export const show_play_list = (showList) => {
    return {
        type: SHOW_PLAY_LIST,
        showList
    }
}
export const close_play_list = (showList) => {
    return {
        type: CLOSE_PLAY_LIST,
        showList
    }
}
