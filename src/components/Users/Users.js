import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
// import ReactPaginate from 'react-paginate';

let Users = ({currentPage, totalUsersCount, sizePage, onPageChanged, users, ...props}) => {
  //let countPages = Math.ceil(totalUsersCount / sizePage);
  return (
    <div className="container">
      { 
      <Paginator 
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        sizePage={sizePage}
      /> 
      // <ReactPaginate
      //   previousLabel={'<'}
      //   nextLabel={'>'}
      //   breakLabel={'...'}
      //   breakClassName={'break-me'}
      //   pageCount={countPages}
      //   onPageChange={onPageChanged}
      //   marginPagesDisplayed={2}
      //   pageRangeDisplayed={5}
      //   containerClassName={'pagination'}
      //   activeClassName={'active'}
      //   pageClassName={'page-item'}
      //   pageLinkClassName={'page-link'}
      //   previousClassName={'page-item'}
      //   nextClassName={'page-item'}
      //   previousLinkClassName={'page-link'}	
      //   nextLinkClassName={'page-link'} 
      // /> 
     
      }
      <div>
      {
        users.map(user => {
          return (
            <User 
              user={user}
              key={user.id} 
              followingInProgress={props.followingInProgress}
              unfollow={props.unfollow}
              follow={props.follow}
            />
          );
        })
      }
      </div>
    </div>
  );
};

export default Users;
