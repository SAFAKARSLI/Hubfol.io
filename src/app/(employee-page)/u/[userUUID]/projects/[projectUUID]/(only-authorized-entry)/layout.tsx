// layouts/ProjectLayout.tsx
import AuthChecker from '@/components/auth/AuthChecker';
import { SlugProps } from '@/types/slug';
import { ReactNode } from 'react';

export default function ProjectLayout({ children, params }: SlugProps) {
  return <AuthChecker userUUID={params.userUUID}>{children}</AuthChecker>;
}
