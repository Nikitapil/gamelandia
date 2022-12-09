import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/root-reducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
