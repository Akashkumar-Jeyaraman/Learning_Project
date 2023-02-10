import { MenuItem, TextField } from '@mui/material'
import React from 'react'

export const AddForm = (props)=>{

    const {handleSubmit,setName,setUid,setComp,edData,edited,handleUpdate,name,uid,comp} = props
    const opt = [
        {
            label:"yes",
            value:true
        },{
            label:"no",
            value:false
        }
    ]

    return(
        <>
        { edited !== true ?(
             <form onSubmit={(e)=>handleSubmit(e)}>
             <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e)=>setName(prev => e.target.value)}   />
             <br/>
             <TextField type='number' id="outlined-basic" label="User Id" variant="outlined" onChange={(e)=>setUid(e.target.value)}/>
             <br/>
             <TextField sx={{width:195}}  id="outlined-select-currency" defaultValue= "false" select label="Completed" variant="outlined" onChange={(e)=>setComp(e.target.value)} >
                 {opt.map((op)=>(
                <MenuItem key={op.label} value={op.value}>
                {op.label}
                </MenuItem>
                ))}
             </TextField>
              <br/>
               <input type="submit" />
            </form>
        ):(     
             //  edData.map((ed,i)=>(
            <form key={edData.id} onSubmit={(e)=>handleUpdate(e,edData.id)}>
    
         <TextField 
         id="outlined-basic" 
         label="Name" 
         variant="outlined" 
         onChange={(e)=>setName( e.target.value)} 
         value={name}  
         />
         <br/>
         <TextField 
         type='number' 
         id="outlined-basic" 
         label="User Id" 
         variant="outlined" 
         onChange={(e)=>setUid(e.target.value) }
         value={uid} 
         />
         <br/>
         <TextField  
         sx={{width:195}} 
         id="outlined-select-currency" 
         select label="Completed" 
         variant="outlined" 
         onChange={(e)=>setComp(e.target.value)}  
         value={comp}
         >
         {opt.map((op)=>(
                <MenuItem key={op.label}  value={op.value}>
                {op.label}
                </MenuItem>
            ))}
         </TextField>
         <br/>
     
           <input type="submit" value="update" />
       </form>
    //   ))
     )
        }
        
    
        
        </>
    )
}