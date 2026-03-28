import fs from 'node:fs/promises'
import path from 'node:path'
import https from 'node:https'

const URL = 'https://fonts.google.com/metadata/icons'

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        // Follow redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume()
          return resolve(fetchText(res.headers.location))
        }

        if (res.statusCode !== 200) {
          res.resume()
          return reject(new Error(`HTTP ${res.statusCode} from ${url}`))
        }

        let data = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => resolve(data))
      })
      .on('error', reject)
  })
}

async function main() {
  const raw = await fetchText(URL)
  // endpoint returns non-JSON prefix like: )]}'
  const cleaned = raw.replace(/^\)\]\}'\s*/, '')
  const payload = JSON.parse(cleaned)

  const names = Array.from(
    new Set((payload.icons || []).map((icon) => icon?.name).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b))

  const outPath = path.resolve('src', 'data', 'googleIconNames.json')
  await fs.mkdir(path.dirname(outPath), { recursive: true })
  await fs.writeFile(outPath, JSON.stringify(names, null, 2) + '\n', 'utf8')

  console.log(`Wrote ${names.length} icon names to ${outPath}`)
}

main().catch((err) => {
  console.error('Failed to generate Google icon names:', err)
  process.exit(1)
})
