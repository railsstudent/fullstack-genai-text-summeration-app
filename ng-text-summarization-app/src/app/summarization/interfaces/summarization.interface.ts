import { OutputEmitterRef } from "@angular/core";

export interface Summarization {
    url: string;
    language: string;
}

export interface WebpageInputBoxModel {
  text: string;
  isLoading: boolean;
  buttonText: string;
}

export interface SummarizationModel {
  isLoading: boolean;
  pageUrl: OutputEmitterRef<string>,
}

export interface TranslatedSummarizationModel extends SummarizationModel {
  language: string;
}
