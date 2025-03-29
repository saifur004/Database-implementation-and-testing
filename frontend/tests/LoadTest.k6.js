import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 50 },  // Stay at 50 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp down to 0 users
  ],
};

export default function () {
  const res = http.get('http://localhost:3000/api/data');
  if (res.status !== 200) {
    console.error(`Error: ${res.status} - ${res.body}`);
  }
  sleep(1);
}