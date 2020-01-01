import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import MenuItem from './MenuItem'
import './Settings.scss'

export default class Settings extends Component {
    render() {
        return (
            <View className='settings'>
                <MenuItem
                    single={true}
                    underline={false}
                    setting='关联音乐服务'
                    icon='yinle-'
                />
                <MenuItem
                    single={true}
                    underline={false}
                    setting='设置'
                    icon='shezhi'
                />

                <MenuItem
                    single={false}
                    underline={true}
                    setting='推荐给好友'
                    icon='shouji-'
                />
                <MenuItem
                    single={false}
                    underline={true}
                    setting='常见问题'
                    icon='bangzhu-'
                />
                <MenuItem
                    single={false}
                    underline={true}
                    setting='意见反馈'
                    icon='duanxin-'
                />
                <MenuItem
                    single={false}
                    underline={true}
                    setting='关于音乐聚合'
                    icon='yingyongshichang-'
                />                                                                
            </View>
        )
    }
}