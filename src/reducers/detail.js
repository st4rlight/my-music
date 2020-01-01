import { UPDATE_DETAIL } from '../constants/detail'

const INITIAL_STATE = {
    detail: {}
}
  
export default function detail (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_DETAIL:
            return {
                detail: action.detail
            }
        default:
            return state
    }
}