/**
 * 创建axios的实例，增加拦截器
 */
import axios, { AxiosResponse } from 'axios';
import codeMessages from './codeMessages';
import { message } from 'antd';

const instance = axios.create({
    timeout: 10000,
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * request拦截器
 */
instance.interceptors.request.use(
    (config: any) => {
        config.headers.Authorization = 'Bearer';
        if (!/^http/.test(config.url)) {
            // 本地服务走代理
            config.url = `/api${/^\//.test(config.url) ? '' : '/'}${config.url}`;
        }
        return config;
    },
    (error: any) => {
        Promise.reject(error);
    }
);

/**
 * response拦截器
 */
instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        const data = response.data;
        if (data.code !== 200) {
            message.error(data.msg);
            Promise.reject('请求错误');
        }
        return data;
    },
    (error: any) => {
        error.response &&
            message.error(
                codeMessages[error.response.status] ||
                    error.response.data.data ||
                    '服务器错误，请重试'
            );
        return Promise.reject(error);
    }
);

export default instance;
