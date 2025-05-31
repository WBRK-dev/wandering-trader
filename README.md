# Wandering Trader
A fake trading bot that tests strategies.<br>
Currently fixed to ETH.

## Strategy
The current strategy does the following every hour:
1. Get the average price from the past 48 hours.
2. Check if the current price is 2% less than the average price.
    If so: buy 1 euro worth of ETH.
3. If the price is 2% more than the bought price of an order?
    If so: sell the amount in that order.

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