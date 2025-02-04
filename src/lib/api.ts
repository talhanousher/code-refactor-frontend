const BASE_URL = "https://code-refactor-backend-production.up.railway.app/ai";

/**
 * Refactor code using AI
 */
export const refactorCode = async (code: string, language: string) => {
  const response = await fetch(`${BASE_URL}/refactor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) throw new Error("Failed to refactor code.");
  return response.json();
};

/**
 * Get refactoring description
 */
export const refactorCodeDescription = async (code: string, language: string) => {
  const response = await fetch(`${BASE_URL}/refactor/open-route`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) throw new Error("Failed to get refactor description.");
  return response.json();
};

/**
 * Convert code between programming languages
 */
export const convertCode = async (
  code: string,
  sourceLanguage: string,
  targetLanguage: string
) => {
  const response = await fetch(`${BASE_URL}/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, sourceLanguage, targetLanguage }),
  });

  if (!response.ok) throw new Error("Failed to convert code.");
  return response.json();
};

/**
 * Analyze code complexity
 */
export const analyzeComplexity = async (code: string, language: string) => {
  const response = await fetch(`${BASE_URL}/analyze-complexity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language }),
  });

  if (!response.ok) throw new Error("Failed to analyze complexity.");
  return response.json();
};
