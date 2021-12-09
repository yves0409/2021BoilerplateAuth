import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchLocal = ({ keyword, setKeyword }) => {
  const handleFilter = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div style={{ display: "flex" }}>
      <SearchOutlined className="m-2" />
      <input
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleFilter}
        className="form-control mb-4"
      />
    </div>
  );
};

export default SearchLocal;
