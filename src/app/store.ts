import { configureStore } from "@reduxjs/toolkit";
import workOrdersReducer from "../features/workOrders/workOrders.slice";

export const store = configureStore({
    reducer: {
        workOrders: workOrdersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;