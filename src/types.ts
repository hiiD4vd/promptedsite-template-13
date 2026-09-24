export interface MetricItem {
  id: string;
  label: string;
  value: string;
  desc: string;
}

export interface FormatItem {
  id: string;
  title: string;
  tagline: string;
  profit: string;
  footprint: string;
  investment: string;
  images: string[];
}

export interface PackageStep {
  num: string;
  title: string;
  desc: string;
}

export interface TermItem {
  num: string;
  label: string;
  value: string;
  desc: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FranchiseConfig {
  brandName?: string;
  tagline?: string;
  headline?: string;
  netProfitHighlight?: string;
  revenueHighlight?: string;
  metrics?: MetricItem[];
  formats?: FormatItem[];
  packageSteps?: PackageStep[];
  terms?: TermItem[];
  faqs?: FaqItem[];
}

export interface PromptedSiteProps {
  config?: FranchiseConfig;
  onApplySubmit?: (formData: Record<string, string>) => Promise<{ success: boolean; message?: string }>;
  isSplitView?: boolean;
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-orbit'?: string;
          'field-of-view'?: string;
          'interaction-prompt'?: string;
          orientation?: string;
          'shadow-intensity'?: string;
          loading?: string;
          'data-js-hero-model-view'?: string;
        };
      }
    }
  }
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'camera-orbit'?: string;
        'field-of-view'?: string;
        'interaction-prompt'?: string;
        orientation?: string;
        'shadow-intensity'?: string;
        loading?: string;
        'data-js-hero-model-view'?: string;
      };
    }
  }
}

