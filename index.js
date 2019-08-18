const titleRegex = /(\w*)(?:\((\w*)\))?: (.*)/
const {getType} = require('./utils')

module.exports = app => {
  app.on(['pull_request.opened', 'pull_request.edited'], async context => {
    app.log('------ receiving webhook ------')

    const {
      payload: {
        pull_request: {title, labels}
      }
    } = context

    let label = getType(title)

    const {owner, repo} = context.repo()
    context.log(`${owner}/${repo}`, `Using label:`, label)
    const oldLabels = labels.map(lab => lab.name)
    const newLabels = Array.from(new Set([...oldLabels, label]))
    const params = context.issue({labels: newLabels})
    context.github.issues.addLabels(params)
  })
}
