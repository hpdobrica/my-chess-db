import express from 'express';

export const handler = (
  a: (req: express.Request, res: express.Response) => Promise<any>
): express.Handler => async (req, res, next): Promise<void> => {
  try {
    await a(req, res);
  } catch (err) {
    next(err);
    return;
  }
  // needs to be passed 'router' param in order 
  // to skip other matching routes!
  next('router');
};
