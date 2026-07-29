export type WorkOrderStage = 
| "cam"
| "ready"
| "machining"
| "inspection"
| "complete"
| "blocked"

export type WorkOrderPriority = "low" | "normal" | "high" | "critical"

export interface WorkOrder {
  id: string
  partNumber: string
  partName: string
  customerProgram: string
  material: string
  quantity: number
  completedQuantity: number
  rejectedQuantity: number
  machine: string
  stage: WorkOrderStage
  priority: WorkOrderPriority
  dueDate: string
  blockedReason?: string
}