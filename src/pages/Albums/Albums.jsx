import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getAlbumList, getAlbumDetail } from '../../services/services'
import { connect } from '@tarojs/redux'
import { update_detail } from '../../actions/detail'
import { ALBUMS } from '../../constants/detail'
import './Albums.scss'

@connect(({ detail }) => ({
    detail
}), (dispatch) => ({
    update_detail(payload){
        dispatch(update_detail(payload))
    }
}))
class Albums extends Component {
  state = {
      albums: []
  }
  
  formatTime = (time) => {
    let timeObj = new Date(time);
       let year = timeObj.getFullYear() + '';
      let month = timeObj.getMonth() + 1;
          month = (month < 10) ? '0' + month : month + '';
       let date = timeObj.getDay();
           date = (date < 10) ? '0' + date : date + '';
       let hour = timeObj.getHours();
           hour = (hour < 10) ? '0' + hour : hour + '';
     let minute = timeObj.getMinutes();
         minute = (minute < 10) ? '0' + minute : minute + '';

    return `${year}-${month}-${date} 发行`
  }
  componentDidMount(){
    getAlbumList({offset: 0, limit: 30})
        .then(data => {
            this.setState({
                albums: data.albums
            })
        })
        .catch(err => {
            Taro.showToast({
                title: '获取新碟上架失败',
                icon: 'none',
                duration: 1500
            })
        })
  }
  handleClick(id){
    getAlbumDetail({ id })
        .then(data => {
            let detail = {
                type: ALBUMS,
                title: data.album.name,
                subTitle: data.album.description,
                picUrl: data.album.picUrl,
                list: data.songs
            }
            this.props.update_detail(detail)
        })
    
    Taro.navigateTo({
        url: '/pages/Detail/Detail'
    })
  }

  render () {
    return (
      <View className='albums-wrapper'>
        <ScrollView
          scrollY
          scrollTop='0'
          className='albums-list'>
          {
            this.state.albums.map((item, idx) => {
              return (
                  <View className='album-itembox' key={item.id}>
                    <View className='cover' onClick={this.handleClick.bind(this, item.id)}>
                      <Image src={item.picUrl} lazyLoad></Image>
                    </View>
                    <View className='info'>
                      <View className='name'>{item.name}</View>
                      <View className='singer'>{item.artist.name}</View>
                      <View className='release-time'>{this.formatTime(item.publishTime)}</View>
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

export default Albums
