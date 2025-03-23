import { render , screen , fireEvent } from "@testing-library/react";
import Home from "../src/app/page";
import Form from "../src/sections/Form";

describe("Home", () => {
  it("should show the title", () => {
    render(<Home />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});

describe("Form", () => {
  it("should render the form", () => {
    render(<Form />);
    expect(screen.getByText("Resume submission form")).toBeInTheDocument();
  });

  it("should validate the first name field", () => {
    render(<Form />);
    const firstNameInput = screen.getByLabelText("FirstName");
    fireEvent.change(firstNameInput, { target: { value: "123" } });
    expect(screen.getByText("FirstName should not contain numbers")).toBeInTheDocument();
  });

  it("should validate the phone number field", () => {
    render(<Form />);
    const phoneNumberInput = screen.getByLabelText("PhoneNumber");
    fireEvent.change(phoneNumberInput, { target: { value: "abc" } });
    expect(screen.getByText("PhoneNumber should only contain numbers")).toBeInTheDocument();
  });
});