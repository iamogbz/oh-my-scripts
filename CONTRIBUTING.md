# Contributing

:tada: Thanks for taking the time to contribute! :tada:

The following is a set of guidelines for contributing to this [repo](https://github.com/iamogbz/oh-my-scripts).
These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## What should I know before I get started?

- [x] [Node](https://nodejs.org/en/download/package-manager/)
- [x] [Userscript](https://openuserjs.org/about/Userscript-Beginners-HOWTO)
- [x] [Typescript](https://www.typescriptlang.org/docs)
- [ ] [Webpack](https://webpack.js.org/concepts/)

## How Can I Contribute?

### Reporting Bugs

[Create new bug report](https://github.com/iamogbz/oh-my-scripts/issues/new?assignees=&labels=&template=bug_report.md)

### Suggesting Enhancements

[Create feature request](https://github.com/iamogbz/oh-my-scripts/issues/new?assignees=&labels=&template=feature_request.md)

### Your First Code Contribution

Fork the repo and setup dependencies

```sh
npm install
jest
```

#### Local development

* Run a dev server to access and auto rebuild the code

```sh
$ npm start
...
Available on:
  http://127.0.0.1:8080
```

* Access the server at <http://localhost:8080> and click on any script to install it. You need an extension in your browser to auto install and pull updates to the script, see [what to know before starting](#what-should-i-know-before-i-get-started)

* Make changes, wait for build and refresh your browser to pull the new changes. You might need to configure your user script to always refresh and not use a cache

### Pull Requests

## Styleguides

### Git Commit Messages

Use [convential semantic commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

### Specs Styleguide

Each bug fix should have an accompanying test, if it's a new feature with a script folder then it should follow the pattern of the others e.g. [no-window-open/index.test.ts](https://github.com/iamogbz/oh-my-scripts/blob/master/scripts/no-window-open/index.test.ts)

## Additional Notes

### Issue and Pull Request Labels

These will get assigned as appropriate