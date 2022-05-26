import React from 'react'
import { Outlet, Link, useOutletContext } from 'react-router-dom'

function UserEdit() {
  const outletContext = useOutletContext()
  const [setIsLogin, userData, setUserData] = outletContext
  return (
    <div>
      <div>
        <Link to="">정보 수정하기</Link>
        <Link to="pwd">비밀번호 수정하기</Link>
      </div>
      <Outlet context={[setIsLogin, userData, setUserData]} />
    </div>
  )
}

export default UserEdit
