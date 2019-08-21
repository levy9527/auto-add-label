const defaultConfig = require('../default-config')
const {getType, hasTitleChanged} = require('../utils')

describe('auto add label', () => {
  test('default types', () => {
    expect(defaultConfig.fix.default).toBe('bug')
    expect(defaultConfig.fix.hack).toBe('hack')

    expect(defaultConfig.chore.deps).toBe('dependencies')
    expect(defaultConfig.chore.default).toBe('chore')

    expect(defaultConfig.feat.default).toBe('enhancement')

    expect(defaultConfig.docs.default).toBe('documentation')

    expect(defaultConfig.perf.default).toBe('performance')
  })

  test('getType', () => {
    expect(getType('fix: fix a normal bug')).toBe(defaultConfig.fix.default)
    expect(getType('fix(hack): fix a bug in a hacking way')).toBe(
      defaultConfig.fix.hack
    )
    expect(getType('fix($core): fix a serious bug')).toBe(
      defaultConfig.fix.default
    )

    expect(getType('chore: do homework')).toBe(defaultConfig.chore.default)
    expect(getType('chore(deps): upgrade library')).toBe(
      defaultConfig.chore.deps
    )

    expect(getType('feat: add new function')).toBe(defaultConfig.feat.default)

    expect(getType('docs: add docs')).toBe(defaultConfig.docs.default)

    expect(getType('perf: reduce network requests')).toBe(
      defaultConfig.perf.default
    )

    expect(getType('hack: make some black magic')).toBe('hack')

    expect(getType('refactor: redo sth')).toBe('refactor')
    expect(getType('style: prettier it')).toBe('style')
    expect(getType('test: add unit testing')).toBe('test')
  })

  test('hasTitleChanged', () => {
    const title = 'chore: update .travis.yml'

    const noType = {
      title: {
        from: 'update .travis.yml'
      }
    }

    const changeType = {
      title: {
        from: 'ci: update .travis.yml'
      }
    }

    const changeBody = {
      body: {
        from: ''
      }
    }

    const changeMsg = {
      title: {
        from: 'chore: update .travis.yml config'
      }
    }

    expect(hasTitleChanged(title, noType)).toBeTruthy()
    expect(hasTitleChanged(title, changeType)).toBeTruthy()
    expect(hasTitleChanged(title, changeBody)).toBeFalsy()
    expect(hasTitleChanged(title, changeMsg)).toBeFalsy()
  })
})
