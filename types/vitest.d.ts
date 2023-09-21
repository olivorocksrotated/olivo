import type { Assertion as VitestAssertion, AsymmetricMatchersContaining as VitestAsymmetricMatchersContaining } from 'vitest';

interface CustomMatchers<R = unknown> {
    toContainObject(expected: any): R
}

declare module 'vitest' {
    interface Assertion<T = any> extends VitestAssertion<T>, CustomMatchers<T> {}
    interface AsymmetricMatchersContaining extends VitestAsymmetricMatchersContaining, CustomMatchers {}
}
