import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path'
import { spawn } from 'child_process'


export interface splitFiles {
    voice: string
    background: string
  }
  
@Injectable()
export class VoiceOptimizationService {

  private readonly logger = new Logger(VoiceOptimizationService.name)

  split(inputAudio: string): Promise<splitFiles> {
    return new Promise((resolve, reject) => {
      const rootPath =
        process.env.NODE_ENV == 'production'
          ? __dirname
          : path.join(process.cwd(), 'src', 'voice-optimization')
      const pythonFile =
        'vocalSeparationChildProcess.' +
        (process.env.NODE_ENV == 'production' ? 'pyc' : 'py')
      const pythonPath = path.join(rootPath, 'py', pythonFile)
      this.logger.debug(
        `python3 ${pythonPath} ${inputAudio}`,
      )
      this.logger.debug(`env ${process.env.NODE_ENV}`)
      this.logger.debug(`env ${process.env.NUMBA_CACHE_DIR}`)
      this.logger.debug(`env ${process.env.MPLCONFIGDIR}`)
      this.logger.debug(`env ${process.env.PYTHONWARNINGS}`)

      const pythonProcess = spawn(
        'python3',
        [pythonPath, inputAudio],
        { env: process.env },
      )

      pythonProcess.stdout.on('data', (data) => {
        try {
          const splitFiles = JSON.parse(data.toString())

          resolve({voice: splitFiles.voice, background: splitFiles.background})
        } catch (error) {
          this.logger.error('error:', error)
          console.error(`error: ${error.message}`)
          reject(error)
        }
      })

      pythonProcess.stderr.on('data', (data) => {
        this.logger.log(data)
      })

      pythonProcess.on('error', (error) => {
        this.logger.error('error:', error)
        console.error(`error: ${error.message}`)
        reject(error)
      })
    })
  }
}
