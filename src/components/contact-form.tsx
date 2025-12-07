"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  firstname: z.string().min(2, "First name is required"),
  lastname: z.string().min(2, "Last name is required"),
  companyName: z.string().optional(),
  companyMail: z.string().email("Please enter a valid email address"),
  sector: z.string().optional(),
  unit: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  phoneNumber: z.string().optional().refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), "Invalid phone number"),
  message: z.string().optional(),
  legal: z.boolean().refine((val) => val === true, "You must accept the privacy policy"),
  keepInTouch: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations("contact");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
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
      legal: false,
      keepInTouch: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitStatus("idle");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(data);
      setSubmitStatus("success");
      reset();
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        {/* Name Row */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="firstname" className="text-sm font-medium text-white/80">
              {t("form.firstname")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="firstname"
              {...register("firstname")}
              placeholder={t("form.firstname")}
              className={cn(
                "border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl",
                errors.firstname && "border-red-400"
              )}
            />
            {errors.firstname && (
              <p className="text-xs text-red-400">{errors.firstname.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastname" className="text-sm font-medium text-white/80">
              {t("form.lastname")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="lastname"
              {...register("lastname")}
              placeholder={t("form.lastname")}
              className={cn(
                "border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl",
                errors.lastname && "border-red-400"
              )}
            />
            {errors.lastname && (
              <p className="text-xs text-red-400">{errors.lastname.message}</p>
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
              {...register("companyName")}
              placeholder={t("form.companyName")}
              className="border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="companyMail" className="text-sm font-medium text-white/80">
              {t("form.companyMail")} <span className="text-red-400">*</span>
            </label>
            <Input
              id="companyMail"
              type="email"
              {...register("companyMail")}
              placeholder={t("form.companyMail")}
              className={cn(
                "border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl",
                errors.companyMail && "border-red-400"
              )}
            />
            {errors.companyMail && (
              <p className="text-xs text-red-400">{errors.companyMail.message}</p>
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
              {...register("sector")}
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
              {...register("unit")}
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
              {...register("country")}
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
              {...register("city")}
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
            type="tel"
            {...register("phoneNumber")}
            placeholder={t("form.phoneNumber")}
            className={cn(
              "border-white/10 bg-white/5 py-5 text-white placeholder:text-white/40 focus:border-light-green/50 focus:ring-0 rounded-xl",
              errors.phoneNumber && "border-red-400"
            )}
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-400">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-white/80">
            {t("form.message")}
          </label>
          <textarea
            id="message"
            {...register("message")}
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
              {...register("legal")}
              className={cn(
                "mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-light-green focus:ring-light-green/50",
                errors.legal && "border-red-400"
              )}
            />
            <span className="text-sm text-white/70">
              {t("form.legal")} <span className="text-red-400">*</span>
            </span>
          </label>
          {errors.legal && (
            <p className="text-xs text-red-400 ml-7">{errors.legal.message}</p>
          )}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              id="keepInTouch"
              {...register("keepInTouch")}
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