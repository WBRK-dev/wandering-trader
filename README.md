# Wandering Trader
A trading bot build for Coinbase.<br>
Currently fixed to ETH and exchange Coinbase.

## Running
Build the source.
```
npm run build
```
Migrate the tables. (or run `node build/ db migrate`)
```
npm start db migrate
```
Run the daemon. (or run `node build/ daemon`)
```
npm start daemon
```

### Required environment variables
```
MAIL_FROM_NAME      string
MAIL_FROM_ADDRESS   string
MAIL_HOST           string
MAIL_PORT           number
MAIL_USERNAME       string
MAIL_PASSWORD       string
MAIL_SECURE         'true' | 'false'
REPORT_EMAIL        string
```