# auto-add-label

> A GitHub App built with [Probot](https://github.com/probot/probot) that 🏷 Automatically add label for pull request

## Install

[Set up a plan](https://github.com/marketplace/auto-add-label)

## How to

- [中文](https://zhuanlan.zhihu.com/p/79570363)
- [English](https://medium.com/deepexi/how-to-write-a-github-app-b297b7889815)

## Why

We use [gren](https://github.com/github-tools/github-release-notes) to generate github release notes, like this:

![image-20190824144637338](https://tva1.sinaimg.cn/large/006y8mN6ly1g6av26v5lzj310w0gcjy0.jpg)

This requires we label every pull request:

![image-20190824144931139](https://tva1.sinaimg.cn/large/006y8mN6ly1g6av2jw6c5j31j20kk490.jpg)

If we forget to add label,  there will be no release log:

![image-20190824145253175](https://tva1.sinaimg.cn/large/006y8mN6ly1g6av2ifwa7j31ea0gmtci.jpg)

In fact, as a human, I often forget to do that. That' why I create this app.


## Dev 

```sh
# Install dependencies
yarn

# Developing
yarn dev

# Run the bot
yarn start
```

## Contributing

If you have suggestions for how auto-add-label could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2019 levy9527 <mailto:levy9527@qq.com> (https://github.com/levy9527/auto-add-label)

## Inspiration

thanks to [auto-badge](https://github.com/a1motion/auto-badge)
