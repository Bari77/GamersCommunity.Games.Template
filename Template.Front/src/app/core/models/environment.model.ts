export interface Environment {
  production: boolean;
  apiUrl: string;
  useMocks?: boolean;
  /** Platform assets host for mock portraits (`…/Avatars/{1-12}.png`). */
  assetsBaseUrl?: string;
}
