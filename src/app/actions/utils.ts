export function validateUUID(uuid: string): boolean {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuid || typeof uuid !== 'string' || !regex.test(uuid)) {
    return false;
  }
  return true;
}
