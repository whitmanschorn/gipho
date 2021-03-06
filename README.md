![200](https://user-images.githubusercontent.com/15174372/51656797-74547100-1f70-11e9-950b-c2fe1253c24d.gif)

# Gipho
Hello! This is a demo application demonstrating use of the giphy API.

### Install

```npm install```

In `utils/secrets.js` add your giphy API key.

### Run

```npm run start```

Visit `localhost:3000`

### About

[React Boilerplate](https://github.com/react-boilerplate/react-boilerplate) was used to set up the scaffolding for this project. The app is compiled and served locally using `Webpack` and renders with `React`, styled via `styled-components` 

### Storage

Data is storage in the `localStorage` of the browser. We used this in lieu of a more complex data store, but it is easy to image how the same keys used for `localStorage`, hashed by a user UUID, could be used to store the list of saved gifs and data for each individual gif.


### i18n

This app is international! In order to trial a different language, you can simply modify the following
```
const DEFAULT_LOCALE = 'en';
```

to the following
```
const DEFAULT_LOCALE = 'ru';
```
in `app/i18n.js`
