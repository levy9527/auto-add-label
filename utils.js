const defaultConfig = require('./default-config')

const getType = title => {
  const titleRegex = /(\w*)(!?)(?:\((.*)\)(!?))?: (.*)/
  if (!titleRegex.test(title)) return ''

  const [, type, typeMark, scope, scopeMark] = titleRegex.exec(title)

  if (typeMark || scopeMark) return 'breaking-change'
  return defaultConfig[type]
    ? defaultConfig[type][scope] || defaultConfig[type].default
    : type
}

const hasTitleChanged = (title, changes = {}) => {
  return changes.title ? getType(title) != getType(changes.title.from) : false
}

module.exports = {
  getType,
  hasTitleChanged
}
