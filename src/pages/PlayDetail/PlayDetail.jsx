import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import discImg from '../../assets/imgs/disc.png'
import { AtIcon } from 'taro-ui';

import { connect } from '@tarojs/redux'
import { close_detail, show_play_list, close_play_list } from '../../actions/show'
import { update_play_mode } from '../../actions/playList'
import { getAudioManager, formatTime } from '../../utils/utils'
import { setAudioById } from '../../utils/playMusic'
import { MM, MODE_ICONS } from '../../constants/playList'

import './PlayDetail.scss'

@connect(({ show, playMusic, musicTime, playList }) => ({
    show,
    playMusic,
    musicTime,
    playList
}), (dispatch) => ({
    close_detail(payload){
        dispatch(close_detail(payload))
    },
    show_play_list(showList){
        dispatch(show_play_list(showList))
    },
    close_play_list(showList){
        dispatch(close_play_list(showList))
    },
    update_play_mode(playMode){
        dispatch(update_play_mode(playMode))
    }
}))
class PlayDetail extends Component {
    handleDetail(){
        this.props.close_detail(false)
    }
    handlePlayPause(){
        let audio = getAudioManager()
        if(this.props.playMusic.playState)
            audio.pause()
        else
            audio.play()
    }
    handleChange(e){
        let audio = getAudioManager()
        let { duration } = this.props.musicTime
        
        audio.seek(e.detail.value / 100 * duration)
        audio.play()
    }
    handleCloseList(){
        this.props.close_play_list(false)
    }
    handleShowList(){
        this.props.show_play_list(true)
    }
    handleChangeMode(){
        let { playMode } = this.props.playList
        playMode = (playMode + 1) % 3

        Taro.showToast({
            title: MM[playMode],
            icon: 'none',
            duration: 1000
        })
        this.props.update_play_mode(playMode)
    }
    handleSwitch(num){
        let { playList } = this.props.playList
        if(playList.length === 0){
            Taro.showToast({
                title: '播放列表为空',
                icon: 'none',
                duration: 1500
            })
            return
        }

        let { data } = this.props.playMusic
        let index = -1
        
        for(let i = 0; i < playList.length; i++){
            if(playList[i].id === data.id){
                index = i
                break
            }
        }

        index += num
        if(index < 0)
            index = playList.length - 1
        else
            index %= playList.length

        setAudioById(playList[index].id)
    }

    render () {
        let { data, info, lyric, playState } = this.props.playMusic
        let { currentTime, duration, lyricIndex } = this.props.musicTime
        let { playMode } = this.props.playList

        return (
            <View className='play-detail'>
                <View className='top-container'>
                    {/* 关闭按钮 */}
                    <View className='top-close'>
                        <AtIcon className='icon' prefixClass='icon' value='close' size='45' color='#bbb'
                            onClick={this.handleDetail.bind(this)}
                        />
                    </View>

                    {/* 封面 */}
                    <View className='cover-container'>
                        <View className={`cover ${playState ? 'play-active' : null}`}>
                            <Image src={ info.picUrl ? info.picUrl : discImg } mode='scaleToFill' lazyLoad />
                        </View>
                    </View>

                    {/* 歌词 */}
                    <View className='lyric-box'>
                        {
                            lyric.map((item, idx) => {
                                return (
                                    <View
                                        key={idx}
                                        className={`lyric-item ${(lyricIndex === idx) ? 'select' : ''} ${(idx === lyricIndex + 1) ? 'ready' : ''} ${(idx === lyricIndex - 1) ? 'prev' : ''}`}
                                    >
                                        <Text>{item.lrc}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                
                {/* 操作面板 */}
                <View className='bottom-container'>
                    {/* 歌曲信息，包括歌名和歌曲名 */}
                    <View className='song-info'>
                        <View className='song-name'>
                            {
                                info ? info.name : ''
                            }
                        </View>
                        <View className='singer'>
                            { 
                                info
                                ?
                                info.singer
                                :
                                ''
                            }
                        </View>
                    </View>
                    {/* 歌曲进度条 */}
                    <View className='progress-container'>
                        <Slider
                            value={parseInt(currentTime * 100 / duration)}
                            blockSize='12'
                            className='progress'
                            onChange={this.handleChange.bind(this)}
                        />
                    </View>
                    <View className='time'>
                        {
                            formatTime(currentTime) + ' / ' + formatTime(duration)
                        }
                    </View>
                    <View className='control'>
                        <View className='control-icons'>
                            <AtIcon
                                prefixClass='icon'
                                value={MODE_ICONS[playMode]}
                                size='25'
                                color='#fff'
                                onClick={this.handleChangeMode.bind(this)}
                            />
                            <AtIcon
                                prefixClass='icon'
                                value='prev'
                                size='25'
                                color='#fff'
                                onClick={this.handleSwitch.bind(this, -1)}
                            />
                            <AtIcon
                                prefixClass='icon'
                                value={playState ? 'my_play' : 'my_pause'}
                                size='35'
                                color='#fff'
                                onClick={this.handlePlayPause.bind(this)}
                            />
                            <AtIcon
                                prefixClass='icon'
                                value='next'
                                size='25'
                                color='#fff'
                                onClick={this.handleSwitch.bind(this, 1)}
                            />
                            <AtIcon
                                prefixClass='icon'
                                value='musiclist'
                                size='25'
                                color='#fff'
                                onClick={this.handleShowList.bind(this)}
                            />
                        </View>
                    </View>
                </View>

                <View className='play-list-container'>
                    <AtFloatLayout
                        isOpened={this.props.show.showList}
                        title=""
                        onClose={this.handleCloseList.bind(this)}
                    >
                    </AtFloatLayout>
                </View>
            </View>
        )
    }
}

export default PlayDetail