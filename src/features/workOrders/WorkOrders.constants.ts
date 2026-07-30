import type { WorkOrderPriority, WorkOrderStage } from "./workOrders.types";

export const workOrderStageLabel: Record<WorkOrderStage, string> = {
    cam: "CAM",
    ready: "Ready",
    machining: "Machining",
    inspection: "Inspection",
    complete: "Complete",
    blocked: "Blocked",
};

// label={workOrderStageLabel[workOrder.stage]}

export const workOrderPriorityLabel: Record<WorkOrderPriority, string> = {
    low: "Low",
    normal: "Normal",
    high: "High",
    critical: "Critical",
};

// label={workOrderPriorityLabel[workOrder.priority]}