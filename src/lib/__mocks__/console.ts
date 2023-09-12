import { vi } from 'vitest';

export const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);
export const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
export const consoleInfoMock = vi.spyOn(console, 'info').mockImplementation(() => undefined);
