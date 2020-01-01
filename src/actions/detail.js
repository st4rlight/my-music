import { UPDATE_DETAIL } from '../constants/detail'

export const update_detail = (detail) => {
    return {
        type: UPDATE_DETAIL,
        detail: detail
    }
}