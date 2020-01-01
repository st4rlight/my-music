import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar, AtFloatLayout } from 'taro-ui'

import { connect } from '@tarojs/redux'
import { update_current_time, update_duration, update_lyric_index } from '../../actions/musicTime'
import { close_play_list } from '../../actions/show'
import { update_play_state } from '../../actions/playMusic'
import { getAudioManager, initBackgroundAudioInfo } from '../../utils/utils'
import { setAudioById } from '../../utils/playMusic'

// 引入四个主要页面，由于tabbar的原因，这四个页面采用组件化
import Discovery from '../Discovery/Discovery'
import Account   from '../Account/Account'
import Search    from '../Search/Search'
import Settings  from '../Settings/Settings'
import PlayDetail from '../PlayDetail/PlayDetail'

import CommonBar from '../../components/CommonBar/CommonBar'
import TabContainer from '../../components/TabContainer/TabContainer'
import PlayList from '../../components/PlayList/PlayList'

import './Index.scss'

const defaultTabs = [
  { title: '发现', iconType: 'iconfont icon-hot' },
  { title: '我的', iconType: 'iconfont icon-account' },
  { title: '搜索', iconType: 'iconfont icon-search' },
  { title: '其它', iconType: 'iconfont icon-all'},
];

@connect(({ show, musicTime, playMusic, playList }) => ({
    show,
    musicTime,
    playMusic,
    playList
}), (dispatch) => ({
    update_current_time(currentTime){
        dispatch(update_current_time(currentTime))
    },
    update_duration(duration){
        dispatch(update_duration(duration))
    },
    update_lyric_index(lyricIndex){
        dispatch(update_lyric_index(lyricIndex))
    },
    update_play_state(playState){
        dispatch(update_play_state(playState))
    },
    close_play_list(showList){
        dispatch(close_play_list(showList))
    }
}))
class Index extends Component {
  state = {
    current: 2
  }

  config = {
    navigationBarTitleText: '音乐聚合'
  }

  componentDidMount() {
    let audio = getAudioManager()

    audio.onCanplay(() => {
        let duration = audio.duration || 0
        let currentTime = audio.currentTime || 0
        this.props.update_current_time(currentTime)
        this.props.update_duration(duration)
    })
    audio.onTimeUpdate(() => {
        let currentTime = audio.currentTime || 0

        if(currentTime - this.props.musicTime.currentTime < 0.9)
            return

        this.props.update_current_time(currentTime)

        let { lyric } = this.props.playMusic
        lyric.forEach((item, idx) => {
            if(item.start <= currentTime && item.end > currentTime){
                this.props.update_lyric_index(idx)
            }
        })
    })
    audio.onPlay(() => {
        this.props.update_play_state(true)
    })
    audio.onPause(() => {
        this.props.update_play_state(false)
    })
    audio.onStop(() => {
        this.props.update_play_state(false)
    })
    audio.onEnded(() => {
        this.props.update_play_state(false)

        let { playList, playMode } = this.props.playList
        let { data } = this.props.playMusic
        let audio = getAudioManager()

        if(playList.length === 0){
            setAudioById(data.id, true)
            return
        }

        // 获取当前播放的歌曲在playList中的下标
        let index = -1
        for(let i = 0; i < playList.length; i++){
            if(data.id === playList[i].id){
                index = i
                break
            }
        }

        // 根据当前的播放模式确定要播放的下一首歌在playList中的下标
        switch(playMode){
            case 0:
                index = (index + 1) % playList.length
                break
            case 1:
                if(playList.length === 1){
                    index = index
                    break
                }else{
                    let random = parseInt(Math.random() * playList.length)
                    while(random === index){
                        random = parseInt(Math.random() * playList.length)
                    }
                    index = random
                    break
                }
            case 2:
                index = index
                break
            default:
                break
        }

        setAudioById(playList[index].id, true)
    })
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }

  handleCloseList(){
      this.props.close_play_list(false)
  }

  render () {
    return (
      <View className='index'>
        <View className='tabs-container'>
            {
                this.state.current === 0 ?
                  <Discovery />
                  :
                  null
            }
            {
                this.state.current === 1 ?
                    <TabContainer title='我的'>
                        <Account />
                    </TabContainer>
                    :
                    null
            }
            {
                this.state.current === 2 ?
                    <TabContainer title='搜索'>
                        <Search />
                    </TabContainer>
                    :
                    null
            }
            {
                this.state.current === 3 ?
                    <TabContainer title='其它'>
                        <Settings />
                    </TabContainer>
                    :
                    null
            }
        </View>

        <View className='common-bar-container'>
            <CommonBar />
        </View>

        <View className='play-detail-container'>
            <AtFloatLayout isOpened={this.props.show.showDetail} title="">
                <PlayDetail />
            </AtFloatLayout>
        </View>
        <View className='play-list-container'>
            <AtFloatLayout
                isOpened={this.props.show.showList}
                title=""
                onClose={this.handleCloseList.bind(this)}
            >
                <PlayList />
            </AtFloatLayout>
        </View>
        <AtTabBar
            tabList={defaultTabs}
            onClick={this.handleClick}
            current={this.state.current}
            fixed={true}
            iconSize={24}
            fontSize={16}
            border={true}
          />
      </View>
    )
  }
}

export default Index
