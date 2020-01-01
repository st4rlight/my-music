import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { getRecommendList, getPlayList } from '../../services/services'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { update_detail } from '../../actions/detail'
import { PLAYLIST } from '../../constants/detail'

import './RecommendList.scss'


@connect(({ detail }) => ({
  detail
}), (dispatch) => ({
    update_detail(payload){
        dispatch(update_detail(payload))
    }
}))
class RecommendList extends Component {
  state = {
    recommendList: []
  }

  componentDidMount() {
    getRecommendList()
      .then(data => {
        this.setState({
          recommendList: data.result
        })
      })
      .catch(err => {
        Taro.showToast({
            title: '获取推荐列表失败',
            icon: 'none',
            duration: 1500
        })
    })
  }

  format = (cnt) => {
      if(cnt < Math.pow(10, 8))
        return (cnt < Math.pow(10, 4)) ? (cnt + '') : ((cnt / Math.pow(10, 4)).toFixed(1) + '万')
      else
        return ((cnt / Math.pow(10, 8)).toFixed(2) + '亿')
  }

  handleClick(id){
    getPlayList({id: id})
    .then(data => {
        let detail = {
            type: PLAYLIST,
            title: data.playlist.name,
            subTitle: data.playlist.description,
            picUrl: data.playlist.coverImgUrl,
            list: data.playlist.tracks
        }
        this.props.update_detail(detail)
    })

    Taro.navigateTo({
        url: '/pages/Detail/Detail'
    })
  }

  render () {
    let first_rec = this.state.recommendList[0];
    return (
      <View className='recommend-wrapper'>
        {
          first_rec ? (
            <View className='recommend-banner at-row' onClick={this.handleClick.bind(this, first_rec.id)}>
                <View className='cover'>
                    <Image
                        src={first_rec.picUrl}
                        className='cover-img'
                        mode='scaleToFill'
                        lazyLoad
                    />
                    <View className='play-cnt'>
                        <AtIcon className='listen'
                                value='iconfont icon-erji'
                                size='14'
                                color='#fff'
                        >
                        </AtIcon>
                        <Text style={{'margin-left': '5PX'}}>{this.format(first_rec.playCount)}</Text>
                    </View>
                </View>
                <View className='info'>
                  <View className='rec-name'>{first_rec.name}</View>
                  <View className='rec-copy'>{first_rec.copywriter}</View>
                  <View className='play-btn'>
                    <AtIcon value='iconfont icon-bofang' size='16' color='#fff'></AtIcon>
                    <Text style={{'margin-left': '5PX'}}>去看看</Text>
                  </View>
                </View>
            </View>
          ) : null
        }

        <ScrollView
            className='item-list'
            scrollWithAnimation={true}
            scrollTop='0'
            scrollY
         >
            {
                this.state.recommendList.length > 1 ? (
                    this.state.recommendList.slice(1).map((item, idx) => {
                        return (
                            <View className='list-items' key={item.id} onClick={this.handleClick.bind(this, item.id)}>
                                <View className='list-left'>
                                    <Image className='list-item-img' src={item.picUrl} mode='aspectFit' lazyLoad />
                                </View>
                                <View className='list-right'>
                                    <View className='list-name'>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View className='list-copy'>
                                        <AtIcon value='iconfont icon-erji' size='16' color='#666'></AtIcon>
                                        <Text style={{'margin-left': '5PX'}}>{this.format(item.playCount)}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                )
                : null
            }
        </ScrollView>
      </View>
    )
  }
}

export default RecommendList
