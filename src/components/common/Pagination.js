import React from 'react'
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import "./Pagination.css";
import { Tooltip } from '@mui/material';
export const Pagination = (props) => {
    const {data,paginate,setPostsPerPage,postsPerPage,className,currentPage,onPageChange,siblingCount=1,totalCount=data.length,pageSize=postsPerPage} = props
    const paginationRange = usePagination({
       currentPage,
       totalCount,
      siblingCount,
      pageSize
    });
 
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(data.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }


    const onNext = () => {
      onPageChange(currentPage + 1);
    };
  
    const onPrevious = () => {
      onPageChange(currentPage - 1);
    };

let lastPage = pageNumbers[pageNumbers.length-1]
  return (
    <>
    <div style={{display:"inline-block"}}>
    <label>Rows Per Page : 
    <select onChange={(e)=>setPostsPerPage(e.target.value)}>
      <option>5</option>
      <option>10</option>
      <option>25</option>
    </select>
    </label>
    
  
     <nav >
      <ul className={classnames('pagination-container', { [className]: className })}>
     <Tooltip title="First Page">     
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={() => paginate(1)}
      >
        <p className="arrow left" />
        <p className="arrow left" />
      </li>
      </Tooltip>
      <Tooltip title="Prev">
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      </Tooltip>
        {paginationRange.map((number,i) => {
            if (number === DOTS) {
                return <li key={i} className="pagination-item dots">&#8230;</li>;
          }
            return (
          <li 
          key={i}
          className={classnames('pagination-item', {
            selected: number === currentPage,
          })}
             onClick={() => onPageChange(number)}
                >
         {number}
          </li>
          );
        }
        )}
        <Tooltip title="Next">
           <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
      </Tooltip>
      <Tooltip title="Last Page">
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        onClick={() => paginate(pageNumbers[pageNumbers.length-1])}
      >
        <p className="arrow right" />
        <p className="arrow right" />
      </li>
      </Tooltip>
      </ul>
    </nav>
    </div>
    </>
  )
}

