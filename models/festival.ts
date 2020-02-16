
export interface Festivals {
  data: Festival[]
}

interface Festival {
  name: string
  bands: Band[]
}

interface Band {
  name: string
  recordLabel: string
}