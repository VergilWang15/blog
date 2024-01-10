"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[666],{7353:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"github-actions","metadata":{"permalink":"/blog/devs-log/github-actions","source":"@site/blog/github-actions-and-pages.md","title":"Using Github Actions & Pages to build and deploy","description":"page header","date":"2024-01-10T09:16:20.000Z","formattedDate":"January 10, 2024","tags":[{"label":"github actions","permalink":"/blog/devs-log/tags/github-actions"},{"label":"docusaurus","permalink":"/blog/devs-log/tags/docusaurus"}],"readingTime":5.325,"hasTruncateMarker":true,"authors":[{"name":"Vergil Wong","title":"A student who loves web dev (copilot guessed it, not even close lol)","url":"https://github.com/VergilWang15","imageURL":"https://github.com/VergilWang15.png","key":"vergil"}],"frontMatter":{"slug":"github-actions","title":"Using Github Actions & Pages to build and deploy","enableComments":true,"authors":"vergil","tags":["github actions","docusaurus"]},"unlisted":false,"nextItem":{"title":"Hello world!","permalink":"/blog/devs-log/hello-world"}},"content":"![page header](https://VergilWang15.github.io/picx-images-hosting/img.7f2j8ohu2fc0.webp)\\n\\n[//]: # (TODO:Build a free image hosting service with github, then replace the images above)\\n\\n\\nToday, I utilized Github actions to successfully build and deploy my website, which is now smoothly hosted on [my Github Pages](https://vergilwang15.github.io/blog/). I am going to share my experience here.\\n\\n## What are Github Actions and Github Pages?\\n\\nGithub Actions is a CI/CD tool provided by Github. It is free for public repositories and has certain amount of free minutes for private repositories (2,000 minutes per month in 01/08/2024).\\n\\nGithub Pages is a service that allows you to host static websites directly from your Github repository. The service is free and supports custom domains, which can be used in unlimited public repositories.\\n\x3c!--truncate--\x3e\\n\\n## Why do I use these two services?\\n\\n- Cost-Effective: They are free\\n- User-Friendly: They are easy to use and well-integrated with Github\\n- Accessiblity: Documentation is clear and everywhere\\n\\n\\n## Create A Workflow File\\n\\nCreate a `.yml` file (In my cases, it\'s `website_ci.yml`) under`.github/workflows/` folder. When you commit this file, Github Actions will automatically run the workflow.\\n\\n## Configure the Workflow\\n\\n<details>\\n<summary>`website_ci.yml`, click to expand</summary>\\n\\n```yml\\nname: My blog CI \\n\\non:\\n  push:\\n    branches: [ \\"main\\" ]\\n  pull_request:\\n    branches: [ \\"main\\" ]\\n\\npermissions:\\n  contents: write\\n\\njobs:\\n  build-and-deploy:\\n    concurrency: ci-${{ github.ref }} \\n    runs-on: ubuntu-latest\\n\\n    strategy:\\n      matrix:\\n        node-version: [18.x, 20.x]\\n\\n    steps:\\n    - uses: actions/checkout@v3\\n    - name: Use Node.js ${{ matrix.node-version }}\\n      uses: actions/setup-node@v3\\n      with:\\n        node-version: ${{ matrix.node-version }}\\n        cache: \'npm\'\\n\\n    - name: Install dependencies\\n      run: npm install\\n\\n    - name: Build website\\n      run: |\\n        npm ci\\n        npm run build\\n\\n    - name: Deploy to GitHub Pages\\n      uses: JamesIves/github-pages-deploy-action@v4\\n      with:\\n        folder: build # The folder the action should deploy.\\n```\\n</details>\\n\\nI use the following steps to configure a workflow:\\n\\n### 1. Configure the workflow itself\\n\\n    This part is used to configure the workflow itself, including:\\n    - Set your workflow\'s name\\n    - Set the event that triggers the workflow, in my case, it\'s `push` or `pull_request` to `main` branch\\n    - Set the permission of the workflow, in my case, it\'s `contents: write`, which means the workflow can write to the repository\\n\\n### 2. Configure the jobs\\n\\n    This part is used to configure the jobs in the workflow, including:\\n    - Set the name of the job, in my case, it\'s `build-and-deploy`\\n    - Set the concurrency of the job, in my case, it\'s `ci-${{ github.ref }}`, which means the job will run concurrently with the same ref\\n    - Set the environment of the job, in my case, it\'s `ubuntu-latest`, which means the job will run on the latest version of Ubuntu\\n    - Set the strategy of the job, in my case, it\'s `node-version: [18.x, 20.x]`, which means the job will run on two versions of Node.js. I use this because I want to test if my website can be built on different versions of Node.js\\n\\n### 3. Configure the steps\\n\\n    Steps are the most important part of the workflow, which contains the actual actions that will be executed. In my case, I use the following steps:\\n\\n    - `actions/checkout@v3`: This action is used to checkout the repository to the runner, which means the runner will have access to the repository\\n    - `actions/setup-node@v3`: This action is used to setup Node.js on the runner\\n    - `npm install`: This step is used to install dependencies, which is required to build the docusaurus website, you can also use yarn which is more recommended by docusaurus\\n    - `npm ci`: This step is used to install dependencies with clean cache listed in the package-lock.json file\\n    - `npm run build`: This step is used to build the website, which will generate a `build` folder containing the static website\\n\\n    After these steps, the website is built and ready to be deployed.\\n\\n### 4. Configure the deployment\\n\\n    I used [JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action/tree/v4/) to deploy my website. This action will create a new branch called `gh-pages` and push the `build` folder (you can specify the folder in the action) to the branch. \\n\\n## Push the Workflow File to your Repository\\n\\nAfter you commit it to Github (main branch here), Github Actions will automatically run the workflow. You can check the status here:\\n\\n![Github Actions](https://VergilWang15.github.io/picx-images-hosting/image-1.28lgegcf0ljw.webp)\\n\\nIf you are using vscode, you can install a [Github Actions extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-github-actions) to check the status of your workflow. It also provides some convient features like highlighting the actions you are using, which can be clicked to view the Github repo of the action.\\n\\n![Github Actions extension](https://VergilWang15.github.io/picx-images-hosting/image-2.2bsusm0llbok.webp)\\n\\n## Configure Github Pages\\n\\nAfter Gihub Actions is finished, the workflow will create a new branch called `gh-pages` on your repository. You can check it here:\\n\\n![gp-branch](https://VergilWang15.github.io/picx-images-hosting/image.4751esm5w1k0.webp)\\n\\nThen, you can go to the `Settings` tab of your repository and scroll down to the `Github Pages` section. \\n\\n- Select `Deploy from a branch` as the source\\n- Select the `gh-pages` as the branch\\n- Select the `/ (root)` as the folder\\n\\nGithub Pages will automatically start a Github Actions called `pages-build-deployment` to deploy your website. After it\'s finished, you can access your website at `https://<your-github-username>.github.io/<your-repository-name>/`.\\n\\nYou can also use a custom domain for your website. And Github provides a [detailed guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for this.\\n\\n## Modify the `docusaurus.config.js` file\\n\\n`docusaurus.config.js` is the configuration file of docusaurus. It contains the basic information of the website, including the plugins, the theme, layout, i18n, etc.\\n\\nThe thing was not done yet after I configured the Github Pages. The website was truly deployed, but it didn\'t work as expected.\\n\\nThe reason why it didn\'t work is that the `baseUrl` in the `docusaurus.config.js` file was not set correctly. \\n\\nThe default value of `baseUrl` is `/`, which means the website will be hosted at `https://your-repo.github.io/`. But in my case, I want to host the website at `https://your-repo.github.io/blog/`, so I need to change the `baseUrl` to `/blog/`.\\n\\n\\n```diff\\nconst config = {\\n// set the production url of your site here\\n- url: \'https://your-docusaurus-site.example.com\',\\n+ url: \'https://your-repo.github.io\',\\n\\n// set the base url of your site\\n- baseUrl: \'/\',\\n+ baseUrl: \'/blog/\',\\n\\n// some references should be changed as well\\n- {to: \'/blog\', label: \'Blog\', position: \'left\'},\\n+ {to: \'/blog/blog\', label: \'Blog\', position: \'left\'},\\n}\\n```\\n:::tip\\n\\nDocusaurus v3 does not include support for `diff` code block highlighting out of the box. To enable this feature, you need to add an option in your `docusaurus.config.js` file as follows:\\n\\n```js {4}\\nprism: {\\n  theme: prismThemes.github,\\n  darkTheme: prismThemes.dracula,\\n  additionalLanguages: [\'diff\'],\\n},\\n```\\n:::\\n\\nAfter these changes being made, the website should work as expected \ud83c\udf89"},{"id":"hello-world","metadata":{"permalink":"/blog/devs-log/hello-world","source":"@site/blog/my-first-blog.md","title":"Hello world!","description":"This is my first blog post!","date":"2024-01-10T09:16:20.000Z","formattedDate":"January 10, 2024","tags":[{"label":"hello world","permalink":"/blog/devs-log/tags/hello-world"},{"label":"docusaurus","permalink":"/blog/devs-log/tags/docusaurus"}],"readingTime":0.805,"hasTruncateMarker":true,"authors":[{"name":"Vergil Wong","title":"A student who loves web dev (copilot guessed it, not even close lol)","url":"https://github.com/VergilWang15","imageURL":"https://github.com/VergilWang15.png","key":"vergil"}],"frontMatter":{"slug":"hello-world","title":"Hello world!","authors":"vergil","enableComments":true,"tags":["hello world","docusaurus"]},"unlisted":false,"prevItem":{"title":"Using Github Actions & Pages to build and deploy","permalink":"/blog/devs-log/github-actions"}},"content":"This is my first blog post!\\n\\nI am using [Docusaurus v3](https://docusaurus.io/) to build this site, and it\'s the first time I use a blog site to host my personal dev docs and daily notes. Great start!\\n\\nCopilot helped me to write some words, he is indeed not so smart while writing articles, but I believe he tried his best(He is a fined turned GPT-3.5 instruction model I guess?). Some of his completion is funny, so I just keep them here.\\n\\nI am not a native English speaker, the reason why I write this blog in English is a peronal challenge. Maybe one day I will leave China and work overseas. So I just write these words while imagining I am already there \ud83d\ude02.\\n\\nSo, let\'s start! Some blogs for dev notes, some for daily notes, some for life and some for fun. I will try to hold on unless I am done with this as long as I can \ud83d\ude01.\\n\x3c!--truncate--\x3e"}]}')}}]);