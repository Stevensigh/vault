![Vault](https://static.kevinlin.info/blog/vault/banner.png)

# Contributing

## Issues

When reporting a bug, please state the commit SHA of Vault you're running, the expected behavior, and the actual behavior.

When requesting a feature, please be specific and state the use case. I'll work on it if I'm interested, but otherwise feel free to file a PR and I'll merge it upstream if I think it's worthwhile.

## Pull requests

When submitting pull requests to propose changes to merge upstream, please ensure that your changes pass the Travis build. This will automatically check for common errors such as lint problems, unit test failures, and compile errors.

## Development

Vault's server-side code uses the [`supercharged`](https://github.com/LINKIWI/supercharged) library to define API handlers. The client-side code uses React and the [`react-elemental`](https://github.com/LINKIWI/react-elemental) UI component library.

Server-side code lives exclusively in `src/server/` and the client-side code lives exclusively in `src/client/`. Shared constants live in `src/shared/`.

To start a live development server (automatically watches for changes and rebuilds the dependent source files), run `npm run dev` at the terminal and visit `localhost:3000` in your web browser.
