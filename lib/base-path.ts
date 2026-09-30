// Defined by Vite for both browser and prerender builds.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
