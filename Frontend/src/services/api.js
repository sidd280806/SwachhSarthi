const BASE_URL = "http://127.0.0.1:8000";

export const getSummary = () =>
  fetch(`${BASE_URL}/analytics/summary`).then(res => res.json());

export const getTrend = () =>
  fetch(`${BASE_URL}/analytics/trend`).then(res => res.json());

export const getCategories = () =>
  fetch(`${BASE_URL}/analytics/categories`).then(res => res.json());

export const getZones = () =>
  fetch(`${BASE_URL}/risk/zones`).then(res => res.json());

export const getAIReport = () =>
  fetch(`${BASE_URL}/report/ai-summary`).then(res => res.json());
