import React from "react";
import { ImSearch } from "react-icons/im";

const SearchBar = () => {
  return (
    <div>
      <form className="d-flex flex-row">
        <input type="text" placeholder="Search" name="search" id="search" />
        <div className="button position-relative">
          <ImSearch className="post-action-icon position-absolute top-50 start-50"></ImSearch>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
