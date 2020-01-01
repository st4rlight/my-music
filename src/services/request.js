import axios from 'taro-axios'
import { BASE_URL, HTTP_ERROR } from "../config/config";

function checkRes(res, resolve){
  if (typeof res.status === 'number' && res.status >= 200 && res.status < 300) {
    resolve(res.data)
    return;
  }

  const msg = HTTP_ERROR[res.status] || `ERROR CODE: ${res.statusCode}`
  throw new Error(msg || '服务端返回异常')
}

function request(options, method = 'GET'){
  const { URL, data } = options;

  return new Promise((resolve, reject) => {
    axios({
        params: {
            ...data
        },
        method: method,
        url: `${BASE_URL}${URL}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          ...options.header
        }
    }).then(res => {
        checkRes(res, resolve)

    }).catch(err => {
      if(reject)
          reject(err);
      else
          console.log(err);
    })
  })
}

function get(options){
  return this.request({
    ...options
  })
}

export default {
  request,
  get
}
