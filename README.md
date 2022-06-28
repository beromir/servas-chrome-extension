# Servas Chrome Extension

Add the current website to your [Servas](https://github.com/beromir/servas) instance directly from the browser.

## Installation

- Get the extension files from the release page.
- Unzip the files.
- Open the extension page in your Chrome browser.
- Enable the `Developer mode`.
- Click on `Load unpacked`.
- Select the `dist` folder from the unpacked extension files.
- Open the profile menu in Servas and click on API Tokens.
- Create a new token with the `create` permission.
- Open the extension settings.
- Add the URL of your Servas instance (`https://your-servas-instance.com`).
- Add the API token.
- Click on `Save settings`.

## Development

```shell
npm install
```

```shell
npm run watch
```

## Generate extension files

```shell
npm run prod
```

The created files are located in the `dist` folder.
