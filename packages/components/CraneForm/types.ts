export interface CraneSchema {
  properties: Properties;
  required?: string[];
}

export interface Property {
  type: CraneType;
  title: string;
  enum?: Enum[];
  format?: SpecialFormat;
  pattern?: RegExp;
  otherRules?: RuleItem[];
  ui?: {
    widget?: Widget;
    maxCount?: number;
    minCount?: number;
    placeholder?: string;
    asyncData?: Promise<Enum>;
    verificationTiming?: VerificationTiming;
  };
}

export interface Properties {
  [key: string]: Property;
}

export type Widget = 'select' | 'textarea' | 'date-time' | 'switch';

export type Mode = 'inline' | 'default';

export type SpecialFormat = 'mobile' | 'email';

export type CraneType = 'string' | 'boolean' | 'number' | 'password';

export type VerificationTiming = 'blur' | 'change' | ['blur', 'change'];

export interface Enum {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RuleItem {
  [key: string]: string;
}
