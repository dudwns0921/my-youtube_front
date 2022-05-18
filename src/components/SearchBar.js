import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const handleNavigateSearch = async () => {
    navigate(`search/${keyword}`);
    setKeyword('');
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
      <button type="button" onClick={handleNavigateSearch}>
        검색하기
      </button>
    </div>
  );
}

export default SearchBar;
