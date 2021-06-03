const createCSP = (nonce: string): string => {
  return `script-src 'strict-dynamic' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' http: https:;`;
};

export default createCSP;
