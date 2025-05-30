export type CryptoData = {
    product_id: string;
    price: string;
    price_percentage_change_24h: string;
    volume_24h: string;
    volume_percentage_change_24h: string;
    base_increment: string;
    quote_increment: string;
    quote_min_size: string;
    quote_max_size: string;
    base_min_size: string;
    base_max_size: string;
    base_name: string;
    quote_name: string;
    watched: boolean;
    is_disabled: boolean;
    new: boolean;
    status: string;
    cancel_only: boolean;
    limit_only: boolean;
    post_only: boolean;
    trading_disabled: boolean;
    auction_mode: boolean;
    product_type: string;
    quote_currency_id: string;
    base_currency_id: string;
    fcm_trading_session_details: any;
    mid_market_price: string;
    alias: string;
    alias_to: string[];
    base_display_symbol: string;
    quote_display_symbol: string;
    view_only: boolean;
    price_increment: string;
    display_name: string;
    product_venue: string;
    approximate_quote_24h_volume: string;
    new_at: string;
}

export type CryptoCandles = {
    candles: {
        start: string;
        low: string;
        high: string;
        open: string;
        close: string;
        volume: string;
    }[];
}