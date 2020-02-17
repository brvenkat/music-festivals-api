
export interface Festivals {
  data: Festival[]
}

export interface Festival {
  name?: string
  bands: Band[]
}

interface Band {
  name?: string
  recordLabel?: string
}