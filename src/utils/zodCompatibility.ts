import { z } from 'zod';

// Re-implement ZodIssueOptionalMessage type
export interface ZodIssueOptionalMessage {
  code: z.ZodIssueCode;
  path: (string | number)[];
  message?: string;
  fatal?: boolean;
  
  // Additional fields for specific issue codes
  expected?: string;
  received?: string;
  minimum?: number;
  maximum?: number;
  type?: string;
  inclusive?: boolean;
  exact?: boolean;
  keys?: string[];
  unionErrors?: z.ZodError[];
  options?: string[];
}

// Re-implement defaultErrorMap function
export const defaultErrorMap = (
  issue: ZodIssueOptionalMessage,
  ctx: { defaultError: string; data: any }
): { message: string } => {
  let message: string;
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      message = `Expected ${issue.expected}, received ${issue.received}`;
      break;
    case z.ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected)}`;
      break;
    case z.ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${issue.keys?.join(", ")}`;
      break;
    case z.ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case z.ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${issue.options?.join(" | ")}`;
      break;
    case z.ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case z.ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case z.ZodIssueCode.invalid_string:
      message = `Invalid ${issue.type || "string"}`;
      break;
    case z.ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? "at least" : "more than"} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? "at least" : "over"} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}${issue.minimum}`;
      else
        message = "Invalid input";
      break;
    case z.ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? "at most" : "less than"} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? "at most" : "under"} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? "exactly" : issue.inclusive ? "less than or equal to" : "less than"} ${issue.maximum}`;
      else
        message = "Invalid input";
      break;
    case z.ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    default:
      message = ctx.defaultError;
  }
  return { message: issue.message || message };
};

// Re-implement objectUtil with addQuestionMarks type utility
export const objectUtil = {
  addQuestionMarks: <T>() => {
    // This is a type utility, so we'll just create a pass-through function
    // The actual type transformation will happen via the type declaration below
    return {} as any;
  }
};

// Type definition for addQuestionMarks
export type addQuestionMarks<T> = {
  [K in keyof T]?: T[K];
};