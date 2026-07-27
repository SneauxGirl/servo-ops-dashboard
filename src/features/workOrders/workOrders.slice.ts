import { createSlice } from '@reduxjs/toolkit';
import { workOrders } from './workOrders.data';
import type { WorkOrder } from './workOrders.types';


interface WorkOrdersState {
    items: WorkOrder[];
}

const initialState: WorkOrdersState = {
    items: workOrders,
};

const workOrdersSlice = createSlice({
    name: "workOrders",
    initialState,
    reducers: {},
});

export default workOrdersSlice.reducer
