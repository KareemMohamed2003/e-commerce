import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './reduxStore';
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
