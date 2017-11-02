Welcome to iTunes App!
===================

This is a proxy app to iTunes search and lookup [API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)

Setup
-------------

clone the repository and from root folder run
> - npm run-script build
> - npm start

open localhost:3000

Requires nodejs 8.8.1 (latest)  -> using (async / await), promisify

Backend
-------------
Supports 2 apis
> - /api/search
> - /api/lookup

These in turn uses the iTunes API

There is a caching layer for all iTunes Requests, uses [node-cache](https://www.npmjs.com/package/node-cache)

For input request validations using [express-validator](https://github.com/ctavan/express-validator)

Frontend
-------------
Its a React App. It proxies all '/api' requests to the Backend.
Its in the folder [./client](https://github.com/Vishnubabu/iTunesApp/tree/master/client)
Used - [create-react-app](https://github.com/facebookincubator/create-react-app) for creation

It has 3 react components

> - SearchBox
> - LookupBox
> - ItemResults

Uses Routes from [react-router](https://github.com/ReactTraining/react-router).
'search' and 'lookup' actions change the route and the components listen to the route changes and fetch data from the backend.

Uses [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md) for handling async requests

Uses [React-Bootstrap](https://react-bootstrap.github.io/) for these components

- Table
- Forms
- Tabs
- Button
