// src/pages/WorkOrderDetails.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes } from "react-router";
import { WorkOrderDetails } from "./WorkOrderDetails";
import workOrdersReducer from "../features/workOrders/workOrders.slice";
import type { WorkOrder } from "../features/workOrders/workOrders.types";

const mockWorkOrder: WorkOrder = {
  id: "WO-1042",
  partNumber: "SRV-8821-A",
  partName: "Upper Actuator Bracket",
  customerProgram: "Aquila",
  material: "7075 Aluminum",
  quantity: 24,
  completedQuantity: 18,
  rejectedQuantity: 2,
  machine: "DMG Mori DMU 50",
  stage: "inspection",
  priority: "high",
  dueDate: "2026-07-25",
};

function renderWithProviders(initialId: string) {
  const store = configureStore({
    reducer: { workOrders: workOrdersReducer },
    preloadedState: {
      workOrders: { items: [mockWorkOrder] },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/work-orders/${initialId}`]}>
        <Routes>
          <Route path="/work-orders/:id" element={<WorkOrderDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe("WorkOrderDetails", () => {
  it("renders the matching work order", () => {
    renderWithProviders("WO-1042");

    expect(screen.getByText("Upper Actuator Bracket")).toBeInTheDocument();
    expect(screen.getByText("SRV-8821-A")).toBeInTheDocument();
    expect(screen.getByText("Aquila")).toBeInTheDocument();
  });

  it("shows not-found state for an unknown id", () => {
    renderWithProviders("WO-9999");

    expect(screen.getByText(/work order not found/i)).toBeInTheDocument();
  });
});