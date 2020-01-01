import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtSearchBar, AtIcon, AtTag, AtTabs, AtTabsPane  } from 'taro-ui'
import TagContainer from './TagContainer'
import ResultContainer from "./ResultContainer";
import { searchByWord, getAlbumDetail, getHotSearch } from '../../services/services'
import './Search.scss'

const tabList = [
  { title: "单曲", id: "search-song" },
  { title: "歌单", id: "search-songlist" },
  { title: "歌手", id: "search-singer" },
  { title: "专辑", id: "search-album" },
];

export default class Search extends Component {
    state = {
        value: '',
        currentTab: 0,
        hotList: [],
        history: [],
        showResult: false,
        dataList: []
    }

    componentDidMount(){
        getHotSearch()
          .then(res => {
              let hotList = []
              res.data.forEach(item => {
                let listItem = {
                  'name': item.searchWord,
                  'score': item.score
                }
                hotList.push(listItem)
              })
              this.setState({
                  hotList
              })
          })
          .catch(err => {
             Taro.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 1500
             })
          })
    }

    handleChange(value){
        this.setState({
            value
        })
    }
    handleConfirm(){
        if(this.state.value.trim().length === 0){
            Taro.showToast({
                title: '搜索关键字不能为空',
                icon: 'none',
                duration: 1500
            })
            return

        }
        else {
            this.setState({
                dataList: []
            })

            // 添加到历史记录中
            let { history } = this.state
            let flag = history.some(item => {
                return item === this.state.value
            })
            if(!flag)
                history.unshift(this.state.value)

            // 检索
            let params = {
                keywords: this.state.value,
                limit: 20,
                type: 1
            }
            searchByWord(params)
              .then(res => {
                  let dataList = []
                  res.result.songs.forEach(item => {
                      let author = item.artists.reduce((str, curr) => {
                        return str + ' ' + curr.name
                      }, '').trim()

                      getAlbumDetail({id: item.album.id})
                        .then(resp => {
                          dataList.push({
                                id: item.id,
                                name: item.name,
                                picUrl: resp.album.picUrl,
                                author,
                          })
                          // TODO: 这里可能存在同步异步问题
                          this.setState({
                              dataList
                          })
                        }).catch(err => {
                            console.log(err)
                        })
                  })
              })
        }

        // 更改状态
        this.setState({
            showResult: true
        })
    }
    handleActionClick(){
        if (this.state.showResult) {
            this.setState({
              showResult: false,
              value: ''
            })
        } else {
            this.handleConfirm()
        }
    }
    handleClear(){
        this.setState({
            value: '',
            showResult: false
        })
    }
    handleTagClick(value){
        this.setState({
            value
        }, () => {
            this.handleConfirm()
        })
    }
    handleTabClick(currentTab){
        this.setState({
            currentTab
        })
    }
    handleClearHistory(){
        this.setState({
            history: []
        })
    }

    render() {
        return (
            <View className='search-container'>
                <View className='search-bar'>
                    <AtSearchBar
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        placeholder='全平台搜索'
                        actionName={this.state.showResult ? '取消' : '搜索'}
                        showActionButton={this.state.showResult}
                        onConfirm={this.handleConfirm.bind(this)}
                        onActionClick={this.handleActionClick.bind(this)}
                        onClear={this.handleClear.bind(this)}
                    />
                </View>
                <View className='navi-result-container'>
                    {
                        this.state.showResult
                            ?
                          (
                              <AtTabs className='search-tabs' current={this.state.currentTab} tabList={tabList} onClick={this.handleTabClick.bind(this)}>
                                <AtTabsPane current={this.state.currentTab} index={0}>
                                    <View className='result-container'>
                                        <ScrollView
                                          className='item-scroll'
                                          scrollY
                                          scrollWithAnimation
                                        >
                                            <ResultContainer
                                                dataList={this.state.dataList}
                                            />
                                        </ScrollView>
                                    </View>
                                </AtTabsPane>
                                <AtTabsPane current={this.state.currentTab} index={1}>
                                </AtTabsPane>
                                <AtTabsPane current={this.state.currentTab} index={2}>
                                </AtTabsPane>
                                <AtTabsPane current={this.state.currentTab} index={3}>
                                </AtTabsPane>
                              </AtTabs>
                          )
                            :
                          (
                              <View className='navi-container'>
                              <View className='search-icons'>
                                <View className='item left'>
                                  <AtIcon prefixClass='icon' value='geci' size='30' color='#4f86d9'/>
                                  <View className='title'>歌词搜歌</View>
                                </View>
                                <View className='item right'>
                                  <AtIcon prefixClass='icon' value='zhusoutinggeshiqu' size='30' color='#eaae3c'/>
                                  <View className='title'>听歌识曲</View>
                                </View>
                              </View>
                              <View className='recommend'>
                                <TagContainer title='热门推荐' show_icon={false}>
                                    <ScrollView
                                      className='hot-list'
                                      scrollWithAnimation={true}
                                      scrollTop='0'
                                      scrollY
                                    >
                                        {
                                          this.state.hotList.map((item, idx) => {
                                            return (
                                              <AtTag
                                                key={idx}
                                                name={'recommend-' + idx}
                                                type='primary'
                                                onClick={this.handleTagClick.bind(this, item.name)}
                                              >
                                                { item.name }
                                              </AtTag>
                                            )
                                          })
                                        }
                                    </ScrollView>
                                </TagContainer>
                              </View>
                              <View className='history'>
                                <TagContainer title='历史记录' show_icon={true} handleClearHistory={this.handleClearHistory.bind(this)}>
                                  <ScrollView
                                    className='item-list'
                                    scrollWithAnimation={true}
                                    scrollTop='0'
                                    scrollY
                                  >
                                    {
                                      this.state.history.map((item, idx) => {
                                        return (
                                          <AtTag
                                            key={idx}
                                            name={'history-' + idx}
                                            type='primary'
                                            onClick={this.handleTagClick.bind(this, item)}
                                          >
                                            {item}
                                          </AtTag>
                                        )
                                      })
                                    }
                                  </ScrollView>
                                </TagContainer>
                              </View>
                            </View>
                          )
                    }
                </View>
            </View>
        );
    }
}
