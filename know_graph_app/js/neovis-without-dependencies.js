!function (e, r) {
    "object" == typeof exports && "object" == typeof module ? module.exports = r(require("@babel/runtime-corejs3/helpers/defineProperty"), require("neo4j-driver"), require("@babel/runtime-corejs3/core-js/get-iterator"), require("@babel/runtime-corejs3/regenerator"), require("@babel/runtime-corejs3/core-js-stable/object/values"), require("@babel/runtime-corejs3/core-js-stable/object/keys"), require("@babel/runtime-corejs3/helpers/classCallCheck"), require("@babel/runtime-corejs3/helpers/createClass"), require("@babel/runtime-corejs3/core-js-stable/instance/for-each"), require("@babel/runtime-corejs3/helpers/asyncToGenerator"), require("vis-network/dist/vis-network.min"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"), require("@babel/runtime-corejs3/core-js-stable/promise"), require("@babel/runtime-corejs3/core-js-stable/object/define-property"), require("@babel/runtime-corejs3/core-js-stable/object/define-properties"), require("@babel/runtime-corejs3/core-js-stable/instance/filter"), require("@babel/runtime-corejs3/core-js-stable/set-timeout"), require("@babel/runtime-corejs3/core-js-stable/instance/map"), require("@babel/runtime-corejs3/core-js-stable/instance/concat"), require("@babel/runtime-corejs3/core-js-stable/array/is-array"), require("@babel/runtime-corejs3/helpers/typeof"), require("@babel/runtime-corejs3/core-js-stable/symbol"), require("vis-network/dist/vis-network.min.css")) : "function" == typeof define && define.amd ? define(["@babel/runtime-corejs3/helpers/defineProperty", "neo4j-driver", "@babel/runtime-corejs3/core-js/get-iterator", "@babel/runtime-corejs3/regenerator", "@babel/runtime-corejs3/core-js-stable/object/values", "@babel/runtime-corejs3/core-js-stable/object/keys", "@babel/runtime-corejs3/helpers/classCallCheck", "@babel/runtime-corejs3/helpers/createClass", "@babel/runtime-corejs3/core-js-stable/instance/for-each", "@babel/runtime-corejs3/helpers/asyncToGenerator", "vis-network/dist/vis-network.min", "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors", "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor", "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols", "@babel/runtime-corejs3/core-js-stable/promise", "@babel/runtime-corejs3/core-js-stable/object/define-property", "@babel/runtime-corejs3/core-js-stable/object/define-properties", "@babel/runtime-corejs3/core-js-stable/instance/filter", "@babel/runtime-corejs3/core-js-stable/set-timeout", "@babel/runtime-corejs3/core-js-stable/instance/map", "@babel/runtime-corejs3/core-js-stable/instance/concat", "@babel/runtime-corejs3/core-js-stable/array/is-array", "@babel/runtime-corejs3/helpers/typeof", "@babel/runtime-corejs3/core-js-stable/symbol", "vis-network/dist/vis-network.min.css"], r) : "object" == typeof exports ? exports.NeoVis = r(require("@babel/runtime-corejs3/helpers/defineProperty"), require("neo4j-driver"), require("@babel/runtime-corejs3/core-js/get-iterator"), require("@babel/runtime-corejs3/regenerator"), require("@babel/runtime-corejs3/core-js-stable/object/values"), require("@babel/runtime-corejs3/core-js-stable/object/keys"), require("@babel/runtime-corejs3/helpers/classCallCheck"), require("@babel/runtime-corejs3/helpers/createClass"), require("@babel/runtime-corejs3/core-js-stable/instance/for-each"), require("@babel/runtime-corejs3/helpers/asyncToGenerator"), require("vis-network/dist/vis-network.min"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"), require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"), require("@babel/runtime-corejs3/core-js-stable/promise"), require("@babel/runtime-corejs3/core-js-stable/object/define-property"), require("@babel/runtime-corejs3/core-js-stable/object/define-properties"), require("@babel/runtime-corejs3/core-js-stable/instance/filter"), require("@babel/runtime-corejs3/core-js-stable/set-timeout"), require("@babel/runtime-corejs3/core-js-stable/instance/map"), require("@babel/runtime-corejs3/core-js-stable/instance/concat"), require("@babel/runtime-corejs3/core-js-stable/array/is-array"), require("@babel/runtime-corejs3/helpers/typeof"), require("@babel/runtime-corejs3/core-js-stable/symbol"), require("vis-network/dist/vis-network.min.css")) : e.NeoVis = r(e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0], e[void 0])
}(window, (function (e, r, t, n, o, s, i, a, c, l, u, b, p, d, f, h, j, v, m, y, g, _, k, x, w) {
    return function (e) {
        var r = {};

        function t(n) {
            if (r[n]) return r[n].exports;
            var o = r[n] = {i: n, l: !1, exports: {}};
            return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports
        }

        return t.m = e, t.c = r, t.d = function (e, r, n) {
            t.o(e, r) || Object.defineProperty(e, r, {enumerable: !0, get: n})
        }, t.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, t.t = function (e, r) {
            if (1 & r && (e = t(e)), 8 & r) return e;
            if (4 & r && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if (t.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & r && "string" != typeof e) for (var o in e) t.d(n, o, function (r) {
                return e[r]
            }.bind(null, o));
            return n
        }, t.n = function (e) {
            var r = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return t.d(r, "a", r), r
        }, t.o = function (e, r) {
            return Object.prototype.hasOwnProperty.call(e, r)
        }, t.p = "", t(t.s = 25)
    }([function (r, t) {
        r.exports = e
    }, function (e, t) {
        e.exports = r
    }, function (e, r) {
        e.exports = t
    }, function (e, r) {
        e.exports = n
    }, function (e, r) {
        e.exports = o
    }, function (e, r) {
        e.exports = s
    }, function (e, r) {
        e.exports = i
    }, function (e, r) {
        e.exports = a
    }, function (e, r) {
        e.exports = c
    }, function (e, r) {
        e.exports = l
    }, function (e, r) {
        e.exports = u
    }, function (e, r) {
        e.exports = b
    }, function (e, r) {
        e.exports = p
    }, function (e, r) {
        e.exports = d
    }, function (e, r) {
        e.exports = f
    }, function (e, r) {
        e.exports = h
    }, function (e, r) {
        e.exports = j
    }, function (e, r) {
        e.exports = v
    }, function (e, r) {
        e.exports = m
    }, function (e, r) {
        e.exports = y
    }, function (e, r) {
        e.exports = g
    }, function (e, r) {
        e.exports = _
    }, function (e, r) {
        e.exports = k
    }, function (e, r) {
        e.exports = x
    }, function (e, r) {
        e.exports = w
    }, function (e, r, t) {
        "use strict";
        t.r(r);
        var n = t(15), o = t.n(n), s = t(16), i = t.n(s), a = t(11), c = t.n(a), l = t(12), u = t.n(l), b = t(17),
            p = t.n(b), d = t(13), f = t.n(d), h = t(18), j = t.n(h), v = t(14), m = t.n(v), y = t(4), g = t.n(y),
            _ = t(19), k = t.n(_), x = t(20), w = t.n(x), q = t(21), N = t.n(q), E = t(3), O = t.n(E), C = t(22),
            L = t.n(C), T = t(8), S = t.n(T), I = t(2), A = t.n(I), P = t(9), V = t.n(P), R = t(5), M = t.n(R),
            D = t(6), W = t.n(D), z = t(7), H = t.n(z), U = t(0), F = t.n(U), G = t(23), B = t.n(G), Q = t(1),
            Y = t.n(Q), J = t(10), K = (t(24), {
                neo4j: {
                    initialQuery: "MATCH (n) WHERE exists(n.pagerank)\n                        WITH (n), RAND() AS random\n                        ORDER BY random LIMIT 3000\n                        OPTIONAL MATCH (n)-[r]-(m)\n                        //WITH n,r,m WHERE exists(n.pagerank) AND exists(m.pagerank) AND exists(m.community)\n                        RETURN n, r, m;",
                    neo4jUri: "bolt://localhost:7687",
                    neo4jUser: "neo4j",
                    neo4jPassword: "neo4j",
                    encrypted: "ENCRYPTION_OFF",
                    trust: "TRUST_ALL_CERTIFICATES"
                },
                visjs: {
                    interaction: {
                        hover: !0,
                        hoverConnectedEdges: !0,
                        selectConnectedEdges: !1,
                        multiselect: "alwaysOn",
                        zoomView: !1,
                        experimental: {}
                    },
                    physics: {barnesHut: {damping: .1}},
                    nodes: {
                        mass: 4,
                        shape: "neo",
                        labelHighlightBold: !1,
                        widthConstraint: {maximum: 40},
                        heightConstraint: {maximum: 40}
                    },
                    edges: {
                        hoverWidth: 0,
                        selectionWidth: 0,
                        smooth: {type: "continuous", roundness: .15},
                        font: {size: 9, strokeWidth: 0, align: "top"},
                        color: {inherit: !1},
                        arrows: {to: {enabled: !0, type: "arrow", scaleFactor: .5}}
                    }
                }
            }), X = function () {
                function e() {
                    var r;
                    W()(this, e), this._handlers = (r = {}, F()(r, "completed", []), F()(r, "error", []), F()(r, "clickNode", []), F()(r, "clickEdge", []), r)
                }

                return H()(e, [{
                    key: "register", value: function (e, r) {
                        if (void 0 === this._handlers[e]) throw new Error("Unknown event: " + e);
                        this._handlers[e].push(r)
                    }
                },
                    {
                    key: "generateEvent", value: function (e, r) {
                        if (void 0 === this._handlers[e]) throw new Error("Unknown event: " + e);
                        var t = !0, n = !1, o = void 0;
                        try {
                            for (var s, i = A()(this._handlers[e]); !(t = (s = i.next()).done); t = !0) {
                                (0, s.value)(r)
                            }
                        } catch (e) {
                            n = !0, o = e
                        } finally {
                            try {
                                t || null == i.return || i.return()
                            } finally {
                                if (n) throw o
                            }
                        }
                    }
                }]), e
            }();

        function Z(e, r) {
            var t = M()(e);
            if (f.a) {
                var n = f()(e);
                r && (n = p()(n).call(n, (function (r) {
                    return u()(e, r).enumerable
                }))), t.push.apply(t, n)
            }
            return t
        }

        function $(e) {
            for (var r = 1; r < arguments.length; r++) {
                var t, n = null != arguments[r] ? arguments[r] : {};
                if (r % 2) S()(t = Z(Object(n), !0)).call(t, (function (r) {
                    F()(e, r, n[r])
                })); else if (c.a) i()(e, c()(n)); else {
                    var s;
                    S()(s = Z(Object(n))).call(s, (function (r) {
                        o()(e, r, u()(n, r))
                    }))
                }
            }
            return e
        }

        t.d(r, "NEOVIS_DEFAULT_CONFIG", (function () {
            return ee
        })), t.d(r, "default", (function () {
            return re
        }));
        var ee = B()(), re = function () {
            function e(r) {
                W()(this, e), F()(this, "_nodes", {}), F()(this, "_edges", {}), F()(this, "_data", {}), F()(this, "_network", null), F()(this, "_events", new X), this._init(r), this._consoleLog(r), this._consoleLog(K)
            }

            var r;
            return H()(e, [{
                key: "_consoleLog", value: function (e) {
                    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "log";
                    ("log" !== r || this._config.console_debug) && console[r](e)
                }
            }, {
                key: "_init", value: function (e) {
                    if (e.labels && e.labels[ee]) for (var r = 0, t = M()(e.labels); r < t.length; r++) {
                        var n = t[r];
                        e = $({}, e, {labels: $({}, e.labels, F()({}, n, $({}, e.labels[ee], {}, e.labels[n])))})
                    }
                    if (e.relationships && e.relationships[ee]) for (var o = 0, s = M()(e.relationships); o < s.length; o++) {
                        var i = s[o];
                        e = $({}, e, {relationships: $({}, e.relationships, F()({}, i, $({}, e.relationships[ee], {}, e.relationships[i])))})
                    }
                    this._config = e, this._encrypted = e.encrypted || K.neo4j.encrypted, this._trust = e.trust || K.neo4j.trust, this._driver = Y.a.driver(e.server_url || K.neo4j.neo4jUri, Y.a.auth.basic(e.server_user || K.neo4j.neo4jUser, e.server_password || K.neo4j.neo4jPassword), {
                        encrypted: this._encrypted,
                        trust: this._trust,
                        maxConnectionPoolSize: 100,
                        connectionAcquisitionTimeout: 1e4
                    }), this._database = e.server_database, this._query = e.initial_cypher || K.neo4j.initialQuery, this._container = document.getElementById(e.container_id)
                }
            }, {
                key: "_addNode", value: function (e) {
                    this._nodes[e.id] = e
                }
            }, {
                key: "_addEdge", value: function (e) {
                    this._edges[e.id] = e
                }
            }, {
                key: "buildNodeVisObject", value: (r = V()(O.a.mark((function e(r) {
                    var t, n, o, s, i, a, c, l, u, b, p, d, f, h, j, v, m, y, g, _, k, x, w, q, N;
                    return O.a.wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (t = {}, n = r.labels[0], o = this._config && this._config.labels && (this._config.labels[n] || this._config.labels[ee]), s = o && o.caption, i = o && o.size, a = o && o.sizeCypher, c = o && o.community, l = o && o.image, u = o && o.font, b = o && o.title_properties || M()(r.properties), t.id = r.identity.toInt(), !a) {
                                    e.next = 42;
                                    break
                                }
                                return t.value = 1, p = this._driver.session(this._database && {database: this._database}), e.prev = 14, e.next = 17, p.readTransaction((function (e) {
                                    return e.run(a, {id: Y.a.int(t.id)})
                                }));
                            case 17:
                                for (d = e.sent, f = !0, h = !1, j = void 0, e.prev = 21, v = A()(d.records); !(f = (m = v.next()).done); f = !0) y = m.value, S()(y).call(y, (function (e) {
                                    "number" == typeof e ? t.value = e : Y.a.isInt(e) && (t.value = e.toNumber())
                                }));
                                e.next = 29;
                                break;
                            case 25:
                                e.prev = 25, e.t0 = e.catch(21), h = !0, j = e.t0;
                            case 29:
                                e.prev = 29, e.prev = 30, f || null == v.return || v.return();
                            case 32:
                                if (e.prev = 32, !h) {
                                    e.next = 35;
                                    break
                                }
                                throw j;
                            case 35:
                                return e.finish(32);
                            case 36:
                                return e.finish(29);
                            case 37:
                                return e.prev = 37, p.close(), e.finish(37);
                            case 40:
                                e.next = 43;
                                break;
                            case 42:
                                "number" == typeof i ? t.value = i : (g = r.properties[i]) && "number" == typeof g ? t.value = g : g && "object" === L()(g) && Y.a.isInt(g) && g.inSafeRange() ? t.value = g.toNumber() : t.value = 1;
                            case 43:
                                if ("function" == typeof s ? t.label = s(r) : s && ("number" == typeof r.properties[s] || Y.a.isInt(r.properties[s])) ? t.label = r.properties[s].toString() || "" : t.label = r.properties[s] || n || "", c) try {
                                    r.properties[c] ? t.group = r.properties[c].toNumber() || n || 0 : t.group = 0
                                } catch (e) {
                                    t.group = 0
                                } else t.group = n;
                                for (t.title = "", _ = !0, k = !1, x = void 0, e.prev = 49, w = A()(b); !(_ = (q = w.next()).done); _ = !0) N = q.value, r.properties.hasOwnProperty(N) && (t.title += this.propertyToString(N, r.properties[N]));
                                e.next = 57;
                                break;
                            case 53:
                                e.prev = 53, e.t1 = e.catch(49), k = !0, x = e.t1;
                            case 57:
                                e.prev = 57, e.prev = 58, _ || null == w.return || w.return();
                            case 60:
                                if (e.prev = 60, !k) {
                                    e.next = 63;
                                    break
                                }
                                throw x;
                            case 63:
                                return e.finish(60);
                            case 64:
                                return e.finish(57);
                            case 65:
                                return l ? (t.shape = "image", t.image = l) : t.shape = "dot", u && (t.font = u), e.abrupt("return", t);
                            case 68:
                            case"end":
                                return e.stop()
                        }
                    }), e, this, [[14, , 37, 40], [21, 25, 29, 37], [30, , 32, 36], [49, 53, 57, 65], [58, , 60, 64]])
                }))), function (e) {
                    return r.apply(this, arguments)
                })
            }, {
                key: "buildEdgeVisObject", value: function (e) {
                    var r = this._config && this._config.relationships && (this._config.relationships[e.type] || this._config.relationships[ee]),
                        t = r && r.thickness, n = r && r.caption, o = {};
                    for (var s in o.id = e.identity.toInt(), o.from = e.start.toInt(), o.to = e.end.toInt(), o.title = "", e.properties) e.properties.hasOwnProperty(s) && (o.title += this.propertyToString(s, e.properties[s]));
                    return o.value = t && "string" == typeof t ? e.properties[t] : t && "number" == typeof t ? t : 1, "boolean" == typeof n ? o.label = n ? e.type : "" : n && "string" == typeof n ? "number" == typeof e.properties[n] || Y.a.isInt(e.properties[n]) ? o.label = e.properties[n].toString() || "" : o.label = e.properties[n] || "" : o.label = e.type, o
                }
            }, {
                key: "propertyToString", value: function (e, r) {
                    var t;
                    if (N()(r) && r.length > 1) {
                        var n = "<strong>".concat(e, ":</strong><br /><ul>"), o = !0, s = !1, i = void 0;
                        try {
                            for (var a, c = A()(r); !(o = (a = c.next()).done); o = !0) {
                                var l = a.value;
                                n += "<li>".concat(l, "</li>")
                            }
                        } catch (e) {
                            s = !0, i = e
                        } finally {
                            try {
                                o || null == c.return || c.return()
                            } finally {
                                if (s) throw i
                            }
                        }
                        return n + "</ul>"
                    }
                    return w()(t = "<strong>".concat(e, ":</strong> ")).call(t, r, "<br>")
                }
            }, {
                key: "render", value: function (e) {
                    var r, t = this, n = 0, o = e || this._query,
                        s = this._driver.session(this._database && {database: this._database}), i = [];
                    s.run(o, {limit: 30}).subscribe({
                        onNext: function (e) {
                            var r;
                            n++, t._consoleLog("CLASS NAME"), t._consoleLog(e && e.constructor.name), t._consoleLog(e);
                            var o = k()(r = g()(e.toObject())).call(r, function () {
                                var e = V()(O.a.mark((function e(r) {
                                    var n, o, s, i, a, c, l, u, b, p, d, f, h, j, v, m, y, g;
                                    return O.a.wrap((function (e) {
                                        for (; ;) switch (e.prev = e.next) {
                                            case 0:
                                                if (t._consoleLog("Constructor:"), t._consoleLog(r && r.constructor.name), !(r instanceof Y.a.types.Node)) {
                                                    e.next = 9;
                                                    break
                                                }
                                                return e.next = 5, t.buildNodeVisObject(r);
                                            case 5:
                                                n = e.sent;
                                                try {
                                                    t._addNode(n)
                                                } catch (e) {
                                                    t._consoleLog(e, "error")
                                                }
                                                e.next = 97;
                                                break;
                                            case 9:
                                                if (!(r instanceof Y.a.types.Relationship)) {
                                                    e.next = 14;
                                                    break
                                                }
                                                o = t.buildEdgeVisObject(r), t._addEdge(o), e.next = 97;
                                                break;
                                            case 14:
                                                if (!(r instanceof Y.a.types.Path)) {
                                                    e.next = 62;
                                                    break
                                                }
                                                return t._consoleLog("PATH"), t._consoleLog(r), e.next = 19, t.buildNodeVisObject(r.start);
                                            case 19:
                                                return s = e.sent, e.next = 22, t.buildNodeVisObject(r.end);
                                            case 22:
                                                i = e.sent, t._addNode(s), t._addNode(i), a = !0, c = !1, l = void 0, e.prev = 28, u = A()(r.segments);
                                            case 30:
                                                if (a = (b = u.next()).done) {
                                                    e.next = 46;
                                                    break
                                                }
                                                return p = b.value, e.t0 = t, e.next = 35, t.buildNodeVisObject(p.start);
                                            case 35:
                                                return e.t1 = e.sent, e.t0._addNode.call(e.t0, e.t1), e.t2 = t, e.next = 40, t.buildNodeVisObject(p.end);
                                            case 40:
                                                e.t3 = e.sent, e.t2._addNode.call(e.t2, e.t3), t._addEdge(t.buildEdgeVisObject(p.relationship));
                                            case 43:
                                                a = !0, e.next = 30;
                                                break;
                                            case 46:
                                                e.next = 52;
                                                break;
                                            case 48:
                                                e.prev = 48, e.t4 = e.catch(28), c = !0, l = e.t4;
                                            case 52:
                                                e.prev = 52, e.prev = 53, a || null == u.return || u.return();
                                            case 55:
                                                if (e.prev = 55, !c) {
                                                    e.next = 58;
                                                    break
                                                }
                                                throw l;
                                            case 58:
                                                return e.finish(55);
                                            case 59:
                                                return e.finish(52);
                                            case 60:
                                                e.next = 97;
                                                break;
                                            case 62:
                                                if (!(r instanceof Array)) {
                                                    e.next = 97;
                                                    break
                                                }
                                                d = !0, f = !1, h = void 0, e.prev = 66, j = A()(r);
                                            case 68:
                                                if (d = (v = j.next()).done) {
                                                    e.next = 83;
                                                    break
                                                }
                                                if (m = v.value, t._consoleLog("Array element constructor:"), t._consoleLog(m && m.constructor.name), !(m instanceof Y.a.types.Node)) {
                                                    e.next = 79;
                                                    break
                                                }
                                                return e.next = 75, t.buildNodeVisObject(m);
                                            case 75:
                                                y = e.sent, t._addNode(y), e.next = 80;
                                                break;
                                            case 79:
                                                m instanceof Y.a.types.Relationship && (g = t.buildEdgeVisObject(m), t._addEdge(g));
                                            case 80:
                                                d = !0, e.next = 68;
                                                break;
                                            case 83:
                                                e.next = 89;
                                                break;
                                            case 85:
                                                e.prev = 85, e.t5 = e.catch(66), f = !0, h = e.t5;
                                            case 89:
                                                e.prev = 89, e.prev = 90, d || null == j.return || j.return();
                                            case 92:
                                                if (e.prev = 92, !f) {
                                                    e.next = 95;
                                                    break
                                                }
                                                throw h;
                                            case 95:
                                                return e.finish(92);
                                            case 96:
                                                return e.finish(89);
                                            case 97:
                                            case"end":
                                                return e.stop()
                                        }
                                    }), e, null, [[28, 48, 52, 60], [53, , 55, 59], [66, 85, 89, 97], [90, , 92, 96]])
                                })));
                                return function (r) {
                                    return e.apply(this, arguments)
                                }
                            }());
                            i.push(m.a.all(o))
                        }, onCompleted: (r = V()(O.a.mark((function e() {
                            var r, o, a;
                            return O.a.wrap((function (e) {
                                for (; ;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, m.a.all(i);
                                    case 2:
                                        s.close(), t._network && t._network.body.data.nodes.length > 0 ? (t._data.nodes.update(g()(t._nodes)), t._data.edges.update(g()(t._edges))) : (r = {
                                            nodes: {
                                                font: {
                                                    size: 26,
                                                    strokeWidth: 7
                                                }, scaling: {}
                                            },
                                            edges: {arrows: {to: {enabled: t._config.arrows || !1}}, length: 200},
                                            layout: {
                                                improvedLayout: !1,
                                                hierarchical: {
                                                    enabled: t._config.hierarchical || !1,
                                                    sortMethod: t._config.hierarchical_sort_method || "hubsize"
                                                }
                                            },
                                            physics: {adaptiveTimestep: !0, stabilization: {iterations: 200, fit: !0}}
                                        }, o = t._container, t._data = {
                                            nodes: new J.DataSet(g()(t._nodes)),
                                            edges: new J.DataSet(g()(t._edges))
                                        }, t._consoleLog(t._data.nodes), t._consoleLog(t._data.edges), t._network = new J.Network(o, t._data, r)), t._consoleLog("completed"), j()((function () {
                                            t._network.stopSimulation()
                                        }), 1e4), t._events.generateEvent("completed", {record_count: n}), a = t, t._network.on("click", (function (e) {
                                            if (e.nodes.length > 0) {
                                                var r = this.getNodeAt(e.pointer.DOM);
                                                a._events.generateEvent("clickNode", {nodeId: r, node: a._nodes[r]})
                                            } else if (e.edges.length > 0) {
                                                var t = this.getEdgeAt(e.pointer.DOM);
                                                a._events.generateEvent("clickEdge", {edgeId: t, edge: a._edges[t]})
                                            }
                                        }));
                                    case 9:
                                    case"end":
                                        return e.stop()
                                }
                            }), e)
                        }))), function () {
                            return r.apply(this, arguments)
                        }), onError: function (e) {
                            t._consoleLog(e, "error"), t._events.generateEvent("error", {error_msg: e})
                        }
                    })
                }
            }, {
                key: "clearNetwork", value: function () {
                    this._nodes = {}, this._edges = {}, this._network.setData([])
                }
            }, {
                key: "registerOnEvent", value: function (e, r) {
                    this._events.register(e, r)
                }
            }, {
                key: "reinit", value: function (e) {
                    this._init(e), this.render()
                }
            }, {
                key: "reload", value: function () {
                    this.clearNetwork(), this.render()
                }
            }, {
                key: "stabilize", value: function () {
                    this._network.stopSimulation(), this._consoleLog("Calling stopSimulation")
                }
            }, {
                key: "renderWithCypher", value: function (e) {
                    this.clearNetwork(), this._query = e, this.render()
                }
            }, {
                key: "updateWithCypher", value: function (e) {
                    this.render(e)
                }
            }]), e
        }()
    }])
}));
//# sourceMappingURL=neovis-without-dependencies.js.map