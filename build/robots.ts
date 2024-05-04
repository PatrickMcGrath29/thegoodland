import fs from 'node:fs'
import path from 'node:path'

export function buildRobots(): void {
  const robots = `Sitemap: ${process.env.URL}/sitemap.xml`
  const writePath = path.join(__dirname, '..', 'public', 'robots.txt')

  fs.writeFileSync(writePath, robots)
}
