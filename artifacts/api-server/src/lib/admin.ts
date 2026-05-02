const RAW_ADMIN_EMAILS =
  process.env.ADMIN_ALLOWLIST_EMAILS ?? "hello@sysmoai.com";

export const ADMIN_ALLOWLIST_EMAILS: readonly string[] = RAW_ADMIN_EMAILS.split(
  ",",
)
  .map((e) => e.trim().toLowerCase())
  .filter((e) => e.length > 0);

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_ALLOWLIST_EMAILS.includes(email.toLowerCase());
}
