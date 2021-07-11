# Strapi plugin strapi-plugin-html-wysiwyg

This plugin replaces markdown WYSIWYG editor with html one in Strapi CMS.

The plugin is based on awesome SlateJS framework.

## Installation

```
npm install strapi-plugin-html-wysiwyg
```

or

```
yarn add strapi-plugin-html-wysiwyg
```

## Upgrade

In production mode upgrade plugin as npm dependency and rebuild project.

In development mode upgrade plugin as npm dependency, remove `.cache` and `build` folders, run `yarn build` and `yarn develop`.

## Features

HTML WYSIWYG editor uses the same design theme as built in editor.

Toolbar includes following actions:

- Headings
- Bold
- Italic
- Underline
- Strike through
- Media library
- Link
- Quote
- Ordered list
- Unordered list

Suported short keys:

- `Ctrl-z` - undo
- `Ctrl-y` - redo
