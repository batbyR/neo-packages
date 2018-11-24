import {
  COMPONENTS_REGEX,
  ONE_COMPONENT_REGEX,
  ORIGIN_REGEX,
} from './constants'

export const getPackageComponentsFromLine = line => {
  const hasBracket = /{/.test(line)
  if (hasBracket) {
    const components = line.match(COMPONENTS_REGEX)
    if (components) {
      return components[0]
        .replace('{ ', '')
        .replace(' }', '')
        .split(',')
    } else {
      return []
    }
  } else {
    const component = line.match(ONE_COMPONENT_REGEX)
    if (component) {
      return [component[0].replace('import ', '')]
    }
    return []
  }
}

export const getPackageOriginFromLine = line => {
  const origin = line.match(ORIGIN_REGEX)
  if (origin) {
    return origin[0].replace('from ', '')
  } else {
    return ''
  }
}
