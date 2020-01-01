import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { update_detail } from '../../actions/detail'
import { RANKLIST } from '../../constants/detail'

import './AllRank.scss'
import { getAllRank, getRankDetail } from '../../services/services'


const map_id = {
    "0": '云音乐新歌榜',
    "1": '云音乐热歌榜',
    "2": '网易原创歌曲榜',
    "3": '云音乐飙升榜',
    "4": '云音乐国电榜',
    "5": 'UK排行榜周榜',
    "6": '美国Billboard周榜',
    "7": 'KTV唛榜',
    "8": 'iTunes榜',
    "9": 'Hit FM Top榜',
    "10": '日本Oricon周榜',
    "11": '韩国Melon排行榜周榜',
    "12": '韩国Mnet排行榜周榜',
    "13": '韩国Melon原声周榜',
    "14": '中国TOP排行榜(港台榜)',
    "15": '中国TOP排行榜(内地榜)',
    "16": '香港电台中文歌曲龙虎榜',
    "17": '华语金曲榜',
    "18": '中国嘻哈榜',
    "19": '法国 NRJ Vos Hits 周榜',
    "20": '台湾Hito排行榜',
    "21": 'Beatport全球电子舞曲榜',
    "22": '云音乐ACG音乐榜',
    "23": '云音乐说唱榜',
    "24": '云音乐古典音乐榜',
    "25": '云音乐电音榜',
    "26": '抖音排行榜',
    "27": '新声榜',
    "28": '云音乐韩语榜',
    "29": '英国Q杂志中文版周榜',
    "30": '电竞音乐榜',
    "31": '云音乐欧美热歌榜',
    "32": '云音乐欧美新歌榜',
    "33": '说唱TOP榜',
    "34": '云音乐ACG动画榜',
    "35": '云音乐ACG游戏榜',
    "36": '云音乐ACG VOCALOID榜'
}
@connect(({ detail }) => ({
    detail
}), ( dispatch ) =>({
    update_detail(payload){
        dispatch(update_detail(payload))
    }
}))
class Allrank extends Component {
    state = {
        ranks: [],
        mm: {}
    }

    componentDidMount(){
        let obj = {}
        Object.keys(map_id).forEach(key => {
            obj[map_id[key].trim()] = key
        })
        let result = {}

        getAllRank()
            .then(data => {
                data.list.forEach(item => {
                    result[item.name] = obj[item.name]
                })

                this.setState({
                    ranks: data.list,
                    mm: result
                })
            })
            .catch(err => {
                Taro.showToast({
                    title: '获取所有榜单失败',
                    icon: 'none',
                    duration: 1500
                })
            })
    }
    handleClick(item){
        getRankDetail({idx: this.state.mm[item.name]})
            .then(data => {
                let detail = {
                    type: RANKLIST,
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
        return (
        <View className='AllRank'>
            <ScrollView
                className='item-scroll'
                scrollY
                scrollWithAnimation
            >
                <View className='container'>
                {
                    this.state.ranks.map((item, idx) => {
                        return (
                            <View className='item-wrapper' onClick={this.handleClick.bind(this, item)} key={item.id}>
                                <View className='cover'>
                                    <Image className='cover-img' src={item.coverImgUrl} />
                                    <View className='frequency'>
                                        {item.updateFrequency}
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        </View>
    )
  }
}

export default Allrank
