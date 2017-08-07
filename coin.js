var mongoose = require('mongoose');

var CoinSchema = new mongoose.Schema({
    name: String,
    blocks: Number,
    avg_diff: Number,
    reward_total: Number,
    reward_avg: Number,
    coin_price: Number,
    profit_index: Number
},{timestamps: { createdAt: 'created_at' }})

var coinModel = mongoose.model('Coin', CoinSchema);

module.exports = coinModel;
