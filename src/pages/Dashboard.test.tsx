// src/pages/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import { Dashboard } from "./Dashboard";
import workOrdersReducer from "../features/workOrders/workOrders.slice";
import type { WorkOrder } from "../features/workOrders/workOrders.types";

const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-1001", partNumber: "A-1", partName: "Bracket A", customerProgram: "Aquila",
    material: "Aluminum", quantity: 10, completedQuantity: 10, rejectedQuantity: 0,
    machine: "Haas", stage: "complete", priority: "low", dueDate: "2026-07-01",
  },
  {
    id: "WO-1002", partNumber: "A-2", partName: "Bracket B", customerProgram: "Orion",
    material: "Titanium", quantity: 5, completedQuantity: 2, rejectedQuantity: 0,
    machine: "Mazak", stage: "blocked", priority: "critical", dueDate: "2026-07-05",
    blockedReason: "Awaiting tool",
  },
  {
    id: "WO-1003", partNumber: "A-3", partName: "Bracket C", customerProgram: "Helios",
    material: "Steel", quantity: 8, completedQuantity: 0, rejectedQuantity: 0,
    machine: "DMG Mori", stage: "machining", priority: "high", dueDate: "2026-07-10",
  },
];

function renderWithProviders(items: WorkOrder[]) {
  const store = configureStore({
    reducer: { workOrders: workOrdersReducer },
    preloadedState: { workOrders: { items } },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>,
  );
}

describe("Dashboard", () => {
  it("shows the correct total work order count", () => {
    renderWithProviders(mockWorkOrders);

    expect(screen.getByText("Total Work Orders")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

it("shows the correct blocked and complete counts", () => {
  renderWithProviders(mockWorkOrders);

  expect(screen.getAllByText("Blocked").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Complete").length).toBeGreaterThan(0);
});

  it("lists high-priority and blocked orders needing attention", () => {
    renderWithProviders(mockWorkOrders);

    expect(screen.getByText("WO-1002")).toBeInTheDocument();
    expect(screen.getByText("WO-1003")).toBeInTheDocument();
    expect(screen.queryByText("WO-1001")).not.toBeInTheDocument();
  });

  it("shows the empty state when nothing needs attention", () => {
    const onlyLowPriority: WorkOrder[] = [mockWorkOrders[0]];
    renderWithProviders(onlyLowPriority);

    expect(screen.getByText(/no high priority or blocked orders/i)).toBeInTheDocument();
  });
});