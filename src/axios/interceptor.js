import { getTokenFromCookie } from '../utils/cookie'

function setInterceptor(axiosService) {
  axiosService.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 어떤 처리를 할 수 있다.
      config.headers.Authorization = getTokenFromCookie()
        ? `Bearer ${getTokenFromCookie()}`
        : ''
      return config
    },
    function (error) {
      // 요청이 잘못되었을 때 에러가 컴포넌트 단으로 오기 전에 어떤 처리를 할 수 있다.
      return Promise.reject(error)
    }
  )

  return axiosService
}

export { setInterceptor }
