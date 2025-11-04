import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App smoke test", () => {
  it("renders the header", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /paint-lite/i,
    );
  });
});
