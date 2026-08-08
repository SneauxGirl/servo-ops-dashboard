import type { WorkOrderPriority, WorkOrderStage } from "./workOrders.types";

export const workOrderStageLabel: Record<WorkOrderStage, string> = {
    cam: "CAM",
    ready: "Ready",
    machining: "Machining",
    inspection: "Inspection",
    complete: "Complete",
    blocked: "Blocked",
};

/** Semantic palette keys shared by stage chips and progress bars. */
export type WorkOrderStageColor =
    | "primary"
    | "info"
    | "purple"
    | "warning"
    | "success"
    | "error";

export const workOrderStageChipColor: Record<WorkOrderStage, WorkOrderStageColor> = {
    cam: "primary",
    ready: "info",
    machining: "purple",
    inspection: "warning",
    complete: "success",
    blocked: "error",
};

// label={workOrderStageLabel[workOrder.stage]}

export const workOrderPriorityLabel: Record<WorkOrderPriority, string> = {
    low: "Low",
    normal: "Normal",
    high: "High",
    critical: "Critical",
};

// label={workOrderPriorityLabel[workOrder.priority]}
