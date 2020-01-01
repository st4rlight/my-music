import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/Index/Index'

import configStore from './store'
// 全局引入taro-ui的样式文件
import 'taro-ui/dist/style/index.scss'
// 引入icon-font
import './assets/iconfont/icon.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {
  config = {
    pages: [
        'pages/Index/Index',
        // 'pages/PlayDetail/PlayDetail',
        'pages/Detail/Detail'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    requiredBackgroundModes: ['audio']
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index className='app-container'/>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
