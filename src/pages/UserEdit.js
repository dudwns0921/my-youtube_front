import React from 'react'
import { Outlet, Link } from 'react-router-dom'

function UserEdit() {
  return (
    <div>
      <div>
        <Link to="">정보 수정하기</Link>
        <Link to="pwd">비밀번호 수정하기</Link>
      </div>
      <Outlet />
    </div>
  )
}

export default UserEdit
