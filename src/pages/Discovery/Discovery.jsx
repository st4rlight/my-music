import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Tabs from '../../components/Tabs/Tabs'
import RecommendList from "../RecommendList/RecommendList"
import Platforms from '../../components/Platforms/Platforms'
import Albums from '../Albums/Albums'
import './Discovery.scss'
import NewSong from '../NewSong/NewSong'
import AllRank from '../AllRank/AllRank'

class Discovery extends Component {
  render() {
    return (
      <View className='Discovery'>
        <Platforms />
        <Tabs
            renderRecommend={
                <RecommendList />
            }
            renderAlbums={
                <Albums />
            }
            renderNewSong={
                <NewSong />
            }
            renderAllRank={
                <AllRank />
            }
        />
      </View>
    );
  }
}
export default Discovery;
