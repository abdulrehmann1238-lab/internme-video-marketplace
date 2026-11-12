export const MAX_BIO_LENGTH = 255;
export const MAX_JOB_TITLE_LENGTH = 255;
export const MAX_JOB_DESCRIPTION_LENGTH = 1000;
export const MAX_CUSTOM_QUESTIONS = 3;
export const MAX_REEL_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_REEL_DURATION_SECONDS = 30;

export const ACCEPTED_REEL_EXTENSIONS = [".mp4", ".mov", ".webm"];
export const ACCEPTED_REEL_MIME_TYPES = [
  "video/mp4",
  "video/quicktime",
  "video/webm",
];

export const EXTERNAL_ATS_MESSAGE =
  "Applications must be submitted directly through InternMe. External application redirects aren't allowed.";

export const KNOWN_ATS_DOMAINS = [
  "greenhouse.io",
  "boards.greenhouse.io",
  "lever.co",
  "jobs.lever.co",
  "myworkdayjobs.com",
  "workday.com",
  "ashbyhq.com",
  "jobs.ashbyhq.com",
  "icims.com",
  "taleo.net",
  "bamboohr.com",
  "smartrecruiters.com",
  "jobvite.com",
  "workable.com",
  "apply.workable.com",
  "breezy.hr",
  "jazzhr.com",
  "recruitee.com",
  "rippling.com",
  "deel.com",
  "typeform.com",
  "forms.gle",
  "docs.google.com/forms",
  "airtable.com/shr",
  "notion.site",
];

export interface AtsValidationResult {
  isValid: boolean;
  error?: string;
  matchedTerm?: string;
}

/**
 * Validates that employer listing text contains no external application links or ATS redirect domains.
 */
export function validateNoExternalAts(input: string): AtsValidationResult {
  const normalized = input.toLowerCase();

  for (const domain of KNOWN_ATS_DOMAINS) {
    if (normalized.includes(domain)) {
      return {
        isValid: false,
        error: EXTERNAL_ATS_MESSAGE,
        matchedTerm: domain,
      };
    }
  }

  // Detect explicit URLs or "apply at / via ..." redirect phrasing
  const urlMatch = normalized.match(/https?:\/\/[^\s)]+/);
  if (urlMatch) {
    return {
      isValid: false,
      error: EXTERNAL_ATS_MESSAGE,
      matchedTerm: urlMatch[0],
    };
  }

  const redirectPhrase = normalized.match(
    /(apply\s+(?:here|at|via|on|online)\s*:?\s*(?:www\.|https?:|[a-z0-9-]+\.(?:com|io|co|org|net|app|dev|ai)))/
  );
  if (redirectPhrase) {
    return {
      isValid: false,
      error: EXTERNAL_ATS_MESSAGE,
      matchedTerm: redirectPhrase[0],
    };
  }

  return { isValid: true };
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateReelFileMeta(file: {
  name: string;
  size: number;
  type: string;
}): FileValidationResult {
  const lowerName = file.name.toLowerCase();
  const hasValidExt = ACCEPTED_REEL_EXTENSIONS.some((ext) =>
    lowerName.endsWith(ext)
  );
  const hasValidMime =
    !file.type || ACCEPTED_REEL_MIME_TYPES.includes(file.type.toLowerCase());

  if (!hasValidExt && !hasValidMime) {
    return {
      isValid: false,
      error: "Please upload an MP4, MOV, or WebM video file.",
    };
  }

  if (file.size > MAX_REEL_SIZE_BYTES) {
    return {
      isValid: false,
      error: "This video is larger than the 25 MB limit.",
    };
  }

  return { isValid: true };
}

export function validateReelDuration(
  durationSeconds: number
): FileValidationResult {
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return {
      isValid: false,
      error: "Could not read video duration. Please select another MP4, MOV, or WebM file.",
    };
  }

  if (durationSeconds > MAX_REEL_DURATION_SECONDS) {
    return {
      isValid: false,
      error: "Your reel needs to be 30 seconds or shorter.",
    };
  }

  return { isValid: true };
}

