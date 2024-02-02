import { render, waitFor } from "@testing-library/react";
import App from "./App";

test("renders CKEditor5", async () => {
  const { getByText } = render(<App />);
  
  await waitFor(() => {
    expect(getByText(/Hello from CKEditor 5!/)).toBeInTheDocument()
  });
});
