declare namespace Express {
  export interface Request {
    wantsJson: () => boolean;
    props: {
      [key: string]: unknown;
    };
  }
}
