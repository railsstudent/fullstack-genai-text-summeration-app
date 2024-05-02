export const ModelArray = ['gemini', 'gemma', 'llama3', 'phi3'] as const;
export type ModelTypes = (typeof ModelArray)[number];
