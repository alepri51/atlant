/**
 * Created by Konstantin Nedovizin on 29.08.2018.
 */

(function() {
    /**
     * Корректировка округления десятичных дробей.
     *
     * @param {String}  type  Тип корректировки.
     * @param {Number}  value Число.
     * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
     * @returns {Number} Скорректированное значение.
     */
    function decimalAdjust(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Сдвиг разрядов
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Обратный сдвиг
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Десятичное округление к ближайшему
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Десятичное округление вниз
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Десятичное округление вверх
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

const CHARGES = {
    'donate':  { cost: 75, lines: { 7:15, 6:5, 5:5, 4:5, 3:5, 2:5, 1:10, 0:25 }},
    'bWheel':  { cost: 15, lines: { 3: 0.5, 2: 1, 1:1.5, 0: 12 }},
    'landing': { cost: 15, lines: { 3: 0.5, 2: 1, 1:1.5, 0: 12 }}
}

class Order {

    /**
     *
     *
     * @param {object} orderData
     * @property {string} orderData.type order type
     * @property {number} orderData.cost order amount USD
     * @property {number} orderData.rate BTC USD
     * @property {string} orderData.address order BTC address
     * @property {object} orderData.charges order partners line charges USD ( {0:10, 1: 5} )
     * @property {Array}  orderData.destinations order
     * @property {number} orderData.destinations[].line partners line depth
     * @property {string} orderData.destinations[].address partners BTC address
     *
     */
    constructor(orderData) {
        this._orderData = orderData;
        this.type         = this._orderData.type || 'donate';

        if( !CHARGES.hasOwnProperty(this.type))
            throw new Error(`Wrong order type: "${this._orderData.type}"`);
        if( !this._orderData.rate)
            throw new Error(`Wrong rate: "${this._orderData.rate}"`);
        if( !(this._orderData.destinations && Array.isArray(this._orderData.destinations) && this._orderData.destinations.length > 0 ))
            throw new Error(`Wrong order destinations: "${this._orderData.rate}"`);

        this.cost       = this._orderData.cost    || CHARGES[this.type].cost;
        this.charges    = this._orderData.charges || CHARGES[this.type].lines;

        this.address    = this._orderData.address;
        this._rate      = this._orderData.rate;

        this.update();

    }

    update() {

        this.amount       = 1/this._rate * this.cost;
        this.fee          = Math.round10( 1/this._rate, -8);

        this.destinations = this._orderData.destinations.filter( e =>  this.charges[e.line] ).map(l => {

            l.ratio =  this.charges[l.line] / this.cost;

            l.percent = Math.round10( (l.ratio * 100), -2);

            l.fAmount = Math.round10( (this.amount * l.ratio), -8);
            l.amount =  (l.line === 0)? l.fAmount - this.fee : l.fAmount;

            return l
        })
    }

    get() {
        return {
            type: this.type,
            cost: this.cost,
            rate: this._rate,
            amount: Math.round10( this.amount, -8),
            address: this.address,
            destinations: this.destinations,
            fee:  this.fee
        }
    }

    toString() {
        return 'Order '+JSON.stringify(this.get(), null, '  ');
    }

    valueOf() {
        return this.amount;
    }

    set rate(rate) {
        this._rate = rate;
        this.update()
    }

    get rate() {
        return this._rate;
    }
}

module.exports = Order;