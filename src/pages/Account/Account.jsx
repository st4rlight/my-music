import Taro , { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import cd from '../../assets/imgs/cd.jpg'
import './Account.scss'

export default class Account extends Component {
  render() {
    return (
      <View className='account-container'>
          <View className='account-icons-container'>
              <View className='account-icons'>
                  <View className='account-item'>
                      <AtIcon prefixClass='icon' value='bendi1' size='35' color='#4d83dd'></AtIcon>
                      <View className='icon-title'>本地音乐</View>
                  </View>
                  <View className='account-item'>
                      <AtIcon prefixClass='icon' value='zuijinbofang' size='35' color='#eea91e'></AtIcon>
                      <View className='icon-title'>最近播放</View>
                  </View>
                  <View className='account-item'>
                      <AtIcon prefixClass='icon' value='wangyiyunyinle' size='35' color='#e14141'></AtIcon>
                      <View className='icon-title'>网易云音乐</View>
                  </View>
                  <View className='account-item'>
                      <AtIcon prefixClass='icon' value='spotify' size='35' color='#4ec756'></AtIcon>
                      <View className='icon-title'>Spotify</View>
                  </View>
              </View>
          </View>
          <View className='my-song-list'>
                <View className='top'>
                    <View className='title'>
                        我的歌单
                    </View>
                    <View className='icon'>
                        <AtIcon prefixClass='icon' value='sandian' size='25' color='#666'></AtIcon>
                    </View>
                </View>
                <View className='center'>
                    <View className='cover'>
                        <Image src={cd} className='cover-img' />
                    </View>
                    <View className='favorite'>
                        <View className='title'>我喜欢的音乐</View>
                        <View className='cnt'>0首歌曲</View>
                    </View>
                </View>
                <View className='bottom'>
                    <View className='bottom-item'>
                        <AtIcon prefixClass='icon' value='jiansuo' size='20' color='#000'></AtIcon>
                        <Text>搜索歌单</Text>
                    </View>
                    <View className='bottom-item'>
                        <AtIcon prefixClass='icon' value='daoru' size='20' color='#000'></AtIcon>
                        <Text>导入歌单</Text>
                    </View>
                </View>
          </View>
      </View>
    );
  }
}
