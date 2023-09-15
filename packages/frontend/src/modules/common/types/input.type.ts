export interface InputProps {
  value: string;
  name: string;
  className?: string;
  placeholder?: string;
  type?: string;
  label?: string;
  error?: string | null;
  onChange: OnInputChange | OnTextAreaChange;
}

export type OnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

export type OnTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
