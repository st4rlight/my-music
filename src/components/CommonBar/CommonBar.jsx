import Taro , { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import discImg from '../../assets/imgs/disc.png'
import { AtIcon } from 'taro-ui'

import { connect } from '@tarojs/redux'
import { show_detail, show_play_list } from '../../actions/show'
import { update_play_state } from '../../actions/playMusic'
import { getAudioManager, formatTime } from '../../utils/utils'


import './CommonBar.scss'

@connect(({ show, playMusic, musicTime }) => ({
    show,
    playMusic,
    musicTime
}), (dispatch) => ({
    show_detail(payload){
        dispatch(show_detail(payload))
    },
    update_play_state(playState){
        dispatch(update_play_state(playState))
    },
    show_play_list(showList){
        dispatch(show_play_list(showList))
    }
}))
class CommonBar extends Component {
    handleDetail(){
        this.props.show_detail(true)
    }
    handlePlayPause(){
        let audio = getAudioManager()
        if(this.props.playMusic.playState)
            audio.pause()
        else
            audio.play()
    }
    handleShowList(){
        this.props.show_play_list(true)
    }

    render() {
        let { info, playState } = this.props.playMusic
        let { currentTime, duration } = this.props.musicTime
        return (
            <View className='common-bar'>
                <View className={`cover ${playState ? 'play-active' : null}`} onClick={this.handleDetail.bind(this)}>
                    <Image src={info.picUrl ? info.picUrl : discImg} className='disc-img' lazyLoad />
                </View>
                <View className='info' onClick={this.handleDetail.bind(this)}>
                    <View className='left-info'>
                        <View className='name'>
                            {
                                info ? info.name : ''
                            }
                        </View>
                        <Text className='singer'>
                            {
                                info
                                ?
                                info.singer
                                :
                                ''
                            }
                        </Text>
                    </View>
                    <View className='right-time'>
                        {
                            formatTime(currentTime) + ' / ' + formatTime(duration)
                        }
                    </View>
                </View>
                <View className='play-icon'>
                    <AtIcon
                        prefixClass='icon'
                        value={playState ? 'play' : 'timeout'}
                        size='50' color='#666'
                        onClick={this.handlePlayPause.bind(this)}
                    />
                </View>
                <View className='play-list-icon'>
                    <AtIcon
                        prefixClass='icon'
                        value='bofangliebiao'
                        size='25'
                        color='#aaa'
                        onClick={this.handleShowList.bind(this)}
                    />
                </View>
            </View>
        )
    }
}
export default CommonBar;