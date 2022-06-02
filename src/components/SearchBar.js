import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  input {
    border-radius: 1rem;
  }
`

function SearchBar() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const handleNavigateSearch = async () => {
    navigate(`search/${keyword}`)
    setKeyword('')
  }
  return (
    <Container>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        value={keyword}
      />
      <button type="button" onClick={handleNavigateSearch}>
        검색하기
      </button>
    </Container>
  )
}

export default SearchBar
