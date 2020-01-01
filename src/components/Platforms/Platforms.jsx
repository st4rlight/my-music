import Taro , { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './Platforms.scss'

// 由于小程序端存在问题，因此在此如此引入
import wangyiyun from '../../assets/imgs/wangyiyun.png'
import QQyinyue from '../../assets/imgs/QQyinyue.png'
import xiami from '../../assets/imgs/xiami.png'
import kugou from '../../assets/imgs/kugou.png'
import kuwo from '../../assets/imgs/kuwo.png'
import qianqian from '../../assets/imgs/qianqian.png'

const tabList = [
  { title: '网易云音乐', icon: 'wangyiyun', img: wangyiyun},
  { title: 'QQ音乐',    icon: 'QQyinyue', img: QQyinyue},
  { title: '虾米音乐',   icon: 'xiami', img: xiami},
  { title: '酷狗音乐',   icon: 'kugou', img: kugou},
  { title: '酷我音乐',   icon: 'kuwo', img: kuwo},
  { title: '千千音乐',   icon: 'qianqian', img: qianqian}
];

class Platforms extends Component {
  state = {
      current: 0
  }
  handleClick(value){
    this.setState({
      current: value
    })
  }

  render() {
    return (
      <View>
        <View className='at-row logos-container'>
          {
            tabList.map((item, idx) => {
              return (
                <View className='at-col at-col-1 at-col--auto' key={idx}>
                  <View className={`logo-view-radius ${this.state.current === idx ? 'logo-active' : 'logo-inactive'}`}
                  >
                    <Image
                           src={item.img}
                           // src={require(`../../assets/imgs/${item.icon}`)}
                           className='music-logo'
                           onClick={this.handleClick.bind(this, idx)}
                    />
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
export default Platforms;
