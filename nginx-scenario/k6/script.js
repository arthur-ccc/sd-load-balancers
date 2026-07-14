import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL;

const SCENARIO = __ENV.SCENARIO;

const scenarioDefs = {
  baseline: {
    executor: 'constant-arrival-rate',
    rate: 5,
    timeUnit: '1s',
    duration: '2m',
    preAllocatedVUs: 50,
    maxVUs: 200,
    exec: 'run',
  },
  failure: {
    executor: 'constant-arrival-rate',
    rate: 30,
    timeUnit: '1s',
    duration: '2m',
    preAllocatedVUs: 30,
    maxVUs: 100,
    exec: 'run',
  },
  spike: {
    executor: 'ramping-arrival-rate',
    startRate: 10,
    timeUnit: '1s',
    stages: [
      { target: 10, duration: '10s' },
      { target: 1000, duration: '5s' },
      { target: 1000, duration: '30s' },
      { target: 10, duration: '10s' },
    ],
    preAllocatedVUs: 200,
    maxVUs: 1500,
    exec: 'run',
  },
};

export const options = {
  scenarios: {
    [SCENARIO]: scenarioDefs[SCENARIO],
  },
};

export function run() {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'status is 200': (r) => r.status === 200,
    'status is not 5xx': (r) => r.status < 500,
  });
}
