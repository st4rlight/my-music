import Taro from '@tarojs/taro'
import { update_play_state } from '../actions/playMusic'

// 用于保存一些全局的管理器
const globalObj = {}

// 用于设置保存和读取localStorage
export const setCacheData = (key, val) => {
  Taro.setStorageSync(key, val)
}

export const getCacheData = (key) => {
  return Taro.getStorageSync(key)
}


export const setGlobalData = (key, val) => {
  globalObj[key] = val
}

export const getGlobalData = (key) => {
  return globalObj[key]
}

// 获取背景音乐控制器
export const getAudioManager = () => {
    let backgroundAudioManager = getGlobalData('backgroundAudioManager')
    if(!backgroundAudioManager){
        backgroundAudioManager = Taro.getBackgroundAudioManager()
        setGlobalData('backgroundAudioManager', backgroundAudioManager)
    }

    return backgroundAudioManager
}

// 初始化背景音乐信息
export const initBackgroundAudioInfo = (songObj, dispatch) => {
    let audio = getAudioManager()

    try{
        audio.title = songObj.name
        audio.singer = songObj.singer
        audio.coverImgUrl = songObj.picUrl
        audio.src = songObj.url

        audio.seek(0)
        audio.play()
    }catch(err){
        Taro.showToast({
            title: '资源错误',
            icon: 'none',
            duration: 1500
        })
        audio.pause()
        audio.stop()
        dispatch(update_play_state(false))
    }
}

// 处理歌词
// 有些歌词会将重复的部分放在一起，这一类的暂时还没有完全解析
export const formatLyric = (lyric) => {
    if (!lyric)
        return []

    let format = /\[(\d{2}:\d{2})\.\d{2,3}\](.*)/
    let outLrc = {}
    let result = []
    let lrcArr = lyric.split('\n') || []
  
    lrcArr.forEach(item => {
        let matchLrc = item.match(format)
        if (!matchLrc)
            return
        let lrcTime = matchLrc[1]
        let lrcText = matchLrc[2] || '···'
        outLrc[lrcTime] = lrcText
    })
  
    Object.keys(outLrc).forEach(i => {
        let ts = i.split(':')
        let time = parseInt(ts[0]) * 60 + parseInt(ts[1])

        if (result.length) {
            result[result.length - 1].end = time
        }
        result.push({
            start: time,
            lrc: outLrc[i].trim()
        })
    })

    return result
}

// 格式化时间
export const formatTime = (time) => {
    let minute = parseInt(time / 60)
    let second = parseInt(time) - minute * 60
    return `${minute < 10 ? '0' + minute : minute}:${second < 10 ? '0' + second : second}`
}