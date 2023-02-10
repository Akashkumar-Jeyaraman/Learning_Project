import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import protectedApi from "../utils/api/publicApi";

export const getData = createAsyncThunk(
    "userList/getData",
    async(_,thunkAPI)=>{
        try{
           // const response = await axios.get(process.env.REACT_APP_BASE_URL)
           const response = await protectedApi()
            const data = await response.data
            if(response.status === 200){
                return data
            }else {
                return thunkAPI.rejectWithValue(data.payload.reason)
            }
        }catch(err){
            console.log("ERROR",err.message)
            if(err.response) return thunkAPI.rejectWithValue(err.response.statusText);
            else return thunkAPI.rejectWithValue(err.message)
        }
    }
);

export const createData = createAsyncThunk(
    "userList/createData",
    async(param,thunkAPI)=>{
        try{
           const response = await protectedApi.post("/",{
            title: param.title,
            completed:param.completed,
            userId: param.userId,
           })
            const data = await response.data
            if(response.status === 201){
                return data
            }else {
                
                return thunkAPI.rejectWithValue(data.payload.reason)
            }
           
        }catch(err){
            console.log("ERROR",err.message)
            if(err.response) return thunkAPI.rejectWithValue(err.response.statusText);
            else return thunkAPI.rejectWithValue(err.message)
        }
    }
);

export const updateData = createAsyncThunk(
    "userList/updateData",
    async(param,thunkAPI)=>{
        try{
           const response = await protectedApi.put(`/${param.id}`,{
            id: param.id,
            title: param.title,
            completed:param.completed,
            userId: param.userId,
           })
            const data = await response.data
            if(response.status === 200){
                return data
            }else {
                return thunkAPI.rejectWithValue(data.payload.reason)
            }
           
        }catch(err){
            console.log("ERROR",err.message)
            if(err.response) return thunkAPI.rejectWithValue(err.response.statusText);
            else return thunkAPI.rejectWithValue(err.message)
        }
    }
);

export const deleteData = createAsyncThunk(
    "userList/deleteData",
    async(param,thunkAPI)=>{
        try{
           const response = await protectedApi.delete(`/${param}`)
            const data = await response.data
            console.log(data)
            if(response.status === 200){
                return param
            }else {
                return thunkAPI.rejectWithValue(data.payload.reason)
            }
           
        }catch(err){
            console.log("ERROR",err.message)
            if(err.response) return thunkAPI.rejectWithValue(err.response.statusText);
            else return thunkAPI.rejectWithValue(err.message)
        }
    }
);

const userSlice = createSlice({
    name:"userList",
    initialState:{
        userList:[],
        status:null,
        loading:false
    },
    extraReducers:{
        [getData.pending]: (state)=>{
            state.status="loading";
            state.error=false;
            state.loading=true;
        },
        [getData.fulfilled]: (state,{payload})=>{
            
            state.status="success";
            state.error=false;
            state.loading=false;
            state.userList=payload;
        },
        [getData.rejected]: (state)=>{
            state.status="failed";
            state.error=true;
            state.loading=false;
            state.userList=[];
        },
        [createData.fulfilled]: (state,{payload})=>{
            console.log(state.status)
            state.status="success";
            state.error=false;
            state.loading=false;
            state.userList=[...state.userList,payload]
        },
        [createData.rejected]: (state)=>{
            state.status="failed";
            state.error=true;
            state.loading=false;
            state.createdData=[];
        },
        [updateData.fulfilled]: (state,{payload})=>{
           // console.log(payload)
            state.status="success";
            state.error=false;
            state.loading=false;
            state.userList=
         state.userList.map((dd)=>
        dd.id ===payload.id ?{...dd, title:payload.title,completed:payload.completed,userId:payload.userId} : dd
        )
        },
        [updateData.rejected]: (state)=>{
            state.status="failed";
            state.error=true;
            state.loading=false;
            state.updatedData=[];
        },
        [deleteData.fulfilled]: (state,{payload})=>{
            console.log(payload)
            state.status="success";
            state.error=false;
            state.loading=false;
            state.userList=state.userList.filter((da)=>{
                return da.id !== payload
            });
        },
        [deleteData.rejected]: (state)=>{
            state.status="failed";
            state.error=true;
            state.loading=false;
            state.deletedData=[];
        }
    }
})


// export const UserListSelector = (state)=> state.UL.userList
// export const CreateUserSelector = (state)=> state.UL.createdData
// export const UpdateUserSelector = (state)=> state.UL.updatedData
export const UserSelector=(state)=> {
    const { userList,createdData,updatedData,deletedData} = state.userList;
    return {userList,createdData,updatedData,deletedData};
}
export default userSlice.reducer;