export function validateUUID(uuid: string): boolean {
  if (!uuid) {
    return false;
  }

  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuid || !regex.test(uuid)) {
    return false;
  }
  return true;
}
