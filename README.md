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