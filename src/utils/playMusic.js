import Taro from '@tarojs/taro'
import { initBackgroundAudioInfo, formatLyric, getAudioManager } from './utils'
import {
    getMusicUrl,
    getMusicLyric,
    getMusicDetail
} from '../services/services'

import {
    update_song_data,
    update_song_info,
    update_play_state,
    update_song_lyric
} from '../actions/playMusic'

import { update_play_list } from '../actions/playList'
import configStore from '../store/index'

import { useDispatch, useStore } from '@tarojs/redux'
let dispatch = useDispatch()
let store = useStore()


// 传入id，播放指定的音频
export const setAudioById = (id, onEnded = false) => {
    let state = store.getState()
    if(state.playMusic.data.id === id && !onEnded)
        return

    // 提前更新id，保证ui显示
    let { data } = state.playMusic
    let url_info = {
        ...data,
        id
    }
    dispatch(update_song_data(url_info))


    let manager = getAudioManager()
    manager.pause()

    try{
        getMusicUrl({id})
        .then(res => {
            let url_info = {
                id: res.data[0].id,
                url: res.data[0].url,
                type: res.data[0].type
            }
            dispatch(update_song_data(url_info))

            getMusicDetail({ids: id})
            .then(resp => {
                let singer = resp.songs[0].ar.reduce((str, curr) => {
                    return str + ' ' + curr.name
                }, '').trim()

                let detail = {
                    name: resp.songs[0].name,
                    picUrl: resp.songs[0].al.picUrl,
                    singer
                }
                dispatch(update_song_info(detail))

                initBackgroundAudioInfo({
                    ...detail,
                    ...url_info
                }, dispatch)
                dispatch(update_play_state(true))


                // 添加到播放列表
                let { playList } = state.playList
                let flag = playList.some(item => {
                    return (item.id === id)
                })
                if(!flag){
                    playList.push({
                        id,
                        ...detail
                    })
                    dispatch(update_play_list(playList))
                }
            })
        })

        getMusicLyric({id})
        .then(res => {
            dispatch( update_song_lyric( formatLyric(res.lrc ? res.lrc.lyric : '') ) )
        })

    }catch(err){
        Taro.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 1500
        })
        dispatch(update_play_state(false))
    }
}

// 