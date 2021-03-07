/* eslint-disable @typescript-eslint/no-explicit-any */

const fetcher = (url: string): Promise<any> => fetch(url).then((r) => r.json());

export default fetcher;
