# react-redux-typescript-saga-immutable

This project includes a working example of React, React Router, Redux, Redux Saga, ImmutableJS and Styled Components.

All the code is in TypeScript, written as either .ts or .tsx files.

## Setup

1. Follow firstly instruction in the smart-contract project and deploy smart contracts on your local development

2. Install metamask extension in your browser (Chrom or Firefox) and setup it following instructions
```
https://metamask.io/
```

3. Import accounts from your Ganache Client using account private keys - can be exported from Ganache client

4. Start project
```
yarn start
```



## Localization

The react app uses `react-localization` for supporting different languages.  To use:

Add your string to `./src/locale/strings'.  English is the default and the string id must exist there. The other localizations can be left out and it will fall back to the default.

In your component:

```import Strings from './src/locale/strings';```

and use the string id with

```{Strings.MyStringId}```