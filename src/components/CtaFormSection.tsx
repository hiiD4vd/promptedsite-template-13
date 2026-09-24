"use client";

import React from "react";

interface CtaFormSectionProps {
  onSubmit?: (data: Record<string, string>) => Promise<{ success: boolean; message?: string }>;
}

export const CtaFormSection: React.FC<CtaFormSectionProps> = () => {
  return null;
};
