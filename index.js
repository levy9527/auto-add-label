const titleRegex = /(\w*)(?:\((\w*)\))?: (.*)/
const defaultConfig = require('./default-config')

module.exports = (app) => {
  app.on(['pull_request.opened', 'pull_request.edited'],
    async (context) => {
      app.log('------ receiving webhook ------')

      const config = await context.config(`badge.yml`, defaultConfig)
      const { owner, repo } = context.repo()
      const {
        payload: {
          pull_request: { title, labels }
        }
      } = context

      if (titleRegex.test(title)) {
        const [, type, scope] = titleRegex.exec(title)
        let label = null
        if (config && config.types[type]) {
          if (typeof config.types[type] === `string`) {
            label = config.types[type]
          } else if (typeof config.types[type] === `object`) {
            if (scope && config.types[type][scope]) {
              label = config.types[type][scope]
            } else if (config.types[type].default) {
              label = config.types[type].default
            }
          }
       } else if (config.default) {
          label = config.default
        }
        if (label !== null) {
          context.log(`${owner}/${repo}`, `Using label:`, label)
          const oldLabels = labels.map((lab) => lab.name)
          const newLabels = Array.from(new Set([...oldLabels, label]))
          const params = context.issue({ labels: newLabels })
          context.github.issues.addLabels(params)
        }
      }
    }
  )
}
