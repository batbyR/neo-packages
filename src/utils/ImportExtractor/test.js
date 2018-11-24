import {
  getPackageComponentsFromLine,
  getPackageOriginFromLine,
} from './component'

describe('ImportExtractor getComponentsFromLine', () => {
  it('should get component with no brackets', () => {
    const line = "import component from 'origin'"
    const component = getPackageComponentsFromLine(line)
    expect(component).toEqual(['component'])
  })

  it('should get component with brackets', () => {
    const line = 'import { component } from origin'
    const component = getPackageComponentsFromLine(line)
    expect(component).toEqual(['component'])
  })

  it('should return empty when there is no import', () => {
    const line = "Je ne suis pas une ligne d'import"
    const component = getPackageComponentsFromLine(line)
    expect(component).toEqual([])
  })
})

describe('ImportExtractor getOriginFromLine', () => {
  it('should get origin from import line', () => {
    const line = "import component from 'origin'"
    const component = getPackageOriginFromLine(line)
    expect(component).toBe('origin')
  })

  it('should return empty when there is no import', () => {
    const line = "Je ne suis pas une ligne d'import"
    const component = getPackageOriginFromLine(line)
    expect(component).toBe('')
  })
})
