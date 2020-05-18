import axios from 'axios';

export default axios.create(
{
    // 表示根目录
    baseURL:'http://vebcoder.cn:9527/api'
});