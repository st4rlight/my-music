import api from './request'

// 获取推荐歌单
export function getRecommendList(){
    return api.get({
        URL: '/personalized'
    })
}

// 获取新碟上架列表
export function getAlbumList(data) {
    return api.get({
        URL: '/top/album',
        data
    })
}

// 获取新歌速递
export function getNewSong() {
    return api.get({
      URL: '/personalized/newsong'
    })
}

// 获取所有榜单
export function getAllRank(){
    return api.get({
        URL: '/toplist'
    })
}

// 获取歌单详情
export function getPlayList(data){
    return api.get({
        URL: '/playlist/detail',
        data
    })
}

// 获取专辑详情
export function getAlbumDetail(data){
    return api.get({
        URL: '/album',
        data
    })
}

// 获取排行榜详情
export function getRankDetail(data){
    return api.get({
        URL: '/top/list',
        data
    })
}

/* 歌曲播放部分 */
// 获取音乐播放url
export function getMusicUrl(data){
    return api.get({
        URL: '/song/url',
        data    // id: xxx
    })
}
// 获取歌词
export function getMusicLyric(data){
    return api.get({
        URL: '/lyric',
        data    // id: xxx
    })
}
// 获取歌曲详情
export function getMusicDetail(data){
    return api.get({
        URL: '/song/detail',
        data    // ids: xxx
    })
}

// 搜索
export function searchByWord(data){
    return api.get({
      URL: '/search',
      data    // keywords    limit    offset   type
    })
}


// 热门搜索
export function getHotSearch(){
  return api.get({
    URL: '/search/hot/detail'
  })
}
