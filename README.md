# Website

This website is built using [Docusaurus](https://docusaurus.io/) (They did a great job, salute🫡), a modern static website generator.

## roadmap

- [ ] separate tech blog and daily notes
- [ ] add a search bar
- [ ] add a comment system
- [ ] add a like system
- [ ] add a rss feed
- [ ] more...

## tips from Docusaurus

### Installation

```
$ npm install
```

### Local Development

```
$ npm start --port 4000
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.