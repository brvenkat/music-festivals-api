

import { Response } from '../models/response'
import { Festival } from '../models/festival'

const compareBands = (a,b) => a.name.localeCompare(b.name)

export const parseFestival = (festivals: Festival[]): Response[] => {
  if (!Array.isArray(festivals) || festivals.length === 0) {
    return []
  }
  const allRecordLabels: string[] = festivals.reduce((output, festival) => {
    const records = festival.bands.map((band) => band.recordLabel)
    return output.concat(records.filter((record) => !!record && output.indexOf(record) === -1))
  }, [])


  const allRecordLabelsNoDuplicates = [...new Set(allRecordLabels)]
  const response = allRecordLabelsNoDuplicates.sort().map((label) => ({
    recordName: label,
    bands: festivals.reduce((output, festival) => {
      const bandForLabel = festival.bands.find((band) => band.recordLabel === label)
      if (bandForLabel) {
        const bandIndexInOutput = output.findIndex((data) => data.name === bandForLabel.name)
        if (bandIndexInOutput === -1) {
          output.push({
            name: bandForLabel.name,
            festivals: festival.name ? [festival.name] : []           
          })
        } else {
          let bandData = output.find((data) => data.name === bandForLabel.name)
          output[bandIndexInOutput] = {
            name: bandForLabel.name,
            festivals: bandData.festivals.concat([festival.name]).sort()
          }
        }
      }
      return output.sort(compareBands)
    }, [])
  }))
  return response
}