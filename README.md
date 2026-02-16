## Setup
```bash
npm install
npm run start
```

### Alternative: GitHub Codespaces
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/archive-dot-com/fe-interview-react-public)

Dependencies install automatically. Once the Codespace is ready, run:
```bash
npm run start
```

### Alternative: Docker Setup
```bash
docker compose run --rm app npm install
docker compose up app
```

## API Server

The API is served locally by the Vite dev server. No external dependencies required.

GET `/api/influencers`

**Response body example**
```json
{
  "id":"f91e9e90-19ba-4729-9f92-4fbee9cb021e",
  "firstName":"Jeramie",
  "lastName":"Denesik",
  "avatarUrl":"https://cdn.fakercloud.com/avatars/kucingbelang4_128.jpg",
  "accountName":"Magdalen.Spinka58",
  "description":"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients"
}
```

**Query params**

| Key      | Type   | Description      |
| -------- | ------ | ---------------- |
| `q`      | String | Full-text search |
| `_page`  | Number | Page number      |
| `_limit` | Number | Limit per page   |

**Response headers**

| Header           | Description                    |
| ---------------- | ------------------------------ |
| `X-Total-Count`  | Total count of influencers     |
