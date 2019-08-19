const titleRegex = /(\w*)(?:\((\w*)\))?: (.*)/
const {getType, hasTitleChanged} = require('./utils')

module.exports = app => {
  app.on(['pull_request.opened'], async context => {
    app.log('------ receiving pull_request.opened webhook ------')

    const {
      payload: {
        pull_request: {title, labels}
      }
    } = context

    let label = getType(title)
    if (labels.some(l => l.name === label)) return

    const newLabels = labels.map(l => l.name).concat(label)
    context.github.issues.addLabels(context.issue({labels: newLabels}))

    const {owner, repo} = context.repo()
    context.log(`${owner}/${repo}`, `Using label:`, newLabels)
  })

  app.on(['pull_request.edited'], async context => {
    app.log('------ receiving pull_request.edited webhook ------')

    const {
      payload: {
        pull_request: {title, labels},
        changes
      }
    } = context

    let label = getType(title)
    if (labels.some(l => l.name === label)) return
    if (!hasTitleChanged(title, changes)) return

    let oldLabel = getType(changes.title.from)

    const newLabels = labels
      .filter(l => l.name === oldLabel)
      .map(l => l.name)
      .concat(label)
    context.github.issues.addLabels(context.issue({labels: newLabels}))

    const {owner, repo} = context.repo()
    context.log(`${owner}/${repo}`, `Using label:`, newLabels)
  })
}
