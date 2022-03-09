import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { history } from 'umi';
notification.config({ maxCount: 1 });

/**
 * @description 全局请求
 * 继承至umi-request，为请求配置一些全局配置
 * extend from umi-request，configure some blobal configurations for the request
 */
const timestamp = Date.now();
const request = extend({
  // prefix: `${process.env.REQUEST_BASE_URL}`, //请求统一前缀
  timeout: 10000,
  // headers: headerConfig(),
  credentials: 'include',
  data: {
    // sign: md5(`${process.env.appKey}#${process.env.appSecret}#${timestamp}`),
    // appKey: process.env.appKey,
    // timestamp:timestamp,
  },
});

// 提前对响应做异常处理
request.interceptors.response.use(async (response: Response) => {
  try {
    if (response?.status == 200) {
      const data = await response.clone().json();
      loginAuth(response, data);
    }
    if (response?.status !== 200) {
      // console.log('请求异常',response);
      errorHandel(response);
    }
  } catch (error) {
    console.error(error);
  }
  return response;
});
export default request;

/**
 * @description 请求的异常处理
 * @param {string | number} code response code
 * @param {any} res axios response
 */
function errorHandel(response: Response) {
  const { status, statusText } = response;
  // console.log('errorHandel');
  switch (status) {
    // case 401:
    //   if (!(res.response.data.result && res.response.data.result.isLogin)) {
    //     notification.error({
    //       message: 'Unauthorized',
    //       description: 'Authorization verification failed'
    //     });
    //   }
    //   break;
    default:
      notification.error({
        message: status || 'Unauthorized',
        description: statusText || 'Network Failed',
        duration: 3,
      });
      break;
  }
}
/**
 * @description 请求state是200，但是是异常请求的处理
 * @param {string | number} code response code
 * @param {any} res axios response
 */
function requestErrorHandel(data: any) {
  const { code, message: msg } = data;
  // console.log('errorHandel');
  switch (code) {
    case '80000000':
      break;
    default:
      console.log('请求异常', {
        response: data,
      });
      message.warning(msg || '请求异常');
      break;
  }
}

/**
 * @description request的respone的拦截器，拦截超时登录的请求，超时登录，跳转到登录页
 */
function loginAuth(response: Response, data: any) {
  // console.log(response);
  // console.log(data);
  // 在layout组件就会调用的接口
  const excludeArr: any[] = [];
  if (
    !excludeArr.some((item) => response.url.includes(item)) &&
    data.code == '80000000'
  ) {
    notification.warning({
      message: '登录超时,请重新登录',
      description: '即将跳转到登录页',
      // description: '测试中-暂时不跳转到登录页',
      duration: 3,
    });
    // 登录超时，跳转到登录页面
    let timer: any = setTimeout(() => {
      history.push('/login');
      clearTimeout(timer);
      timer = null;
    }, 2000);
  }
}
/**
 * @description 封装请求，对request请求返回的结果做全局的错误拦截
 * @param requestFunc 
 * @returns 
 */
const syncRequestWarp = <D>(requestFunc: any): Promise<D> => {
  return new Promise<D>(async (resolve, reject) => {
    try {
      requestFunc.then((data: D) => {
        if (data?.code !== '0') {
          requestErrorHandel(data);
          reject(data);
        } else {
          resolve(data);
        }
      }).catch((error: any) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
export { syncRequestWarp };
