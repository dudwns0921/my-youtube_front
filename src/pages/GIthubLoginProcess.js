import React, { useEffect } from 'react'
import { githubLogin } from '../axios/axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { saveTokenToCookie } from '../utils/cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slicer/isLoginSlice'
import { insert } from '../redux/slicer/userDataSlice'

function GIthubLoginProcess() {
  const dispatch = useDispatch()
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
        dispatch(insert(data.user))
        dispatch(login())
        navigate('/')
      }
    }
  }
  return <div>Processing...</div>
}

export default GIthubLoginProcess
