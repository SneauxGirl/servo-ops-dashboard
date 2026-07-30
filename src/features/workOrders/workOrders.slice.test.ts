// src/features/workOrders/workOrders.slice.test.ts
import { describe, it, expect } from "vitest";
import workOrdersReducer, { updateWorkOrderStage } from "./workOrders.slice";
import type { WorkOrder } from "./workOrders.types";

const baseWorkOrder: WorkOrder = {
  id: "WO-1001",
  partNumber: "A-1",
  partName: "Bracket A",
  customerProgram: "Aquila",
  material: "Aluminum",
  quantity: 10,
  completedQuantity: 5,
  rejectedQuantity: 0,
  machine: "Haas",
  stage: "machining",
  priority: "normal",
  dueDate: "2026-08-01",
};

function getInitialState(items: WorkOrder[]) {
  return { items };
}

describe("workOrdersSlice", () => {
  it("updates the stage of the matching work order", () => {
    const state = getInitialState([baseWorkOrder]);

    const nextState = workOrdersReducer(
      state,
      updateWorkOrderStage({ id: "WO-1001", stage: "inspection" }),
    );

    expect(nextState.items[0].stage).toBe("inspection");
  });

  it("does nothing if the id doesn't match any work order", () => {
    const state = getInitialState([baseWorkOrder]);

    const nextState = workOrdersReducer(
      state,
      updateWorkOrderStage({ id: "WO-9999", stage: "inspection" }),
    );

    expect(nextState.items[0].stage).toBe("machining");
  });

  it("clears blockedReason when moving off the blocked stage", () => {
    const blockedWorkOrder: WorkOrder = {
      ...baseWorkOrder,
      stage: "blocked",
      blockedReason: "Awaiting replacement tool",
    };
    const state = getInitialState([blockedWorkOrder]);

    const nextState = workOrdersReducer(
      state,
      updateWorkOrderStage({ id: "WO-1001", stage: "machining" }),
    );

    expect(nextState.items[0].stage).toBe("machining");
    expect(nextState.items[0].blockedReason).toBeUndefined();
  });

  it("keeps blockedReason if the new stage is still blocked", () => {
    const blockedWorkOrder: WorkOrder = {
      ...baseWorkOrder,
      stage: "blocked",
      blockedReason: "Awaiting replacement tool",
    };
    const state = getInitialState([blockedWorkOrder]);

    const nextState = workOrdersReducer(
      state,
      updateWorkOrderStage({ id: "WO-1001", stage: "blocked" }),
    );

    expect(nextState.items[0].blockedReason).toBe("Awaiting replacement tool");
  });
});