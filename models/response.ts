export interface Response {
  recordName: string
  bands: Band[]
}

interface Band {
  name: string
  festivals: string[]
}