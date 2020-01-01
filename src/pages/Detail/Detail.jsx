import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtFloatLayout  } from 'taro-ui'

import { getAudioManager } from '../../utils/utils'
import { setAudioById } from '../../utils/playMusic'

import { close_detail, close_play_list } from '../../actions/show'
import { update_play_list } from '../../actions/playList'

import CommonBar from '../../components/CommonBar/CommonBar'
import PlayDetail from '../PlayDetail/PlayDetail'
import PlayList from '../../components/PlayList/PlayList'

import './Detail.scss'


@connect(({ detail, playMusic, show, playList }) => ({
  detail,
  playMusic,
  playList,
  show,
}), (dispatch) => ({
    close_detail(showDetail){
        dispatch(close_detail(showDetail))
    },
    close_play_list(showList){
        dispatch(close_play_list(showList))
    },
    update_play_list(playList){
        dispatch(update_play_list(playList))
    }
}))
class Detail extends Component {
    config = {
        navigationBarTitleText: '内容详情'
    }

    handleClick(id){
        setAudioById(id)
    }
    handleCloseList(){
        this.props.close_play_list(false)
    }
    addToList(){
        let { playList } = this.props.playList
        let { list } = this.props.detail.detail
        let mm = {}
        playList.forEach(item => {
            mm[item.id] = true
        })

        list.forEach(item => {
            let singer = item.ar.reduce((str, curr) => {
                            return str + ' ' + curr.name
                        }, '').trim()   ||   ''

            if(!mm[item.id]){
                playList.push({
                    id: item.id,
                    name: item.name,
                    picUrl: item.al.picUrl,
                    singer
                })
            }
        })

        this.props.update_play_list(playList)
        Taro.showToast({
            title: '添加到播放列表成功',
            icon: 'none',
            duration: 1500
        })
    }

    componentWillUnmount(){
        this.props.close_detail()
        this.props.close_play_list()
    }

    render () {
        let { detail } = this.props.detail
        let { data } = this.props.playMusic

        return (
            <View className='Detail'>
                <ScrollView
                    className='detail-scroll'
                    scrollY
                    scrollTop='0'>
                    <View className='cover-img-container'>
                        <Image
                            mode='aspectFill'
                            className='cover-img'
                            src={detail.picUrl}
                            lazyload
                        />
                        <View className='add-to-list'>
                            <AtIcon
                                color='#fff'
                                prefixClass='icon'
                                value='tianjiadao'
                                size='20'
                                onClick={this.addToList.bind(this)}
                            />
                        </View>
                    </View>

                    <View className='listInfo'>
                        <View className='title'>{detail.title || ''}</View>
                        <View className='sub-title'>{detail.subTitle || ''}</View>
                    </View>
                    <View className='list'>
                    {
                        detail.list ? (
                        detail.list.map((item, idx) => {
                            return (
                                <View
                                        className={`list-item ${data.id === item.id ? 'play-active' : null}`}
                                        key={item.id}
                                        onClick={this.handleClick.bind(this, item.id)}
                                    >
                                    <View className='item-idx'>{idx + 1}</View>
                                    <View className='item-info'>
                                        <View className='left-info'>
                                            <View className='name'>{item.name || ''}</View>
                                            <View className='singer'>
                                                {
                                                    item.ar.reduce((str, curr) => {
                                                        return str + ' ' + curr.name
                                                    }, '').trim()
                                                    ||
                                                    ''
                                                }
                                            </View>
                                        </View>
                                        <View className='right-icon'>
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
                                </View>
                            )
                        })
                        )
                        : null
                    }
                    </View>
                </ScrollView>
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
            </View>
        )
    }
}

export default Detail
