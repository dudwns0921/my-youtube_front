import React, { useEffect } from 'react'
import { githubLogin } from '../axios/axios'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import { saveTokenToCookie, saveUserToCookie } from '../utils/cookie'

function GIthubLoginProcess() {
  const [setIsLogin] = useOutletContext()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    checkGithubLogin()
  }, [])
  const checkGithubLogin = async () => {
    const githubCode = new URLSearchParams(location.search).get('code')
    if (githubCode) {
      const { data } = await githubLogin({ githubCode })
      if (data.result === 'success') {
        saveTokenToCookie(data.token)
        saveUserToCookie(JSON.stringify(data.user))
        setIsLogin(true)
        navigate('/')
      }
    }
  }
  return <div>Processing...</div>
}

export default GIthubLoginProcess
