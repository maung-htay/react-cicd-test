import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserAccessData = {
    access: string,
    refresh: string,
    token?: string
}

const initialState: UserAccessData = {
    access: "",
    refresh: "",
    token: ""
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserAccessData>) => {
            state.access = action.payload.access
            state.refresh = action.payload.refresh
        },
        logout: (state) => {
            state.access = ""
            state.refresh = ""
        }
    }
})

export const { login, logout } = loginSlice.actions