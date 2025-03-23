import { render , screen , fireEvent } from "@testing-library/react";
import Home from "../src/app/page";
import Form from "../src/sections/Form";
import '@testing-library/jest-dom';

describe("Home", () => {
  it("Show home page", () => {
    render(<Home />);
  });
});

describe('Form Component', () => {

    it('renders the form correctly', () => {
        render(<Form />);
        expect(screen.getByText('Resume submission form')).toBeInTheDocument();
        expect(screen.getByLabelText('FirstName')).toBeInTheDocument();
        expect(screen.getByLabelText('LastName')).toBeInTheDocument();
        expect(screen.getByLabelText('PhoneNumber')).toBeInTheDocument();
        expect(screen.getByText('Woman')).toBeInTheDocument();
        expect(screen.getByText('Man')).toBeInTheDocument();
        expect(screen.getByText('Drop your resume file or click to upload!')).toBeInTheDocument();
        expect(screen.getByText('SEND RESUME')).toBeInTheDocument();
    });

    it('validates FirstName field', () => {
        render(<Form />);
        const firstNameInput = screen.getByLabelText('FirstName');

        fireEvent.change(firstNameInput, { target: { value: 'John123' } });
        expect(screen.getByText('FirstName should not contain numbers')).toBeInTheDocument();

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        expect(screen.queryByText('FirstName should not contain numbers')).not.toBeInTheDocument();
    });

    it('validates LastName field', () => {
        render(<Form />);
        const lastNameInput = screen.getByLabelText('LastName');

        fireEvent.change(lastNameInput, { target: { value: 'Doe123' } });
        expect(screen.getByText('LastName should not contain numbers')).toBeInTheDocument();

        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        expect(screen.queryByText('LastName should not contain numbers')).not.toBeInTheDocument();
    });

    it('validates PhoneNumber field', () => {
        render(<Form />);
        const phoneNumberInput = screen.getByLabelText('PhoneNumber');

        fireEvent.change(phoneNumberInput, { target: { value: 'abc' } });
        expect(screen.getByText('PhoneNumber should only contain numbers')).toBeInTheDocument();

        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
        expect(screen.queryByText('PhoneNumber should only contain numbers')).not.toBeInTheDocument();
    });

    it('handles gender selection', () => {
        render(<Form />);
        const womanRadio = screen.getByLabelText('Woman');
        const manRadio = screen.getByLabelText('Man');

        fireEvent.click(womanRadio);
        expect(womanRadio).toBeChecked();

        fireEvent.click(manRadio);
        expect(manRadio).toBeChecked();
    });

    it('handles file upload', () => {
        render(<Form />);
        const fileInput = screen.getByTestId('file-input') as HTMLInputElement;

        const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });

        fireEvent.change(fileInput, { target: { files: [file] } });
        expect(fileInput.files?.[0].name).toBe('test.pdf');
        expect(screen.getByText('A file has been selected!')).toBeInTheDocument();

        const invalidFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
        fireEvent.change(fileInput, { target: { files: [invalidFile] } });
        expect(screen.queryByText('A file has been selected!'));
    });

    it('submits the form when valid', () => {
        render(<Form />);
        const firstNameInput = screen.getByLabelText('FirstName');
        const lastNameInput = screen.getByLabelText('LastName');
        const phoneNumberInput = screen.getByLabelText('PhoneNumber');
        const womanRadio = screen.getByLabelText('Woman');
        const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
        const submitButton = screen.getByText('SEND RESUME');

        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(phoneNumberInput, { target: { value: '1234567890' } });
        fireEvent.click(womanRadio);
        fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.pdf', { type: 'application/pdf' })] } });

        expect(submitButton).toBeEnabled();

        fireEvent.click(submitButton);
        expect(screen.getByText('SENT RESUME')).toBeInTheDocument();
    });

    it('triggers file input click when upload area is clicked', () => {
        render(<Form />);

        const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
        const clickSpy = jest.spyOn(fileInput, 'click');

        const uploadArea = screen.getByText('Drop your resume file or click to upload!');
        fireEvent.click(uploadArea);

        expect(clickSpy).toHaveBeenCalled();

        clickSpy.mockRestore();
    });

    it('sets fileSelected to false when no file is selected', () => {
        render(<Form />);

        const fileInput = screen.getByTestId('file-input') as HTMLInputElement;
        fireEvent.change(fileInput, { target: { files: [] } });

        expect(screen.getByText('Drop your resume file or click to upload!')).toBeInTheDocument();
    });
});