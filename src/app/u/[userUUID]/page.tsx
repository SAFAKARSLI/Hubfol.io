import { SlugProps } from '@/types/slug';
import { redirect } from 'next/navigation';

export default async function page({ params }: SlugProps) {
  const { userUUID } = params;
  redirect(`/u/${userUUID}/profile-overview`);
}
