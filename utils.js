const defaultConfig = require('./default-config')

const getType = title => {
  const titleRegex = /(\w*)(?:\((.*)\))?: (.*)/
  const [, type, scope] = titleRegex.exec(title)
  return defaultConfig[type] ? (defaultConfig[type][scope] || defaultConfig[type].default) : type
}

module.exports = {
  getType
}
