export type ToolPlan = {
  name: string;
  slug: string;
  priceAmount: number | null;
  currency: string;
  billingCycle: "monthly" | "quarterly" | "yearly" | "one_time";
  isFree: boolean;
  trialDays: number;
  features: string[];
  ctaLabel: string;
  affiliateUrl?: string | null;
  sortOrder?: number;
  isRecommended?: boolean;
};

export type Tool = {
  name: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  websiteUrl: string;
  affiliateUrl?: string | null;
  affiliateProgram?: string | null;
  category: {
    name: string;
    slug: string;
  };
  bestFor?: string | null;
  pricingModel?: string | null;
  startingPrice?: number | null;
  currency?: string;
  trialDays?: number | null;
  platforms: string[];
  languages: string[];
  features: string[];
  integrations?: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  plans: ToolPlan[];
  status: "draft" | "published" | "archived";
  isFeatured?: boolean;
};