import React, { createContext, useContext } from 'react';

export interface IOpenWebContext {
  spotId: string | null;
}

export const OpenWebContext = createContext<IOpenWebContext>({
  spotId: null,
});

export const useOpenWebContext = (
  selector: (_ctx: IOpenWebContext) => any = (_ctx) => _ctx
) => {
  const ctx = useContext(OpenWebContext);

  if (!ctx) {
    return null;
  }

  return selector(ctx);
};

export const useSpotId = () => useOpenWebContext((ctx) => ctx.spotId);
