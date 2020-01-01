import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import PropTypes from 'prop-types';

import { setAudioById } from '../../utils/playMusic'
import './SongItem.scss'


@connect(({ playMusic }) => ({
  playMusic
}))
class SongItem extends Component {
  state = {
    songs: []
  }

  handleClick(id){
    setAudioById(id)
  }

  render () {
    let { data } = this.props.playMusic
    let { songItem } = this.props

    return (
      <View className='song-item-container'>
          <View className={`song-itembox ${songItem.id === data.id ? 'play-active' : ''}`} key={songItem.id} onClick={this.handleClick.bind(this, songItem.id)}>
            <View className='song-info'>
              <View className='cover'>
                <Image src={songItem.picUrl} className='cover-img' lazyLoad></Image>
              </View>
              <View className='info'>
                <View className='name'>
                  {songItem.name}
                </View>
                <Text className='singer'>
                  {songItem.author}
                </Text>
              </View>
            </View>
            <View className='play-icon'>
              {
                data.id === songItem.id
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
      </View>
    )
  }
}

// 注意props必须设置defaultProps才能传递
SongItem.defaultProps = {
  songItem: {
    id: 123,
    picUrl: '',
    name: '123',
    author: '123'
  }
};

SongItem.propTypes = {
  songItem: PropTypes.object
};

export default SongItem
