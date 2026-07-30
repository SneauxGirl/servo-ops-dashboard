// src/pages/WorkOrders.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import { WorkOrders } from "./WorkOrders";
import workOrdersReducer from "../features/workOrders/workOrders.slice";
import type { WorkOrder } from "../features/workOrders/workOrders.types";

const mockWorkOrders: WorkOrder[] = [
  {
    id: "WO-1001", partNumber: "AAA-1", partName: "Zebra Bracket", customerProgram: "Aquila",
    material: "Aluminum", quantity: 10, completedQuantity: 5, rejectedQuantity: 0,
    machine: "Haas", stage: "machining", priority: "low", dueDate: "2026-08-01",
  },
  {
    id: "WO-1002", partNumber: "BBB-2", partName: "Alpha Housing", customerProgram: "Orion",
    material: "Titanium", quantity: 5, completedQuantity: 2, rejectedQuantity: 0,
    machine: "Mazak", stage: "blocked", priority: "critical", dueDate: "2026-07-05",
  },
  {
    id: "WO-1003", partNumber: "CCC-3", partName: "Mid Valve", customerProgram: "Helios",
    material: "Steel", quantity: 8, completedQuantity: 0, rejectedQuantity: 0,
    machine: "DMG Mori", stage: "cam", priority: "high", dueDate: "2026-07-10",
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
        <WorkOrders />
      </MemoryRouter>
    </Provider>,
  );
}

describe("WorkOrders", () => {
  it("renders all work orders by default, sorted by part name", () => {
    renderWithProviders(mockWorkOrders);

    const names = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    expect(names).toEqual(["Alpha Housing", "Mid Valve", "Zebra Bracket"]);
  });

  it("filters by search term across id, part name, and part number", async () => {
    const user = userEvent.setup();
    renderWithProviders(mockWorkOrders);

    await user.type(screen.getByRole("textbox"), "alpha");

    expect(screen.getByText("Alpha Housing")).toBeInTheDocument();
    expect(screen.queryByText("Zebra Bracket")).not.toBeInTheDocument();
    expect(screen.queryByText("Mid Valve")).not.toBeInTheDocument();
  });

  it("shows the empty state when no work orders match", async () => {
    const user = userEvent.setup();
    renderWithProviders(mockWorkOrders);

    await user.type(screen.getByRole("textbox"), "nonexistent part");

    expect(screen.getByText(/no work orders match/i)).toBeInTheDocument();
  });

  it("filters by stage", async () => {
    const user = userEvent.setup();
    renderWithProviders(mockWorkOrders);

    await user.click(screen.getByLabelText(/stage/i));
    await user.click(await screen.findByRole("option", { name: /blocked/i }));

    expect(screen.getByText("Alpha Housing")).toBeInTheDocument();
    expect(screen.queryByText("Zebra Bracket")).not.toBeInTheDocument();
    expect(screen.queryByText("Mid Valve")).not.toBeInTheDocument();
  });

  it("sorts by priority", async () => {
    const user = userEvent.setup();
    renderWithProviders(mockWorkOrders);

    await user.click(screen.getByLabelText(/sort/i));
    await user.click(await screen.findByRole("option", { name: /priority/i }));

    const names = screen.getAllByRole("heading", { level: 2 }).map((el) => el.textContent);
    // critical (Alpha) -> high (Mid) -> low (Zebra)
    expect(names).toEqual(["Alpha Housing", "Mid Valve", "Zebra Bracket"]);
  });
});