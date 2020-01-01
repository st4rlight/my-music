import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './ResultContainer.scss'
import SongItem from "../../components/SongItem/SongItem";
import PropTypes from "prop-types";


class ResultContainer extends Component {
  state = {
      showMore: false,
      resultType: 0
  }

  handleShowMore(){
      let { showMore } = this.state
      showMore = !showMore
      this.setState({
          showMore
      })
  }

  render() {
    let colors = [
      '#d22a0f',
      '#5abd7d',
      '#3f80f6',
      '#fbd340'
    ]
    let platforms = [
        '网易云音乐',
        'QQ音乐',
        '酷狗',
        '酷我'
    ]
    let { dataList } = this.props
    if(!dataList)
        dataList = []

    if(!this.state.showMore)
        dataList = dataList.slice(0, 3)

    return (
      <View className='result-container'>
          <View className='title'>
              <View className='color-block'>
                  <View
                      className='color-strip'
                      style={{ background: colors[0] }}
                  >
                  </View>
              </View>
              <View className='platform-name'>
                  {platforms[0]}
              </View>
              <View className='right-icon-container'>
                  <View className={`right-icon ${this.state.showMore ? 'active': ''}`} onClick={this.handleShowMore.bind(this)}>
                    {
                        this.state.showMore
                          ?
                        '< 返回'
                          :
                        '更多 >'
                    }
                  </View>
              </View>
          </View>
          <View className='body'>
              {
                dataList.map((item, idx) => {
                  return (
                    <SongItem
                      songItem={item}
                    />
                  )
                })
              }
          </View>
      </View>
    );
  }
}

ResultContainer.defaultProps = {
  songItem: {
    id: 123,
    picUrl: '',
    name: '123',
    singer: '123'
  }
};

ResultContainer.propTypes = {
  songItem: PropTypes.object
};


export default ResultContainer
