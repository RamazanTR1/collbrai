import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./contact-form";
import { describe, it, expect, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

// Mock translations
const messages = {
  contact: {
    form: {
      firstname: "First Name",
      lastname: "Last Name",
      companyName: "Company Name",
      companyMail: "Company Email",
      sector: "Sector",
      unit: "Unit",
      country: "Country",
      city: "City",
      phoneNumber: "Phone Number",
      message: "Message",
      legal: "I accept the privacy policy",
      keepInTouch: "Keep in touch",
      send: "Send Message",
    },
  },
};

describe("ContactForm", () => {
  it("renders the form fields correctly", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Email/i)).toBeInTheDocument();
    expect(screen.getByText(/I accept the privacy policy/i)).toBeInTheDocument();
  });

  it("shows validation errors for required fields", async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContactForm />
      </NextIntlClientProvider>
    );

    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/You must accept the privacy policy/i)).toBeInTheDocument();
    });
  });
});
