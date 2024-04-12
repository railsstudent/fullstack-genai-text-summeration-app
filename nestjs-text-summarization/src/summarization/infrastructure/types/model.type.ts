export const ModelArray = ['gemini', 'gemma', 'llama2', 'phi'] as const;
export type ModelTypes = (typeof ModelArray)[number];
