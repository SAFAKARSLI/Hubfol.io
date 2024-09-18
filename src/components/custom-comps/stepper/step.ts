export interface Step {
  title: string;
  description: string;
  content: React.ReactNode;
  onComplete: (formData: FormData) => void;
}
