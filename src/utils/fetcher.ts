/* eslint-disable @typescript-eslint/no-explicit-any */

const fetcher = (url: string): Promise<any> =>
  fetch(url).then((r) => {
    if (!r.ok) {
      throw new Error(r.statusText);
    }
    return r.json();
  });

export default fetcher;
