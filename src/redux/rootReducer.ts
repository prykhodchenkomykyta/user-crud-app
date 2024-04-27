import { combineReducers } from '@reduxjs/toolkit';
import usersSlice from './users/usersSlice';

const rootReducer = combineReducers({
  usersSlice 
});

export default rootReducer;
