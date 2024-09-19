export interface Step {
  title: string;
  index: number;
  description: string;
  content: React.ReactNode;
  onComplete: (formData: FormData) => any;
  fetchResource: string;
}
