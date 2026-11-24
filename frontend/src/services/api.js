import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const memoriesApi = {
  getAll: (search = "") =>
    client
      .get("/memories", { params: search ? { search } : {} })
      .then((res) => res.data),

  getOne: (id) => client.get(`/memories/${id}`).then((res) => res.data),

  create: (payload) =>
    client.post("/memories", payload).then((res) => res.data),

  update: (id, payload) =>
    client.put(`/memories/${id}`, payload).then((res) => res.data),

  remove: (id) => client.delete(`/memories/${id}`).then((res) => res.data),
};

export default client;
