const defaultTypes = require('../default-config')

const getType = title => {
  const titleRegex = /(\w*)(?:\((\w*)\))?: (.*)/
  const [, type, scope] = titleRegex.exec(title)
  return type
}

describe('getLabel function', () => {
  test('default types', () => {
    expect(defaultTypes.fix.default).toBe('bug')
    expect(defaultTypes.fix.hack).toBe('hack')

    expect(defaultTypes.chore.deps).toBe('dependencies')
    expect(defaultTypes.chore.default).toBe('chore')

    expect(defaultTypes.feat).toBe('enhancement')

    expect(defaultTypes.hack).toBe('hack')

    expect(defaultTypes.docs).toBe('documentation')

    expect(defaultTypes.refactor).toBe('refactor')

    expect(defaultTypes.style).toBe('style')

    expect(defaultTypes.test).toBe('test')

    expect(defaultTypes.perf).toBe('performance')
  })
})
