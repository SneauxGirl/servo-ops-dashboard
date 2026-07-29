import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { workOrders } from './workOrders.data';
import type { WorkOrder, WorkOrderStage } from './workOrders.types';


interface WorkOrdersState {
    items: WorkOrder[];
}

interface UpdateWorkOrderStagePayload {
    id: string;
    stage: WorkOrderStage;
}

const initialState: WorkOrdersState = {
    items: workOrders,
};

const workOrdersSlice = createSlice({
    name: "workOrders",
    initialState,
    reducers: {
        updateWorkOrderStage: (
            state, action: PayloadAction<UpdateWorkOrderStagePayload>,
        ) => {
            const workOrder = state.items.find((item) => item.id === action.payload.id,
            );

            if (!workOrder) {
                return;
            }

            workOrder.stage = action.payload.stage;

            if (action.payload.stage !== "blocked") {
                workOrder.blockedReason = undefined;
            }
        },
    },
});

export const { updateWorkOrderStage } = workOrdersSlice.actions;

export default workOrdersSlice.reducer
