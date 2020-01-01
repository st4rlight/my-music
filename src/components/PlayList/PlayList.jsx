import Taro , { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View } from '@tarojs/components'
import { AtIcon, AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"

import { close_play_list } from '../../actions/show'
import { update_play_mode, update_play_list } from '../../actions/playList'
import { resetBackgroundAudio } from '../../utils/utils'

import { setAudioById } from '../../utils/playMusic'
import { MM, MODE_ICONS } from '../../constants/playList'
import './PlayList.scss'

@connect(({ playList, playMusic }) => ({
    playList,
    playMusic
}), (dispatch) => ({
    close_play_list(showList){
        dispatch(close_play_list(showList))
    },
    update_play_mode(playMode){
        dispatch(update_play_mode(playMode))
    },
    update_play_list(playList){
        dispatch(update_play_list(playList))
    }
}))
class PlayList extends Component {
    state = {
        showConfirm: false
    }

    handlePlayList(){
        this.props.close_play_list(false)
    }
    handleChangeMode(){
        let { playMode } = this.props.playList
        playMode = (playMode + 1) % 3
        Taro.showToast({
            title: MM[playMode],
            icon: 'none',
            duration: 1500
        })
        this.props.update_play_mode(playMode)
    }
    handleClear(){
        this.setState({
            showConfirm: true
        })
    }
    handleConfirmClose(){
        this.setState({
            showConfirm: false
        })
    }
    handleConfirmCancel(){
        this.setState({
            showConfirm: false
        })
    }
    handleConfirm(){
        let { playList } = this.props.playList
        // playList.splice(0)

        this.props.update_play_list([])
        this.setState({
            showConfirm: false
        })
    }
    handleRemove(idx){
        let { playList } = this.props.playList
        playList.splice(idx, 1)
        this.props.update_play_list(playList)
    }
    handleClick(id){
        setAudioById(id)
    }

    render() {
        let { playMode, playList } = this.props.playList
        let { data } = this.props.playMusic

        return (
            <View className='play-list'>
                <View className='play-list-title'>
                    <View className='left-mode'>
                        <View className='mode-icon' onClick={this.handleChangeMode.bind(this)}>
                            <AtIcon prefixClass='icon' value={MODE_ICONS[playMode]} size='25' color='#000' />
                        </View>
                        <View className='mode-text' onClick={this.handleChangeMode.bind(this)}>
                            { MM[playMode] }
                            <Text>( {playList.length} )</Text>
                        </View>
                    </View>
                    <View className='right-clear' onClick={this.handleClear.bind(this)}>
                        <AtIcon
                            prefixClass='icon'
                            value='qingkong'
                            size='20'
                            color='#999'
                        />
                    </View>
                </View>
                <View className='play-list-body'>
                    <ScrollView
                        className='item-scroll'
                        scrollY
                        scrollWithAnimation
                    >
                        {
                            playList.map((item, idx) => {
                                return (
                                    <View className='list-item-container'>
                                        <View className='left-container'>
                                            <View className='idx-container' onClick={this.handleClick.bind(this, item.id)} >
                                                {idx + 1}.
                                            </View>
                                            <View className='song-info' onClick={this.handleClick.bind(this, item.id)} >
                                                {item.singer}-{item.name}
                                            </View>
                                            <View className={`space-container ${(data.id !== item.id) ? 'play-active' : ''}`}>
                                                
                                            </View>
                                            <View className={`play-icon ${(data.id === item.id) ? 'play-active' : ''}`}>
                                                <AtIcon prefixClass='icon' value='bofangzhong' size='15' color='#666' />
                                            </View>
                                        </View>
                                        <View className='remove-icon' onClick={this.handleRemove.bind(this, idx)}>
                                            <AtIcon prefixClass='icon' value='close' size='25' color='#999' />
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View className='play-list-bottom' onClick={this.handlePlayList.bind(this)}>
                    关闭
                </View>
                <AtModal
                    className='playlist-modal-container'
                    isOpened={this.state.showConfirm}
                    title='提醒'
                    cancelText='取消'
                    confirmText='确认'
                    onClose={ this.handleConfirmClose.bind(this) }
                    onCancel={ this.handleConfirmCancel.bind(this) }
                    onConfirm={ this.handleConfirm.bind(this) }
                    content='清除播放列表？'
                />
            </View>
        )
    }
}
export default PlayList;
