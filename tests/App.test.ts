const request = require('supertest')
const app = require('../src/App')
import * as parse from '../utils/parse'
import axios from 'axios'

describe('App', () => {
  const parserResponse = [
    {
      recordName: 'some-record',
      bands: [
        {
          name: 'some-band',
          festivals: ['some-festival']
        }
      ]
    }
  ]
  const apiResponse = {
    data: [
      {
        name: 'some-festival',
        bands: [
          {
            name: 'some-band',
            recordLabel: 'some-record'
          }
        ]
      }
    ]
  }
  
  afterAll(async () => {
    jest.resetAllMocks()
    await new Promise(resolve => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
  });
  it('Should handle a normal request', async () => {
    const mockFunction = jest.spyOn(parse, 'parseFestival').mockReturnValue(parserResponse)
    const axiosMock = jest.spyOn(axios, 'get').mockResolvedValue(apiResponse)
    await request(app).get('/music-festivals')
    expect(axiosMock).toHaveBeenCalled()
    expect(mockFunction).toHaveBeenCalledWith(apiResponse.data)
  })

  it('should not throw when there is an error', async () => {
    jest.spyOn(axios, 'get').mockRejectedValue([])
    const consoleMock = jest.spyOn(console, 'log').mockImplementation(() => null)
    await request(app).get('/music-festivals')
    expect(consoleMock).toHaveBeenCalledWith('+++Returning data from cache+++')
  })
})