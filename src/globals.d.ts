import { User } from "./types";

declare global {
  interface Window {
    SPOTIM?: {
      startTTH?: ({
        callback,
        userId,
      }: {
        callback: (
          codeA: string,
          completeTTHCallback: (codeB: string) => void
        ) => void;
        userId: string;
      }) => Promise<User>;
      logout?: () => Promise<User>;
    };
  }
}
