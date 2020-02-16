import React, { useState } from "react";
import s from "./Paginator.module.css";
import cn from "classnames";


let Paginator = ({totalItemsCount, sizePage, currentPage, onPageChanged, portionSize = 20}) => {
  
  let countPages = Math.ceil(totalItemsCount / sizePage);
  let pages = [];
  

  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(countPages / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={cn(s.paginator)}>
    {
      portionNumber > 1 && 
      <button 
        className = {s.navigationBtn}
        onClick={() => {setPortionNumber(portionNumber - 1)}}
      >
      &lt;    
      </button>
    }
    { 
      pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
        return (
          <div
            className={cn({[s.selectedPage] : currentPage === p }, s.pageNumber)}
            key={p}
            onClick={(e) => {
              onPageChanged(p);
            }}
          >
            {p}
          </div>
        );
      })
    }
    {
      portionCount > portionNumber && 
      <button 
        className = {s.navigationBtn}
        onClick={() => {setPortionNumber(portionNumber + 1)}}
      >></button>
    }
    </div>
  );
};

export default Paginator;
