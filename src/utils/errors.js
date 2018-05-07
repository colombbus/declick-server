import {format} from '~/utils/text'

export function makePropError (key, error) {
  return {key, description: format(error, {key})}
}
