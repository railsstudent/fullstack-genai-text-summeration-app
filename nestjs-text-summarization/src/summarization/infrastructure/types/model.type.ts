const ModelArray = ['gemini', 'groq'] as const;
export type ModelTypes = (typeof ModelArray)[number];
