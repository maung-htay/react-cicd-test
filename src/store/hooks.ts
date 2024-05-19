import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook
} from "react-redux"

import type { RootState, AppDispatch } from "./store"

type AppDispatchHook = () => AppDispatch
export const useAppDispatch: AppDispatchHook = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector