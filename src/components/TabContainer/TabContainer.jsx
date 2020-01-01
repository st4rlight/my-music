import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from "taro-ui"
import './TabContainer.scss'

export default class TabContainer extends Component {
    render() {
        return (
            <View className='my-tab-container'>
                <View className='common-title'>
                    {this.props.title}
                </View>
                <View className='tab'>
                    {this.props.children}
                </View>
            </View>
        )
    }
}