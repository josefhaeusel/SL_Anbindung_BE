import { Injectable, Logger, Search } from '@nestjs/common'
import param from 'jquery-param'
import * as crypto from 'crypto'
import { HttpService } from '@nestjs/axios'
import { catchError, firstValueFrom } from 'rxjs'
import { AxiosError } from 'axios'

@Injectable()
export class MusicAiSearchService {
  private readonly logger = new Logger(MusicAiSearchService.name)

  constructor(private readonly httpService: HttpService) { }

  async allTags(trackIds: number[]) {
    const url = 'gettestcyanitetags'

    const urlData = {
      trackIds,
    }

    const urlPayload = { 

    }

    const { data } = await firstValueFrom(
      this.httpService
        .post(url, urlData, {
          baseURL: process.env.S12_API_URL,
          headers: this._getHeaders(urlPayload),
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    // this.logger.debug('data', data)

    return {
      success: data.success,
      data: data.data,
      post: data.post,
    }
  }

  async freeTextSearch(searchTerm: string, tagIds = []) {
    const url = 'gettestfreetextsearch'

    const urlData = {
      searchTerm,
      tagIds,
      include_custom_analyze: true
    }

    const urlPayload = {
    }

    return this._doSearch(url, urlData, urlPayload)
  }

  async tagtSearch(searchTerm: string, tagIds = []) {
    const url = 'gettestkeywordsearch'

    const urlData = {
      searchTerm,
      tagIds,
    }

    const urlPayload = {}

    return this._doSearch(url, urlData, urlPayload)
  }

  async imageData(trackId: number, imageType: 'Waveform' | 'Cover') {

    const url = `loadTrack${imageType}Image/${trackId}/mode/search`

    const { data, headers } = await firstValueFrom(
      this.httpService
        .get(url, {
          baseURL: process.env.S12_API_URL,
          headers: this._getHeaders({}),
          responseType: 'arraybuffer'
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    // this.logger.debug('data', data)

    return {
      data,
      contentType: headers['content-type'] || 'image/jpeg',

    }
  }


  async audioData(trackId: number) {
    const url = 'playcephtrack'

    const urlData = {
      "track_id": trackId,
      "mode": "search"
    }

    const urlPayload = {
    }

    const { data, headers } = await firstValueFrom(
      this.httpService
        .post(url, urlData, {
          baseURL: process.env.S12_API_URL,
          headers: this._getHeaders(urlPayload),
          responseType: 'stream',
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    return {
      stream: data,
      contentType: headers['content-type'] || 'audio/mpeg',
      contentDisposition: headers['content-disposition'] || 'attachment; filename="track.mp3"',
    }
  }

  private async _doSearch(url: string, urlData: any, urlPayload: any) {
    const { data } = await firstValueFrom(
      this.httpService
        .post(url, urlData, {
          baseURL: process.env.S12_API_URL,
          headers: this._getHeaders(urlPayload),
          // params: { include_custom_analyze: true },
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw 'An error happened!'
          }),
        ),
    )

    // this.logger.debug('data', data)

    return {
      success: data.success,
      data: data.data,
      post: data.post,
    }
  }

  /*
  async freeTextSearch(prompt) {
    const auth_token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo5NTcsInVzZXJJZCI6NjcyNjcsImFjY2Vzc1Rva2VuU2VjcmV0IjoiMTMyZDE2ZjZlYzRhNWVlNWFmODE5Zjg3MDljY2YwYzQ2Y2U3MDVhZmQxMjkwYThiMWQ5YWU2YjY0ODcwNGJhYiIsImlhdCI6MTcwODUzMjQyNn0.L1lqo8DNFFtGVkiHUSkBBchWGojIIRAJ8pRIEx4SUnc'

    return fetch('https://api.cyanite.ai/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query FreeTextSearchExample($text: String!) {
            freeTextSearch(
              first: 3
              target: { crate: { crateId: "972" } }
              searchText: $text
            ) {
              ... on FreeTextSearchError {
                message
                code
              }
              ... on FreeTextSearchConnection {
                edges {
                  cursor
                  node {
                    id
                    title
                  }
                }
              }
            }
          }
        `,
        variables: {
          text: prompt,
        },
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth_token,
      },
    }).then((res) => {
      return res.json()
    })
  }
  */

  private _getHeaders(data: any) {
    const prefix = process.env.S12_API_PREFIX
    const timestamp = (this._getMicrotime() * 1000).toString()
    const secret = process.env.S12_API_SECRET
    const hash = this._getHMAC(data, timestamp, secret)
    const key = process.env.S12_API_USER
    const authorization = prefix + timestamp + key + ':' + hash

    // this.logger.debug(`authorization: ${authorization}`)

    return { Authorization: authorization }
  }

  private _getMicrotime() {
    const now = new Date().getTime() / 1000

    // this.logger.debug(`now: ${now}`)

    return now
  }

  private _getHMAC(data: any, timestamp: string, secret: string) {
    // https://github.com/knowledgecode/jquery-param
    // const key = param(data, true);
    const key = param(data)

    // this.logger.debug(`key: ${key}`)
    // this.logger.debug(`timestamp: ${timestamp}`)

    // const text = decodeURIComponent(key + timestamp);
    const text = key + timestamp
    // this.logger.debug(`text: ${text}`)

    // const hash = CryptoES.HmacSHA1(text, secret)
    const hash = crypto.createHmac('sha1', secret).update(text).digest('hex')

    return hash.toString()
  }
}
