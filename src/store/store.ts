import { configureStore } from "@reduxjs/toolkit";

import { loginSlice } from "./login-info";

export const store = configureStore({
    reducer: {
        login: loginSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch