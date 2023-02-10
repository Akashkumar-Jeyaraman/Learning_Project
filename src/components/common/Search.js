import React, { useContext } from 'react' 
import {UserContext} from '../Comments'
export const Search = (props) => {
    // const {setInputSearch} = props
const {setInputSearch} = useContext(UserContext)
  return (
    <>
    <input  
     type="text"
     onChange={(e) => {
        setInputSearch(e.target.value);
            }}
     placeholder="search..."
    />
    </>
  )
}
