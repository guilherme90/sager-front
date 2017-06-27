import axios from 'axios'

export default axios.create({
  baseURL: process.env.API_URL,
  defaults: {
    headers: {
      post: ['Content-Type', 'application/json']
    }
  }
})