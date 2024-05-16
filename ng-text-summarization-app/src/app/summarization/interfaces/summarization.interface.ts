export interface Summarization {
    url: string;
    topic: string;
}

export interface WebpageInputBoxModel {
  url: string;
  topic: string;
  isLoading: boolean;
  buttonText: string;
}

export interface SubmittedPage {
  url: string;
  topic: string;
}