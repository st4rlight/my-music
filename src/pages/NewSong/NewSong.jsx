import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'

import { setAudioById } from '../../utils/playMusic'

import {
    getNewSong,
} from '../../services/services'

import './NewSong.scss'


@connect(({ playMusic }) => ({
    playMusic
}))
class Newsong extends Component {
    state = {
        songs: []
    }

    componentDidMount(){
        getNewSong()
          .then(data => {
              this.setState({
                  songs: data.result
              })
          })
          .catch(err => {
            Taro.showToast({
                title: '获取新歌速递失败',
                icon: 'none',
                duration: 1500
            })
          })
    }
    handleClick(id){
        setAudioById(id)
    }
    render () {
        let { data } = this.props.playMusic
        return (
            <View className='NewSongs'>
                <ScrollView
                    className='item-scroll'
                    scrollY
                    scrollWithAnimation
                >
                {
                    this.state.songs.map((item, idx) => {
                        return (
                            <View className={`song-itembox ${item.id === data.id ? 'play-active' : null}`} key={item.id} onClick={this.handleClick.bind(this, item.id)}>
                                <View className='song-info'>
                                    <View className='cover'>
                                        <Image src={item.picUrl} className='cover-img' lazyLoad></Image>
                                    </View>
                                    <View className='info'>
                                        <View className='name'>{item.name}</View>
                                        <Text className='singer'>
                                            {
                                                item.song.artists.reduce((str, curr) => {
                                                    return str + ' ' + curr.name
                                                }, '').trim()
                                            }
                                        </Text>
                                    </View>
                                </View>
                                <View className='play-icon'>
                                    {
                                        data.id === item.id
                                        ?
                                        <AtIcon
                                            color='#999'
                                            prefixClass='icon'
                                            value='bofangzhong'
                                            size='20'
                                        />
                                        :
                                        null
                                    }
                                </View>
                            </View>
                        )
                    })
                }
                </ScrollView>
            </View>
        )
    }
}

export default Newsong
