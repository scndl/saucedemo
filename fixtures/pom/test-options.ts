import { test as base } from '@playwright/test';
import { test as pageObjectFixture } from './page-object-fixture';

const test = pageObjectFixture;

const expect = base.expect;
export { test, expect };
