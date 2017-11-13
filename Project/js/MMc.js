"use strict";

function factorial(n) {
    var res = 1;
    for (var i = 2; i <= n; ++i) {
        res *= i;
    }
    return res;
}

function MMc(la, mu, c) {
    this.la = la;
    this.mu = mu;
    this.c = c;
}

MMc.prototype.calc_r = function () {
    return this.la / this.mu;
};

MMc.prototype.calc_rho = function () {
    return this.calc_r() / this.c;
};

MMc.prototype.calc_L = function () {
    return this.la * this.calc_W();
};

MMc.prototype.calc_Lq = function () {
    return this.la * this.calc_Wq();
};

MMc.prototype.calc_W = function () {
    return this.calc_Wq() + 1 / this.mu;
};

MMc.prototype.calc_Wq = function () {
    return (Math.pow(this.calc_r(), this.c)) / (factorial(this.c) * this.c * this.mu * (Math.pow((1. - this.calc_rho()), 2))) * this.calc_P0();
};

MMc.prototype.calc_P0 = function () {
    var res = 0.;
    for (var n = 0; n < this.c; ++n) {
        res += (Math.pow(this.calc_r(), n)) / factorial(n)
    }
    res += (Math.pow(this.calc_r(), this.c)) / (factorial(this.c) * (1. - this.calc_rho()));
    return 1. / res
};

MMc.prototype.calc_Pn = function (n) {
    var res = (Math.pow(this.la, n)) / (Math.pow(this.mu, n)) * this.calc_P0();
    if (n < this.c) {
        return res / factorial(n);
    }
    else {
        return res / (Math.pow(this.c, (n - this.c))) / factorial(this.c);
    }
};
