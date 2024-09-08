import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Счётчики для метрик
let requests = new Counter('http_reqs');

export const options = {
    stages: [
        { duration: '10s', target: 5 }, // Up load of 5 VU for the first 10 seconds
        { duration: '20s', target: 5 }, // Hold for 20 seconds
        { duration: '10s', target: 0 }, // Slow down to 0 VU
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% should be below 500мс
    },
};

export default function () {
    const url = 'http://api:3000/items'; // link to API

    // 1. POST request - add new item
    let payload = JSON.stringify({ name: `Item ${Math.random()}` });
    let headers = { 'Content-Type': 'application/json' };
    let postRes = http.post(url, payload, { headers });

    check(postRes, {
        'POST status 201': (r) => r.status === 201,
    });

    // 2. GET request - get all items
    let getRes = http.get(url);
    check(getRes, {
        'GET status 200': (r) => r.status === 200,
    });

    sleep(1);
}
