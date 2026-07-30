import {render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DetailItem } from "./DetailItem";

describe("DetailItem", () => {
    it("renders the label and value", () => {
        render(<DetailItem label="Material" value="Titanium" />);

        expect(screen.getByText("Material")).toBeInTheDocument();
        expect(screen.getByText("Titanium")).toBeInTheDocument();
    });
});