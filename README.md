# openui5-basic-template-app
This is a basic app template which you can use as a starting point to build OpenUI5 apps.

## Getting started

1.Install node.js (get it from [nodejs.org](http://nodejs.org/)).
  * If working behind a proxy, you need to configure it properly (HTTP_PROXY / HTTPS_PROXY / NO_PROXY environment variables)

2.Install grunt-cli and bower globally

```sh
npm install grunt-cli bower -g
```

3.Clone the repository and navigate into it

```sh
git clone https://github.com/SAP/openui5-basic-template-app.git
cd openui5-basic-template-app
```

4.Install all npm dependencies

```sh
npm install
```

5.Install all bower dependencies

```sh
bower install
```

6.Run grunt to lint, build and run a local server (have a look into `Gruntfile.js` to see all the tasks).

```sh
grunt
```

7.Open the app in your browser: [http://localhost:8080](http://localhost:8080)
