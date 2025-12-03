"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormErrors {
	firstname?: string;
	lastname?: string;
	companyName?: string;
	companyMail?: string;
	sector?: string;
	unit?: string;
	country?: string;
	city?: string;
	phoneNumber?: string;
	message?: string;
	legal?: string;
}

export function ContactForm() {
	const t = useTranslations("contact");
	const [legal, setLegal] = useState(false);
	const [keepInTouch, setKeepInTouch] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
	const [errors, setErrors] = useState<FormErrors>({});
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		companyName: "",
		companyMail: "",
		sector: "",
		unit: "",
		country: "",
		city: "",
		phoneNumber: "",
		message: "",
	});

	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhone = (phone: string): boolean => {
		const phoneRegex = /^[\d\s\-\+\(\)]+$/;
		return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
	};

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.firstname.trim()) {
			newErrors.firstname = t("form.firstname") + " is required";
		}

		if (!formData.lastname.trim()) {
			newErrors.lastname = t("form.lastname") + " is required";
		}

		if (!formData.companyMail.trim()) {
			newErrors.companyMail = t("form.companyMail") + " is required";
		} else if (!validateEmail(formData.companyMail)) {
			newErrors.companyMail = "Please enter a valid email address";
		}

		if (formData.phoneNumber && !validatePhone(formData.phoneNumber)) {
			newErrors.phoneNumber = "Please enter a valid phone number";
		}

		if (!legal) {
			newErrors.legal = "You must accept the privacy policy";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1500));
			
			// Here you would make the actual API call
			// const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
			
			setSubmitStatus("success");
			// Reset form
			setFormData({
				firstname: "",
				lastname: "",
				companyName: "",
				companyMail: "",
				sector: "",
				unit: "",
				country: "",
				city: "",
				phoneNumber: "",
				message: "",
			});
			setLegal(false);
			setKeepInTouch(false);
			
			// Reset success message after 5 seconds
			setTimeout(() => setSubmitStatus("idle"), 5000);
		} catch (error) {
			setSubmitStatus("error");
			setTimeout(() => setSubmitStatus("idle"), 5000);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (field: keyof typeof formData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	return (
		<div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-md sm:p-10">
			{submitStatus === "success" && (
				<div className="mb-6 flex items-center gap-3 rounded-lg bg-light-green/20 p-4 text-light-green">
					<CheckCircle2 className="h-5 w-5" />
					<p className="text-sm font-medium">Form submitted successfully!</p>
				</div>
			)}
			{submitStatus === "error" && (
				<div className="mb-6 flex items-center gap-3 rounded-lg bg-red-500/20 p-4 text-red-400">
					<AlertCircle className="h-5 w-5" />
					<p className="text-sm font-medium">An error occurred. Please try again.</p>
				</div>
			)}
			<form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
				{/* Name Row */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="firstname" className="text-sm font-medium text-white/80">
							{t("form.firstname")} <span className="text-red-400">*</span>
						</label>
						<Input
							id="firstname"
							name="firstname"
							value={formData.firstname}
							onChange={(e) => handleChange("firstname", e.target.value)}
							placeholder={t("form.firstname")}
							required
							className={`border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl ${
								errors.firstname ? "border-red-400" : ""
							}`}
						/>
						{errors.firstname && (
							<p className="text-xs text-red-400">{errors.firstname}</p>
						)}
					</div>
					<div className="space-y-2">
						<label htmlFor="lastname" className="text-sm font-medium text-white/80">
							{t("form.lastname")} <span className="text-red-400">*</span>
						</label>
						<Input
							id="lastname"
							name="lastname"
							value={formData.lastname}
							onChange={(e) => handleChange("lastname", e.target.value)}
							placeholder={t("form.lastname")}
							required
							className={`border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl ${
								errors.lastname ? "border-red-400" : ""
							}`}
						/>
						{errors.lastname && (
							<p className="text-xs text-red-400">{errors.lastname}</p>
						)}
					</div>
				</div>

				{/* Company Info */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="companyName" className="text-sm font-medium text-white/80">
							{t("form.companyName")}
						</label>
						<Input
							id="companyName"
							name="companyName"
							value={formData.companyName}
							onChange={(e) => handleChange("companyName", e.target.value)}
							placeholder={t("form.companyName")}
							className={`border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl ${
								errors.companyName ? "border-red-400" : ""
							}`}
						/>
						{errors.companyName && (
							<p className="text-xs text-red-400">{errors.companyName}</p>
						)}
					</div>
					<div className="space-y-2">
						<label htmlFor="companyMail" className="text-sm font-medium text-white/80">
							{t("form.companyMail")} <span className="text-red-400">*</span>
						</label>
						<Input
							id="companyMail"
							name="companyMail"
							type="email"
							value={formData.companyMail}
							onChange={(e) => handleChange("companyMail", e.target.value)}
							placeholder={t("form.companyMail")}
							required
							className={`border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl ${
								errors.companyMail ? "border-red-400" : ""
							}`}
						/>
						{errors.companyMail && (
							<p className="text-xs text-red-400">{errors.companyMail}</p>
						)}
					</div>
				</div>

				{/* Sector & Unit */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="sector" className="text-sm font-medium text-white/80">
							{t("form.sector")}
						</label>
						<Input
							id="sector"
							name="sector"
							value={formData.sector}
							onChange={(e) => handleChange("sector", e.target.value)}
							placeholder={t("form.sector")}
							className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="unit" className="text-sm font-medium text-white/80">
							{t("form.unit")}
						</label>
						<Input
							id="unit"
							name="unit"
							value={formData.unit}
							onChange={(e) => handleChange("unit", e.target.value)}
							placeholder={t("form.unit")}
							className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
						/>
					</div>
				</div>

				{/* Location */}
				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
					<div className="space-y-2">
						<label htmlFor="country" className="text-sm font-medium text-white/80">
							{t("form.country")}
						</label>
						<Input
							id="country"
							name="country"
							value={formData.country}
							onChange={(e) => handleChange("country", e.target.value)}
							placeholder={t("form.country")}
							className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="city" className="text-sm font-medium text-white/80">
							{t("form.city")}
						</label>
						<Input
							id="city"
							name="city"
							value={formData.city}
							onChange={(e) => handleChange("city", e.target.value)}
							placeholder={t("form.city")}
							className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
						/>
					</div>
				</div>

				{/* Phone */}
				<div className="space-y-2">
					<label htmlFor="phoneNumber" className="text-sm font-medium text-white/80">
						{t("form.phoneNumber")}
					</label>
					<Input
						id="phoneNumber"
						name="phoneNumber"
						type="tel"
						value={formData.phoneNumber}
						onChange={(e) => handleChange("phoneNumber", e.target.value)}
						placeholder={t("form.phoneNumber")}
						className={`border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl ${
							errors.phoneNumber ? "border-red-400" : ""
						}`}
					/>
					{errors.phoneNumber && (
						<p className="text-xs text-red-400">{errors.phoneNumber}</p>
					)}
				</div>

				{/* Message */}
				<div className="space-y-2">
					<label htmlFor="message" className="text-sm font-medium text-white/80">
						{t("form.message")}
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={(e) => handleChange("message", e.target.value)}
						placeholder={t("form.message")}
						rows={4}
						className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder:text-white/40 focus:border-light-green/50 focus:outline-none focus:ring-0"
					/>
				</div>

				{/* Checkboxes */}
				<div className="space-y-3">
					<label className="flex items-start gap-3 cursor-pointer">
						<input
							type="checkbox"
							id="legal"
							name="legal"
							checked={legal}
							onChange={(e) => {
								setLegal(e.target.checked);
								if (errors.legal) {
									setErrors((prev) => ({ ...prev, legal: undefined }));
								}
							}}
							required
							className={`mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-light-green focus:ring-light-green/50 ${
								errors.legal ? "border-red-400" : ""
							}`}
						/>
						<span className="text-sm text-white/70">
							{t("form.legal")} <span className="text-red-400">*</span>
						</span>
					</label>
					{errors.legal && (
						<p className="text-xs text-red-400 ml-7">{errors.legal}</p>
					)}
					<label className="flex items-start gap-3 cursor-pointer">
						<input
							type="checkbox"
							id="keepInTouch"
							name="keepInTouch"
							checked={keepInTouch}
							onChange={(e) => setKeepInTouch(e.target.checked)}
							className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-light-green focus:ring-light-green/50"
						/>
						<span className="text-sm text-white/70">
							{t("form.keepInTouch")}
						</span>
					</label>
				</div>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="mt-2 w-full bg-light-green py-6 text-lg font-semibold text-black hover:bg-light-green/90 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{isSubmitting ? (
						<>
							<Loader2 className="mr-2 h-5 w-5 animate-spin" />
							Submitting...
						</>
					) : (
						<>
							{t("form.send")}
							<Send className="ml-2 h-5 w-5" />
						</>
					)}
				</Button>
			</form>
		</div>
	);
}

