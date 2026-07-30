// src/features/workOrders/components/WorkOrderStageDialog.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WorkOrderStageDialog } from "./WorkOrderStageDialog";

describe("WorkOrderStageDialog", () => {
  it("renders the current stage as selected", () => {
    render(
      <WorkOrderStageDialog
        currentStage="machining"
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

// Assumes human-readable labels. Adjust for abbreviations

    expect(screen.getByRole("combobox")).toHaveTextContent(/machining/i);
  });

  it("disables Save until the stage actually changes", () => {
    render(
      <WorkOrderStageDialog
        currentStage="machining"
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
  });

  it("calls onSave with the newly selected stage", async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <WorkOrderStageDialog
        currentStage="machining"
        open={true}
        onClose={vi.fn()}
        onSave={handleSave}
      />,
    );

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: /inspection/i }));
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(handleSave).toHaveBeenCalledWith("inspection");
  });

  it("calls onClose when Cancel is clicked", async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <WorkOrderStageDialog
        currentStage="machining"
        open={true}
        onClose={handleClose}
        onSave={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(handleClose).toHaveBeenCalled();
  });

  it("resets the selection to currentStage when reopened", () => {
    const { rerender } = render(
      <WorkOrderStageDialog
        currentStage="machining"
        open={false}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    rerender(
      <WorkOrderStageDialog
        currentStage="inspection"
        open={true}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />,
    );

    expect(screen.getByRole("combobox")).toHaveTextContent(/inspection/i);
  });
});