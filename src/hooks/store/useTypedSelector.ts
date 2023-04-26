import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

// TODO выпилить
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
