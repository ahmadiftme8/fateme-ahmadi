const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!basePath) {
    return normalized;
  }

  return `${basePath}${normalized}`;
}
