import fs from 'fs'

export function existsSync(dir) {
  return fs.existsSync(dir)
}

export function readFileSync(dir) {
  return fs.readFileSync(dir)
}

export function readdirSync(dir) {
  return fs.readdirSync(dir)
}

export function statSync(dir) {
  return fs.statSync(dir)
}
