import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './MenuItem.scss'

export default class Settings extends Component {
    render() {
        return (
            <View className={`setting-menu-item ${this.props.single ? 'single-setting' : null}`}>
                <View className='setting-icon'>
                    <AtIcon prefixClass='icon' value={this.props.icon} size='25'></AtIcon>
                </View>
                <View className={`right-title ${this.props.underline  ? 'underline' : null}`}>
                    {this.props.setting}
                </View>
                <View className={`right-icon-container ${this.props.underline  ? 'underline' : null}`}>
                    <AtIcon
                        prefixClass='icon'
                        value='xiala-copy'
                        size='20'
                        color='#999'
                        className='arrow-icon'
                    >
                    </AtIcon>
                </View>
            </View>
        )
    }
}