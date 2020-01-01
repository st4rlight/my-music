import Taro , { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './TagContainer.scss'

export default class TagContainer extends Component {
    handleClick(){
        this.props.handleClearHistory()
    }
    render() {
        return (
            <View className='tag-container'>
                <View className='title'>
                    <View className='text'>
                        {this.props.title}
                    </View>
                    <View className='icon'>
                        {
                            this.props.show_icon
                            ?
                            <AtIcon prefixClass='icon' value='qingkong' size='20' color='#666'
                                onClick={this.handleClick.bind(this)}
                            />
                            :
                            null
                        }
                    </View>
                </View>
                <View className='body'>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
