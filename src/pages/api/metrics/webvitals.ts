import { InfluxDB, Point } from '@influxdata/influxdb-client';
import DeviceDetector from 'device-detector-js';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextWebVitalsMetric } from 'next/app';

let client: InfluxDB;
let deviceDetector: DeviceDetector;

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const headers = req.headers;
  const body = JSON.parse(req.body);

  if (!deviceDetector) {
    deviceDetector = new DeviceDetector();
  }

  if (!client) {
    client = new InfluxDB({
      url: 'https://eu-central-1-1.aws.cloud2.influxdata.com',
      token: process.env.INFLUXDB_TOKEN,
    });
  }

  const { device } = deviceDetector.parse(headers['user-agent'] as string);
  const writeApi = client.getWriteApi('william.beuil@gmail.com', 'wbeuil.com');
  writeApi.useDefaultTags({
    device: device?.type as string,
  });

  body.map((queue: NextWebVitalsMetric & { page: string }) => {
    const point = new Point(queue.name)
      .floatField('value', queue.value)
      .tag('label', queue.label)
      .tag('page', queue.page);
    writeApi.writePoint(point);
  });

  return writeApi
    .close()
    .then(() => res.status(200).send('Success'))
    .catch((e) => res.status(e.statusCode).send('Error'));
};
