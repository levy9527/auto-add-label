const titleRegex = /(\w*)(?:\((\w*)\))?: (.*)/
const {getType, hasTitleChanged} = require('./utils')

module.exports = app => {
  app.on(['pull_request.opened'], async context => {
    const {owner, repo} = context.repo()
    app.log(`------ receiving pull_request.opened webhook: ${owner}/${repo} ------`)

    const {
      payload: {
        pull_request: {title, labels}
      }
    } = context

    let label = getType(title)

    if(!label) return
    if (labels.some(l => l.name === label)) return

    app.log('------ begin to process ------')

    const newLabels = labels.map(l => l.name).concat(label)
    context.github.issues.addLabels(context.issue({labels: newLabels}))

    context.log(`Using label:`, newLabels)
  })

  app.on(['pull_request.edited'], async context => {
    const {owner, repo} = context.repo()
    app.log(`------ receiving pull_request.edited webhook: ${owner}/${repo} ------`)

    const {
      payload: {
        pull_request: {title, labels},
        changes
      }
    } = context

    let label = getType(title)

    if(!label) return
  //  if (!hasTitleChanged(title, changes)) return
    if (labels.some(l => l.name === label)) return

    app.log('------ begin to process ------')

    let oldLabel = getType(changes.title.from)

    const newLabels = labels
      .filter(l => l.name != oldLabel)
      .map(l => l.name)
      .concat(label)
    context.github.issues.replaceLabels(context.issue({labels: newLabels}))

    context.log(`Using label:`, newLabels)
  })
}
