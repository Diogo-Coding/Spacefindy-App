# Spacefindy Front

## Instalation of project

1. For run this project you will need the backend project, visit `https://github.com/Diogo-Coding/spacefindy-backend`.


2. Clone the repo
  ```
  git clone https://github.com/Diogo-Coding/spacefindy-app.git
  ```

3. Modify the `db.js` file in `src/config` with the `url` from your database.

4. Install node modules
  ```
  npm install
  ```

5. Start the project
  ```
  npm run serve
  ```

## Info

This project is done with https protocol, you can change the digital certificate importing it to the project on main folder and change the `vue.config.js` file to import the certificate. Take note that this only will work for dev server, once you do the build, certificate should be on your server configuration.

If you want run this project on a nginx, apache or another server, just run the build in your server page folder. To create de `/dist` folder, run:

```
npm run build
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
