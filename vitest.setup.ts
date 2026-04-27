import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.clearAllMocks();
});

const push = vi.fn();
const replace = vi.fn();
const params = { id: "" };

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    replace,
  }),
  useParams: () => params,
}));

Object.defineProperty(globalThis, "__routerMocks", {
  value: { push, replace, params },
  writable: true,
});
