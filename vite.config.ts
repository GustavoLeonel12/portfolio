import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/**
 * GitHub Pages publica em tres situacoes diferentes, e cada uma exige um
 * `base` distinto:
 *
 *   repo de projeto  ->  https://<user>.github.io/<repo>/   => base "/<repo>/"
 *   repo de usuario  ->  https://<user>.github.io/         => base "/"
 *   dominio proprio  ->  https://seudominio.com           => base "/"
 *
 * O dominio proprio tambem publica na raiz mesmo em repo de projeto: por isso
 * o CI resolve o valor e envia em BASE_PATH. Sem essa variavel (build local)
 * o padrao e "/", que e o correto para Netlify/Vercel/Cloudflare.
 */
const base = process.env.BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  server: {
    watch: {
      // Pastas fora do bundle. No Windows, copiar/mover arquivos dentro delas
      // enquanto o chokidar observa derruba o dev server com EBUSY.
      ignored: ['**/imgs/**', '**/dist/**'],
    },
  },
})
