import type { WorkOrderPriority, WorkOrderStage } from "./workOrders.types";

export const workOrderStageLabel: Record<WorkOrderStage, string> = {
    cam: "CAM",
    ready: "Ready",
    machining: "Machining",
    inspection: "Inspection",
    complete: "Complete",
    blocked: "Blocked",
};

/** Semantic palette keys for stage chips. */
export type WorkOrderStageColor =
    | "default"
    | "info"
    | "error";

export const workOrderStageChipColor: Record<WorkOrderStage, WorkOrderStageColor> = {
    cam: "default",
    ready: "info",
    machining: "default",
    inspection: "default",
    complete: "default",
    blocked: "error",
};

/** Default stages use grey fill (no outline); semantic stages stay outlined. */
export function workOrderStageChipVariant(
    stage: WorkOrderStage,
): "filled" | "outlined" {
    return workOrderStageChipColor[stage] === "default" ? "filled" : "outlined";
}

// label={workOrderStageLabel[workOrder.stage]}

export const workOrderPriorityLabel: Record<WorkOrderPriority, string> = {
    low: "Low",
    normal: "Normal",
    high: "High",
    critical: "Critical",
};

/** Semantic palette keys for priority chips. */
export type WorkOrderPriorityColor = "default" | "success" | "warning" | "error";

export const workOrderPriorityChipColor: Record<
    WorkOrderPriority,
    WorkOrderPriorityColor
> = {
    low: "default",
    normal: "success",
    high: "warning",
    critical: "error",
};

// label={workOrderPriorityLabel[workOrder.priority]}
