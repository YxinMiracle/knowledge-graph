/*! Aliplayer - v2.7.0 - 2018-08-16 */
!function o(a, s, l) {
    function c(i, e) {
        if (!s[i]) {
            if (!a[i]) {
                var t = "function" == typeof require && require;
                if (!e && t) return t(i, !0);
                if (u) return u(i, !0);
                var r = new Error("Cannot find module '" + i + "'");
                throw r.code = "MODULE_NOT_FOUND",
                    r
            }
            var n = s[i] = {
                exports: {}
            };
            a[i][0].call(n.exports, function (e) {
                var t = a[i][1][e];
                return c(t || e)
            }, n, n.exports, o, a, s, l)
        }
        return s[i].exports
    }

    for (var u = "function" == typeof require && require, e = 0; e < l.length; e++)
        c(l[e]);
    return c
}({
    1: [function (e, t, i) {
        var r, n;
        r = this,
            n = function () {
                var u, i, e, t, r, p, n, o, a, s, l, c, d = d || (u = Math, i = Object.create ||
                    function () {
                        function i() {
                        }

                        return function (e) {
                            var t;
                            return i.prototype = e,
                                t = new i,
                                i.prototype = null,
                                t
                        }
                    }(), t = (e = {}).lib = {}, r = t.Base = {
                    extend: function (e) {
                        var t = i(this);
                        return e && t.mixIn(e),
                        t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                            t.$super.init.apply(this, arguments)
                        }),
                            (t.init.prototype = t).$super = this,
                            t
                    },
                    create: function () {
                        var e = this.extend();
                        return e.init.apply(e, arguments),
                            e
                    },
                    init: function () {
                    },
                    mixIn: function (e) {
                        for (var t in e)
                            e.hasOwnProperty(t) && (this[t] = e[t]);
                        e.hasOwnProperty("toString") && (this.toString = e.toString)
                    },
                    clone: function () {
                        return this.init.prototype.extend(this)
                    }
                }, p = t.WordArray = r.extend({
                    init: function (e, t) {
                        e = this.words = e || [],
                            this.sigBytes = null != t ? t : 4 * e.length
                    },
                    toString: function (e) {
                        return (e || o).stringify(this)
                    },
                    concat: function (e) {
                        var t = this.words,
                            i = e.words,
                            r = this.sigBytes,
                            n = e.sigBytes;
                        if (this.clamp(), r % 4) for (var o = 0; o < n; o++) {
                            var a = i[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                            t[r + o >>> 2] |= a << 24 - (r + o) % 4 * 8
                        }
                        else for (o = 0; o < n; o += 4) t[r + o >>> 2] = i[o >>> 2];
                        return this.sigBytes += n,
                            this
                    },
                    clamp: function () {
                        var e = this.words,
                            t = this.sigBytes;
                        e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8,
                            e.length = u.ceil(t / 4)
                    },
                    clone: function () {
                        var e = r.clone.call(this);
                        return e.words = this.words.slice(0),
                            e
                    },
                    random: function (e) {
                        for (var t, i = [], r = function (t) {
                            t = t;
                            var i = 987654321,
                                r = 4294967295;
                            return function () {
                                var e = ((i = 36969 * (65535 & i) + (i >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                                return e /= 4294967296,
                                (e += .5) * (.5 < u.random() ? 1 : -1)
                            }
                        }, n = 0; n < e; n += 4) {
                            var o = r(4294967296 * (t || u.random()));
                            t = 987654071 * o(),
                                i.push(4294967296 * o() | 0)
                        }
                        return new p.init(i, e)
                    }
                }), n = e.enc = {}, o = n.Hex = {
                    stringify: function (e) {
                        for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
                            var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            r.push((o >>> 4).toString(16)),
                                r.push((15 & o).toString(16))
                        }
                        return r.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, i = [], r = 0; r < t; r += 2)
                            i[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                        return new p.init(i, t / 2)
                    }
                }, a = n.Latin1 = {
                    stringify: function (e) {
                        for (var t = e.words, i = e.sigBytes, r = [], n = 0; n < i; n++) {
                            var o = t[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            r.push(String.fromCharCode(o))
                        }
                        return r.join("")
                    },
                    parse: function (e) {
                        for (var t = e.length, i = [], r = 0; r < t; r++)
                            i[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                        return new p.init(i, t)
                    }
                }, s = n.Utf8 = {
                    stringify: function (e) {
                        try {
                            return decodeURIComponent(escape(a.stringify(e)))
                        } catch (e) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function (e) {
                        return a.parse(unescape(encodeURIComponent(e)))
                    }
                }, l = t.BufferedBlockAlgorithm = r.extend({
                    reset: function () {
                        this._data = new p.init,
                            this._nDataBytes = 0
                    },
                    _append: function (e) {
                        "string" == typeof e && (e = s.parse(e)),
                            this._data.concat(e),
                            this._nDataBytes += e.sigBytes
                    },
                    _process: function (e) {
                        var t = this._data,
                            i = t.words,
                            r = t.sigBytes,
                            n = this.blockSize,
                            o = r / (4 * n),
                            a = (o = e ? u.ceil(o) : u.max((0 | o) - this._minBufferSize, 0)) * n,
                            s = u.min(4 * a, r);
                        if (a) {
                            for (var l = 0; l < a; l += n)
                                this._doProcessBlock(i, l);
                            var c = i.splice(0, a);
                            t.sigBytes -= s
                        }
                        return new p.init(c, s)
                    },
                    clone: function () {
                        var e = r.clone.call(this);
                        return e._data = this._data.clone(),
                            e
                    },
                    _minBufferSize: 0
                }), t.Hasher = l.extend({
                    cfg: r.extend(),
                    init: function (e) {
                        this.cfg = this.cfg.extend(e),
                            this.reset()
                    },
                    reset: function () {
                        l.reset.call(this),
                            this._doReset()
                    },
                    update: function (e) {
                        return this._append(e),
                            this._process(),
                            this
                    },
                    finalize: function (e) {
                        return e && this._append(e),
                            this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function (i) {
                        return function (e, t) {
                            return new i.init(t).finalize(e)
                        }
                    },
                    _createHmacHelper: function (i) {
                        return function (e, t) {
                            return new c.HMAC.init(i, t).finalize(e)
                        }
                    }
                }), c = e.algo = {}, e);
                return d
            },
            "object" == typeof i ? t.exports = i = n() : "function" == typeof define && define.amd ? define([], n) : r.CryptoJS = n()
    },
        {}],
    2: [function (e, t, i) {
        var r, n;
        r = this,
            n = function (e) {
                var t, l;
                return l = (t = e).lib.WordArray,
                    t.enc.Base64 = {
                        stringify: function (e) {
                            var t = e.words,
                                i = e.sigBytes,
                                r = this._map;
                            e.clamp();
                            for (var n = [], o = 0; o < i; o += 3)
                                for (var a = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; s < 4 && o + .75 * s < i; s++)
                                    n.push(r.charAt(a >>> 6 * (3 - s) & 63));
                            var l = r.charAt(64);
                            if (l) for (; n.length % 4;) n.push(l);
                            return n.join("")
                        },
                        parse: function (e) {
                            var t = e.length,
                                i = this._map,
                                r = this._reverseMap;
                            if (!r) {
                                r = this._reverseMap = [];
                                for (var n = 0; n < i.length; n++)
                                    r[i.charCodeAt(n)] = n
                            }
                            var o = i.charAt(64);
                            if (o) {
                                var a = e.indexOf(o);
                                -1 !== a && (t = a)
                            }
                            return function (e, t, i) {
                                for (var r = [], n = 0, o = 0; o < t; o++)
                                    if (o % 4) {
                                        var a = i[e.charCodeAt(o - 1)] << o % 4 * 2,
                                            s = i[e.charCodeAt(o)] >>> 6 - o % 4 * 2;
                                        r[n >>> 2] |= (a | s) << 24 - n % 4 * 8,
                                            n++
                                    }
                                return l.create(r, n)
                            }(e, t, r)
                        },
                        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                    },
                    e.enc.Base64
            },
            "object" == typeof i ? t.exports = i = n(e("./core")) : "function" == typeof define && define.amd ? define(["./core"], n) : n(r.CryptoJS)
    },
        {
            "./core": 1
        }],
    3: [function (e, t, i) {
        var r, n;
        r = this,
            n = function (e) {
                return e.enc.Utf8
            },
            "object" == typeof i ? t.exports = i = n(e("./core")) : "function" == typeof define && define.amd ? define(["./core"], n) : n(r.CryptoJS)
    },
        {
            "./core": 1
        }],
    4: [function (e, t, i) {
        var r, n;
        r = this,
            n = function (e) {
                return e.HmacSHA1
            },
            "object" == typeof i ? t.exports = i = n(e("./core"), e("./sha1"), e("./hmac")) : "function" == typeof define && define.amd ? define(["./core", "./sha1", "./hmac"], n) : n(r.CryptoJS)
    },
        {
            "./core": 1,
            "./hmac": 5,
            "./sha1": 6
        }],
    5: [function (e, t, i) {
        var r, n;
        r = this,
            n = function (e) {
                var t, i, c;
                i = (t = e).lib.Base,
                    c = t.enc.Utf8,
                    t.algo.HMAC = i.extend({
                        init: function (e, t) {
                            e = this._hasher = new e.init,
                            "string" == typeof t && (t = c.parse(t));
                            var i = e.blockSize,
                                r = 4 * i;
                            t.sigBytes > r && (t = e.finalize(t)),
                                t.clamp();
                            for (var n = this._oKey = t.clone(), o = this._iKey = t.clone(), a = n.words, s = o.words, l = 0; l < i; l++)
                                a[l] ^= 1549556828,
                                    s[l] ^= 909522486;
                            n.sigBytes = o.sigBytes = r,
                                this.reset()
                        },
                        reset: function () {
                            var e = this._hasher;
                            e.reset(),
                                e.update(this._iKey)
                        },
                        update: function (e) {
                            return this._hasher.update(e),
                                this
                        },
                        finalize: function (e) {
                            var t = this._hasher,
                                i = t.finalize(e);
                            return t.reset(),
                                t.finalize(this._oKey.clone().concat(i))
                        }
                    })
            },
            "object" == typeof i ? t.exports = i = n(e("./core")) : "function" == typeof define && define.amd ? define(["./core"], n) : n(r.CryptoJS)
    },
        {
            "./core": 1
        }],
    6: [function (e, t, i) {
        var r, n;
        r = this,
            n = function (e) {
                var t, i, r, n, o, p, a;
                return i = (t = e).lib,
                    r = i.WordArray,
                    n = i.Hasher,
                    o = t.algo,
                    p = [],
                    a = o.SHA1 = n.extend({
                        _doReset: function () {
                            this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function (e, t) {
                            for (var i = this._hash.words, r = i[0], n = i[1], o = i[2], a = i[3], s = i[4], l = 0; l < 80; l++) {
                                if (l < 16) p[l] = 0 | e[t + l];
                                else {
                                    var c = p[l - 3] ^ p[l - 8] ^ p[l - 14] ^ p[l - 16];
                                    p[l] = c << 1 | c >>> 31
                                }
                                var u = (r << 5 | r >>> 27) + s + p[l];
                                u += l < 20 ? 1518500249 + (n & o | ~n & a) : l < 40 ? 1859775393 + (n ^ o ^ a) : l < 60 ? (n & o | n & a | o & a) - 1894007588 : (n ^ o ^ a) - 899497514,
                                    s = a,
                                    a = o,
                                    o = n << 30 | n >>> 2,
                                    n = r,
                                    r = u
                            }
                            i[0] = i[0] + r | 0,
                                i[1] = i[1] + n | 0,
                                i[2] = i[2] + o | 0,
                                i[3] = i[3] + a | 0,
                                i[4] = i[4] + s | 0
                        },
                        _doFinalize: function () {
                            var e = this._data,
                                t = e.words,
                                i = 8 * this._nDataBytes,
                                r = 8 * e.sigBytes;
                            return t[r >>> 5] |= 128 << 24 - r % 32,
                                t[14 + (r + 64 >>> 9 << 4)] = Math.floor(i / 4294967296),
                                t[15 + (r + 64 >>> 9 << 4)] = i,
                                e.sigBytes = 4 * t.length,
                                this._process(),
                                this._hash
                        },
                        clone: function () {
                            var e = n.clone.call(this);
                            return e._hash = this._hash.clone(),
                                e
                        }
                    }),
                    t.SHA1 = n._createHelper(a),
                    t.HmacSHA1 = n._createHmacHelper(a),
                    e.SHA1
            },
            "object" == typeof i ? t.exports = i = n(e("./core")) : "function" == typeof define && define.amd ? define(["./core"], n) : n(r.CryptoJS)
    },
        {
            "./core": 1
        }],
    7: [function (e, t, i) {
        !
            function () {
                "use strict";

                function s(n, e) {
                    var t;
                    if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10, this.layer = n, this.tapDelay = e.tapDelay || 200, this.tapTimeout = e.tapTimeout || 700, !s.notNeeded(n)) {
                        for (var i = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = 0, o = i.length; r < o; r++)
                            this[i[r]] = a(this[i[r]], this);
                        l && (n.addEventListener("mouseover", this.onMouse, !0), n.addEventListener("mousedown", this.onMouse, !0), n.addEventListener("mouseup", this.onMouse, !0)),
                            n.addEventListener("click", this.onClick, !0),
                            n.addEventListener("touchstart", this.onTouchStart, !1),
                            n.addEventListener("touchmove", this.onTouchMove, !1),
                            n.addEventListener("touchend", this.onTouchEnd, !1),
                            n.addEventListener("touchcancel", this.onTouchCancel, !1),
                        Event.prototype.stopImmediatePropagation || (n.removeEventListener = function (e, t, i) {
                            var r = Node.prototype.removeEventListener;
                            "click" === e ? r.call(n, e, t.hijacked || t, i) : r.call(n, e, t, i)
                        }, n.addEventListener = function (e, t, i) {
                            var r = Node.prototype.addEventListener;
                            "click" === e ? r.call(n, e, t.hijacked || (t.hijacked = function (e) {
                                e.propagationStopped || t(e)
                            }), i) : r.call(n, e, t, i)
                        }),
                        "function" == typeof n.onclick && (t = n.onclick, n.addEventListener("click", function (e) {
                            t(e)
                        }, !1), n.onclick = null)
                    }

                    function a(e, t) {
                        return function () {
                            return e.apply(t, arguments)
                        }
                    }
                }

                var e = 0 <= navigator.userAgent.indexOf("Windows Phone"),
                    l = 0 < navigator.userAgent.indexOf("Android") && !e,
                    c = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
                    u = c && /OS 4_\d(_\d)?/.test(navigator.userAgent),
                    p = c && /OS [6-7]_\d/.test(navigator.userAgent),
                    n = 0 < navigator.userAgent.indexOf("BB10");
                s.prototype.needsClick = function (e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "button":
                        case "select":
                        case "textarea":
                            if (e.disabled) return !0;
                            break;
                        case "input":
                            if (c && "file" === e.type || e.disabled) return !0;
                            break;
                        case "label":
                        case "iframe":
                        case "video":
                            return !0
                    }
                    return /\bneedsclick\b/.test(e.className)
                },
                    s.prototype.needsFocus = function (e) {
                        switch (e.nodeName.toLowerCase()) {
                            case "textarea":
                                return !0;
                            case "select":
                                return !l;
                            case "input":
                                switch (e.type) {
                                    case "button":
                                    case "checkbox":
                                    case "file":
                                    case "image":
                                    case "radio":
                                    case "submit":
                                        return !1
                                }
                                return !e.disabled && !e.readOnly;
                            default:
                                return /\bneedsfocus\b/.test(e.className)
                        }
                    },
                    s.prototype.sendClick = function (e, t) {
                        var i, r;
                        document.activeElement && document.activeElement !== e && document.activeElement.blur(),
                            r = t.changedTouches[0],
                            (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null),
                            i.forwardedTouchEvent = !0,
                            e.dispatchEvent(i)
                    },
                    s.prototype.determineEventType = function (e) {
                        return l && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
                    },
                    s.prototype.focus = function (e) {
                        var t;
                        c && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
                    },
                    s.prototype.updateScrollParent = function (e) {
                        var t, i;
                        if (!(t = e.fastClickScrollParent) || !t.contains(e)) {
                            i = e;
                            do {
                                if (i.scrollHeight > i.offsetHeight) {
                                    t = i,
                                        e.fastClickScrollParent = i;
                                    break
                                }
                                i = i.parentElement
                            } while (i)
                        }
                        t && (t.fastClickLastScrollTop = t.scrollTop)
                    },
                    s.prototype.getTargetElementFromEventTarget = function (e) {
                        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
                    },
                    s.prototype.onTouchStart = function (e) {
                        var t, i, r;
                        if (1 < e.targetTouches.length) return !0;
                        if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], c) {
                            if ((r = window.getSelection()).rangeCount && !r.isCollapsed) return !0;
                            if (!u) {
                                if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(),
                                    !1;
                                this.lastTouchIdentifier = i.identifier,
                                    this.updateScrollParent(t)
                            }
                        }
                        return this.trackingClick = !0,
                            this.trackingClickStart = e.timeStamp,
                            this.targetElement = t,
                            this.touchStartX = i.pageX,
                            this.touchStartY = i.pageY,
                        e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(),
                            !0
                    },
                    s.prototype.touchHasMoved = function (e) {
                        var t = e.changedTouches[0],
                            i = this.touchBoundary;
                        return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i
                    },
                    s.prototype.onTouchMove = function (e) {
                        return this.trackingClick && (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null),
                            !0
                    },
                    s.prototype.findControl = function (e) {
                        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
                    },
                    s.prototype.onTouchEnd = function (e) {
                        var t, i, r, n, o, a = this.targetElement;
                        if (!this.trackingClick) return !0;
                        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0;
                        if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
                        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, i = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, p && (o = e.changedTouches[0], (a = document.elementFromPoint(o.pageX - window.pageXOffset, o.pageY - window.pageYOffset) || a).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (r = a.tagName.toLowerCase())) {
                            if (t = this.findControl(a)) {
                                if (this.focus(a), l) return !1;
                                a = t
                            }
                        } else if (this.needsFocus(a)) return 100 < e.timeStamp - i || c && window.top !== window && "input" === r ? this.targetElement = null : (this.focus(a), this.sendClick(a, e), c && "select" === r || (this.targetElement = null, e.preventDefault())),
                            !1;
                        return !(!c || u || !(n = a.fastClickScrollParent) || n.fastClickLastScrollTop === n.scrollTop) || (this.needsClick(a) || (e.preventDefault(), this.sendClick(a, e)), !1)
                    },
                    s.prototype.onTouchCancel = function () {
                        this.trackingClick = !1,
                            this.targetElement = null
                    },
                    s.prototype.onMouse = function (e) {
                        return !this.targetElement || (!!e.forwardedTouchEvent || (!e.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1))))
                    },
                    s.prototype.onClick = function (e) {
                        var t;
                        return this.trackingClick ? (this.targetElement = null, !(this.trackingClick = !1)) : "submit" === e.target.type && 0 === e.detail || ((t = this.onMouse(e)) || (this.targetElement = null), t)
                    },
                    s.prototype.destroy = function () {
                        var e = this.layer;
                        l && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)),
                            e.removeEventListener("click", this.onClick, !0),
                            e.removeEventListener("touchstart", this.onTouchStart, !1),
                            e.removeEventListener("touchmove", this.onTouchMove, !1),
                            e.removeEventListener("touchend", this.onTouchEnd, !1),
                            e.removeEventListener("touchcancel", this.onTouchCancel, !1)
                    },
                    s.notNeeded = function (e) {
                        var t, i, r;
                        if (void 0 === window.ontouchstart) return !0;
                        if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                            if (!l) return !0;
                            if (t = document.querySelector("meta[name=viewport]")) {
                                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                                if (31 < i && document.documentElement.scrollWidth <= window.outerWidth) return !0
                            }
                        }
                        if (n && 10 <= (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] && 3 <= r[2] && (t = document.querySelector("meta[name=viewport]"))) {
                            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
                        }
                        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction || (!!(27 <= +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] && (t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === e.style.touchAction || "manipulation" === e.style.touchAction))
                    },
                    s.attach = function (e, t) {
                        return new s(e, t)
                    },
                    "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function () {
                        return s
                    }) : void 0 !== t && t.exports ? (t.exports = s.attach, t.exports.FastClick = s) : window.FastClick = s
            }()
    },
        {}],
    8: [function (e, t, i) {
        var r = e("../ui/component"),
            n = (e("../lib/util"), e("../lib/dom")),
            o = e("../lib/event"),
            a = (e("../lib/ua"), e("../lang/index")),
            s = e("../player/base/event/eventtype"),
            l = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-auto-stream-selector",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = "<div><p class='tip-text'></p></div><div class='operators'><a class='prism-button prism-button-ok' type='button'>" + a.get("OK_Text") + "</a><a class='prism-button prism-button-cancel'  target='_blank'>" + a.get("Cancel_Text") + "</a></div>",
                        e
                },
                bindEvent: function () {
                    var r = this;
                    r._player.on(s.Private.AutoStreamShow, function (e) {
                        var t = document.querySelector("#" + r.getId() + " .tip-text");
                        if (r._player._getLowerQualityLevel) {
                            var i = r._player._getLowerQualityLevel();
                            i && (r._switchUrl = i, t.innerText = a.get("Auto_Stream_Tip_Text").replace("$$", i.item.desc), n.css(r.el(), "display", "block"))
                        }
                    }),
                        r._player.on(s.Private.AutoStreamHide, function (e) {
                            document.querySelector("#" + r.getId() + " .tip-text");
                            n.css(r.el(), "display", "none")
                        });
                    var e = document.querySelector("#" + r.getId() + " .prism-button-ok");
                    o.on(e, "click", function () {
                        r._player._changeStream && r._switchUrl && r._player._changeStream(r._switchUrl.index, a.get("Quality_Change_Text")),
                            n.css(r.el(), "display", "none")
                    });
                    var t = document.querySelector("#" + r.getId() + " .prism-button-cancel");
                    o.on(t, "click", function () {
                        n.css(r.el(), "display", "none")
                    })
                }
            });
        t.exports = l
    },
        {
            "../lang/index": 17,
            "../lib/dom": 23,
            "../lib/event": 24,
            "../lib/ua": 37,
            "../lib/util": 39,
            "../player/base/event/eventtype": 47,
            "../ui/component": 95
        }],
    9: [function (e, t, i) {
        var r = e("../ui/component"),
            o = e("../lib/dom"),
            n = e("../lib/event"),
            a = e("../lib/ua"),
            s = e("../lib/function"),
            l = (e("../lang/index"), e("../lib/util")),
            c = e("../config"),
            u = e("../lib/playerutil"),
            p = e("../player/base/event/eventtype"),
            d = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-liveshift-progress",
                        this.addClass(this.className),
                        this._liveshiftService = e._liveshiftService
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this);
                    return e.innerHTML = '<div class="prism-enable-liveshift"><div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"><img></img></div><p class="prism-progress-time"></p><div class="prism-liveshift-seperator">00:00:00</div></div><div class="prism-disable-liveshift"></div>',
                        e
                },
                bindEvent: function () {
                    var i = this;
                    this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"),
                        this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"),
                        this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"),
                        this.timeNode = document.querySelector("#" + this.id() + " .prism-progress-time"),
                        this.controlNode = document.querySelector("#" + this._player._options.id + " .prism-controlbar"),
                        this.seperatorNode = document.querySelector("#" + this.id() + " .prism-liveshift-seperator"),
                        this.progressNode = document.querySelector("#" + this.id() + " .prism-enable-liveshift");
                    var e = document.querySelector("#" + this.id() + " .prism-progress-cursor img"),
                        t = "//" + c.domain + "/de/prismplayer/" + c.h5Version + "/skins/default/img/dragcursor.png";
                    c.domain ? -1 < c.domain.indexOf("localhost") && (t = "//" + c.domain + "/build/skins/default/img/dragcursor.png") : t = "de/prismplayer/" + c.h5Version + "/skins/default/img/dragcursor.png",
                        e.src = t,
                        n.on(this.cursorNode, "mousedown", function (e) {
                            i._onMouseDown(e)
                        }),
                        n.on(this.cursorNode, "touchstart", function (e) {
                            i._onMouseDown(e)
                        }),
                        n.on(this.progressNode, "mousemove", function (e) {
                            i._progressMove(e)
                        }),
                        n.on(this.progressNode, "touchmove", function (e) {
                            i._progressMove(e)
                        }),
                        n.on(this._el, "click", function (e) {
                            i._onMouseClick(e)
                        }),
                        this._player.on(p.Private.HideProgress, function (e) {
                            i._hideProgress(e)
                        }),
                        this._player.on(p.Private.CancelHideProgress, function (e) {
                            i._cancelHideProgress(e)
                        }),
                        this._player.on(p.Private.ShowBar, function () {
                            i._updateLayout()
                        }),
                        n.on(this.progressNode, p.Private.MouseOver, function (e) {
                            i._onMouseOver(e)
                        }),
                        n.on(this.progressNode, p.Private.MouseOut, function (e) {
                            i._onMouseOut(e)
                        }),
                        this.bindTimeupdate = s.bind(this, this._onTimeupdate),
                        this._player.on(p.Player.TimeUpdate, this.bindTimeupdate),
                    u.isLiveShift(this._player._options) && this._player.on(p.Player.Play, function () {
                        i._liveshiftService.start(6e4, function (e) {
                            var t = {
                                mediaId: i._player._options.vid ? i._player._options.vid : "",
                                error_code: e.Code,
                                error_msg: e.Message
                            };
                            i._player.logError(t),
                                i._player.trigger(p.Player.Error, t)
                        })
                    }),
                        this._player.on(p.Private.LiveShiftQueryCompleted, function () {
                            i._updateSeperator(),
                                i._updateLayout()
                        }),
                        this._player.on(p.Player.Pause, function () {
                            i._liveshiftService.stop()
                        }),
                        a.IS_IPAD ? this.interval = setInterval(function () {
                            i._onProgress()
                        }, 500) : this._player.on(p.Video.Progress, function () {
                            i._onProgress()
                        })
                },
                _updateSeperator: function () {
                    this._liveshiftService.currentTimeDisplay && (this.seperatorNode.innerText = this._liveshiftService.currentTimeDisplay)
                },
                _updateLayout: function () {
                    var e = this.seperatorNode.offsetWidth,
                        t = this.el().offsetWidth,
                        i = t - e;
                    0 != e && 0 != i && (o.css(this.progressNode, "width", 100 * (i - 10) / t + "%"), o.css(this.seperatorNode, "right", -1 * (e + 10) + "px"))
                },
                _progressMove: function (e) {
                    var t = this._getSeconds(e),
                        i = this._liveshiftService.availableLiveShiftTime;
                    this.timeNode.innerText = "-" + l.formatTime(i - t);
                    var r = i ? t / i : 0,
                        n = 1 - this.timeNode.clientWidth / this.el().clientWidth;
                    n < r && (r = n),
                    this.timeNode && o.css(this.timeNode, "left", 100 * r + "%")
                },
                _hideProgress: function (e) {
                    n.off(this.cursorNode, "mousedown"),
                        n.off(this.cursorNode, "touchstart")
                },
                _cancelHideProgress: function (e) {
                    var t = this;
                    n.on(this.cursorNode, "mousedown", function (e) {
                        t._onMouseDown(e)
                    }),
                        n.on(this.cursorNode, "touchstart", function (e) {
                            t._onMouseDown(e)
                        })
                },
                _canSeekable: function (e) {
                    var t = !0;
                    return "function" == typeof this._player.canSeekable && (t = this._player.canSeekable(e)),
                        t
                },
                _onMouseOver: function (e) {
                    this._updateCursorPosition(this._getCurrentTime());
                    var t = this;
                    setTimeout(function () {
                        o.css(t.cursorNode, "display", "block")
                    }),
                        o.css(this.timeNode, "display", "block")
                },
                _onMouseOut: function (e) {
                    o.css(this.cursorNode, "display", "none"),
                        o.css(this.timeNode, "display", "none")
                },
                _getSeconds: function (e) {
                    for (var t = this.el().offsetLeft, i = this.el(); i = i.offsetParent;)
                        t += i.offsetLeft;
                    var r = (e.touches ? e.touches[0].pageX : e.pageX) - t,
                        n = this.progressNode.offsetWidth,
                        o = this._liveshiftService.availableLiveShiftTime;
                    return sec = o ? r / n * o : 0,
                    sec < 0 && (sec = 0),
                    sec > o && (sec = o),
                        sec
                },
                _onMouseClick: function (e) {
                    var t = this,
                        i = this._getSeconds(e),
                        r = this._liveshiftService.availableLiveShiftTime - i;
                    this._player.trigger(p.Private.SeekStart, {
                        fromTime: this._getCurrentTime()
                    });
                    var n = this._liveshiftService.getSourceUrl(r),
                        o = u.isHls(t._player._options.source);
                    o ? t._player.seek(i) : t._player._loadByUrlInner(n, i, !0),
                        t._player.trigger(p.Private.Play_Btn_Hide),
                        t._liveshiftService.seekTime = i,
                        t._player.trigger(p.Private.EndStart, {
                            toTime: i,
                            notPlay: !0
                        }),
                        t._updateCursorPosition(i),
                    o && setTimeout(function () {
                        t._player.play()
                    })
                },
                _onMouseDown: function (e) {
                    var t = this;
                    e.preventDefault(),
                        this._player.trigger(p.Private.SeekStart, {
                            fromTime: this._getCurrentTime()
                        }),
                        n.on(this.controlNode, "mousemove", function (e) {
                            t._onMouseMove(e)
                        }),
                        n.on(this.controlNode, "touchmove", function (e) {
                            t._onMouseMove(e)
                        }),
                        n.on(this._player.tag, "mouseup", function (e) {
                            t._onMouseUp(e)
                        }),
                        n.on(this._player.tag, "touchend", function (e) {
                            t._onMouseUp(e)
                        }),
                        n.on(this.controlNode, "mouseup", function (e) {
                            t._onMouseUp(e)
                        }),
                        n.on(this.controlNode, "touchend", function (e) {
                            t._onMouseUp(e)
                        })
                },
                _onMouseUp: function (e) {
                    e.preventDefault(),
                        n.off(this.controlNode, "mousemove"),
                        n.off(this.controlNode, "touchmove"),
                        n.off(this._player.tag, "mouseup"),
                        n.off(this._player.tag, "touchend"),
                        n.off(this.controlNode, "mouseup"),
                        n.off(this.controlNode, "touchend");
                    var t = this._liveshiftService.availableLiveShiftTime,
                        i = this.playedNode.offsetWidth / this.el().offsetWidth * t;
                    this._player.seek(i),
                        this._player.trigger(p.Private.Play_Btn_Hide),
                        this._liveshiftService.seekTime = i,
                        this._player.trigger(p.Private.EndStart, {
                            toTime: i
                        })
                },
                _onMouseMove: function (e) {
                    e.preventDefault();
                    var t = this._getSeconds(e);
                    this._updateProgressBar(this.playedNode, t),
                        this._updateCursorPosition(t)
                },
                _onTimeupdate: function (e) {
                    this._updateProgressBar(this.playedNode, this._getCurrentTime()),
                        this._updateCursorPosition(this._getCurrentTime()),
                        this._player.trigger(p.Private.UpdateProgressBar, {
                            time: this._getCurrentTime()
                        })
                },
                _getCurrentTime: function () {
                    var e = this._liveshiftService.seekTime;
                    return -1 == e && (e = 0),
                    this._player.getCurrentTime() + e
                },
                _onProgress: function (e) {
                    this._player.getDuration() && 1 <= this._player.getBuffered().length && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1))
                },
                _updateProgressBar: function (e, t) {
                    if (1 != this._player._switchSourcing) {
                        var i = 0;
                        if (-1 == this._liveshiftService.seekTime) i = 1;
                        else {
                            var r = this._liveshiftService.availableLiveShiftTime;
                            1 < (i = r ? t / r : 0) && (i = 1, this._liveshiftService.seekTime = -1)
                        }
                        this.liveShiftStartDisplay;
                        e && o.css(e, "width", 100 * i + "%")
                    }
                },
                _updateCursorPosition: function (e) {
                    if (1 != this._player._switchSourcing && (0 != e || 0 != this._player.tag.readyState)) {
                        var t = 0;
                        if (-1 == this._liveshiftService.seekTime) t = 1;
                        else {
                            var i = this._liveshiftService.availableLiveShiftTime;
                            1 < (t = i ? e / i : 0) && (this._liveshiftService.seekTime = -1)
                        }
                        var r = 1,
                            n = this._player.el().clientWidth;
                        0 != n && (r = 1 - 18 / n),
                        this.cursorNode && (r < t ? (o.css(this.cursorNode, "right", "0px"), o.css(this.cursorNode, "left", "auto")) : (o.css(this.cursorNode, "right", "auto"), o.css(this.cursorNode, "left", 100 * t + "%")))
                    }
                }
            });
        t.exports = d
    },
        {
            "../config": 11,
            "../lang/index": 17,
            "../lib/dom": 23,
            "../lib/event": 24,
            "../lib/function": 25,
            "../lib/playerutil": 34,
            "../lib/ua": 37,
            "../lib/util": 39,
            "../player/base/event/eventtype": 47,
            "../ui/component": 95
        }],
    10: [function (e, t, i) {
        var r = e("../ui/component"),
            o = e("../lib/util"),
            a = e("../player/base/event/eventtype"),
            n = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-live-time-display",
                        this.addClass(this.className),
                        this._liveshiftService = e._liveshiftService
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="end-time">00:00</span><span class="live-text">Live: </span><span class="live-time"></span>',
                        e
                },
                bindEvent: function () {
                    var n = this;
                    this._player.on(a.Video.TimeUpdate, function () {
                        var e = n._liveshiftService,
                            t = document.querySelector("#" + n.id() + " .current-time");
                        if (e.liveShiftStartDisplay && e.availableLiveShiftTime > e.seekTime && -1 != e.seekTime) {
                            var i = n._liveshiftService.getBaseTime(),
                                r = o.formatTime(i + n._player.getCurrentTime());
                            t.innerText = r
                        } else e.currentTimeDisplay && (t.innerText = e.currentTimeDisplay)
                    }),
                        this._player.on(a.Private.LiveShiftQueryCompleted, function () {
                            n.updateTime()
                        })
                },
                updateTime: function () {
                    document.querySelector("#" + this.id() + " .end-time").innerText = this._liveshiftService.liveTimeRange.endDisplay,
                        document.querySelector("#" + this.id() + " .live-time").innerText = this._liveshiftService.currentTimeDisplay
                }
            });
        t.exports = n
    },
        {
            "../lib/util": 39,
            "../player/base/event/eventtype": 47,
            "../ui/component": 95
        }],
    11: [function (e, t, i) {
        t.exports = {
            domain: "g.alicdn.com",
            flashVersion: "2.7.2",
            h5Version: "2.7.2",
            logReportTo: "https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/newplayer/track"
        }
    },
        {}],
    12: [function (e, t, i) {
        e("./lang/index").load();
        var r = e("./player/adaptivePlayer"),
            n = function (e, t) {
                return r.create(e, t)
            };
        e("./lib/componentutil").register(n);
        var o = window.Aliplayer = n;
        n.players = {},
            "function" == typeof define && define.amd ? define([], function () {
                return o
            }) : "object" == typeof i && "object" == typeof t && (t.exports = o)
    },
        {
            "./lang/index": 17,
            "./lib/componentutil": 19,
            "./player/adaptivePlayer": 44
        }],
    13: [function (e, t, i) {
        var r = e("../lib/oo"),
            n = e("../lang/index"),
            o = r.extend({
                init: function (e, t) {
                    this._player = e,
                        this._options = e.options()
                }
            });
        o.prototype.handle = function (e) {
            if (this._options.autoPlayDelay) {
                var t = this._options.autoPlayDelayDisplayText;
                t || (t = n.get("AutoPlayDelayDisplayText").replace("$$", this._options.autoPlayDelay)),
                    this._player.trigger("info_show", t),
                    this._player.trigger("h5_loading_hide"),
                    this._player.trigger("play_btn_hide");
                var i = this;
                this._timeHandler = setTimeout(function () {
                    i._player.trigger("info_hide"),
                        i._options.autoPlayDelay = 0,
                    e && e()
                }, 1e3 * this._options.autoPlayDelay),
                    this._player.on("play", function () {
                        a(i)
                    }),
                    this._player.on("pause", function () {
                        a(i)
                    })
            }
        },
            o.prototype.dispose = function () {
                a(this),
                    this._player = null
            };
        var a = function (e) {
            e._timeHandler && (clearTimeout(e._timeHandler), e._timeHandler = null)
        };
        t.exports = o
    },
        {
            "../lang/index": 17,
            "../lib/oo": 32
        }],
    14: [function (e, t, i) {
        t.exports = t.exports = {
            OD: "OD",
            FD: "360p",
            LD: "540p",
            SD: "720p",
            HD: "1080p",
            "2K": "2K",
            "4K": "4K",
            FHD: "FHD",
            XLD: "XLD",
            Speed: "Speed",
            Speed_05X_Text: "0.5X",
            Speed_1X_Text: "Normal",
            Speed_125X_Text: "1.25X",
            Speed_15X_Text: "1.5X",
            Speed_2X_Text: "2X",
            Refresh_Text: "Refresh",
            Cancel: "Cancel",
            Mute: "Mute",
            Snapshot: "Snapshot",
            Detection_Text: "Diagnosis",
            Play_DateTime: "Time",
            Quality_Change_Fail_Switch_Text: "Cannot play, switch to ",
            Quality_Change_Text: "Switch to ",
            Quality_The_Url: "The url",
            AutoPlayDelayDisplayText: "Play in $$ seconds",
            Error_Load_Abort_Text: "Data abort erro",
            Error_Network_Text: "Loading failed due to network error",
            Error_Decode_Text: "Decode error",
            Error_Server_Network_NotSupport_Text: "Network error or  the format of video is unsupported",
            Error_Offline_Text: "The network is unreachable, please click Refresh",
            Error_Play_Text: "Error occured while playing",
            Error_Retry_Text: " Please close or refresh",
            Error_AuthKey_Text: "Authentication expired or the domain is not in white list",
            Error_H5_Not_Support_Text: "The format of video is not supported by h5 player，please use flash player",
            Error_Not_Support_M3U8_Text: "The format of m3u8 is not supported by this explorer",
            Error_Not_Support_MP4_Text: "The format of mp4 is not supported by this explorer",
            Error_Not_Support_encrypt_Text: "The encrypted video is not supported by h5 player,please set useFlashPrism to true",
            Error_Vod_URL_Is_Empty_Text: "The url is empty",
            Error_Vod_Fetch_Urls_Text: "Error occured when fetch urls，please close or refresh",
            Fetch_Playauth_Error: "Error occured when fetch playauth close or refresh",
            Error_Playauth_Decode_Text: "PlayAuth parse failed",
            Error_Vid_Not_Same_Text: "Cannot renew url due to vid changed",
            Error_Playauth_Expired_Text: "Playauth expired, please close or refresh",
            Error_MTS_Fetch_Urls_Text: "Error occurred while requesting mst server",
            Error_Load_M3U8_Failed_Text: "The m3u8 file loaded failed",
            Error_Load_M3U8_Timeout_Text: "Timeout error occored when the m3u8 file loaded",
            Error_M3U8_Decode_Text: "The m3u8 file decoded failed",
            Error_TX_Decode_Text: "Video decoded failed",
            Error_Waiting_Timeout_Text: "Buffering timeout, please close or refresh",
            Error_Invalidate_Source: "Invalid source",
            Error_Fetch_NotStream: "The vid has no stream to play",
            Error_Not_Found: "Url is not found",
            Live_End: "Live has finished",
            Play_Before_Fullscreen: "Please play before fullscreen",
            Can_Not_Seekable: "Can not seek to this position",
            Cancel_Text: "Cancel",
            OK_Text: "OK",
            Auto_Stream_Tip_Text: "Internet is slow, does switch to $$",
            Request_Block_Text: "This request is blocked, the video Url should be over https",
            Open_Html_By_File: "Html page should be on the server",
            Maybe_Cors_Error: "please make sure enable cors,<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>refer to document</a>",
            Speed_Switch_To: "Speed switch to ",
            Curent_Volume: "Current volume:",
            Volume_Mute: "set to mute",
            Volume_UnMute: "set to unmute",
            ShiftLiveTime_Error: "Live start time should not be greater than over time",
            Error_Not_Support_Format_On_Mobile: "flv、rmtp can't be supported on mobile，please use m3u8",
            SessionId_Ticket_Invalid: "please assign value for sessionId and ticket properties",
            Http_Error: " An HTTP network request failed with an error, but not from the server.",
            Http_Timeout: "A network request timed out",
            DRM_License_Expired: "DRM license is expired, please refresh",
            Not_Support_DRM: "Browser doesn't support DRM",
            CC_Switch_To: "Subtitle switch to ",
            AudioTrack_Switch_To: "Audio tracks switch to ",
            Subtitle: "Subtitle/CC",
            AudioTrack: "Audio Track",
            Quality: "Quality",
            Auto: "Auto",
            Quality_Switch_To: "Quality switch to ",
            Fullscreen: "Full Screen",
            Setting: "Settings",
            Volume: "Volume",
            Play: "Play",
            Pause: "Pause",
            CloseSubtitle: "Close CC",
            OpenSubtitle: "Open CC",
            ExistFullScreen: "Exit Full Screen",
            Muted: "Muted",
            Retry: "Retry",
            SwitchToLive: "Return to live"
        }
    },
        {}],
    15: [function (e, t, i) {
        t.exports = t.exports = {
            OD: "OD",
            LD: "360p",
            FD: "540p",
            SD: "720p",
            HD: "1080p",
            "2K": "2K",
            "4K": "4K",
            FHD: "FHD",
            XLD: "XLD",
            Forbidden_Text: "Internal information is strictly forbidden to outsider",
            Refresh: "Refresh",
            Diagnosis: "Diagnosis",
            Live_Finished: "Live has finished, thanks for watching",
            Play: "Play",
            Pause: "Pause",
            Snapshot: "Snapshot",
            Replay: "Replay",
            Live: "Live",
            Encrypt: "Encrypt",
            Sound: "Sound",
            Fullscreen: "Full Screen",
            Exist_Fullscreen: "Exit Full-screen",
            Resolution: "Resolution",
            Next: "Next Video",
            Brightness: "Brightness",
            Default: "Default",
            Contrast: "Contrast",
            Titles_Credits: "Titles and Credits",
            Skip_Titles: "Skip Titles",
            Skip_Credits: "Skip Credits",
            Not_Support_Out_Site: "The video is not supported for outside website, please watch it by TaoTV",
            Watch_Now: "Watch now",
            Network_Error: "Network is unreachable, please try to refresh",
            Video_Error: "Playing a video error, please try to refresh",
            Decode_Error: "Data decoding error",
            Live_Not_Start: "Live has not started, to be expected",
            Live_Loading: "Live information is loading, please try to refresh",
            Fetch_Playauth_Error: "Error occured when fetch playauth close or refresh",
            Live_End: "Live has finished",
            Live_Abrot: "Signal aborted, please try to refresh",
            Corss_Domain_Error: "Please ensure your domain has obtained IPC license and combined CNAME, \r\n or to set  cross-domain accessing available",
            Url_Timeout_Error: "The video url is timeout, please try to refresh",
            Connetction_Error: "Sorry，the video cannot play because of connection error, please try to watch other videos",
            Fetch_MTS_Error: "Fetching video list failed, please ensure",
            Token_Expired_Error: "Requesting open api failed, please ensure token expired or not",
            Video_Lists_Empty_Error: "The video list is empty, please check the format of video",
            Encrypted_Failed_Error: "Fetching encrypted file failed, please check the permission of player",
            Fetch_Failed_Permission_Error: "Fetching video list failed, please check the permission of player",
            Invalidate_Param_Error: "No video url, please check the parameters",
            AutoPlayDelayDisplayText: "Play in $$ seconds",
            Fetch_MTS_NOT_NotStream_Error: "The vid has no stream to play",
            Cancel_Text: "Cancel",
            OK_Text: "OK",
            Auto_Stream_Tip_Text: "Internet is slow, does switch to $$",
            Open_Html_By_File: "Html page should be on the server",
            Cant_Use_Flash_On_Mobile: "Mobile doesn't support flash player，please use h5 player"
        }
    },
        {}],
    16: [function (e, t, i) {
        t.exports = t.exports = {
            OD: "原画",
            FD: "流畅",
            LD: "标清",
            SD: "高清",
            HD: "超清",
            "2K": "2K",
            "4K": "4K",
            FHD: "全高清",
            XLD: "极速",
            Forbidden_Text: "内部信息，严禁外传",
            Refresh: "刷新",
            Diagnosis: "诊断",
            Live_Finished: "直播已结束,谢谢观看",
            Play: "播放",
            Pause: "暂停",
            Snapshot: "截图",
            Replay: "重播",
            Live: "直播",
            Encrypt: "加密",
            Sound: "声音",
            Fullscreen: "全屏",
            Exist_Fullscreen: "退出全屏",
            Resolution: "清晰度",
            Next: "下一集",
            Brightness: "亮度",
            Default: "默认",
            Contrast: "对比度",
            Titles_Credits: "片头片尾",
            Skip_Titles: "跳过片头",
            Skip_Credits: "跳过片尾",
            Not_Support_Out_Site: "该视频暂不支持站外播放，请到淘TV观看",
            Watch_Now: "立即观看",
            Network_Error: "网络无法连接，请尝试检查网络后刷新试试",
            Video_Error: "视频播放异常，请刷新试试",
            Decode_Error: "播放数据解码错误",
            Live_Not_Start: "亲，直播还未开始哦，敬请期待",
            Live_Loading: "直播信息加载中，请刷新试试",
            Live_End: "亲，直播已结束",
            Live_Abrot: "当前直播信号中断，请刷新后重试",
            Corss_Domain_Error: "请确认您的域名已完成备案和CNAME绑定，\r\n并处于启用状态，或资源允许跨越访问",
            Url_Timeout_Error: "您所观看的视频地址连接超时，请刷新后重试",
            Connetction_Error: "抱歉,该视频由于连接错误暂时不能播放,请观看其它视频",
            Fetch_MTS_Error: "获取视频列表失败，请确认",
            Token_Expired_Error: "请求接口失败，请确认Token是否过期",
            Video_Lists_Empty_Error: "获取视频列表为空，请确认播放数据与格式",
            Encrypted_Failed_Error: "获取视频加密秘钥错误，请确认播放权限",
            Fetch_Failed_Permission_Error: "获取视频列表失败，请确认播放权限",
            Invalidate_Param_Error: "无输入视频，请确认输入参数",
            AutoPlayDelayDisplayText: "$$秒以后开始播放",
            Fetch_MTS_NOT_NotStream_Error: "此vid没有可播放视频",
            Cancel_Text: "取消",
            OK_Text: "确认",
            Auto_Stream_Tip_Text: "网络不给力，是否切换到$$",
            Fetch_Playauth_Error: "获取播放凭证出错啦，请尝试退出重试或刷新",
            Open_Html_By_File: "不能直接在浏览器打开html文件，请部署到服务端",
            Cant_Use_Flash_On_Mobile: "移动端不支持Flash播放器，请使用h5播放器"
        }
    },
        {}],
    17: [function (o, e, t) {
        var i = o("../config"),
            a = o("../lib/storage"),
            n = (o("../lib/io"), "aliplayer_lang"),
            s = function () {
                if (void 0 === window[n] || !window[n]) {
                    var e = (navigator.language || navigator.browserLanguage).toLowerCase();
                    e = e && -1 < e.indexOf("zh") ? "zh-cn" : "en-us",
                        window[n] = e
                }
                return window[n]
            },
            l = function (e, t) {
                var i = p(e),
                    r = "",
                    n = u();
                r = "flash" == e ? "en-us" == n ? o("./flash/en-us") : "zh-cn" == n ? o("./flash/zh-cn") : t[n] : "en-us" == n ? o("./en-us") : "zh-cn" == n ? o("./zh-cn") : t[n],
                    a.set(i, JSON.stringify(r)),
                    c(e, r)
            },
            c = function (e, t) {
                var i = p(e);
                window[i] = t
            },
            u = function () {
                return s()
            },
            p = function (e) {
                var t = u();
                return e || (e = "h5"),
                "aliplayer_lang_data_" + e + "_" + i.h5Version.replace(/\./g, "_") + "_" + t
            };
        e.exports.setCurrentLanguage = function (e, t, i) {
            var r = window[n];
            if (void 0 !== e && e || (e = s()), "en-us" != e && "zh-cn" != e && (!i || i && !i[e])) throw new Error("There is not language resource for " + e + ", please specify the language resource by languageTexts property");
            window[n] = e,
                l(t, i),
            e != r && o("../lib/constants").updateByLanguage()
        },
            e.exports.getCurrentLanguage = s,
            e.exports.getLanguageData = function (e, t) {
                var i = p(e);
                return window[i]
            },
            e.exports.load = l,
            e.exports.get = function (e, t) {
                t || (t = "h5");
                var i = p(t),
                    r = window[i];
                if (r) return r[e]
            }
    },
        {
            "../config": 11,
            "../lib/constants": 20,
            "../lib/io": 29,
            "../lib/storage": 36,
            "./en-us": 14,
            "./flash/en-us": 15,
            "./flash/zh-cn": 16,
            "./zh-cn": 18
        }],
    18: [function (e, t, i) {
        t.exports = t.exports = {
            OD: "原画",
            FD: "流畅",
            LD: "标清",
            SD: "高清",
            HD: "超清",
            "2K": "2K",
            "4K": "4K",
            FHD: "全高清",
            XLD: "极速",
            Speed: "倍速",
            Speed_05X_Text: "0.5X",
            Speed_1X_Text: "正常",
            Speed_125X_Text: "1.25X",
            Speed_15X_Text: "1.5X",
            Speed_2X_Text: "2X",
            Quality_Change_Fail_Switch_Text: "不能播放，切换为",
            Quality_Change_Text: "正在为您切换到 ",
            Quality_The_Url: "此地址",
            Refresh_Text: "刷新",
            Detection_Text: "诊断",
            Cancel: "取消",
            Mute: "静音",
            Snapshot: "截图",
            Play_DateTime: "播放时间",
            AutoPlayDelayDisplayText: "$$秒以后开始播放",
            Error_Load_Abort_Text: "获取数据过程被中止",
            Error_Network_Text: "网络错误加载数据失败",
            Error_Decode_Text: "解码错误",
            Error_Server_Network_NotSupport_Text: "服务器、网络错误或格式不支持",
            Error_Offline_Text: "网络不可用，请确定",
            Error_Play_Text: "播放出错啦",
            Error_Retry_Text: "请尝试退出重试或刷新",
            Error_AuthKey_Text: "可能鉴权过期、域名不在白名单或请求被拦截",
            Error_H5_Not_Support_Text: "h5不支持此格式，请使用flash播放器",
            Error_Not_Support_M3U8_Text: "浏览器不支持m3u8视频播放",
            Error_Not_Support_MP4_Text: "浏览器不支持mp4视频播放",
            Error_Not_Support_encrypt_Text: "h5不支持加密视频的播放，请设置useFlashPrism为true",
            Error_Vod_URL_Is_Empty_Text: "获取播放地址为空",
            Error_Vod_Fetch_Urls_Text: "获取地址出错啦，请尝试退出重试或刷新",
            Fetch_Playauth_Error: "获取播放凭证出错啦，请尝试退出重试或刷新",
            Error_Playauth_Decode_Text: "playauth解析错误",
            Error_Vid_Not_Same_Text: "不能更新地址，vid和播放中的不一致",
            Error_Playauth_Expired_Text: "凭证已过期，请尝试退出重试或刷新",
            Error_MTS_Fetch_Urls_Text: "MTS获取取数失败",
            Error_Load_M3U8_Failed_Text: "获取m3u8文件失败",
            Error_Load_M3U8_Timeout_Text: "获取m3u8文件超时",
            Error_M3U8_Decode_Text: "获取m3u8文件解析失败",
            Error_TX_Decode_Text: "解析数据出错",
            Error_Waiting_Timeout_Text: "缓冲数据超时，请尝试退出重试或刷新",
            Error_Invalidate_Source: "无效地址",
            Error_Fetch_NotStream: "此vid没有可播放视频",
            Error_Not_Found: "播放地址不存在",
            Live_End: "亲，直播已结束",
            Play_Before_Fullscreen: "播放后再全屏",
            Can_Not_Seekable: "不能seek到这里",
            Cancel_Text: "取消",
            OK_Text: "确认",
            Auto_Stream_Tip_Text: "网络不给力，是否切换到$$",
            Request_Block_Text: "浏览器安全策略视频地址不能为http协议，与网站https协议不一致",
            Open_Html_By_File: "不能直接在浏览器打开html文件，请部署到服务端",
            Maybe_Cors_Error: "请确认是否开启了允许跨域访问<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>参考文档</a>",
            Speed_Switch_To: "倍速切换到 ",
            Curent_Volume: "当前音量：",
            Volume_Mute: "设置为静音",
            Volume_UnMute: "设置为非静音",
            ShiftLiveTime_Error: "直播开始时间不能大于直播结束时间",
            Error_Not_Support_Format_On_Mobile: "移动端不支持flv、rmtp视频，请使用m3u8",
            SessionId_Ticket_Invalid: "DRM视频播放，sessionId和ticket属性不能为空",
            Http_Error: "Http网络请求失败",
            Http_Timeout: "http请求超时",
            DRM_License_Expired: "DRM license超时，请刷新",
            Not_Support_DRM: "浏览器不支持DRM视频的播放",
            CC_Switch_To: "字幕切换到 ",
            AudioTrack_Switch_To: "音轨切换到 ",
            Subtitle: "字幕",
            AudioTrack: "音轨",
            Quality: "清晰度",
            Auto: "自动",
            Quality_Switch_To: "清晰度切换到 ",
            Fullscreen: "全屏",
            Setting: "设置",
            Volume: "音量",
            Play: "播放",
            Pause: "暂停",
            CloseSubtitle: "关闭字幕",
            OpenSubtitle: "打开字幕",
            ExistFullScreen: "退出全屏",
            Muted: "静音",
            Retry: "重试",
            SwitchToLive: "返回直播"
        }
    },
        {}],
    19: [function (e, t, i) {
        var r = e("./oo"),
            n = e("../player/base/event/eventtype");
        t.exports.stopPropagation = function (e) {
            window.event ? window.event.cancelBubble = !0 : e.stopPropagation()
        },
            t.exports.register = function (e) {
                e.util = {
                    stopPropagation: t.exports.stopPropagation
                },
                    e.Component = r.extend,
                    e.EventType = n.Player
            }
    },
        {
            "../player/base/event/eventtype": 47,
            "./oo": 32
        }],
    20: [function (e, t, i) {
        var r = e("../lang/index");
        t.exports.LOAD_START = "loadstart",
            t.exports.LOADED_METADATA = "loadedmetadata",
            t.exports.LOADED_DATA = "loadeddata",
            t.exports.PROGRESS = "progress",
            t.exports.CAN_PLAY = "canplay",
            t.exports.CAN_PLYA_THROUGH = "canplaythrough",
            t.exports.PLAY = "play",
            t.exports.PAUSE = "pause",
            t.exports.ENDED = "ended",
            t.exports.PLAYING = "playing",
            t.exports.WAITING = "waiting",
            t.exports.ERROR = "error",
            t.exports.SUSPEND = "suspend",
            t.exports.STALLED = "stalled",
            t.exports.AuthKeyExpiredEvent = "authkeyexpired",
            t.exports.DRMKeySystem = {
                4: "com.microsoft.playready",
                5: "com.widevine.alpha"
            },
            t.exports.EncryptionType = {
                Private: 1,
                Standard: 2,
                ChinaDRM: 3,
                PlayReady: 4,
                Widevine: 5
            },
            t.exports.DRMType = {
                Widevine: "Widevine",
                PlayReady: "PlayReady"
            },
            t.exports.ErrorCode = {
                InvalidParameter: 4001,
                AuthKeyExpired: 4002,
                InvalidSourceURL: 4003,
                NotFoundSourceURL: 4004,
                StartLoadData: 4005,
                LoadedMetadata: 4006,
                PlayingError: 4007,
                LoadingTimeout: 4008,
                RequestDataError: 4009,
                EncrptyVideoNotSupport: 4010,
                FormatNotSupport: 4011,
                PlayauthDecode: 4012,
                PlayDataDecode: 4013,
                NetworkUnavaiable: 4014,
                UserAbort: 4015,
                NetworkError: 4016,
                URLsIsEmpty: 4017,
                CrossDomain: 4027,
                OtherError: 4400,
                ServerAPIError: 4500
            },
            t.exports.AuthKeyExpired = 7200,
            t.exports.AuthKeyRefreshExpired = 7e3,
            t.exports.AuthInfoExpired = 100,
            t.exports.VideoErrorCode = {
                1: 4015,
                2: 4016,
                3: 4013,
                4: 4400
            },
            t.exports.IconType = {
                FontClass: "fontclass",
                Symbol: "symbol",
                Sprite: "Sprite"
            },
            t.exports.SelectedStreamLevel = "selectedStreamLevel",
            t.exports.WidthMapToLevel = {
                0: "OD",
                640: "FD",
                960: "LD",
                1280: "SD",
                1920: "HD",
                2580: "2K",
                3840: "4K"
            };
        var n = function () {
            t.exports.VideoErrorCodeText = {
                1: r.get("Error_Load_Abort_Text"),
                2: r.get("Error_Network_Text"),
                3: r.get("Error_Decode_Text"),
                4: r.get("Error_Server_Network_NotSupport_Text")
            },
                t.exports.VideoLevels = {
                    0: r.get("OD"),
                    640: r.get("FD"),
                    960: r.get("LD"),
                    1280: r.get("SD"),
                    1920: r.get("HD"),
                    2580: r.get("2K"),
                    3840: r.get("4K")
                },
                t.exports.QualityLevels = {
                    OD: r.get("OD"),
                    LD: r.get("LD"),
                    FD: r.get("FD"),
                    SD: r.get("SD"),
                    HD: r.get("HD"),
                    "2K": r.get("2K"),
                    "4K": r.get("4K"),
                    XLD: r.get("XLD"),
                    FHD: r.get("FHD")
                },
                t.exports.SpeedLevels = [{
                    key: .5,
                    text: r.get("Speed_05X_Text")
                },
                    {
                        key: 1,
                        text: r.get("Speed_1X_Text")
                    },
                    {
                        key: 1.25,
                        text: r.get("Speed_125X_Text")
                    },
                    {
                        key: 1.5,
                        text: r.get("Speed_15X_Text")
                    },
                    {
                        key: 2,
                        text: r.get("Speed_2X_Text")
                    }]
        };
        n(),
            t.exports.updateByLanguage = n
    },
        {
            "../lang/index": 17
        }],
    21: [function (e, t, i) {
        t.exports.get = function (e) {
            for (var t = e + "", i = document.cookie.split(";"), r = 0; r < i.length; r++) {
                var n = i[r].trim();
                if (0 == n.indexOf(t)) return unescape(n.substring(t.length + 1, n.length))
            }
            return ""
        },
            t.exports.set = function (e, t, i) {
                var r = new Date;
                r.setTime(r.getTime() + 24 * i * 60 * 60 * 1e3);
                var n = "expires=" + r.toGMTString();
                document.cookie = e + "=" + escape(t) + "; " + n
            }
    },
        {}],
    22: [function (e, i, t) {
        var r = e("./object");
        i.exports.cache = {},
            i.exports.guid = function (e, t) {
                var i, r, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                    o = [];
                if (t = t || n.length, e) for (i = 0; i < e; i++) o[i] = n[0 | Math.random() * t];
                else for (o[8] = o[13] = o[18] = o[23] = "-", o[14] = "4", i = 0; i < 36; i++) o[i] || (r = 0 | 16 * Math.random(), o[i] = n[19 == i ? 3 & r | 8 : r]);
                return o.join("")
            },
            i.exports.expando = "vdata" + (new Date).getTime(),
            i.exports.getData = function (e) {
                var t = e[i.exports.expando];
                return t || (t = e[i.exports.expando] = i.exports.guid(), i.exports.cache[t] = {}),
                    i.exports.cache[t]
            },
            i.exports.hasData = function (e) {
                var t = e[i.exports.expando];
                return !(!t || r.isEmpty(i.exports.cache[t]))
            },
            i.exports.removeData = function (t) {
                var e = t[i.exports.expando];
                if (e) {
                    delete i.exports.cache[e];
                    try {
                        delete t[i.exports.expando]
                    } catch (e) {
                        t.removeAttribute ? t.removeAttribute(i.exports.expando) : t[i.exports.expando] = null
                    }
                }
            }
    },
        {
            "./object": 31
        }],
    23: [function (e, t, i) {
        var r = e("./object");
        t.exports.el = function (e) {
            return document.getElementById(e)
        },
            t.exports.createEl = function (e, t) {
                var i;
                return e = e || "div",
                    t = t || {},
                    i = document.createElement(e),
                    r.each(t, function (e, t) {
                        -1 !== e.indexOf("aria-") || "role" == e ? i.setAttribute(e, t) : i[e] = t
                    }),
                    i
            },
            t.exports.addClass = function (e, t) {
                -1 == (" " + e.className + " ").indexOf(" " + t + " ") && (e.className = "" === e.className ? t : e.className + " " + t)
            },
            t.exports.removeClass = function (e, t) {
                var i, r;
                if (-1 != e.className.indexOf(t)) {
                    for (r = (i = e.className.split(" ")).length - 1; 0 <= r; r--)
                        i[r] === t && i.splice(r, 1);
                    e.className = i.join(" ")
                }
            },
            t.exports.hasClass = function (e, t) {
                return -1 != e.className.indexOf(t)
            },
            t.exports.getClasses = function (e) {
                return e.className ? e.className.split(" ") : []
            },
            t.exports.getElementAttributes = function (e) {
                var t, i, r, n, o;
                if (t = {}, i = ",autoplay,controls,loop,muted,default,", e && e.attributes && 0 < e.attributes.length) for (var a = (r = e.attributes).length - 1; 0 <= a; a--) n = r[a].name,
                    o = r[a].value,
                "boolean" != typeof e[n] && -1 === i.indexOf("," + n + ",") || (o = null !== o),
                    t[n] = o;
                return t
            },
            t.exports.insertFirst = function (e, t) {
                t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e)
            },
            t.exports.blockTextSelection = function () {
                document.body.focus(),
                    document.onselectstart = function () {
                        return !1
                    }
            },
            t.exports.unblockTextSelection = function () {
                document.onselectstart = function () {
                    return !0
                }
            },
            t.exports.css = function (i, e, t) {
                return !(!i || !i.style) && (e && t ? (i.style[e] = t, !0) : t || "string" != typeof e ? !t && "object" == typeof e && (r.each(e, function (e, t) {
                    i.style[e] = t
                }), !0) : i.style[e])
            },
            t.exports.getTransformName = function (e) {
                var t, i, r = ["transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform"],
                    n = r[0];
                for (t = 0, i = r.length; t < i; t++)
                    if (void 0 !== e.style[r[t]]) {
                        n = r[t];
                        break
                    }
                return n
            },
            t.exports.getTransformEventName = function (e, t) {
                var i, r, n = ["", "Webkit", "Moz", "ms", "O"],
                    o = t.toLowerCase(),
                    a = ["transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform"];
                for (i = 0, r = a.length; i < r; i++)
                    if (void 0 !== e.style[a[i]]) {
                        0 != i && (o = n[i] + t);
                        break
                    }
                return o
            },
            t.exports.addCssByStyle = function (e) {
                var t = document,
                    i = t.createElement("style");
                if (i.setAttribute("type", "text/css"), i.styleSheet) i.styleSheet.cssText = e;
                else {
                    var r = t.createTextNode(e);
                    i.appendChild(r)
                }
                var n = t.getElementsByTagName("head");
                n.length ? n[0].appendChild(i) : t.documentElement.appendChild(i)
            }
    },
        {
            "./object": 31
        }],
    24: [function (e, l, t) {
        var c = e("./object"),
            u = e("./data"),
            i = e("./ua"),
            r = e("fastclick");

        function p(t, i, e, r) {
            c.each(e, function (e) {
                t(i, e, r)
            })
        }

        l.exports.on = function (o, e, t) {
            if (c.isArray(e)) return p(l.exports.on, o, e, t);
            i.IS_MOBILE && "click" == e && r(o);
            var a = u.getData(o);
            a.handlers || (a.handlers = {}),
            a.handlers[e] || (a.handlers[e] = []),
            t.guid || (t.guid = u.guid()),
                a.handlers[e].push(t),
            a.dispatcher || (a.disabled = !1, a.dispatcher = function (e) {
                if (!a.disabled) {
                    e = l.exports.fixEvent(e);
                    var t = a.handlers[e.type];
                    if (t) for (var i = t.slice(0), r = 0, n = i.length; r < n && !e.isImmediatePropagationStopped(); r++) i[r].call(o, e)
                }
            }),
            1 == a.handlers[e].length && (o.addEventListener ? o.addEventListener(e, a.dispatcher, !1) : o.attachEvent && o.attachEvent("on" + e, a.dispatcher))
        },
            l.exports.off = function (t, e, i) {
                if (u.hasData(t)) {
                    var r = u.getData(t);
                    if (r.handlers) {
                        if (c.isArray(e)) return p(l.exports.off, t, e, i);
                        var n = function (e) {
                            r.handlers[e] = [],
                                l.exports.cleanUpEvents(t, e)
                        };
                        if (e) {
                            var o = r.handlers[e];
                            if (o) if (i) {
                                if (i.guid) for (var a = 0; a < o.length; a++) o[a].guid === i.guid && o.splice(a--, 1);
                                l.exports.cleanUpEvents(t, e)
                            } else n(e)
                        } else for (var s in r.handlers) n(s)
                    }
                }
            },
            l.exports.cleanUpEvents = function (e, t) {
                var i = u.getData(e);
                0 === i.handlers[t].length && (delete i.handlers[t], e.removeEventListener ? e.removeEventListener(t, i.dispatcher, !1) : e.detachEvent && e.detachEvent("on" + t, i.dispatcher)),
                c.isEmpty(i.handlers) && (delete i.handlers, delete i.dispatcher, delete i.disabled),
                c.isEmpty(i) && u.removeData(e)
            },
            l.exports.fixEvent = function (e) {
                function t() {
                    return !0
                }

                function i() {
                    return !1
                }

                if (!e || !e.isPropagationStopped) {
                    var r = e || window.event;
                    for (var n in e = {}, r) "layerX" !== n && "layerY" !== n && "keyboardEvent.keyLocation" !== n && ("returnValue" == n && r.preventDefault || (e[n] = r[n]));
                    if (e.target || (e.target = e.srcElement || document), e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement, e.preventDefault = function () {
                        r.preventDefault && r.preventDefault(),
                            e.returnValue = !1,
                            e.isDefaultPrevented = t,
                            e.defaultPrevented = !0
                    }, e.isDefaultPrevented = i, e.defaultPrevented = !1, e.stopPropagation = function () {
                        r.stopPropagation && r.stopPropagation(),
                            e.cancelBubble = !0,
                            e.isPropagationStopped = t
                    }, e.isPropagationStopped = i, e.stopImmediatePropagation = function () {
                        r.stopImmediatePropagation && r.stopImmediatePropagation(),
                            e.isImmediatePropagationStopped = t,
                            e.stopPropagation()
                    }, e.isImmediatePropagationStopped = i, null != e.clientX) {
                        var o = document.documentElement,
                            a = document.body;
                        e.pageX = e.clientX + (o && o.scrollLeft || a && a.scrollLeft || 0) - (o && o.clientLeft || a && a.clientLeft || 0),
                            e.pageY = e.clientY + (o && o.scrollTop || a && a.scrollTop || 0) - (o && o.clientTop || a && a.clientTop || 0)
                    }
                    e.which = e.charCode || e.keyCode,
                    null != e.button && (e.button = 1 & e.button ? 0 : 4 & e.button ? 1 : 2 & e.button ? 2 : 0)
                }
                return e
            },
            l.exports.trigger = function (e, t) {
                var i = u.hasData(e) ? u.getData(e) : {},
                    r = e.parentNode || e.ownerDocument;
                if ("string" == typeof t) {
                    var n = null;
                    (e.paramData || 0 == e.paramData) && (n = e.paramData, e.paramData = null, e.removeAttribute(n)),
                        t = {
                            type: t,
                            target: e,
                            paramData: n
                        }
                }
                if (t = l.exports.fixEvent(t), i.dispatcher && i.dispatcher.call(e, t), r && !t.isPropagationStopped() && !1 !== t.bubbles) l.exports.trigger(r, t);
                else if (!r && !t.defaultPrevented) {
                    var o = u.getData(t.target);
                    t.target[t.type] && (o.disabled = !0, "function" == typeof t.target[t.type] && t.target[t.type](), o.disabled = !1)
                }
                return !t.defaultPrevented
            },
            l.exports.one = function (e, t, i) {
                if (c.isArray(t)) return p(l.exports.one, e, t, i);
                var r = function () {
                    l.exports.off(e, t, r),
                        i.apply(this, arguments)
                };
                r.guid = i.guid = i.guid || u.guid(),
                    l.exports.on(e, t, r)
            }
    },
        {
            "./data": 22,
            "./object": 31,
            "./ua": 37,
            fastclick: 7
        }],
    25: [function (e, t, i) {
        var n = e("./data");
        t.exports.bind = function (e, t, i) {
            t.guid || (t.guid = n.guid());
            var r = function () {
                return t.apply(e, arguments)
            };
            return r.guid = i ? i + "_" + t.guid : t.guid,
                r
        }
    },
        {
            "./data": 22
        }],
    26: [function (e, t, i) {
        var r = /^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/\;?#]*)?(.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,
            u = /^([^\/;?#]*)(.*)$/,
            n = /(?:\/|^)\.(?=\/)/g,
            o = /(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,
            p = {
                buildAbsoluteURL: function (e, t, i) {
                    if (i = i || {}, e = e.trim(), !(t = t.trim())) {
                        if (!i.alwaysNormalize) return e;
                        var r = p.parseURL(e);
                        if (!r) throw new Error("Error trying to parse base URL.");
                        return r.path = p.normalizePath(r.path),
                            p.buildURLFromParts(r)
                    }
                    var n = p.parseURL(t);
                    if (!n) throw new Error("Error trying to parse relative URL.");
                    if (n.scheme) return i.alwaysNormalize ? (n.path = p.normalizePath(n.path), p.buildURLFromParts(n)) : t;
                    var o = p.parseURL(e);
                    if (!o) throw new Error("Error trying to parse base URL.");
                    if (!o.netLoc && o.path && "/" !== o.path[0]) {
                        var a = u.exec(o.path);
                        o.netLoc = a[1],
                            o.path = a[2]
                    }
                    o.netLoc && !o.path && (o.path = "/");
                    var s = {
                        scheme: o.scheme,
                        netLoc: n.netLoc,
                        path: null,
                        params: n.params,
                        query: n.query,
                        fragment: n.fragment
                    };
                    if (!n.netLoc && (s.netLoc = o.netLoc, "/" !== n.path[0])) if (n.path) {
                        var l = o.path,
                            c = l.substring(0, l.lastIndexOf("/") + 1) + n.path;
                        s.path = p.normalizePath(c)
                    } else s.path = o.path,
                    n.params || (s.params = o.params, n.query || (s.query = o.query));
                    return null === s.path && (s.path = i.alwaysNormalize ? p.normalizePath(n.path) : n.path),
                        p.buildURLFromParts(s)
                },
                parseURL: function (e) {
                    var t = r.exec(e);
                    return t ? {
                        scheme: t[1] || "",
                        netLoc: t[2] || "",
                        path: t[3] || "",
                        params: t[4] || "",
                        query: t[5] || "",
                        fragment: t[6] || ""
                    } : null
                },
                normalizePath: function (e) {
                    for (e = e.split("").reverse().join("").replace(n, ""); e.length !== (e = e.replace(o, "")).length;) ;
                    return e.split("").reverse().join("")
                },
                buildURLFromParts: function (e) {
                    return e.scheme + e.netLoc + e.path + e.params + e.query + e.fragment
                }
            };
        t.exports = p
    },
        {}],
    27: [function (e, t, i) {
        var r = /^(\d+)x(\d+)$/,
            n = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
            o = function (e) {
                for (var t in "string" == typeof e && (e = this.parseAttrList(e)), e)
                    e.hasOwnProperty(t) && (this[t] = e[t])
            };
        o.prototype = {
            decimalInteger: function (e) {
                var t = parseInt(this[e], 10);
                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
            },
            hexadecimalInteger: function (e) {
                if (this[e]) {
                    var t = (this[e] || "0x").slice(2);
                    t = (1 & t.length ? "0" : "") + t;
                    for (var i = new Uint8Array(t.length / 2), r = 0; r < t.length / 2; r++)
                        i[r] = parseInt(t.slice(2 * r, 2 * r + 2), 16);
                    return i
                }
                return null
            },
            hexadecimalIntegerAsNumber: function (e) {
                var t = parseInt(this[e], 16);
                return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
            },
            decimalFloatingPoint: function (e) {
                return parseFloat(this[e])
            },
            enumeratedString: function (e) {
                return this[e]
            },
            decimalResolution: function (e) {
                var t = r.exec(this[e]);
                if (null !== t) return {
                    width: parseInt(t[1], 10),
                    height: parseInt(t[2], 10)
                }
            },
            parseAttrList: function (e) {
                var t, i = {};
                for (n.lastIndex = 0; null !== (t = n.exec(e));) {
                    var r = t[2];
                    0 === r.indexOf('"') && r.lastIndexOf('"') === r.length - 1 && (r = r.slice(1, -1)),
                        i[t[1]] = r
                }
                return i
            }
        },
            t.exports = o
    },
        {}],
    28: [function (e, t, i) {
        var w = e("./attrlist"),
            r = e("../io"),
            n = e("./URLToolkit"),
            u = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
            c = /#EXT-X-MEDIA:(.*)/g,
            P = new RegExp([/#EXTINF:(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, /|(?!#)(\S+)/.source, /|#EXT-X-BYTERANGE:*(.+)/.source, /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, /|#.*/.source].join(""), "g"),
            C = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)(.*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/,
            k = function () {
                this.method = null,
                    this.key = null,
                    this.iv = null,
                    this._uri = null
            },
            I = function () {
                this._url = null,
                    this._byteRange = null,
                    this._decryptdata = null,
                    this.tagList = []
            };
        I.prototype.getUrl = function () {
            return !this._url && this.relurl && (this._url = n.buildAbsoluteURL(this.baseurl, this.relurl, {
                alwaysNormalize: !0
            })),
                this._url
        },
            I.prototype.Seturl = function (e) {
                this._url = e
            },
            I.prototype.getProgramDateTime = function () {
                return !this._programDateTime && this.rawProgramDateTime && (this._programDateTime = new Date(Date.parse(this.rawProgramDateTime))),
                    this._programDateTime
            },
            I.prototype.GetbyteRange = function () {
                if (!this._byteRange) {
                    var e = this._byteRange = [];
                    if (this.rawByteRange) {
                        var t = this.rawByteRange.split("@", 2);
                        if (1 === t.length) {
                            var i = this.lastByteRangeEndOffset;
                            e[0] = i || 0
                        } else e[0] = parseInt(t[1]);
                        e[1] = parseInt(t[0]) + e[0]
                    }
                }
                return this._byteRange
            },
            I.prototype.getByteRangeStartOffset = function () {
                return this.byteRange[0]
            },
            I.prototype.getByteRangeEndOffset = function () {
                return this.byteRange[1]
            };
        I.prototype.getDecryptdata = function () {
            return this._decryptdata || (this._decryptdata = this.fragmentDecryptdataFromLevelkey(this.levelkey, this.sn)),
                this._decryptdata
        };
        var o = function () {
            this.loaders = {}
        };
        o.prototype = {
            parseMasterPlaylist: function (e, t) {
                var i, r = [];
                for (u.lastIndex = 0; null != (i = u.exec(e));) {
                    var n = {},
                        o = n.attrs = new w(i[1]);
                    n.url = this.resolve(i[2], t);
                    var a = o.decimalResolution("RESOLUTION");
                    a && (n.width = a.width, n.height = a.height),
                        n.bitrate = o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"),
                        n.name = o.NAME;
                    var s = o.CODECS;
                    if (s) {
                        s = s.split(/[ ,]+/);
                        for (var l = 0; l < s.length; l++) {
                            var c = s[l];
                            -1 !== c.indexOf("avc1") ? n.videoCodec = this.avc1toavcoti(c) : -1 !== c.indexOf("hvc1") ? n.videoCodec = c : n.audioCodec = c
                        }
                    }
                    r.push(n)
                }
                return r
            },
            parseMasterPlaylistMedia: function (e, t, i, r) {
                var n, o = [],
                    a = 0;
                for (c.lastIndex = 0; null != (n = c.exec(e));) {
                    var s = {},
                        l = new w(n[1]);
                    l.TYPE === i && (s.groupId = l["GROUP-ID"], s.name = l.NAME, s.type = i, s["default"] = "YES" === l.DEFAULT, s.autoselect = "YES" === l.AUTOSELECT, s.forced = "YES" === l.FORCED, l.URI && (s.url = this.resolve(l.URI, t)), s.lang = l.LANGUAGE, s.name || (s.name = s.lang), r && (s.audioCodec = r), s.id = a++, o.push(s))
                }
                return o
            },
            avc1toavcoti: function (e) {
                var t, i = e.split(".");
                return 2 < i.length ? (t = i.shift() + ".", t += parseInt(i.shift()).toString(16), t += ("000" + parseInt(i.shift()).toString(16)).substr(-4)) : t = e,
                    t
            },
            parseLevelPlaylist: function (e, t, i, r) {
                var n, o, a = 0,
                    s = 0,
                    l = {
                        type: null,
                        version: null,
                        url: t,
                        fragments: [],
                        live: !0,
                        startSN: 0
                    },
                    c = new k,
                    u = 0,
                    p = null,
                    d = new I;
                for (P.lastIndex = 0; null !== (n = P.exec(e));) {
                    var h = n[1];
                    if (h) {
                        d.duration = parseFloat(h);
                        var f = (" " + n[2]).slice(1);
                        d.title = f || null,
                            d.tagList.push(f ? ["INF", h, f] : ["INF", h])
                    } else if (n[3]) {
                        if (!isNaN(d.duration)) {
                            var v = a++;
                            d.type = r,
                                d.start = s,
                                d.levelkey = c,
                                d.sn = v,
                                d.level = i,
                                d.cc = u,
                                d.baseurl = t,
                                d.relurl = (" " + n[3]).slice(1),
                                l.fragments.push(d),
                                s += (p = d).duration,
                                d = new I
                        }
                    } else if (n[4]) {
                        if (d.rawByteRange = (" " + n[4]).slice(1), p) {
                            var y = p.byteRangeEndOffset;
                            y && (d.lastByteRangeEndOffset = y)
                        }
                    } else if (n[5]) d.rawProgramDateTime = (" " + n[5]).slice(1),
                        d.tagList.push(["PROGRAM-DATE-TIME", d.rawProgramDateTime]),
                    void 0 === l.programDateTime && (l.programDateTime = new Date(new Date(Date.parse(n[5])) - 1e3 * s));
                    else {
                        for (n = n[0].match(C), o = 1; o < n.length && void 0 === n[o]; o++) ;
                        var g = (" " + n[o + 1]).slice(1),
                            _ = (" " + n[o + 2]).slice(1);
                        switch (n[o]) {
                            case "#":
                                d.tagList.push(_ ? [g, _] : [g]);
                                break;
                            case "PLAYLIST-TYPE":
                                l.type = g.toUpperCase();
                                break;
                            case "MEDIA-SEQUENCE":
                                a = l.startSN = parseInt(g);
                                break;
                            case "TARGETDURATION":
                                l.targetduration = parseFloat(g);
                                break;
                            case "VERSION":
                                l.version = parseInt(g);
                                break;
                            case "EXTM3U":
                                break;
                            case "ENDLIST":
                                l.live = !1;
                                break;
                            case "DIS":
                                u++,
                                    d.tagList.push(["DIS"]);
                                break;
                            case "DISCONTINUITY-SEQ":
                                u = parseInt(g);
                                break;
                            case "KEY":
                                var m = new w(g),
                                    S = m.enumeratedString("METHOD"),
                                    b = m.URI,
                                    T = m.hexadecimalInteger("IV");
                                S && (c = new k, b && 0 <= ["AES-128", "SAMPLE-AES"].indexOf(S) && (c.method = S, c.baseuri = t, c.reluri = b, c.key = null, c.iv = T));
                                break;
                            case "START":
                                var x = new w(g).decimalFloatingPoint("TIME-OFFSET");
                                isNaN(x) || (l.startTimeOffset = x);
                                break;
                            case "MAP":
                                var E = new w(g);
                                d.relurl = E.URI,
                                    d.rawByteRange = E.BYTERANGE,
                                    d.baseurl = t,
                                    d.level = i,
                                    d.type = r,
                                    d.sn = "initSegment",
                                    l.initSegment = d,
                                    d = new I;
                                break;
                            default:
                                console.log("line parsed but not handled: result")
                        }
                    }
                }
                return (d = p) && !d.relurl && (l.fragments.pop(), s -= d.duration),
                    l.totalduration = s,
                    l.averagetargetduration = s / l.fragments.length,
                    l.endSN = a - 1,
                    l
            },
            load: function (o, a) {
                var s = this;
                r.get(o, function (e) {
                    var t = s.parseMasterPlaylist(e, o);
                    if (t.length) {
                        var i = s.parseMasterPlaylistMedia(e, o, "AUDIO", t[0].audioCodec),
                            r = s.parseMasterPlaylistMedia(e, o, "SUBTITLES");
                        if (i.length) {
                            var n = !1;
                            i.forEach(function (e) {
                                e.url || (n = !0)
                            }),
                            !1 === n && t[0].audioCodec && !t[0].attrs.AUDIO && (console.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"), i.unshift({
                                type: "main",
                                name: "main"
                            }))
                        }
                    }
                    a({
                        levels: t,
                        audioTracks: i,
                        subtitles: r,
                        url: o
                    })
                }, function (e) {
                    console.log(e)
                })
            },
            resolve: function (e, t) {
                return n.buildAbsoluteURL(t, e, {
                    alwaysNormalize: !0
                })
            },
            parseMasterPlaylist: function (e, t) {
                var i, r = [];
                for (u.lastIndex = 0; null != (i = u.exec(e));) {
                    var n = {},
                        o = n.attrs = new w(i[1]);
                    n.url = this.resolve(i[2], t);
                    var a = o.decimalResolution("RESOLUTION");
                    a && (n.width = a.width, n.height = a.height),
                        n.bitrate = o.decimalInteger("AVERAGE-BANDWIDTH") || o.decimalInteger("BANDWIDTH"),
                        n.name = o.NAME;
                    var s = o.CODECS;
                    if (s) {
                        s = s.split(/[ ,]+/);
                        for (var l = 0; l < s.length; l++) {
                            var c = s[l];
                            -1 !== c.indexOf("avc1") ? n.videoCodec = this.avc1toavcoti(c) : -1 !== c.indexOf("hvc1") ? n.videoCodec = c : n.audioCodec = c
                        }
                    }
                    r.push(n)
                }
                return r
            },
            parseMasterPlaylistMedia: function (e, t, i, r) {
                var n, o = [],
                    a = 0;
                for (c.lastIndex = 0; null != (n = c.exec(e));) {
                    var s = {},
                        l = new w(n[1]);
                    l.TYPE === i && (s.groupId = l["GROUP-ID"], s.name = l.NAME, s.type = i, s["default"] = "YES" === l.DEFAULT, s.autoselect = "YES" === l.AUTOSELECT, s.forced = "YES" === l.FORCED, l.URI && (s.url = this.resolve(l.URI, t)), s.lang = l.LANGUAGE, s.name || (s.name = s.lang), r && (s.audioCodec = r), s.id = a++, o.push(s))
                }
                return o
            },
            avc1toavcoti: function (e) {
                var t, i = e.split(".");
                return 2 < i.length ? (t = i.shift() + ".", t += parseInt(i.shift()).toString(16), t += ("000" + parseInt(i.shift()).toString(16)).substr(-4)) : t = e,
                    t
            },
            parseLevelPlaylist: function (e, t, i, r) {
                var n, o, a = 0,
                    s = 0,
                    l = {
                        type: null,
                        version: null,
                        url: t,
                        fragments: [],
                        live: !0,
                        startSN: 0
                    },
                    c = new k,
                    u = 0,
                    p = null,
                    d = new I;
                for (P.lastIndex = 0; null !== (n = P.exec(e));) {
                    var h = n[1];
                    if (h) {
                        d.duration = parseFloat(h);
                        var f = (" " + n[2]).slice(1);
                        d.title = f || null,
                            d.tagList.push(f ? ["INF", h, f] : ["INF", h])
                    } else if (n[3]) {
                        if (!isNaN(d.duration)) {
                            var v = a++;
                            d.type = r,
                                d.start = s,
                                d.levelkey = c,
                                d.sn = v,
                                d.level = i,
                                d.cc = u,
                                d.baseurl = t,
                                d.relurl = (" " + n[3]).slice(1),
                                l.fragments.push(d),
                                s += (p = d).duration,
                                d = new I
                        }
                    } else if (n[4]) {
                        if (d.rawByteRange = (" " + n[4]).slice(1), p) {
                            var y = p.byteRangeEndOffset;
                            y && (d.lastByteRangeEndOffset = y)
                        }
                    } else if (n[5]) d.rawProgramDateTime = (" " + n[5]).slice(1),
                        d.tagList.push(["PROGRAM-DATE-TIME", d.rawProgramDateTime]),
                    void 0 === l.programDateTime && (l.programDateTime = new Date(new Date(Date.parse(n[5])) - 1e3 * s));
                    else {
                        for (n = n[0].match(C), o = 1; o < n.length && void 0 === n[o]; o++) ;
                        var g = (" " + n[o + 1]).slice(1),
                            _ = (" " + n[o + 2]).slice(1);
                        switch (n[o]) {
                            case "#":
                                d.tagList.push(_ ? [g, _] : [g]);
                                break;
                            case "PLAYLIST-TYPE":
                                l.type = g.toUpperCase();
                                break;
                            case "MEDIA-SEQUENCE":
                                a = l.startSN = parseInt(g);
                                break;
                            case "TARGETDURATION":
                                l.targetduration = parseFloat(g);
                                break;
                            case "VERSION":
                                l.version = parseInt(g);
                                break;
                            case "EXTM3U":
                                break;
                            case "ENDLIST":
                                l.live = !1;
                                break;
                            case "DIS":
                                u++,
                                    d.tagList.push(["DIS"]);
                                break;
                            case "DISCONTINUITY-SEQ":
                                u = parseInt(g);
                                break;
                            case "KEY":
                                var m = new w(g),
                                    S = m.enumeratedString("METHOD"),
                                    b = m.URI,
                                    T = m.hexadecimalInteger("IV");
                                S && (c = new k, b && 0 <= ["AES-128", "SAMPLE-AES"].indexOf(S) && (c.method = S, c.baseuri = t, c.reluri = b, c.key = null, c.iv = T));
                                break;
                            case "START":
                                var x = new w(g).decimalFloatingPoint("TIME-OFFSET");
                                isNaN(x) || (l.startTimeOffset = x);
                                break;
                            case "MAP":
                                var E = new w(g);
                                d.relurl = E.URI,
                                    d.rawByteRange = E.BYTERANGE,
                                    d.baseurl = t,
                                    d.level = i,
                                    d.type = r,
                                    d.sn = "initSegment",
                                    l.initSegment = d,
                                    d = new I;
                                break;
                            default:
                                console.log("line parsed but not handled: " + n)
                        }
                    }
                }
                return (d = p) && !d.relurl && (l.fragments.pop(), s -= d.duration),
                    l.totalduration = s,
                    l.averagetargetduration = s / l.fragments.length,
                    l.endSN = a - 1,
                    l
            }
        },
            t.exports = o
    },
        {
            "../io": 29,
            "./URLToolkit": 26,
            "./attrlist": 27
        }],
    29: [function (e, s, t) {
        var h = e("./url");
        s.exports.get = function (e, t, i, r, n) {
            s.exports.ajax("GET", e, {}, t, i, r, n)
        },
            s.exports.post = function (e, t, i, r, n, o) {
                var a = {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                };
                s.exports.ajax("POST", e, t, i, r, n, o, a)
            },
            s.exports.ajax = function (e, t, i, r, n, o, a, s) {
                var l, c, u, p;
                n = n ||
                    function () {
                    },
                "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function () {
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
                    } catch (e) {
                    }
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch (e) {
                    }
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP")
                    } catch (e) {
                    }
                    throw new Error("This browser does not support XMLHttpRequest.")
                }),
                    c = new XMLHttpRequest,
                    u = h.parseUrl(t),
                    p = window.location,
                    !(u.protocol + u.host !== p.protocol + p.host) || !window.XDomainRequest || "withCredentials" in c ? (l = "file:" == u.protocol || "file:" == p.protocol, c.onreadystatechange = function () {
                        4 === c.readyState && (200 === c.status || l && 0 === c.status ? r(c.responseText) : n(c.responseText))
                    }) : ((c = new window.XDomainRequest).onload = function () {
                        r(c.responseText)
                    }, c.onerror = n, c.onprogress = function () {
                    }, c.ontimeout = n);
                try {
                    if (void 0 === o && (o = !0), c.open(e, t, o), a && (c.withCredentials = !0), s) for (var d in s) c.setRequestHeader(d, s[d])
                } catch (e) {
                    return void n(e)
                }
                try {
                    c.send(i)
                } catch (e) {
                    n(e)
                }
            },
            s.exports.jsonp = function (e, t, i) {
                var r = "jsonp_callback_" + Math.round(1e5 * Math.random()),
                    n = document.createElement("script");
                e && (n.src = e + (0 <= e.indexOf("?") ? "&" : "?") + "callback=" + r + "&cb=" + r, n.onerror = function () {
                    delete window[r],
                        document.body.removeChild(n),
                        i()
                }, n.onload = function () {
                    setTimeout(function () {
                        window[r] && (delete window[r], document.body.removeChild(n))
                    }, 0)
                }, window[r] = function (e) {
                    delete window[r],
                        document.body.removeChild(n),
                        t(e)
                }, document.body.appendChild(n))
            },
            s.exports.loadJS = function (e, t) {
                var i = document.getElementsByTagName("HEAD").item(0),
                    r = document.createElement("script");
                r.type = "text/javascript",
                    r.src = e,
                    r.onload = function () {
                        t && t()
                    },
                    i.appendChild(r)
            }
    },
        {
            "./url": 38
        }],
    30: [function (e, t, i) {
        var s = e("./dom");
        t.exports.render = function (e, t) {
            var i = t.align ? t.align : "tl",
                r = t.x ? t.x : 0,
                n = t.y ? t.y : 0,
                o = r.indexOf && 0 < r.indexOf("%") ? "" : "px",
                a = n.indexOf && 0 < n.indexOf("%") ? "" : "px";
            "tl" === i ? s.css(e, {
                "float": "left",
                "margin-left": r + o,
                "margin-top": n + a
            }) : "tr" === i ? s.css(e, {
                "float": "right",
                "margin-right": r + o,
                "margin-top": n + a
            }) : "tlabs" === i ? s.css(e, {
                position: "absolute",
                left: r + o,
                top: n + a
            }) : "trabs" === i ? s.css(e, {
                position: "absolute",
                right: r + o,
                top: n + a
            }) : "blabs" === i ? s.css(e, {
                position: "absolute",
                left: r + o,
                bottom: n + a
            }) : "brabs" === i ? s.css(e, {
                position: "absolute",
                right: r + o,
                bottom: n + a
            }) : "cc" === i && s.css(e, {
                position: "absolute",
                left: "50%",
                top: "50%",
                "margin-top": e.offsetHeight / -2 + "px",
                "margin-left": e.offsetWidth / -2 + "px"
            })
        }
    },
        {
            "./dom": 23
        }],
    31: [function (e, a, t) {
        var s = Object.prototype.hasOwnProperty;
        a.exports.create = Object.create ||
            function (e) {
                function t() {
                }

                return t.prototype = e,
                    new t
            },
            a.exports.isArray = function (e) {
                return "[object Array]" === Object.prototype.toString.call(arg)
            },
            a.exports.isEmpty = function (e) {
                for (var t in e)
                    if (null !== e[t]) return !1;
                return !0
            },
            a.exports.each = function (e, t, i) {
                if (a.exports.isArray(e)) for (var r = 0, n = e.length; r < n && !1 !== t.call(i || this, e[r], r); ++r) ;
                else for (var o in e) if (s.call(e, o) && !1 === t.call(i || this, o, e[o])) break;
                return e
            },
            a.exports.merge = function (e, t) {
                if (!t) return e;
                for (var i in t)
                    s.call(t, i) && (e[i] = t[i]);
                return e
            },
            a.exports.deepMerge = function (e, t) {
                var i, r, n;
                for (i in e = a.exports.copy(e), t)
                    s.call(t, i) && (r = e[i], n = t[i], a.exports.isPlain(r) && a.exports.isPlain(n) ? e[i] = a.exports.deepMerge(r, n) : e[i] = t[i]);
                return e
            },
            a.exports.copy = function (e) {
                return a.exports.merge({}, e)
            },
            a.exports.isPlain = function (e) {
                return !!e && "object" == typeof e && "[object Object]" === e.toString() && e.constructor === Object
            },
            a.exports.isArray = Array.isArray ||
                function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
            a.exports.unescape = function (e) {
                return e.replace(/&([^;]+);/g, function (e, t) {
                    return {
                        amp: "&",
                        lt: "<",
                        gt: ">",
                        quot: '"',
                        "#x27": "'",
                        "#x60": "`"
                    }[t.toLowerCase()] || e
                })
            }
    },
        {}],
    32: [function (e, t, i) {
        var n = e("./object"),
            o = function () {
            };
        (o = function () {
        }).extend = function (e) {
            var t, i;
            for (var r in t = (e = e || {}).init || e.init || this.prototype.init || this.prototype.init ||
                function () {
                }, (((i = function () {
                t.apply(this, arguments)
            }).prototype = n.create(this.prototype)).constructor = i).extend = o.extend, i.create = o.create, e)
                e.hasOwnProperty(r) && (i.prototype[r] = e[r]);
            return i
        },
            o.create = function () {
                var e = n.create(this.prototype);
                return this.apply(e, arguments),
                    e
            },
            t.exports = o
    },
        {
            "./object": 31
        }],
    33: [function (e, f, t) {
        var v = e("./object"),
            i = e("../config"),
            r = e("./dom"),
            n = e("./cookie"),
            o = e("./constants"),
            a = e("./ua"),
            y = e("../player/base/plugin/defaultemptycomponent"),
            g = {
                preload: !0,
                autoplay: !0,
                useNativeControls: !1,
                width: "100%",
                height: "300px",
                cover: "",
                from: "",
                trackLog: !0,
                isLive: !1,
                playsinline: !0,
                showBarTime: 5e3,
                rePlay: !1,
                liveRetry: 5,
                liveRetryInterval: 1,
                liveRetryStep: 0,
                format: "mp4",
                loadDataTimeout: 20,
                waitingTimeout: 60,
                controlBarForOver: !1,
                controlBarVisibility: "hover",
                enableSystemMenu: !1,
                qualitySort: "asc",
                x5_video_position: "normal",
                x5_type: "h5",
                x5_fullscreen: !1,
                x5_orientation: "landscape|portrait",
                x5LandscapeAsFullScreen: !0,
                autoPlayDelay: 0,
                autoPlayDelayDisplayText: "",
                useHlsPluginForSafari: !1,
                enableMSEForAndroid: !0,
                language: "zh-cn",
                languageTexts: {},
                mediaType: "video",
                components: [],
                liveTimeShiftUrl: "",
                liveShiftSource: "",
                liveShiftTime: "",
                videoHeight: "100%",
                videoWidth: "100%",
                enableWorker: !0,
                debug: !1,
                snapshotWatermark: {
                    left: "500",
                    top: "100",
                    text: "",
                    font: "16px 宋体",
                    fillColor: "#FFFFFF",
                    strokeColor: "#FFFFFF"
                },
                hlsFragChangedEmpty: !0,
                liveStartTime: "",
                liveOverTime: "",
                enableStashBufferForFlv: !0,
                stashInitialSizeForFlv: 32,
                hlsLoadingTimeOut: 2e4,
                nudgeMaxRetry: 5,
                tracks: [],
                recreatePlayer: function () {
                },
                diagnosisButtonVisible: !0,
                ai: {
                    label: !1,
                    meta: {
                        url: "http://172.19.61.105:8085/meta/query",
                        getMeta: ""
                    },
                    boxes: "",
                    host: "",
                    app: "",
                    streamName: "",
                    startDateTime: 0,
                    waitMetaDataTime: 2,
                    displayAttrs: {
                        header: "姓名",
                        "证件号码": "text",
                        "性别": "text",
                        "年龄": "text",
                        "发型": "text",
                        "人脸大图": function (e) {
                        },
                        "人脸小图": function (e) {
                        }
                    }
                },
                skinRes: "//" + i.domain + "/de/prismplayer-flash/" + i.flashVersion + "/atlas/defaultSkin"
            };
        f.exports.defaultH5Layout = [{
            name: "bigPlayButton",
            align: "blabs",
            x: 30,
            y: 80
        },
            {
                name: "H5Loading",
                align: "cc"
            },
            {
                name: "errorDisplay",
                align: "tlabs",
                x: 0,
                y: 0
            },
            {
                name: "infoDisplay"
            },
            {
                name: "tooltip",
                align: "blabs",
                x: 0,
                y: 56
            },
            {
                name: "thumbnail"
            },
            {
                name: "controlBar",
                align: "blabs",
                x: 0,
                y: 0,
                children: [{
                    name: "progress",
                    align: "blabs",
                    x: 0,
                    y: 44
                },
                    {
                        name: "playButton",
                        align: "tl",
                        x: 15,
                        y: 12
                    },
                    {
                        name: "timeDisplay",
                        align: "tl",
                        x: 10,
                        y: 7
                    },
                    {
                        name: "fullScreenButton",
                        align: "tr",
                        x: 10,
                        y: 12
                    },
                    {
                        name: "subtitle",
                        align: "tr",
                        x: 15,
                        y: 12
                    },
                    {
                        name: "setting",
                        align: "tr",
                        x: 15,
                        y: 12
                    },
                    {
                        name: "volume",
                        align: "tr",
                        x: 5,
                        y: 10
                    }]
            }],
            f.exports.defaultAudioLayout = [{
                name: "controlBar",
                align: "blabs",
                x: 0,
                y: 0,
                children: [{
                    name: "progress",
                    align: "blabs",
                    x: 0,
                    y: 44
                },
                    {
                        name: "playButton",
                        align: "tl",
                        x: 15,
                        y: 12
                    },
                    {
                        name: "timeDisplay",
                        align: "tl",
                        x: 10,
                        y: 7
                    },
                    {
                        name: "volume",
                        align: "tr",
                        x: 10,
                        y: 10
                    }]
            }],
            f.exports.defaultFlashLayout = [{
                name: "bigPlayButton",
                align: "blabs",
                x: 30,
                y: 80
            },
                {
                    name: "controlBar",
                    align: "blabs",
                    x: 0,
                    y: 0,
                    children: [{
                        name: "progress",
                        align: "tlabs",
                        x: 0,
                        y: 0
                    },
                        {
                            name: "playButton",
                            align: "tl",
                            x: 15,
                            y: 26
                        },
                        {
                            name: "nextButton",
                            align: "tl",
                            x: 10,
                            y: 26
                        },
                        {
                            name: "timeDisplay",
                            align: "tl",
                            x: 10,
                            y: 24
                        },
                        {
                            name: "fullScreenButton",
                            align: "tr",
                            x: 10,
                            y: 25
                        },
                        {
                            name: "streamButton",
                            align: "tr",
                            x: 10,
                            y: 23
                        },
                        {
                            name: "volume",
                            align: "tr",
                            x: 10,
                            y: 25
                        }]
                },
                {
                    name: "fullControlBar",
                    align: "tlabs",
                    x: 0,
                    y: 0,
                    children: [{
                        name: "fullTitle",
                        align: "tl",
                        x: 25,
                        y: 6
                    },
                        {
                            name: "fullNormalScreenButton",
                            align: "tr",
                            x: 24,
                            y: 13
                        },
                        {
                            name: "fullTimeDisplay",
                            align: "tr",
                            x: 10,
                            y: 12
                        },
                        {
                            name: "fullZoom",
                            align: "cc"
                        }]
                }],
            f.exports.canPlayType = function (e) {
                var t = document.createElement("video");
                return t.canPlayType ? t.canPlayType(e) : ""
            },
            f.exports.canPlayHls = function () {
                return "" != f.exports.canPlayType("application/x-mpegURL")
            },
            f.exports.isUsedHlsPluginOnMobile = function (e) {
                return !(!a.IS_MOBILE || !a.IS_CHROME && !a.IS_FIREFOX)
            },
            f.exports.isSafariUsedHlsPlugin = function (e) {
                return !!(a.os.pc && a.browser.safari && e)
            },
            f.exports.hasUIComponent = function (e, t) {
                if (void 0 === e || !e || 0 == e.length) return !1;
                for (var i = 0, r = e.length; i < r; i++) {
                    var n = e[i].name;
                    if (n == t) return !0;
                    if ("controlBar" == n) return f.exports.hasUIComponent(e[i].children, t)
                }
                return !1
            },
            f.exports.validateSource = function (e) {
                return !0
            },
            f.exports.supportH5Video = function () {
                return void 0 !== document.createElement("video").canPlayType
            },
            f.exports.createWrapper = function (e) {
                var t, i = e.id;
                if ("string" == typeof i ? (0 === i.indexOf("#") && (i = i.slice(1)), t = r.el(i)) : t = i, !t || !t.nodeName) throw new TypeError("没有为播放器指定容器");
                return f.exports.adjustContainerLayout(t, e),
                    t
            },
            f.exports.adjustContainerLayout = function (e, t) {
                t.width && !e.style.width && (e.style.width = t.width),
                t.height && !e.style.height && (e.style.height = t.height)
            },
            f.exports.isSupportHls = function () {
                var e = window.MediaSource = window.MediaSource || window.WebKitMediaSource,
                    t = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer,
                    i = e && "function" == typeof e.isTypeSupported && e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                    r = !t || t.prototype && "function" == typeof t.prototype.appendBuffer && "function" == typeof t.prototype.remove;
                return i && r
            },
            f.exports.isSupportFlv = function () {
                return f.exports.isSupportHls()
            },
            f.exports.isSupportMSE = function () {
                return !!window.Promise && !!window.Uint8Array && !!Array.prototype.forEach && f.exports.isSupportedMediaSource()
            },
            f.exports.isSupportedMediaSource = function () {
                return !!window.MediaSource && !!MediaSource.isTypeSupported
            },
            f.exports.isSupportedDrm = function () {
                return !!(window.MediaKeys && window.navigator && window.navigator.requestMediaKeySystemAccess && window.MediaKeySystemAccess && window.MediaKeySystemAccess.prototype.getConfiguration) && f.exports.isSupportMSE()
            },
            f.exports.isAudio = function (e) {
                return e && 0 < e.toLowerCase().indexOf(".mp3")
            },
            f.exports.isLiveShift = function (e) {
                return e.isLive && e.liveTimeShiftUrl
            },
            f.exports.isHls = function (e) {
                return e && 0 < e.toLowerCase().indexOf(".m3u8")
            },
            f.exports.isDash = function (e) {
                return e && 0 < e.toLowerCase().indexOf(".mpd")
            },
            f.exports.isFlv = function (e) {
                return e && 0 < e.toLowerCase().indexOf(".flv")
            },
            f.exports.isRTMP = function (e) {
                return e && -1 < e.toLowerCase().indexOf("rtmp:")
            },
            f.exports.findSelectedStreamLevel = function (e) {
                var t = n.get(o.SelectedStreamLevel);
                if (!t) return n.set(o.SelectedStreamLevel, e[0].definition, 365),
                    0;
                for (var i = 0; i < e.length; i++)
                    if (e[i].definition == t) return i;
                return 0
            },
            f.exports.handleOption = function (e, t) {
                var i = v.merge(v.copy(g), e),
                    r = [{
                        name: "fullScreenButton",
                        align: "tr",
                        x: 20,
                        y: 12
                    },
                        {
                            name: "subtitle",
                            align: "tr",
                            x: 15,
                            y: 12
                        },
                        {
                            name: "setting",
                            align: "tr",
                            x: 15,
                            y: 12
                        },
                        {
                            name: "volume",
                            align: "tr",
                            x: 5,
                            y: 10
                        }],
                    n = !1;
                if (e.useFlashPrism || f.exports.isRTMP(e.source)) n = !0,
                    r = [{
                        name: "liveIco",
                        align: "tlabs",
                        x: 15,
                        y: 25
                    },
                        {
                            name: "fullScreenButton",
                            align: "tr",
                            x: 10,
                            y: 25
                        },
                        {
                            name: "volume",
                            align: "tr",
                            x: 10,
                            y: 25
                        }];
                else {
                    var o = f.exports.isLiveShift(i);
                    o ? (r.push({
                        name: "liveShiftProgress",
                        align: "tlabs",
                        x: 0,
                        y: 0
                    }), r.push({
                        name: "playButton",
                        align: "tl",
                        x: 15,
                        y: 12
                    }), r.push({
                        name: "liveDisplay",
                        align: "tl",
                        x: 15,
                        y: 6
                    })) : r.push({
                        name: "liveDisplay",
                        align: "tlabs",
                        x: 15,
                        y: 6
                    })
                }
                if (e.isLive) if (void 0 === e.skinLayout) i.skinLayout = [{
                    name: "errorDisplay",
                    align: "tlabs",
                    x: 0,
                    y: 0
                },
                    {
                        name: "infoDisplay"
                    },
                    {
                        name: "bigPlayButton",
                        align: "blabs",
                        x: 30,
                        y: 80
                    },
                    {
                        name: "tooltip",
                        align: "blabs",
                        x: 0,
                        y: 56
                    },
                    {
                        name: "H5Loading",
                        align: "cc"
                    },
                    {
                        name: "controlBar",
                        align: "blabs",
                        x: 0,
                        y: 0,
                        children: r
                    }];
                else if (0 != e.skinLayout) {
                    for (var a = e.skinLayout.length, s = [], l = -1, c = 0; c < a; c++)
                        if ("controlBar" == i.skinLayout[c].name) {
                            l = c;
                            for (var u = i.skinLayout[c].children.length, p = 0; p < u; p++) {
                                var d = i.skinLayout[c].children[p].name;
                                if ("liveDisplay" == d || "liveIco" == d || "fullScreenButton" == d || "volume" == d || "snapshot" == d || "setting" == d || "subtitle" == d || o && ("progress" == d || "playButton" == d || "timeDisplay" == d)) {
                                    var h = i.skinLayout[c].children[p];
                                    "progress" == d ? h.name = "liveShiftProgress" : "timeDisplay" == d ? h.name = "liveShiftTimeDisplay" : n && "liveDisplay" == d && (h.name = "liveIco"),
                                        s.push(h)
                                }
                            }
                            break
                        }
                    -1 != l && (i.skinLayout[l].children = s)
                }
                return (void 0 === e.components || !e.components || v.isArray(e.components) && 0 == e.components.length) && "false" != e.components && (i.components = [y]),
                    i
            }
    },
        {
            "../config": 11,
            "../player/base/plugin/defaultemptycomponent": 67,
            "./constants": 20,
            "./cookie": 21,
            "./dom": 23,
            "./object": 31,
            "./ua": 37
        }],
    34: [function (e, t, i) {
        t.exports = e(33)
    },
        {
            "../config": 11,
            "../player/base/plugin/defaultemptycomponent": 67,
            "./constants": 20,
            "./cookie": 21,
            "./dom": 23,
            "./object": 31,
            "./ua": 37,
            "/Users/lmq/aliplayer/prismplayer/src/lib/playerUtil.js": 33
        }],
    35: [function (e, t, i) {
        Date.now || (Date.now = function () {
            return (new Date).getTime()
        }),

            function () {
                "use strict";
                for (var e = ["webkit", "moz", "ms", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
                    var i = e[t];
                    window.requestAnimationFrame = window[i + "RequestAnimationFrame"],
                        window.cancelAnimationFrame = window[i + "CancelAnimationFrame"] || window[i + "CancelRequestAnimationFrame"]
                }
                if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                    var r = 0;
                    window.requestAnimationFrame = function (e) {
                        var t = Date.now(),
                            i = Math.max(r + 16, t);
                        return setTimeout(function () {
                            e(r = i)
                        }, i - t)
                    },
                        window.cancelAnimationFrame = clearTimeout
                }
            }(),
            t.exports = {}
    },
        {}],
    36: [function (e, t, i) {
        t.exports.set = function (t, i) {
            try {
                window.localStorage && localStorage.setItem(t, i)
            } catch (e) {
                window[t + "_localStorage"] = i
            }
        },
            t.exports.get = function (t) {
                try {
                    if (window.localStorage) return localStorage.getItem(t)
                } catch (e) {
                    return window[t + "_localStorage"]
                }
                return ""
            }
    },
        {}],
    37: [function (e, D, t) {
        if (D.exports.USER_AGENT = navigator.userAgent, D.exports.IS_IPHONE = /iPhone/i.test(D.exports.USER_AGENT), D.exports.IS_IPAD = /iPad/i.test(D.exports.USER_AGENT), D.exports.IS_IPOD = /iPod/i.test(D.exports.USER_AGENT), D.exports.IS_MAC = /mac/i.test(D.exports.USER_AGENT), D.exports.IS_EDGE = /Edge/i.test(D.exports.USER_AGENT), D.exports.IS_IE11 = /Trident\/7.0/i.test(D.exports.USER_AGENT), D.exports.IS_X5 = /qqbrowser/i.test(D.exports.USER_AGENT.toLowerCase()), D.exports.IS_CHROME = /Chrome/i.test(D.exports.USER_AGENT) && !D.exports.IS_EDGE && !D.exports.IS_X5, D.exports.IS_SAFARI = /Safari/i.test(D.exports.USER_AGENT) && !D.exports.IS_CHROME, D.exports.IS_FIREFOX = /Firefox/i.test(D.exports.USER_AGENT), document.all) try {
            var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            D.exports.HAS_FLASH = !!i
        } catch (e) {
            D.exports.HAS_FLASH = !1
        }
        else if (navigator.plugins && 0 < navigator.plugins.length) {
            i = navigator.plugins["Shockwave Flash"];
            D.exports.HAS_FLASH = !!i
        } else D.exports.HAS_FLASH = !1;
        var r, n, o, a;
        D.exports.IS_MAC_SAFARI = D.exports.IS_MAC && D.exports.IS_SAFARI && !D.exports.IS_CHROME && !D.exports.HAS_FLASH,
            D.exports.IS_IOS = D.exports.IS_IPHONE || D.exports.IS_IPAD || D.exports.IS_IPOD,
            D.exports.IOS_VERSION = function () {
                var e = D.exports.USER_AGENT.match(/OS (\d+)_/i);
                if (e && e[1]) return e[1]
            }(),
            D.exports.IS_ANDROID = /Android/i.test(D.exports.USER_AGENT),
            D.exports.ANDROID_VERSION = (o = D.exports.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i)) ? (r = o[1] && parseFloat(o[1]), n = o[2] && parseFloat(o[2]), r && n ? parseFloat(o[1] + "." + o[2]) : r || null) : null,
            D.exports.IS_OLD_ANDROID = D.exports.IS_ANDROID && /webkit/i.test(D.exports.USER_AGENT) && D.exports.ANDROID_VERSION < 2.3,
            D.exports.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
            D.exports.IS_MOBILE = D.exports.IS_IOS || D.exports.IS_ANDROID,
            D.exports.IS_H5 = D.exports.IS_MOBILE || !D.exports.HAS_FLASH,
            D.exports.IS_PC = !D.exports.IS_H5,
            D.exports.is_X5 = /micromessenger/i.test(D.exports.USER_AGENT) || /qqbrowser/i.test(D.exports.USER_AGENT),
            D.exports.getHost = function (e) {
                var t = "";
                if (void 0 === e || null == e || "" == e) return "";
                var i = e.indexOf("//"),
                    r = e;
                -1 < i && (r = e.substring(i + 2));
                t = r;
                var n = r.split("/");
                return n && 0 < n.length && (t = n[0]),
                (n = t.split(":")) && 0 < n.length && (t = n[0]),
                    t
            },
            D.exports.dingTalk = function () {
                var e = D.exports.USER_AGENT.toLowerCase();
                return /dingtalk/i.test(e)
            },
            D.exports.wechat = function () {
                var e = D.exports.USER_AGENT.toLowerCase();
                return /micromessenger/i.test(e)
            },
            D.exports.inIFrame = function () {
                return self != top
            },
            D.exports.getReferer = function () {
                var t = document.referrer;
                if (D.exports.inIFrame()) try {
                    t = top.document.referrer
                } catch (e) {
                    t = document.referrer
                }
                return t
            },
            D.exports.getHref = function () {
                location.href;
                if (D.exports.inIFrame()) try {
                    top.location.href
                } catch (e) {
                    location.href
                }
                return location.href
            },
            a = D.exports,

            function (e, t) {
                var i, r, n, o, a = this.os = {},
                    s = this.browser = {},
                    l = e.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                    c = e.match(/(Android);?[\s\/]+([\d.]+)?/),
                    u = !!e.match(/\(Macintosh\; Intel /),
                    p = e.match(/(iPad).*OS\s([\d_]+)/),
                    d = e.match(/(iPod)(.*OS\s([\d_]+))?/),
                    h = !p && e.match(/(iPhone\sOS)\s([\d_]+)/),
                    f = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                    v = /Win\d{2}|Windows/.test(t),
                    y = e.match(/Windows Phone ([\d.]+)/),
                    g = f && e.match(/TouchPad/),
                    _ = e.match(/Kindle\/([\d.]+)/),
                    m = e.match(/Silk\/([\d._]+)/),
                    S = e.match(/(BlackBerry).*Version\/([\d.]+)/),
                    b = e.match(/(BB10).*Version\/([\d.]+)/),
                    T = e.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                    x = e.match(/PlayBook/),
                    E = e.match(/Chrome\/([\d.]+)/) || e.match(/CriOS\/([\d.]+)/),
                    w = e.match(/Firefox\/([\d.]+)/),
                    P = e.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                    C = e.match(/MSIE\s([\d.]+)/) || e.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                    k = !E && e.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                    I = k || e.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);
                if ((s.webkit = !!l) && (s.version = l[1]), c && (a.android = !0, a.version = c[2]), h && !d && (a.ios = a.iphone = !0, a.version = h[2].replace(/_/g, ".")), p && (a.ios = a.ipad = !0, a.version = p[2].replace(/_/g, ".")), d && (a.ios = a.ipod = !0, a.version = d[3] ? d[3].replace(/_/g, ".") : null), y && (a.wp = !0, a.version = y[1]), f && (a.webos = !0, a.version = f[2]), g && (a.touchpad = !0), S && (a.blackberry = !0, a.version = S[2]), b && (a.bb10 = !0, a.version = b[2]), T && (a.rimtabletos = !0, a.version = T[2]), x && (s.playbook = !0), _ && (a.kindle = !0, a.version = _[1]), m && (s.silk = !0, s.version = m[1]), !m && a.android && e.match(/Kindle Fire/) && (s.silk = !0), E && (s.chrome = !0, s.version = E[1]), w && (s.firefox = !0, s.version = w[1]), P && (a.firefoxos = !0, a.version = P[1]), C && (s.ie = !0, s.version = C[1]), I && (u || a.ios || v || c) && (s.safari = !0, a.ios || (s.version = I[1])), k && (s.webview = !0), u) {
                    var L = e.match(/[\d]*_[\d]*_[\d]*/);
                    L && 0 < L.length && L[0] && (a.version = L[0].replace(/_/g, "."))
                }
                a.tablet = !!(p || x || c && !e.match(/Mobile/) || w && e.match(/Tablet/) || C && !e.match(/Phone/) && e.match(/Touch/)),
                    a.phone = !(a.tablet || a.ipod || !(c || h || f || S || b || E && e.match(/Android/) || E && e.match(/CriOS\/([\d.]+)/) || w && e.match(/Mobile/) || C && e.match(/Touch/))),
                    a.pc = !a.tablet && !a.phone,
                    u ? a.name = "macOS" : v ? (a.name = "windows", a.version = (n = navigator.userAgent, o = "", (-1 < n.indexOf("Windows NT 5.0") || -1 < n.indexOf("Windows 2000")) && (o = "2000"), (-1 < n.indexOf("Windows NT 5.1") || -1 < n.indexOf("Windows XP")) && (o = "XP"), (-1 < n.indexOf("Windows NT 5.2") || -1 < n.indexOf("Windows 2003")) && (o = "2003"), (-1 < n.indexOf("Windows NT 6.0") || -1 < n.indexOf("Windows Vista")) && (o = "Vista"), (-1 < n.indexOf("Windows NT 6.1") || -1 < n.indexOf("Windows 7")) && (o = "7"), (-1 < n.indexOf("Windows NT 6.2") || -1 < n.indexOf("Windows 8")) && (o = "8"), (-1 < n.indexOf("Windows NT 6.3") || -1 < n.indexOf("Windows 8.1")) && (o = "8.1"), (-1 < n.indexOf("Windows NT 10") || -1 < n.indexOf("Windows 10")) && (o = "10"), o)) : a.name = function () {
                        var e = navigator.userAgent,
                            t = "other",
                            i = D.exports.os;
                        if (i.ios) return "iOS";
                        if (i.android) return "android";
                        if (-1 < e.indexOf("Baiduspider")) return "Baiduspider";
                        if (-1 < e.indexOf("PlayStation")) return "PS4";
                        var r = "Win32" == navigator.platform || "Windows" == navigator.platform || -1 < e.indexOf("Windows"),
                            n = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform;
                        return n && (t = "macOS"),
                        "X11" != navigator.platform || r || n || (t = "Unix"),
                        -1 < String(navigator.platform).indexOf("Linux") && (t = "Linux"),
                            r ? "windows" : t
                    }(),
                    s.name = (i = navigator.userAgent.toLowerCase(), (r = D.exports.browser).firefox ? "Firefox" : r.ie ? /edge/.test(i) ? "Edge" : "IE" : /micromessenger/.test(i) ? "微信内置浏览器" : /qqbrowser/.test(i) ? "QQ浏览器" : r.webview ? "webview" : r.chrome ? "Chrome" : r.safari ? "Safari" : /baiduspider/.test(i) ? "Baiduspider" : /ucweb/.test(i) || /UCBrowser/.test(i) ? "UC" : /opera/.test(i) ? "Opera" : /ucweb/.test(i) ? "UC" : /360se/.test(i) ? "360浏览器" : /bidubrowser/.test(i) ? "百度浏览器" : /metasr/.test(i) ? "搜狗浏览器" : /lbbrowser/.test(i) ? "猎豹浏览器" : /playstation/.test(i) ? "PS4浏览器" : void 0)
            }.call(a, navigator.userAgent, navigator.platform)
    },
        {}],
    38: [function (e, t, i) {
        var s = e("./dom");
        t.exports.getAbsoluteURL = function (e) {
            return e.match(/^https?:\/\//) || (e = s.createEl("div", {
                innerHTML: '<a href="' + e + '">x</a>'
            }).firstChild.href),
                e
        },
            t.exports.parseUrl = function (e) {
                var t, i, r, n, o;
                n = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"],
                (r = "" === (i = s.createEl("a", {
                    href: e
                })).host && "file:" !== i.protocol) && ((t = s.createEl("div")).innerHTML = '<a href="' + e + '"></a>', i = t.firstChild, t.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(t)),
                    o = {};
                for (var a = 0; a < n.length; a++)
                    o[n[a]] = i[n[a]];
                return o.segments = i.pathname.replace(/^\//, "").split("/"),
                r && document.body.removeChild(t),
                    o
            }
    },
        {
            "./dom": 23
        }],
    39: [function (e, r, t) {
        var i = e("./dom"),
            n = e("./ua"),
            o = e("./playerutil");
        r.exports.formatTime = function (e) {
            var t, i, r, n = Math.round(e);
            return t = Math.floor(n / 3600),
                n %= 3600,
                i = Math.floor(n / 60),
                r = n % 60,
            !(t === 1 / 0 || isNaN(t) || i === 1 / 0 || isNaN(i) || r === 1 / 0 || isNaN(r)) && ("00" === (t = 10 <= t ? t : "0" + t) ? "" : t + ":") + (i = 10 <= i ? i : "0" + i) + ":" + (r = 10 <= r ? r : "0" + r)
        },
            r.exports.extractTime = function (e) {
                if (e) {
                    var t = parseInt(e.getHours()),
                        i = parseInt(e.getMinutes()),
                        r = parseInt(e.getSeconds());
                    return ("00" === (t = 10 <= t ? t : "0" + t) ? "" : t + ":") + (i = 10 <= i ? i : "0" + i) + ":" + (r = 10 <= r ? r : "0" + r)
                }
                return ""
            },
            r.exports.convertToTimestamp = function (e, t) {
                var i = "";
                return e && (t ? i = e.gettime() : (i = Date.parse(e), i /= 1e3)),
                    i
            },
            r.exports.convertToDate = function (e, t) {
                var i = "";
                if (e) {
                    t || 1e3,
                        (i = new Date).setTime(1e3 * e)
                }
                return i
            },
            r.exports.parseTime = function (e) {
                if (!e) return "00:00:00";
                var t = e.split(":"),
                    i = 0,
                    r = 0,
                    n = 0;
                return 3 === t.length ? (i = t[0], r = t[1], n = t[2]) : 2 === t.length ? (r = t[0], n = t[1]) : 1 === t.length && (n = t[0]),
                3600 * (i = parseInt(i, 10)) + 60 * (r = parseInt(r, 10)) + (n = Math.ceil(parseFloat(n)))
            },
            r.exports.formatDate = function (e, t) {
                var i = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "H+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds(),
                    "q+": Math.floor((e.getMonth() + 3) / 3),
                    S: e.getMilliseconds()
                };
                for (var r in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), i)
                    new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[r] : ("00" + i[r]).substr(("" + i[r]).length)));
                return t
            },
            r.exports.sleep = function (e) {
                for (var t = Date.now(); Date.now() - t <= e;) ;
            },
            r.exports.htmlEncodeAll = function (e) {
                return null == e ? "" : e.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
            },
            r.exports.toBinary = function (e) {
                if (!window.atob) return "";
                for (var t = atob(e), i = t.length, r = new Uint8Array(i), n = 0; n < i; n++)
                    r[n] = t.charCodeAt(n);
                return r
            },
            r.exports.readyBinary = function (e) {
                for (var t = new Uint8Array(e), i = t.length, r = "", n = 0; n < i; n++)
                    r += t[n];
                return r
            },
            r.exports.delayHide = function (e, t) {
                e && (void 0 === t && (t = 1e3), e.delayHanlder && clearTimeout(e.delayHanlder), e.delayHanlder = setTimeout(function () {
                    i.css(e, "display", "none")
                }, t))
            },
            r.exports.openInFile = function () {
                return -1 != window.location.protocol.toLowerCase().indexOf("file")
            },
            r.exports.contentProtocolMixed = function (e) {
                return !!(n.os.pc && (o.isHls(e) && !n.browser.safari || o.isFlv(e)) && "https:" == window.location.protocol.toLowerCase() && e && -1 < e.toLowerCase().indexOf("http://"))
            },
            r.exports.queryString = function (e) {
                var t, i, r, n, o;
                return 2 !== (i = (e = decodeURIComponent(e)).split("?")).length ? {} : (o = i[1], (t = o.split("&")) ? (r = {}, n = 0, $(t).each(function () {
                    var e;
                    2 === (e = t[n].split("=")).length && (r[e[0]] = e[1].replace(/\+/g, " ")),
                        n++
                }), r) : {})
            },
            r.exports.log = function (e) {
                var t = window.location.href,
                    i = r.exports.queryString(t);
                i && 1 == i.debug && console.log(e)
            }
    },
        {
            "./dom": 23,
            "./playerutil": 34,
            "./ua": 37
        }],
    40: [function (e, t, i) {
        var s = e("./vttparse"),
            l = function (e) {
                for (var t = 5381, i = e.length; i;)
                    t = 33 * t ^ e.charCodeAt(--i);
                return (t >>> 0).toString()
            },
            r = {
                parse: function (e, t, i) {
                    var r, n = e.trim().replace(/\r\n|\n\r|\n|\r/g, "\n").split("\n"),
                        o = [],
                        a = new s;
                    a.oncue = function (e) {
                        e.id = l(e.startTime) + l(e.endTime) + l(e.text),
                            e.text = decodeURIComponent(escape(e.text)),
                            e.isBig = !1;
                        var t = e.text.split("#xywh=");
                        if (2 == t.length) {
                            var i = t[1].split(",");
                            e.x = i[0],
                                e.y = i[1],
                                e.w = i[2],
                                e.h = i[3],
                                e.isBig = !0
                        }
                        0 < e.endTime && o.push(e)
                    },
                        a.onparsingerror = function (e) {
                            r = e
                        },
                        a.onflush = function () {
                            if (r && i) return i(r),
                                void console.log(r);
                            t(o)
                        },
                        n.forEach(function (e) {
                            a.parse(e + "\n")
                        }),
                        a.flush()
                }
            };
        t.exports = r
    },
        {
            "./vttparse": 42
        }],
    41: [function (e, t, i) {
        t.exports = function () {
            if ("undefined" != typeof window && window.VTTCue) return window.VTTCue;
            var S = "auto",
                b = {
                    "": !0,
                    lr: !0,
                    rl: !0
                },
                t = {
                    start: !0,
                    middle: !0,
                    end: !0,
                    left: !0,
                    right: !0
                };

            function T(e) {
                return "string" == typeof e && (!!t[e.toLowerCase()] && e.toLowerCase())
            }

            function x(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var r in i)
                        e[r] = i[r]
                }
                return e
            }

            function e(e, t, i) {
                var r = this,
                    n = function () {
                        if ("undefined" != typeof navigator) return /MSIE\s8\.0/.test(navigator.userAgent)
                    }(),
                    o = {};
                n ? r = document.createElement("custom") : o.enumerable = !0,
                    r.hasBeenReset = !1;
                var a = "",
                    s = !1,
                    l = e,
                    c = t,
                    u = i,
                    p = null,
                    d = "",
                    h = !0,
                    f = "auto",
                    v = "start",
                    y = 50,
                    g = "middle",
                    _ = 50,
                    m = "middle";
                if (Object.defineProperty(r, "id", x({}, o, {
                    get: function () {
                        return a
                    },
                    set: function (e) {
                        a = "" + e
                    }
                })), Object.defineProperty(r, "pauseOnExit", x({}, o, {
                    get: function () {
                        return s
                    },
                    set: function (e) {
                        s = !!e
                    }
                })), Object.defineProperty(r, "startTime", x({}, o, {
                    get: function () {
                        return l
                    },
                    set: function (e) {
                        if ("number" != typeof e) throw new TypeError("Start time must be set to a number.");
                        l = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "endTime", x({}, o, {
                    get: function () {
                        return c
                    },
                    set: function (e) {
                        if ("number" != typeof e) throw new TypeError("End time must be set to a number.");
                        c = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "text", x({}, o, {
                    get: function () {
                        return u
                    },
                    set: function (e) {
                        u = "" + e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "region", x({}, o, {
                    get: function () {
                        return p
                    },
                    set: function (e) {
                        p = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "vertical", x({}, o, {
                    get: function () {
                        return d
                    },
                    set: function (e) {
                        var t, i = "string" == typeof (t = e) && !!b[t.toLowerCase()] && t.toLowerCase();
                        if (!1 === i) throw new SyntaxError("An invalid or illegal string was specified.");
                        d = i,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "snapToLines", x({}, o, {
                    get: function () {
                        return h
                    },
                    set: function (e) {
                        h = !!e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "line", x({}, o, {
                    get: function () {
                        return f
                    },
                    set: function (e) {
                        if ("number" != typeof e && e !== S) throw new SyntaxError("An invalid number or illegal string was specified.");
                        f = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "lineAlign", x({}, o, {
                    get: function () {
                        return v
                    },
                    set: function (e) {
                        var t = T(e);
                        if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                        v = t,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "position", x({}, o, {
                    get: function () {
                        return y
                    },
                    set: function (e) {
                        if (e < 0 || 100 < e) throw new Error("Position must be between 0 and 100.");
                        y = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "positionAlign", x({}, o, {
                    get: function () {
                        return g
                    },
                    set: function (e) {
                        var t = T(e);
                        if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                        g = t,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "size", x({}, o, {
                    get: function () {
                        return _
                    },
                    set: function (e) {
                        if (e < 0 || 100 < e) throw new Error("Size must be between 0 and 100.");
                        _ = e,
                            this.hasBeenReset = !0
                    }
                })), Object.defineProperty(r, "align", x({}, o, {
                    get: function () {
                        return m
                    },
                    set: function (e) {
                        var t = T(e);
                        if (!t) throw new SyntaxError("An invalid or illegal string was specified.");
                        m = t,
                            this.hasBeenReset = !0
                    }
                })), r.displayState = void 0, n) return r
            }

            return e.prototype.getCueAsHTML = function () {
                return window.WebVTT.convertCueToDOMTree(window, this.text)
            },
                e
        }()
    },
        {}],
    42: [function (e, t, i) {
        var s = e("./vttcue"),
            r = function () {
                return {
                    decode: function (e) {
                        if (!e) return "";
                        if ("string" != typeof e) throw new Error("Error - expected string data.");
                        return decodeURIComponent(encodeURIComponent(e))
                    }
                }
            };

        function n() {
            this.window = window,
                this.state = "INITIAL",
                this.buffer = "",
                this.decoder = new r,
                this.regionList = []
        }

        function l() {
            this.values = Object.create(null)
        }

        function c(e, t, i, r) {
            var n = r ? e.split(r) : [e];
            for (var o in n)
                if ("string" == typeof n[o]) {
                    var a = n[o].split(i);
                    if (2 === a.length) t(a[0], a[1])
                }
        }

        l.prototype = {
            set: function (e, t) {
                this.get(e) || "" === t || (this.values[e] = t)
            },
            get: function (e, t, i) {
                return i ? this.has(e) ? this.values[e] : t[i] : this.has(e) ? this.values[e] : t
            },
            has: function (e) {
                return e in this.values
            },
            alt: function (e, t, i) {
                for (var r = 0; r < i.length; ++r)
                    if (t === i[r]) {
                        this.set(e, t);
                        break
                    }
            },
            integer: function (e, t) {
                /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10))
            },
            percent: function (e, t) {
                return !!(t.match(/^([\d]{1,3})(\.[\d]*)?%$/) && 0 <= (t = parseFloat(t)) && t <= 100) && (this.set(e, t), !0)
            }
        };
        var u = new s(0, 0, 0),
            p = "middle" === u.align ? "middle" : "center";

        function d(t, e, a) {
            var i = t;

            function r() {
                var e = function (e) {
                    function t(e, t, i, r) {
                        return 3600 * (0 | e) + 60 * (0 | t) + (0 | i) + (0 | r) / 1e3
                    }

                    var i = e.match(/^(\d+):(\d{2})(:\d{2})?(\.\d{3})?/);
                    if (!i) return null;
                    var r = i[4];
                    return r && (r = r.replace(".", "")),
                        i[3] ? t(i[1], i[2], i[3].replace(":", ""), r) : 59 < i[1] ? t(i[1], i[2], 0, r) : t(0, i[1], i[2], r)
                }(t);
                if (null === e) throw new Error("Malformed timestamp: " + i);
                return t = t.replace(/^[^\sa-zA-Z-]+/, ""),
                    e
            }

            function n() {
                t = t.replace(/^\s+/, "")
            }

            if (n(), e.startTime = r(), n(), "--\x3e" !== t.substr(0, 3)) throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): " + i);
            t = t.substr(3),
                n(),
                e.endTime = r(),
                n(),

                function (e, t) {
                    var o = new l;
                    c(e, function (e, t) {
                        switch (e) {
                            case "region":
                                for (var i = a.length - 1; 0 <= i; i--)
                                    if (a[i].id === t) {
                                        o.set(e, a[i].region);
                                        break
                                    }
                                break;
                            case "vertical":
                                o.alt(e, t, ["rl", "lr"]);
                                break;
                            case "line":
                                var r = t.split(","),
                                    n = r[0];
                                o.integer(e, n),
                                o.percent(e, n) && o.set("snapToLines", !1),
                                    o.alt(e, n, ["auto"]),
                                2 === r.length && o.alt("lineAlign", r[1], ["start", p, "end"]);
                                break;
                            case "position":
                                r = t.split(","),
                                    o.percent(e, r[0]),
                                2 === r.length && o.alt("positionAlign", r[1], ["start", p, "end", "line-left", "line-right", "auto"]);
                                break;
                            case "size":
                                o.percent(e, t);
                                break;
                            case "align":
                                o.alt(e, t, ["start", p, "end", "left", "right"])
                        }
                    }, /:/, /\s/),
                        t.region = o.get("region", null),
                        t.vertical = o.get("vertical", "");
                    var i = o.get("line", "auto");
                    "auto" === i && -1 === u.line && (i = -1),
                        t.line = i,
                        t.lineAlign = o.get("lineAlign", "start"),
                        t.snapToLines = o.get("snapToLines", !0),
                        t.size = o.get("size", 100),
                        t.align = o.get("align", p);
                    var r = o.get("position", "auto");
                    "auto" === r && 50 === u.position && (r = "start" === t.align || "left" === t.align ? 0 : "end" === t.align || "right" === t.align ? 100 : 50),
                        t.position = r
                }(t, e)
        }

        n.prototype = {
            parse: function (e) {
                var r = this;

                function t() {
                    var e = r.buffer,
                        t = 0;
                    for (e = e.replace(/<br(?: \/)?>/gi, "\n"); t < e.length && "\r" !== e[t] && "\n" !== e[t];) ++t;
                    var i = e.substr(0, t);
                    return "\r" === e[t] && ++t,
                    "\n" === e[t] && ++t,
                        r.buffer = e.substr(t),
                        i
                }

                e && (r.buffer += r.decoder.decode(e, {
                    stream: !0
                }));
                try {
                    var i;
                    if ("INITIAL" === r.state) {
                        if (!/\r\n|\n/.test(r.buffer)) return this;
                        var n = (i = t()).match(/^WEBVTT([ \t].*)?$/);
                        if (!n || !n[0]) throw new Error("Malformed WebVTT signature.");
                        r.state = "HEADER"
                    }
                    for (var o = !1; r.buffer;) {
                        if (!/\r\n|\n/.test(r.buffer)) return this;
                        switch (o ? o = !1 : i = t(), r.state) {
                            case "HEADER":
                                /:/.test(i) ? c(i, function (e, t) {
                                    switch (e) {
                                        case "Region":
                                            console.log("parse region", t)
                                    }
                                }, /:/) : i || (r.state = "ID");
                                continue;
                            case "NOTE":
                                i || (r.state = "ID");
                                continue;
                            case "ID":
                                if (/^NOTE($|[ \t])/.test(i)) {
                                    r.state = "NOTE";
                                    break
                                }
                                if (!i) continue;
                                if (r.cue = new s(0, 0, ""), r.state = "CUE", -1 === i.indexOf("--\x3e")) {
                                    r.cue.id = i;
                                    continue
                                }
                            case "CUE":
                                try {
                                    d(i, r.cue, r.regionList)
                                } catch (e) {
                                    r.cue = null,
                                        r.state = "BADCUE";
                                    continue
                                }
                                r.state = "CUETEXT";
                                continue;
                            case "CUETEXT":
                                var a = -1 !== i.indexOf("--\x3e");
                                if (!i || a && (o = !0)) {
                                    r.oncue && r.oncue(r.cue),
                                        r.cue = null,
                                        r.state = "ID";
                                    continue
                                }
                                r.cue.text && (r.cue.text += "\n"),
                                    r.cue.text += i;
                                continue;
                            case "BADCUE":
                                i || (r.state = "ID");
                                continue
                        }
                    }
                } catch (e) {
                    "CUETEXT" === r.state && r.cue && r.oncue && r.oncue(r.cue),
                        r.cue = null,
                        r.state = "INITIAL" === r.state ? "BADWEBVTT" : "BADCUE"
                }
                return this
            },
            flush: function () {
                var e = this;
                try {
                    if (e.buffer += e.decoder.decode(), (e.cue || "HEADER" === e.state) && (e.buffer += "\n\n", e.parse()), "INITIAL" === e.state) throw new Error("Malformed WebVTT signature.")
                } catch (e) {
                    throw e
                }
                return e.onflush && e.onflush(),
                    this
            }
        },
            t.exports = n
    },
        {
            "./vttcue": 41
        }],
    43: [function (e, t, i) {
        var r, n = e("../lib/oo"),
            u = e("../lib/object"),
            o = e("../lib/cookie"),
            b = e("../lib/data"),
            T = e("../lib/io"),
            x = e("../lib/ua"),
            E = e("../config"),
            a = e("../player/base/event/eventtype"),
            s = 0,
            p = {
                INIT: 1001,
                CLOSE: 1002,
                STARTFETCHDATA: 1003,
                COMPLETEFETCHDATA: 1004,
                STARTPLAY: 1005,
                PLAY: 2001,
                STOP: 2002,
                PAUSE: 2003,
                SEEK: 2004,
                FULLSREEM: 2005,
                QUITFULLSCREEM: 2006,
                RESOLUTION: 2007,
                RESOLUTION_DONE: 2008,
                RECOVER: 2010,
                SEEK_END: 2011,
                LOADSTART: 2015,
                LOADEDMETADATA: 2016,
                LOADEDDATA: 2017,
                CANPLAY: 2018,
                CANPLAYTHROUGH: 2019,
                FETCHEDIP: 2020,
                CDNDETECT: 2021,
                DETECT: 2022,
                UNDERLOAD: 3002,
                LOADED: 3001,
                HEARTBEAT: 9001,
                ERROR: 4001
            },
            l = n.extend({
                init: function (e, t, i) {
                    void 0 === i && (i = !0),
                        this.trackLog = i,
                        this.player = e,
                        this.requestId = "",
                        this.sessionId = b.guid(),
                        this.playId = 0,
                        this.firstPlay = !0,
                        this.osName = x.os.name,
                        this.osVersion = x.os.version || "",
                        this.exName = x.browser.name,
                        this.exVersion = x.browser.version || "";
                    var r = this.player.getOptions(),
                        n = t.from ? t.from : "",
                        o = (r.isLive, r.isLive ? "live" : "vod"),
                        a = "pc";
                    x.IS_IPAD ? a = "pad" : x.os.phone && (a = "phone");
                    var s = encodeURIComponent(x.getReferer()),
                        l = x.getHref(),
                        c = encodeURIComponent(l),
                        u = "";
                    l && (u = x.getHost(l));
                    var p = E.h5Version,
                        d = this._getUuid(),
                        h = r.source ? encodeURIComponent(r.source) : "",
                        f = x.getHost(r.source),
                        v = this.sessionId,
                        y = "0.0.0.0",
                        g = "0.0.0.0",
                        _ = (new Date).getTime();
                    this._userNetInfo = {
                        cdnIp: "",
                        localIp: ""
                    };
                    var m = this;
                    try {
                        var S = function (e) {
                            m._log("FETCHEDIP", {
                                error: e || "获取IP出错"
                            })
                        };
                        !
                            function (t) {
                                if (m.trackLog) T.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function (e) {
                                    if (e.content) return T.jsonp(e.content, t, S)
                                }, S)
                            }(function (e) {
                                e && e.content && (y = m._userNetInfo.cdnIp = e.content.ldns, g = m._userNetInfo.localIp = e.content.localIp, m._log("FETCHEDIP", {
                                    cdn_ip: y,
                                    local_ip: g
                                }))
                            })
                    } catch (e) {
                        console.log(e)
                    }
                    this.opt = {
                        APIVersion: "0.6.0",
                        t: _,
                        ll: "info",
                        lv: "1.0",
                        pd: "player",
                        md: "saas_player",
                        ui: "saas_player",
                        sm: "play",
                        os: this.osName,
                        ov: this.osVersion,
                        et: this.exName,
                        ev: this.exVersion,
                        uat: x.USER_AGENT,
                        hn: "0.0.0.0",
                        bi: n,
                        ri: v,
                        e: "0",
                        args: "0",
                        vt: o,
                        tt: a,
                        dm: "h5",
                        av: p,
                        uuid: d,
                        vu: h,
                        vd: f,
                        ua: "0",
                        dn: "custom",
                        cdn_ip: y,
                        app_n: u,
                        r: s,
                        pu: c
                    },
                        this.bindEvent()
                },
                updateVideoInfo: function (e) {
                    var t = e.from ? e.from : "";
                    this.opt.bi = t,
                        this.updateSourceInfo()
                },
                updateSourceInfo: function () {
                    var e = this.player.getOptions();
                    if (e) {
                        var t = e.source ? encodeURIComponent(e.source) : "",
                            i = x.getHost(e.source);
                        this.opt.vu = t,
                            this.opt.vd = i
                    }
                },
                bindEvent: function () {
                    var t = this;
                    this.player.on(a.Player.Init, function () {
                        t._onPlayerInit()
                    }),
                        window.addEventListener("beforeunload", function () {
                            t._onPlayerClose()
                        }),
                        this.player.on(a.Video.LoadStart, function () {
                            t.loadstartTime = (new Date).getTime(),
                                t._onPlayerloadstart()
                        }),
                        this.player.on(a.Video.LoadedMetadata, function () {
                            t._onPlayerLoadMetadata()
                        }),
                        this.player.on(a.Video.LoadedData, function () {
                            t._onPlayerLoaddata()
                        }),
                        this.player.on(a.Video.Play, function () {
                            t._onPlayerPlay()
                        }),
                        this.player.on(a.Player.Ready, function () {
                            t._onPlayerReady()
                        }),
                        this.player.on(a.Video.Ended, function () {
                            t._onPlayerFinish()
                        }),
                        this.player.on(a.Video.Pause, function () {
                            t._onPlayerPause()
                        }),
                        this.player.on(a.Private.SeekStart, function (e) {
                            t._onPlayerSeekStart(e)
                        }),
                        this.player.on(a.Private.EndStart, function (e) {
                            t._onPlayerSeekEnd(e)
                        }),
                        this.player.on(a.Player.Waiting, function () {
                            t._onPlayerLoaded()
                        }),
                        this.player.on(a.Video.CanPlayThrough, function () {
                            t._onPlayerUnderload()
                        }),
                        this.player.on(a.Video.CanPlay, function () {
                            t._onPlayerCanplay()
                        }),
                        this.player.on(a.Player.Error, function () {
                            t._onPlayerError()
                        }),
                        this.player.on(a.Player.RequestFullScreen, function () {
                            t._onFullscreenChange(1)
                        }),
                        this.player.on(a.Player.CancelFullScreen, function () {
                            t._onFullscreenChange(0)
                        }),
                        r = setInterval(function () {
                            2 === t.player.readyState() || 3 === t.player.readyState() ? t._onPlayerLoaded() : 4 === t.player.readyState() && t._onPlayerUnderload()
                        }, 100),
                        setInterval(function () {
                            if (t.player.getCurrentTime()) {
                                var e = Math.floor(1e3 * t.player.getCurrentTime());
                                t.player.paused() || 30 <= ++s && (t._log("HEARTBEAT", {
                                    vt: e,
                                    interval: 1e3 * s
                                }), s = 0)
                            }
                        }, 1e3)
                },
                removeEvent: function () {
                    this.player.off("init"),
                        this.player.off("ready"),
                        this.player.off("ended"),
                        this.player.off("play"),
                        this.player.off("pause"),
                        this.player.off("seekStart"),
                        this.player.off("seekEnd"),
                        this.player.off("canplaythrough"),
                        this.player.off("error"),
                        this.player.off("fullscreenchange"),
                        clearInterval(r)
                },
                _onFullscreenChange: function (e) {
                    e ? this._log("FULLSREEM", {}) : this._log("QUITFULLSCREEM", {})
                },
                _onPlayerloadstart: function () {
                    this.playId = b.guid(),
                        this._log("LOADSTART", {
                            pt: (new Date).getTime()
                        })
                },
                _onPlayerLoadMetadata: function () {
                    this._log("LOADEDMETADATA", {
                        cost: (new Date).getTime() - this.loadstartTime
                    })
                },
                _onPlayerLoaddata: function () {
                    this._LoadedData = !0,
                        this._log("LOADEDDATA", {
                            cost: (new Date).getTime() - this.loadstartTime
                        }),
                        this._reportPlay()
                },
                _onPlayerCanplay: function () {
                    this._log("CANPLAY", {
                        pt: (new Date).getTime() - this.loadstartTime
                    })
                },
                _onPlayerInit: function () {
                    this._log("INIT", {}),
                        this.buffer_flag = 0,
                        this.pause_flag = 0
                },
                _onPlayerClose: function () {
                    this._log("CLOSE", {
                        vt: Math.floor(1e3 * this.player.getCurrentTime())
                    })
                },
                _onPlayerReady: function () {
                    this.startTimePlay = (new Date).getTime()
                },
                _onPlayerFinish: function () {
                    this._log("STOP", {
                        vt: Math.floor(1e3 * this.player.getCurrentTime())
                    }),
                        this.sessionId = b.guid(),
                        this.playId = 0
                },
                _reportPlay: function () {
                    return !(this.buffer_flag || !this.player._options || !this.player._options.autoplay || !this._LoadedData) && (this.first_play_time = (new Date).getTime(), this._log("PLAY", {
                        dsm: "fix",
                        vt: 0,
                        start_cost: this.first_play_time - this.player.getReadyTime()
                    }), this.buffer_flag = 1, !0)
                },
                _onPlayerPlay: function () {
                    this._log("STARTPLAY", {}),
                    0 == this.playId && (this.playId = b.guid()),
                    this.firstPlay || 0 != this.pause_flag || this.seeking || (this.sessionId = b.guid()),
                        this.firstPlay = !1,
                    this._reportPlay() || this.buffer_flag && this.pause_flag && (this.pause_flag = 0, this.pauseEndTime = (new Date).getTime(), this._log("RECOVER", {
                        vt: Math.floor(1e3 * this.player.getCurrentTime()),
                        cost: this.pauseEndTime - this.pauseTime
                    }))
                },
                _onPlayerPause: function () {
                    this.buffer_flag && this.startTimePlay && (this.seeking || (this.pause_flag = 1, this.pauseTime = (new Date).getTime(), this._log("PAUSE", {
                        vt: Math.floor(1e3 * this.player.getCurrentTime())
                    })))
                },
                _onPlayerSeekStart: function (e) {
                    this.seekStartTime = e.paramData.fromTime,
                        this.seeking = !0,
                        this.seekStartStamp = (new Date).getTime()
                },
                _onPlayerSeekEnd: function (e) {
                    this.seekEndStamp = (new Date).getTime(),
                        this._log("SEEK", {
                            drag_from_timestamp: Math.floor(1e3 * this.seekStartTime),
                            drag_to_timestamp: Math.floor(1e3 * e.paramData.toTime)
                        }),
                        this._log("SEEK_END", {
                            vt: Math.floor(1e3 * this.player.getCurrentTime()),
                            cost: this.seekEndStamp - this.seekStartStamp
                        }),
                        this.seeking = !1
                },
                _onPlayerLoaded: function () {
                    this.buffer_flag && this.startTimePlay && (this.stucking || this.seeking || (this.stuckStartTime = (new Date).getTime(), this.stuckStartTime - this.startTimePlay <= 1e3 || (this.stucking = !0, this._log("UNDERLOAD", {
                        vt: Math.floor(1e3 * this.player.getCurrentTime())
                    }), this.stuckStartTime = (new Date).getTime())))
                },
                _onPlayerUnderload: function () {
                    if (!this.buffer_flag && this.player._options && !this.player._options.autoplay) return this.first_play_time = (new Date).getTime(),
                        this._log("PLAY", {
                            play_mode: "fix",
                            vt: 0,
                            start_cost: this.first_play_time - this.player.getReadyTime()
                        }),
                        void (this.buffer_flag = 1);
                    if ((this.buffer_flag || !this.player._options || !this.player._options.autoplay) && this.stucking && !this.seeking) {
                        var e = Math.floor(1e3 * this.player.getCurrentTime()),
                            t = this.stuckStartTime || (new Date).getTime(),
                            i = Math.floor((new Date).getTime() - t);
                        i < 0 && (i = 0),
                            this._log("LOADED", {
                                vt: e,
                                cost: i
                            }),
                            this.stucking = !1
                    }
                },
                _onPlayerHeartBeat: function () {
                    if (!this.seeking) {
                        var e = Math.floor(1e3 * this.player.getCurrentTime()),
                            t = this;
                        this.timer || (this.timer = setTimeout(function () {
                            !t.seeking && t._log("HEARTBEAT", {
                                progress: e
                            }),
                                clearTimeout(t.timer),
                                t.timer = null
                        }, 6e4)),
                            console.log("timeupdate")
                    }
                },
                _onPlayerError: function () {
                    this.playId = 0
                },
                _log: function (e, t) {
                    if (this.trackLog) {
                        this.updateSourceInfo();
                        var i = u.copy(this.opt);
                        if (this.requestId = b.guid(), "ERROR" == e && "FETCHEDIP" != e && "CDNDETECT" != e) {
                            var r = this;
                            T.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function (e) {
                                r._log("CDNDETECT", {
                                    flag: 0,
                                    error: "",
                                    eri: r.requestId
                                })
                            }, function (e) {
                                r._log("CDNDETECT", {
                                    flag: 1,
                                    error: e || "访问CDN错误",
                                    eri: r.requestId
                                })
                            })
                        }
                        var n = E.logReportTo;
                        i.e = p[e],
                            i.ri = this.sessionId,
                            i.t = (new Date).getTime(),
                            i.cdn_ip = this._userNetInfo.cdnIp,
                            i.hn = this._userNetInfo.localIp;
                        var o = this.player.getCurrentQuality();
                        "" != o && (i.definition = o.definition);
                        var a = [];
                        u.each(t, function (e, t) {
                            a.push(e + "=" + t)
                        });
                        var s = "",
                            l = this.player.getOptions();
                        l && l.vid && (s = l.vid),
                            a.push("vid=" + s);
                        try {
                            Aliplayer && Aliplayer.__logCallback__ && (i.args = a, Aliplayer.__logCallback__(i))
                        } catch (e) {
                            console.log(e)
                        }
                        "" == (a = a.join("&")) && (a = "0"),
                            i.args = encodeURIComponent(a);
                        var c = [];
                        return u.each(i, function (e, t) {
                            c.push(e + "=" + t)
                        }),
                            c = c.join("&"),
                            T.jsonp(n + "?" + c, function () {
                            }, function () {
                            }),
                            this.sessionId
                    }
                },
                _getUuid: function () {
                    var e = o.get("p_h5_u");
                    return e || (e = b.guid(), o.set("p_h5_u", e, 730)),
                        e
                }
            });
        t.exports = l
    },
        {
            "../config": 11,
            "../lib/cookie": 21,
            "../lib/data": 22,
            "../lib/io": 29,
            "../lib/object": 31,
            "../lib/oo": 32,
            "../lib/ua": 37,
            "../player/base/event/eventtype": 47
        }],
    44: [function (e, t, i) {
        var s = e("./base/player"),
            l = e("./flash/flashplayer"),
            c = e("./saas/mtsplayer"),
            u = e("./saas/vodplayer"),
            p = e("./taotv/taotvplayer"),
            d = e("./audio/audioplayer"),
            h = e("./hls/hlsplayer"),
            f = e("./flv/flvplayer"),
            v = e("../lib/ua"),
            y = e("../lib/playerutil"),
            g = (e("../lib/dom"), e("../lib/io"), e("../lang/index"));
        t.exports.create = function (e, t) {
            "function" != typeof t && (t = function () {
            }),
                e.readyCallback = t,
                g.setCurrentLanguage(e.language, "h5", e.languageTexts);
            var i = y.handleOption(e),
                r = i.source,
                n = y.isAudio(r);
            n && (i.height = "auto", i.mediaType = "audio");
            var o, a = y.createWrapper(i);
            return a.player ? a.player : (n ? o = new d(a, i) : !i.useFlashPrism && y.isFlv(r) && y.isSupportFlv() ? o = new f(a, i) : v.IS_MOBILE || !i.useFlashPrism && !y.isRTMP(r) ? i.vid && !i.source ? o = i.authInfo ? new c(a, i) : i.playauth || i.accessKeyId && i.accessKeySecret ? new u(a, i) : new p(a, i) : y.isHls(r) ? y.canPlayHls() ? o = y.isSupportHls() && (y.isUsedHlsPluginOnMobile() || y.isSafariUsedHlsPlugin(i.useHlsPluginForSafari)) ? new h(a, i) : new s(a, i) : y.isSupportHls() ? o = new h(a, i) : v.os.pc ? i.userH5Prism || i.useH5Prism || (o = new l(a, i)) : o = new s(a, i) : o = (v.os.pc, new s(a, i)) : o = new l(a, i), o)
        }
    },
        {
            "../lang/index": 17,
            "../lib/dom": 23,
            "../lib/io": 29,
            "../lib/playerutil": 34,
            "../lib/ua": 37,
            "./audio/audioplayer": 45,
            "./base/player": 66,
            "./flash/flashplayer": 72,
            "./flv/flvplayer": 74,
            "./hls/hlsplayer": 76,
            "./saas/mtsplayer": 79,
            "./saas/vodplayer": 85,
            "./taotv/taotvplayer": 94
        }],
    45: [function (e, t, i) {
        var r = e("../base/player"),
            n = e("../../ui/component"),
            o = e("../../lib/dom"),
            a = e("../../lib/object"),
            s = e("../../lib/playerutil"),
            l = r.extend({
                init: function (e, t) {
                    this._isAudio = !0,
                    void 0 === t.skinLayout && (t.skinLayout = s.defaultAudioLayout),
                        r.call(this, e, t)
                }
            });
        l.prototype.createEl = function () {
            "AUDIO" !== this.tag.tagName && (this._el = this.tag, this.tag = n.prototype.createEl.call(this, "audio"));
            var t = this._el,
                e = this.tag;
            e.player = this;
            var i = o.getElementAttributes(e);
            return a.each(i, function (e) {
                t.setAttribute(e, i[e])
            }),
                this.setVideoAttrs(),
            e.parentNode && e.parentNode.insertBefore(t, e),
                o.insertFirst(e, t),
                t
        },
            t.exports = l
    },
        {
            "../../lib/dom": 23,
            "../../lib/object": 31,
            "../../lib/playerutil": 34,
            "../../ui/component": 95,
            "../base/player": 66
        }],
    46: [function (e, t, i) {
        var a = e("../../../lib/event"),
            s = e("./eventtype"),
            r = e("../eventHandler/video/index"),
            n = e("../eventHandler/player/index");
        t.exports.offAll = function (e) {
            var t = e.tag,
                i = e._el;
            for (var r in s.Video)
                a.off(t, s.Video[r]);
            for (var n in s.Player)
                a.off(i, s.Player[n]);
            for (var o in s.Private)
                a.off(i, s.Private[o])
        },
            t.exports.onAll = function (e) {
                r.bind(e),
                    n.bind(e)
            }
    },
        {
            "../../../lib/event": 24,
            "../eventHandler/player/index": 51,
            "../eventHandler/video/index": 60,
            "./eventtype": 47
        }],
    47: [function (e, t, i) {
        t.exports = {
            Video: {
                TimeUpdate: "timeupdate",
                Play: "play",
                playing: "playing",
                Pause: "pause",
                CanPlay: "canplay",
                Waiting: "waiting",
                Ended: "ended",
                Error: "error",
                Suspend: "suspend",
                Stalled: "stalled",
                LoadStart: "loadstart",
                DurationChange: "durationchange",
                LoadedData: "loadeddata",
                LoadedMetadata: "loadedmetadata",
                Progress: "progress",
                CanPlayThrough: "canplaythrough",
                ContextMenu: "contextmenu",
                Seeking: "seeking",
                Seeked: "seeked"
            },
            Player: {
                TimeUpdate: "timeupdate",
                DurationChange: "durationchange",
                Init: "init",
                Ready: "ready",
                Play: "play",
                Pause: "pause",
                CanPlay: "canplay",
                Waiting: "waiting",
                Ended: "ended",
                Error: "error",
                RequestFullScreen: "requestFullScreen",
                CancelFullScreen: "cancelFullScreen",
                Snapshoted: "snapshoted",
                Snapshoting: "snapshoting",
                OnM3u8Retry: "onM3u8Retry",
                LiveStreamStop: "liveStreamStop",
                AutoPlayPrevented: "autoPlayPrevented",
                StartSeek: "startSeek",
                CompleteSeek: "completeSeek",
                TextTrackReady: "textTrackReady",
                AudioTrackReady: "audioTrackReady",
                AudioTrackUpdated: "audioTrackUpdated",
                LevelsLoaded: "levelsLoaded",
                AudioTrackSwitch: "audioTrackSwitch",
                AudioTrackSwitched: "audioTrackSwitched",
                LevelSwitch: "levelSwitch",
                LevelSwitched: "levelSwitched"
            },
            Private: {
                Play_Btn_Show: "play_btn_show",
                UiH5Ready: "uiH5Ready",
                Error_Hide: "error_hide",
                Error_Show: "error_show",
                Info_Show: "info_show",
                Info_Hide: "info_hide",
                H5_Loading_Show: "h5_loading_show",
                H5_Loading_Hide: "h5_loading_hide",
                HideProgress: "hideProgress",
                CancelHideProgress: "cancelHideProgress",
                Click: "click",
                MouseOver: "mouseover",
                MouseOut: "mouseout",
                MouseEnter: "mouseenter",
                MouseLeave: "mouseleave",
                TouchStart: "touchstart",
                TouchMove: "touchmove",
                TouchEnd: "touchend",
                HideBar: "hideBar",
                ShowBar: "showBar",
                ReadyState: "readyState",
                SourceLoaded: "sourceloaded",
                QualityChange: "qualitychange",
                Play_Btn_Hide: "play_btn_hide",
                Cover_Hide: "cover_hide",
                Cover_Show: "cover_show",
                SeekStart: "seekStart",
                EndStart: "endStart",
                UpdateProgressBar: "updateProgressBar",
                LifeCycleChanged: "lifeCycleChanged",
                Dispose: "dispose",
                Created: "created",
                Snapshot_Hide: "snapshot_hide",
                AutoStreamShow: "auto_stream_show",
                AutoStreamHide: "auto_stream_hide",
                VolumnChanged: "volumnchanged",
                LiveShiftQueryCompleted: "liveShiftQueryCompleted",
                StreamSelectorHide: "streamSelectorHide",
                SpeedSelectorHide: "speedSelectorHide",
                SettingShow: "settingShow",
                SettingHide: "settingHide",
                SelectorShow: "selectorShow",
                SelectorHide: "selectorHide",
                SettingListShow: "settingListShow",
                SettingListHide: "settingListHide",
                ThumbnailHide: "thumbnailHide",
                ThumbnailShow: "thumbnailShow",
                ThumbnailLoaded: "thumbnailLoaded",
                TooltipShow: "tooltipShow",
                TooltipHide: "tooltipHide",
                SelectorUpdateList: "selectorUpdateList",
                SelectorValueChange: "selectorValueChange",
                VolumeVisibilityChange: "volumeVisibilityChange",
                ChangeURL: "changeURL",
                UpdateToSettingList: "updateToSettingList",
                CCChanged: "CCChanged",
                CCStateChanged: "CCStateChanged",
                PlayClick: "click"
            }
        }
    },
        {}],
    48: [function (e, t, i) {
        e("../../event/eventtype");
        var r = e("../../../../lib/dom"),
            n = e("../../../../lib/ua");
        t.exports.handle = function () {
            n.IS_IOS || r.removeClass(this.el(), "prism-fullscreen")
        }
    },
        {
            "../../../../lib/dom": 23,
            "../../../../lib/ua": 37,
            "../../event/eventtype": 47
        }],
    49: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            e.paramData.notPlay || this.play(),
                this._seeking = !1,
                this.trigger(r.Player.CompleteSeek, e.paramData.toTime)
        }
    },
        {
            "../../event/eventtype": 47
        }],
    50: [function (e, t, i) {
        var r = e("../../event/eventtype");
        e("../../../../lib/constants"),
            e("../../../../lang/index");
        t.exports.handle = function (e) {
            var t = this,
                i = e.paramData;
            t.trigger(r.Private.H5_Loading_Hide),
                t.trigger(r.Private.Cover_Hide),
                t.trigger(r.Private.Play_Btn_Hide),
                t.trigger(r.Private.SettingListHide),
                t.trigger(r.Private.SelectorHide),
                t.trigger(r.Private.VolumeVisibilityChange, ""),
                i = i || {},
            t._monitor && (i.uuid = t._monitor._getUuid(), i.requestId = t._serverRequestId, i.cdnIp = t._monitor._userNetInfo.cdnIp, i.localIp = t._monitor._userNetInfo.localIp),
                t._isError = !0,
                t.trigger(r.Private.Error_Show, i),
                t.trigger(r.Private.LifeCycleChanged, {
                    type: r.Player.Error,
                    data: i
                })
        }
    },
        {
            "../../../../lang/index": 17,
            "../../../../lib/constants": 20,
            "../../event/eventtype": 47
        }],
    51: [function (e, t, i) {
        var r = e("../../event/eventtype"),
            n = e("../../../../lib/event"),
            o = e("./lifecyclecommon"),
            a = {
                endStart: e("./endstart"),
                seekStart: e("./seekstart"),
                requestFullScreen: e("./requestfullscreen"),
                cancelFullScreen: e("./cancelfullscreen"),
                error: e("./error")
            },
            s = [r.Private.EndStart, r.Private.SeekStart, r.Player.RequestFullScreen, r.Player.CancelFullScreen, r.Player.Error, r.Player.Ready, r.Private.Dispose, r.Private.Created],
            l = function (t, i, r) {
                var e = t.el();
                n.on(e, i, function (e) {
                    (r && r.handle ? r.handle : o.handle).call(t, e, i)
                })
            };
        t.exports.bind = function (e) {
            e.el();
            for (var t = 0; t < s.length; t++) {
                var i = s[t];
                "undefined" != a[i] && l(e, i, a[i])
            }
        }
    },
        {
            "../../../../lib/event": 24,
            "../../event/eventtype": 47,
            "./cancelfullscreen": 48,
            "./endstart": 49,
            "./error": 50,
            "./lifecyclecommon": 52,
            "./requestfullscreen": 53,
            "./seekstart": 54
        }],
    52: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e, t) {
            this.trigger(r.Private.LifeCycleChanged, {
                type: t,
                data: e
            })
        }
    },
        {
            "../../event/eventtype": 47
        }],
    53: [function (e, t, i) {
        e("../../event/eventtype");
        var r = e("../../../../lib/dom"),
            n = e("../../../../lib/ua");
        t.exports.handle = function () {
            n.IS_IOS || r.addClass(this.el(), "prism-fullscreen")
        }
    },
        {
            "../../../../lib/dom": 23,
            "../../../../lib/ua": 37,
            "../../event/eventtype": 47
        }],
    54: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            this._seeking = !0,
                this.trigger(r.Player.StartSeek, e.paramData.fromTime)
        }
    },
        {
            "../../event/eventtype": 47
        }],
    55: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            var t = this;
            t._retrySwitchUrlCount = 0,
                t._liveRetryCount = 0,
                t._clearLiveErrorHandle();
            var i = (new Date).getTime() - t.readyTime;
            t.trigger(r.Player.CanPlay, {
                loadtime: i
            })
        }
    },
        {
            "../../event/eventtype": 47
        }],
    56: [function (e, t, i) {
        var r = e("../../event/eventtype"),
            n = e("../../../../lib/dom"),
            o = e("../../../../lib/ua");
        t.exports.handle = function (e) {
            this.trigger(r.Private.Cover_Hide);
            var t = this.tag;
            "none" === t.style.display && o.IS_IOS && setTimeout(function () {
                n.css(t, "display", "block")
            }, 100),
                this.trigger(r.Video.CanPlayThrough)
        }
    },
        {
            "../../../../lib/dom": 23,
            "../../../../lib/ua": 37,
            "../../event/eventtype": 47
        }],
    57: [function (e, t, i) {
        t.exports.handle = function (e, t) {
            var i = "";
            e && e.paramData && (i = e.paramData),
                this.trigger(t, i)
        }
    },
        {}],
    58: [function (e, t, i) {
        var r = e("../../event/eventtype");
        e("../../../../lang/index");
        t.exports.handle = function (e) {
            var t = this;
            t.waiting = !1,
                t._options.rePlay ? (t.seek(0), t.tag.play()) : t._options.isLive && t.trigger(r.Private.H5_Loading_Hide),
                t.trigger(r.Player.Ended)
        }
    },
        {
            "../../../../lang/index": 17,
            "../../event/eventtype": 47
        }],
    59: [function (e, t, i) {
        var u = e("../../event/eventtype"),
            p = (e("../../../../lib/ua"), e("../../../../lib/playerutil"), e("../../../../lib/constants")),
            d = e("../../../../lang/index");
        t.exports.handle = function (e) {
            var t = this;
            if (t.waiting = !1, t._checkTimeoutHandle && clearTimeout(t._checkTimeoutHandle), t.checkOnline()) {
                var i, r = "",
                    n = e.target || e.srcElement,
                    o = n.error.message;
                r = "";
                if (n.error.code && (i = n.error.code, r = p.VideoErrorCode[n.error.code], o = i + " || " + o), t._options.isLive) t._options.liveRetry > t._liveRetryCount ? t._reloadAndPlayForM3u8() : (t._liveRetryCount = 0, t.trigger(u.Player.LiveStreamStop), t._liveErrorHandle = setTimeout(function () {
                    var e = {
                        mediaId: "ISLIVE",
                        error_code: r,
                        error_msg: d.get("Error_Play_Text") + "，" + d.get("Error_Retry_Text")
                    };
                    t.logError(e),
                        t.trigger("error", e)
                }, 500));
                else {
                    var a = d.get("Error_Play_Text"),
                        s = !1;
                    if (i < 4) {
                        if (3 == i && t._firstDecodeError) {
                            var l = t.getCurrentTime();
                            return t._loadByUrlInner(t._options.source, l, !0),
                                void (t._firstDecodeError = !1)
                        }
                        a = p.VideoErrorCodeText[i]
                    } else t._eventState == p.SUSPEND ? (a = d.get("Error_Load_Abort_Text"), r = p.ErrorCode.RequestDataError) : t._eventState == p.LOAD_START ? (a = d.get("Error_Network_Text"), 0 < t._options.source.indexOf("auth_key") && (a = a + "，" + d.get("Error_AuthKey_Text")), r = p.ErrorCode.StartLoadData) : t._eventState == p.LOADED_METADATA && (a = d.get("Error_Play_Text"), r = p.ErrorCode.PlayingError);
                    a = a + "，" + d.get("Error_Retry_Text"),
                    1 < t._urls.length && t._retrySwitchUrlCount < 3 && -1 == t._options.source.indexOf(".mpd") && (t.switchUrl(), s = !0);
                    var c = {
                        mediaId: t._options.vid ? t._options.vid : "",
                        error_code: r,
                        error_msg: o
                    };
                    t.logError(c),
                        c.display_msg = a,
                    s || t.trigger(u.Player.Error, c)
                }
            }
        }
    },
        {
            "../../../../lang/index": 17,
            "../../../../lib/constants": 20,
            "../../../../lib/playerutil": 34,
            "../../../../lib/ua": 37,
            "../../event/eventtype": 47
        }],
    60: [function (e, t, i) {
        var n = e("../../../../lib/event"),
            o = e("../../event/eventtype"),
            r = {
                canplay: e("./canplay"),
                canplaythrough: e("./canplaythrough"),
                common: e("./common"),
                ended: e("./ended"),
                error: e("./error"),
                pause: e("./pause"),
                play: e("./play"),
                playing: e("./playing"),
                waiting: e("./waiting"),
                timeupdate: e("./timeupdate")
            },
            a = function (t, i, r) {
                var e = t.tag;
                n.on(e, i, function (e) {
                    r.handle.call(t, e, i),
                    i != o.Video.Error && t.trigger(o.Private.LifeCycleChanged, {
                        type: i,
                        data: e
                    })
                })
            };
        t.exports.bind = function (e) {
            e.tag;
            for (var t in o.Video) {
                var i = o.Video[t];
                a(e, i, void 0 !== r[i] ? r[i] : r.common)
            }
        }
    },
        {
            "../../../../lib/event": 24,
            "../../event/eventtype": 47,
            "./canplay": 55,
            "./canplaythrough": 56,
            "./common": 57,
            "./ended": 58,
            "./error": 59,
            "./pause": 61,
            "./play": 62,
            "./playing": 63,
            "./timeupdate": 64,
            "./waiting": 65
        }],
    61: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            var t = this;
            t._checkTimeoutHandle && clearTimeout(t._checkTimeoutHandle),
                t.trigger(r.Private.AutoStreamHide),
                t.trigger(r.Player.Pause),
                t.waiting = !1
        }
    },
        {
            "../../event/eventtype": 47
        }],
    62: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            var t = this;
            t.trigger(r.Private.Error_Hide),
                t.trigger(r.Private.Cover_Hide),
                t.trigger(r.Private.AutoStreamHide),
                t.waiting = !1,
                t.trigger(r.Player.Play)
        }
    },
        {
            "../../event/eventtype": 47
        }],
    63: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            var t = this;
            t.trigger(r.Private.H5_Loading_Hide),
                t.trigger(r.Private.Cover_Hide),
                t.trigger(r.Private.Info_Hide),
                t.waiting = !1,
                t._liveRetryCount = 0,
                t._firstDecodeError = !0,
            t._checkTimeoutHandle && clearTimeout(t._checkTimeoutHandle),
            t._waitingTimeoutHandle && clearTimeout(t._waitingTimeoutHandle),
                t.trigger(r.Private.AutoStreamHide),
                t.trigger(r.Player.Playing),
                t.trigger(r.Private.Play_Btn_Hide),
                t.trigger(r.Private.Error_Hide)
        }
    },
        {
            "../../event/eventtype": 47
        }],
    64: [function (e, t, i) {
        var r = e("../../event/eventtype");
        t.exports.handle = function (e) {
            var t = this;
            t.trigger(r.Player.TimeUpdate, e.timeStamp);
            var i = this.getCurrentTime();
            t.waiting && !t._TimeUpdateStamp && (t._TimeUpdateStamp = i),
            0 != t.waiting && t._TimeUpdateStamp == i || (t.trigger(r.Private.H5_Loading_Hide), t.trigger(r.Private.AutoStreamHide), t._checkTimeoutHandle && clearTimeout(t._checkTimeoutHandle), t._waitingTimeoutHandle && clearTimeout(t._waitingTimeoutHandle), t.waiting = !1),
                t._TimeUpdateStamp = i
        }
    },
        {
            "../../event/eventtype": 47
        }],
    65: [function (e, t, i) {
        var r = e("../../event/eventtype"),
            n = e("../../../../lib/constants"),
            o = e("../../../../lang/index");
        t.exports.handle = function (e) {
            var t = this;
            t.trigger(r.Private.H5_Loading_Show),
                t.waiting = !0;
            var i = function () {
                t._checkTimeoutHandle && clearTimeout(t._checkTimeoutHandle),
                t._waitingTimeoutHandle && clearTimeout(t._waitingTimeoutHandle)
            };
            i(),
                t._TimeUpdateStamp = null,
                t._checkTimeoutHandle = setTimeout(function () {
                    t.trigger(r.Private.AutoStreamShow)
                }, 1e3 * t._options.loadDataTimeout),
                t.trigger(r.Player.Waiting),
                t._waitingTimeoutHandle = setTimeout(function () {
                    t.pause();
                    var e = {
                        mediaId: t._options.vid ? t._options.vid : "",
                        error_code: n.ErrorCode.LoadingTimeout,
                        error_msg: o.get("Error_Waiting_Timeout_Text")
                    };
                    t.logError(e),
                        t.trigger("error", e)
                }, 1e3 * t._options.waitingTimeout),
                t.on("error", function () {
                    i()
                })
        }
    },
        {
            "../../../../lang/index": 17,
            "../../../../lib/constants": 20,
            "../../event/eventtype": 47
        }],
    66: [function (e, t, i) {
        var o = e("../../ui/component"),
            a = e("../../lib/object"),
            n = e("../../lib/dom"),
            s = e("../../lib/event"),
            l = (e("../../lib/io"), e("../../ui/exports")),
            c = (e("../../ui/component/error-display"), e("../../ui/component/info-display"), e("../../monitor/monitor")),
            r = e("../../lib/ua"),
            u = e("../../lib/constants"),
            p = e("../../lib/util"),
            d = (e("../../config"), e("../../lib/playerutil")),
            h = e("./x5play"),
            f = e("../../lib/cookie"),
            v = e("../../lang/index"),
            y = e("../../feature/autoPlayDelay"),
            g = e("./event/eventmanager"),
            _ = e("../../ui/component/cover"),
            m = e("../../ui/component/play-animation"),
            S = e("../../commonui/autostreamselector"),
            b = e("./event/eventtype"),
            T = e("./plugin/lifecyclemanager"),
            x = (e("../service/fullscreenservice"), e("../service/liveshiftservice"), e("../service/ailabelservice"), e("../service/audiotrackservice"), e("../service/ccservice"), e("../service/export")),
            E = o.extend({
                init: function (e, t) {
                    if (this.tag = e, this.loaded = !1, this.played = !1, this.waiting = !1, this._urls = [], this._currentPlayIndex = 0, this._retrySwitchUrlCount = 0, this._isError = !1, this._isHls = !1, this._liveRetryCount = 0, this._seeking = !1, this._serverRequestId = 0, this._created = !1, this._firstDecodeError = !0, void 0 === t.skinLayout && (t.skinLayout = d.defaultH5Layout), o.call(this, this, t), this.addClass("prism-player"), t.plugins && a.each(t.plugins, function (e, t) {
                        this[e](t)
                    }, this), this._createService(), this.UI = {}, t.useNativeControls ? this.tag.setAttribute("controls", "controls") : this.UI = l, this.initChildren(), g.onAll(this), this._lifeCycleManager = new T(this), this._monitor = new c(this, {
                        video_id: 0,
                        album_id: 0,
                        from: this._options.from,
                        source: this._options.source
                    }, this._options.trackLog), this.checkOnline()) if (this._overrideNativePlay(), !this._liveshiftService || this._liveshiftService.validate()) {
                        if (this._extraMultiSources(), this._options.source) if (this._options.autoPlayDelay) {
                            this._autoPlayDelay = new y(this);
                            var i = this;
                            this._autoPlayDelay.handle(function () {
                                i.initPlay()
                            })
                        } else this.initPlay();
                        if (this._options.extraInfo) {
                            var r = this._options.extraInfo;
                            r.liveRetry && (this._options.liveRetry = r.liveRetry)
                        }
                        this.on(b.Private.ReadyState, function () {
                            this.trigger(b.Player.Ready)
                        }),
                        !this._options.source && this._options.vid || this._options.readyCallback(this)
                    } else {
                        var n = {
                            mediaId: this._options.vid ? this._options.vid : "",
                            error_code: u.ErrorCode.InvalidParameter,
                            error_msg: v.get("ShiftLiveTime_Error")
                        };
                        this.trigger(b.Player.Error, n)
                    }
                }
            });
        E.prototype.initPlay = function (e) {
            this._initPlayBehavior(e, this._options.source)
        },
            E.prototype.initChildren = function () {
                var e = this.options(),
                    t = e.skinLayout;
                if (!1 !== t && !a.isArray(t)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");
                !1 !== t && 0 !== t.length && (this.options({
                    children: t
                }), o.prototype.initChildren.call(this)),
                e.preload || e.autoplay || (this.UI.cover = _, this.addChild("cover", e)),
                    this.UI.playanimation = m,
                    this.addChild("playanimation", e),
                    this.UI.autoStreamSelector = S,
                    this.addChild("autoStreamSelector", e),
                    this.trigger(b.Private.UiH5Ready)
            },
            E.prototype.createEl = function () {
                var e = !1;
                "VIDEO" !== this.tag.tagName ? (this._el = this.tag, this.tag = o.prototype.createEl.call(this, "video"), this._options.playsinline && (this.tag.setAttribute("webkit-playsinline", ""), this.tag.setAttribute("playsinline", ""), this.tag.setAttribute("x-webkit-airplay", ""))) : (e = !0, this._el = this.tag.parentNode);
                var t = this._el,
                    i = this.tag;
                this._options.enableSystemMenu || (i.addEventListener ? i.addEventListener("contextmenu", function (e) {
                    e.preventDefault()
                }, !1) : i.attachEvent("oncontextmenu", function () {
                    window.event.returnValue = !1
                })),
                    i.player = this;
                var r = n.getElementAttributes(i);
                return a.each(r, function (e) {
                    t.setAttribute(e, r[e])
                }),
                    this.setVideoAttrs(),
                e || (i.parentNode && i.parentNode.insertBefore(t, i), n.insertFirst(i, t)),
                    t
            },
            E.prototype.setVideoAttrs = function () {
                var e = this._options.preload,
                    t = this._options.autoplay;
                if (this.tag.style.width = this._options.videoWidth || "100%", this.tag.style.height = this._options.videoHeight || "100%", e && this.tag.setAttribute("preload", "preload"), t && !this._isEnabledAILabel() && this.tag.setAttribute("autoplay", "autoplay"), this._options.extraInfo) for (var i in this._options.extraInfo) this.tag.setAttribute(i, this._options.extraInfo[i]);
                h.adaptX5Play(this)
            },
            E.prototype.checkOnline = function () {
                if (this._options.debug) return !0;
                if (0 == navigator.onLine) {
                    var e = {
                        mediaId: this._options.vid ? this._options.vid : "",
                        error_code: u.ErrorCode.NetworkUnavaiable,
                        error_msg: v.get("Error_Offline_Text")
                    };
                    return this.logError(e),
                        e.display_msg = v.get("Error_Offline_Text"),
                        this.trigger(b.Player.Error, e),
                        !1
                }
                return !0
            },
            E.prototype.id = function () {
                return this.el().id
            },
            E.prototype.renderUI = function () {
            },
            E.prototype.switchUrl = function () {
                if (0 != this._urls.length) {
                    this._currentPlayIndex = this._currentPlayIndex + 1,
                    this._urls.length <= this._currentPlayIndex && (this._currentPlayIndex = 0, this._retrySwitchUrlCount++);
                    var e = this._urls[this._currentPlayIndex];
                    f.set(u.SelectedStreamLevel, e.definition, 365),
                        this.trigger(b.Private.QualityChange, v.get("Quality_Change_Fail_Switch_Text"));
                    this.getCurrentTime();
                    this._options.source = e.Url,
                        this.tag.setAttribute("src", this._options.source),
                        this.tag.play()
                }
            },
            E.prototype.setControls = function () {
                var e = this.options();
                if (e.useNativeControls) this.tag.setAttribute("controls", "controls");
                else if ("object" == typeof e.controls) {
                    var t = this._initControlBar(e.controls);
                    this.addChild(t)
                }
            },
            E.prototype._initControlBar = function (e) {
                return new ControlBar(this, e)
            },
            E.prototype.getMetaData = function () {
                var t = this,
                    i = null,
                    r = this.tag;
                i = window.setInterval(function (e) {
                    if (t.tag) {
                        if (0 < r.readyState) {
                            t._duration = r.duration;
                            Math.round(r.duration);
                            t.trigger(b.Private.ReadyState),
                                clearInterval(i)
                        }
                    } else clearInterval(i)
                }, 100)
            },
            E.prototype.getReadyTime = function () {
                return this.readyTime
            },
            E.prototype.readyState = function () {
                return this.tag.readyState
            },
            E.prototype.getError = function () {
                return this.tag.error
            },
            E.prototype.getRecentOccuredEvent = function () {
                return this._eventState
            },
            E.prototype.getSourceUrl = function () {
                return this._options ? this._options.source : ""
            },
            E.prototype.getMonitorInfo = function () {
                return this._monitor ? this._monitor.opt : {}
            },
            E.prototype.getCurrentQuality = function () {
                if (0 < this._urls.length) {
                    var e = this._urls[this._currentPlayIndex];
                    return {
                        width: e.width,
                        url: e.Url,
                        definition: e.definition
                    }
                }
                return ""
            },
            E.prototype.setSpeed = function (e) {
                this.tag && (this._originalPlaybackRate = e, this.tag.playbackRate = e)
            },
            E.prototype.play = function () {
                return (this._options.preload || this.loaded) && this.tag.src || this._initLoad(this._options.source),
                    this.trigger(b.Private.Cover_Hide),
                    this.tag.play(),
                    this
            },
            E.prototype.replay = function () {
                return this.seek(0),
                    this.tag.play(),
                    this
            },
            E.prototype.pause = function () {
                return this.tag.pause(),
                    this
            },
            E.prototype.stop = function () {
                return this.tag.setAttribute("src", null),
                    this
            },
            E.prototype.paused = function () {
                return !1 !== this.tag.paused
            },
            E.prototype.getDuration = function () {
                var e = 0;
                return this.tag && (e = this.tag.duration),
                    e
            },
            E.prototype.getCurrentTime = function () {
                return this.tag ? this.tag.currentTime : 0
            },
            E.prototype.seek = function (e) {
                e === this.tag.duration && e--;
                var t = this._originalPlaybackRate || this.tag.playbackRate;
                try {
                    var i = this;
                    this.tag.currentTime = e,
                        setTimeout(function () {
                            i.tag.playbackRate = t
                        })
                } catch (e) {
                    console.log(e)
                }
                return this
            },
            E.prototype.firstNewUrlloadByUrl = function (e, t) {
                this._clearLiveErrorHandle(),
                    this._options.vid = 0,
                    this._options.source = e,
                this._monitor && this._monitor.updateVideoInfo({
                    video_id: 0,
                    album_id: 0,
                    source: e,
                    from: this._options.from
                }),
                    this.trigger(b.Private.ChangeURL),
                    this.initPlay(),
                (this._options.preload || this._options.autoplay) && this.trigger(b.Private.Cover_Hide),
                    this._options.autoplay ? this.trigger(b.Player.Play) : this.trigger(b.Player.Pause),
                t || (t = 0),
                !t && 0 != t || isNaN(t) || this.seek(t)
            },
            E.prototype._loadByUrlInner = function (e, t, i) {
                this.loadByUrl(e, t, i, !0)
            },
            E.prototype.loadByUrl = function (e, t, i, r) {
                this._clearLiveErrorHandle(),
                    this.trigger(b.Private.Error_Hide),
                    this._options.vid = 0,
                    this._options.source = e,
                this._monitor && this._monitor.updateVideoInfo({
                    video_id: 0,
                    album_id: 0,
                    source: e,
                    from: this._options.from
                }),
                r || this.trigger(b.Private.ChangeURL),
                    this._options._autoplay = i,
                    this.initPlay(i),
                (this._options.preload || this._options.autoplay) && this.trigger(b.Private.Cover_Hide),
                    this._options.autoplay || i ? this.trigger(b.Player.Play) : this.trigger(b.Player.Pause);
                var n = this;
                this._options.isLive || s.one(this.tag, b.Video.CanPlay, function (e) {
                    !t && 0 != t || isNaN(t) || n.seek(t)
                })
            },
            E.prototype.dispose = function () {
                this.trigger(b.Private.Dispose),
                    this.tag.pause(),
                    g.offAll(this),
                    this.tag = null,
                    this._options.recreatePlayer = null,
                    this._options = null,
                this._monitor && (this._monitor.removeEvent(), this._monitor = null),
                    this._el.innerHTML = "",
                this._autoPlayDelay && this._autoPlayDelay.dispose(),
                    this.destroy()
            },
            E.prototype.mute = function () {
                this._muteInner(),
                    this._originalVolumn = this.tag.volume;
                var e = v.get("Volume_Mute");
                return this._player.trigger(b.Private.Info_Show, {
                    text: e,
                    duration: 1e3,
                    align: "lb"
                }),
                    this._setInnerVolume(0),
                    this
            },
            E.prototype._muteInner = function () {
                this.tag.muted = !0,
                    this.trigger(b.Private.VolumnChanged, -1)
            },
            E.prototype.unMute = function () {
                this._unMuteInner();
                var e = v.get("Volume_UnMute");
                return this._player.trigger(b.Private.Info_Show, {
                    text: e,
                    duration: 1e3,
                    align: "lb"
                }),
                    this._setInnerVolume(this._originalVolumn || .5),
                    this
            },
            E.prototype._unMuteInner = function () {
                this.tag.muted = !1,
                    this.trigger(b.Private.VolumnChanged, -2)
            },
            E.prototype.muted = function () {
                return this.tag.muted
            },
            E.prototype.getVolume = function () {
                return this.tag.volume
            },
            E.prototype.getOptions = function () {
                return this._options
            },
            E.prototype.setVolume = function (e, t) {
                0 != e ? this._unMuteInner() : 0 == e && this._muteInner(),
                    this._setInnerVolume(e);
                var i = v.get("Curent_Volume") + "<span>" + (100 * e).toFixed() + "%</span>";
                this._player.trigger(b.Private.Info_Show, {
                    text: i,
                    duration: 1e3,
                    align: "lb"
                })
            },
            E.prototype._setInnerVolume = function (e) {
                this.tag.volume = e,
                    this.trigger(b.Private.VolumnChanged, e)
            },
            E.prototype.hideProgress = function () {
                this.trigger(b.Private.HideProgress)
            },
            E.prototype.cancelHideProgress = function () {
                this.trigger(b.Private.CancelHideProgress)
            },
            E.prototype.setPlayerSize = function (e, t) {
                this._el.style.width = e,
                    this._el.style.height = t
            },
            E.prototype.getBuffered = function () {
                return this.tag.buffered
            },
            E.prototype.setRotate = function (e) {
                this.tag && (this._rotate = e, this._setTransform())
            },
            E.prototype.getRotate = function (e) {
                return void 0 === this._rotate ? 0 : this._rotate
            },
            E.prototype.setImage = function (e) {
                this.tag && (this._image = e, this._setTransform())
            },
            E.prototype.getImage = function () {
                return this._image
            },
            E.prototype.cancelImage = function () {
                this.tag && (this._image = "", this._setTransform())
            },
            E.prototype._setTransform = function () {
                this._transformProp || (this._transformProp = n.getTransformName(this.tag));
                var e = " translate(-50%, -50%)";
                this._rotate && (e += " rotate(" + this._rotate + "deg)"),
                this._image && ("vertical" == this._image ? e += " scaleY(-1)" : "horizon" == this._image && (e += " scaleX(-1)")),
                    this.tag.style[this._transformProp] = e
            },
            E.prototype._startPlay = function () {
                if (this._aiLabelService) {
                    var e = this;
                    this.trigger(b.Private.H5_Loading_Show),
                        this.trigger(b.Private.Play_Btn_Hide),
                        this.one("canplay", function () {
                            e._aiLabelService.startMeta()
                        })
                } else this.tag.paused && this.tag.play()
            },
            E.prototype._initPlayBehavior = function (e, t) {
                if (this._checkSupportVideoType()) return !1;
                if (!d.validateSource(t)) {
                    var i = {
                        mediaId: this._options.vid ? this._options.vid : "",
                        error_code: u.ErrorCode.InvalidSourceURL,
                        error_msg: "InvalidSourceURL"
                    };
                    return this.logError(i),
                        i.display_msg = v.get("Error_Invalidate_Source"),
                        this.trigger(b.Player.Error, i),
                        !1
                }
                return this.trigger(b.Private.H5_Loading_Hide),
                void 0 === e && (e = !1),
                this._created || (this._created = !0, this.trigger(b.Private.Created)),
                this.loaded || this.trigger(b.Player.Init),
                (this._options.autoplay || this._options.preload || e) && (this._initLoad(t), this._options.autoplay || this._options._autoplay ? this._startPlay() : this.trigger(b.Private.Play_Btn_Show)),
                    !0
            },
            E.prototype._initLoad = function (e) {
                this._options.autoplay && this.trigger(b.Private.H5_Loading_Show),
                    this.getMetaData(),
                e && this.tag.setAttribute("src", e),
                    this.loaded = !0
            },
            E.prototype._clearLiveErrorHandle = function () {
                this._liveErrorHandle && clearTimeout(this._liveErrorHandle)
            },
            E.prototype._reloadAndPlayForM3u8 = function () {
                0 == this._liveRetryCount && this.trigger(b.Player.OnM3u8Retry);
                var e = this._options,
                    t = e.liveRetryInterval + e.liveRetryStep * this._liveRetryCount;
                p.sleep(1e3 * t),
                    this._liveRetryCount++,
                    this.tag.load(this._options.source),
                    this.tag.play()
            },
            E.prototype._checkSupportVideoType = function () {
                if (!this.tag.canPlayType || !this._options.source || !r.IS_MOBILE) return "";
                var e = this._options.source,
                    t = "";
                if (0 < e.indexOf("m3u8") ? "" != this.tag.canPlayType("application/x-mpegURL") || d.isSupportHls() || (t = v.get("Error_Not_Support_M3U8_Text")) : 0 < e.indexOf("mp4") ? "" == this.tag.canPlayType("video/mp4") && (t = v.get("Error_Not_Support_MP4_Text")) : (d.isRTMP(e) || d.isFlv(e)) && r.IS_MOBILE && (t = v.get("Error_Not_Support_Format_On_Mobile")), t) {
                    var i = {
                        mediaId: this._options.vid ? this._options.vid : "",
                        error_code: u.ErrorCode.FormatNotSupport,
                        error_msg: t
                    };
                    this.logError(i),
                        i.display_msg = t,
                        this.trigger(b.Player.Error, i)
                }
                return t
            },
            E.prototype.getComponent = function (e) {
                return this._lifeCycleManager.getComponent(e)
            },
            E.prototype.logError = function (e) {
                e || (e = {}),
                    e.vt = this.getCurrentTime(),
                    this._serverRequestId = this.log("ERROR", e)
            },
            E.prototype.log = function (e, t) {
                var i = 0,
                    r = 0;
                if (this._monitor) return this._options && (i = this._options.vid || "0", r = this._options.from || "0"),
                    this._monitor.updateVideoInfo({
                        video_id: i,
                        album_id: 0,
                        source: this._options.source,
                        from: r
                    }),
                    this._monitor._log(e, t)
            },
            E.prototype.setSanpshotProperties = function (e, t, i) {
                if (this._snapshotMatric || (this._snapshotMatric = {}), this._snapshotMatric.width = e, this._snapshotMatric.height = t, 1 < i) throw new Error("rate doesn't allow more than 1");
                this._snapshotMatric.rate = i
            },
            E.prototype.getStatus = function () {
                return this._status ? this._status : "init"
            },
            E.prototype._getSanpshotMatric = function () {
                return this._snapshotMatric || (this._snapshotMatric = {}),
                    this._snapshotMatric
            },
            E.prototype._overrideNativePlay = function () {
                var r = this.tag.play,
                    n = this;
                this.tag.play = function () {
                    if (!n._options.source) {
                        var e = {
                            mediaId: n._options.vid ? n._options.vid : "",
                            error_code: u.ErrorCode.InvalidSourceURL,
                            error_msg: "InvalidSourceURL"
                        };
                        return e.display_msg = v.get("Error_Invalidate_Source"),
                            void n.trigger(b.Player.Error, e)
                    }
                    n.readyTime = (new Date).getTime();
                    var t = r.apply(n.tag);
                    void 0 !== t && t["catch"](function (e) {
                        n.trigger(b.Private.Play_Btn_Show),
                            n.trigger(b.Private.H5_Loading_Hide),
                            n.trigger(b.Player.AutoPlayPrevented)
                    }).then(function () {
                    });
                    var i = n._originalPlaybackRate || n.tag.playbackRate;
                    setTimeout(function () {
                        n.tag.playbackRate = i
                    })
                }
            },
            E.prototype._extraMultiSources = function () {
                var e = this._options.source;
                if (e && -1 < e.indexOf("{") && -1 < e.indexOf("}")) {
                    var t = "";
                    try {
                        t = JSON.parse(e)
                    } catch (e) {
                        console.error(e),
                            console.error("地址json串格式不对")
                    }
                    var i = [];
                    for (var r in t) {
                        var n = u.QualityLevels[r];
                        i.push({
                            definition: r,
                            Url: t[r],
                            desc: n || r
                        })
                    }
                    if (0 < i.length) {
                        this._currentPlayIndex = d.findSelectedStreamLevel(i);
                        var o = i[this._currentPlayIndex];
                        this._urls = i,
                            this._options.source = o.Url,
                            this.trigger(b.Private.SourceLoaded, o)
                    }
                }
            },
            E.prototype._isEnabledAILabel = function () {
                return this._options.ai && this._options.ai.label
            },
            E.prototype._createService = function () {
                if (x) for (var e = x.length, t = 0; t < e; t++) {
                    var i = x[t],
                        r = i.condition;
                    void 0 === r ? r = !0 : "function" == typeof r && (r = r.call(this)),
                    r && (this[i.name] = new i.service(this))
                }
            },
            t.exports = E
    },
        {
            "../../commonui/autostreamselector": 8,
            "../../config": 11,
            "../../feature/autoPlayDelay": 13,
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/cookie": 21,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/io": 29,
            "../../lib/object": 31,
            "../../lib/playerutil": 34,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../monitor/monitor": 43,
            "../../ui/component": 95,
            "../../ui/component/cover": 101,
            "../../ui/component/error-display": 102,
            "../../ui/component/info-display": 105,
            "../../ui/component/play-animation": 107,
            "../../ui/exports": 126,
            "../service/ailabelservice": 86,
            "../service/audiotrackservice": 87,
            "../service/ccservice": 88,
            "../service/export": 89,
            "../service/fullscreenservice": 90,
            "../service/liveshiftservice": 91,
            "./event/eventmanager": 46,
            "./event/eventtype": 47,
            "./plugin/lifecyclemanager": 69,
            "./x5play": 71
        }],
    67: [function (e, t, i) {
        var r = e("../../../lib/oo").extend({});
        t.exports = r
    },
        {
            "../../../lib/oo": 32
        }],
    68: [function (e, t, i) {
        t.exports = {
            createEl: "createEl",
            created: "created",
            ready: "ready",
            loading: "loading",
            play: "play",
            pause: "pause",
            playing: "playing",
            waiting: "waiting",
            timeUpdate: "timeupdate",
            error: "error",
            ended: "ended",
            dispose: "dispose"
        }
    },
        {}],
    69: [function (e, t, i) {
        var c = e("../../../lib/object"),
            u = e("../event/eventtype"),
            p = e("./lifecycle"),
            r = e("./status"),
            n = function (t) {
                (this._player = t)._status = "init",
                    this.components = [];
                var e = t.getOptions().components;
                if (e && c.isArray(e) && 0 < e.length) for (var i = 0; i < e.length; i++) {
                    var r = e[i],
                        n = void 0 === r.type ? r : r.type,
                        o = void 0 === r.args ? [] : r.args,
                        a = void 0 === r.name ? "" : r.name;
                    o = o && 0 < o.length ? [].concat.call([n], o) : [];
                    var s = new (Function.prototype.bind.apply(n, o));
                    createEl = s[p.createEl],
                    createEl && "function" == typeof createEl && createEl.call(s, t.el()),
                        this.components.push({
                            name: a,
                            obj: s
                        })
                }
                var l = this;
                t.on(u.Private.LifeCycleChanged, function (e) {
                    0 != l.components.length && d.call(l, t, e)
                })
            };
        n.prototype.getComponent = function (e) {
            var t = null,
                i = this.components.length;
            if (e) for (var r = 0; r < i; r++) if (this.components[r].name == e) {
                t = this.components[r].obj;
                break
            }
            return t
        };
        var d = function (e, t) {
                if (t) {
                    var i, r = t.paramData,
                        n = r.type,
                        o = r.data;
                    ((i = n) == u.Video.LoadStart || i == u.Video.LoadedData || i == u.Video.LoadedMetadata) && (n = p.loading),
                        h(e, n);
                    for (var a = this.components.length, s = 0; s < a; s++) {
                        var l = this.components[s].obj,
                            c = l[n];
                        c && "function" == typeof c && c.call(l, e, o)
                    }
                    n == u.Private.Dispose && (this.components = [])
                }
            },
            h = function (e, t) {
                void 0 !== r[t] && (t != r.pause || e._status != r.error && e._status != r.ended) && (e._status = t)
            };
        t.exports = n
    },
        {
            "../../../lib/object": 31,
            "../event/eventtype": 47,
            "./lifecycle": 68,
            "./status": 70
        }],
    70: [function (e, t, i) {
        t.exports = {
            init: "init",
            ready: "ready",
            loading: "loading",
            play: "play",
            pause: "pause",
            playing: "playing",
            waiting: "waiting",
            error: "error",
            ended: "ended"
        }
    },
        {}],
    71: [function (e, t, i) {
        var r = e("../../lib/ua"),
            n = e("../../lib/dom"),
            o = function (e, t) {
                var i = e.el().style.height,
                    r = e.el().style.width;
                e.originalLayout = {
                    container: {
                        height: i,
                        width: r
                    },
                    video: {
                        width: e.tag.style.width,
                        height: e.tag.style.height
                    }
                };
                var n = document.body.clientHeight * (window.devicePixelRatio || 1) + "px",
                    o = document.body.clientWidth + "px";
                t ? (height = n, width = o) : (height = i.indexOf("%") ? i : i + "px", width = r.indexOf("%") ? r : r + "px"),
                    e.tag.style.width = o,
                    e.tag.style.height = n,
                    e.el().style.height = t ? n : height
            };
        t.exports.isAndroidX5 = function () {
            return r.os.android && r.is_X5 || r.dingTalk()
        },
            t.exports.adaptX5Play = function (e) {
                r.os.android && r.is_X5 && ("h5" == e._options.x5_type && (e.tag.setAttribute("x5-video-player-type", e._options.x5_type), window.onresize = function () {
                    o(e, e._options.x5_fullscreen || "center" == e._options.x5_video_position),

                        function (e) {
                            if ("landscape" == e._x5VideoOrientation) {
                                e._originalTagWidth = e.tag.style.width,
                                    e._originalTagHeight = e.tag.style.height;
                                var t = document.querySelector("#" + e.id() + " .prism-controlbar");
                                t && parseFloat(t.offsetHeight),
                                    e.tag.style.height = "100%",
                                    e.tag.style.width = window.screen.width + "px"
                            }
                        }(e)
                }, e.tag.addEventListener("x5videoenterfullscreen", function () {
                    o(e, e._options.x5_fullscreen || "center" == e._options.x5_video_position),
                        e.trigger("x5requestFullScreen")
                }), e.tag.addEventListener("x5videoexitfullscreen", function () {
                    !
                        function (e, t) {
                            if (e.originalLayout) {
                                var i = e.originalLayout;
                                e.el().style.height = i.container.height,
                                    e.el().style.width = i.container.width,
                                    e.tag.style.width = i.video.width,
                                    e.tag.style.height = i.video.height
                            }
                        }(e),
                        e.trigger("x5cancelFullScreen")
                }), e.on("requestFullScreen", function () {
                    "top" == e._options.x5_video_position && n.removeClass(e.tag, "x5-top-left"),
                    r.os.android && r.is_X5 && e._options.x5LandscapeAsFullScreen && (e.tag.setAttribute("x5-video-orientation", "landscape"), e._x5VideoOrientation = "landscape")
                }), e.on("cancelFullScreen", function () {
                    "top" == e._options.x5_video_position && n.addClass(e.tag, "x5-top-left"),
                    r.os.android && r.is_X5 && e._options.x5LandscapeAsFullScreen && (e.tag.setAttribute("x5-video-orientation", "portrait"), o(e, e._options.x5_fullscreen || "center" == e._options.x5_video_position), e._x5VideoOrientation = "portrait")
                })), void 0 !== e._options.x5_fullscreen && e._options.x5_fullscreen && (e.tag.setAttribute("x5-video-player-fullscreen", e._options.x5_fullscreen), n.addClass(e.tag, "x5-full-screen")), "top" == e._options.x5_video_position && n.addClass(e.tag, "x5-top-left"), void 0 !== e._options.x5_orientation && e.tag.setAttribute("x5-video-orientation", e._options.x5_orientation))
            }
    },
        {
            "../../lib/dom": 23,
            "../../lib/ua": 37
        }],
    72: [function (e, t, i) {
        var n = e("../../ui/component"),
            o = e("../../lib/data"),
            s = e("../../lib/ua"),
            a = e("../../lib/constants"),
            l = e("../../lib/dom"),
            c = e("../../lib/object"),
            u = e("../../config"),
            p = e("../../lang/index"),
            d = e("../../lib/playerutil"),
            h = e("../../lib/util"),
            f = e("../../ui/component/info-display"),
            v = e("../../ui/component/error-display"),
            r = e("../../feature/autoPlayDelay"),
            y = e("../../commonui/autostreamselector"),
            g = e("../base/event/eventtype"),
            _ = e("../saas/ststoken"),
            m = n.extend({
                init: function (e, t) {
                    if (void 0 === t.skinLayout && (t.skinLayout = d.defaultFlashLayout), n.call(this, this, t), this._id = "prism-player-" + o.guid(), this.tag = e, this._el = this.tag, this._childrenUI = [f, v], this.initChildren(), this.id = this._id, window[this.id] = this, p.setCurrentLanguage(this._options.language, "flash", this._options.languageTexts), h.openInFile()) {
                        var i = {
                            mediaId: this._options.vid ? this._options.vid : "",
                            error_code: a.ErrorCode.FormatNotSupport,
                            error_msg: p.get("Open_Html_By_File", "flash")
                        };
                        this.trigger(g.Private.Error_Show, i)
                    } else if (s.IS_MOBILE) this.trigger(g.Private.Error_Show, {
                        mediaId: this._options.vid ? this._options.vid : "",
                        error_code: a.ErrorCode.FormatNotSupport,
                        error_msg: p.get("Cant_Use_Flash_On_Mobile", "flash")
                    });
                    else {
                        if (this._options.vid && this._options.accessKeyId && this._options.securityToken && this._options.accessKeySecret) {
                            var r = this;
                            _.getPlayAuth(this._options, function (e) {
                                r._options.playauth = e,
                                    r._createPlayer()
                            }, function (e) {
                                var t = {
                                    mediaId: r._options.vid,
                                    error_code: e.Code,
                                    error_msg: e.Message
                                };
                                e.sri && (t.sri = e.sri),
                                    t.display_msg = e.display_msg,
                                    r.trigger(g.Private.Error_Show, t)
                            }, "flash")
                        } else this._createPlayer();
                        this._status = "init"
                    }
                },
                _createPlayer: function () {
                    if (this._options.autoPlayDelay) {
                        var e = new r(this),
                            t = this;
                        e.handle(function () {
                            t._options.autoplay = !0,
                                t._initPlayer(),
                                t._childrenUI.push(y),
                                t.initChildren()
                        })
                    } else this._initPlayer(),
                        this._childrenUI.push(y),
                        this.initChildren()
                },
                _initPlayer: function () {
                    var e = "//" + u.domain + "/de/prismplayer-flash/" + u.flashVersion + "/PrismPlayer.swf";
                    u.domain ? -1 < u.domain.indexOf("localhost") && (e = "//" + u.domain + "/build/flash//PrismPlayer.swf") : e = "de/prismplayer-flash/" + u.flashVersion + "/PrismPlayer.swf";
                    var t = this._comboFlashVars(),
                        i = this._options.wmode ? this._options.wmode : "opaque";
                    this.tag.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="100%" height="100%" id="' + this.id + '"><param name=movie value="' + e + '"><param name=quality value=High><param name="FlashVars" value="' + t + '"><param name="WMode" value="' + i + '"><param name="AllowScriptAccess" value="always"><param name="AllowFullScreen" value="true"><param name="AllowFullScreenInteractive" value="true"><embed name="' + this.id + '" src="' + e + '" quality=high pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="100%" height="100%" AllowScriptAccess="always" AllowFullScreen="true" AllowFullScreenInteractive="true" WMode="' + i + '" FlashVars="' + t + '"></embed></object>'
                },
                _getPlayer: function (e) {
                    return -1 != navigator.appName.indexOf("Microsoft") ? document.getElementById(e) : document[e]
                },
                _getLowerQualityLevel: function () {
                    var e = this._getVideoUrls();
                    if (!e) return "";
                    var t = e.Urls,
                        i = e.index;
                    return t && 0 == t.length || -1 == i ? "" : 0 < i ? {
                        item: t[i - 1],
                        index: i - 1
                    } : ""
                },
                _comboFlashVars: function () {
                    var e = encodeURIComponent(s.getReferer()),
                        t = s.getHref(),
                        i = encodeURIComponent(t),
                        r = "";
                    t && (r = s.getHost(t));
                    var n = this._options,
                        o = {
                            autoPlay: n.autoplay ? 1 : 0,
                            isInner: 0,
                            actRequest: 1,
                            vid: n.vid,
                            diagnosisButtonVisible: n.diagnosisButtonVisible ? 1 : 0,
                            domain: n.domain ? n.domain : "//tv.taobao.com",
                            statisticService: n.statisticService ? n.statisticService : u.logReportTo,
                            videoInfoService: n.videoInfoService ? n.videoInfoService : "/player/json/getBaseVideoInfo.do",
                            disablePing: n.trackLog ? 0 : 1,
                            namespace: this.id,
                            barMode: 0 != n.barMode ? 1 : 0,
                            isLive: n.isLive ? 1 : 0,
                            waterMark: n.waterMark,
                            environment: n.environment,
                            vurl: n.source ? encodeURIComponent(n.source) : "",
                            plugins: n.plugins ? n.plugins : "",
                            snapShotShow: n.snapshot ? 1 : 0,
                            accessId: n.accId ? n.accId : "",
                            accessKey: n.accSecret ? n.accSecret : "",
                            apiKey: n.apiKey ? n.apiKey : "",
                            flashApiKey: n.flashApiKey ? n.flashApiKey : "",
                            disableSeek: n.disableSeek ? 1 : 0,
                            disableFullScreen: n.disableFullScreen ? 1 : 0,
                            stsToken: n.stsToken ? n.stsToken : "",
                            domainRegion: n.domainRegion ? n.domainRegion : "",
                            authInfo: n.authInfo ? encodeURIComponent(n.authInfo) : "",
                            playDomain: n.playDomain ? n.playDomain : "",
                            stretcherZoomType: n.stretcherZoomType ? n.stretcherZoomType : "",
                            playauth: n.playauth ? n.playauth.replace(/\+/g, "%2B") : "",
                            prismType: n.prismType ? n.prismType : 0,
                            formats: n.formats ? n.formats : "",
                            notShowTips: n.notShowTips ? 1 : 0,
                            showBarTime: n.showBarTime ? n.showBarTime : 0,
                            showBuffer: 0 == n.showBuffer ? 0 : 1,
                            rePlay: n.rePlay ? 1 : 0,
                            encryp: n.encryp ? n.encryp : "",
                            secret: n.secret ? n.secret : "",
                            mediaType: "video",
                            logInfo: {
                                ud: s.getHost(n.source),
                                os: s.os.name,
                                ov: s.os.version || "",
                                et: s.browser.name,
                                ev: s.browser.version || "",
                                uat: s.USER_AGENT,
                                r: e,
                                pu: i,
                                app_n: r
                            }
                        },
                        a = [];
                    return n.cover && (o.cover = n.cover),
                    n.extraInfo && (o.extraInfo = encodeURIComponent(JSON.stringify(n.extraInfo))),
                    o.logInfo && (o.logInfo = encodeURIComponent(JSON.stringify(o.logInfo))),
                        o.languageData = encodeURIComponent(JSON.stringify(p.getLanguageData("flash"))),
                        o.language = p.getCurrentLanguage(),
                        c.each(o, function (e, t) {
                            a.push(e + "=" + t)
                        }),
                        a.join("&")
                },
                initChildren: function () {
                    for (var e = this._childrenUI.length, t = 0; t < e; t++) {
                        var i = new this._childrenUI[t](this, this._options),
                            r = i.el();
                        r.id = i.id(),
                            this.contentEl().appendChild(r),
                            i.bindEvent()
                    }
                    var n = document.querySelector("#" + this._options.id + " .prism-info-display");
                    l.css(n, "display", "none")
                },
                flashReady: function () {
                    this.flashPlayer = this._getPlayer(this.id),
                        this._isReady = !0;
                    var e, t = this._options.skinRes,
                        i = this._options.skinLayout;
                    if (!1 !== i && !c.isArray(i)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");
                    if ("string" != typeof t) throw new Error("PrismPlayer Error: skinRes should be string!");
                    e = 0 != i && 0 !== i.length && {
                        skinRes: t,
                        skinLayout: i
                    },
                        this.flashPlayer.setPlayerSkin(e),
                        this.trigger("ready");
                    var r = this;
                    window.addEventListener("beforeunload", function () {
                        try {
                            r.flashPlayer.setPlayerCloseStatus()
                        } catch (e) {
                        }
                    })
                },
                jsReady: function () {
                    return !0
                },
                snapshoted: function (e) {
                    var t = h.toBinary(e),
                        i = "data:image/jpeg;base64," + e;
                    this.trigger("snapshoted", {
                        time: this.getCurrentTime(),
                        base64: i,
                        binary: t
                    })
                },
                uiReady: function () {
                    this._status = "ready",
                        this.trigger("uiReady")
                },
                loadedmetadata: function () {
                    "ended" != this._status && (this._status = "loading", this.trigger("loadedmetadata"))
                },
                onPlay: function () {
                    this._status = "play",
                        this.trigger("play"),
                        this._clearTimeoutHandle(),
                        this.trigger(g.Private.AutoStreamHide)
                },
                onEnded: function () {
                    this._clearTimeoutHandle(),
                        this._status = "ended",
                        this.trigger("ended")
                },
                onPause: function () {
                    this._status = "pause",
                        this._clearTimeoutHandle(),
                        this.trigger(g.Private.AutoStreamHide),
                        this.trigger("pause")
                },
                onBulletScreenReady: function () {
                    this.trigger("bSReady")
                },
                onBulletScreenMsgSend: function (e) {
                    this.trigger("bSSendMsg", e)
                },
                onVideoRender: function (e) {
                    this._clearTimeoutHandle(),
                        this.trigger("videoRender"),
                        this.trigger("canplay", {
                            loadtime: e
                        })
                },
                onVideoError: function (e) {
                    this._clearTimeoutHandle(),
                        this._status = "error",
                        this.trigger("error", {
                            errortype: e
                        })
                },
                onM3u8Retry: function () {
                    this.trigger("m3u8Retry")
                },
                hideBar: function () {
                    this.trigger("hideBar")
                },
                showBar: function () {
                    this.trigger("showBar")
                },
                liveStreamStop: function () {
                    this.trigger("liveStreamStop")
                },
                stsTokenExpired: function () {
                    this._status = "error",
                        this.trigger("stsTokenExpired")
                },
                onVideoBuffer: function () {
                    if ("pause" != this._status) {
                        this._status = "waiting",
                            this.trigger("waiting"),
                            this._clearTimeoutHandle();
                        var e = this;
                        this._checkTimeoutHandle = setTimeout(function () {
                            e.trigger(g.Private.AutoStreamShow)
                        }, 1e3 * this._options.loadDataTimeout),
                            this._checkVideoStatus()
                    }
                },
                startSeek: function (e) {
                    this.trigger("startSeek", e)
                },
                completeSeek: function (e) {
                    this.trigger("completeSeek", e)
                },
                _invoke: function () {
                    var e = arguments[0],
                        t = arguments;
                    if (Array.prototype.shift.call(t), !this.flashPlayer) throw new Error("PrismPlayer Error: flash player is not ready，please use api after ready event occured!");
                    if ("function" != typeof this.flashPlayer[e]) throw new Error("PrismPlayer Error: function " + e + " is not found!");
                    return this.flashPlayer[e].apply(this.flashPlayer, t)
                },
                play: function () {
                    this._invoke("playVideo")
                },
                replay: function () {
                    this._invoke("replayVideo")
                },
                pause: function () {
                    this._invoke("pauseVideo")
                },
                stop: function () {
                    this._invoke("stopVideo")
                },
                seek: function (e) {
                    this._invoke("seekVideo", e)
                },
                getCurrentTime: function () {
                    return this._invoke("getCurrentTime")
                },
                getDuration: function () {
                    return this._invoke("getDuration")
                },
                getStatus: function () {
                    return this._status
                },
                _getVideoUrls: function () {
                    var e = this._invoke("getVideoUrls"),
                        t = [];
                    if (e && e.Urls) for (var i = 0; i < e.Urls.length; i++) {
                        var r = e.Urls[i].value,
                            n = r.desc.indexOf("_"),
                            o = p.get(r.definition, "flash");
                        r.desc = 0 < n ? o + "_" + r.height : o,
                            t.push(r)
                    }
                    return {
                        Urls: t,
                        index: e.index
                    }
                },
                _getVideoStatus: function () {
                    return this._invoke("getVideoStatus")
                },
                _checkVideoStatus: function () {
                    if (this.flashPlayer && !this._checkVideoStatusHandler) {
                        var t = this,
                            i = function () {
                                t._checkVideoStatusHandler = setTimeout(function () {
                                    var e = t._getVideoStatus();
                                    "playing" == e.videoStatus && "bufferFull" == e.bufferStatus ? (t._status = "playing", t._clearTimeoutHandle()) : "videoPlayOver" == e.videoStatus && (t._status = "ended", t._clearTimeoutHandle()),
                                        i()
                                }, 500)
                            };
                        i()
                    }
                },
                _clearTimeoutHandle: function () {
                    this._checkTimeoutHandle && (clearTimeout(this._checkTimeoutHandle), this._checkTimeoutHandle = null)
                },
                _changeStream: function (e) {
                    return this._invoke("changeStream", e)
                },
                mute: function () {
                    this.setVolume(0)
                },
                unMute: function () {
                    this.setVolume(.5)
                },
                getVolume: function () {
                    return this._invoke("getVolume")
                },
                setVolume: function (e) {
                    this._invoke("setVolume", e)
                },
                loadByVid: function (e) {
                    this._invoke("loadByVid", e, !1)
                },
                loadByUrl: function (e, t) {
                    this._invoke("loadByUrl", e, t)
                },
                dispose: function () {
                    this._invoke("pauseVideo")
                },
                showBSMsg: function (e) {
                    this._invoke("showBSMsg", e)
                },
                setToastEnabled: function (e) {
                    this._invoke("setToastEnabled", e)
                },
                setLoadingInvisible: function () {
                    this._invoke("setLoadingInvisible")
                },
                setPlayerSize: function (e, t) {
                    this._el.style.width = e,
                        this._el.style.height = t
                }
            });
        t.exports = m
    },
        {
            "../../commonui/autostreamselector": 8,
            "../../config": 11,
            "../../feature/autoPlayDelay": 13,
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/data": 22,
            "../../lib/dom": 23,
            "../../lib/object": 31,
            "../../lib/playerutil": 34,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../ui/component": 95,
            "../../ui/component/error-display": 102,
            "../../ui/component/info-display": 105,
            "../base/event/eventtype": 47,
            "../saas/ststoken": 82
        }],
    73: [function (e, t, i) {
        var c = e("../../lib/io"),
            u = e("../../config"),
            p = e("../../lib/constants"),
            d = e("../../lib/util"),
            h = e("../../lib/playerutil"),
            f = (e("../../lib/dom"), e("../../lib/ua")),
            v = e("../../lang/index"),
            y = e("../base/event/eventtype");
        e("../base/player");
        t.exports.inject = function (e, t, i, r, n, o) {
            var a = r.source;
            if (o || (s = a, !e._flv && h.isFlv(s))) {
                var s;
                e._Type = t,
                    e._superType = i,
                    e._superPt = i.prototype,
                    e._disposed = !1,
                    t.prototype._checkFlvReady = function () {
                        if (null == e._flv) throw new Error("please invoke this method after ready event")
                    },
                    e._isFlv = !0,
                    e._flv = null,
                    e._isLoadedFlv = !1,
                    e._originalUrl = "",
                    t.prototype.play = function (e) {
                        this._checkFlvReady();
                        if (this.trigger(y.Private.Cover_Hide), this._options.isLive && e) this._loadByUrlInner(this._options.source, 0, e);
                        else {
                            if (0 == this._seeking) {
                                var t = 0;
                                this.tag.ended || (t = this.getCurrentTime()),
                                    this.seek(t)
                            }
                            this.tag.paused && (this._hasLoaded || (this.getMetaData(), this._flv.load()), this._flv.play())
                        }
                        return this
                    },
                    t.prototype.replay = function () {
                        return this._checkFlvReady(),
                            this._loadByUrlInner(this._options.source, 0, !0),
                            this
                    },
                    t.prototype.seek = function (e) {
                        this._checkFlvReady(),
                        e === this.tag.duration && e--;
                        try {
                            this._flv.currentTime = e
                        } catch (e) {
                            console.log(e)
                        }
                        return this
                    },
                    t.prototype.pause = function () {
                        return this._checkFlvReady(),
                            this._flv.pause(),
                            this
                    },
                    t.prototype.getProgramDateTime = function () {
                        if (this._checkFlvReady(), !this._metadata) return "";
                        var e = this._flv.getFirstSample(),
                            t = e && e.pts ? e.pts : 0;
                        return console.log("推流时间：" + this._metadata.NtpTime),
                            console.log("首帧PTS：" + t),
                        this._metadata.NtpTime + t
                    },
                    t.prototype.initPlay = function (e) {
                        if (f.browser.safari && this.trigger(y.Private.Snapshot_Hide), d.contentProtocolMixed(a)) {
                            var t = {
                                mediaId: this._options.vid ? this._options.vid : "",
                                error_code: p.ErrorCode.InvalidSourceURL,
                                error_msg: "InvalidSourceURL"
                            };
                            return t.display_msg = v.get("Request_Block_Text"),
                                void this.trigger(y.Player.Error, t)
                        }

                        function i(t, e) {
                            var i = t._options.isLive,
                                r = {
                                    isLive: i,
                                    enableWorker: t._options.enableWorker,
                                    stashInitialSize: 2048
                                };
                            i ? (r.enableStashBuffer = t._options.enableStashBufferForFlv, stashInitialSize = t._options.stashInitialSizeForFlv, r.autoCleanupSourceBuffer = !1) : r.lazyLoadMaxDuration = 600,
                                t._originalUrl = t._options.source,
                                t._flv = flvjs.createPlayer({
                                    type: "flv",
                                    isLive: i,
                                    url: t._options.source
                                }, r),
                                l(t, t._flv),
                                t._flv.on(flvjs.Events.MEDIA_INFO, function (e) {
                                    t._metadata = e.metadata
                                }),
                                t._flv.attachMediaElement(t.tag),
                            t._initPlayBehavior(e) && ((t._options.preload || t._options.autoplay) && (t._hasLoaded = !0, t._flv.load()), t._options.autoplay && !t.tag.paused && t._flv.play(), n && n(t._flv))
                        }

                        (that = this)._isLoadedFlv ? (that.destroy(), setTimeout(function () {
                            i(that, e)
                        }, 1e3)) : (this.trigger(y.Private.H5_Loading_Show), function (e) {
                            var t = "aliplayer-flv-min.js",
                                i = "https://" + u.domain + "/de/prismplayer/" + u.h5Version + "/flv/" + t;
                            u.domain ? -1 < u.domain.indexOf("localhost") && (i = "//" + u.domain + "/build/flv/" + t) : i = "de/prismplayer/" + u.h5Version + "/flv/" + t;
                            var r = this;
                            c.loadJS(i, function () {
                                e.apply(r)
                            })
                        }.call(that, function () {
                            this.trigger(y.Private.H5_Loading_Hide),
                                this._isLoadedFlv = !0,
                                that.destroy(),
                                i(that, e)
                        }))
                    },
                    t.prototype.destroy = function () {
                        this._flv && (this._flv.pause(), this._flv.destroy()),
                            this.loaded = !1,
                            this._hasLoaded = !1,
                            this._flv = null
                    },
                    t.prototype.dispose = function () {
                        this._disposed || (this._disposed = !0, this._superPt && this._superPt.dispose.call(this), this.destroy(), this._superPt && (t.prototype.play = this._superPt.play, t.prototype.pause = this._superPt.pause, t.prototype.initPlay = this._superPt.initPlay, t.prototype.replay = this._superPt.replay, t.prototype.seek = this._superPt.seek, t.prototype.canSeekable = this._superPt.canSeekable))
                    },
                    t.prototype.canSeekable = function (e) {
                        var t = this._flv.mediaInfo;
                        return !(!this._flv._isTimepointBuffered(e) && t && !t.hasKeyframesIndex)
                    };
                var l = function (c, e) {
                    var u = !1;
                    e.on(flvjs.Events.ERROR, function (e, t, i) {
                        var r = p.ErrorCode.OtherError,
                            n = v.get("Error_Play_Text");
                        if (t == flvjs.ErrorDetails.NETWORK_EXCEPTION) {
                            var o = c.getOptions().source;
                            !o || 0 != o.toLowerCase().indexOf("http://") && 0 != o.toLowerCase().indexOf("https://") ? (r = p.ErrorCode.InvalidSourceURL, n = v.get("Error_Invalidate_Source"), u = !0) : navigator.onLine ? (r = p.ErrorCode.RequestDataError, n = v.get("Maybe_Cors_Error")) : (r = p.ErrorCode.NetworkError, n = v.get("Error_Network_Text"))
                        } else t == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID ? "404" == i.code ? (r = p.ErrorCode.NotFoundSourceURL, n = v.get("Error_Not_Found")) : "403" == i.code ? (r = p.ErrorCode.AuthKeyExpired, n = v.get("Error_AuthKey_Text"), u = !0) : (r = p.ErrorCode.NetworkError, n = v.get("Error_Network_Text")) : t == flvjs.ErrorDetails.NETWORK_TIMEOUT ? (r = p.ErrorCode.LoadingTimeout, n = v.get("Error_Waiting_Timeout_Text")) : t != flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED && t != flvjs.ErrorDetails.MEDIA_CODEC_UNSUPPORTED || (r = p.ErrorCode.FormatNotSupport, n = v.get("Error_H5_Not_Support_Text"), u = !0);
                        var a = function () {
                            if (setTimeout(function () {
                                c.trigger(y.Private.Play_Btn_Hide)
                            }), c.checkOnline()) {
                                var e = {
                                    mediaId: c._options.vid ? c._options.vid : "",
                                    error_code: r,
                                    error_msg: i.msg
                                };
                                c.logError(e),
                                    e.display_msg = n,
                                    c.trigger(y.Player.Error, e)
                            }
                        };
                        if (c._options && c._options.isLive && !u) {
                            var s = c._options;
                            if (s.liveRetry > c._liveRetryCount) {
                                0 == c._liveRetryCount && c.trigger(y.Player.OnM3u8Retry);
                                var l = s.liveRetryInterval + s.liveRetryStep * c._liveRetryCount;
                                c._liveRetryCount++,
                                    d.sleep(1e3 * l),
                                    c._loadByUrlInner(s.source)
                            } else c.trigger(y.Player.LiveStreamStop),
                                c._liveErrorHandle = setTimeout(a, 500)
                        } else a()
                    })
                }
            }
        }
    },
        {
            "../../config": 11,
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/dom": 23,
            "../../lib/io": 29,
            "../../lib/playerutil": 34,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../base/event/eventtype": 47,
            "../base/player": 66
        }],
    74: [function (e, t, i) {
        var r = e("../base/player"),
            n = e("./flvinjector"),
            o = r.extend({
                init: function (e, t) {
                    n.inject(this, o, r, t, function (e) {
                    }),
                        r.call(this, e, t)
                }
            });
        t.exports = o
    },
        {
            "../base/player": 66,
            "./flvinjector": 73
        }],
    75: [function (e, t, i) {
        var p = e("../../lib/io"),
            d = e("../../config"),
            h = e("../../lib/constants"),
            f = e("../../lib/util"),
            v = e("../../lib/playerutil"),
            y = (e("../../lib/dom"), e("../../lang/index")),
            g = e("../base/event/eventtype");
        e("../base/player");
        t.exports.inject = function (e, t, i, r, n, o) {
            var a = r.source,
                s = r.useHlsPluginForSafari;
            if (o || (l = a, c = s, !e._hls && v.isHls(l) && (!v.canPlayHls() || v.isSafariUsedHlsPlugin(c) || v.isUsedHlsPluginOnMobile()))) {
                var l, c;
                e._Type = t,
                    e._superType = i,
                    e._superPt = i.prototype,
                    e._disposed = !1,
                    t.prototype._checkHlsReady = function () {
                        if (null == e._hls) throw new Error("please invoke this method after ready event")
                    },
                    e._isHls = !0,
                    e._hls = null,
                    e._isLoadedHls = !1,
                    t.prototype.play = function () {
                        this._checkHlsReady();
                        if (this.trigger(g.Private.Cover_Hide), this._options.autoplay || this._options.preload || this._loadSourced || (this._loadSourced = !0, this._hls.loadSource(this._options.source)), this.tag.ended) this.replay();
                        else {
                            this.getCurrentTime();
                            this.tag.paused && this.tag.play()
                        }
                        return this
                    },
                    t.prototype.replay = function () {
                        return this.initPlay(!0),
                        this.tag.paused && this.tag.play(),
                            this
                    },
                    t.prototype.pause = function () {
                        return this._checkHlsReady(),
                            this.tag.pause(),
                            this._hls.stopLoad(),
                            this
                    },
                    t.prototype.stop = function () {
                        return this._checkHlsReady(),
                            this.tag.setAttribute("src", null),
                            this._hls.stopLoad(),
                            this
                    },
                    t.prototype.seek = function (e) {
                        this._checkHlsReady();
                        try {
                            this._superPt.seek.call(this, e),
                            this.tag.paused && this._hls.startLoad(e)
                        } catch (e) {
                            console.log(e)
                        }
                        return this
                    },
                    t.prototype.getProgramDateTime = function () {
                        if (this._checkHlsReady(), -1 == this._hls.currentLevel) return "";
                        var e = this._hls.currentLevel,
                            t = this._hls.levels[e].details;
                        if (t) {
                            var i = t.programDateTime;
                            if (console.log("ProgramDateTime=" + i), i) return new Date(i).valueOf()
                        }
                        return 0
                    },
                    t.prototype._reloadAndPlayForM3u8 = function () {
                        0 == this._liveRetryCount && this.trigger(g.Player.OnM3u8Retry),
                            this._liveRetryCount++
                    },
                    t.prototype._switchLevel = function (e) {
                        this.trigger(g.Player.LevelSwitch);
                        for (var t = this._hls.levels, i = 0; i < t.length; i++)
                            if (t[i].url == e) {
                                this._hls.currentLevel = i;
                                break
                            }
                        var r = this;
                        setTimeout(function () {
                            r.trigger(g.Player.LevelSwitched)
                        }, 1e3)
                    },
                    t.prototype.initPlay = function (e) {
                        if (f.contentProtocolMixed(a)) {
                            var t = {
                                mediaId: this._options.vid ? this._options.vid : "",
                                error_code: h.ErrorCode.InvalidSourceURL,
                                error_msg: "InvalidSourceURL"
                            };
                            return t.display_msg = y.get("Request_Block_Text"),
                                void this.trigger(g.Player.Error, t)
                        }

                        function i(a, e) {
                            a.destroy();
                            var t = {
                                    xhrSetup: function (e, t) {
                                        e.withCredentials = a._options.withCredentials || !1
                                    }
                                },
                                i = a._options.loadingTimeOut || a._options.hlsLoadingTimeOut;
                            i && (t.manifestLoadingTimeOut = i, t.levelLoadingTimeOut = i, t.fragLoadingTimeOut = i),
                            a._options.nudgeMaxRetry && (t.nudgeMaxRetry = a._options.nudgeMaxRetry),
                            a._options.maxMaxBufferLength && (t.maxMaxBufferLength = a._options.maxMaxBufferLength),
                            a._options.maxBufferSize && (t.maxBufferSize = a._options.maxBufferSize),
                            a._options.maxBufferLength && (t.maxBufferLength = a._options.maxBufferLength),
                                t.debug = a._options.debug,
                                a._hls = new Hls(t),
                            n && n(a._hls),
                                u(a, a._hls),
                                a._loadSourced = !1,
                            (a._options.autoplay || a._options.preload || e) && (a._loadSourced = !0, a._hls.loadSource(a._options.source)),
                                a._hls.attachMedia(a.tag),
                                a._hls.on(Hls.Events.MANIFEST_PARSED, function () {
                                    a._initPlayBehavior(e)
                                }),
                                a._hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, function (e, t) {
                                    a.trigger(g.Player.AudioTrackUpdated, t)
                                }),
                                a._hls.on(Hls.Events.MANIFEST_LOADED, function (e, t) {
                                    a.trigger(g.Player.LevelsLoaded, t)
                                }),
                                a._hls.on(Hls.Events.LEVEL_SWITCHED, function (e, t) {
                                    if (a._qualityService) {
                                        for (var i = a._hls.levels[t.level].url, r = a._qualityService.levels, n = "", o = 0; o < r.length; o++)
                                            if (r[o].Url == i) {
                                                n = r[o].desc;
                                                break
                                            }
                                        n && a.trigger(g.Private.QualityChange, {
                                            levelSwitch: !0,
                                            url: i,
                                            desc: n
                                        })
                                    }
                                }),
                                a._hls.on(Hls.Events.AUDIO_TRACK_SWITCH, function (e, t) {
                                    a.trigger(g.Player.AudioTrackSwitch, t),
                                        setTimeout(function () {
                                            a.trigger(g.Player.AudioTrackSwitched, t)
                                        }, 1e3)
                                }),
                                a._hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, function (e, t) {
                                }),
                            a._options.hlsFragChangedEmpty && a._hls.on(Hls.Events.FRAG_CHANGED, function (e, t) {
                                var i = {
                                    startOffset: 0,
                                    endOffset: t.frag.startDTS
                                };
                                a._hls.trigger(Hls.Events.BUFFER_FLUSHING, i),
                                    console.dir(i)
                            })
                        }

                        this._isLoadedHls ? i(this, e) : (this.trigger(g.Private.H5_Loading_Show), function (e) {
                            var t = "https://" + d.domain + "/de/prismplayer/" + d.h5Version + "/hls/aliplayer-hls-min.js";
                            d.domain ? -1 < d.domain.indexOf("localhost") && (t = "//" + d.domain + "/build/hls/aliplayer-hls-min.js") : t = "de/prismplayer/" + d.h5Version + "/hls/aliplayer-hls-min.js";
                            var i = this;
                            p.loadJS(t, function () {
                                e.apply(i)
                            })
                        }.call(this, function () {
                            this.trigger(g.Private.H5_Loading_Hide),
                                this._isLoadedHls = !0,
                                i(this, e)
                        }))
                    },
                    t.prototype.destroy = function () {
                        this._hls && this._hls.destroy(),
                            this.loaded = !1,
                            this._hls = null
                    },
                    t.prototype.dispose = function () {
                        this._disposed || (this._disposed = !0, this._superPt && this._superPt.dispose.call(this), this.destroy(), this._superPt && (t.prototype.play = this._superPt.play, t.prototype.pause = this._superPt.pause, t.prototype.initPlay = this._superPt.initPlay, t.prototype.replay = this._superPt.replay, t.prototype.stop = this._superPt.stop, t.prototype.seek = this._superPt.seek))
                    };
                var u = function (l, e) {
                    e.on(Hls.Events.ERROR, function (e, t) {
                        if (t.details != Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR && 1 != l._seeking && (0 != t.fatal || t.type == Hls.ErrorTypes.NETWORK_ERROR)) {
                            var i = h.ErrorCode.LoadedMetadata,
                                r = y.get("Error_Play_Text"),
                                n = !1;
                            if (t.details == Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
                                n = !0;
                                t.networkDetails;
                                t.response ? "404" == t.response.code ? (i = h.ErrorCode.NotFoundSourceURL, r = y.get("Error_Not_Found")) : "403" == t.response.code ? (i = h.ErrorCode.AuthKeyExpired, r = y.get("Error_AuthKey_Text")) : "0" == t.response.code && navigator.onLine ? (i = h.ErrorCode.RequestDataError, r = r + "，" + y.get("Maybe_Cors_Error")) : r = y.get("Error_Load_M3U8_Failed_Text") : r = y.get("Error_Load_M3U8_Failed_Text")
                            } else t.details == Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ? (n = !0, r = y.get("Error_Load_M3U8_Timeout_Text")) : t.details == Hls.ErrorDetails.MANIFEST_PARSING_ERROR || t.details == Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR ? (n = !0, r = y.get("Error_M3U8_Decode_Text")) : t.type == Hls.ErrorTypes.NETWORK_ERROR ? (i = h.ErrorCode.NetworkError, r = y.get("Error_Network_Text")) : t.type != Hls.ErrorTypes.MUX_ERROR && t.type != Hls.ErrorTypes.MEDIA_ERROR || (i = h.ErrorCode.PlayDataDecode, r = y.get("Error_TX_Decode_Text"));
                            r = r + "(" + t.details + ")";
                            var o = function () {
                                if (l.pause(), setTimeout(function () {
                                    l.trigger(g.Private.Play_Btn_Hide)
                                }), l.checkOnline()) {
                                    var e = {
                                        mediaId: l._options.vid ? l._options.vid : "",
                                        error_code: i,
                                        error_msg: t.details
                                    };
                                    l.logError(e),
                                        e.display_msg = r,
                                        l.trigger(g.Player.Error, e)
                                }
                            };
                            if (l._options && l._options.isLive) {
                                var a = l._options;
                                if (a.liveRetry > l._liveRetryCount) {
                                    0 == l._liveRetryCount && l.trigger(g.Player.OnM3u8Retry);
                                    var s = a.liveRetryInterval + a.liveRetryStep * l._liveRetryCount;
                                    l._liveRetryCount++,
                                        f.sleep(1e3 * s),
                                    n && l._loadByUrlInner(a.source)
                                } else l.trigger(g.Player.LiveStreamStop),
                                    l._liveErrorHandle = setTimeout(o, 500)
                            } else o()
                        }
                    })
                }
            }
        }
    },
        {
            "../../config": 11,
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/dom": 23,
            "../../lib/io": 29,
            "../../lib/playerutil": 34,
            "../../lib/util": 39,
            "../base/event/eventtype": 47,
            "../base/player": 66
        }],
    76: [function (e, t, i) {
        var r = e("../base/player"),
            n = e("./hlsinjector"),
            o = r.extend({
                init: function (e, t) {
                    n.inject(this, o, r, t, function (e) {
                    }),
                        r.call(this, e, t)
                }
            });
        t.exports = o
    },
        {
            "../base/player": 66,
            "./hlsinjector": 75
        }],
    77: [function (e, t, i) {
        var r = e("../../lib/constants"),
            n = e("../../lib/oo").extend({
                init: function (e) {
                    this.player = e,
                        this.tickhandle = null
                }
            });
        n.prototype.tick = function (e, t) {
            var i = this;
            this.tickhandle = setTimeout(function () {
                i.player && i.player.trigger(r.AuthKeyExpiredEvent),
                t && t()
            }, 1e3 * e)
        },
            n.prototype.clearTick = function (e) {
                this.tickhandle && clearTimeout(this.tickhandle)
            },
            t.exports = n
    },
        {
            "../../lib/constants": 20,
            "../../lib/oo": 32
        }],
    78: [function (e, t, i) {
        var c = e("../../lib/io"),
            u = e("../../lib/constants"),
            p = e("./signature"),
            d = e("./util"),
            h = e("../../lang/index"),
            f = e("../../lib/ua");
        var v = function (e, n) {
                var t = "";
                e.sort(function (e, t) {
                    var i = parseInt(e.bitrate),
                        r = parseInt(t.bitrate);
                    if ("desc" == n) {
                        if (r < i) return -1;
                        if (i < r) return 1
                    } else {
                        if (i < r) return -1;
                        if (r < i) return 1
                    }
                });
                for (var i = e.length, r = 0; r < i; r++) {
                    var o = e[r],
                        a = u.QualityLevels[o.definition],
                        s = "";
                    s = void 0 === a ? o.bitrate : t == a ? a + o.bitrate : a,
                        o.desc = s,
                        t = a
                }
            },
            y = function (e, n) {
                var t = "";
                e.sort(function (e, t) {
                    var i = parseInt(e.width),
                        r = parseInt(t.width);
                    if ("desc" == n) {
                        if (r < i) return -1;
                        if (i < r) return 1
                    } else {
                        if (i < r) return -1;
                        if (r < i) return 1
                    }
                });
                for (var i = e.length, r = 0; r < i; r++) {
                    var o = e[r],
                        a = u.QualityLevels[o.definition],
                        s = "";
                    s = void 0 === a ? "未知" : t == a ? a + o.height : a,
                        o.desc = s,
                        t = a
                }
            };
        t.exports.getDataByAuthInfo = function (e, a, s, l) {
            p.returnUTCDate();
            var t = p.randomUUID(),
                i = p.randomUUID(),
                r = {
                    AccessKeyId: e.accessId,
                    Action: "PlayInfo",
                    MediaId: e.vid,
                    Formats: e.format,
                    AuthInfo: e.authInfo,
                    AuthTimeout: u.AuthKeyExpired,
                    IncludeSnapshotList: e.includeSnapshotList,
                    Rand: t,
                    SecurityToken: e.stsToken,
                    Format: "JSON",
                    Version: "2014-06-18",
                    SignatureMethod: "HMAC-SHA1",
                    SignatureVersion: "1.0",
                    Terminal: f.IS_CHROME ? "Chrome" : f.IS_EDGE ? "Edge" : f.IS_IE11 ? "IE" : f.IS_SAFARI ? "Safari" : f.IS_FIREFOX ? "Firefox" : "",
                    SignatureNonce: i
                },
                n = p.makeUTF8sort(r, "=", "&") + "&Signature=" + p.AliyunEncodeURI(p.makeChangeSiga(r, e.accessSecret)),
                o = "https://mts." + e.domainRegion + ".aliyuncs.com/?" + n;
            c.get(o, function (e) {
                if (e) {
                    var t = JSON.parse(e),
                        i = t.PlayInfoList.PlayInfo,
                        r = t.SnapshotList ? t.SnapshotList.Snapshot : [],
                        n = "";
                    r && 0 < r.length && (n = r[0].Url);
                    var o = function (e, t) {
                        for (var i = [], r = [], n = [], o = e.length - 1; 0 <= o; o--) {
                            var a = e[o];
                            "mp4" == a.format ? r.push(a) : "mp3" == a.format ? n.push(a) : i.push(a)
                        }
                        return 0 < n.length ? (v(n, t), n) : 0 < r.length ? (y(r, t), r) : (y(i, t), i)
                    }(i, a);
                    s && s({
                        requestId: t.RequestId,
                        urls: o,
                        thumbnailUrl: n
                    })
                } else l && l(d.createError("MPS获取取数失败"))
            }, function (e) {
                if (l) {
                    var t = {
                        Code: "",
                        Message: h.get("Error_MTS_Fetch_Urls_Text")
                    };
                    try {
                        t = JSON.parse(e)
                    } catch (e) {
                    }
                    l({
                        Code: u.ErrorCode.ServerAPIError,
                        Message: t.Code + "|" + t.Message,
                        sri: t.requestId || ""
                    })
                }
            })
        }
    },
        {
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/io": 29,
            "../../lib/ua": 37,
            "./signature": 81,
            "./util": 83
        }],
    79: [function (e, t, i) {
        var r = e("./saasplayer"),
            n = (e("../../lib/constants"), e("./mts")),
            o = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.service = n,
                        this.loadByMts()
                }
            });
        o.prototype.loadByMts = function (e) {
            var t = {
                vid: this._options.vid,
                accessId: this._options.accId,
                accessSecret: this._options.accSecret,
                stsToken: this._options.stsToken,
                domainRegion: this._options.domainRegion,
                authInfo: this._options.authInfo,
                format: this._options.format,
                includeSnapshotList: this._options.includeSnapshotList || !1
            };
            this.loadData(t, e)
        },
            o.prototype.replayByVidAndAuthInfo = function (e, t, i, r, n, o) {
                this.reloadNewVideoInfo(e, t, i, r, n, o)
            },
            o.prototype.reloadNewVideoInfo = function (e, t, i, r, n, o) {
                if (this.trigger("error_hide"), this._options.source = "", e && (this._options.vid = e, this._options.accId = t, this._options.accessSecret = i, this._options.stsToken = r, this._options.domainRegion = o, this._options.authInfo = n), !(this._options.vid && this._options.accId && this._options.accessSecret && this._options.stsToken && this._options.domainRegion && this._options.authInfo)) throw new Error("需要提供vid、accId、accessSecret、stsToken、domainRegion和authInfo参数");
                this.loadByMts(!0)
            },
            t.exports = o
    },
        {
            "../../lib/constants": 20,
            "./mts": 78,
            "./saasplayer": 80
        }],
    80: [function (e, t, i) {
        var a = e("../base/player"),
            r = e("../audio/audioplayer"),
            c = (e("../../lib/event"), e("../../lib/io"), e("../../lib/constants")),
            n = (e("./signature"), e("./authkeyexpiredhandle")),
            s = e("../hls/hlsinjector"),
            l = e("../flv/flvinjector"),
            u = (e("../../lib/cookie"), e("../../lang/index")),
            p = e("../../lib/playerutil"),
            d = e("../base/event/eventtype"),
            h = a.extend({
                init: function (e, t) {
                    this._authKeyExpiredHandle = new n(this),
                        "mp3" == t.format ? (t.height = "auto", t.mediaType = "audio", a.prototype.createEl = r.prototype.createEl, r.call(this, e, t)) : a.call(this, e, t)
                }
            });
        h.prototype.loadData = function (e, r) {
            var n = (new Date).getTime();
            this.log("STARTFETCHDATA", {});
            var o = this;
            this._urls = [],
                this._currentPlayIndex = 0,
                this._retrySwitchUrlCount = 0,
                this._authKeyExpiredHandle.clearTick(),
                this.service.getDataByAuthInfo(e, this._options.qualitySort, function (e) {
                    if (o.log("COMPLETEFETCHDATA", {
                        cost: (new Date).getTime() - n
                    }), e.urls && 0 == e.urls.length) o._mtsError_message(o, {
                        Code: c.ErrorCode.URLsIsEmpty,
                        Message: u.get("Error_Vod_URL_Is_Empty_Text")
                    }, "");
                    else {
                        o._urls = e.urls,
                            o._currentPlayIndex = p.findSelectedStreamLevel(o._urls);
                        var t = e.urls[o._currentPlayIndex],
                            i = t.Url;
                        o._options.source = i,
                            p.isHls(i) ? s.inject(o, h, a, o._options) : p.isFlv(i) ? l.inject(o, h, a, o._options) : p.isDash(i) && drmInjector.inject(o, h, a, o._options),
                            o._authKeyExpiredHandle.tick(c.AuthKeyRefreshExpired),
                            o.trigger(d.Private.SourceLoaded, t),
                            o.initPlay(r),
                            o.trigger(d.Private.ChangeURL),
                        e.thumbnailUrl && o._thumbnailService.get(e.thumbnailUrl),
                            o._player._options.readyCallback(o._player)
                    }
                }, function (e) {
                    o._mtsError_message(o, e, "")
                })
        },
            h.prototype._changeStream = function (e, t) {
                this._urls.length > e && (this.loadByUrl(this._urls[e].Url, this.getCurrentTime()), this._currentPlayIndex = e, this.trigger(d.Private.QualityChange, t || u.get("Quality_Change_Fail_Switch_Text")))
            },
            h.prototype._getLowerQualityLevel = function () {
                if (0 == this._urls.length || -1 == this._currentPlayIndex) return "";
                if ("asc" == this.options().qualitySort) {
                    if (0 < this._currentPlayIndex) return {
                        item: this._urls[this._currentPlayIndex - 1],
                        index: this._currentPlayIndex - 1
                    }
                } else if (this._currentPlayIndex < this._urls.length - 1) return {
                    item: this._urls[this._currentPlayIndex + 1],
                    index: this._currentPlayIndex + 1
                };
                return ""
            },
            h.prototype._mtsError_message = function (e, t, i) {
                var r = e;
                r.trigger("h5_loading_hide");
                var n = t.Code ? t.Code : "OTHER_ERR_CODE",
                    o = t.Message ? t.Message : "OTHER_ERR_MSG",
                    a = (c.ErrorCode.ServerAPIError, t.display_msg || "");
                -1 < o.indexOf("InvalidParameter.Rand") || -1 < o.indexOf('"Rand" is not valid.') ? (c.ErrorCode.EncrptyVideoNotSupport, a = u.get("Error_Not_Support_encrypt_Text")) : -1 < o.indexOf("SecurityToken.Expired") ? (c.ErrorCode.AuthKeyExpired, a = u.get("Error_Playauth_Expired_Text")) : -1 < o.indexOf("InvalidVideo.NoneStream") && (c.ErrorCode.URLsIsEmpty, a = u.get("Error_Fetch_NotStream") + "(format=" + r._options.format + ")");
                var s = r._options.vid ? r._options.vid : "0",
                    l = (r._options.from && r._options.from, {
                        mediaId: s,
                        error_code: n,
                        error_msg: o
                    });
                t.sri && (l.sri = t.sri),
                    r.logError(l),
                    l.display_msg = a || u.get("Error_Vod_Fetch_Urls_Text"),
                    r.trigger("error", l),
                    console.log("PrismPlayer Error: " + i + "! error_msg :" + o + ";")
            },
            t.exports = h
    },
        {
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/cookie": 21,
            "../../lib/event": 24,
            "../../lib/io": 29,
            "../../lib/playerutil": 34,
            "../audio/audioplayer": 45,
            "../base/event/eventtype": 47,
            "../base/player": 66,
            "../flv/flvinjector": 73,
            "../hls/hlsinjector": 75,
            "./authkeyexpiredhandle": 77,
            "./signature": 81
        }],
    81: [function (e, u, t) {
        var r = e("crypto-js/hmac-sha1"),
            n = e("crypto-js/enc-base64"),
            i = e("crypto-js/enc-utf8");
        u.exports.randomUUID = function () {
            for (var e = [], t = "0123456789abcdef", i = 0; i < 36; i++)
                e[i] = t.substr(Math.floor(16 * Math.random()), 1);
            return e[14] = "4",
                e[19] = t.substr(3 & e[19] | 8, 1),
                e[8] = e[13] = e[18] = e[23] = "-",
                e.join("")
        },
            u.exports.returnUTCDate = function () {
                var e = new Date,
                    t = e.getUTCFullYear(),
                    i = e.getUTCMonth(),
                    r = e.getUTCDate(),
                    n = e.getUTCHours(),
                    o = e.getUTCMinutes(),
                    a = e.getUTCSeconds(),
                    s = e.getUTCMilliseconds();
                return Date.UTC(t, i, r, n, o, a, s)
            },
            u.exports.AliyunEncodeURI = function (e) {
                var t = encodeURIComponent(e);
                return t = (t = (t = t.replace("+", "%2B")).replace("*", "%2A")).replace("%7E", "~")
            },
            u.exports.makesort = function (e, t, i) {
                if (!e) throw new Error("PrismPlayer Error: vid should not be null!");
                var r = [];
                for (var n in e)
                    r.push(n);
                var o = r.sort(),
                    a = "",
                    s = o.length;
                for (n = 0; n < s; n++) "" == a ? a = o[n] + t + e[o[n]] : a += i + o[n] + t + e[o[n]];
                return a
            },
            u.exports.makeUTF8sort = function (e, t, i) {
                if (!e) throw new Error("PrismPlayer Error: vid should not be null!");
                var r = [];
                for (var n in e)
                    r.push(n);
                var o = r.sort(),
                    a = "",
                    s = o.length;
                for (n = 0; n < s; n++) {
                    var l = u.exports.AliyunEncodeURI(o[n]),
                        c = u.exports.AliyunEncodeURI(e[o[n]]);
                    "" == a ? a = l + t + c : a += i + l + t + c
                }
                return a
            },
            u.exports.makeChangeSiga = function (e, t, i) {
                if (!e) throw new Error("PrismPlayer Error: vid should not be null!");
                return i || (i = "GET"),
                    n.stringify(r(i + "&" + u.exports.AliyunEncodeURI("/") + "&" + u.exports.AliyunEncodeURI(u.exports.makeUTF8sort(e, "=", "&")), t + "&"))
            },
            u.exports.ISODateString = function (e) {
                function t(e) {
                    return e < 10 ? "0" + e : e
                }

                return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "Z"
            },
            u.exports.encPlayAuth = function (e) {
                if (!(e = i.stringify(n.parse(e)))) throw new Error("playuth参数解析为空");
                return JSON.parse(e)
            },
            u.exports.encRsa = function () {
            }
    },
        {
            "crypto-js/enc-base64": 2,
            "crypto-js/enc-utf8": 3,
            "crypto-js/hmac-sha1": 4
        }],
    82: [function (e, t, i) {
        var s = e("../../lib/io"),
            l = e("../../lib/constants"),
            c = e("./signature"),
            u = e("./util"),
            p = e("../../lang/index");
        t.exports.getPlayAuth = function (e, i, r, n) {
            c.randomUUID();
            var t = c.randomUUID(),
                o = {
                    AccessKeyId: e.accessKeyId,
                    Action: "GetVideoPlayAuth",
                    VideoId: e.vid,
                    AuthTimeout: l.AuthInfoExpired,
                    SecurityToken: e.securityToken,
                    Format: "JSON",
                    Version: "2017-03-21",
                    SignatureMethod: "HMAC-SHA1",
                    SignatureVersion: "1.0",
                    SignatureNonce: t
                },
                a = "https://vod.cn-shanghai.aliyuncs.com/?" + c.makeUTF8sort(o, "=", "&") + "&Signature=" + c.AliyunEncodeURI(c.makeChangeSiga(o, e.accessKeySecret));
            s.get(a, function (e) {
                if (e) {
                    var t = JSON.parse(e);
                    i && i(t.PlayAuth)
                } else r && r(u.createError("获取视频播放凭证失败"))
            }, function (e) {
                if (r) {
                    var t = JSON.parse(e);
                    r({
                        Code: l.ErrorCode.ServerAPIError,
                        Message: t.Code + "|" + t.Message,
                        sri: t.requestId,
                        display_msg: p.get("Fetch_Playauth_Error", n)
                    })
                }
            })
        }
    },
        {
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/io": 29,
            "./signature": 81,
            "./util": 83
        }],
    83: [function (e, t, i) {
        t.exports.createError = function (e, t) {
            return {
                requestId: "",
                code: t || "",
                message: e
            }
        }
    },
        {}],
    84: [function (e, t, i) {
        var l = e("../../lib/io"),
            c = e("../../lib/constants"),
            u = e("./signature"),
            p = e("./util"),
            d = e("../../config"),
            h = e("../../lang/index");
        t.exports.getDataByAuthInfo = function (e, o, a, s) {
            var t = u.randomUUID(),
                i = u.randomUUID(),
                r = {
                    AccessKeyId: e.accessId,
                    Action: "GetPlayInfo",
                    VideoId: e.vid,
                    Formats: e.format,
                    AuthInfo: e.authInfo,
                    AuthTimeout: c.AuthKeyExpired,
                    Rand: t,
                    SecurityToken: e.stsToken,
                    StreamType: e.mediaType,
                    Format: "JSON",
                    Version: "2017-03-21",
                    SignatureMethod: "HMAC-SHA1",
                    SignatureVersion: "1.0",
                    SignatureNonce: i,
                    PlayerVersion: d.h5Version,
                    Channel: "HTML5"
                },
                n = "https://vod.cn-shanghai.aliyuncs.com/?" + u.makeUTF8sort(r, "=", "&") + "&Signature=" + u.AliyunEncodeURI(u.makeChangeSiga(r, e.accessSecret));
            l.get(n, function (e) {
                if (e) {
                    var t = JSON.parse(e),
                        i = "",
                        r = t.VideoBase.ThumbnailList;
                    r && r.Thumbnail && 0 < r.Thumbnail.length && (i = r.Thumbnail[0].URL);
                    var n = function (e, t) {
                        var i = [];
                        "desc" == t && e.reverse();
                        for (var r = e.length - 1; 0 <= r; r--) {
                            var n = {};
                            n.width = e[r].Width,
                                n.height = e[r].Height,
                                n.definition = e[r].Definition,
                                n.Url = e[r].PlayURL,
                                n.desc = c.QualityLevels[n.definition],
                                i.push(n)
                        }
                        return i
                    }(t.PlayInfoList.PlayInfo, o);
                    a && a({
                        requestId: t.RequestId,
                        urls: n,
                        thumbnailUrl: i
                    })
                } else s && s(p.createError("点播服务获取取数失败"))
            }, function (e) {
                if (s) {
                    var t = {
                        Code: "",
                        Message: h.get("Error_Vod_Fetch_Urls_Text")
                    };
                    try {
                        t = JSON.parse(e)
                    } catch (e) {
                    }
                    s({
                        Code: c.ErrorCode.ServerAPIError,
                        Message: t.Code + "|" + t.Message,
                        sri: t.requestId || ""
                    })
                }
            })
        }
    },
        {
            "../../config": 11,
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/io": 29,
            "./signature": 81,
            "./util": 83
        }],
    85: [function (e, t, i) {
        var r = e("./saasplayer"),
            o = e("../../lib/constants"),
            n = e("./vod"),
            a = e("./signature"),
            s = (e("./authkeyexpiredhandle"), e("./ststoken")),
            l = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.service = n;
                    var i = this;
                    this._options.accessKeyId && this._options.accessKeySecret ? s.getPlayAuth(this._options, function (e) {
                        i._options.playauth = e,
                            i.loadByVod()
                    }, function (e) {
                        i._mtsError_message(i, e, "")
                    }) : i.loadByVod()
                }
            });
        l.prototype.loadByVod = function (e) {
            try {
                var t = a.encPlayAuth(this._options.playauth)
            } catch (e) {
                var i = {
                    Code: o.ErrorCode.PlayauthDecode,
                    Message: "playauth decoded failed.",
                    displayMessage: "playauth解析错误"
                };
                return void this._mtsError_message(this, i, this._options.playauth)
            }
            this._options.from = t.CustomerId ? t.CustomerId : "";
            var r = t.VideoMeta.CoverURL;
            this.UI.cover && r && !this._options.cover && (document.querySelector("#" + this.id() + " .prism-cover").style.backgroundImage = "url(" + r + ")");
            var n = {
                vid: this._options.vid,
                accessId: t.AccessKeyId,
                accessSecret: t.AccessKeySecret,
                stsToken: t.SecurityToken,
                domainRegion: t.Region,
                authInfo: t.AuthInfo,
                playDomain: t.PlayDomain,
                format: this._options.format,
                mediaType: this._options.mediaType
            };
            this.loadData(n, e)
        },
            l.prototype.replayByVidAndPlayAuth = function (e, t) {
                this.trigger("error_hide"),
                    this._options.source = "",
                    this._options.vid = e,
                    this._options.playauth = t,
                    this.loadByVod(!0)
            },
            l.prototype.updateSourcesByVidAndPlayAuth = function (e, t) {
                if (e == this._options.vid) {
                    this._options.vid = e,
                        this._options.playauth = t;
                    try {
                        var i = a.encPlayAuth(this._options.playauth)
                    } catch (e) {
                        return void console.log("playauth解析错误")
                    }
                    var r = {
                        vid: e,
                        accessId: i.AccessKeyId,
                        accessSecret: i.AccessKeySecret,
                        stsToken: i.SecurityToken,
                        domainRegion: i.Region,
                        authInfo: i.AuthInfo,
                        playDomain: i.PlayDomain,
                        format: this._options.format,
                        mediaType: this._options.mediaTyp
                    };
                    this._authKeyExpiredHandle.clearTick();
                    var n = this;
                    this.service.loadData(r, this._options.qualitySort, function (e) {
                        n._serverRequestId = e.requestId,
                        0 != e.urls.length && (n._urls = e.urls),
                            n._authKeyExpiredHandle.tick(o.AuthKeyRefreshExpired)
                    }, function (e) {
                        console.log(e)
                    })
                } else console.log("不能更新地址，vid和播放中的不一致")
            },
            l.prototype.reloaduserPlayInfoAndVidRequestMts = function (e, t) {
                this.replayByVidAndPlayAuth(e, t)
            },
            t.exports = l
    },
        {
            "../../lib/constants": 20,
            "./authkeyexpiredhandle": 77,
            "./saasplayer": 80,
            "./signature": 81,
            "./ststoken": 82,
            "./vod": 84
        }],
    86: [function (e, t, i) {
        e("../../lib/requestanimation");
        var r = e("../../ui/component/ai/rect"),
            n = e("../../ui/component/ai/aicontainer"),
            y = e("../../lib/io"),
            g = e("../../lib/util"),
            o = e("../../lib/url"),
            a = (e("../base/event/eventtype"), function (e, t) {
                this._player = e,
                    this._absoluteDate = t || e._options.ai.startDateTime || 0,
                    this._aiContainer = null,
                    this._aiSetting = [],
                    this._aiRects = [],
                    this._status = "init";
                var i = this;
                this._player.on("pause", function () {
                    i.cancel()
                }),
                    this._player.on("ended", function () {
                        i.cancel()
                    }),
                    this._player.on("error", function () {
                        i.cancel()
                    }),
                    this._player.on("completeSeek", function () {
                        this._aiSetting = [],
                            i._queryStartDate = 0
                    });
                var r = function () {
                    i._aiContainer && setTimeout(function () {
                        i._aiContainer.reLayout()
                    }, 1e3)
                };
                this._player.on("requestFullScreen", r),
                    this._player.on("cancelFullScreen", r)
            });
        a.prototype.startMeta = function () {
            this._status = "running";
            var t = this,
                i = t._player._options.ai.waitMetaDataTime || 0;
            if (this._player.getProgramDateTime && !this._absoluteDate) {
                var e = this._player.getProgramDateTime();
                "" != e && (this._absoluteDate = e - 1e3 * i || 0)
            }
            this._startQueryAiSetting(this._player._options.source, this._absoluteDate, function () {
                var e = function () {
                    t._player.paused() && t._player.play(),
                        t.start(),
                        t._player.one("canplay", function () {
                            t.__id || t.start()
                        }),
                        t._player.on("play", function () {
                            t.start()
                        })
                };
                0 == t._aiSetting.length ? setTimeout(e, 1e3 * i) : e()
            })
        },
            a.prototype.start = function () {
                if ("rectRunning" != this._status) {
                    this._status = "rectRunning";
                    var i = this;
                    this._aiContainer || (this._aiContainer = new n(this._player), this._player.addChild(this._aiContainer), this._aiContainer.computeLayout());
                    this.__id = requestAnimationFrame(function e() {
                        for (var t = 0; t < i._aiRects.length; t++)
                            i._aiRects[t].using = !1;
                        (function () {
                            var e = this._findAvailableSetting();
                            if (e && 0 < e.length) {
                                for (var t = null, i = [], r = 0; r < e.length; r++) {
                                    t = null;
                                    var n = e[r];
                                    n.tid && (n.w = n.xmax - n.xmin, n.h = n.ymax - n.ymin, n.x = n.xmin, n.y = n.ymin, this._aiRects.length > r && (t = this._findAvailableRect(n)) && t.show(), t || (t = this._createRect(n), i.push(t)), n.videoWidth || (n.videoWidth = this._player.tag.videoWidth), n.videoHeight || (n.videoHeight = this._player.tag.videoHeight), n.containerWidth = this._aiContainer.getWidth(), n.containerHeight = this._aiContainer.getHeight(), t.using = !0, t.updateLayout(n))
                                }
                                for (var o = [], a = 0; a < this._aiRects.length; a++) {
                                    var s = this._aiRects[a];
                                    if (0 == s.using) {
                                        var l = s.count || 0;
                                        s.count = l + 1,
                                            s.hide(),
                                            5 < l ? this._aiContainer.removeChild(s) : o.push(s)
                                    } else o.push(s),
                                        s.count = 0
                                }
                                this._aiRects = o.concat(i)
                            } else 0 == this._aiSetting.length && this.hideRect()
                        }).call(i),
                        "cancel" != i._status && (i.__id = requestAnimationFrame(e))
                    })
                }
            },
            a.prototype.cancel = function () {
                this._status = "cancel",
                this.__id && (cancelAnimationFrame(this.__id), this.__id = null),
                    this._cancelQueryAiSetting(),
                    this._currentSettingIndex = 0
            },
            a.prototype.hideRect = function () {
                for (var e = 0; e < this._aiRects.length; e++)
                    this._aiRects[e].hide()
            },
            a.prototype._findAvailableRect = function (e) {
                for (var t = 0; t < this._aiRects.length; t++) {
                    var i = this._aiRects[t];
                    if (i.getTid() == e.tid) return i
                }
                return ""
            },
            a.prototype._findAvailableSetting = function () {
                if (!this._aiSetting) return [];
                for (var e = this._player.getCurrentTime(), t = 1 * this._absoluteDate + 1e3 * e, i = [], r = this._aiSetting.length, n = 0, o = n; o < r; o++) {
                    var a = 1 * (this._aiSetting[o].timestamp || this._aiSetting[o].timeStamp) - t;
                    if (0 < a && a <= 40) {
                        var s = this._aiSetting[o].boxes;
                        s && (i = i.concat(s)),
                            n++
                    } else {
                        if (40 < a) break;
                        n++
                    }
                }
                return 0 < n && this._aiSetting.splice(0, n),
                    i
            },
            a.prototype._startQueryAiSetting = function (e, c, u) {
                var t, p = this._player._options.ai;
                if (p.boxes) return (t = this)._aiSetting = t._player._options.ai.boxes,
                    void (u && (u(), u = null));
                var d = this,
                    i = o.parseUrl(e),
                    h = i.segments,
                    f = i.hostname,
                    v = function () {
                        d._queryStartDate = d._queryStartDate || c;
                        var e = d._player.getCurrentTime(),
                            t = 1 * c + 1e3 * e;
                        t > d._queryStartDate && (d._queryStartDate = Math.floor(t));
                        var i = 1 * d._queryStartDate + 2e3,
                            r = h[1].split("."),
                            n = {
                                domain: p.host || f,
                                stream: p.streamName || r[0],
                                start_time: 1 * d._queryStartDate,
                                end_time: i
                            },
                            o = function () {
                                "cancel" != d._status && (d.__retrieveHandlerId = setTimeout(function () {
                                    v.call(d)
                                }, 500))
                            };
                        g.log(JSON.stringify(n)),
                            g.log(p.metaQueryUrl);
                        var a, s, l;
                        a = function (e) {
                            if (g.log(e), e) {
                                if (u && (u(), u = null), void 0 === e.Code && (e = JSON.parse(e)), !e.Code && e.Content) {
                                    var t = e.Content.length;
                                    0 < t && (d._queryStartDate = e.Content[t - 1].timestamp),
                                        d._aiSetting = d._aiSetting.concat(e.Content)
                                }
                                o()
                            }
                        },
                            s = function (e) {
                                o()
                            },
                            "function" == typeof (l = p.meta).getMeta ? l.getMeta(n, a, s) : y.post(l.url, JSON.stringify(n), a, s)
                    };
                v()
            },
            a.prototype._cancelQueryAiSetting = function () {
                this.__retrieveHandlerId && (clearTimeout(this.__retrieveHandlerId), this.__retrieveHandlerId = null, this._queryStartDate = null)
            },
            a.prototype._createRect = function (e) {
                var t = new r(this._player, e);
                return this._aiContainer.addChild(t),
                    t
            },
            t.exports = a
    },
        {
            "../../lib/io": 29,
            "../../lib/requestanimation": 35,
            "../../lib/url": 38,
            "../../lib/util": 39,
            "../../ui/component/ai/aicontainer": 96,
            "../../ui/component/ai/rect": 97,
            "../base/event/eventtype": 47
        }],
    87: [function (e, t, i) {
        var n = e("../base/event/eventtype"),
            r = function (i) {
                this._player = i,
                    this._video = i.tag;
                var r = this;
                this._isCreated = !1,
                    this._canPlayTriggered = !1,
                    this._defaultTrack = "",
                    i.on(n.Private.ChangeURL, function () {
                        r._isCreated = !1,
                            r._canPlayTriggered = !1,
                            r._defaultTrack = ""
                    }),
                    i.on(n.Player.CanPlay, function () {
                        if (!r._canPlayTriggered) {
                            var e = r._getTracks();
                            e && (r._isCreated = !0, i.trigger(n.Player.AudioTrackReady, e), r._notifyDefaultValue(e)),
                                r._canPlayTriggered = !0
                        }
                    }),
                    i.on(n.Player.AudioTrackUpdated, function (e) {
                        if (!r._isCreated) {
                            var t = r._getTracks(e.paramData.audioTracks);
                            t && (r._isCreated = !0, i.trigger(n.Player.AudioTrackReady, t), r._notifyDefaultValue(t))
                        }
                    })
            };
        r.prototype._notifyDefaultValue = function (e) {
            !this._defaultTrack && 0 < e.length && (this._defaultTrack = e[0]),
            this._defaultTrack && this._player.trigger(n.Private.SelectorUpdateList, {
                type: "audio",
                text: this._defaultTrack.text
            })
        },
            r.prototype.support = function () {
                return !!this._video.audioTracks
            },
            r.prototype._getTracks = function (e) {
                if (!this.support() && !e) return null;
                this._video && this._video.audioTracks && (!e || e && 0 == e.length) && (e = this._video.audioTracks);
                for (var t = [], i = e ? e.length : 0, r = 0; r < i; r++) {
                    var n = e[r],
                        o = {
                            value: n.id,
                            text: n.label || n.name
                        };
                    (n["default"] || n.enabled) && (this._defaultTrack = o),
                        t.push(o)
                }
                return t
            },
            r.prototype["switch"] = function (e) {
                if (this._player._hls) this._player._hls.audioTrack = 1 * e;
                else for (var t = this._video.audioTracks ? this._video.audioTracks.length : 0, i = 0; i < t; i++) {
                    var r = this._video.audioTracks[i];
                    r.id == e ? r.enabled = !0 : r.enabled = !1
                }
            },
            t.exports = r
    },
        {
            "../base/event/eventtype": 47
        }],
    88: [function (e, t, i) {
        var r = e("../base/event/eventtype"),
            n = e("../../lib/dom"),
            o = e("../../lib/ua"),
            a = function (e) {
                this._video = e.tag,
                    this._player = e,
                    this._isCreated = !1,
                    this._backupCC = "",
                    this.tracks = [],
                    this._defaultTrack = "";
                var t = this;
                e.on(r.Private.ChangeURL, function () {
                    t._disabledTracks(),
                        t._isCreated = !1,
                        t._defaultTrack = ""
                }),
                    e.on(r.Player.CanPlay, function () {
                        t._isCreated || (t.tracks = t._getTracks(), t._isCreated = !0, e.trigger(r.Player.TextTrackReady, t.tracks), t._defaultTrack && e.trigger(r.Private.SelectorUpdateList, {
                            type: "cc",
                            text: t._defaultTrack.text
                        }))
                    }),
                    this._adaptiveCueStype(),
                    e.on(r.Player.RequestFullScreen, function () {
                        t._adaptiveCueStype()
                    }),
                    e.on(r.Player.CancelFullScreen, function () {
                        t._adaptiveCueStype()
                    })
            };
        a.prototype._adaptiveCueStype = function () {
            var e = -10;
            if (o.IS_SAFARI) {
                e = -65;
                var t = this._player.fullscreenService;
                t && t.getIsFullScreen() && (e = -95)
            } else o.IS_MOBILE && (e = -30);
            n.addCssByStyle("video::-webkit-media-text-track-container{transform: translateY(" + e + "px) !important;}")
        },
            a.prototype.close = function () {
                for (var e = this._video && this._video.textTracks ? this._video.textTracks.length : 0, t = 0; t < e; t++) {
                    var i = this._video.textTracks[t];
                    "expired" != i.mode && ("showing" == i.mode && (this._backupCC = i), i.mode = "disabled")
                }
            },
            a.prototype.open = function () {
                if (this.tracks && !(this.tracks.length < 2)) {
                    var e = this._backupCC ? this._backupCC.language : "",
                        t = this._backupCC ? this._backupCC.label : "";
                    return e || (e = this.tracks[1].value, t = this.tracks[1].text),
                        this["switch"](e),
                        t
                }
            },
            a.prototype._getTracks = function () {
                var e = this._video && this._video.textTracks ? this._video.textTracks.length : 0;
                this._defaultTrack = {
                    value: "off",
                    text: "Off"
                };
                for (var t = [this._defaultTrack], i = 0; i < e; i++) {
                    var r = this._video.textTracks[i];
                    if ("expired" != r.mode && "subtitles" == r.kind) {
                        var n = {
                            value: r.language,
                            text: r.label
                        };
                        r["default"] && (this._defaultTrack = n),
                            t.push(n)
                    }
                }
                return t
            },
            a.prototype._disabledTracks = function () {
                for (var e = this._video && this._video.textTracks ? this._video.textTracks.length : 0, t = 0; t < e; t++) {
                    this._video.textTracks[t].mode = "expired"
                }
            },
            a.prototype["switch"] = function (e) {
                if (this.close(), "off" != e) for (var t = this._video && this._video.textTracks ? this._video.textTracks.length : 0, i = 0; i < t; i++) {
                    var r = this._video.textTracks[i];
                    r.language === e && "expired" != r.mode && (this._video.textTracks[i].mode = "showing")
                }
                else this.close()
            },
            t.exports = a
    },
        {
            "../../lib/dom": 23,
            "../../lib/ua": 37,
            "../base/event/eventtype": 47
        }],
    89: [function (e, t, i) {
        var r = e("../../lib/playerutil");
        t.exports = [{
            service: e("./ccservice"),
            name: "_ccService",
            condition: !0
        },
            {
                service: e("./audiotrackservice"),
                name: "_audioTrackService"
            },
            {
                service: e("./qualityservice"),
                name: "_qualityService"
            },
            {
                service: e("./ailabelservice"),
                name: "_aiLabelService",
                condition: function () {
                    return this._isEnabledAILabel()
                }
            },
            {
                service: e("./fullscreenservice"),
                name: "fullscreenService",
                condition: function () {
                    return !0
                }
            },
            {
                service: e("./liveshiftservice"),
                name: "_liveshiftService",
                condition: function () {
                    var e = this.options();
                    return r.isLiveShift(e)
                }
            },
            {
                service: e("./thumbnailservice"),
                name: "_thumbnailService",
                condition: function () {
                    return !0
                }
            }]
    },
        {
            "../../lib/playerutil": 34,
            "./ailabelservice": 86,
            "./audiotrackservice": 87,
            "./ccservice": 88,
            "./fullscreenservice": 90,
            "./liveshiftservice": 91,
            "./qualityservice": 92,
            "./thumbnailservice": 93
        }],
    90: [function (e, t, i) {
        var n = e("../../lib/ua"),
            o = e("../../lib/dom"),
            a = e("../../lib/event"),
            s = e("../base/event/eventtype"),
            r = e("../base/x5play"),
            l = e("../../lang/index"),
            c = function () {
                var e;
                o.createEl("div");
                var t = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror", "fullScreen"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitfullScreen"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitIsFullScreen"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror", "mozFullScreen"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError", "MSFullScreen"]
                    ],
                    i = !(e = {});
                if (n.IS_IOS && (e.requestFn = "webkitEnterFullscreen", e.cancelFn = "webkitExitFullscreen", e.fullscreenElement = "webkitFullscreenElement", e.eventName = "webkitfullscreenchange", e.isFullScreen = "webkitDisplayingFullscreen", document[e.requestFn] && (i = !0)), !i) {
                    for (var r = 0; r < 5; r++)
                        if (t[r][1] in document) {
                            e.requestFn = t[r][0],
                                e.cancelFn = t[r][1],
                                e.fullscreenElement = t[r][2],
                                e.eventName = t[r][4],
                                e.isFullScreen = t[r][6];
                            break
                        }
                    "requestFullscreen" in document ? e.requestFn = "requestFullscreen" : "webkitRequestFullscreen" in document ? e.requestFn = "webkitRequestFullscreen" : "webkitRequestFullScreen" in document ? e.requestFn = "webkitRequestFullScreen" : "webkitEnterFullscreen" in document ? e.requestFn = "webkitEnterFullscreen" : "mozRequestFullScreen" in document ? e.requestFn = "mozRequestFullScreen" : "msRequestFullscreen" in document && (e.requestFn = "msRequestFullscreen"),
                        "fullscreenchange" in document ? e.eventName = "fullscreenchange" : "webkitfullscreenchange" in document ? e.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? e.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? e.eventName = "webkitfullscreenchange" : "mozfullscreenchange" in document ? e.eventName = "mozfullscreenchange" : "MSFullscreenChange" in document && (e.eventName = "MSFullscreenChange"),
                        "fullScreen" in document ? e.isFullScreen = "fullScreen" : "webkitfullScreen" in document ? e.isFullScreen = "webkitfullScreen" : "webkitIsFullScreen" in document ? e.isFullScreen = "webkitIsFullScreen" : "webkitDisplayingFullscreen" in document ? e.isFullScreen = "webkitDisplayingFullscreen" : "mozFullScreen" in document ? e.isFullScreen = "mozFullScreen" : "mozfullScreen" in document ? e.isFullScreen = "mozfullScreen" : "MSFullScreen" in document && (e.isFullScreen = "MSFullScreen"),
                        "fullscreenElement" in document ? e.fullscreenElement = "fullscreenElement" : "webkitFullscreenElement" in document ? e.fullscreenElement = "webkitFullscreenElement" : "webkitFullScreenElement" in document ? e.fullscreenElement = "webkitFullScreenElement" : "mozFullScreenElement" in document ? e.fullscreenElement = "mozFullScreenElement" : "msFullscreenElement" in document ? e.fullscreenElement = "msFullscreenElement" : "MSFullscreenElement" in document && (e.fullscreenElement = "MSFullscreenElement")
                }
                return e.requestFn ? e : null
            }(),
            u = function (e) {
                this.isFullWindow = !1,
                    this.isFullScreen = !1,
                    this.isFullScreenChanged = !1,
                    this._requestFullScreenTimer = null,
                    this._cancelFullScreenTimer = null,
                    this._player = e;
                var r = this,
                    n = c;
                n && a.on(document, n.eventName, function (e) {
                    var t = document[n.isFullScreen];
                    if (void 0 !== t) r.isFullScreen = t;
                    else {
                        var i = document[n.fullscreenElement];
                        r.isFullScreen = null != i
                    }
                    (r.isFullScreenChanged = !0) === r.isFullScreen ? r._player.trigger(s.Player.RequestFullScreen) : r._player.trigger(s.Player.CancelFullScreen)
                })
            };
        u.prototype.requestFullScreen = function () {
            if (!r.isAndroidX5() || !this._player.paused()) {
                var e = c,
                    t = this._player.el(),
                    i = this;
                if (n.IS_IOS) return (t = this._player.tag)[e.requestFn](),
                    i._player.trigger(s.Player.RequestFullScreen),
                    this;
                this.isFullScreen = !0,
                    this.isFullScreenChanged = !1,
                    this._requestFullScreenTimer = null,
                this._cancelFullScreenTimer || clearTimeout(this._cancelFullScreenTimer);
                i = this;
                return e ? (t[e.requestFn](), this._requestFullScreenTimer = setTimeout(function () {
                    i.isFullScreenChanged || (p.apply(i), i._player.trigger(s.Player.RequestFullScreen)),
                        i._requestFullScreenTimer = null
                }, 1e3)) : (p.apply(i), this._player.trigger(s.Player.RequestFullScreen)),
                    this._player
            }
            this._player.trigger(s.Private.Info_Show, l.get("Play_Before_Fullscreen"))
        },
            u.prototype.cancelFullScreen = function () {
                var e = c;
                this.isFullScreen = !1,
                    this.isFullScreenChanged = !1,
                    this._cancelFullScreenTimer = null,
                this._requestFullScreenTimer || clearTimeout(this._requestFullScreenTimer);
                var t = this;
                return e ? (document[e.cancelFn](), t._cancelFullScreenTimer = setTimeout(function () {
                    t.isFullScreenChanged || (d.apply(t), t._player.trigger(s.Player.CancelFullScreen)),
                        t._cancelFullScreenTimer = null
                }, 500)) : (d.apply(t), this._player.trigger(s.Player.CancelFullScreen)),
                this._player.tag.paused || this._player.trigger(s.Player.Play),
                    this._player
            },
            u.prototype.getIsFullScreen = function () {
                return this.isFullScreen
            };
        var p = function () {
                this.isFullWindow = !0,
                    this.docOrigOverflow = document.documentElement.style.overflow,
                    document.documentElement.style.overflow = "hidden",
                    o.addClass(document.getElementsByTagName("body")[0], "prism-full-window")
            },
            d = function () {
                this.isFullWindow = !1,
                    document.documentElement.style.overflow = this.docOrigOverflow,
                    o.removeClass(document.getElementsByTagName("body")[0], "prism-full-window")
            };
        t.exports = u
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/ua": 37,
            "../base/event/eventtype": 47,
            "../base/x5play": 71
        }],
    91: [function (e, t, i) {
        var n = e("../../lib/io"),
            o = e("../../lib/util"),
            a = e("../../lib/playerUtil"),
            s = e("../../lang/index"),
            r = e("../flv/flvinjector"),
            l = e("../hls/hlsinjector"),
            c = e("../../lib/constants"),
            u = e("../base/event/eventtype"),
            p = (e("../../lib/url"), function (e, t) {
                if (e && e) {
                    var i = new Date(e),
                        r = new Date(t),
                        n = r.valueOf() / 1e3 - i.valueOf() / 1e3;
                    return {
                        start: i,
                        end: r,
                        endDisplay: o.extractTime(r),
                        totalTime: n
                    }
                }
            }),
            d = function (e, t) {
                t && (e.currentTimestamp = t, e.currentTime = o.convertToDate(t), e.currentTimeDisplay = o.extractTime(e.currentTime), e.liveShiftStart = e.liveTimeRange.start, e.liveShiftEnd = e.liveTimeRange.end, e.liveShiftStartDisplay = o.extractTime(e.liveShiftStart), e.liveShiftEndDisplay = o.extractTime(e.liveShiftEnd), e.availableLiveShiftTime = t - e.liveShiftStart.valueOf() / 1e3, e.timestampStart = o.convertToTimestamp(e.liveShiftStart), e.timestampEnd, o.convertToTimestamp(e.liveShiftEnd))
            },
            h = function (t) {
                this._player = t,
                    this._isLiveShift = !1;
                var r = this,
                    e = function () {
                        var e = t._options.source;
                        this._originalPlayUrl = e,
                            this._liveShiftUrl = t._options.liveTimeShiftUrl,
                            this.liveTimeRange = p(t._options.liveStartTime, t._options.liveOverTime),
                            this.availableLiveShiftTime = 0,
                            this.seekTime = -1
                    };
                e.call(this),
                    t.liveShiftSerivce = {
                        setLiveTimeRange: function (e, t) {
                            r.setLiveTimeRange(e, t)
                        },
                        queryLiveShift: function (e, t, i) {
                            r.queryLiveShift(e, t, i)
                        }
                    },
                    t.on(u.Private.ChangeURL, function () {
                        e.call(r)
                    })
            };
        h.prototype.validate = function () {
            return !(this.liveTimeRange.start >= this.liveTimeRange.end)
        },
            h.prototype.switchToLive = function () {
                var e = that._player._options.recreatePlayer;
                e && this._isLiveShift && (this._player.dispose(), e(), this._isLiveShift = !1)
            },
            h.prototype.getBaseTime = function () {
                this.liveShiftStartDisplay;
                return -1 == this.seekTime ? o.parseTime(this.currentTimeDisplay) : o.parseTime(this.liveShiftStartDisplay) + this.seekTime
            },
            h.prototype.getSourceUrl = function (e, t) {
                var i = this._originalPlayUrl;
                return this.availableLiveShiftTime <= e ? i : (this._isLiveShift = !0, (e = parseInt(e)) <= 5 && (e = 5), (i = this._switchLiveShiftPlayer(t)) && (i = i.replace("lhs_offset_unix_s_0", "z")), i = -1 == i.indexOf("?") ? i + "?lhs_offset_unix_s_0=" + e : i + "&lhs_offset_unix_s_0=" + e)
            },
            h.prototype._switchLiveShiftPlayer = function () {
                var e = this._originalPlayUrl,
                    t = this._player._options.liveShiftSource,
                    i = this._player._options.source;
                if (a.isHls(i)) e = i;
                else if (a.isFlv(e) && t && a.isHls(t)) {
                    this._player._flv && this._player.destroy();
                    var r = this._player._superType,
                        n = this._player._Type;
                    return this._player._options._autoplay = !0,
                        l.inject(this._player, n, r, this._player._options, function () {
                        }, !0),
                        t
                }
                return e
            },
            h.prototype._switchLivePlayer = function () {
                var e = this._originalPlayUrl;
                if (a.isFlv(e)) {
                    this._player._hls && this._player.destroy();
                    var t = this._player._superType,
                        i = this._player._Type;
                    this._player._options._autoplay = !0,
                        r.inject(this._player, i, t.prototype, this._player._options, function () {
                        }, !0)
                }
                return e
            },
            h.prototype.getTimeline = function (i, r) {
                if (this._player.trigger(u.Private.LiveShiftQueryCompleted), this._liveShiftUrl) {
                    var n = this;
                    this.queryLiveShift(this._liveShiftUrl, function (e) {
                        if (e) {
                            var t = e;
                            0 == t.retCode ? (d(n, t.content.current), i && i()) : r({
                                Code: c.ErrorCode.ServerAPIError,
                                Message: t.retCode + "|" + t.description + "|" + t.content
                            })
                        } else console.log("获取直播时移数据失败")
                    }, function (e) {
                        if (r && e) {
                            var t = {};
                            if (e) {
                                if (-1 < e.indexOf("403 Forbidden")) t.Code = c.ErrorCode.AuthKeyExpired,
                                    t.Message = "Query liveshift failed:" + s.get("Error_AuthKey_Text");
                                else {
                                    var i;
                                    t = e;
                                    try {
                                        i = JSON.parse(e)
                                    } catch (e) {
                                    }
                                    i && (t.Code = c.ErrorCode.ServerAPIError, t.Message = i.retCode + "|" + i.description + "|" + i.content)
                                }
                                r(t)
                            }
                        }
                    })
                }
            },
            h.prototype.start = function (e, t) {
                var i = this,
                    r = function () {
                        i._loopHandler = setTimeout(function () {
                            i.getTimeline(function () {
                            }, t),
                                r()
                        }, e)
                    };
                i.getTimeline(function (e) {
                    i._localLiveTimeHandler || i.tickLocalLiveTime()
                }, t),
                    r()
            },
            h.prototype.tickLocalLiveTime = function () {
                var e = this,
                    t = function () {
                        e._localLiveTimeHandler = setTimeout(function () {
                            e.currentTimestamp++,
                                d(e, e.currentTimestamp),
                                e._player.trigger(u.Private.LiveShiftQueryCompleted),
                                t()
                        }, 1e3)
                    };
                t()
            },
            h.prototype.setLiveTimeRange = function (e, t) {
                e || (e = this._player._options.liveStartTime),
                t || (t = this._player._options.liveOverTime),
                    this.liveTimeRange = p(e, t),
                    d(this, this.currentTimestamp),
                    this._player.trigger(u.Private.LiveShiftQueryCompleted)
            },
            h.prototype.queryLiveShift = function (e, i, r) {
                n.get(e, function (e) {
                    if (e) {
                        var t = JSON.parse(e);
                        0 == t.retCode ? i && i(t) : r && r(t)
                    } else r && r(e)
                }, function (e) {
                    r && r(e)
                })
            },
            h.prototype.stop = function (e) {
                this._loopHandler && (clearTimeout(this._loopHandler), this._loopHandler = null)
            },
            t.exports = h
    },
        {
            "../../lang/index": 17,
            "../../lib/constants": 20,
            "../../lib/io": 29,
            "../../lib/playerUtil": 33,
            "../../lib/url": 38,
            "../../lib/util": 39,
            "../base/event/eventtype": 47,
            "../flv/flvinjector": 73,
            "../hls/hlsinjector": 75
        }],
    92: [function (e, t, i) {
        var l = e("../base/event/eventtype"),
            c = e("../../lang/index"),
            r = e("../../lib/hls/hlsparse"),
            u = e("../../lib/object"),
            n = e("../../lib/playerutil"),
            o = function (a) {
                this.levels = [],
                    this._player = a;
                var s = this;
                a.on(l.Player.LevelsLoaded, function (e) {
                    if (0 < s.levels.length && (s.levels = []), (e = e.paramData) && e.levels) {
                        for (var t = e.levels.length - 1; -1 < t; t--) {
                            var i = e.levels[t];
                            if (i.url && 0 < i.url.length && i.attrs && i.attrs.BANDWIDTH) {
                                var r = i.url;
                                u.isArray(r) && (r = r[0]);
                                var n = {
                                    Url: r,
                                    desc: i.height || i.width,
                                    bitrate: i.bitrate,
                                    resolution: i.attrs.RESOLUTION,
                                    bandwidth: i.attrs.BANDWIDTH
                                };
                                s.levels.push(n)
                            }
                        }
                        if (0 < s.levels.length) {
                            var o = c.get("Auto");
                            s.levels.push({
                                Url: e.url,
                                desc: o
                            }),
                                a.trigger(l.Private.SelectorUpdateList, {
                                    type: "quality",
                                    text: o
                                })
                        }
                    }
                }),
                    a.on(l.Video.LoadStart, function () {
                        if (a._options) {
                            var e = a._options.source;
                            !a._hls && e && n.isHls(e) && s.loadLevels(e)
                        }
                    })
            };
        o.prototype = {
            loadLevels: function (e) {
                var t = new r,
                    i = this;
                t.load(e, function (e) {
                    i._player.trigger(l.Player.LevelsLoaded, e)
                })
            }
        },
            t.exports = o
    },
        {
            "../../lang/index": 17,
            "../../lib/hls/hlsparse": 28,
            "../../lib/object": 31,
            "../../lib/playerutil": 34,
            "../base/event/eventtype": 47
        }],
    93: [function (e, t, i) {
        var r = e("../../lib/io"),
            n = e("../../lib/url"),
            o = e("../../lib/vtt/thumbnailvtt"),
            a = e("../base/event/eventtype"),
            s = function (e) {
                this._player = e,
                    this.cues = [],
                    this.baseUrl = "";
                var t = this;
                e.on(a.Private.ChangeURL, function () {
                    t.cues = [],
                        t.baseUrl = ""
                })
            };
        s.prototype = {
            get: function (e) {
                var t = this;
                this.baseUrl = function (e) {
                    var t = n.parseUrl(e);
                    if (t) {
                        var i = t.segments;
                        if (i && 0 < i.length) {
                            var r = i[i.length - 1];
                            baseUrl = e.replace(r, "")
                        }
                    }
                    return baseUrl
                }(e),
                    r.get(e, function (e) {
                        e && o.parse(e, function (e) {
                            t.cues = e,
                                t._player.trigger(a.Private.ThumbnailLoaded, e)
                        })
                    }, function (e) {
                        console.log(e)
                    })
            },
            findAvailableCue: function (e) {
                for (var t = this.cues.length, i = 0; i < t; i++) {
                    var r = this.cues[i];
                    if (r.startTime <= e && e < r.endTime) return r
                }
                return null
            },
            makeUrl: function (e) {
                return -1 == e.indexOf("://") && (e = this.baseUrl + e),
                    e
            }
        },
            t.exports = s
    },
        {
            "../../lib/io": 29,
            "../../lib/url": 38,
            "../../lib/vtt/thumbnailvtt": 40,
            "../base/event/eventtype": 47
        }],
    94: [function (e, t, i) {
        var a = e("../base/player"),
            s = e("../hls/hlsinjector"),
            r = e("../../lib/io"),
            n = a.extend({
                init: function (e, t) {
                    a.call(this, e, t),
                        this.loadVideoInfo()
                }
            });
        n.prototype.loadVideoInfo = function (i) {
            this.trigger("error_hide");
            var n = this._options.vid,
                o = this;
            if (!n) throw new Error("PrismPlayer Error: vid should not be null!");
            r.jsonp("//tv.taobao.com/player/json/getBaseVideoInfo.do?vid=" + n + "&playerType=3", function (e) {
                if (1 !== e.status || !e.data.source) throw new Error("PrismPlayer Error: #vid:" + n + " cannot find video resource!");
                var t, r = -1;
                _.each(e.data.source, function (e, t) {
                    var i = +e.substring(1);
                    r < i && (r = i)
                }),
                    t = e.data.source["v" + r],
                    t = _.unescape(t),
                    o._options.source = t,
                    s.inject(o, TaobaoTVPlayer, a.prototype, o._options),
                    o.initPlay(),
                i && i()
            }, function () {
                throw new Error("PrismPlayer Error: network error!")
            })
        },
            n.prototype.loadByVid = function (e) {
                this._options.vid = e;
                var t = this;
                if (!e) throw new Error("PrismPlayer Error: vid should not be null!");
                this._monitor && this._monitor.updateVideoInfo({
                    video_id: e,
                    album_id: data.data.baseInfo.aid,
                    source: src,
                    from: t._options.from
                }),
                    this._options.autoplay = !0,
                    this.loadVideoInfo(function () {
                        t.cover && t._options.autoplay && (Dom.css(t.cover, "display", "none"), delete t.cover),
                            t.tag.play()
                    })
            },
            t.exports = n
    },
        {
            "../../lib/io": 29,
            "../base/player": 66,
            "../hls/hlsinjector": 75
        }],
    95: [function (e, t, i) {
        var r = e("../lib/oo"),
            n = e("../lib/data"),
            a = e("../lib/object"),
            o = e("../lib/dom"),
            s = e("../lib/event"),
            l = e("../lib/function"),
            c = e("../lib/layout"),
            u = (e("../lib/constants"), e("../lib/util"), e("../player/base/event/eventtype")),
            p = e("./component/util"),
            d = r.extend({
                init: function (e, t) {
                    var i = this;
                    this._player = e,
                        this._eventState = "",
                        this._options = a.copy(t),
                        this._el = this.createEl();
                    var r = e.id;
                    "function" == typeof e.id && (r = e.id()),
                        this._id = r + "_component_" + n.guid(),
                        this._children = [],
                        this._childIndex = {},
                        this._player.on(u.Private.UiH5Ready, function () {
                            i.renderUI(),
                                i.syncUI(),
                                i.bindEvent()
                        })
                }
            });
        d.prototype.renderUI = function () {
            c.render(this.el(), this.options()),
                this.el().id = this.id()
        },
            d.prototype.syncUI = function () {
            },
            d.prototype.bindEvent = function () {
            },
            d.prototype.createEl = function (e, t) {
                return o.createEl(e, t)
            },
            d.prototype.options = function (e) {
                return void 0 === e ? this._options : this._options = a.merge(this._options, e)
            },
            d.prototype.el = function () {
                return this._el
            },
            d.prototype._contentEl,
            d.prototype.player = function () {
                return this._player
            },
            d.prototype.contentEl = function () {
                return this._contentEl || this._el
            },
            d.prototype._id,
            d.prototype.id = function () {
                return this._id
            },
            d.prototype.getId = function () {
                return this._id
            },
            d.prototype.addChild = function (e, t) {
                var i;
                if ("string" == typeof e) {
                    if (!this._player.UI[e]) return;
                    i = new this._player.UI[e](this._player, t)
                } else i = e;
                if (this._children.push(i), "function" == typeof i.id && (this._childIndex[i.id()] = i), "function" == typeof i.el && i.el()) {
                    var r = i.el();
                    r.id = i.id(),
                        this.contentEl().appendChild(r)
                }
                return i
            },
            d.prototype.removeChild = function (e) {
                if (e && this._children) {
                    for (var t = !1, i = this._children.length - 1; 0 <= i; i--)
                        if (this._children[i] === e) {
                            t = !0,
                                this._children.splice(i, 1);
                            break
                        }
                    if (t) {
                        this._childIndex[e.id] = null;
                        var r = e.el();
                        r && r.parentNode === this.contentEl() && this.contentEl().removeChild(e.el())
                    }
                }
            },
            d.prototype.initChildren = function () {
                var i, e, t, r, n;
                if (e = (i = this).options().children) if (a.isArray(e)) for (var o = 0; o < e.length; o++) "string" == typeof (t = e[o]) ? (r = t, n = {}) : (r = t.name, n = t),
                    i.addChild(r, n);
                else a.each(e, function (e, t) {
                        !1 !== t && i.addChild(e, t)
                    })
            },
            d.prototype.on = function (e, t) {
                return s.on(this._el, e, l.bind(this, t)),
                    this
            },
            d.prototype.off = function (e, t) {
                return s.off(this._el, e, t),
                    this
            },
            d.prototype.one = function (e, t) {
                return s.one(this._el, e, l.bind(this, t)),
                    this
            },
            d.prototype.trigger = function (e, t) {
                if (this._el) return (t || 0 == t) && (this._el.paramData = t),
                    this._eventState = e,
                    s.trigger(this._el, e),
                    this
            },
            d.prototype.off = function (e) {
                return s.off(this._el, e),
                    this
            },
            d.prototype.addClass = function (e) {
                return o.addClass(this._el, e),
                    this
            },
            d.prototype.removeClass = function (e) {
                return o.removeClass(this._el, e),
                    this
            },
            d.prototype.show = function () {
                return this._el.style.display = "block",
                    this
            },
            d.prototype.hide = function () {
                return this._el.style.display = "none",
                    this
            },
            d.prototype.destroy = function () {
                if (this.trigger({
                    type: "destroy",
                    bubbles: !1
                }), this._children) for (var e = this._children.length - 1; 0 <= e; e--) this._children[e].destroy && this._children[e].destroy();
                this.children_ = null,
                    this.childIndex_ = null,
                    this.off(),
                this._el.parentNode && this._el.parentNode.removeChild(this._el),
                    n.removeData(this._el),
                    this._el = null
            },
            d.prototype.registerControlBarTooltip = p.registerTooltipEvent,
            t.exports = d
    },
        {
            "../lib/constants": 20,
            "../lib/data": 22,
            "../lib/dom": 23,
            "../lib/event": 24,
            "../lib/function": 25,
            "../lib/layout": 30,
            "../lib/object": 31,
            "../lib/oo": 32,
            "../lib/util": 39,
            "../player/base/event/eventtype": 47,
            "./component/util": 123
        }],
    96: [function (e, t, i) {
        var r = e("../../component"),
            n = (e("../../../lib/dom"), e("../../../lib/event")),
            o = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass("prism-ai-container"),
                        this.width = 0,
                        this.height = 0
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this);
                    return this.bindEvent(),
                        e
                },
                bindEvent: function () {
                    var e = this;
                    n.on(window, "resize", function () {
                        e.reLayout()
                    })
                },
                computeLayout: function (e) {
                    if (e = e || this.el(), videoTag = this._player.tag, playerEle = this._player.el(), videoW = videoTag.videoWidth, videoH = videoTag.videoHeight, eleWidth = playerEle.offsetWidth, eleHeight = playerEle.offsetHeight, tagW = videoTag.offsetWidth, tagH = videoTag.offsetHeight, width = eleWidth > tagW ? tagW : eleWidth, height = eleHeight > tagH ? tagH : eleHeight, height / width < videoH / videoW) {
                        var t = videoW / videoH * height;
                        e.style.width = t + "px",
                            height < eleHeight ? (e.style.top = (eleHeight - height) / 2 + "px", e.style.height = height + "px", this.height = height) : (e.style.top = "0px", e.style.height = "100%", this.height = eleHeight),
                            e.style.left = (width - t) / 2 + "px",
                            this.width = t
                    } else {
                        var i = videoH / videoW * width;
                        e.style.height = i + "px",
                            width < eleWidth ? (e.left = (eleWidth - width) / 2 + "px", e.style.width = width + "px", this.width = width) : (e.style.width = "100%", e.style.left = "0px", this.width = eleWidth),
                            e.style.top = (height - i) / 2 + "px",
                            this.height = i
                    }
                },
                reLayout: function () {
                    this.computeLayout();
                    for (var e = this._children.length, t = 0; t < e; t++)
                        this._children[t].reset()
                },
                getWidth: function () {
                    return this.width
                },
                getHeight: function () {
                    return this.height
                }
            });
        t.exports = o
    },
        {
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../component": 95
        }],
    97: [function (e, t, i) {
        var r = e("../../component"),
            a = e("../../../lib/dom"),
            s = e("../../../lib/util"),
            n = (e("../../../lib/event"), r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass("prism-ai-marking"),
                        this._width = 0,
                        this._height = 0,
                        this._tid = ""
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this),
                        t = '<?xml version="1.0" encoding="UTF-8"?><svg width="8px" height="8px" viewBox="0 0 8 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\x3c!-- Generator: Sketch 49.1 (51147) - http://www.bohemiancoding.com/sketch --\x3e<title>Artboard 2</title><desc>Created with Sketch.</desc><defs></defs><g id="plug" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path d="M3,3 L3,0 L5,0 L5,3 L8,3 L8,5 L5,5 L5,8 L3,8 L3,5 L0,5 L0,3 L3,3 Z" id="Combined-Shape" fill="#FF1D00" fill-rule="nonzero"></path></g></svg>';
                    return e.innerHTML = '<div class="prism-ai-rect-region"><div class="prism-ai-title"><div class="top-left-anchor"></div><div class="top-right-anchor"></div><p></p></div><div class="prism-ai-rect"><div class="prism-ai-slash-container"><div class="prism-ai-top-slash prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div><div class="prism-ai-slash"></div></div></div><div class="anchor-plug top-left">' + t + '</div><div class="anchor-plug top-right">' + t + '</div><div class="anchor-plug bottom-left">' + t + '</div><div class="anchor-plug bottom-right">' + t + '</div></div><div class="prism-ai-labels"></div>',
                        e
                },
                updateLayout: function (e) {
                    this._tid = e.tid;
                    var t, i, r = this.el(),
                        n = (a.getTransformName(r), document.querySelector("#" + this.id() + " .prism-ai-rect"));
                    this._width = e.w,
                        this._height = e.h,
                        s.log("tid=" + e.tid + " width=" + e.w + " videoWidth=" + e.videoWidth + " containerWidth=" + e.containerWidth),
                        n.style.width = e.w / e.videoWidth * e.containerWidth + "px",
                        n.style.height = e.h / e.videoHeight * e.containerHeight + "px",
                    e.color && (t = e.color ? e.color : "#00ff00", n.style["border-style"] = "solid", n.style["border-color"] = t),
                    e.thickness && (i = e.thickness, n.style["border-width"] = i + "px"),
                        r.style.left = 100 * e.x / e.videoWidth + "%",
                        r.style.top = 100 * e.y / e.videoHeight + "%";
                    var o = this.updateLabels(e.attrs);
                    o && (o = o, s.log("tid=" + e.tid + "|xmax=" + e.xmax + "|xmin=" + e.xmin + "|ymax=" + e.ymax + "|ymin=" + e.ymin), this.updateTitle(o))
                },
                updateTitle: function (e) {
                    document.querySelector("#" + this.id() + " .prism-ai-title p").innerText = e
                },
                updateAnchor: function (e) {
                    var t = document.querySelector("#" + this.id() + " .top-left-anchor");
                    t.style["border-width"] = e + "px",
                        (t = document.querySelector("#" + this.id() + " .top-right-anchor")).style["border-width"] = e + "px"
                },
                updateCross: function (t, i) {
                    var e = document.querySelectorAll("#" + this.id() + " .prism-ai-rect-region span.vertical");
                    e && e.forEach(function (e) {
                        e.style.height = t + "px"
                    }),
                    (e = document.querySelectorAll("#" + this.id() + " .prism-ai-rect-region span i")) && e.forEach(function (e) {
                        e.style.background = i
                    }),
                    (e = document.querySelectorAll("#" + this.id() + " .prism-ai-rect-region span.horizental")) && e.forEach(function (e) {
                        e.style.width = t + "px"
                    })
                },
                updateLabels: function (e) {
                    if (!e || 0 != e.length) {
                        var t = o(e, this._player._options.ai);
                        return document.querySelector("#" + this.id() + " .prism-ai-labels").innerHTML = t.text,
                            t.title
                    }
                },
                getTid: function () {
                    return this._tid
                },
                hide: function () {
                    a.css(this.el(), "opacity", "0")
                },
                show: function () {
                    a.css(this.el(), "opacity", "1")
                },
                reset: function () {
                    this._width = 0,
                        this._height = 0
                }
            })),
            o = function (r, n) {
                if (n.displayAttrs, !r || 0 == r.length) return "";
                for (var o = [], a = "", s = 0; s < r.length; s++)
                    Object.keys(r[s]).forEach(function (e) {
                        var t = r[s][e],
                            i = n.displayAttrs[e];
                        e == n.displayAttrs.header ? a = t : "function" == typeof i ? o.push('<a href="javascript:void(0);" class="prism-ai-clickable" data-value=' + t + ">" + e + "</a>") : "text" == i && o.push("<p>" + t + "</p>")
                    });
                return {
                    text: o = o.join(""),
                    title: a
                }
            };
        t.exports = n
    },
        {
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/util": 39,
            "../../component": 95
        }],
    98: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            o = e("../../lib/event"),
            a = e("../../player/base/event/eventtype"),
            s = e("../../player/base/plugin/status"),
            l = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-big-play-btn")
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<div class="outter"></div>',
                        e
                },
                bindEvent: function () {
                    var t = this;
                    this._player.on(a.Player.Play, function () {
                        t.addClass("playing"),
                            t.removeClass("pause"),
                            t._hide()
                    }),
                        this._player.on(a.Player.Pause, function () {
                            if (!t._player._switchSourcing) {
                                t.removeClass("playing"),
                                    t.addClass("pause");
                                var e = t._player._status;
                                e != s.ended && e != s.error && t._show()
                            }
                        });
                    var e = document.querySelector("#" + t.id() + " .outter");
                    o.on(this.el(), "mouseover", function () {
                        n.addClass(e, "big-playbtn-hover-animation")
                    }),
                        o.on(this.el(), "mouseout", function () {
                            n.removeClass(e, "big-playbtn-hover-animation")
                        }),
                        this.on(a.Private.PlayClick, function () {
                            t._player.paused() ? t._player.play(!0) : t._player.pause()
                        }),
                        this._player.on(a.Private.Play_Btn_Show, function () {
                            t._show()
                        }),
                        this._player.on(a.Private.Play_Btn_Hide, function () {
                            t._hide()
                        })
                },
                _show: function () {
                    n.css(this.el(), "display", "block")
                },
                _hide: function () {
                    n.css(this.el(), "display", "none")
                }
            });
        t.exports = l
    },
        {
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../../player/base/plugin/status": 70,
            "../component": 95
        }],
    99: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            o = e("./util"),
            a = e("../../lang/index"),
            s = e("../../player/base/event/eventtype"),
            l = r.extend({
                init: function (e, t) {
                    this.isOpened = !1,
                        r.call(this, e, t),
                        this.addClass(t.className || "prism-cc-btn")
                },
                createEl: function () {
                    return r.prototype.createEl.call(this, "div")
                },
                bindEvent: function () {
                    var i = this;
                    this.on("click", function () {
                        n.addClass(i._el, "disabled");
                        var e = "on",
                            t = "";
                        i.isOpened ? (i._player._ccService.close(), e = "off") : t = i._player._ccService.open(),
                            i.isOpened = !i.isOpened,
                            i._player.trigger(s.Private.CCStateChanged, {
                                value: e,
                                lang: t
                            }),
                            setTimeout(function () {
                                n.removeClass(i._el, "disabled")
                            }, 1e3)
                    }),
                        this._player.on(s.Private.CCChanged, function (e) {
                            var t = e.paramData;
                            i.isOpened = "off" != t
                        }),
                        o.registerTooltipEvent.call(this, this.el(), function () {
                            return i.isOpened ? a.get("CloseSubtitle") : a.get("OpenSubtitle")
                        })
                }
            });
        t.exports = l
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123
        }],
    100: [function (e, t, i) {
        var r = e("../component"),
            o = e("../../player/base/event/eventtype"),
            a = e("../../lib/event"),
            n = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-controlbar"),
                        this.initChildren(),
                        this.onEvent()
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this);
                    return e.innerHTML = '<div class="prism-controlbar-bg"></div>',
                        e
                },
                onEvent: function () {
                    var t = this.player(),
                        e = t.options(),
                        i = this;
                    this.timer = null;
                    var r = e.controlBarVisibility;
                    if (1 == e.controlBarForOver && (r = "hover"), "hover" == r) {
                        i.hide();
                        var n = function () {
                            i._hideHandler && clearTimeout(i._hideHandler),
                                i._show(),
                            t.fullscreenService.getIsFullScreen() && i._hide()
                        };
                        t.on(o.Private.MouseOver, function () {
                            n()
                        }),
                            a.on(this._player.tag, "click", function (e) {
                                e && e.target == e.currentTarget && n()
                            }),
                            a.on(this._player.tag, "touchstart", function (e) {
                                e && e.target == e.currentTarget && n()
                            }),
                            t.on(o.Private.MouseOut, function () {
                                i._hideHandler = setTimeout(function () {
                                    i.hide(),
                                        t.trigger(o.Private.HideBar),
                                        t.trigger(o.Private.VolumeVisibilityChange, ""),
                                        t.trigger(o.Private.SettingListHide)
                                })
                            })
                    } else "click" == r ? (t.on(o.Private.Click, function (e) {
                        t._isError || (e.preventDefault(), e.stopPropagation(), i._show(), i._hide())
                    }), t.on(o.Player.Ready, function () {
                        i._hide()
                    }), t.on(o.Private.TouchStart, function () {
                        i._show()
                    }), t.on(o.Private.TouchMove, function () {
                        i._show()
                    }), t.on(o.Private.TouchEnd, function () {
                        i._hide()
                    })) : i._show()
                },
                _show: function () {
                    this.show(),
                        this._player.trigger(o.Private.ShowBar),
                    this.timer && (clearTimeout(this.timer), this.timer = null)
                },
                _hide: function () {
                    var e = this,
                        t = this.player().options().showBarTime;
                    this.timer = setTimeout(function () {
                        e.hide(),
                            e._player.trigger(o.Private.HideBar),
                            e._player.trigger(o.Private.VolumeVisibilityChange, ""),
                            e._player.trigger(o.Private.SettingListHide)
                    }, t)
                }
            });
        t.exports = n
    },
        {
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    101: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            o = e("../../player/base/event/eventtype"),
            a = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-cover")
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div"),
                        t = this.options().cover;
                    return t && (e.style.backgroundImage = "url(" + t + ")"),
                        e
                },
                _hide: function (e) {
                    var t = document.querySelector("#" + this.id() + " .prism-cover");
                    t && n.css(t, "display", "none")
                },
                _show: function (e) {
                    var t = document.querySelector("#" + this.id() + " .prism-cover");
                    t && n.css(t, "display", "block")
                },
                bindEvent: function () {
                    this._player.on(o.Private.Cover_Show, this._show),
                        this._player.on(o.Private.Cover_Hide, this._hide)
                }
            });
        t.exports = a
    },
        {
            "../../lib/dom": 23,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    102: [function (e, t, i) {
        var r = e("../component"),
            h = e("../../lib/util"),
            f = e("../../lib/dom"),
            n = e("../../lib/event"),
            o = e("../../lib/ua"),
            v = e("../../lang/index"),
            a = e("../../player/base/event/eventtype"),
            s = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-ErrorMessage",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = "<div class='prism-error-content'><p></p></div><div class='prism-error-operation'><a class='prism-button prism-button-refresh'>" + v.get("Refresh_Text") + "</a><a class='prism-button prism-button-retry'  target='_blank'>" + v.get("Retry") + "</a><a class='prism-button prism-button-orange'  target='_blank'>" + v.get("Detection_Text") + "</a></div><div class='prism-detect-info prism-center'><p class='errorCode'><span class='info-label'>code：</span><span class='info-content'></span></p><p class='vid'><span class='info-label'>vid:</span><span class='info-content'></span></p><p class='uuid'><span class='info-label'>uuid:</span><span class='info-content'></span></p><p class='requestId'><span class='info-label'>requestId:</span><span class='info-content'></span></p><p class='dateTime'><span class='info-label'>" + v.get("Play_DateTime") + "：</span><span class='info-content'></span></p></div>",
                        e
                },
                bindEvent: function () {
                    var i = this;
                    i._player.on(a.Private.Error_Show, function (e) {
                        var t = null;
                        i._player.getMonitorInfo && (t = i._player.getMonitorInfo()),
                            i._show(e, t)
                    }),
                        i._player.on(a.Private.Error_Hide, i._hide);
                    var e = document.querySelector("#" + i.id() + " .prism-button-refresh");
                    if (n.on(e, "click", function () {
                        location.reload(!0)
                    }), o.IS_MOBILE) {
                        e = document.querySelector("#" + i.id() + " .prism-detect-info");
                        f.addClass(e, "prism-width90")
                    }
                    var t = document.querySelector("#" + i.id() + " .prism-button-retry");
                    n.on(t, "click", function () {
                        var e = i._player.getCurrentTime(),
                            t = i._player._options.source;
                        i._player._loadByUrlInner(t, e, !0)
                    })
                },
                _show: function (e, t) {
                    var i = e.paramData,
                        r = "",
                        n = "";
                    i.mediaId && (r = i.mediaId);
                    var o = document.querySelector("#" + this.id() + " .prism-button-orange");
                    if (t && this._player._options.diagnosisButtonVisible) {
                        t.vu && (n = decodeURIComponent(t.vu));
                        var a = "http://player.alicdn.com/detection.html?from=h5&vid=" + r + "&source=" + n + "&pd=" + t.pd + "&vt=" + t.vt + "&tt=" + t.tt + "&uuid=" + t.uuid + "&av=" + t.av + "&bi=" + t.bi + "&md=" + t.md + "&vu=" + n + "&lang=" + v.getCurrentLanguage();
                        o.href = a
                    } else f.css(o, "display", "none");
                    var s = i.display_msg || i.error_msg;
                    document.querySelector("#" + this.id() + " .prism-error-content p").innerHTML = s,
                        document.querySelector("#" + this.id() + " .errorCode .info-content").innerText = i.error_code;
                    var l = document.querySelector("#" + this.id() + " .vid");
                    if (i.mediaId ? (f.css(l, "display", "block"), document.querySelector("#" + this.id() + " .vid .info-content").innerText = i.mediaId) : f.css(l, "display", "none"), i.uuid) document.querySelector("#" + this.id() + " .uuid .info-content").innerText = i.uuid;
                    else {
                        var c = document.querySelector("#" + this.id() + " .uuid");
                        f.css(c, "display", "none")
                    }
                    if (i.requestId) document.querySelector("#" + this.id() + " .requestId .info-content").innerText = i.requestId;
                    else {
                        var u = document.querySelector("#" + this.id() + " .requestId");
                        f.css(u, "display", "none")
                    }
                    document.querySelector("#" + this.id() + " .dateTime .info-content").innerText = h.formatDate(new Date, "yyyy-MM-dd HH:mm:ss");
                    var p = document.querySelector(".prism-ErrorMessage");
                    f.css(p, "display", "block");
                    var d = this;
                    setTimeout(function () {
                        d._player.trigger("play_btn_hide")
                    })
                },
                _hide: function () {
                    var e = document.querySelector(".prism-ErrorMessage");
                    f.css(e, "display", "none")
                }
            });
        t.exports = s
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    103: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../player/base/event/eventtype"),
            o = (e("../../lib/event"), e("../../lang/index")),
            a = e("./util"),
            s = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-fullscreen-btn")
                },
                bindEvent: function () {
                    var e = this;
                    this._player.on(n.Player.RequestFullScreen, function () {
                        e.addClass("fullscreen")
                    }),
                        this._player.on(n.Player.CancelFullScreen, function () {
                            e.removeClass("fullscreen")
                        }),
                        a.registerTooltipEvent.call(this, this.el(), function () {
                            return e._player.fullscreenService.getIsFullScreen() ? o.get("ExistFullScreen") : o.get("Fullscreen")
                        }),
                        this.on("click", function () {
                            e._player.fullscreenService.getIsFullScreen() ? e._player.fullscreenService.cancelFullScreen() : e._player.fullscreenService.requestFullScreen()
                        })
                }
            });
        t.exports = s
    },
        {
            "../../lang/index": 17,
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123
        }],
    104: [function (e, t, i) {
        "use strict";
        var r = e("../component"),
            n = (e("../../lib/dom"), e("../../player/base/event/eventtype")),
            o = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-hide")
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<div class="circle"></div> <div class="circle1"></div>',
                        e
                },
                _loading_hide: function (e) {
                    var t = document.querySelector("#" + this.id() + " .prism-loading");
                    t && (t.className = "prism-hide")
                },
                _loading_show: function (e) {
                    var t = document.querySelector("#" + this.id() + " .prism-hide");
                    t && (t.className = "prism-loading")
                },
                bindEvent: function () {
                    this._player.on(n.Private.H5_Loading_Show, this._loading_show),
                        this._player.on(n.Private.H5_Loading_Hide, this._loading_hide)
                }
            });
        t.exports = o
    },
        {
            "../../lib/dom": 23,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    105: [function (e, t, i) {
        var r = e("../component"),
            n = (e("../../lib/util"), e("../../lib/dom")),
            o = (e("../../lib/event"), e("../../lib/ua"), e("../../lang/index"), e("../../player/base/event/eventtype")),
            a = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-info-display",
                        this.addClass(this.className)
                },
                createEl: function () {
                    return r.prototype.createEl.call(this, "p")
                },
                bindEvent: function () {
                    var r = this;
                    r._player.on(o.Private.Info_Show, function (e) {
                        var t = document.querySelector("#" + r.getId()),
                            i = e.paramData;
                        i && (void 0 !== i.text && i.text ? (t.innerHTML = i.text, void 0 !== i.duration && i.duration && setTimeout(function () {
                            n.css(t, "display", "none")
                        }, i.duration), "bl" != typeof i.align ? n.addClass(t, "prism-info-left-bottom") : n.removeClass(t, "prism-info-left-bottom")) : t.innerHTML = i, n.css(t, "display", "block"))
                    }),
                        r._player.on(o.Private.Info_Hide, function (e) {
                            var t = document.querySelector("#" + r.getId());
                            n.css(t, "display", "none")
                        })
                }
            });
        t.exports = a
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    106: [function (e, t, i) {
        var r = e("../component"),
            n = e("./util"),
            o = (e("../../lib/util"), e("../../lib/dom")),
            a = e("../../lib/event"),
            s = e("../../lib/playerUtil"),
            l = e("../../lang/index"),
            c = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-live-display",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "p");
                    return e.innerText = "LIVE",
                    s.isLiveShift(this._player._options) && o.addClass(e, "live-shift-display"),
                        e
                },
                bindEvent: function () {
                    var e = document.querySelector("#" + this.id()),
                        t = this;
                    s.isLiveShift(this._player._options) && (a.on(e, "click", function () {
                        t._player._liveshiftService.switchToLive()
                    }), n.registerTooltipEvent.call(this, this.el(), l.get("SwitchToLive")))
                }
            });
        t.exports = c
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/playerUtil": 33,
            "../../lib/util": 39,
            "../component": 95,
            "./util": 123
        }],
    107: [function (e, t, i) {
        var r = e("../component"),
            n = (e("../../lib/dom"), e("../../lib/event"), e("../../player/base/event/eventtype")),
            o = e("../../player/base/plugin/status"),
            a = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-animation")
                },
                bindEvent: function () {
                    var t = this;
                    this._player.on(n.Player.Play, function () {
                        t.removeClass("prism-pause-animation"),
                            t.addClass("prism-play-animation"),
                            t.removeClass("play-apply-animation"),
                            setTimeout(function () {
                                t.addClass("play-apply-animation")
                            })
                    }),
                        this._player.on(n.Player.Pause, function () {
                            var e = t._player._status;
                            e != o.ended && e != o.error && (t.removeClass("prism-play-animation"), t.addClass("prism-pause-animation"), t.removeClass("play-apply-animation"), setTimeout(function () {
                                t.addClass("play-apply-animation")
                            }))
                        })
                }
            });
        t.exports = a
    },
        {
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../../player/base/plugin/status": 70,
            "../component": 95
        }],
    108: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../player/base/event/eventtype"),
            o = e("./util"),
            a = e("../../lang/index"),
            s = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-play-btn")
                },
                bindEvent: function () {
                    var e = this;
                    this._player.on(n.Player.Play, function () {
                        e.addClass("playing")
                    }),
                        this._player.on(n.Player.Pause, function () {
                            e.removeClass("playing")
                        }),
                        this.on(n.Private.PlayClick, function () {
                            e._player.paused() ? (e._player.play(!0), e.addClass("playing")) : (e._player.pause(), e.removeClass("playing"))
                        }),
                        o.registerTooltipEvent.call(this, this.el(), function () {
                            return e._player.paused() ? a.get("Play") : a.get("Pause")
                        })
                }
            });
        t.exports = s
    },
        {
            "../../lang/index": 17,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123
        }],
    109: [function (e, t, i) {
        var r = e("../component"),
            o = e("../../lib/dom"),
            n = e("../../lib/event"),
            a = e("../../lib/ua"),
            s = e("../../lib/function"),
            l = e("../../lang/index"),
            c = e("../../config"),
            u = e("../../lib/util"),
            p = e("../../player/base/event/eventtype"),
            d = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-progress",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this);
                    return e.innerHTML = '<div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"><img></img></div><p class="prism-progress-time"></p>',
                        e
                },
                bindEvent: function () {
                    var t = this;
                    this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"),
                        this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"),
                        this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"),
                        this.timeNode = document.querySelector("#" + this.id() + " .prism-progress-time"),
                        this.controlNode = document.querySelector("#" + this._player._options.id + " .prism-controlbar");
                    var e = document.querySelector("#" + this.id()),
                        i = document.querySelector("#" + this.id() + " .prism-progress-cursor img"),
                        r = "https://" + c.domain + "/de/prismplayer/" + c.h5Version + "/skins/default/img/dragcursor.png";
                    c.domain ? -1 < c.domain.indexOf("localhost") && (r = "//" + c.domain + "/build/skins/default/img/dragcursor.png") : r = "de/prismplayer/" + c.h5Version + "/skins/default/img/dragcursor.png",
                        i.src = r,
                        n.on(this.cursorNode, "mousedown", function (e) {
                            t._onMouseDown(e)
                        }),
                        n.on(this.cursorNode, "touchstart", function (e) {
                            t._onMouseDown(e)
                        }),
                        n.on(this.cursorNode, "mouseover", function () {
                            o.addClass(t.cursorNode, "cursor-hover")
                        }),
                        n.on(this.cursorNode, "mouseout", function (e) {
                            o.removeClass(t.cursorNode, "cursor-hover")
                        }),
                        n.on(e, "mousemove", function (e) {
                            t._progressMove(e)
                        }),
                        n.on(e, "touchmove", function (e) {
                            t._progressMove(e)
                        }),
                        n.on(this._el, "click", function (e) {
                            t._onMouseClick(e)
                        }),
                        this._player.on(p.Private.HideProgress, function (e) {
                            t._hideProgress(e)
                        }),
                        this._player.on(p.Private.CancelHideProgress, function (e) {
                            t._cancelHideProgress(e)
                        }),
                        n.on(e, p.Private.MouseOver, function (e) {
                            t._onMouseOver(e)
                        }),
                        n.on(e, p.Private.MouseOut, function (e) {
                            t._onMouseOut(e)
                        }),
                        n.on(this.controlNode, p.Private.MouseLeave, function (e) {
                            t._offMouseUp()
                        }),
                        this.bindTimeupdate = s.bind(this, this._onTimeupdate),
                        this._player.on(p.Player.TimeUpdate, this.bindTimeupdate),
                        a.IS_IPAD ? this.interval = setInterval(function () {
                            t._onProgress()
                        }, 500) : this._player.on(p.Video.Progress, function () {
                            t._onProgress()
                        })
                },
                _progressMove: function (e) {
                    var t = this._getSeconds(e);
                    if (t != 1 / 0) {
                        var i = u.formatTime(t),
                            r = this._getDistance(e);
                        this.cursorNode && this._player.trigger(p.Private.ThumbnailShow, {
                            time: t,
                            formatTime: i,
                            left: r,
                            progressWidth: this.el().offsetWidth
                        })
                    }
                },
                _hideProgress: function (e) {
                    n.off(this.cursorNode, "mousedown"),
                        n.off(this.cursorNode, "touchstart")
                },
                _cancelHideProgress: function (e) {
                    var t = this;
                    n.on(this.cursorNode, "mousedown", function (e) {
                        t._onMouseDown(e)
                    }),
                        n.on(this.cursorNode, "touchstart", function (e) {
                            t._onMouseDown(e)
                        })
                },
                _canSeekable: function (e) {
                    var t = !0;
                    return "function" == typeof this._player.canSeekable && (t = this._player.canSeekable(e)),
                        t
                },
                _onMouseOver: function (e) {
                    if (this._cursorHideHandler && (clearTimeout(this._cursorHideHandler), this._cursorHideHandler = null), !this._mouseInProgress) {
                        this._updateCursorPosition(this._player.getCurrentTime());
                        var t = this;
                        setTimeout(function () {
                            o.css(t.cursorNode, "display", "block")
                        })
                    }
                    this._mouseInProgress = !0
                },
                _onMouseOut: function (e) {
                    var t = this;
                    this._cursorHideHandler = setTimeout(function () {
                        o.css(t.cursorNode, "display", "none"),
                            t._player.trigger(p.Private.ThumbnailHide),
                            t._mouseInProgress = !1
                    })
                },
                _getSeconds: function (e) {
                    var t = this._getDistance(e),
                        i = this.el().offsetWidth,
                        r = this._player.getDuration() ? t / i * this._player.getDuration() : 0;
                    return r < 0 && (r = 0),
                    r > this._player.getDuration() && (r = this._player.getDuration()),
                        r
                },
                _getDistance: function (e) {
                    for (var t = this.el().offsetLeft, i = this.el(); i = i.offsetParent;)
                        t += i.offsetLeft;
                    var r = e.touches ? e.touches[0].pageX : e.pageX;
                    return Math.abs(r - t)
                },
                _onMouseClick: function (e) {
                    var t = this._getSeconds(e);
                    if (this._canSeekable(t)) {
                        this._player.trigger(p.Private.SeekStart, {
                            fromTime: this._player.getCurrentTime()
                        }),
                            this._updateCursorPosition(t),
                            this._player.seek(t);
                        this._player.trigger(p.Private.EndStart, {
                            toTime: t
                        })
                    } else this._player.trigger(p.Private.Info_Show, {
                        text: l.get("Can_Not_Seekable"),
                        duration: 2e3
                    })
                },
                _onMouseDown: function (e) {
                    var t = this;
                    e.preventDefault(),
                        this._player.trigger(p.Private.SeekStart, {
                            fromTime: this._player.getCurrentTime()
                        }),
                        n.on(this.controlNode, "mousemove", function (e) {
                            t._onMouseMove(e)
                        }),
                        n.on(this.controlNode, "touchmove", function (e) {
                            t._onMouseMove(e)
                        }),
                        n.on(this._player.tag, "mouseup", function (e) {
                            t._onPlayerMouseUp(e)
                        }),
                        n.on(this._player.tag, "touchend", function (e) {
                            t._onPlayerMouseUp(e)
                        }),
                        n.on(this.controlNode, "mouseup", function (e) {
                            t._onControlBarMouseUp(e)
                        }),
                        n.on(this.controlNode, "touchend", function (e) {
                            t._onControlBarMouseUp(e)
                        })
                },
                _onMouseUp: function (e) {
                    this._onMouseUpIntern(e)
                },
                _onControlBarMouseUp: function (e) {
                    this._onMouseUpIntern(e)
                },
                _onPlayerMouseUp: function (e) {
                    this._onMouseUpIntern(e)
                },
                _offMouseUp: function () {
                    n.off(this.controlNode, "mousemove"),
                        n.off(this.controlNode, "touchmove"),
                        n.off(this._player.tag, "mouseup"),
                        n.off(this._player.tag, "touchend"),
                        n.off(this.controlNode, "mouseup"),
                        n.off(this.controlNode, "touchend")
                },
                _onMouseUpIntern: function (e) {
                    e.preventDefault(),
                        this._offMouseUp();
                    var t = this.playedNode.offsetWidth / this.el().offsetWidth * this._player.getDuration();
                    this._player.getDuration();
                    isNaN(t) || this._player.seek(t),
                        this._player.trigger(p.Private.EndStart, {
                            toTime: t
                        })
                },
                _onMouseMove: function (e) {
                    e.preventDefault();
                    var t = this._getSeconds(e);
                    this._player._hls || (this._player.seek(t), this._player.play()),
                        this._updateProgressBar(this.playedNode, t),
                        this._updateCursorPosition(t)
                },
                _onTimeupdate: function (e) {
                    this._updateProgressBar(this.playedNode, this._player.getCurrentTime()),
                        this._updateCursorPosition(this._player.getCurrentTime()),
                        this._player.trigger(p.Private.UpdateProgressBar, {
                            time: this._player.getCurrentTime()
                        })
                },
                _onProgress: function (e) {
                    this._player.getDuration() && 1 <= this._player.getBuffered().length && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1))
                },
                _updateProgressBar: function (e, t) {
                    var i = this._player.getDuration();
                    if (1 != this._player._switchSourcing && i) {
                        var r = t / i + .005;
                        1 < r && (r = 1),
                        e && o.css(e, "width", 100 * r + "%")
                    }
                },
                _updateCursorPosition: function (e) {
                    var t = this._player.getDuration();
                    if (1 != this._player._switchSourcing && t) {
                        var i = e / t,
                            r = 1,
                            n = this._player.el().clientWidth;
                        0 != n && (r = 1 - 18 / n),
                        this.cursorNode && (r < i ? (o.css(this.cursorNode, "right", "0px"), o.css(this.cursorNode, "left", "auto")) : (o.css(this.cursorNode, "right", "auto"), o.css(this.cursorNode, "left", 100 * i + "%")))
                    }
                }
            });
        t.exports = d
    },
        {
            "../../config": 11,
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/function": 25,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    110: [function (e, t, i) {
        var r = e("./selector"),
            s = e("../../../lib/object"),
            o = (e("../../../lib/util"), e("../../../lib/cookie")),
            l = e("../../../lib/dom"),
            a = (e("../../../lib/event"), e("../../../lib/constants")),
            c = e("../../../lang/index"),
            u = e("../../../player/base/event/eventtype"),
            n = r.extend({
                init: function (e, t) {
                    this.Name = c.get("Quality"),
                        this.Type = "quality",
                        this.Tooltip = c.get("Quality_Switch_To"),
                        r.call(this, e, t),
                        this._isMasterLevel = !1
                },
                showTip: function (e, t) {
                    this._player.trigger(u.Private.Info_Show, {
                        text: e,
                        duration: t,
                        align: "lb"
                    })
                },
                bindEvent: function () {
                    this.bindCommonEvent();
                    var s = this;
                    this._player.on(u.Private.QualityChange, function (e) {
                        var t = s._player._urls,
                            i = e.paramData;
                        if (i.levelSwitch) {
                            var r = i.desc;
                            s._autoSWitchDesc = r,
                                s._updateText(r)
                        } else if (0 < s._player._currentPlayIndex) {
                            s._autoSWitchDesc = "";
                            var n = s._player._currentPlayIndex,
                                o = t[n - 1].desc,
                                a = t[n].desc;
                            s.showTip(o + e.paramData + a, 1e3),
                                s._player.trigger(u.Private.SelectorValueChange, t[n].Url)
                        }
                    });
                    var e = document.querySelector("#" + s.id() + " .selector-list");
                    this._player.on(u.Player.LevelSwitch, function () {
                        l.addClass(e, "disabled")
                    }),
                        this._player.on(u.Player.LevelSwitched, function () {
                            l.removeClass(e, "disabled")
                        })
                },
                generateList: function (e) {
                    var t = this._player._urls,
                        n = this._player._currentPlayIndex,
                        i = this._player._qualityService.levels;
                    0 < i.length && (this._isMasterLevel = !0, n = (t = i).length - 1);
                    var o = document.querySelector("#" + this.id() + " .selector-list");
                    if (0 < t.length) {
                        var a = this;
                        s.each(t, function (e, t) {
                            var i = l.createEl.call(this, "li", {
                                    key: e.Url,
                                    index: t,
                                    text: e.desc
                                }),
                                r = l.createEl.call(this, "span", {
                                    key: e.Url,
                                    index: t,
                                    text: e.desc
                                });
                            t == n && (l.addClass(i, "current"), a._previousSelection = i),
                                r.innerText = e.desc,
                                i.appendChild(r),
                                o.appendChild(i)
                        })
                    }
                    this._autoSWitchDesc && this._updateText(this._autoSWitchDesc)
                },
                execute: function (e) {
                    if (this._player._switchSourcing = !0, this._isMasterLevel) {
                        var t = this._player._qualityService.levels;
                        for (r = 0; r < t.length; r++)
                            t[r].Url == e && t[r].desc != c.get("Auto") && this._updateText("");
                        this._player._switchLevel && this._player._switchLevel(e)
                    } else {
                        for (var i = this._player._urls.length, r = 0; r < i; r++)
                            if (this._player._urls[r].Url == e) {
                                this._player._currentPlayIndex = r,
                                    o.set(a.SelectedStreamLevel, this._player._urls[r].definition, 365);
                                break
                            }
                        this._player._loadByUrlInner(e, this._player.getCurrentTime(), !this._player.paused())
                    }
                    var n = this;
                    setTimeout(function () {
                        n._player._switchSourcing = !1
                    })
                },
                _updateText: function (e) {
                    var t = document.querySelector("#" + this.id() + " .selector-list .current"),
                        i = document.querySelector("#" + this.id() + " .selector-list .current span"),
                        r = c.get("Auto");
                    i && i.innerText && -1 < i.innerText.indexOf(r) && (r += e ? "(" + e + ")" : "", i.innerText = r, t && (t.text = r))
                }
            });
        t.exports = n
    },
        {
            "../../../lang/index": 17,
            "../../../lib/constants": 20,
            "../../../lib/cookie": 21,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/object": 31,
            "../../../lib/util": 39,
            "../../../player/base/event/eventtype": 47,
            "./selector": 116
        }],
    111: [function (e, t, i) {
        var r = e("./selector"),
            a = e("../../../lib/object"),
            s = (e("../../../lib/util"), e("../../../lib/cookie"), e("../../../lib/dom")),
            n = (e("../../../lib/event"), e("./util"), e("../../../lang/index")),
            l = e("../../../player/base/event/eventtype"),
            o = r.extend({
                init: function (e, t) {
                    this.Name = n.get("AudioTrack"),
                        this.Type = "audio",
                        this.Tooltip = n.get("AudioTrack_Switch_To"),
                        r.call(this, e, t)
                },
                bindEvent: function () {
                    this.bindCommonEvent();
                    var n = this,
                        o = document.querySelector("#" + n.id() + " .selector-list");
                    document.querySelector("#" + n.id() + " .header");
                    n._player.on(l.Private.ChangeURL, function () {
                        n._hasGeneratedList = !1
                    }),
                        this._player.on(l.Player.AudioTrackSwitch, function () {
                            s.addClass(o, "disabled")
                        }),
                        this._player.on(l.Player.AudioTrackSwitched, function () {
                            s.removeClass(o, "disabled")
                        }),
                        n._player.on(l.Player.AudioTrackReady, function (e) {
                            n._hasGeneratedList || (n._clear(), (e = e.paramData) && (a.each(e, function (e, t) {
                                var i = s.createEl.call(n, "li", {
                                        key: e.value,
                                        text: e.text
                                    }),
                                    r = s.createEl.call(n, "span", {
                                        key: e.value,
                                        text: e.text
                                    });
                                r.innerText = e.text,
                                    i.appendChild(r),
                                    o.appendChild(i)
                            }), n._hasGeneratedList = !0))
                        })
                },
                execute: function (e) {
                    this._player._audioTrackService["switch"](e)
                }
            });
        t.exports = o
    },
        {
            "../../../lang/index": 17,
            "../../../lib/cookie": 21,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/object": 31,
            "../../../lib/util": 39,
            "../../../player/base/event/eventtype": 47,
            "./selector": 116,
            "./util": 118
        }],
    112: [function (e, t, i) {
        var r = e("../../component"),
            n = (e("../../../lib/dom"), e("../../../player/base/event/eventtype")),
            o = e("./list"),
            a = e("../../../lang/index"),
            s = e("../util"),
            l = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-setting-btn"),
                        this._settingList = new o(e, t),
                        e.addChild(this._settingList, t)
                },
                createEl: function () {
                    return r.prototype.createEl.call(this, "div")
                },
                bindEvent: function () {
                    var e = this;
                    this.on("click", function () {
                        e._settingList.isOpened ? e._player.trigger(n.Private.SettingListHide) : e._player.trigger(n.Private.SettingListShow),
                            e._player.trigger(n.Private.SelectorHide),
                            e._player.trigger(n.Private.VolumeVisibilityChange, "")
                    }),
                        s.registerTooltipEvent.call(this, this.el(), a.get("Setting"))
                }
            });
        t.exports = l
    },
        {
            "../../../lang/index": 17,
            "../../../lib/dom": 23,
            "../../../player/base/event/eventtype": 47,
            "../../component": 95,
            "../util": 123,
            "./list": 115
        }],
    113: [function (e, t, i) {
        var r = e("./selector"),
            s = e("../../../lib/object"),
            l = e("../../../lib/dom"),
            n = (e("../../../lib/event"), e("./util"), e("../../../lang/index")),
            o = e("../../../player/base/event/eventtype"),
            a = r.extend({
                init: function (e, t) {
                    this.Name = n.get("Subtitle"),
                        this.Type = "cc",
                        this.Tooltip = n.get("CC_Switch_To"),
                        r.call(this, e, t)
                },
                bindEvent: function () {
                    this.bindCommonEvent();
                    var n = this;
                    this._player.on(o.Private.CCStateChanged, function (e) {
                        var t = e.paramData.value,
                            i = e.paramData.lang;
                        "on" == t && i ? n._backCCText = i : "off" == t && "" == n._backCCText && (n._backCCText = n._previousSelection.text);
                        var r = "Off";
                        "on" == t && (r = n._backCCText),
                            n._player.trigger(o.Private.SelectorUpdateList, {
                                type: "cc",
                                text: r
                            })
                    })
                },
                generateList: function (n) {
                    var o = document.querySelector("#" + this.id() + " .selector-list"),
                        e = this._player._ccService.tracks,
                        a = this;
                    s.each(e, function (e, t) {
                        var i = l.createEl.call(this, "li", {
                                key: e.value,
                                text: e.text
                            }),
                            r = l.createEl.call(this, "span", {
                                key: e.value,
                                text: e.text
                            });
                        e.text == n && (l.addClass(i, "current"), a._previousSelection = i),
                            r.innerText = e.text,
                            i.appendChild(r),
                            o.appendChild(i)
                    })
                },
                execute: function (e) {
                    this._backCCText = "",
                        this._player._ccService["switch"](e),
                        this._player.trigger(o.Private.CCChanged, e)
                }
            });
        t.exports = a
    },
        {
            "../../../lang/index": 17,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/object": 31,
            "../../../player/base/event/eventtype": 47,
            "./selector": 116,
            "./util": 118
        }],
    114: [function (e, t, i) {
        t.exports = {
            CC: e("./cc"),
            Speed: e("./speed"),
            Quality: e("./Quality"),
            Audio: e("./audio")
        }
    },
        {
            "./Quality": 110,
            "./audio": 111,
            "./cc": 113,
            "./speed": 117
        }],
    115: [function (e, t, i) {
        var a = e("../../component"),
            r = e("../../../lib/dom"),
            o = e("../../../lib/ua"),
            s = e("../../../lib/event"),
            l = e("../../../player/base/event/eventtype"),
            n = e("./export"),
            c = e("./util"),
            u = e("../../../lang/index"),
            p = a.extend({
                init: function (e, t) {
                    for (var i in this.isOpened = !1, a.call(this, e, t), this.addClass(t.className || "prism-setting-list"), n) {
                        var r = new n[i](e, t);
                        e.addChild(r, t)
                    }
                },
                createEl: function () {
                    var e = a.prototype.createEl.call(this, "div"),
                        t = "<div class='prism-setting-item prism-setting-{type}' type={type}><div class='setting-content'><span class='setting-title'>{value}</span><span class='array'></span><span class='current-setting'></span></div></div>",
                        i = t.replace(/{type}/g, "speed").replace("{value}", u.get("Speed")),
                        r = t.replace(/{type}/g, "cc").replace("{value}", u.get("Subtitle")),
                        n = t.replace(/{type}/g, "audio").replace("{value}", u.get("AudioTrack")),
                        o = t.replace(/{type}/g, "quality").replace("{value}", u.get("Quality"));
                    return e.innerHTML = i + r + n + o,
                        e
                },
                bindEvent: function () {
                    document.querySelector("#" + this.id() + " .prism-setting-speed .current-setting").innerText = u.get("Speed_1X_Text");
                    var n = this,
                        t = function () {
                            n._player.trigger(l.Private.SettingListHide),
                                n.isOpened = !1
                        },
                        i = function (e) {
                            e && e.text && (document.querySelector("#" + n.id() + " .prism-setting-" + e.type + " .current-setting").innerText = e.text)
                        };
                    this._player.on(l.Private.SettingListShow, function (e) {
                        n.isOpened = !0;
                        e = e.paramData;
                        i(e),
                            r.css(n.el(), "display", "block")
                    }),
                        this._player.on(l.Private.UpdateToSettingList, function (e) {
                            e = e.paramData;
                            i(e)
                        }),
                        this._player.on(l.Private.SelectorUpdateList, function (e) {
                            e = e.paramData;
                            i(e),
                                n._player.trigger(l.Private.SelectorValueChange, e)
                        }),
                        this._player.on(l.Private.SettingListHide, function () {
                            n.isOpened = !1,
                                r.css(n.el(), "display", "none")
                        }),
                        s.on(this.el(), "click", function (e) {
                            n._player.trigger(l.Private.SettingListHide);
                            var t = e.srcElement ? e.srcElement : e.target;
                            if (t = c.findItemElementForList(t)) {
                                var i = t.getAttribute("type");
                                n._player.trigger(l.Private.SelectorShow, {
                                    type: i
                                })
                            }
                        });
                    var e = o.IS_MOBILE ? "touchleave" : "mouseleave";
                    s.on(this.el(), e, function () {
                        t()
                    }),
                        s.on(this._player.tag, "click", function (e) {
                            e && e.target == e.currentTarget && t()
                        }),
                        s.on(this._player.tag, "touchstart", function (e) {
                            e && e.target == e.currentTarget && t()
                        }),
                        this._player.on(l.Private.QualityChange, function (e) {
                            var t = e.paramData;
                            if (t.levelSwitch) {
                                var i = document.querySelector("#" + n.id() + " .prism-setting-quality .current-setting"),
                                    r = u.get("Auto");
                                -1 < i.innerText.indexOf(r) && (i.innerText = r + (t.desc ? "(" + t.desc + ")" : ""))
                            }
                        })
                }
            });
        t.exports = p
    },
        {
            "../../../lang/index": 17,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/ua": 37,
            "../../../player/base/event/eventtype": 47,
            "../../component": 95,
            "./export": 114,
            "./util": 118
        }],
    116: [function (e, t, i) {
        var r = e("../../component"),
            n = (e("../../../lib/object"), e("../../../lib/util"), e("../../../lib/ua")),
            a = (e("../../../lib/cookie"), e("../../../lib/dom")),
            s = e("../../../lib/event"),
            l = e("./util"),
            c = (e("../../../lang/index"), e("../../../player/base/event/eventtype")),
            o = r.extend({
                init: function (e, t) {
                    this._hasGeneratedList = !1,
                        this._previousSelection = null,
                        this._backupSelector = "",
                        r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-" + this.Type + "-selector prism-setting-selector",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<div class="header"><div class="left-array"></div><span>' + this.Name + '</span></div><ul class="selector-list"></ul>',
                        e
                },
                bindEvent: function () {
                    this.bindCommonEvent()
                },
                bindCommonEvent: function () {
                    var o = this,
                        e = document.querySelector("#" + o.id() + " .selector-list"),
                        t = document.querySelector("#" + o.id() + " .header");
                    this._player.on(c.Private.ChangeURL, function () {
                        o._hasGeneratedList = !1
                    }),
                        s.on(t, "click", function () {
                            o._player.trigger(c.Private.SelectorHide),
                                o._player.trigger(c.Private.SettingListShow, {
                                    type: o.Type,
                                    text: o._previousSelection ? o._previousSelection.text : ""
                                })
                        }),
                        s.on(e, "click", function (e) {
                            var t = e.srcElement ? e.srcElement : e.target,
                                i = t.key,
                                r = t.text;
                            if (void 0 !== r) {
                                o._previousSelection && a.removeClass(o._previousSelection, "current"),
                                    o._previousSelection = l.findliElementForSelector(t),
                                    a.addClass(o._previousSelection, "current"),
                                o.execute && o.execute(i);
                                var n = o.Tooltip + "<span>" + r + "</span>";
                                o._player.trigger(c.Private.Info_Show, {
                                    text: n,
                                    duration: 1e3,
                                    align: "lb"
                                })
                            }
                        }),
                        o._player.on(c.Private.SelectorHide, function () {
                            a.css(o.el(), "display", "none")
                        }),
                        o._player.on(c.Private.SelectorValueChange, function (e) {
                            var t = e.paramData;
                            if (t) {
                                if (t.type != o.Type) return;
                                var i = document.querySelectorAll("#" + o.id() + " .selector-list li");
                                if (i) {
                                    var r = i.length;
                                    0 == r && (o._backupSelector = t.text);
                                    for (var n = 0; n < r; n++)
                                        if (i[n].text == t.text) {
                                            o._previousSelection && a.removeClass(o._previousSelection, "current"),
                                                a.addClass(i[n], "current"),
                                                o._previousSelection = i[n];
                                            break
                                        }
                                }
                            }
                        }),
                        o._player.on(c.Private.SelectorShow, function (e) {
                            if ((e = e.paramData).type == o.Type) {
                                var t = document.querySelector("#" + o._player.id() + " .prism-" + e.type + "-selector");
                                o._hasGeneratedList || (o._clear(), o.generateList(o._backupSelector), o._backupSelector = "", o._hasGeneratedList = !0),
                                    a.css(t, "display", "block")
                            }
                        });
                    var i = function () {
                            a.css(o.el(), "display", "none"),
                                o._player.trigger(c.Private.UpdateToSettingList, {
                                    type: o.Type,
                                    text: o._previousSelection ? o._previousSelection.text : ""
                                })
                        },
                        r = n.IS_MOBILE ? "touchleave" : "mouseleave";
                    s.on(this.el(), r, function () {
                        i()
                    }),
                        s.on(this._player.tag, "click", function (e) {
                            e && e.target == e.currentTarget && i()
                        }),
                        s.on(this._player.tag, "touchstart", function (e) {
                            e && e.target == e.currentTarget && i()
                        })
                },
                setSelected: function (e) {
                },
                generateList: function () {
                },
                _clear: function () {
                    document.querySelector("#" + this.id() + " .selector-list").innerHTML = ""
                }
            });
        t.exports = o
    },
        {
            "../../../lang/index": 17,
            "../../../lib/cookie": 21,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/object": 31,
            "../../../lib/ua": 37,
            "../../../lib/util": 39,
            "../../../player/base/event/eventtype": 47,
            "../../component": 95,
            "./util": 118
        }],
    117: [function (e, t, i) {
        var r = e("./selector"),
            a = e("../../../lib/object"),
            s = (e("../../../lib/util"), e("../../../lib/cookie"), e("../../../lib/dom")),
            l = (e("../../../lib/event"), e("./util"), e("../../../lib/constants")),
            c = e("../../../lang/index"),
            n = (e("../../../player/base/event/eventtype"), r.extend({
                init: function (e, t) {
                    this.Name = c.get("Speed"),
                        this.Type = "speed",
                        this.Tooltip = c.get("Speed_Switch_To"),
                        r.call(this, e, t)
                },
                generateList: function () {
                    var n = document.querySelector("#" + this.id() + " .selector-list"),
                        e = l.SpeedLevels,
                        o = this;
                    a.each(e, function (e, t) {
                        var i = s.createEl.call(this, "li", {
                                key: e.key,
                                text: e.text
                            }),
                            r = s.createEl.call(this, "span", {
                                key: e.key,
                                text: e.text
                            });
                        r.innerText = e.text,
                        e.text == c.get("Speed_1X_Text") && (s.addClass(i, "current"), o._previousSelection = i),
                            i.appendChild(r),
                            n.appendChild(i)
                    })
                },
                execute: function (e) {
                    this._player.setSpeed(e)
                }
            }));
        t.exports = n
    },
        {
            "../../../lang/index": 17,
            "../../../lib/constants": 20,
            "../../../lib/cookie": 21,
            "../../../lib/dom": 23,
            "../../../lib/event": 24,
            "../../../lib/object": 31,
            "../../../lib/util": 39,
            "../../../player/base/event/eventtype": 47,
            "./selector": 116,
            "./util": 118
        }],
    118: [function (e, i, t) {
        i.exports.findliElementForSelector = function (e) {
            if (!e || "li" == e.tagName.toLowerCase()) return e;
            var t = e.parentElement;
            return t && "li" == t.tagName.toLowerCase() ? t : null
        },
            i.exports.findliElementByKey = function (e, t) {
                document.querySelectors(e);
                return null
            },
            i.exports.findItemElementForList = function (e) {
                if (!e || -1 < e.className.indexOf("prism-setting-item")) return e;
                var t = e.parentElement;
                return t && (e = i.exports.findItemElementForList(t)),
                    e
            }
    },
        {}],
    119: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            f = e("../../lib/util"),
            o = e("../../lang/index"),
            v = e("../../player/base/event/eventtype"),
            a = e("./util"),
            s = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-snapshot-btn")
                },
                createEl: function () {
                    return r.prototype.createEl.call(this, "div")
                },
                bindEvent: function () {
                    var h = this;
                    this._player.on(v.Private.Snapshot_Hide, function () {
                        n.css(h._el, "display", "none")
                    }),
                        a.registerTooltipEvent.call(this, this.el(), o.get("Snapshot")),
                        this.on("click", function () {
                            h.trigger(v.Player.Snapshoting);
                            var e = document.createElement("canvas"),
                                t = h._player.tag,
                                i = t.videoWidth,
                                r = t.videoHeight,
                                n = h._player._getSanpshotMatric();
                            e.width = n.width || i,
                                e.height = n.height || r;
                            var o = h._player.getCurrentTime(),
                                a = e.getContext("2d");
                            a.save();
                            var s = h._player.getImage();
                            "vertical" == s ? (a.translate(0, e.height), a.scale(1, -1)) : "horizon" == s && (a.translate(e.width, 0), a.scale(-1, 1)),
                                a.drawImage(t, 0, 0, i, r),
                                a.restore(),
                                y(a, h._player.getOptions());
                            var l = "",
                                c = "";
                            try {
                                l = e.toDataURL("image/jpeg", n.rate || 1)
                            } catch (e) {
                                c = e
                            }
                            var u = "",
                                p = "",
                                d = "";
                            l && (p = (u = l).substr(u.indexOf(",") + 1), d = f.toBinary(p)),
                                h.trigger(v.Player.Snapshoted, {
                                    time: o,
                                    base64: u,
                                    binary: d,
                                    error: c
                                })
                        })
                }
            }),
            y = function (e, t) {
                var i = t.snapshotWatermark;
                i && i.text && (e.font = i.font, i.fillColor && (e.fillStyle = i.fillColor, e.fillText(i.text, i.left, i.top)), i.strokeColor && (e.strokeStyle = i.strokeColor, e.strokeText(i.text, i.left, i.top)), e.stroke())
            };
        t.exports = s
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123
        }],
    120: [function (e, t, i) {
        var r = e("../component"),
            u = (e("../../lib/util"), e("../../lib/dom")),
            n = (e("../../lib/event"), e("../../lib/ua"), e("../../lang/index"), e("../../player/base/event/eventtype")),
            o = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-thumbnail",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = "<img></img><span></span>",
                        e
                },
                bindEvent: function () {
                    var c = this;
                    c._player.on(n.Private.ThumbnailLoaded, function (e) {
                        var t = e.paramData;
                        if (t && 0 < t.length) {
                            var i = c._player._thumbnailService.makeUrl(t[0].text);
                            if (t[0].isBig) u.css(c.el(), "background", "url(" + i + ")"),
                                u.css(c.el(), "width", t[0].w + "px"),
                                u.css(c.el(), "height", t[0].h + "px");
                            else {
                                var r = document.querySelector("#" + c.id() + " img");
                                r.onload = function () {
                                    var e = r.width,
                                        t = r.height;
                                    u.css(c.el(), "width", e + "px"),
                                        u.css(c.el(), "height", t + "px")
                                },
                                    r.src = i
                            }
                        }
                    }),
                        c._player.on(n.Private.ThumbnailShow, function (l) {
                            c._thumbnailShowHanlde && clearTimeout(c._thumbnailShowHanlde),
                                c._thumbnailShowHanlde = setTimeout(function () {
                                    var e = document.querySelector("#" + c.id() + " span"),
                                        t = l.paramData;
                                    if (t) {
                                        var i = c._player._thumbnailService.findAvailableCue(t.time);
                                        if (!i) return;
                                        var r = c.el().offsetWidth;
                                        if (i.isBig) {
                                            var n = c._player._thumbnailService.makeUrl(i.text);
                                            u.css(c.el(), "background", "url(" + n + ")"),
                                                i.w,
                                                i.h;
                                            var o = -1 * i.x + "px " + -1 * i.y + "px";
                                            u.css(c.el(), "background-position", o)
                                        } else {
                                            var a = document.querySelector("#" + c.id() + " img");
                                            n = c._player._thumbnailService.makeUrl(i.text),
                                            a.src != n && (a.src = n)
                                        }
                                        var s = 0;
                                        s = t.left + r > t.progressWidth ? t.left - r : (s = t.left - r / 2) < 0 ? 0 : s,
                                            u.css(c.el(), "left", s + "px"),
                                            e.innerText = t.formatTime,
                                            u.css(c.el(), "display", "block")
                                    }
                                }, 30)
                        }),
                        c._player.on(n.Private.ThumbnailHide, function (e) {
                            c._thumbnailShowHanlde && clearTimeout(c._thumbnailShowHanlde),
                                u.css(c.el(), "display", "none")
                        })
                },
                _createSamllThumbnail: function () {
                }
            });
        t.exports = o
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../lib/ua": 37,
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    121: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/util"),
            o = e("../../player/base/event/eventtype"),
            a = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-time-display",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="duration">00:00</span>',
                        e
                },
                bindEvent: function () {
                    var t = this;
                    this._player.on(o.Video.DurationChange, function () {
                        var e = n.formatTime(t._player.getDuration());
                        e ? (document.querySelector("#" + t.id() + " .time-bound").style.display = "inline", document.querySelector("#" + t.id() + " .duration").style.display = "inline", document.querySelector("#" + t.id() + " .duration").innerText = e) : (document.querySelector("#" + t.id() + " .duration").style.display = "none", document.querySelector("#" + t.id() + " .time-bound").style.display = "none")
                    }),
                        this._player.on(o.Video.TimeUpdate, function () {
                            var e = n.formatTime(t._player.getCurrentTime());
                            document.querySelector("#" + t.id() + " .current-time") && (e ? (document.querySelector("#" + t.id() + " .current-time").style.display = "inline", document.querySelector("#" + t.id() + " .current-time").innerText = e) : document.querySelector("#" + t.id() + " .current-time").style.display = "none")
                        })
                }
            });
        t.exports = a
    },
        {
            "../../lib/util": 39,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    122: [function (e, t, i) {
        var r = e("../component"),
            s = e("../../lib/dom"),
            n = e("../../player/base/event/eventtype"),
            o = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.className = t.className ? t.className : "prism-tooltip",
                        this.addClass(this.className)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "p");
                    return e.innerText = "提示信息",
                        e
                },
                bindEvent: function () {
                    var a = this;
                    a._player.on(n.Private.TooltipShow, function (e) {
                        var t = document.querySelector("#" + a.id()),
                            i = e.paramData;
                        t.innerText = i.text,
                            s.css(t, "display", "block");
                        var r = t.offsetWidth,
                            n = document.querySelector("#" + a._player.id() + " .prism-controlbar");
                        if (n) {
                            var o = n.offsetWidth;
                            i.left + r > o ? s.css(t, "left", o - r + "px") : s.css(t, "left", i.left - (r - i.width) / 2 + "px")
                        }
                    }),
                        a._player.on(n.Private.TooltipHide, function (e) {
                            var t = document.querySelector("#" + a.id());
                            s.css(t, "display", "none")
                        })
                }
            });
        t.exports = o
    },
        {
            "../../lib/dom": 23,
            "../../player/base/event/eventtype": 47,
            "../component": 95
        }],
    123: [function (e, t, i) {
        var r = e("../../lib/event"),
            s = e("../../player/base/event/eventtype");
        t.exports.registerTooltipEvent = function (e, n) {
            var o = this,
                a = function () {
                    o._controlbarTooltipHandler && (clearTimeout(o._controlbarTooltipHandler), o._controlbarTooltipHandler = null)
                };
            r.on(this.el(), "mouseover", function (e) {
                a(),
                    o._controlbarTooltipHandler = setTimeout(function () {
                        o._player.trigger(s.Private.TooltipHide)
                    }, 4e3);
                var t = o.el().offsetLeft,
                    i = o.el().offsetWidth,
                    r = n;
                "function" == typeof r && (r = n.call(this)),
                    o._player.trigger(s.Private.TooltipShow, {
                        left: t,
                        width: i,
                        text: r
                    })
            }),
                r.on(this.el(), "mouseout", function () {
                    a(),
                        o._player.trigger(s.Private.TooltipHide)
                })
        }
    },
        {
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47
        }],
    124: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            o = e("../../lib/event"),
            a = e("../../player/base/event/eventtype"),
            s = e("./util"),
            l = e("../../lang/index"),
            c = e("./volumecontrol"),
            u = r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-volume");
                    var i = new c(e, t);
                    e.addChild(i, t)
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<div class="volume-icon"><div class="short-horizontal"></div><div class="long-horizontal"></div></div>',
                        e
                },
                bindEvent: function () {
                    var i = this;
                    this.icon = document.querySelector("#" + i.id() + "  .volume-icon"),
                        s.registerTooltipEvent.call(this, this.el(), function () {
                            return i._player.muted() || 0 == i._player.getVolume() ? l.get("Muted") : l.get("Volume")
                        }),
                        o.on(this.icon, "click", function (e) {
                            var t = i.el().offsetLeft;
                            i._player.trigger(a.Private.SettingListHide),
                                i._player.trigger(a.Private.SelectorHide),
                                i._player.trigger(a.Private.VolumeVisibilityChange, t)
                        });
                    var e = document.querySelector("#" + i.id() + "  .long-horizontal"),
                        t = document.querySelector("#" + i.id() + "  .short-horizontal");
                    o.on(this.el(), "mouseover", function () {
                        n.removeClass(e, "volume-hover-animation"),
                            setTimeout(function () {
                                n.addClass(e, "volume-hover-animation")
                            }),
                            setTimeout(function () {
                                n.removeClass(e, "volume-hover-animation"),
                                    n.addClass(t, "volume-hover-animation"),
                                    setTimeout(function () {
                                        n.removeClass(t, "volume-hover-animation"),
                                            n.addClass(e, "volume-hover-animation")
                                    }, 300)
                            }, 300)
                    })
                }
            });
        t.exports = u
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123,
            "./volumecontrol": 125
        }],
    125: [function (e, t, i) {
        var r = e("../component"),
            n = e("../../lib/dom"),
            o = e("../../lib/event"),
            a = e("../../player/base/event/eventtype"),
            s = (e("./util"), e("../../lang/index"), r.extend({
                init: function (e, t) {
                    r.call(this, e, t),
                        this.addClass(t.className || "prism-volume-control"),
                        this._shown = !1
                },
                createEl: function () {
                    var e = r.prototype.createEl.call(this, "div");
                    return e.innerHTML = '<div class="volume-range"><div class="volume-value"></div><div class="volume-cursor"></div></div>',
                        e
                },
                bindEvent: function () {
                    var r = this;
                    this.icon = document.querySelector("#" + r._player.id() + "  .volume-icon"),
                        this.control = document.querySelector("#" + r.id()),
                        this.volumnValue = document.querySelector("#" + r.id() + "  .volume-value"),
                        this.volumnRange = document.querySelector("#" + r.id() + "  .volume-range"),
                        this.volumnCursor = document.querySelector("#" + r.id() + "  .volume-cursor"),
                        this._player.on(a.Private.VolumeVisibilityChange, function (e) {
                            var t = e.paramData;
                            if (!r._shown && t) {
                                var i = r._player.getVolume();
                                r._setVolumnUI(i),
                                    n.css(r.control, "display", "block"),
                                t && n.css(r.control, "left", t - 5 + "px"),
                                    r._shown = !0
                            } else n.css(r.control, "display", "none"),
                                r._shown = !1
                        }),
                        o.on(this.volumnRange, "click", function (e) {
                            var t = r._getPosition(e).toFixed(2);
                            t < 0 && (t = 0),
                            1 < t && (t = 1),
                                r._setVolumnUI(t),
                                r._setMuteUI(t),
                                r._player.setVolume(t)
                        }),
                        o.on(this._player.tag, "click", function (e) {
                            e && e.target == e.currentTarget && n.css(r.control, "display", "none")
                        }),
                        o.on(this._player.tag, "touchstart", function (e) {
                            e && e.target == e.currentTarget && n.css(r.control, "display", "none")
                        }),
                        o.on(this.volumnCursor, "mousedown", function (e) {
                            r._onMouseDown(e)
                        }),
                        o.on(this.volumnCursor, "touchstart", function (e) {
                            r._onMouseDown(e)
                        }),
                        this._player.on(a.Private.VolumnChanged, function (e) {
                            var t = e.paramData;
                            -1 < t && r._setVolumnUI(t),
                                r._setMuteUI(t)
                        }),
                        o.on(this.control, "mouseleave", function () {
                            n.css(r.control, "display", "none"),
                                r._shown = !1
                        }),
                        o.on(this.control, "mouseover", function () {
                            n.addClass(r.control, "hover")
                        }),
                        r._rangeBottom = r._getBottom()
                },
                _getBottom: function () {
                    if (window.getComputedStyle) {
                        var e = window.getComputedStyle(this.volumnRange, null).getPropertyValue("bottom");
                        return parseFloat(e)
                    }
                    return 26
                },
                _onMouseDown: function (e) {
                    var t = this;
                    e.preventDefault(),
                        o.on(this.control, "mousemove", function (e) {
                            t._onMouseMove(e)
                        }),
                        o.on(this.control, "touchmove", function (e) {
                            t._onMouseMove(e)
                        }),
                        o.on(this._player.tag, "mouseup", function (e) {
                            t._onMouseUp(e)
                        }),
                        o.on(this._player.tag, "touchend", function (e) {
                            t._onMouseUp(e)
                        }),
                        o.on(this.control, "mouseup", function (e) {
                            t._onMouseUp(e)
                        }),
                        o.on(this.control, "touchend", function (e) {
                            t._onMouseUp(e)
                        })
                },
                _onMouseUp: function (e) {
                    if (e.preventDefault(), this._offEvent(), this.volumnRange.offsetHeight) {
                        var t = (this.volumnValue.offsetHeight / this.volumnRange.offsetHeight).toFixed(2);
                        this._player.setVolume(t),
                            this._setMuteUI(t)
                    }
                },
                _onMouseMove: function (e) {
                    e.preventDefault();
                    var t = this._getPosition(e);
                    t < 0 && (t = 0),
                    1 < t && (t = 1),
                        this._setVolumnUI(t)
                },
                _getPosition: function (e) {
                    for (var t = this.volumnRange, i = 0; t = t.offsetParent;)
                        i += t.offsetTop;
                    var r = this.volumnRange.offsetHeight,
                        n = this.volumnCursor.offsetHeight;
                    return (r - ((e.touches ? e.touches[0].pageY : e.pageY) - i) + n) / (r = this.volumnRange.offsetHeight)
                },
                _offEvent: function () {
                    o.off(this._player.tag, "mouseup"),
                        o.off(this._player.tag, "touchend"),
                        o.off(this.control, "mousemove"),
                        o.off(this.control, "touchmove"),
                        o.off(this.control, "mouseup"),
                        o.off(this.control, "touchend")
                },
                _setMuteUI: function (e) {
                    isNaN(e) || (0 == e || -1 == e ? n.addClass(this.icon, "mute") : n.removeClass(this.icon, "mute"))
                },
                _setVolumnUI: function (e) {
                    isNaN(e) || (n.css(this.volumnValue, "height", 100 * e + "%"), 1 == e && (e = .99), n.css(this.volumnCursor, "bottom", 100 * e + "%"))
                }
            }));
        t.exports = s
    },
        {
            "../../lang/index": 17,
            "../../lib/dom": 23,
            "../../lib/event": 24,
            "../../player/base/event/eventtype": 47,
            "../component": 95,
            "./util": 123
        }],
    126: [function (e, t, i) {
        t.exports = {
            H5Loading: e("./component/h5-loading"),
            bigPlayButton: e("./component/big-play-button"),
            controlBar: e("./component/controlbar"),
            progress: e("./component/progress"),
            playButton: e("./component/play-button"),
            liveDisplay: e("./component/live-display"),
            timeDisplay: e("./component/time-display"),
            fullScreenButton: e("./component/fullscreen-button"),
            volume: e("./component/volume"),
            snapshot: e("./component/snapshot"),
            errorDisplay: e("./component/error-display"),
            infoDisplay: e("./component/info-display"),
            liveShiftProgress: e("../commonui/liveshiftprogress"),
            liveShiftTimeDisplay: e("../commonui/livetimedisplay"),
            setting: e("./component/setting/button"),
            subtitle: e("./component/cc-button"),
            thumbnail: e("./component/thumbnail"),
            tooltip: e("./component/tooltip")
        }
    },
        {
            "../commonui/liveshiftprogress": 9,
            "../commonui/livetimedisplay": 10,
            "./component/big-play-button": 98,
            "./component/cc-button": 99,
            "./component/controlbar": 100,
            "./component/error-display": 102,
            "./component/fullscreen-button": 103,
            "./component/h5-loading": 104,
            "./component/info-display": 105,
            "./component/live-display": 106,
            "./component/play-button": 108,
            "./component/progress": 109,
            "./component/setting/button": 112,
            "./component/snapshot": 119,
            "./component/thumbnail": 120,
            "./component/time-display": 121,
            "./component/tooltip": 122,
            "./component/volume": 124
        }]
}, {}, [12]);


