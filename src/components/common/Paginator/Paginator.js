import React from "react";
import s from "./Paginator.module.css";


let Paginator = ({totalUsersCount, sizePage, currentPage, onPageChanged, ...props}) => {
  
  let countPages = Math.ceil(totalUsersCount / sizePage);
  let pages = [];

  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  }

  return (
    <div>
    {
      pages.map(p => {
        return (
          <span
            className={currentPage === p && s.selectedPage}
            onClick={e => {
              onPageChanged(p);
            }}
          >
            {p}
          </span>
        );
      })
    }
    </div>
  );
};

export default Paginator;
