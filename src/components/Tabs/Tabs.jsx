import Taro , { Component } from '@tarojs/taro';
import { AtTabs, AtTabsPane } from 'taro-ui'
import './Tabs.scss'

const tabList = [
  { title: "推荐歌单", id: "cloud-recommend" },
  { title: "新碟上架", id: "cloud-newdisks" },
  { title: "新歌速递", id: "cloud-newsongs" },
  { title: "所有榜单", id: "cloud-ranklist" },
];

class Tabs extends Component {
  state={
      current: 0
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
        <AtTabsPane current={this.state.current} index={0}>
            {this.props.renderRecommend}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
            {this.props.renderAlbums}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
            {this.props.renderNewSong}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={3}>
            {this.props.renderAllRank}
        </AtTabsPane>
      </AtTabs>
    )
  }
}
export default Tabs;
