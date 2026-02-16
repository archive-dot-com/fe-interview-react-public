import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const influencers = JSON.parse(
  readFileSync(join(__dirname, 'data', 'influencers.json'), 'utf-8')
);

/**
 * Vite plugin that serves a local /api/influencers endpoint
 * replicating the external Heroku JSON server behavior.
 *
 * Supports: ?q= (full-text search), ?_page= & ?_limit= (pagination)
 * Returns X-Total-Count header for pagination.
 */
export default function apiPlugin() {
  return {
    name: 'api-server',
    configureServer(server) {
      server.middlewares.use('/api/influencers', (req, res) => {
        const url = new URL(req.url, 'http://localhost');
        const q = url.searchParams.get('q')?.toLowerCase();
        const page = parseInt(url.searchParams.get('_page'), 10) || null;
        const limit = parseInt(url.searchParams.get('_limit'), 10) || null;

        let result = influencers;

        if (q) {
          result = result.filter(
            (i) =>
              i.firstName.toLowerCase().includes(q) ||
              i.lastName.toLowerCase().includes(q) ||
              i.accountName.toLowerCase().includes(q) ||
              i.description.toLowerCase().includes(q)
          );
        }

        const total = result.length;

        if (page && limit) {
          const start = (page - 1) * limit;
          result = result.slice(start, start + limit);
        } else if (limit) {
          result = result.slice(0, limit);
        }

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Total-Count', String(total));
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
        res.end(JSON.stringify(result));
      });
    },
  };
}
