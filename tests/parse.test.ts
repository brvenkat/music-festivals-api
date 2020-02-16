import * as parse from '../utils/parse'

describe('parse tests', () => {
  it('should parse response correctly ', () => {
    const apiResponse = [
      {
        name: 'some-festival-1',
        bands: [
          {
            name: 'some-band-1',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-2',
            recordLabel: 'some-record-label-2'            
          }
        ]
      },
      {
        name: 'some-festival-2',
        bands: [
          {
            name: 'some-band-1',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-3',
            recordLabel: 'some-record-label-3'            
          }
        ]
      }      
    ]
    const expectedResult = [
      {
        recordName: 'some-record-label-1',
        bands: [
          {
            name: 'some-band-1',
            festivals: ['some-festival-1', 'some-festival-2']
          }
        ]
      },
      {
        recordName: 'some-record-label-2',
        bands: [
          {
            name: 'some-band-2',
            festivals: ['some-festival-1']
          }
        ]
      },
      {
        recordName: 'some-record-label-3',
        bands: [
          {
            name: 'some-band-3',
            festivals: ['some-festival-2']
          }
        ]        
      }
    ]
    const parserResponse = parse.parseFestival(apiResponse)
    expect(parserResponse).toEqual(expectedResult)
  })
  it('should handle multiple bands and no festival name', () => {
    const apiResponse = [
      {
        bands: [
          {
            name: 'some-band-1',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-2',
            recordLabel: 'some-record-label-2'            
          }
        ]
      },
      {
        name: 'some-festival-1',
        bands: [
          {
            name: 'some-band-4',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-5',
            recordLabel: 'some-record-label-2'            
          }
        ]
      }
    ]
    const expectedResult = [
      {
        recordName: 'some-record-label-1',
        bands: [
          {
            name: 'some-band-1',
            festivals: []
          },
          {
            name: 'some-band-4',
            festivals: ['some-festival-1']
          }
        ]
      },
      {
        recordName: 'some-record-label-2',
        bands: [
          {
            name: 'some-band-2',
            festivals: []
          },
          {
            name: 'some-band-5',
            festivals: ['some-festival-1']
          }
        ]
      }
    ]
    const parsedResponse = parse.parseFestival(apiResponse)
    expect(parsedResponse).toEqual(expectedResult)
  })
  it('should handle multiple bands and no record label name', () => {
    const apiResponse = [
      {
        bands: [
          {
            name: 'some-band-1',
            recordLabel: ''
          },
          {
            name: 'some-band-2',
            recordLabel: 'some-record-label-2'            
          }
        ]
      },
      {
        name: 'some-festival-1',
        bands: [
          {
            name: 'some-band-4',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-5',
            recordLabel: 'some-record-label-2'            
          }
        ]
      }
    ]
    const expectedResult = [
      {
        recordName: 'some-record-label-1',
        bands: [
          {
            name: 'some-band-4',
            festivals: ['some-festival-1']
          }
        ]
      },
      {
        recordName: 'some-record-label-2',
        bands: [
          {
            name: 'some-band-2',
            festivals: []
          },
          {
            name: 'some-band-5',
            festivals: ['some-festival-1']
          }
        ]
      }
    ]
    const parsedResponse = parse.parseFestival(apiResponse)
    expect(parsedResponse).toEqual(expectedResult)
  })
    it('should handle multiple bands and no record label name', () => {
    const apiResponse = [
      {
        bands: [
          {
            name: 'some-band-1',
            recordLabel: ''
          },
          {
            name: 'some-band-2',
            recordLabel: 'some-record-label-2'            
          }
        ]
      },
      {
        name: 'some-festival-1',
        bands: [
          {
            name: 'some-band-4',
            recordLabel: 'some-record-label-1'
          },
          {
            name: 'some-band-5',
            recordLabel: 'some-record-label-2'            
          }
        ]
      }
    ]
    const expectedResult = [
      {
        recordName: 'some-record-label-1',
        bands: [
          {
            name: 'some-band-4',
            festivals: ['some-festival-1']
          }
        ]
      },
      {
        recordName: 'some-record-label-2',
        bands: [
          {
            name: 'some-band-2',
            festivals: []
          },
          {
            name: 'some-band-5',
            festivals: ['some-festival-1']
          }
        ]
      }
    ]
    const parsedResponse = parse.parseFestival(apiResponse)
    expect(parsedResponse).toEqual(expectedResult)
  })
  it('should not throw in undefined scenario', () => {
    const apiResponse = null
    const parserResponse = parse.parseFestival(apiResponse)
    expect(parserResponse).toEqual([])
  })
})