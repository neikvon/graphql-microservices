import { config as baseConfig } from './base'

export const config = {
  ...baseConfig,
  ...{
    server: {
      port: 3002
    }
  }
}
