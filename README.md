# Soar Platform Demo

TODO - update readme


## Localization

The react app uses `react-localization` for supporting different languages.  To use:

Add your string to `./src/locale/strings'.  English is the default and the string id must exist there. The other localizations can be left out and it will fall back to the default.

In your component:

```import Strings from './src/locale/strings';```

and use the string id with

```{Strings.MyStringId}```
