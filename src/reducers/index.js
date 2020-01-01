import { combineReducers } from 'redux'
import detail from './detail'
import show from './show'
import playMusic from './playMusic'
import musicTime from './musicTime'
import playList from './playList'

export default combineReducers({
    detail,
    show,
    playMusic,
    musicTime,
    playList
})
