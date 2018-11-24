export const positiveImportRegex = /^\+import\s/;
export const negativeImportRegex = /^\-import\s/;
export const COMPONENTS_REGEX = /\{\s?[a-zA-Z0-9\s\,\n]*\s?\}/g;
export const COMPONENT_REGEX = /(\{|,)\s?[a-zA-Z0-9]*\s?/g;
export const ONE_COMPONENT_REGEX = /import\s[a-zA-Z]*/;
export const ORIGIN_REGEX = /from\s\'[\.a-zA-Z_\/-]*'/g;
