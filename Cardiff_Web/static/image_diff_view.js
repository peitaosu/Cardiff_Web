/*!
 * Original img-xxx.js file from Github (https://github.com).
 * Unminify code and comment out useless functions.
 * 
 * Tony Su (@peitaosu)
 * Date: 2017-12-08
 * 
 */

/*!
 * jQuery JavaScript Library v2.0.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:30Z
 */
/* Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/ */
function b64ToUint6(e) {
    return e > 64 && 91 > e ? e - 65 : e > 96 && 123 > e ? e - 71 : e > 47 && 58 > e ? e + 4 : 43 === e ? 62 : 47 === e ? 63 : 0
}

function base64DecToArr(e, t) {
    for (var n, r, i = e.replace(/[^A-Za-z0-9\+\/]/g, ""), o = i.length, a = t ? Math.ceil((3 * o + 1 >> 2) / t) * t : 3 * o + 1 >> 2, s = new Uint8Array(a), u = 0, l = 0, c = 0; o > c; c++) {
        r = 3 & c;
        u |= b64ToUint6(i.charCodeAt(c)) << 18 - 6 * r;
        if (3 === r || o - c === 1) {
            for (n = 0; 3 > n && a > l; n++, l++) s[l] = u >>> (16 >>> n & 24) & 255;
            u = 0
        }
    }
    return s
}

function uint6ToB64(e) {
    return 26 > e ? e + 65 : 52 > e ? e + 71 : 62 > e ? e - 4 : 62 === e ? 43 : 63 === e ? 47 : 65
}

function base64EncArr(e) {
    for (var t = 2, n = "", r = e.length, i = 0, o = 0; r > o; o++) {
        t = o % 3;
        o > 0 && 4 * o / 3 % 76 === 0 && (n += "\r\n");
        i |= e[o] << (16 >>> t & 24);
        if (2 === t || e.length - o === 1) {
            n += String.fromCharCode(uint6ToB64(i >>> 18 & 63), uint6ToB64(i >>> 12 & 63), uint6ToB64(i >>> 6 & 63), uint6ToB64(63 & i));
            i = 0
        }
    }
    return n.substr(0, n.length - 2 + t) + (2 === t ? "" : 1 === t ? "=" : "==")
}

function UTF8ArrToStr(e) {
    for (var t, n = "", r = e.length, i = 0; r > i; i++) {
        t = e[i];
        n += String.fromCharCode(t > 251 && 254 > t && r > i + 5 ? 1073741824 * (t - 252) + (e[++i] - 128 << 24) + (e[++i] - 128 << 18) + (e[++i] - 128 << 12) + (e[++i] - 128 << 6) + e[++i] - 128 : t > 247 && 252 > t && r > i + 4 ? (t - 248 << 24) + (e[++i] - 128 << 18) + (e[++i] - 128 << 12) + (e[++i] - 128 << 6) + e[++i] - 128 : t > 239 && 248 > t && r > i + 3 ? (t - 240 << 18) + (e[++i] - 128 << 12) + (e[++i] - 128 << 6) + e[++i] - 128 : t > 223 && 240 > t && r > i + 2 ? (t - 224 << 12) + (e[++i] - 128 << 6) + e[++i] - 128 : t > 191 && 224 > t && r > i + 1 ? (t - 192 << 6) + e[++i] - 128 : t)
    }
    return n
}

function strToUTF8Arr(e) {
    for (var t, n, r = e.length, i = 0, o = 0; r > o; o++) {
        n = e.charCodeAt(o);
        i += 128 > n ? 1 : 2048 > n ? 2 : 65536 > n ? 3 : 2097152 > n ? 4 : 67108864 > n ? 5 : 6
    }
    t = new Uint8Array(i);
    for (var a = 0, s = 0; i > a; s++) {
        n = e.charCodeAt(s);
        if (128 > n) t[a++] = n;
        else if (2048 > n) {
            t[a++] = 192 + (n >>> 6);
            t[a++] = 128 + (63 & n)
        } else if (65536 > n) {
            t[a++] = 224 + (n >>> 12);
            t[a++] = 128 + (n >>> 6 & 63);
            t[a++] = 128 + (63 & n)
        } else if (2097152 > n) {
            t[a++] = 240 + (n >>> 18);
            t[a++] = 128 + (n >>> 12 & 63);
            t[a++] = 128 + (n >>> 6 & 63);
            t[a++] = 128 + (63 & n)
        } else if (67108864 > n) {
            t[a++] = 248 + (n >>> 24);
            t[a++] = 128 + (n >>> 18 & 63);
            t[a++] = 128 + (n >>> 12 & 63);
            t[a++] = 128 + (n >>> 6 & 63);
            t[a++] = 128 + (63 & n)
        } else {
            t[a++] = 252 + n / 1073741824;
            t[a++] = 128 + (n >>> 24 & 63);
            t[a++] = 128 + (n >>> 18 & 63);
            t[a++] = 128 + (n >>> 12 & 63);
            t[a++] = 128 + (n >>> 6 & 63);
            t[a++] = 128 + (63 & n)
        }
    }
    return t
}! function(e, t) {
    function n(e) {
        var t = e.length,
            n = oe.type(e);
        return oe.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function r(e) {
        var t = pe[e] = {};
        oe.each(e.match(se) || [], function(e, n) {
            t[n] = !0
        });
        return t
    }

    function i() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        });
        this.expando = oe.expando + Math.random()
    }

    function o(e, n, r) {
        var i;
        if (r === t && 1 === e.nodeType) {
            i = "data-" + n.replace(ve, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if ("string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : ye.test(r) ? JSON.parse(r) : r
                } catch (o) {}
                ge.set(e, n, r)
            } else r = t
        }
        return r
    }

    function a() {
        return !0
    }

    function s() {
        return !1
    }

    function u() {
        try {
            return U.activeElement
        } catch (e) {}
    }

    function l(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function c(e, t, n) {
        if (oe.isFunction(t)) return oe.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return oe.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (je.test(t)) return oe.filter(t, e, n);
            t = oe.filter(t, e)
        }
        return oe.grep(e, function(e) {
            return te.call(t, e) >= 0 !== n
        })
    }

    function f(e, t) {
        return oe.nodeName(e, "table") && oe.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function d(e) {
        e.type = (null !== e.getAttribute("type")) + "/" + e.type;
        return e
    }

    function h(e) {
        var t = Fe.exec(e.type);
        t ? e.type = t[1] : e.removeAttribute("type");
        return e
    }

    function p(e, t) {
        for (var n = e.length, r = 0; n > r; r++) me.set(e[r], "globalEval", !t || me.get(t[r], "globalEval"))
    }

    function g(e, t) {
        var n, r, i, o, a, s, u, l;
        if (1 === t.nodeType) {
            if (me.hasData(e)) {
                o = me.access(e);
                a = me.set(t, o);
                l = o.events;
                if (l) {
                    delete a.handle;
                    a.events = {};
                    for (i in l)
                        for (n = 0, r = l[i].length; r > n; n++) oe.event.add(t, i, l[i][n])
                }
            }
            if (ge.hasData(e)) {
                s = ge.access(e);
                u = oe.extend({}, s);
                ge.set(t, u)
            }
        }
    }

    function m(e, n) {
        var r = e.getElementsByTagName ? e.getElementsByTagName(n || "*") : e.querySelectorAll ? e.querySelectorAll(n || "*") : [];
        return n === t || n && oe.nodeName(e, n) ? oe.merge([e], r) : r
    }

    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && He.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function v(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Ze.length; i--;) {
            t = Ze[i] + n;
            if (t in e) return t
        }
        return r
    }

    function w(e, t) {
        e = t || e;
        return "none" === oe.css(e, "display") || !oe.contains(e.ownerDocument, e)
    }

    function b(t) {
        return e.getComputedStyle(t, null)
    }

    function x(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) {
            r = e[a];
            if (r.style) {
                o[a] = me.get(r, "olddisplay");
                n = r.style.display;
                if (t) {
                    o[a] || "none" !== n || (r.style.display = "");
                    "" === r.style.display && w(r) && (o[a] = me.access(r, "olddisplay", S(r.nodeName)))
                } else if (!o[a]) {
                    i = w(r);
                    (n && "none" !== n || !i) && me.set(r, "olddisplay", i ? n : oe.css(r, "display"))
                }
            }
        }
        for (a = 0; s > a; a++) {
            r = e[a];
            r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"))
        }
        return e
    }

    function T(e, t, n) {
        var r = Xe.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function k(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) {
            "margin" === n && (a += oe.css(e, n + Ke[o], !0, i));
            if (r) {
                "content" === n && (a -= oe.css(e, "padding" + Ke[o], !0, i));
                "margin" !== n && (a -= oe.css(e, "border" + Ke[o] + "Width", !0, i))
            } else {
                a += oe.css(e, "padding" + Ke[o], !0, i);
                "padding" !== n && (a += oe.css(e, "border" + Ke[o] + "Width", !0, i))
            }
        }
        return a
    }

    function C(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = b(e),
            a = oe.support.boxSizing && "border-box" === oe.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            i = We(e, t, o);
            (0 > i || null == i) && (i = e.style[t]);
            if (Ge.test(i)) return i;
            r = a && (oe.support.boxSizingReliable || i === e.style[t]);
            i = parseFloat(i) || 0
        }
        return i + k(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }

    function S(e) {
        var t = U,
            n = Ve[e];
        if (!n) {
            n = N(e, t);
            if ("none" === n || !n) {
                Be = (Be || oe("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement);
                t = (Be[0].contentWindow || Be[0].contentDocument).document;
                t.write("<!doctype html><html><body>");
                t.close();
                n = N(e, t);
                Be.detach()
            }
            Ve[e] = n
        }
        return n
    }

    function N(e, t) {
        var n = oe(t.createElement(e)).appendTo(t.body),
            r = oe.css(n[0], "display");
        n.remove();
        return r
    }

    function D(e, t, n, r) {
        var i;
        if (oe.isArray(t)) oe.each(t, function(t, i) {
            n || tt.test(e) ? r(e, i) : D(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== oe.type(t)) r(e, t);
        else
            for (i in t) D(e + "[" + i + "]", t[i], n, r)
    }

    function j(e) {
        return function(t, n) {
            if ("string" != typeof t) {
                n = t;
                t = "*"
            }
            var r, i = 0,
                o = t.toLowerCase().match(se) || [];
            if (oe.isFunction(n))
                for (; r = o[i++];)
                    if ("+" === r[0]) {
                        r = r.slice(1) || "*";
                        (e[r] = e[r] || []).unshift(n)
                    } else(e[r] = e[r] || []).push(n)
        }
    }

    function A(e, t, n, r) {
        function i(s) {
            var u;
            o[s] = !0;
            oe.each(e[s] || [], function(e, s) {
                var l = s(t, n, r);
                if ("string" == typeof l && !a && !o[l]) {
                    t.dataTypes.unshift(l);
                    i(l);
                    return !1
                }
                return a ? !(u = l) : void 0
            });
            return u
        }
        var o = {},
            a = e === vt;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }

    function E(e, n) {
        var r, i, o = oe.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
        i && oe.extend(!0, e, i);
        return e
    }

    function R(e, n, r) {
        for (var i, o, a, s, u = e.contents, l = e.dataTypes;
            "*" === l[0];) {
            l.shift();
            i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"))
        }
        if (i)
            for (o in u)
                if (u[o] && u[o].test(i)) {
                    l.unshift(o);
                    break
                }
        if (l[0] in r) a = l[0];
        else {
            for (o in r) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    a = o;
                    break
                }
                s || (s = o)
            }
            a = a || s
        }
        if (a) {
            a !== l[0] && l.unshift(a);
            return r[a]
        }
    }

    function O(e, t, n, r) {
        var i, o, a, s, u, l = {},
            c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        o = c.shift();
        for (; o;) {
            e.responseFields[o] && (n[e.responseFields[o]] = t);
            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType));
            u = o;
            o = c.shift();
            if (o)
                if ("*" === o) o = u;
                else if ("*" !== u && u !== o) {
                a = l[u + " " + o] || l["* " + o];
                if (!a)
                    for (i in l) {
                        s = i.split(" ");
                        if (s[1] === o) {
                            a = l[u + " " + s[0]] || l["* " + s[0]];
                            if (a) {
                                if (a === !0) a = l[i];
                                else if (l[i] !== !0) {
                                    o = s[0];
                                    c.unshift(s[1])
                                }
                                break
                            }
                        }
                    }
                if (a !== !0)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (f) {
                        return {
                            state: "parsererror",
                            error: a ? f : "No conversion from " + u + " to " + o
                        }
                    }
            }
        }
        return {
            state: "success",
            data: t
        }
    }

    function I() {
        setTimeout(function() {
            Dt = t
        });
        return Dt = oe.now()
    }

    function $(e, t, n) {
        for (var r, i = (It[t] || []).concat(It["*"]), o = 0, a = i.length; a > o; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function q(e, t, n) {
        var r, i, o = 0,
            a = Ot.length,
            s = oe.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = Dt || I(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                s.notifyWith(e, [l, o, n]);
                if (1 > o && u) return n;
                s.resolveWith(e, [l]);
                return !1
            },
            l = s.promise({
                elem: e,
                props: oe.extend({}, t),
                opts: oe.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Dt || I(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = oe.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    l.tweens.push(r);
                    return r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    i = !0;
                    for (; r > n; n++) l.tweens[n].run(1);
                    t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]);
                    return this
                }
            }),
            c = l.props;
        H(c, l.opts.specialEasing);
        for (; a > o; o++) {
            r = Ot[o].call(l, e, c, l.opts);
            if (r) return r
        }
        oe.map(c, $, l);
        oe.isFunction(l.opts.start) && l.opts.start.call(e, l);
        oe.fx.timer(oe.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        }));
        return l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function H(e, t) {
        var n, r, i, o, a;
        for (n in e) {
            r = oe.camelCase(n);
            i = t[r];
            o = e[n];
            if (oe.isArray(o)) {
                i = o[1];
                o = e[n] = o[0]
            }
            if (n !== r) {
                e[r] = o;
                delete e[n]
            }
            a = oe.cssHooks[r];
            if (a && "expand" in a) {
                o = a.expand(o);
                delete e[r];
                for (n in o)
                    if (!(n in e)) {
                        e[n] = o[n];
                        t[n] = i
                    }
            } else t[r] = i
        }
    }

    function M(e, n, r) {
        var i, o, a, s, u, l, c = this,
            f = {},
            d = e.style,
            h = e.nodeType && w(e),
            p = me.get(e, "fxshow");
        if (!r.queue) {
            u = oe._queueHooks(e, "fx");
            if (null == u.unqueued) {
                u.unqueued = 0;
                l = u.empty.fire;
                u.empty.fire = function() {
                    u.unqueued || l()
                }
            }
            u.unqueued++;
            c.always(function() {
                c.always(function() {
                    u.unqueued--;
                    oe.queue(e, "fx").length || u.empty.fire()
                })
            })
        }
        if (1 === e.nodeType && ("height" in n || "width" in n)) {
            r.overflow = [d.overflow, d.overflowX, d.overflowY];
            "inline" === oe.css(e, "display") && "none" === oe.css(e, "float") && (d.display = "inline-block")
        }
        if (r.overflow) {
            d.overflow = "hidden";
            c.always(function() {
                d.overflow = r.overflow[0];
                d.overflowX = r.overflow[1];
                d.overflowY = r.overflow[2]
            })
        }
        for (i in n) {
            o = n[i];
            if (At.exec(o)) {
                delete n[i];
                a = a || "toggle" === o;
                if (o === (h ? "hide" : "show")) {
                    if ("show" !== o || !p || p[i] === t) continue;
                    h = !0
                }
                f[i] = p && p[i] || oe.style(e, i)
            }
        }
        if (!oe.isEmptyObject(f)) {
            p ? "hidden" in p && (h = p.hidden) : p = me.access(e, "fxshow", {});
            a && (p.hidden = !h);
            h ? oe(e).show() : c.done(function() {
                oe(e).hide()
            });
            c.done(function() {
                var t;
                me.remove(e, "fxshow");
                for (t in f) oe.style(e, t, f[t])
            });
            for (i in f) {
                s = $(h ? p[i] : 0, i, c);
                if (!(i in p)) {
                    p[i] = s.start;
                    if (h) {
                        s.end = s.start;
                        s.start = "width" === i || "height" === i ? 1 : 0
                    }
                }
            }
        }
    }

    function L(e, t, n, r, i) {
        return new L.prototype.init(e, t, n, r, i)
    }

    function F(e, t) {
        var n, r = {
                height: e
            },
            i = 0;
        t = t ? 1 : 0;
        for (; 4 > i; i += 2 - t) {
            n = Ke[i];
            r["margin" + n] = r["padding" + n] = e
        }
        t && (r.opacity = r.width = e);
        return r
    }

    function P(e) {
        return oe.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }
    var _, W, B = typeof t,
        z = e.location,
        U = e.document,
        X = U.documentElement,
        G = e.jQuery,
        J = e.$,
        V = {},
        Y = [],
        Q = "2.0.3",
        K = Y.concat,
        Z = Y.push,
        ee = Y.slice,
        te = Y.indexOf,
        ne = V.toString,
        re = V.hasOwnProperty,
        ie = Q.trim,
        oe = function(e, t) {
            return new oe.fn.init(e, t, _)
        },
        ae = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        se = /\S+/g,
        ue = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        le = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ce = /^-ms-/,
        fe = /-([\da-z])/gi,
        de = function(e, t) {
            return t.toUpperCase()
        },
        he = function() {
            U.removeEventListener("DOMContentLoaded", he, !1);
            e.removeEventListener("load", he, !1);
            oe.ready()
        };
    oe.fn = oe.prototype = {
        jquery: Q,
        constructor: oe,
        init: function(e, n, r) {
            var i, o;
            if (!e) return this;
            if ("string" == typeof e) {
                i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ue.exec(e);
                if (!i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    n = n instanceof oe ? n[0] : n;
                    oe.merge(this, oe.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : U, !0));
                    if (le.test(i[1]) && oe.isPlainObject(n))
                        for (i in n) oe.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                o = U.getElementById(i[2]);
                if (o && o.parentNode) {
                    this.length = 1;
                    this[0] = o
                }
                this.context = U;
                this.selector = e;
                return this
            }
            if (e.nodeType) {
                this.context = this[0] = e;
                this.length = 1;
                return this
            }
            if (oe.isFunction(e)) return r.ready(e);
            if (e.selector !== t) {
                this.selector = e.selector;
                this.context = e.context
            }
            return oe.makeArray(e, this)
        },
        selector: "",
        length: 0,
        toArray: function() {
            return ee.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = oe.merge(this.constructor(), e);
            t.prevObject = this;
            t.context = this.context;
            return t
        },
        each: function(e, t) {
            return oe.each(this, e, t)
        },
        ready: function(e) {
            oe.ready.promise().done(e);
            return this
        },
        slice: function() {
            return this.pushStack(ee.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(oe.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: Z,
        sort: [].sort,
        splice: [].splice
    };
    oe.fn.init.prototype = oe.fn;
    oe.extend = oe.fn.extend = function() {
        var e, n, r, i, o, a, s = arguments[0] || {},
            u = 1,
            l = arguments.length,
            c = !1;
        if ("boolean" == typeof s) {
            c = s;
            s = arguments[1] || {};
            u = 2
        }
        "object" == typeof s || oe.isFunction(s) || (s = {});
        if (l === u) {
            s = this;
            --u
        }
        for (; l > u; u++)
            if (null != (e = arguments[u]))
                for (n in e) {
                    r = s[n];
                    i = e[n];
                    if (s !== i)
                        if (c && i && (oe.isPlainObject(i) || (o = oe.isArray(i)))) {
                            if (o) {
                                o = !1;
                                a = r && oe.isArray(r) ? r : []
                            } else a = r && oe.isPlainObject(r) ? r : {};
                            s[n] = oe.extend(c, a, i)
                        } else i !== t && (s[n] = i)
                }
            return s
    };
    oe.extend({
        expando: "jQuery" + (Q + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            e.$ === oe && (e.$ = J);
            t && e.jQuery === oe && (e.jQuery = G);
            return oe
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? oe.readyWait++ : oe.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--oe.readyWait : !oe.isReady) {
                oe.isReady = !0;
                if (!(e !== !0 && --oe.readyWait > 0)) {
                    W.resolveWith(U, [oe]);
                    oe.fn.trigger && oe(U).trigger("ready").off("ready")
                }
            }
        },
        isFunction: function(e) {
            return "function" === oe.type(e)
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? V[ne.call(e)] || "object" : typeof e
        },
        isPlainObject: function(e) {
            if ("object" !== oe.type(e) || e.nodeType || oe.isWindow(e)) return !1;
            try {
                if (e.constructor && !re.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (t) {
                return !1
            }
            return !0
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            if ("boolean" == typeof t) {
                n = t;
                t = !1
            }
            t = t || U;
            var r = le.exec(e),
                i = !n && [];
            if (r) return [t.createElement(r[1])];
            r = oe.buildFragment([e], t, i);
            i && oe(i).remove();
            return oe.merge([], r.childNodes)
        },
        parseJSON: JSON.parse,
        parseXML: function(e) {
            var n, r;
            if (!e || "string" != typeof e) return null;
            try {
                r = new DOMParser;
                n = r.parseFromString(e, "text/xml")
            } catch (i) {
                n = t
            }(!n || n.getElementsByTagName("parsererror").length) && oe.error("Invalid XML: " + e);
            return n
        },
        noop: function() {},
        globalEval: function(e) {
            var t, n = eval;
            e = oe.trim(e);
            if (e)
                if (1 === e.indexOf("use strict")) {
                    t = U.createElement("script");
                    t.text = e;
                    U.head.appendChild(t).parentNode.removeChild(t)
                } else n(e)
        },
        camelCase: function(e) {
            return e.replace(ce, "ms-").replace(fe, de)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e);
            if (r)
                if (s)
                    for (; a > o; o++) {
                        i = t.apply(e[o], r);
                        if (i === !1) break
                    } else
                        for (o in e) {
                            i = t.apply(e[o], r);
                            if (i === !1) break
                        } else if (s)
                            for (; a > o; o++) {
                                i = t.call(e[o], o, e[o]);
                                if (i === !1) break
                            } else
                                for (o in e) {
                                    i = t.call(e[o], o, e[o]);
                                    if (i === !1) break
                                }
                        return e
        },
        trim: function(e) {
            return null == e ? "" : ie.call(e)
        },
        makeArray: function(e, t) {
            var r = t || [];
            null != e && (n(Object(e)) ? oe.merge(r, "string" == typeof e ? [e] : e) : Z.call(r, e));
            return r
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : te.call(t, e, n)
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                o = 0;
            if ("number" == typeof r)
                for (; r > o; o++) e[i++] = n[o];
            else
                for (; n[o] !== t;) e[i++] = n[o++];
            e.length = i;
            return e
        },
        grep: function(e, t, n) {
            var r, i = [],
                o = 0,
                a = e.length;
            n = !!n;
            for (; a > o; o++) {
                r = !!t(e[o], o);
                n !== r && i.push(e[o])
            }
            return i
        },
        map: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e),
                u = [];
            if (s)
                for (; a > o; o++) {
                    i = t(e[o], o, r);
                    null != i && (u[u.length] = i)
                } else
                    for (o in e) {
                        i = t(e[o], o, r);
                        null != i && (u[u.length] = i)
                    }
            return K.apply([], u)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, o;
            if ("string" == typeof n) {
                r = e[n];
                n = e;
                e = r
            }
            if (!oe.isFunction(e)) return t;
            i = ee.call(arguments, 2);
            o = function() {
                return e.apply(n || this, i.concat(ee.call(arguments)))
            };
            o.guid = e.guid = e.guid || oe.guid++;
            return o
        },
        access: function(e, n, r, i, o, a, s) {
            var u = 0,
                l = e.length,
                c = null == r;
            if ("object" === oe.type(r)) {
                o = !0;
                for (u in r) oe.access(e, n, u, r[u], !0, a, s)
            } else if (i !== t) {
                o = !0;
                oe.isFunction(i) || (s = !0);
                if (c)
                    if (s) {
                        n.call(e, i);
                        n = null
                    } else {
                        c = n;
                        n = function(e, t, n) {
                            return c.call(oe(e), n)
                        }
                    }
                if (n)
                    for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)))
            }
            return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
        },
        now: Date.now,
        swap: function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) {
                a[o] = e.style[o];
                e.style[o] = t[o]
            }
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        }
    });
    oe.ready.promise = function(t) {
        if (!W) {
            W = oe.Deferred();
            if ("complete" === U.readyState) setTimeout(oe.ready);
            else {
                U.addEventListener("DOMContentLoaded", he, !1);
                e.addEventListener("load", he, !1)
            }
        }
        return W.promise(t)
    };
    oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        V["[object " + t + "]"] = t.toLowerCase()
    });
    _ = oe(U);
    /*!
     * Sizzle CSS Selector Engine v1.9.4-pre
     * http://sizzlejs.com/
     *
     * Copyright 2013 jQuery Foundation, Inc. and other contributors
     * Released under the MIT license
     * http://jquery.org/license
     *
     * Date: 2013-06-03
     */
    ! function(e, t) {
        function n(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p, g;
            (t ? t.ownerDocument || t : P) !== O && R(t);
            t = t || O;
            n = n || [];
            if (!e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if ($ && !r) {
                if (i = we.exec(e))
                    if (a = i[1]) {
                        if (9 === s) {
                            o = t.getElementById(a);
                            if (!o || !o.parentNode) return n;
                            if (o.id === a) {
                                n.push(o);
                                return n
                            }
                        } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && L(t, o) && o.id === a) {
                            n.push(o);
                            return n
                        }
                    } else {
                        if (i[2]) {
                            ee.apply(n, t.getElementsByTagName(e));
                            return n
                        }
                        if ((a = i[3]) && k.getElementsByClassName && t.getElementsByClassName) {
                            ee.apply(n, t.getElementsByClassName(a));
                            return n
                        }
                    }
                if (k.qsa && (!q || !q.test(e))) {
                    f = c = F;
                    p = t;
                    g = 9 === s && e;
                    if (1 === s && "object" !== t.nodeName.toLowerCase()) {
                        l = d(e);
                        (c = t.getAttribute("id")) ? f = c.replace(Te, "\\$&"): t.setAttribute("id", f);
                        f = "[id='" + f + "'] ";
                        u = l.length;
                        for (; u--;) l[u] = f + h(l[u]);
                        p = he.test(e) && t.parentNode || t;
                        g = l.join(",")
                    }
                    if (g) try {
                        ee.apply(n, p.querySelectorAll(g));
                        return n
                    } catch (m) {} finally {
                        c || t.removeAttribute("id")
                    }
                }
            }
            return x(e.replace(ce, "$1"), t, n, r)
        }

        function r() {
            function e(n, r) {
                t.push(n += " ") > S.cacheLength && delete e[t.shift()];
                return e[n] = r
            }
            var t = [];
            return e
        }

        function i(e) {
            e[F] = !0;
            return e
        }

        function o(e) {
            var t = O.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t);
                t = null
            }
        }

        function a(e, t) {
            for (var n = e.split("|"), r = e.length; r--;) S.attrHandle[n[r]] = t
        }

        function s(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || V) - (~e.sourceIndex || V);
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function c(e) {
            return i(function(t) {
                t = +t;
                return i(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function f() {}

        function d(e, t) {
            var r, i, o, a, s, u, l, c = z[e + " "];
            if (c) return t ? 0 : c.slice(0);
            s = e;
            u = [];
            l = S.preFilter;
            for (; s;) {
                if (!r || (i = fe.exec(s))) {
                    i && (s = s.slice(i[0].length) || s);
                    u.push(o = [])
                }
                r = !1;
                if (i = de.exec(s)) {
                    r = i.shift();
                    o.push({
                        value: r,
                        type: i[0].replace(ce, " ")
                    });
                    s = s.slice(r.length)
                }
                for (a in S.filter)
                    if ((i = ye[a].exec(s)) && (!l[a] || (i = l[a](i)))) {
                        r = i.shift();
                        o.push({
                            value: r,
                            type: a,
                            matches: i
                        });
                        s = s.slice(r.length)
                    }
                if (!r) break
            }
            return t ? s.length : s ? n.error(e) : z(e, u).slice(0)
        }

        function h(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }

        function p(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                o = W++;
            return t.first ? function(t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i) return e(t, n, o)
            } : function(t, n, a) {
                var s, u, l, c = _ + " " + o;
                if (a) {
                    for (; t = t[r];)
                        if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                } else
                    for (; t = t[r];)
                        if (1 === t.nodeType || i) {
                            l = t[F] || (t[F] = {});
                            if ((u = l[r]) && u[0] === c) {
                                if ((s = u[1]) === !0 || s === C) return s === !0
                            } else {
                                u = l[r] = [c];
                                u[1] = e(t, n, a) || C;
                                if (u[1] === !0) return !0
                            }
                        }
            }
        }

        function g(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }

        function m(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)
                if ((o = e[s]) && (!n || n(o, r, i))) {
                    a.push(o);
                    l && t.push(s)
                }
            return a
        }

        function y(e, t, n, r, o, a) {
            r && !r[F] && (r = y(r));
            o && !o[F] && (o = y(o, a));
            return i(function(i, a, s, u) {
                var l, c, f, d = [],
                    h = [],
                    p = a.length,
                    g = i || b(t || "*", s.nodeType ? [s] : s, []),
                    y = !e || !i && t ? g : m(g, d, e, s, u),
                    v = n ? o || (i ? e : p || r) ? [] : a : y;
                n && n(y, v, s, u);
                if (r) {
                    l = m(v, h);
                    r(l, [], s, u);
                    c = l.length;
                    for (; c--;)(f = l[c]) && (v[h[c]] = !(y[h[c]] = f))
                }
                if (i) {
                    if (o || e) {
                        if (o) {
                            l = [];
                            c = v.length;
                            for (; c--;)(f = v[c]) && l.push(y[c] = f);
                            o(null, v = [], l, u)
                        }
                        c = v.length;
                        for (; c--;)(f = v[c]) && (l = o ? ne.call(i, f) : d[c]) > -1 && (i[l] = !(a[l] = f))
                    }
                } else {
                    v = m(v === a ? v.splice(p, v.length) : v);
                    o ? o(null, a, v, u) : ee.apply(a, v)
                }
            })
        }

        function v(e) {
            for (var t, n, r, i = e.length, o = S.relative[e[0].type], a = o || S.relative[" "], s = o ? 1 : 0, u = p(function(e) {
                    return e === t
                }, a, !0), l = p(function(e) {
                    return ne.call(t, e) > -1
                }, a, !0), c = [function(e, n, r) {
                    return !o && (r || n !== A) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
                }]; i > s; s++)
                if (n = S.relative[e[s].type]) c = [p(g(c), n)];
                else {
                    n = S.filter[e[s].type].apply(null, e[s].matches);
                    if (n[F]) {
                        r = ++s;
                        for (; i > r && !S.relative[e[r].type]; r++);
                        return y(s > 1 && g(c), s > 1 && h(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(ce, "$1"), n, r > s && v(e.slice(s, r)), i > r && v(e = e.slice(r)), i > r && h(e))
                    }
                    c.push(n)
                }
            return g(c)
        }

        function w(e, t) {
            var r = 0,
                o = t.length > 0,
                a = e.length > 0,
                s = function(i, s, u, l, c) {
                    var f, d, h, p = [],
                        g = 0,
                        y = "0",
                        v = i && [],
                        w = null != c,
                        b = A,
                        x = i || a && S.find.TAG("*", c && s.parentNode || s),
                        T = _ += null == b ? 1 : Math.random() || .1;
                    if (w) {
                        A = s !== O && s;
                        C = r
                    }
                    for (; null != (f = x[y]); y++) {
                        if (a && f) {
                            d = 0;
                            for (; h = e[d++];)
                                if (h(f, s, u)) {
                                    l.push(f);
                                    break
                                }
                            if (w) {
                                _ = T;
                                C = ++r
                            }
                        }
                        if (o) {
                            (f = !h && f) && g--;
                            i && v.push(f)
                        }
                    }
                    g += y;
                    if (o && y !== g) {
                        d = 0;
                        for (; h = t[d++];) h(v, p, s, u);
                        if (i) {
                            if (g > 0)
                                for (; y--;) v[y] || p[y] || (p[y] = K.call(l));
                            p = m(p)
                        }
                        ee.apply(l, p);
                        w && !i && p.length > 0 && g + t.length > 1 && n.uniqueSort(l)
                    }
                    if (w) {
                        _ = T;
                        A = b
                    }
                    return v
                };
            return o ? i(s) : s
        }

        function b(e, t, r) {
            for (var i = 0, o = t.length; o > i; i++) n(e, t[i], r);
            return r
        }

        function x(e, t, n, r) {
            var i, o, a, s, u, l = d(e);
            if (!r && 1 === l.length) {
                o = l[0] = l[0].slice(0);
                if (o.length > 2 && "ID" === (a = o[0]).type && k.getById && 9 === t.nodeType && $ && S.relative[o[1].type]) {
                    t = (S.find.ID(a.matches[0].replace(ke, Ce), t) || [])[0];
                    if (!t) return n;
                    e = e.slice(o.shift().value.length)
                }
                i = ye.needsContext.test(e) ? 0 : o.length;
                for (; i--;) {
                    a = o[i];
                    if (S.relative[s = a.type]) break;
                    if ((u = S.find[s]) && (r = u(a.matches[0].replace(ke, Ce), he.test(o[0].type) && t.parentNode || t))) {
                        o.splice(i, 1);
                        e = r.length && h(o);
                        if (!e) {
                            ee.apply(n, r);
                            return n
                        }
                        break
                    }
                }
            }
            j(e, l)(r, t, !$, n, he.test(e));
            return n
        }
        var T, k, C, S, N, D, j, A, E, R, O, I, $, q, H, M, L, F = "sizzle" + -new Date,
            P = e.document,
            _ = 0,
            W = 0,
            B = r(),
            z = r(),
            U = r(),
            X = !1,
            G = function(e, t) {
                if (e === t) {
                    X = !0;
                    return 0
                }
                return 0
            },
            J = typeof t,
            V = 1 << 31,
            Y = {}.hasOwnProperty,
            Q = [],
            K = Q.pop,
            Z = Q.push,
            ee = Q.push,
            te = Q.slice,
            ne = Q.indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++)
                    if (this[t] === e) return t;
                return -1
            },
            re = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ie = "[\\x20\\t\\r\\n\\f]",
            ae = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            se = ae.replace("w", "w#"),
            ue = "\\[" + ie + "*(" + ae + ")" + ie + "*(?:([*^$|!~]?=)" + ie + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + se + ")|)|)" + ie + "*\\]",
            le = ":(" + ae + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + ue.replace(3, 8) + ")*)|.*)\\)|)",
            ce = new RegExp("^" + ie + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ie + "+$", "g"),
            fe = new RegExp("^" + ie + "*," + ie + "*"),
            de = new RegExp("^" + ie + "*([>+~]|" + ie + ")" + ie + "*"),
            he = new RegExp(ie + "*[+~]"),
            pe = new RegExp("=" + ie + "*([^\\]'\"]*)" + ie + "*\\]", "g"),
            ge = new RegExp(le),
            me = new RegExp("^" + se + "$"),
            ye = {
                ID: new RegExp("^#(" + ae + ")"),
                CLASS: new RegExp("^\\.(" + ae + ")"),
                TAG: new RegExp("^(" + ae.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + ue),
                PSEUDO: new RegExp("^" + le),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ie + "*(even|odd|(([+-]|)(\\d*)n|)" + ie + "*(?:([+-]|)" + ie + "*(\\d+)|))" + ie + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + re + ")$", "i"),
                needsContext: new RegExp("^" + ie + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ie + "*((?:-\\d)?\\d*)" + ie + "*\\)|)(?=[^-]|$)", "i")
            },
            ve = /^[^{]+\{\s*\[native \w/,
            we = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            be = /^(?:input|select|textarea|button)$/i,
            xe = /^h\d$/i,
            Te = /'|\\/g,
            ke = new RegExp("\\\\([\\da-f]{1,6}" + ie + "?|(" + ie + ")|.)", "ig"),
            Ce = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            };
        try {
            ee.apply(Q = te.call(P.childNodes), P.childNodes);
            Q[P.childNodes.length].nodeType
        } catch (Se) {
            ee = {
                apply: Q.length ? function(e, t) {
                    Z.apply(e, te.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        D = n.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        };
        k = n.support = {};
        R = n.setDocument = function(e) {
            var t = e ? e.ownerDocument || e : P,
                n = t.defaultView;
            if (t === O || 9 !== t.nodeType || !t.documentElement) return O;
            O = t;
            I = t.documentElement;
            $ = !D(t);
            n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
                R()
            });
            k.attributes = o(function(e) {
                e.className = "i";
                return !e.getAttribute("className")
            });
            k.getElementsByTagName = o(function(e) {
                e.appendChild(t.createComment(""));
                return !e.getElementsByTagName("*").length
            });
            k.getElementsByClassName = o(function(e) {
                e.innerHTML = "<div class='a'></div><div class='a i'></div>";
                e.firstChild.className = "i";
                return 2 === e.getElementsByClassName("i").length
            });
            k.getById = o(function(e) {
                I.appendChild(e).id = F;
                return !t.getElementsByName || !t.getElementsByName(F).length
            });
            if (k.getById) {
                S.find.ID = function(e, t) {
                    if (typeof t.getElementById !== J && $) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                };
                S.filter.ID = function(e) {
                    var t = e.replace(ke, Ce);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }
            } else {
                delete S.find.ID;
                S.filter.ID = function(e) {
                    var t = e.replace(ke, Ce);
                    return function(e) {
                        var n = typeof e.getAttributeNode !== J && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }
            }
            S.find.TAG = k.getElementsByTagName ? function(e, t) {
                return typeof t.getElementsByTagName !== J ? t.getElementsByTagName(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            };
            S.find.CLASS = k.getElementsByClassName && function(e, t) {
                return typeof t.getElementsByClassName !== J && $ ? t.getElementsByClassName(e) : void 0
            };
            H = [];
            q = [];
            if (k.qsa = ve.test(t.querySelectorAll)) {
                o(function(e) {
                    e.innerHTML = "<select><option selected=''></option></select>";
                    e.querySelectorAll("[selected]").length || q.push("\\[" + ie + "*(?:value|" + re + ")");
                    e.querySelectorAll(":checked").length || q.push(":checked")
                });
                o(function(e) {
                    var n = t.createElement("input");
                    n.setAttribute("type", "hidden");
                    e.appendChild(n).setAttribute("t", "");
                    e.querySelectorAll("[t^='']").length && q.push("[*^$]=" + ie + "*(?:''|\"\")");
                    e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled");
                    e.querySelectorAll("*,:x");
                    q.push(",.*:")
                })
            }(k.matchesSelector = ve.test(M = I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && o(function(e) {
                k.disconnectedMatch = M.call(e, "div");
                M.call(e, "[s!='']:x");
                H.push("!=", le)
            });
            q = q.length && new RegExp(q.join("|"));
            H = H.length && new RegExp(H.join("|"));
            L = ve.test(I.contains) || I.compareDocumentPosition ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            };
            G = I.compareDocumentPosition ? function(e, n) {
                if (e === n) {
                    X = !0;
                    return 0
                }
                var r = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                return r ? 1 & r || !k.sortDetached && n.compareDocumentPosition(e) === r ? e === t || L(P, e) ? -1 : n === t || L(P, n) ? 1 : E ? ne.call(E, e) - ne.call(E, n) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function(e, n) {
                var r, i = 0,
                    o = e.parentNode,
                    a = n.parentNode,
                    u = [e],
                    l = [n];
                if (e === n) {
                    X = !0;
                    return 0
                }
                if (!o || !a) return e === t ? -1 : n === t ? 1 : o ? -1 : a ? 1 : E ? ne.call(E, e) - ne.call(E, n) : 0;
                if (o === a) return s(e, n);
                r = e;
                for (; r = r.parentNode;) u.unshift(r);
                r = n;
                for (; r = r.parentNode;) l.unshift(r);
                for (; u[i] === l[i];) i++;
                return i ? s(u[i], l[i]) : u[i] === P ? -1 : l[i] === P ? 1 : 0
            };
            return t
        };
        n.matches = function(e, t) {
            return n(e, null, null, t)
        };
        n.matchesSelector = function(e, t) {
            (e.ownerDocument || e) !== O && R(e);
            t = t.replace(pe, "='$1']");
            if (k.matchesSelector && $ && (!H || !H.test(t)) && (!q || !q.test(t))) try {
                var r = M.call(e, t);
                if (r || k.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return n(t, O, null, [e]).length > 0
        };
        n.contains = function(e, t) {
            (e.ownerDocument || e) !== O && R(e);
            return L(e, t)
        };
        n.attr = function(e, n) {
            (e.ownerDocument || e) !== O && R(e);
            var r = S.attrHandle[n.toLowerCase()],
                i = r && Y.call(S.attrHandle, n.toLowerCase()) ? r(e, n, !$) : t;
            return i === t ? k.attributes || !$ ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
        };
        n.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        };
        n.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            X = !k.detectDuplicates;
            E = !k.sortStable && e.slice(0);
            e.sort(G);
            if (X) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return e
        };
        N = n.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += N(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r]; r++) n += N(t);
            return n
        };
        S = n.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: ye,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace(ke, Ce);
                    e[3] = (e[4] || e[5] || "").replace(ke, Ce);
                    "~=" === e[2] && (e[3] = " " + e[3] + " ");
                    return e.slice(0, 4)
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    if ("nth" === e[1].slice(0, 3)) {
                        e[3] || n.error(e[0]);
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]));
                        e[5] = +(e[7] + e[8] || "odd" === e[3])
                    } else e[3] && n.error(e[0]);
                    return e
                },
                PSEUDO: function(e) {
                    var n, r = !e[5] && e[2];
                    if (ye.CHILD.test(e[0])) return null;
                    if (e[3] && e[4] !== t) e[2] = e[4];
                    else if (r && ge.test(r) && (n = d(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length)) {
                        e[0] = e[0].slice(0, n);
                        e[2] = r.slice(0, n)
                    }
                    return e.slice(0, 3)
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(ke, Ce).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ie + ")" + e + "(" + ie + "|$)")) && B(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== J && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, r) {
                    return function(i) {
                        var o = n.attr(i, e);
                        if (null == o) return "!=" === t;
                        if (!t) return !0;
                        o += "";
                        return "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, d, h, p, g = o !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            y = s && t.nodeName.toLowerCase(),
                            v = !u && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    f = t;
                                    for (; f = f[g];)
                                        if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                    p = g = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            p = [a ? m.firstChild : m.lastChild];
                            if (a && v) {
                                c = m[F] || (m[F] = {});
                                l = c[e] || [];
                                h = l[0] === _ && l[1];
                                d = l[0] === _ && l[2];
                                f = h && m.childNodes[h];
                                for (; f = ++h && f && f[g] || (d = h = 0) || p.pop();)
                                    if (1 === f.nodeType && ++d && f === t) {
                                        c[e] = [_, h, d];
                                        break
                                    }
                            } else if (v && (l = (t[F] || (t[F] = {}))[e]) && l[0] === _) d = l[1];
                            else
                                for (; f = ++h && f && f[g] || (d = h = 0) || p.pop();)
                                    if ((s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) && ++d) {
                                        v && ((f[F] || (f[F] = {}))[e] = [_, d]);
                                        if (f === t) break
                                    }
                            d -= i;
                            return d === r || d % r === 0 && d / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var r, o = S.pseudos[e] || S.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                    if (o[F]) return o(t);
                    if (o.length > 1) {
                        r = [e, e, "", t];
                        return S.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
                            for (var r, i = o(e, t), a = i.length; a--;) {
                                r = ne.call(e, i[a]);
                                e[r] = !(n[r] = i[a])
                            }
                        }) : function(e) {
                            return o(e, 0, r)
                        }
                    }
                    return o
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                        n = [],
                        r = j(e.replace(ce, "$1"));
                    return r[F] ? i(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        t[0] = e;
                        r(t, null, o, n);
                        return !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(t) {
                        return n(e, t).length > 0
                    }
                }),
                contains: i(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || N(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    me.test(e || "") || n.error("unsupported lang: " + e);
                    e = e.replace(ke, Ce).toLowerCase();
                    return function(t) {
                        var n;
                        do
                            if (n = $ ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                                n = n.toLowerCase();
                                return n === e || 0 === n.indexOf(e + "-")
                            }
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === I
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    e.parentNode && e.parentNode.selectedIndex;
                    return e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0
                },
                parent: function(e) {
                    return !S.pseudos.empty(e)
                },
                header: function(e) {
                    return xe.test(e.nodeName)
                },
                input: function(e) {
                    return be.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        };
        S.pseudos.nth = S.pseudos.eq;
        for (T in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) S.pseudos[T] = u(T);
        for (T in {
                submit: !0,
                reset: !0
            }) S.pseudos[T] = l(T);
        f.prototype = S.filters = S.pseudos;
        S.setFilters = new f;
        j = n.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = U[e + " "];
            if (!o) {
                t || (t = d(e));
                n = t.length;
                for (; n--;) {
                    o = v(t[n]);
                    o[F] ? r.push(o) : i.push(o)
                }
                o = U(e, w(i, r))
            }
            return o
        };
        k.sortStable = F.split("").sort(G).join("") === F;
        k.detectDuplicates = X;
        R();
        k.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(O.createElement("div"))
        });
        o(function(e) {
            e.innerHTML = "<a href='#'></a>";
            return "#" === e.firstChild.getAttribute("href")
        }) || a("type|href|height|width", function(e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        });
        k.attributes && o(function(e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return "" === e.firstChild.getAttribute("value")
        }) || a("value", function(e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        });
        o(function(e) {
            return null == e.getAttribute("disabled")
        }) || a(re, function(e, t, n) {
            var r;
            return n ? void 0 : (r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
        });
        oe.find = n;
        oe.expr = n.selectors;
        oe.expr[":"] = oe.expr.pseudos;
        oe.unique = n.uniqueSort;
        oe.text = n.getText;
        oe.isXMLDoc = n.isXML;
        oe.contains = n.contains
    }(e);
    var pe = {};
    oe.Callbacks = function(e) {
        e = "string" == typeof e ? pe[e] || r(e) : oe.extend({}, e);
        var n, i, o, a, s, u, l = [],
            c = !e.once && [],
            f = function(t) {
                n = e.memory && t;
                i = !0;
                u = a || 0;
                a = 0;
                s = l.length;
                o = !0;
                for (; l && s > u; u++)
                    if (l[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                o = !1;
                l && (c ? c.length && f(c.shift()) : n ? l = [] : d.disable())
            },
            d = {
                add: function() {
                    if (l) {
                        var t = l.length;
                        ! function r(t) {
                            oe.each(t, function(t, n) {
                                var i = oe.type(n);
                                "function" === i ? e.unique && d.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                            })
                        }(arguments);
                        if (o) s = l.length;
                        else if (n) {
                            a = t;
                            f(n)
                        }
                    }
                    return this
                },
                remove: function() {
                    l && oe.each(arguments, function(e, t) {
                        for (var n;
                            (n = oe.inArray(t, l, n)) > -1;) {
                            l.splice(n, 1);
                            if (o) {
                                s >= n && s--;
                                u >= n && u--
                            }
                        }
                    });
                    return this
                },
                has: function(e) {
                    return e ? oe.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    l = [];
                    s = 0;
                    return this
                },
                disable: function() {
                    l = c = n = t;
                    return this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    c = t;
                    n || d.disable();
                    return this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(e, t) {
                    if (l && (!i || c)) {
                        t = t || [];
                        t = [e, t.slice ? t.slice() : t];
                        o ? c.push(t) : f(t)
                    }
                    return this
                },
                fire: function() {
                    d.fireWith(this, arguments);
                    return this
                },
                fired: function() {
                    return !!i
                }
            };
        return d
    };
    oe.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", oe.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", oe.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", oe.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        i.done(arguments).fail(arguments);
                        return this
                    },
                    then: function() {
                        var e = arguments;
                        return oe.Deferred(function(n) {
                            oe.each(t, function(t, o) {
                                var a = o[0],
                                    s = oe.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    e && oe.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                                })
                            });
                            e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? oe.extend(e, r) : r
                    }
                },
                i = {};
            r.pipe = r.then;
            oe.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add;
                s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock);
                i[o[0]] = function() {
                    i[o[0] + "With"](this === i ? r : this, arguments);
                    return this
                };
                i[o[0] + "With"] = a.fireWith
            });
            r.promise(i);
            e && e.call(i, i);
            return i
        },
        when: function(e) {
            var t, n, r, i = 0,
                o = ee.call(arguments),
                a = o.length,
                s = 1 !== a || e && oe.isFunction(e.promise) ? a : 0,
                u = 1 === s ? e : oe.Deferred(),
                l = function(e, n, r) {
                    return function(i) {
                        n[e] = this;
                        r[e] = arguments.length > 1 ? ee.call(arguments) : i;
                        r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
            if (a > 1) {
                t = new Array(a);
                n = new Array(a);
                r = new Array(a);
                for (; a > i; i++) o[i] && oe.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s
            }
            s || u.resolveWith(r, o);
            return u.promise()
        }
    });
    oe.support = function(t) {
        var n = U.createElement("input"),
            r = U.createDocumentFragment(),
            i = U.createElement("div"),
            o = U.createElement("select"),
            a = o.appendChild(U.createElement("option"));
        if (!n.type) return t;
        n.type = "checkbox";
        t.checkOn = "" !== n.value;
        t.optSelected = a.selected;
        t.reliableMarginRight = !0;
        t.boxSizingReliable = !0;
        t.pixelPosition = !1;
        n.checked = !0;
        t.noCloneChecked = n.cloneNode(!0).checked;
        o.disabled = !0;
        t.optDisabled = !a.disabled;
        n = U.createElement("input");
        n.value = "t";
        n.type = "radio";
        t.radioValue = "t" === n.value;
        n.setAttribute("checked", "t");
        n.setAttribute("name", "t");
        r.appendChild(n);
        t.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked;
        t.focusinBubbles = "onfocusin" in e;
        i.style.backgroundClip = "content-box";
        i.cloneNode(!0).style.backgroundClip = "";
        t.clearCloneStyle = "content-box" === i.style.backgroundClip;
        oe(function() {
            var n, r, o = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",
                a = U.getElementsByTagName("body")[0];
            if (a) {
                n = U.createElement("div");
                n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
                a.appendChild(n).appendChild(i);
                i.innerHTML = "";
                i.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%";
                oe.swap(a, null != a.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    t.boxSizing = 4 === i.offsetWidth
                });
                if (e.getComputedStyle) {
                    t.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top;
                    t.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                        width: "4px"
                    }).width;
                    r = i.appendChild(U.createElement("div"));
                    r.style.cssText = i.style.cssText = o;
                    r.style.marginRight = r.style.width = "0";
                    i.style.width = "1px";
                    t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)
                }
                a.removeChild(n)
            }
        });
        return t
    }({});
    var ge, me, ye = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        ve = /([A-Z])/g;
    i.uid = 1;
    i.accepts = function(e) {
        return e.nodeType ? 1 === e.nodeType || 9 === e.nodeType : !0
    };
    i.prototype = {
        key: function(e) {
            if (!i.accepts(e)) return 0;
            var t = {},
                n = e[this.expando];
            if (!n) {
                n = i.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    };
                    Object.defineProperties(e, t)
                } catch (r) {
                    t[this.expando] = n;
                    oe.extend(e, t)
                }
            }
            this.cache[n] || (this.cache[n] = {});
            return n
        },
        set: function(e, t, n) {
            var r, i = this.key(e),
                o = this.cache[i];
            if ("string" == typeof t) o[t] = n;
            else if (oe.isEmptyObject(o)) oe.extend(this.cache[i], t);
            else
                for (r in t) o[r] = t[r];
            return o
        },
        get: function(e, n) {
            var r = this.cache[this.key(e)];
            return n === t ? r : r[n]
        },
        access: function(e, n, r) {
            var i;
            if (n === t || n && "string" == typeof n && r === t) {
                i = this.get(e, n);
                return i !== t ? i : this.get(e, oe.camelCase(n))
            }
            this.set(e, n, r);
            return r !== t ? r : n
        },
        remove: function(e, n) {
            var r, i, o, a = this.key(e),
                s = this.cache[a];
            if (n === t) this.cache[a] = {};
            else {
                if (oe.isArray(n)) i = n.concat(n.map(oe.camelCase));
                else {
                    o = oe.camelCase(n);
                    if (n in s) i = [n, o];
                    else {
                        i = o;
                        i = i in s ? [i] : i.match(se) || []
                    }
                }
                r = i.length;
                for (; r--;) delete s[i[r]]
            }
        },
        hasData: function(e) {
            return !oe.isEmptyObject(this.cache[e[this.expando]] || {})
        },
        discard: function(e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    ge = new i;
    me = new i;
    oe.extend({
        acceptData: i.accepts,
        hasData: function(e) {
            return ge.hasData(e) || me.hasData(e)
        },
        data: function(e, t, n) {
            return ge.access(e, t, n)
        },
        removeData: function(e, t) {
            ge.remove(e, t)
        },
        _data: function(e, t, n) {
            return me.access(e, t, n)
        },
        _removeData: function(e, t) {
            me.remove(e, t)
        }
    });
    oe.fn.extend({
        data: function(e, n) {
            var r, i, a = this[0],
                s = 0,
                u = null;
            if (e === t) {
                if (this.length) {
                    u = ge.get(a);
                    if (1 === a.nodeType && !me.get(a, "hasDataAttrs")) {
                        r = a.attributes;
                        for (; s < r.length; s++) {
                            i = r[s].name;
                            if (0 === i.indexOf("data-")) {
                                i = oe.camelCase(i.slice(5));
                                o(a, i, u[i])
                            }
                        }
                        me.set(a, "hasDataAttrs", !0)
                    }
                }
                return u
            }
            return "object" == typeof e ? this.each(function() {
                ge.set(this, e)
            }) : oe.access(this, function(n) {
                var r, i = oe.camelCase(e);
                if (a && n === t) {
                    r = ge.get(a, e);
                    if (r !== t) return r;
                    r = ge.get(a, i);
                    if (r !== t) return r;
                    r = o(a, i, t);
                    if (r !== t) return r
                } else this.each(function() {
                    var r = ge.get(this, i);
                    ge.set(this, i, n); - 1 !== e.indexOf("-") && r !== t && ge.set(this, e, n)
                })
            }, null, n, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                ge.remove(this, e)
            })
        }
    });
    oe.extend({
        queue: function(e, t, n) {
            var r;
            if (e) {
                t = (t || "fx") + "queue";
                r = me.get(e, t);
                n && (!r || oe.isArray(n) ? r = me.access(e, t, oe.makeArray(n)) : r.push(n));
                return r || []
            }
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = oe.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = oe._queueHooks(e, t),
                a = function() {
                    oe.dequeue(e, t)
                };
            if ("inprogress" === i) {
                i = n.shift();
                r--
            }
            if (i) {
                "fx" === t && n.unshift("inprogress");
                delete o.stop;
                i.call(e, a, o)
            }!r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return me.get(e, n) || me.access(e, n, {
                empty: oe.Callbacks("once memory").add(function() {
                    me.remove(e, [t + "queue", n])
                })
            })
        }
    });
    oe.fn.extend({
        queue: function(e, n) {
            var r = 2;
            if ("string" != typeof e) {
                n = e;
                e = "fx";
                r--
            }
            return arguments.length < r ? oe.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = oe.queue(this, e, n);
                oe._queueHooks(this, e);
                "fx" === e && "inprogress" !== t[0] && oe.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                oe.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            e = oe.fx ? oe.fx.speeds[e] || e : e;
            t = t || "fx";
            return this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
                o = oe.Deferred(),
                a = this,
                s = this.length,
                u = function() {
                    --i || o.resolveWith(a, [a])
                };
            if ("string" != typeof e) {
                n = e;
                e = t
            }
            e = e || "fx";
            for (; s--;) {
                r = me.get(a[s], e + "queueHooks");
                if (r && r.empty) {
                    i++;
                    r.empty.add(u)
                }
            }
            u();
            return o.promise(n)
        }
    });
    var we, be, xe = /[\t\r\n\f]/g,
        Te = /\r/g,
        ke = /^(?:input|select|textarea|button)$/i;
    oe.fn.extend({
        attr: function(e, t) {
            return oe.access(this, oe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                oe.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return oe.access(this, oe.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[oe.propFix[e] || e]
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                u = "string" == typeof e && e;
            if (oe.isFunction(e)) return this.each(function(t) {
                oe(this).addClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(se) || [];
                for (; s > a; a++) {
                    n = this[a];
                    r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xe, " ") : " ");
                    if (r) {
                        o = 0;
                        for (; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        n.className = oe.trim(r)
                    }
                }
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (oe.isFunction(e)) return this.each(function(t) {
                oe(this).removeClass(e.call(this, t, this.className))
            });
            if (u) {
                t = (e || "").match(se) || [];
                for (; s > a; a++) {
                    n = this[a];
                    r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(xe, " ") : "");
                    if (r) {
                        o = 0;
                        for (; i = t[o++];)
                            for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                        n.className = e ? oe.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : oe.isFunction(e) ? this.each(function(n) {
                oe(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n)
                    for (var t, r = 0, i = oe(this), o = e.match(se) || []; t = o[r++];) i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else if (n === B || "boolean" === n) {
                    this.className && me.set(this, "__className__", this.className);
                    this.className = this.className || e === !1 ? "" : me.get(this, "__className__") || ""
                }
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++)
                if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(xe, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, r, i, o = this[0];
            if (arguments.length) {
                i = oe.isFunction(e);
                return this.each(function(r) {
                    var o;
                    if (1 === this.nodeType) {
                        o = i ? e.call(this, r, oe(this).val()) : e;
                        null == o ? o = "" : "number" == typeof o ? o += "" : oe.isArray(o) && (o = oe.map(o, function(e) {
                            return null == e ? "" : e + ""
                        }));
                        n = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()];
                        n && "set" in n && n.set(this, o, "value") !== t || (this.value = o)
                    }
                })
            }
            if (o) {
                n = oe.valHooks[o.type] || oe.valHooks[o.nodeName.toLowerCase()];
                if (n && "get" in n && (r = n.get(o, "value")) !== t) return r;
                r = o.value;
                return "string" == typeof r ? r.replace(Te, "") : null == r ? "" : r
            }
        }
    });
    oe.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) {
                        n = r[u];
                        if ((n.selected || u === i) && (oe.support.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !oe.nodeName(n.parentNode, "optgroup"))) {
                            t = oe(n).val();
                            if (o) return t;
                            a.push(t)
                        }
                    }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = oe.makeArray(t), a = i.length; a--;) {
                        r = i[a];
                        (r.selected = oe.inArray(oe(r).val(), o) >= 0) && (n = !0)
                    }
                    n || (e.selectedIndex = -1);
                    return o
                }
            }
        },
        attr: function(e, n, r) {
            var i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) {
                if (typeof e.getAttribute === B) return oe.prop(e, n, r);
                if (1 !== a || !oe.isXMLDoc(e)) {
                    n = n.toLowerCase();
                    i = oe.attrHooks[n] || (oe.expr.match.bool.test(n) ? be : we)
                }
                if (r === t) {
                    if (i && "get" in i && null !== (o = i.get(e, n))) return o;
                    o = oe.find.attr(e, n);
                    return null == o ? t : o
                }
                if (null !== r) {
                    if (i && "set" in i && (o = i.set(e, r, n)) !== t) return o;
                    e.setAttribute(n, r + "");
                    return r
                }
                oe.removeAttr(e, n)
            }
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(se);
            if (o && 1 === e.nodeType)
                for (; n = o[i++];) {
                    r = oe.propFix[n] || n;
                    oe.expr.match.bool.test(n) && (e[r] = !1);
                    e.removeAttribute(n)
                }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!oe.support.radioValue && "radio" === t && oe.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t);
                        n && (e.value = n);
                        return t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, n, r) {
            var i, o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) {
                a = 1 !== s || !oe.isXMLDoc(e);
                if (a) {
                    n = oe.propFix[n] || n;
                    o = oe.propHooks[n]
                }
                return r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    return e.hasAttribute("tabindex") || ke.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    });
    be = {
        set: function(e, t, n) {
            t === !1 ? oe.removeAttr(e, n) : e.setAttribute(n, n);
            return n
        }
    };
    oe.each(oe.expr.match.bool.source.match(/\w+/g), function(e, n) {
        var r = oe.expr.attrHandle[n] || oe.find.attr;
        oe.expr.attrHandle[n] = function(e, n, i) {
            var o = oe.expr.attrHandle[n],
                a = i ? t : (oe.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            oe.expr.attrHandle[n] = o;
            return a
        }
    });
    oe.support.optSelected || (oe.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            t && t.parentNode && t.parentNode.selectedIndex;
            return null
        }
    });
    oe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        oe.propFix[this.toLowerCase()] = this
    });
    oe.each(["radio", "checkbox"], function() {
        oe.valHooks[this] = {
            set: function(e, t) {
                return oe.isArray(t) ? e.checked = oe.inArray(oe(e).val(), t) >= 0 : void 0
            }
        };
        oe.support.checkOn || (oe.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Ce = /^key/,
        Se = /^(?:mouse|contextmenu)|click/,
        Ne = /^(?:focusinfocus|focusoutblur)$/,
        De = /^([^.]*)(?:\.(.+)|)$/;
    oe.event = {
        global: {},
        add: function(e, n, r, i, o) {
            var a, s, u, l, c, f, d, h, p, g, m, y = me.get(e);
            if (y) {
                if (r.handler) {
                    a = r;
                    r = a.handler;
                    o = a.selector
                }
                r.guid || (r.guid = oe.guid++);
                (l = y.events) || (l = y.events = {});
                if (!(s = y.handle)) {
                    s = y.handle = function(e) {
                        return typeof oe === B || e && oe.event.triggered === e.type ? t : oe.event.dispatch.apply(s.elem, arguments)
                    };
                    s.elem = e
                }
                n = (n || "").match(se) || [""];
                c = n.length;
                for (; c--;) {
                    u = De.exec(n[c]) || [];
                    p = m = u[1];
                    g = (u[2] || "").split(".").sort();
                    if (p) {
                        d = oe.event.special[p] || {};
                        p = (o ? d.delegateType : d.bindType) || p;
                        d = oe.event.special[p] || {};
                        f = oe.extend({
                            type: p,
                            origType: m,
                            data: i,
                            handler: r,
                            guid: r.guid,
                            selector: o,
                            needsContext: o && oe.expr.match.needsContext.test(o),
                            namespace: g.join(".")
                        }, a);
                        if (!(h = l[p])) {
                            h = l[p] = [];
                            h.delegateCount = 0;
                            d.setup && d.setup.call(e, i, g, s) !== !1 || e.addEventListener && e.addEventListener(p, s, !1)
                        }
                        if (d.add) {
                            d.add.call(e, f);
                            f.handler.guid || (f.handler.guid = r.guid)
                        }
                        o ? h.splice(h.delegateCount++, 0, f) : h.push(f);
                        oe.event.global[p] = !0
                    }
                }
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, d, h, p, g, m = me.hasData(e) && me.get(e);
            if (m && (u = m.events)) {
                t = (t || "").match(se) || [""];
                l = t.length;
                for (; l--;) {
                    s = De.exec(t[l]) || [];
                    h = g = s[1];
                    p = (s[2] || "").split(".").sort();
                    if (h) {
                        f = oe.event.special[h] || {};
                        h = (r ? f.delegateType : f.bindType) || h;
                        d = u[h] || [];
                        s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        a = o = d.length;
                        for (; o--;) {
                            c = d[o];
                            if ((i || g === c.origType) && (!n || n.guid === c.guid) && (!s || s.test(c.namespace)) && (!r || r === c.selector || "**" === r && c.selector)) {
                                d.splice(o, 1);
                                c.selector && d.delegateCount--;
                                f.remove && f.remove.call(e, c)
                            }
                        }
                        if (a && !d.length) {
                            f.teardown && f.teardown.call(e, p, m.handle) !== !1 || oe.removeEvent(e, h, m.handle);
                            delete u[h]
                        }
                    } else
                        for (h in u) oe.event.remove(e, h + t[l], n, r, !0)
                }
                if (oe.isEmptyObject(u)) {
                    delete m.handle;
                    me.remove(e, "events")
                }
            }
        },
        trigger: function(n, r, i, o) {
            var a, s, u, l, c, f, d, h = [i || U],
                p = re.call(n, "type") ? n.type : n,
                g = re.call(n, "namespace") ? n.namespace.split(".") : [];
            s = u = i = i || U;
            if (3 !== i.nodeType && 8 !== i.nodeType && !Ne.test(p + oe.event.triggered)) {
                if (p.indexOf(".") >= 0) {
                    g = p.split(".");
                    p = g.shift();
                    g.sort()
                }
                c = p.indexOf(":") < 0 && "on" + p;
                n = n[oe.expando] ? n : new oe.Event(p, "object" == typeof n && n);
                n.isTrigger = o ? 2 : 3;
                n.namespace = g.join(".");
                n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                n.result = t;
                n.target || (n.target = i);
                r = null == r ? [n] : oe.makeArray(r, [n]);
                d = oe.event.special[p] || {};
                if (o || !d.trigger || d.trigger.apply(i, r) !== !1) {
                    if (!o && !d.noBubble && !oe.isWindow(i)) {
                        l = d.delegateType || p;
                        Ne.test(l + p) || (s = s.parentNode);
                        for (; s; s = s.parentNode) {
                            h.push(s);
                            u = s
                        }
                        u === (i.ownerDocument || U) && h.push(u.defaultView || u.parentWindow || e)
                    }
                    a = 0;
                    for (;
                        (s = h[a++]) && !n.isPropagationStopped();) {
                        n.type = a > 1 ? l : d.bindType || p;
                        f = (me.get(s, "events") || {})[n.type] && me.get(s, "handle");
                        f && f.apply(s, r);
                        f = c && s[c];
                        f && oe.acceptData(s) && f.apply && f.apply(s, r) === !1 && n.preventDefault()
                    }
                    n.type = p;
                    if (!o && !n.isDefaultPrevented() && (!d._default || d._default.apply(h.pop(), r) === !1) && oe.acceptData(i) && c && oe.isFunction(i[p]) && !oe.isWindow(i)) {
                        u = i[c];
                        u && (i[c] = null);
                        oe.event.triggered = p;
                        i[p]();
                        oe.event.triggered = t;
                        u && (i[c] = u)
                    }
                    return n.result
                }
            }
        },
        dispatch: function(e) {
            e = oe.event.fix(e);
            var n, r, i, o, a, s = [],
                u = ee.call(arguments),
                l = (me.get(this, "events") || {})[e.type] || [],
                c = oe.event.special[e.type] || {};
            u[0] = e;
            e.delegateTarget = this;
            if (!c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                s = oe.event.handlers.call(this, e, l);
                n = 0;
                for (;
                    (o = s[n++]) && !e.isPropagationStopped();) {
                    e.currentTarget = o.elem;
                    r = 0;
                    for (;
                        (a = o.handlers[r++]) && !e.isImmediatePropagationStopped();)
                        if (!e.namespace_re || e.namespace_re.test(a.namespace)) {
                            e.handleObj = a;
                            e.data = a.data;
                            i = ((oe.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u);
                            if (i !== t && (e.result = i) === !1) {
                                e.preventDefault();
                                e.stopPropagation()
                            }
                        }
                }
                c.postDispatch && c.postDispatch.call(this, e);
                return e.result
            }
        },
        handlers: function(e, n) {
            var r, i, o, a, s = [],
                u = n.delegateCount,
                l = e.target;
            if (u && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (l.disabled !== !0 || "click" !== e.type) {
                        i = [];
                        for (r = 0; u > r; r++) {
                            a = n[r];
                            o = a.selector + " ";
                            i[o] === t && (i[o] = a.needsContext ? oe(o, this).index(l) >= 0 : oe.find(o, this, null, [l]).length);
                            i[o] && i.push(a)
                        }
                        i.length && s.push({
                            elem: l,
                            handlers: i
                        })
                    }
            u < n.length && s.push({
                elem: this,
                handlers: n.slice(u)
            });
            return s
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode);
                return e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, i, o, a = n.button;
                if (null == e.pageX && null != n.clientX) {
                    r = e.target.ownerDocument || U;
                    i = r.documentElement;
                    o = r.body;
                    e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0);
                    e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)
                }
                e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0);
                return e
            }
        },
        fix: function(e) {
            if (e[oe.expando]) return e;
            var t, n, r, i = e.type,
                o = e,
                a = this.fixHooks[i];
            a || (this.fixHooks[i] = a = Se.test(i) ? this.mouseHooks : Ce.test(i) ? this.keyHooks : {});
            r = a.props ? this.props.concat(a.props) : this.props;
            e = new oe.Event(o);
            t = r.length;
            for (; t--;) {
                n = r[t];
                e[n] = o[n]
            }
            e.target || (e.target = U);
            3 === e.target.nodeType && (e.target = e.target.parentNode);
            return a.filter ? a.filter(e, o) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== u() && this.focus) {
                        this.focus();
                        return !1
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === u() && this.blur) {
                        this.blur();
                        return !1
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && oe.nodeName(this, "input")) {
                        this.click();
                        return !1
                    }
                },
                _default: function(e) {
                    return oe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = oe.extend(new oe.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? oe.event.trigger(i, null, t) : oe.event.dispatch.call(t, i);
            i.isDefaultPrevented() && n.preventDefault()
        }
    };
    oe.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    };
    oe.Event = function(e, t) {
        if (!(this instanceof oe.Event)) return new oe.Event(e, t);
        if (e && e.type) {
            this.originalEvent = e;
            this.type = e.type;
            this.isDefaultPrevented = e.defaultPrevented || e.getPreventDefault && e.getPreventDefault() ? a : s
        } else this.type = e;
        t && oe.extend(this, t);
        this.timeStamp = e && e.timeStamp || oe.now();
        this[oe.expando] = !0
    };
    oe.Event.prototype = {
        isDefaultPrevented: s,
        isPropagationStopped: s,
        isImmediatePropagationStopped: s,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = a;
            e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = a;
            e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = a;
            this.stopPropagation()
        }
    };
    oe.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        oe.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                if (!i || i !== r && !oe.contains(r, i)) {
                    e.type = o.origType;
                    n = o.handler.apply(this, arguments);
                    e.type = t
                }
                return n
            }
        }
    });
    oe.support.focusinBubbles || oe.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                oe.event.simulate(t, e.target, oe.event.fix(e), !0)
            };
        oe.event.special[t] = {
            setup: function() {
                0 === n++ && U.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && U.removeEventListener(e, r, !0)
            }
        }
    });
    oe.fn.extend({
        on: function(e, n, r, i, o) {
            var a, u;
            if ("object" == typeof e) {
                if ("string" != typeof n) {
                    r = r || n;
                    n = t
                }
                for (u in e) this.on(u, n, r, e[u], o);
                return this
            }
            if (null == r && null == i) {
                i = n;
                r = n = t
            } else if (null == i)
                if ("string" == typeof n) {
                    i = r;
                    r = t
                } else {
                    i = r;
                    r = n;
                    n = t
                }
            if (i === !1) i = s;
            else if (!i) return this;
            if (1 === o) {
                a = i;
                i = function(e) {
                    oe().off(e);
                    return a.apply(this, arguments)
                };
                i.guid = a.guid || (a.guid = oe.guid++)
            }
            return this.each(function() {
                oe.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) {
                i = e.handleObj;
                oe(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler);
                return this
            }
            if ("object" == typeof e) {
                for (o in e) this.off(o, n, e[o]);
                return this
            }
            if (n === !1 || "function" == typeof n) {
                r = n;
                n = t
            }
            r === !1 && (r = s);
            return this.each(function() {
                oe.event.remove(this, e, r, n)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                oe.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? oe.event.trigger(e, t, n, !0) : void 0
        }
    });
    var je = /^.[^:#\[\.,]*$/,
        Ae = /^(?:parents|prev(?:Until|All))/,
        Ee = oe.expr.match.needsContext,
        Re = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    oe.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(oe(e).filter(function() {
                for (t = 0; i > t; t++)
                    if (oe.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) oe.find(e, r[t], n);
            n = this.pushStack(i > 1 ? oe.unique(n) : n);
            n.selector = this.selector ? this.selector + " " + e : e;
            return n
        },
        has: function(e) {
            var t = oe(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++)
                    if (oe.contains(this, t[e])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(c(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(c(this, e || [], !1))
        },
        is: function(e) {
            return !!c(this, "string" == typeof e && Ee.test(e) ? oe(e) : e || [], !1).length
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], a = Ee.test(e) || "string" != typeof e ? oe(e, t || this.context) : 0; i > r; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && oe.find.matchesSelector(n, e))) {
                        n = o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? oe.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? te.call(oe(e), this[0]) : te.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? oe(e, t) : oe.makeArray(e && e.nodeType ? [e] : e),
                r = oe.merge(this.get(), n);
            return this.pushStack(oe.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    });
    oe.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return oe.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return oe.dir(e, "parentNode", n)
        },
        next: function(e) {
            return l(e, "nextSibling")
        },
        prev: function(e) {
            return l(e, "previousSibling")
        },
        nextAll: function(e) {
            return oe.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return oe.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return oe.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return oe.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return oe.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return oe.sibling(e.firstChild)
        },
        contents: function(e) {
            return e.contentDocument || oe.merge([], e.childNodes)
        }
    }, function(e, t) {
        oe.fn[e] = function(n, r) {
            var i = oe.map(this, t, n);
            "Until" !== e.slice(-5) && (r = n);
            r && "string" == typeof r && (i = oe.filter(r, i));
            if (this.length > 1) {
                Re[e] || oe.unique(i);
                Ae.test(e) && i.reverse()
            }
            return this.pushStack(i)
        }
    });
    oe.extend({
        filter: function(e, t, n) {
            var r = t[0];
            n && (e = ":not(" + e + ")");
            return 1 === t.length && 1 === r.nodeType ? oe.find.matchesSelector(r, e) ? [r] : [] : oe.find.matches(e, oe.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, n, r) {
            for (var i = [], o = r !== t;
                (e = e[n]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (o && oe(e).is(r)) break;
                    i.push(e)
                }
            return i
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Ie = /<([\w:]+)/,
        $e = /<|&#?\w+;/,
        qe = /<(?:script|style|link)/i,
        He = /^(?:checkbox|radio)$/i,
        Me = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Le = /^$|\/(?:java|ecma)script/i,
        Fe = /^true\/(.*)/,
        Pe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        _e = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    _e.optgroup = _e.option;
    _e.tbody = _e.tfoot = _e.colgroup = _e.caption = _e.thead;
    _e.th = _e.td;
    oe.fn.extend({
        text: function(e) {
            return oe.access(this, function(e) {
                return e === t ? oe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || U).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = f(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? oe.filter(e, this) : this, i = 0; null != (n = r[i]); i++) {
                t || 1 !== n.nodeType || oe.cleanData(m(n));
                if (n.parentNode) {
                    t && oe.contains(n.ownerDocument, n) && p(m(n, "script"));
                    n.parentNode.removeChild(n)
                }
            }
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                if (1 === e.nodeType) {
                    oe.cleanData(m(e, !1));
                    e.textContent = ""
                }
            return this
        },
        clone: function(e, t) {
            e = null == e ? !1 : e;
            t = null == t ? e : t;
            return this.map(function() {
                return oe.clone(this, e, t)
            })
        },
        html: function(e) {
            return oe.access(this, function(e) {
                var n = this[0] || {},
                    r = 0,
                    i = this.length;
                if (e === t && 1 === n.nodeType) return n.innerHTML;
                if ("string" == typeof e && !qe.test(e) && !_e[(Ie.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(Oe, "<$1></$2>");
                    try {
                        for (; i > r; r++) {
                            n = this[r] || {};
                            if (1 === n.nodeType) {
                                oe.cleanData(m(n, !1));
                                n.innerHTML = e
                            }
                        }
                        n = 0
                    } catch (o) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = oe.map(this, function(e) {
                    return [e.nextSibling, e.parentNode]
                }),
                t = 0;
            this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                if (i) {
                    r && r.parentNode !== i && (r = this.nextSibling);
                    oe(this).remove();
                    i.insertBefore(n, r)
                }
            }, !0);
            return t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = K.apply([], e);
            var r, i, o, a, s, u, l = 0,
                c = this.length,
                f = this,
                p = c - 1,
                g = e[0],
                y = oe.isFunction(g);
            if (y || !(1 >= c || "string" != typeof g || oe.support.checkClone) && Me.test(g)) return this.each(function(r) {
                var i = f.eq(r);
                y && (e[0] = g.call(this, r, i.html()));
                i.domManip(e, t, n)
            });
            if (c) {
                r = oe.buildFragment(e, this[0].ownerDocument, !1, !n && this);
                i = r.firstChild;
                1 === r.childNodes.length && (r = i);
                if (i) {
                    o = oe.map(m(r, "script"), d);
                    a = o.length;
                    for (; c > l; l++) {
                        s = r;
                        if (l !== p) {
                            s = oe.clone(s, !0, !0);
                            a && oe.merge(o, m(s, "script"))
                        }
                        t.call(this[l], s, l)
                    }
                    if (a) {
                        u = o[o.length - 1].ownerDocument;
                        oe.map(o, h);
                        for (l = 0; a > l; l++) {
                            s = o[l];
                            Le.test(s.type || "") && !me.access(s, "globalEval") && oe.contains(u, s) && (s.src ? oe._evalUrl(s.src) : oe.globalEval(s.textContent.replace(Pe, "")))
                        }
                    }
                }
            }
            return this
        }
    });
    oe.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        oe.fn[e] = function(e) {
            for (var n, r = [], i = oe(e), o = i.length - 1, a = 0; o >= a; a++) {
                n = a === o ? this : this.clone(!0);
                oe(i[a])[t](n);
                Z.apply(r, n.get())
            }
            return this.pushStack(r)
        }
    });
    oe.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s = e.cloneNode(!0),
                u = oe.contains(e.ownerDocument, e);
            if (!(oe.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || oe.isXMLDoc(e))) {
                a = m(s);
                o = m(e);
                for (r = 0, i = o.length; i > r; r++) y(o[r], a[r])
            }
            if (t)
                if (n) {
                    o = o || m(e);
                    a = a || m(s);
                    for (r = 0, i = o.length; i > r; r++) g(o[r], a[r])
                } else g(e, s);
            a = m(s, "script");
            a.length > 0 && p(a, !u && m(e, "script"));
            return s
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, a, s, u, l, c = 0, f = e.length, d = t.createDocumentFragment(), h = []; f > c; c++) {
                i = e[c];
                if (i || 0 === i)
                    if ("object" === oe.type(i)) oe.merge(h, i.nodeType ? [i] : i);
                    else if ($e.test(i)) {
                    o = o || d.appendChild(t.createElement("div"));
                    a = (Ie.exec(i) || ["", ""])[1].toLowerCase();
                    s = _e[a] || _e._default;
                    o.innerHTML = s[1] + i.replace(Oe, "<$1></$2>") + s[2];
                    l = s[0];
                    for (; l--;) o = o.lastChild;
                    oe.merge(h, o.childNodes);
                    o = d.firstChild;
                    o.textContent = ""
                } else h.push(t.createTextNode(i))
            }
            d.textContent = "";
            c = 0;
            for (; i = h[c++];)
                if (!r || -1 === oe.inArray(i, r)) {
                    u = oe.contains(i.ownerDocument, i);
                    o = m(d.appendChild(i), "script");
                    u && p(o);
                    if (n) {
                        l = 0;
                        for (; i = o[l++];) Le.test(i.type || "") && n.push(i)
                    }
                }
            return d
        },
        cleanData: function(e) {
            for (var n, r, o, a, s, u, l = oe.event.special, c = 0;
                (r = e[c]) !== t; c++) {
                if (i.accepts(r)) {
                    s = r[me.expando];
                    if (s && (n = me.cache[s])) {
                        o = Object.keys(n.events || {});
                        if (o.length)
                            for (u = 0;
                                (a = o[u]) !== t; u++) l[a] ? oe.event.remove(r, a) : oe.removeEvent(r, a, n.handle);
                        me.cache[s] && delete me.cache[s]
                    }
                }
                delete ge.cache[r[ge.expando]]
            }
        },
        _evalUrl: function(e) {
            return oe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    });
    oe.fn.extend({
        wrapAll: function(e) {
            var t;
            if (oe.isFunction(e)) return this.each(function(t) {
                oe(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                t = oe(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]);
                t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return oe.isFunction(e) ? this.each(function(t) {
                oe(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = oe(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = oe.isFunction(e);
            return this.each(function(n) {
                oe(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var We, Be, ze = /^(none|table(?!-c[ea]).+)/,
        Ue = /^margin/,
        Xe = new RegExp("^(" + ae + ")(.*)$", "i"),
        Ge = new RegExp("^(" + ae + ")(?!px)[a-z%]+$", "i"),
        Je = new RegExp("^([+-])=(" + ae + ")", "i"),
        Ve = {
            BODY: "block"
        },
        Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Qe = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Ke = ["Top", "Right", "Bottom", "Left"],
        Ze = ["Webkit", "O", "Moz", "ms"];
    oe.fn.extend({
        css: function(e, n) {
            return oe.access(this, function(e, n, r) {
                var i, o, a = {},
                    s = 0;
                if (oe.isArray(n)) {
                    i = b(e);
                    o = n.length;
                    for (; o > s; s++) a[n[s]] = oe.css(e, n[s], !1, i);
                    return a
                }
                return r !== t ? oe.style(e, n, r) : oe.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return x(this, !0)
        },
        hide: function() {
            return x(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                w(this) ? oe(this).show() : oe(this).hide()
            })
        }
    });
    oe.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = We(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, u = oe.camelCase(n),
                    l = e.style;
                n = oe.cssProps[u] || (oe.cssProps[u] = v(l, u));
                s = oe.cssHooks[n] || oe.cssHooks[u];
                if (r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
                a = typeof r;
                if ("string" === a && (o = Je.exec(r))) {
                    r = (o[1] + 1) * o[2] + parseFloat(oe.css(e, n));
                    a = "number"
                }
                if (!(null == r || "number" === a && isNaN(r))) {
                    "number" !== a || oe.cssNumber[u] || (r += "px");
                    oe.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit");
                    s && "set" in s && (r = s.set(e, r, i)) === t || (l[n] = r)
                }
            }
        },
        css: function(e, n, r, i) {
            var o, a, s, u = oe.camelCase(n);
            n = oe.cssProps[u] || (oe.cssProps[u] = v(e.style, u));
            s = oe.cssHooks[n] || oe.cssHooks[u];
            s && "get" in s && (o = s.get(e, !0, r));
            o === t && (o = We(e, n, i));
            "normal" === o && n in Qe && (o = Qe[n]);
            if ("" === r || r) {
                a = parseFloat(o);
                return r === !0 || oe.isNumeric(a) ? a || 0 : o
            }
            return o
        }
    });
    We = function(e, n, r) {
        var i, o, a, s = r || b(e),
            u = s ? s.getPropertyValue(n) || s[n] : t,
            l = e.style;
        if (s) {
            "" !== u || oe.contains(e.ownerDocument, e) || (u = oe.style(e, n));
            if (Ge.test(u) && Ue.test(n)) {
                i = l.width;
                o = l.minWidth;
                a = l.maxWidth;
                l.minWidth = l.maxWidth = l.width = u;
                u = s.width;
                l.width = i;
                l.minWidth = o;
                l.maxWidth = a
            }
        }
        return u
    };
    oe.each(["height", "width"], function(e, t) {
        oe.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && ze.test(oe.css(e, "display")) ? oe.swap(e, Ye, function() {
                    return C(e, t, r)
                }) : C(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && b(e);
                return T(e, n, r ? k(e, t, r, oe.support.boxSizing && "border-box" === oe.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    });
    oe(function() {
        oe.support.reliableMarginRight || (oe.cssHooks.marginRight = {
            get: function(e, t) {
                return t ? oe.swap(e, {
                    display: "inline-block"
                }, We, [e, "marginRight"]) : void 0
            }
        });
        !oe.support.pixelPosition && oe.fn.position && oe.each(["top", "left"], function(e, t) {
            oe.cssHooks[t] = {
                get: function(e, n) {
                    if (n) {
                        n = We(e, t);
                        return Ge.test(n) ? oe(e).position()[t] + "px" : n
                    }
                }
            }
        })
    });
    if (oe.expr && oe.expr.filters) {
        oe.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        };
        oe.expr.filters.visible = function(e) {
            return !oe.expr.filters.hidden(e)
        }
    }
    oe.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        oe.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Ke[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        };
        Ue.test(e) || (oe.cssHooks[e + t].set = T)
    });
    var et = /%20/g,
        tt = /\[\]$/,
        nt = /\r?\n/g,
        rt = /^(?:submit|button|image|reset|file)$/i,
        it = /^(?:input|select|textarea|keygen)/i;
    oe.fn.extend({
        serialize: function() {
            return oe.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = oe.prop(this, "elements");
                return e ? oe.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !oe(this).is(":disabled") && it.test(this.nodeName) && !rt.test(e) && (this.checked || !He.test(e))
            }).map(function(e, t) {
                var n = oe(this).val();
                return null == n ? null : oe.isArray(n) ? oe.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(nt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(nt, "\r\n")
                }
            }).get()
        }
    });
    oe.param = function(e, n) {
        var r, i = [],
            o = function(e, t) {
                t = oe.isFunction(t) ? t() : null == t ? "" : t;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        n === t && (n = oe.ajaxSettings && oe.ajaxSettings.traditional);
        if (oe.isArray(e) || e.jquery && !oe.isPlainObject(e)) oe.each(e, function() {
            o(this.name, this.value)
        });
        else
            for (r in e) D(r, e[r], n, o);
        return i.join("&").replace(et, "+")
    };
    oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        oe.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    });
    oe.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var ot, at, st = oe.now(),
        ut = /\?/,
        lt = /#.*$/,
        ct = /([?&])_=[^&]*/,
        ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        dt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        ht = /^(?:GET|HEAD)$/,
        pt = /^\/\//,
        gt = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        mt = oe.fn.load,
        yt = {},
        vt = {},
        wt = "*/".concat("*");
    try {
        at = z.href
    } catch (bt) {
        at = U.createElement("a");
        at.href = "";
        at = at.href
    }
    ot = gt.exec(at.toLowerCase()) || [];
    oe.fn.load = function(e, n, r) {
        if ("string" != typeof e && mt) return mt.apply(this, arguments);
        var i, o, a, s = this,
            u = e.indexOf(" ");
        if (u >= 0) {
            i = e.slice(u);
            e = e.slice(0, u)
        }
        if (oe.isFunction(n)) {
            r = n;
            n = t
        } else n && "object" == typeof n && (o = "POST");
        s.length > 0 && oe.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: n
        }).done(function(e) {
            a = arguments;
            s.html(i ? oe("<div>").append(oe.parseHTML(e)).find(i) : e)
        }).complete(r && function(e, t) {
            s.each(r, a || [e.responseText, t, e])
        });
        return this
    };
    oe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        oe.fn[t] = function(e) {
            return this.on(t, e)
        }
    });
    oe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: at,
            type: "GET",
            isLocal: dt.test(ot[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": wt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": oe.parseJSON,
                "text xml": oe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? E(E(e, oe.ajaxSettings), t) : E(oe.ajaxSettings, e)
        },
        ajaxPrefilter: j(yt),
        ajaxTransport: j(vt),
        ajax: function(e, n) {
            function r(e, n, r, s) {
                var l, f, v, w, x, k = n;
                if (2 !== b) {
                    b = 2;
                    u && clearTimeout(u);
                    i = t;
                    a = s || "";
                    T.readyState = e > 0 ? 4 : 0;
                    l = e >= 200 && 300 > e || 304 === e;
                    r && (w = R(d, T, r));
                    w = O(d, w, T, l);
                    if (l) {
                        if (d.ifModified) {
                            x = T.getResponseHeader("Last-Modified");
                            x && (oe.lastModified[o] = x);
                            x = T.getResponseHeader("etag");
                            x && (oe.etag[o] = x)
                        }
                        if (204 === e || "HEAD" === d.type) k = "nocontent";
                        else if (304 === e) k = "notmodified";
                        else {
                            k = w.state;
                            f = w.data;
                            v = w.error;
                            l = !v
                        }
                    } else {
                        v = k;
                        if (e || !k) {
                            k = "error";
                            0 > e && (e = 0)
                        }
                    }
                    T.status = e;
                    T.statusText = (n || k) + "";
                    l ? g.resolveWith(h, [f, k, T]) : g.rejectWith(h, [T, k, v]);
                    T.statusCode(y);
                    y = t;
                    c && p.trigger(l ? "ajaxSuccess" : "ajaxError", [T, d, l ? f : v]);
                    m.fireWith(h, [T, k]);
                    if (c) {
                        p.trigger("ajaxComplete", [T, d]);
                        --oe.active || oe.event.trigger("ajaxStop")
                    }
                }
            }
            if ("object" == typeof e) {
                n = e;
                e = t
            }
            n = n || {};
            var i, o, a, s, u, l, c, f, d = oe.ajaxSetup({}, n),
                h = d.context || d,
                p = d.context && (h.nodeType || h.jquery) ? oe(h) : oe.event,
                g = oe.Deferred(),
                m = oe.Callbacks("once memory"),
                y = d.statusCode || {},
                v = {},
                w = {},
                b = 0,
                x = "canceled",
                T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === b) {
                            if (!s) {
                                s = {};
                                for (; t = ft.exec(a);) s[t[1].toLowerCase()] = t[2]
                            }
                            t = s[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === b ? a : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        if (!b) {
                            e = w[n] = w[n] || e;
                            v[e] = t
                        }
                        return this
                    },
                    overrideMimeType: function(e) {
                        b || (d.mimeType = e);
                        return this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (2 > b)
                                for (t in e) y[t] = [y[t], e[t]];
                            else T.always(e[T.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || x;
                        i && i.abort(t);
                        r(0, t);
                        return this
                    }
                };
            g.promise(T).complete = m.add;
            T.success = T.done;
            T.error = T.fail;
            d.url = ((e || d.url || at) + "").replace(lt, "").replace(pt, ot[1] + "//");
            d.type = n.method || n.type || d.method || d.type;
            d.dataTypes = oe.trim(d.dataType || "*").toLowerCase().match(se) || [""];
            if (null == d.crossDomain) {
                l = gt.exec(d.url.toLowerCase());
                d.crossDomain = !(!l || l[1] === ot[1] && l[2] === ot[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (ot[3] || ("http:" === ot[1] ? "80" : "443")))
            }
            d.data && d.processData && "string" != typeof d.data && (d.data = oe.param(d.data, d.traditional));
            A(yt, d, n, T);
            if (2 === b) return T;
            c = d.global;
            c && 0 === oe.active++ && oe.event.trigger("ajaxStart");
            d.type = d.type.toUpperCase();
            d.hasContent = !ht.test(d.type);
            o = d.url;
            if (!d.hasContent) {
                if (d.data) {
                    o = d.url += (ut.test(o) ? "&" : "?") + d.data;
                    delete d.data
                }
                d.cache === !1 && (d.url = ct.test(o) ? o.replace(ct, "$1_=" + st++) : o + (ut.test(o) ? "&" : "?") + "_=" + st++)
            }
            if (d.ifModified) {
                oe.lastModified[o] && T.setRequestHeader("If-Modified-Since", oe.lastModified[o]);
                oe.etag[o] && T.setRequestHeader("If-None-Match", oe.etag[o])
            }(d.data && d.hasContent && d.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", d.contentType);
            T.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + wt + "; q=0.01" : "") : d.accepts["*"]);
            for (f in d.headers) T.setRequestHeader(f, d.headers[f]);
            if (d.beforeSend && (d.beforeSend.call(h, T, d) === !1 || 2 === b)) return T.abort();
            x = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) T[f](d[f]);
            i = A(vt, d, n, T);
            if (i) {
                T.readyState = 1;
                c && p.trigger("ajaxSend", [T, d]);
                d.async && d.timeout > 0 && (u = setTimeout(function() {
                    T.abort("timeout")
                }, d.timeout));
                try {
                    b = 1;
                    i.send(v, r)
                } catch (k) {
                    if (!(2 > b)) throw k;
                    r(-1, k)
                }
            } else r(-1, "No Transport");
            return T
        },
        getJSON: function(e, t, n) {
            return oe.get(e, t, n, "json")
        },
        getScript: function(e, n) {
            return oe.get(e, t, n, "script")
        }
    });
    oe.each(["get", "post"], function(e, n) {
        oe[n] = function(e, r, i, o) {
            if (oe.isFunction(r)) {
                o = o || i;
                i = r;
                r = t
            }
            return oe.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            })
        }
    });
    oe.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                oe.globalEval(e);
                return e
            }
        }
    });
    oe.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1);
        e.crossDomain && (e.type = "GET")
    });
    oe.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, i) {
                    t = oe("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove();
                        n = null;
                        e && i("error" === e.type ? 404 : 200, e.type)
                    });
                    U.head.appendChild(t[0])
                },
                abort: function() {
                    n && n()
                }
            }
        }
    });
    var xt = [],
        Tt = /(=)\?(?=&|$)|\?\?/;
    oe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = xt.pop() || oe.expando + "_" + st++;
            this[e] = !0;
            return e
        }
    });
    oe.ajaxPrefilter("json jsonp", function(n, r, i) {
        var o, a, s, u = n.jsonp !== !1 && (Tt.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Tt.test(n.data) && "data");
        if (u || "jsonp" === n.dataTypes[0]) {
            o = n.jsonpCallback = oe.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback;
            u ? n[u] = n[u].replace(Tt, "$1" + o) : n.jsonp !== !1 && (n.url += (ut.test(n.url) ? "&" : "?") + n.jsonp + "=" + o);
            n.converters["script json"] = function() {
                s || oe.error(o + " was not called");
                return s[0]
            };
            n.dataTypes[0] = "json";
            a = e[o];
            e[o] = function() {
                s = arguments
            };
            i.always(function() {
                e[o] = a;
                if (n[o]) {
                    n.jsonpCallback = r.jsonpCallback;
                    xt.push(o)
                }
                s && oe.isFunction(a) && a(s[0]);
                s = a = t
            });
            return "script"
        }
    });
    oe.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (e) {}
    };
    var kt = oe.ajaxSettings.xhr(),
        Ct = {
            0: 200,
            1223: 204
        },
        St = 0,
        Nt = {};
    e.ActiveXObject && oe(e).on("unload", function() {
        for (var e in Nt) Nt[e]();
        Nt = t
    });
    oe.support.cors = !!kt && "withCredentials" in kt;
    oe.support.ajax = kt = !!kt;
    oe.ajaxTransport(function(e) {
        var n;
        return oe.support.cors || kt && !e.crossDomain ? {
            send: function(r, i) {
                var o, a, s = e.xhr();
                s.open(e.type, e.url, e.async, e.username, e.password);
                if (e.xhrFields)
                    for (o in e.xhrFields) s[o] = e.xhrFields[o];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType);
                e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                for (o in r) s.setRequestHeader(o, r[o]);
                n = function(e) {
                    return function() {
                        if (n) {
                            delete Nt[a];
                            n = s.onload = s.onerror = null;
                            "abort" === e ? s.abort() : "error" === e ? i(s.status || 404, s.statusText) : i(Ct[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {
                                text: s.responseText
                            } : t, s.getAllResponseHeaders())
                        }
                    }
                };
                s.onload = n();
                s.onerror = n("error");
                n = Nt[a = St++] = n("abort");
                s.send(e.hasContent && e.data || null)
            },
            abort: function() {
                n && n()
            }
        } : void 0
    });
    var Dt, jt, At = /^(?:toggle|show|hide)$/,
        Et = new RegExp("^(?:([+-])=|)(" + ae + ")([a-z%]*)$", "i"),
        Rt = /queueHooks$/,
        Ot = [M],
        It = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = Et.exec(t),
                    o = i && i[3] || (oe.cssNumber[e] ? "" : "px"),
                    a = (oe.cssNumber[e] || "px" !== o && +r) && Et.exec(oe.css(n.elem, e)),
                    s = 1,
                    u = 20;
                if (a && a[3] !== o) {
                    o = o || a[3];
                    i = i || [];
                    a = +r || 1;
                    do {
                        s = s || ".5";
                        a /= s;
                        oe.style(n.elem, e, a + o)
                    } while (s !== (s = n.cur() / r) && 1 !== s && --u)
                }
                if (i) {
                    a = n.start = +a || +r || 0;
                    n.unit = o;
                    n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]
                }
                return n
            }]
        };
    oe.Animation = oe.extend(q, {
        tweener: function(e, t) {
            if (oe.isFunction(e)) {
                t = e;
                e = ["*"]
            } else e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++) {
                n = e[r];
                It[n] = It[n] || [];
                It[n].unshift(t)
            }
        },
        prefilter: function(e, t) {
            t ? Ot.unshift(e) : Ot.push(e)
        }
    });
    oe.Tween = L;
    L.prototype = {
        constructor: L,
        init: function(e, t, n, r, i, o) {
            this.elem = e;
            this.prop = n;
            this.easing = i || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = r;
            this.unit = o || (oe.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = L.propHooks[this.prop];
            return e && e.get ? e.get(this) : L.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = L.propHooks[this.prop];
            this.options.duration ? this.pos = t = oe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e;
            this.now = (this.end - this.start) * t + this.start;
            this.options.step && this.options.step.call(this.elem, this.now, this);
            n && n.set ? n.set(this) : L.propHooks._default.set(this);
            return this
        }
    };
    L.prototype.init.prototype = L.prototype;
    L.propHooks = {
        _default: {
            get: function(e) {
                var t;
                if (null != e.elem[e.prop] && (!e.elem.style || null == e.elem.style[e.prop])) return e.elem[e.prop];
                t = oe.css(e.elem, e.prop, "");
                return t && "auto" !== t ? t : 0
            },
            set: function(e) {
                oe.fx.step[e.prop] ? oe.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[oe.cssProps[e.prop]] || oe.cssHooks[e.prop]) ? oe.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    };
    L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    };
    oe.each(["toggle", "show", "hide"], function(e, t) {
        var n = oe.fn[t];
        oe.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(F(t, !0), e, r, i)
        }
    });
    oe.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(w).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = oe.isEmptyObject(e),
                o = oe.speed(t, n, r),
                a = function() {
                    var t = q(this, oe.extend({}, e), o);
                    (i || me.get(this, "finish")) && t.stop(!0)
                };
            a.finish = a;
            return i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop;
                t(r)
            };
            if ("string" != typeof e) {
                r = n;
                n = e;
                e = t
            }
            n && e !== !1 && this.queue(e || "fx", []);
            return this.each(function() {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    o = oe.timers,
                    a = me.get(this);
                if (n) a[n] && a[n].stop && i(a[n]);
                else
                    for (n in a) a[n] && a[n].stop && Rt.test(n) && i(a[n]);
                for (n = o.length; n--;)
                    if (o[n].elem === this && (null == e || o[n].queue === e)) {
                        o[n].anim.stop(r);
                        t = !1;
                        o.splice(n, 1)
                    }(t || !r) && oe.dequeue(this, e)
            })
        },
        finish: function(e) {
            e !== !1 && (e = e || "fx");
            return this.each(function() {
                var t, n = me.get(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = oe.timers,
                    a = r ? r.length : 0;
                n.finish = !0;
                oe.queue(this, e, []);
                i && i.stop && i.stop.call(this, !0);
                for (t = o.length; t--;)
                    if (o[t].elem === this && o[t].queue === e) {
                        o[t].anim.stop(!0);
                        o.splice(t, 1)
                    }
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    });
    oe.each({
        slideDown: F("show"),
        slideUp: F("hide"),
        slideToggle: F("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        oe.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    });
    oe.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? oe.extend({}, e) : {
            complete: n || !n && t || oe.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !oe.isFunction(t) && t
        };
        r.duration = oe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in oe.fx.speeds ? oe.fx.speeds[r.duration] : oe.fx.speeds._default;
        (null == r.queue || r.queue === !0) && (r.queue = "fx");
        r.old = r.complete;
        r.complete = function() {
            oe.isFunction(r.old) && r.old.call(this);
            r.queue && oe.dequeue(this, r.queue)
        };
        return r
    };
    oe.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    };
    oe.timers = [];
    oe.fx = L.prototype.init;
    oe.fx.tick = function() {
        var e, n = oe.timers,
            r = 0;
        Dt = oe.now();
        for (; r < n.length; r++) {
            e = n[r];
            e() || n[r] !== e || n.splice(r--, 1)
        }
        n.length || oe.fx.stop();
        Dt = t
    };
    oe.fx.timer = function(e) {
        e() && oe.timers.push(e) && oe.fx.start()
    };
    oe.fx.interval = 13;
    oe.fx.start = function() {
        jt || (jt = setInterval(oe.fx.tick, oe.fx.interval))
    };
    oe.fx.stop = function() {
        clearInterval(jt);
        jt = null
    };
    oe.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    oe.fx.step = {};
    oe.expr && oe.expr.filters && (oe.expr.filters.animated = function(e) {
        return oe.grep(oe.timers, function(t) {
            return e === t.elem
        }).length
    });
    oe.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            oe.offset.setOffset(this, e, t)
        });
        var n, r, i = this[0],
            o = {
                top: 0,
                left: 0
            },
            a = i && i.ownerDocument;
        if (a) {
            n = a.documentElement;
            if (!oe.contains(n, i)) return o;
            typeof i.getBoundingClientRect !== B && (o = i.getBoundingClientRect());
            r = P(a);
            return {
                top: o.top + r.pageYOffset - n.clientTop,
                left: o.left + r.pageXOffset - n.clientLeft
            }
        }
    };
    oe.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s, u, l, c = oe.css(e, "position"),
                f = oe(e),
                d = {};
            "static" === c && (e.style.position = "relative");
            s = f.offset();
            o = oe.css(e, "top");
            u = oe.css(e, "left");
            l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1;
            if (l) {
                r = f.position();
                a = r.top;
                i = r.left
            } else {
                a = parseFloat(o) || 0;
                i = parseFloat(u) || 0
            }
            oe.isFunction(t) && (t = t.call(e, n, s));
            null != t.top && (d.top = t.top - s.top + a);
            null != t.left && (d.left = t.left - s.left + i);
            "using" in t ? t.using.call(e, d) : f.css(d)
        }
    };
    oe.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                if ("fixed" === oe.css(n, "position")) t = n.getBoundingClientRect();
                else {
                    e = this.offsetParent();
                    t = this.offset();
                    oe.nodeName(e[0], "html") || (r = e.offset());
                    r.top += oe.css(e[0], "borderTopWidth", !0);
                    r.left += oe.css(e[0], "borderLeftWidth", !0)
                }
                return {
                    top: t.top - r.top - oe.css(n, "marginTop", !0),
                    left: t.left - r.left - oe.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || X; e && !oe.nodeName(e, "html") && "static" === oe.css(e, "position");) e = e.offsetParent;
                return e || X
            })
        }
    });
    oe.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(n, r) {
        var i = "pageYOffset" === r;
        oe.fn[n] = function(o) {
            return oe.access(this, function(n, o, a) {
                var s = P(n);
                if (a === t) return s ? s[r] : n[o];
                s ? s.scrollTo(i ? e.pageXOffset : a, i ? a : e.pageYOffset) : n[o] = a;
                return void 0
            }, n, o, arguments.length, null)
        }
    });
    oe.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        oe.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            oe.fn[i] = function(i, o) {
                var a = arguments.length && (r || "boolean" != typeof i),
                    s = r || (i === !0 || o === !0 ? "margin" : "border");
                return oe.access(this, function(n, r, i) {
                    var o;
                    if (oe.isWindow(n)) return n.document.documentElement["client" + e];
                    if (9 === n.nodeType) {
                        o = n.documentElement;
                        return Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])
                    }
                    return i === t ? oe.css(n, r, s) : oe.style(n, r, i, s)
                }, n, a ? i : t, a, null)
            }
        })
    });
    oe.fn.size = function() {
        return this.length
    };
    oe.fn.andSelf = oe.fn.addBack;
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = oe : "function" == typeof define && define.amd && define("jquery", [], function() {
        return oe
    });
    "object" == typeof e && "object" == typeof e.document && (e.jQuery = e.$ = oe)
}(window);

/*
(function() {
    var e = this,
        t = e._,
        n = {},
        r = Array.prototype,
        i = Object.prototype,
        o = Function.prototype,
        a = r.push,
        s = r.slice,
        u = r.concat,
        l = i.toString,
        c = i.hasOwnProperty,
        f = r.forEach,
        d = r.map,
        h = r.reduce,
        p = r.reduceRight,
        g = r.filter,
        m = r.every,
        y = r.some,
        v = r.indexOf,
        w = r.lastIndexOf,
        b = Array.isArray,
        x = Object.keys,
        T = o.bind,
        k = function(e) {
            if (e instanceof k) return e;
            if (!(this instanceof k)) return new k(e);
            this._wrapped = e;
            return void 0
        };
    if ("undefined" != typeof exports) {
        "undefined" != typeof module && module.exports && (exports = module.exports = k);
        exports._ = k
    } else e._ = k;
    k.VERSION = "1.5.2";
    var C = k.each = k.forEach = function(e, t, r) {
        if (null != e)
            if (f && e.forEach === f) e.forEach(t, r);
            else if (e.length === +e.length) {
            for (var i = 0, o = e.length; o > i; i++)
                if (t.call(r, e[i], i, e) === n) return
        } else
            for (var a = k.keys(e), i = 0, o = a.length; o > i; i++)
                if (t.call(r, e[a[i]], a[i], e) === n) return
    };
    k.map = k.collect = function(e, t, n) {
        var r = [];
        if (null == e) return r;
        if (d && e.map === d) return e.map(t, n);
        C(e, function(e, i, o) {
            r.push(t.call(n, e, i, o))
        });
        return r
    };
    var S = "Reduce of empty array with no initial value";
    k.reduce = k.foldl = k.inject = function(e, t, n, r) {
        var i = arguments.length > 2;
        null == e && (e = []);
        if (h && e.reduce === h) {
            r && (t = k.bind(t, r));
            return i ? e.reduce(t, n) : e.reduce(t)
        }
        C(e, function(e, o, a) {
            if (i) n = t.call(r, n, e, o, a);
            else {
                n = e;
                i = !0
            }
        });
        if (!i) throw new TypeError(S);
        return n
    };
    k.reduceRight = k.foldr = function(e, t, n, r) {
        var i = arguments.length > 2;
        null == e && (e = []);
        if (p && e.reduceRight === p) {
            r && (t = k.bind(t, r));
            return i ? e.reduceRight(t, n) : e.reduceRight(t)
        }
        var o = e.length;
        if (o !== +o) {
            var a = k.keys(e);
            o = a.length
        }
        C(e, function(s, u, l) {
            u = a ? a[--o] : --o;
            if (i) n = t.call(r, n, e[u], u, l);
            else {
                n = e[u];
                i = !0
            }
        });
        if (!i) throw new TypeError(S);
        return n
    };
    k.find = k.detect = function(e, t, n) {
        var r;
        N(e, function(e, i, o) {
            if (t.call(n, e, i, o)) {
                r = e;
                return !0
            }
        });
        return r
    };
    k.filter = k.select = function(e, t, n) {
        var r = [];
        if (null == e) return r;
        if (g && e.filter === g) return e.filter(t, n);
        C(e, function(e, i, o) {
            t.call(n, e, i, o) && r.push(e)
        });
        return r
    };
    k.reject = function(e, t, n) {
        return k.filter(e, function(e, r, i) {
            return !t.call(n, e, r, i)
        }, n)
    };
    k.every = k.all = function(e, t, r) {
        t || (t = k.identity);
        var i = !0;
        if (null == e) return i;
        if (m && e.every === m) return e.every(t, r);
        C(e, function(e, o, a) {
            return (i = i && t.call(r, e, o, a)) ? void 0 : n
        });
        return !!i
    };
    var N = k.some = k.any = function(e, t, r) {
        t || (t = k.identity);
        var i = !1;
        if (null == e) return i;
        if (y && e.some === y) return e.some(t, r);
        C(e, function(e, o, a) {
            return i || (i = t.call(r, e, o, a)) ? n : void 0
        });
        return !!i
    };
    k.contains = k.include = function(e, t) {
        return null == e ? !1 : v && e.indexOf === v ? -1 != e.indexOf(t) : N(e, function(e) {
            return e === t
        })
    };
    k.invoke = function(e, t) {
        var n = s.call(arguments, 2),
            r = k.isFunction(t);
        return k.map(e, function(e) {
            return (r ? t : e[t]).apply(e, n)
        })
    };
    k.pluck = function(e, t) {
        return k.map(e, function(e) {
            return e[t]
        })
    };
    k.where = function(e, t, n) {
        return k.isEmpty(t) ? n ? void 0 : [] : k[n ? "find" : "filter"](e, function(e) {
            for (var n in t)
                if (t[n] !== e[n]) return !1;
            return !0
        })
    };
    k.findWhere = function(e, t) {
        return k.where(e, t, !0)
    };
    k.max = function(e, t, n) {
        if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.max.apply(Math, e);
        if (!t && k.isEmpty(e)) return -(1 / 0);
        var r = {
            computed: -(1 / 0),
            value: -(1 / 0)
        };
        C(e, function(e, i, o) {
            var a = t ? t.call(n, e, i, o) : e;
            a > r.computed && (r = {
                value: e,
                computed: a
            })
        });
        return r.value
    };
    k.min = function(e, t, n) {
        if (!t && k.isArray(e) && e[0] === +e[0] && e.length < 65535) return Math.min.apply(Math, e);
        if (!t && k.isEmpty(e)) return 1 / 0;
        var r = {
            computed: 1 / 0,
            value: 1 / 0
        };
        C(e, function(e, i, o) {
            var a = t ? t.call(n, e, i, o) : e;
            a < r.computed && (r = {
                value: e,
                computed: a
            })
        });
        return r.value
    };
    k.shuffle = function(e) {
        var t, n = 0,
            r = [];
        C(e, function(e) {
            t = k.random(n++);
            r[n - 1] = r[t];
            r[t] = e
        });
        return r
    };
    k.sample = function(e, t, n) {
        return arguments.length < 2 || n ? e[k.random(e.length - 1)] : k.shuffle(e).slice(0, Math.max(0, t))
    };
    var D = function(e) {
        return k.isFunction(e) ? e : function(t) {
            return t[e]
        }
    };
    k.sortBy = function(e, t, n) {
        var r = D(t);
        return k.pluck(k.map(e, function(e, t, i) {
            return {
                value: e,
                index: t,
                criteria: r.call(n, e, t, i)
            }
        }).sort(function(e, t) {
            var n = e.criteria,
                r = t.criteria;
            if (n !== r) {
                if (n > r || void 0 === n) return 1;
                if (r > n || void 0 === r) return -1
            }
            return e.index - t.index
        }), "value")
    };
    var j = function(e) {
        return function(t, n, r) {
            var i = {},
                o = null == n ? k.identity : D(n);
            C(t, function(n, a) {
                var s = o.call(r, n, a, t);
                e(i, s, n)
            });
            return i
        }
    };
    k.groupBy = j(function(e, t, n) {
        (k.has(e, t) ? e[t] : e[t] = []).push(n)
    });
    k.indexBy = j(function(e, t, n) {
        e[t] = n
    });
    k.countBy = j(function(e, t) {
        k.has(e, t) ? e[t]++ : e[t] = 1
    });
    k.sortedIndex = function(e, t, n, r) {
        n = null == n ? k.identity : D(n);
        for (var i = n.call(r, t), o = 0, a = e.length; a > o;) {
            var s = o + a >>> 1;
            n.call(r, e[s]) < i ? o = s + 1 : a = s
        }
        return o
    };
    k.toArray = function(e) {
        return e ? k.isArray(e) ? s.call(e) : e.length === +e.length ? k.map(e, k.identity) : k.values(e) : []
    };
    k.size = function(e) {
        return null == e ? 0 : e.length === +e.length ? e.length : k.keys(e).length
    };
    k.first = k.head = k.take = function(e, t, n) {
        return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t)
    };
    k.initial = function(e, t, n) {
        return s.call(e, 0, e.length - (null == t || n ? 1 : t))
    };
    k.last = function(e, t, n) {
        return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0))
    };
    k.rest = k.tail = k.drop = function(e, t, n) {
        return s.call(e, null == t || n ? 1 : t)
    };
    k.compact = function(e) {
        return k.filter(e, k.identity)
    };
    var A = function(e, t, n) {
        if (t && k.every(e, k.isArray)) return u.apply(n, e);
        C(e, function(e) {
            k.isArray(e) || k.isArguments(e) ? t ? a.apply(n, e) : A(e, t, n) : n.push(e)
        });
        return n
    };
    k.flatten = function(e, t) {
        return A(e, t, [])
    };
    k.without = function(e) {
        return k.difference(e, s.call(arguments, 1))
    };
    k.uniq = k.unique = function(e, t, n, r) {
        if (k.isFunction(t)) {
            r = n;
            n = t;
            t = !1
        }
        var i = n ? k.map(e, n, r) : e,
            o = [],
            a = [];
        C(i, function(n, r) {
            if (t ? !r || a[a.length - 1] !== n : !k.contains(a, n)) {
                a.push(n);
                o.push(e[r])
            }
        });
        return o
    };
    k.union = function() {
        return k.uniq(k.flatten(arguments, !0))
    };
    k.intersection = function(e) {
        var t = s.call(arguments, 1);
        return k.filter(k.uniq(e), function(e) {
            return k.every(t, function(t) {
                return k.indexOf(t, e) >= 0
            })
        })
    };
    k.difference = function(e) {
        var t = u.apply(r, s.call(arguments, 1));
        return k.filter(e, function(e) {
            return !k.contains(t, e)
        })
    };
    k.zip = function() {
        for (var e = k.max(k.pluck(arguments, "length").concat(0)), t = new Array(e), n = 0; e > n; n++) t[n] = k.pluck(arguments, "" + n);
        return t
    };
    k.object = function(e, t) {
        if (null == e) return {};
        for (var n = {}, r = 0, i = e.length; i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
        return n
    };
    k.indexOf = function(e, t, n) {
        if (null == e) return -1;
        var r = 0,
            i = e.length;
        if (n) {
            if ("number" != typeof n) {
                r = k.sortedIndex(e, t);
                return e[r] === t ? r : -1
            }
            r = 0 > n ? Math.max(0, i + n) : n
        }
        if (v && e.indexOf === v) return e.indexOf(t, n);
        for (; i > r; r++)
            if (e[r] === t) return r;
        return -1
    };
    k.lastIndexOf = function(e, t, n) {
        if (null == e) return -1;
        var r = null != n;
        if (w && e.lastIndexOf === w) return r ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
        for (var i = r ? n : e.length; i--;)
            if (e[i] === t) return i;
        return -1
    };
    k.range = function(e, t, n) {
        if (arguments.length <= 1) {
            t = e || 0;
            e = 0
        }
        n = arguments[2] || 1;
        for (var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, o = new Array(r); r > i;) {
            o[i++] = e;
            e += n
        }
        return o
    };
    var E = function() {};
    k.bind = function(e, t) {
        var n, r;
        if (T && e.bind === T) return T.apply(e, s.call(arguments, 1));
        if (!k.isFunction(e)) throw new TypeError;
        n = s.call(arguments, 2);
        return r = function() {
            if (!(this instanceof r)) return e.apply(t, n.concat(s.call(arguments)));
            E.prototype = e.prototype;
            var i = new E;
            E.prototype = null;
            var o = e.apply(i, n.concat(s.call(arguments)));
            return Object(o) === o ? o : i
        }
    };
    k.partial = function(e) {
        var t = s.call(arguments, 1);
        return function() {
            return e.apply(this, t.concat(s.call(arguments)))
        }
    };
    k.bindAll = function(e) {
        var t = s.call(arguments, 1);
        if (0 === t.length) throw new Error("bindAll must be passed function names");
        C(t, function(t) {
            e[t] = k.bind(e[t], e)
        });
        return e
    };
    k.memoize = function(e, t) {
        var n = {};
        t || (t = k.identity);
        return function() {
            var r = t.apply(this, arguments);
            return k.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    };
    k.delay = function(e, t) {
        var n = s.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, n)
        }, t)
    };
    k.defer = function(e) {
        return k.delay.apply(k, [e, 1].concat(s.call(arguments, 1)))
    };
    k.throttle = function(e, t, n) {
        var r, i, o, a = null,
            s = 0;
        n || (n = {});
        var u = function() {
            s = n.leading === !1 ? 0 : new Date;
            a = null;
            o = e.apply(r, i)
        };
        return function() {
            var l = new Date;
            s || n.leading !== !1 || (s = l);
            var c = t - (l - s);
            r = this;
            i = arguments;
            if (0 >= c) {
                clearTimeout(a);
                a = null;
                s = l;
                o = e.apply(r, i)
            } else a || n.trailing === !1 || (a = setTimeout(u, c));
            return o
        }
    };
    k.debounce = function(e, t, n) {
        var r, i, o, a, s;
        return function() {
            o = this;
            i = arguments;
            a = new Date;
            var u = function() {
                    var l = new Date - a;
                    if (t > l) r = setTimeout(u, t - l);
                    else {
                        r = null;
                        n || (s = e.apply(o, i))
                    }
                },
                l = n && !r;
            r || (r = setTimeout(u, t));
            l && (s = e.apply(o, i));
            return s
        }
    };
    k.once = function(e) {
        var t, n = !1;
        return function() {
            if (n) return t;
            n = !0;
            t = e.apply(this, arguments);
            e = null;
            return t
        }
    };
    k.wrap = function(e, t) {
        return function() {
            var n = [e];
            a.apply(n, arguments);
            return t.apply(this, n)
        }
    };
    k.compose = function() {
        var e = arguments;
        return function() {
            for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
            return t[0]
        }
    };
    k.after = function(e, t) {
        return function() {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    };
    k.keys = x || function(e) {
        if (e !== Object(e)) throw new TypeError("Invalid object");
        var t = [];
        for (var n in e) k.has(e, n) && t.push(n);
        return t
    };
    k.values = function(e) {
        for (var t = k.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
        return r
    };
    k.pairs = function(e) {
        for (var t = k.keys(e), n = t.length, r = new Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
        return r
    };
    k.invert = function(e) {
        for (var t = {}, n = k.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
        return t
    };
    k.functions = k.methods = function(e) {
        var t = [];
        for (var n in e) k.isFunction(e[n]) && t.push(n);
        return t.sort()
    };
    k.extend = function(e) {
        C(s.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) e[n] = t[n]
        });
        return e
    };
    k.pick = function(e) {
        var t = {},
            n = u.apply(r, s.call(arguments, 1));
        C(n, function(n) {
            n in e && (t[n] = e[n])
        });
        return t
    };
    k.omit = function(e) {
        var t = {},
            n = u.apply(r, s.call(arguments, 1));
        for (var i in e) k.contains(n, i) || (t[i] = e[i]);
        return t
    };
    k.defaults = function(e) {
        C(s.call(arguments, 1), function(t) {
            if (t)
                for (var n in t) void 0 === e[n] && (e[n] = t[n])
        });
        return e
    };
    k.clone = function(e) {
        return k.isObject(e) ? k.isArray(e) ? e.slice() : k.extend({}, e) : e
    };
    k.tap = function(e, t) {
        t(e);
        return e
    };
    var R = function(e, t, n, r) {
        if (e === t) return 0 !== e || 1 / e == 1 / t;
        if (null == e || null == t) return e === t;
        e instanceof k && (e = e._wrapped);
        t instanceof k && (t = t._wrapped);
        var i = l.call(e);
        if (i != l.call(t)) return !1;
        switch (i) {
            case "[object String]":
                return e == String(t);
            case "[object Number]":
                return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e == +t;
            case "[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if ("object" != typeof e || "object" != typeof t) return !1;
        for (var o = n.length; o--;)
            if (n[o] == e) return r[o] == t;
        var a = e.constructor,
            s = t.constructor;
        if (a !== s && !(k.isFunction(a) && a instanceof a && k.isFunction(s) && s instanceof s)) return !1;
        n.push(e);
        r.push(t);
        var u = 0,
            c = !0;
        if ("[object Array]" == i) {
            u = e.length;
            c = u == t.length;
            if (c)
                for (; u-- && (c = R(e[u], t[u], n, r)););
        } else {
            for (var f in e)
                if (k.has(e, f)) {
                    u++;
                    if (!(c = k.has(t, f) && R(e[f], t[f], n, r))) break
                }
            if (c) {
                for (f in t)
                    if (k.has(t, f) && !u--) break;
                c = !u
            }
        }
        n.pop();
        r.pop();
        return c
    };
    k.isEqual = function(e, t) {
        return R(e, t, [], [])
    };
    k.isEmpty = function(e) {
        if (null == e) return !0;
        if (k.isArray(e) || k.isString(e)) return 0 === e.length;
        for (var t in e)
            if (k.has(e, t)) return !1;
        return !0
    };
    k.isElement = function(e) {
        return !(!e || 1 !== e.nodeType)
    };
    k.isArray = b || function(e) {
        return "[object Array]" == l.call(e)
    };
    k.isObject = function(e) {
        return e === Object(e)
    };
    C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
        k["is" + e] = function(t) {
            return l.call(t) == "[object " + e + "]"
        }
    });
    k.isArguments(arguments) || (k.isArguments = function(e) {
        return !(!e || !k.has(e, "callee"))
    });
    "function" != typeof /./ && (k.isFunction = function(e) {
        return "function" == typeof e
    });
    k.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    };
    k.isNaN = function(e) {
        return k.isNumber(e) && e != +e
    };
    k.isBoolean = function(e) {
        return e === !0 || e === !1 || "[object Boolean]" == l.call(e)
    };
    k.isNull = function(e) {
        return null === e
    };
    k.isUndefined = function(e) {
        return void 0 === e
    };
    k.has = function(e, t) {
        return c.call(e, t)
    };
    k.noConflict = function() {
        e._ = t;
        return this
    };
    k.identity = function(e) {
        return e
    };
    k.times = function(e, t, n) {
        for (var r = Array(Math.max(0, e)), i = 0; e > i; i++) r[i] = t.call(n, i);
        return r
    };
    k.random = function(e, t) {
        if (null == t) {
            t = e;
            e = 0
        }
        return e + Math.floor(Math.random() * (t - e + 1))
    };
    var O = {
        escape: {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;"
        }
    };
    O.unescape = k.invert(O.escape);
    var I = {
        escape: new RegExp("[" + k.keys(O.escape).join("") + "]", "g"),
        unescape: new RegExp("(" + k.keys(O.unescape).join("|") + ")", "g")
    };
    k.each(["escape", "unescape"], function(e) {
        k[e] = function(t) {
            return null == t ? "" : ("" + t).replace(I[e], function(t) {
                return O[e][t]
            })
        }
    });
    k.result = function(e, t) {
        if (null == e) return void 0;
        var n = e[t];
        return k.isFunction(n) ? n.call(e) : n
    };
    k.mixin = function(e) {
        C(k.functions(e), function(t) {
            var n = k[t] = e[t];
            k.prototype[t] = function() {
                var e = [this._wrapped];
                a.apply(e, arguments);
                return L.call(this, n.apply(k, e))
            }
        })
    };
    var $ = 0;
    k.uniqueId = function(e) {
        var t = ++$ + "";
        return e ? e + t : t
    };
    k.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var q = /(.)^/,
        H = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        M = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    k.template = function(e, t, n) {
        var r;
        n = k.defaults({}, n, k.templateSettings);
        var i = new RegExp([(n.escape || q).source, (n.interpolate || q).source, (n.evaluate || q).source].join("|") + "|$", "g"),
            o = 0,
            a = "__p+='";
        e.replace(i, function(t, n, r, i, s) {
            a += e.slice(o, s).replace(M, function(e) {
                return "\\" + H[e]
            });
            n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'");
            r && (a += "'+\n((__t=(" + r + "))==null?'':__t)+\n'");
            i && (a += "';\n" + i + "\n__p+='");
            o = s + t.length;
            return t
        });
        a += "';\n";
        n.variable || (a = "with(obj||{}){\n" + a + "}\n");
        a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
        try {
            r = new Function(n.variable || "obj", "_", a)
        } catch (s) {
            s.source = a;
            throw s
        }
        if (t) return r(t, k);
        var u = function(e) {
            return r.call(this, e, k)
        };
        u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}";
        return u
    };
    k.chain = function(e) {
        return k(e).chain()
    };
    var L = function(e) {
        return this._chain ? k(e).chain() : e
    };
    k.mixin(k);
    C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = r[e];
        k.prototype[e] = function() {
            var n = this._wrapped;
            t.apply(n, arguments);
            "shift" != e && "splice" != e || 0 !== n.length || delete n[0];
            return L.call(this, n)
        }
    });
    C(["concat", "join", "slice"], function(e) {
        var t = r[e];
        k.prototype[e] = function() {
            return L.call(this, t.apply(this._wrapped, arguments))
        }
    });
    k.extend(k.prototype, {
        chain: function() {
            this._chain = !0;
            return this
        },
        value: function() {
            return this._wrapped
        }
    })
}).call(this);
*/

(function() {
    var e, t, n, r = [].slice;
    null == window.GitHub && (window.GitHub = {});
    window.Render = window.Render || {};
    t = function() {
        var e, t;
        e = 1 <= arguments.length ? r.call(arguments, 0) : [];
        if (null != console.log) try {
            return console.log.apply(console, e)
        } catch (n) {
            t = n;
            return console.log(e)
        }
    };
    n = function(e) {
        var t, n;
        t = 50;
        (null != (n = window.debug).buffer ? n.buffer : n.buffer = []).push({
            time: Date.now(),
            args: e
        });
        return window.debug.buffer = window.debug.buffer.slice(-t)
    };
    window.Render.showDebug = function(e) {
        var n, i, o, a;
        null == e && (e = 1);
        a = (window.debug.buffer || []).slice(-e);
        for (i = 0, o = a.length; o > i; i++) {
            n = a[i];
            t.apply(null, [new Date(n.time) + ": "].concat(r.call(n.args)))
        }
        return (window.debug.buffer || []).length
    };
    window.debug = null != window.debug ? window.debug : (e = function() {
        var e;
        e = 1 <= arguments.length ? r.call(arguments, 0) : [];
        n(e);
        return window.Render.quiet ? void 0 : t.apply(null, e)
    }, e.buffer = [], e)
}).call(this);

(function() {
    window.Render.quiet = !0
}).call(this);

/*
(function() {
    var e, t, n = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    t = window.Render;
    t.Doctor = e = function() {
        function e(e) {
            this.container = e;
            this.updateHealth = n(this.updateHealth, this);
            this.problems = [];
            this.updateHealth()
        }
        e.prototype.addProblem = function(e) {
            this.problems.push(e);
            return this.updateHealth()
        };
        e.prototype.healthy = function() {
            return 0 === this.problems.length
        };
        e.prototype.clearProblems = function() {
            return this.problems = []
        };
        e.prototype.updateHealth = function() {
            var e, t, n, r;
            if ($(this.container).length) {
                setTimeout(this.updateHealth, 3e3);
                e = $(".js-viewer-health");
                t = "is-viewer-good is-viewer-bad";
                if (this.problems.length) {
                    r = this.problems.join(", ");
                    n = "is-viewer-bad";
                    e.show()
                } else {
                    r = "Everything running smoothly!";
                    n = "is-viewer-good"
                }
                e.removeClass(t);
                e.addClass(n);
                return e.find(".js-message").html(r)
            }
        };
        return e
    }()
}).call(this);

(function() {
    var e, t, n, r, i, o, a, s, u, l, c, f, d, h = [].slice;
    n = {
        originalHistoryState: JSON.stringify(window.history.state)
    };
    t = [];
    u = (new Date).getTime();
    d = !1;
    a = function() {
        d = !0
    };
    o = function() {
        d = !1
    };
    $(window).on("pageshow", o);
    $(window).on("pagehide", a);
    $(window).on("error", function(e) {
        var r, o, a, l, f, d, p;
        d = e.originalEvent, f = d.message, a = d.filename, l = d.lineno, o = d.error;
        r = $.extend.apply($, [{}, n].concat(h.call(t), [{
            message: f,
            filename: a,
            lineno: l,
            url: window.location.href,
            readyState: document.readyState,
            referrer: document.referrer,
            stack: null != o ? o.stack : void 0,
            historyState: JSON.stringify(window.history.state),
            timeSinceLoad: Math.round((new Date).getTime() - u),
            extensionScripts: JSON.stringify(i().sort()),
            navigations: JSON.stringify(s())
        }], [null != o ? o.failbotContext : void 0]));
        t = [];
        null != r.eventTarget && (r.eventTarget = $(r.eventTarget).inspect());
        $(document).trigger("captured:error", r);
        r.logging = function() {
            var e;
            try {
                return JSON.stringify((null != (e = window.debug) ? e.buffer : void 0) || [])
            } catch (t) {}
        }();
        if (c(e)) {
            p = $("body").data("render-url");
            $.ajax({
                type: "POST",
                url: p + "/_errors",
                data: {
                    error: r
                }
            })
        }
    });
    c = function() {
        var e;
        e = 0;
        return function(t) {
            var n, r, i;
            i = t.originalEvent, r = i.lineno, n = i.error;
            if (null == (null != n ? n.stack : void 0) || !r) return !1;
            if (d) return !1;
            if (e >= 10) return !1;
            e++;
            return !0
        }
    }();
    i = function() {
        var e, t, n, r, i;
        n = $("script");
        r = [];
        for (e = 0, t = n.length; t > e; e++) {
            i = n[e];
            /^(?:chrome-extension|file):/.test(i.src) && r.push(i.src)
        }
        return r
    };
    r = jQuery.event.dispatch;
    jQuery.event.dispatch = function(e) {
        var n;
        if ("error" === e.type && e.target === window) return r.apply(this, arguments);
        t.push({
            eventType: e.type,
            eventTarget: e.target
        });
        n = r.apply(this, arguments);
        t.pop();
        return n
    };
    l = function(e, t) {
        var n;
        n = s();
        n.push({
            type: e,
            url: window.location.href,
            state: window.history.state,
            info: t
        });
        return f(n)
    };
    e = "navigations";
    s = function() {
        var t;
        t = function() {
            try {
                return sessionStorage.getItem(e)
            } catch (t) {}
        }();
        return t ? JSON.parse(t) : []
    };
    f = function(t) {
        try {
            return sessionStorage.setItem(e, JSON.stringify(t))
        } catch (n) {}
    };
    l("load");
    $(window).on("hashchange", function(e) {
        return l("hashchange", {
            oldURL: e.oldURL,
            newURL: e.newURL
        })
    });
    $(window).on("popstate", function(e) {
        return l("popstate", {
            eventState: e.state
        })
    });
    $(document).on("pjax:success", function(e) {
        return l("pjax:success")
    });
    $(document).on("pjax:popstate", function(e) {
        return l("pjax:popstate", {
            pjaxDirection: e.direction,
            pjaxState: e.state
        })
    });
    "#b00m" === window.location.hash && b00m()
}).call(this);

! function(e, t, n, r, i, o, a) {
    e.GoogleAnalyticsObject = i;
    e[i] = e[i] || function() {
        (e[i].q = e[i].q || []).push(arguments)
    }, e[i].l = 1 * new Date;
    o = t.createElement(n), a = t.getElementsByTagName(n)[0];
    o.async = 1;
    o.src = r;
    a.parentNode.insertBefore(o, a)
}(window, document, "script", "www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-3769691-23", "render.githubusercontent.com");
ga("send", "pageview");

(function() {
    var e, t, n = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        r = [].slice;
    t = window.Render;
    t.JobQueue = e = function() {
        function e(e) {
            null == e && (e = {});
            this.run = n(this.run, this);
            this.queue = [];
            this.queueInterval = e.queueInterval || 16;
            this.batchSize = e.batchSize || 50
        }
        e.prototype.run = function(e) {
            var t, n, i, o, a;
            if (null != e) {
                0 === this.queue.length && setTimeout(this.run, 0);
                return this.queue.push(e)
            }
            for (i = n = 0, o = this.batchSize; o >= 0 ? o > n : n > o; i = o >= 0 ? ++n : --n) {
                if (!(this.queue.length > 0)) return;
                a = this.queue, t = a[0], this.queue = 2 <= a.length ? r.call(a, 1) : [];
                null != t && t()
            }
            return setTimeout(this.run, this.queueInterval)
        };
        return e
    }()
}).call(this);
*/

(function() {
    var e, t;
    t = window.Render;
    t.ModeSwitcher = e = function() {
        function e(e, t, n) {
            var r;
            this.callback = e;
            this.identifier = null != t ? t : ".js-view-modes";
            this.childIdentifier = null != n ? n : ".js-view-mode-item";
            r = $(this.identifier);
            r.length > 0 && r.children(this.childIdentifier).on("click", function(e) {
                return function(t) {
                    var n;
                    e.callback($(t.target).data("mode"));
                    r.children(e.childIdentifier).removeClass("active");
                    n = $(t.target);
                    return n.addClass("active")
                }
            }(this))
        }
        return e
    }()
}).call(this);


(function() {
    var e, t, n = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    t = window.Render;
    t.Slider = e = function() {
        function e(e, t) {
            this.callbacks = null != e ? e : {};
            null == t && (t = {});
            this.setDragger = n(this.setDragger, this);
            this.value = n(this.value, this);
            this.bindControls = n(this.bindControls, this);
            this.dragger = $(t.identifier || ".js-dragger");
            this.track = this.dragger.parent();
            this.container = this.track.parent();
            this.percentage = t.percentage || 50;
            this.bindControls();
            this.setDragger()
        }
        e.prototype.bindControls = function() {
            return this.dragger.on("mousedown", function(e) {
                return function(t) {
                    t.preventDefault();
                    $("body").css({
                        cursor: "pointer"
                    });
                    null != e.callbacks.mouseDown && e.callbacks.mouseDown();
                    $(document).on("mousemove.dragger", function(t) {
                        var n, r, i;
                        t.preventDefault();
                        i = 0;
                        r = e.track.width() - e.dragger.width();
                        n = t.clientX - e.track.offset().left;
                        i > n && (n = i);
                        n > r && (n = r);
                        e.dragger.css({
                            left: n
                        });
                        e.percentage = n / r * 100;
                        debug("Slider at " + e.percentage + "%");
                        return null != e.callbacks.slide ? e.callbacks.slide(e.percentage) : void 0
                    });
                    return $(document).on("mouseup.dragger", function() {
                        $(document).off(".dragger");
                        $("body").css({
                            cursor: "auto"
                        });
                        return null != e.callbacks.mouseUp ? e.callbacks.mouseUp() : void 0
                    })
                }
            }(this))
        };
        e.prototype.value = function() {
            return this.percentage
        };
        e.prototype.setDragger = function() {
            var e, t;
            t = this.track.width() - this.dragger.width();
            e = this.percentage / 100 * t;
            return this.dragger.css({
                left: e
            })
        };
        e.prototype.show = function() {
            this.container.show();
            return this.setDragger()
        };
        e.prototype.hide = function() {
            return this.container.hide()
        };
        return e
    }()
}).call(this);


(function() {
    var e, t, n, r = function(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        },
        i = [].slice,
        o = [].indexOf || function(e) {
            for (var t = 0, n = this.length; n > t; t++)
                if (t in this && this[t] === e) return t;
            return -1
        };
    n = window.Render;
    t = function(e) {
        return /^client:\/\//.exec(e)
    };
    n.Status = e = function() {
        function e(e, t) {
            var n;
            this.format = e;
            null == t && (t = {});
            this.navigateDirect = r(this.navigateDirect, this);
            this.navigateRelative = r(this.navigateRelative, this);
            this.navigateTo = r(this.navigateTo, this);
            this.handleLink = r(this.handleLink, this);
            this.haveParent = r(this.haveParent, this);
            this.handleMessage = r(this.handleMessage, this);
            this.handleCmd = r(this.handleCmd, this);
            this.handleData = r(this.handleData, this);
            this.submitTiming = r(this.submitTiming, this);
            this.requireAck = r(this.requireAck, this);
            this.onAck = r(this.onAck, this);
            this.onReady = r(this.onReady, this);
            this.sendInitial = r(this.sendInitial, this);
            if (null == this.format) throw new Error("Format not declared when Status was constructed.");
            window.location.hash.length && (this.identity = window.location.hash.substring(1));
            this.sentData = {
                have: [],
                waiting: []
            };
            this.messages = [{
                status: "constructor",
                payload: void 0,
                when: Date.now(),
                sent: !0
            }];
            this.acked = !1;
            $(window).on("message", this.handleMessage);
            t.noLinks || $(document).on("click", "a", this.handleLink);
            n = t.initial || "hello";
            this.sendInitial(n, 10, 1e3)
        }
        e.prototype.sendInitial = function(e, t, n) {
            null == t && (t = 10);
            null == n && (n = 1e3);
            if (!this.acked && (t -= 1) >= 0) {
                setTimeout(function(r) {
                    return function() {
                        return r.sendInitial(e, t, n)
                    }
                }(this), n);
                debug("Sending hello. Will try again " + t + " more times in 1 second until ack'd");
                return this.set(e)
            }
        };
        e.prototype.load = function(e, n) {
            null == n.setStatus && (n.setStatus = !0);
            null == n.attempts && (n.attempts = 1);
            null == n.before && (n.before = function(e, t) {});
            null == n.success && (n.success = function(e) {
                return function(t, r) {
                    return n.setStatus ? e.set("loaded") : void 0
                }
            }(this));
            null == n.error && (n.error = function(e) {
                return function(t, r) {
                    return n.setStatus ? e.set("error") : void 0
                }
            }(this));
            null == n.timeout && (n.timeout = 3e4);
            n.setStatus && this.set("loading");
            return t(e) ? this.loadClient(e, n) : this.loadHttp(e, n)
        };
        e.prototype.set = function(e, t) {
            var n, r, i, o;
            null == t && (t = {});
            o = this.alreadySentStatus(e);
            r = {
                status: e,
                payload: t,
                when: Date.now(),
                sent: !1
            };
            if (null != o && ("hello" === (i = !e) || "resize" === i)) {
                n = Math.abs(Date.now() - o.when);
                return debug("Already set status '" + e + "' " + n + "ms ago")
            }
            o && "hello" === e || this.messages.push(r);
            "ready" === e && this.onReady();
            if (!this.requireAck(e)) {
                r.sent = !0;
                return this.post({
                    type: "render",
                    body: e,
                    payload: t
                })
            }
        };
        e.prototype.alreadySentStatus = function(e) {
            var t;
            t = this.messages.filter(function(t) {
                return function(t) {
                    return t.status === e
                }
            }(this));
            return t[0]
        };
        e.prototype.get = function() {
            return this.messages[this.messages.length - 1].status
        };
        e.prototype.prepareData = function(e, t) {
            var n, r;
            r = e;
            if (t.json && "string" == typeof e) try {
                r = JSON.parse(e)
            } catch (i) {
                n = i;
                debug("Error while trying to parse initial JSON: " + n);
                debug("Attempting to parse htmlDecoded JSON");
                r = JSON.parse(_.unescape(e))
            }
            return r
        };
        e.prototype.loadClient = function(e, n) {
            var r, o, a, s;
            if (!t(e)) throw new Error("Not a client URL: " + e);
            a = this.sentData.have, o = a[0], s = 2 <= a.length ? i.call(a, 1) : [];
            this.sentData.have = s;
            if (null != o) {
                n.before(void 0, n);
                n.setStatus && this.set("loaded");
                return n.success(this.prepareData(o, n))
            }
            n.before(void 0, n);
            r = {
                timeout: n.timeout,
                created: Date.now(),
                success: function(e) {
                    return function(t) {
                        return n.success(e.prepareData(t, n))
                    }
                }(this),
                error: n.error
            };
            this.sentData.waiting.push(r);
            return null != r.timeout ? setTimeout(function(e) {
                return function() {
                    var t;
                    t = e.sentData.waiting.indexOf(r);
                    if (-1 !== t) {
                        e.sentData.waiting = e.sentData.waiting.slice(0, t).concat(e.sentData.waiting.slice(t + 1));
                        n.setStatus && e.set("error");
                        return r.error(new Error("Timeout " + r.timeout + "ms"))
                    }
                }
            }(this), r.timeout) : void 0
        };
        e.prototype.loadHttpIe = function(e, t) {
            var n, r, i, o, a;
            $.support.cors = !0;
            a = new XDomainRequest;
            i = function(e) {
                return function() {
                    var n;
                    n = a.responseText;
                    t.setStatus && e.set("loaded");
                    return t.success(e.prepareData(n, t), a)
                }
            }(this);
            o = function(e) {
                return function() {
                    return r("Request timed out after " + option.timeout + "ms")
                }
            }(this);
            n = function(e) {
                return function() {
                    return r("Crossdomain request failed.")
                }
            }(this);
            r = function(n) {
                return function(r) {
                    t.attempts -= 1;
                    if (t.attempts > 0) {
                        debug("Request didn't work, going to retry up to " + t.attempts + " more times");
                        return setTimeout(function() {
                            return n.loadHttpIE(e, t)
                        }, 1e3)
                    }
                    t.setStatus && n.set("error");
                    return t.error(new Error(r), a)
                }
            }(this);
            a.onload = i;
            a.ontimeout = o;
            a.onerror = n;
            a.timeout = t.timeout || 5e3;
            a.open("get", e);
            return a.send()
        };
        e.prototype.loadHttp = function(e, t) {
            return null != window.XDomainRequest ? this.loadHttpIe(e, t) : $.ajax({
                url: e,
                crossDomain: !0,
                method: "GET",
                timeout: t.timeout,
                beforeSend: t.before,
                success: function(e) {
                    return function(n, r, i) {
                        n = e.prepareData(n, t);
                        t.setStatus && e.set("loaded");
                        return t.success(n, i)
                    }
                }(this),
                error: function(n) {
                    return function(r, i, o) {
                        t.attempts -= 1;
                        if (t.attempts > 0) {
                            debug("Couldn't load, going to retry up to " + t.attempts + " more times");
                            return setTimeout(function() {
                                return n.loadHttp(e, t)
                            }, 1e3)
                        }
                        t.setStatus && n.set("error");
                        return t.error(o, r)
                    }
                }(this)
            })
        };
        e.prototype.post = function(e) {
            null == e.identity && (e.identity = this.identity);
            if (this.haveParent()) {
                debug("Render Status:", e);
                return window.parent.postMessage(JSON.stringify(e), "*")
            }
            return debug("WARNING: No window.parent: postMessage:", e)
        };
        e.prototype.onReady = function() {
            var e, t, n, r, i, o;
            i = {};
            o = this.messages;
            t = function(e) {
                return i[e.status] = e.when
            };
            for (n = 0, r = o.length; r > n; n++) {
                e = o[n];
                t(e)
            }
            return this.submitTiming("local", i)
        };
        e.prototype.onAck = function() {
            var e, t, n, r, i;
            debug("Ack'd, sending saved messages");
            this.acked = !0;
            r = this.messages;
            i = [];
            for (e = 0, t = r.length; t > e; e++) {
                n = r[e];
                if (n.sent) i.push(void 0);
                else {
                    n.sent = !0;
                    i.push(this.post({
                        type: "render",
                        body: n.status,
                        payload: n.payload
                    }))
                }
            }
            return i
        };
        e.prototype.requireAck = function(e) {
            null == e && (e = "");
            return !this.acked && "hello" !== e
        };
        e.prototype.submitTiming = function(e, t) {
            var n;
            debug("Got " + e + " timing: " + this.format + " => " + JSON.stringify(t));
            n = $("body").data("render-url");
            return $.ajax({
                type: "POST",
                data: {
                    timing: t
                },
                url: n + "/stats/timing/" + e + "/" + this.format + "/",
                success: function(t) {
                    return function(t, n, r) {
                        return debug("Sent " + e + " timing info:", t)
                    }
                }(this),
                error: function(e) {
                    return function(e, t, n) {
                        return debug("Failed to send remote timing info:", n)
                    }
                }(this)
            })
        };
        e.prototype.handleData = function(e) {
            var t, n, r;
            if (this.sentData.waiting.length) {
                n = this.sentData.waiting, t = n[0], r = 2 <= n.length ? i.call(n, 1) : [];
                this.sentData.waiting = r;
                this.set("loaded");
                return t.success(e)
            }
            return this.sentData.have.push(e)
        };
        e.prototype.handleCmd = function(e, t) {
            switch (e) {
                case "branding":
                    return $(document.body).removeClass("is-embedded", t);
                case "ack":
                    if (this.requireAck()) return this.onAck();
                    break;
                default:
                    return debug("Invalid command '" + e + "':", t)
            }
        };
        e.prototype.handleMessage = function(e) {
            var t, n, r, i, o, a, s, u, l, c, f, d, h;
            a = $("body").data("github-hostname");
            h = new RegExp("." + a + "$");
            l = e.originalEvent, i = l.data, u = l.origin;
            if (i && u && (h.test(u) || "github.com" === u.toLowerCase())) {
                c = function() {
                    try {
                        return JSON.parse(i)
                    } catch (t) {
                        e = t;
                        return i
                    }
                }(), d = c.type, s = c.identity, n = c.body;
                if (d && n) {
                    if (null != s && s !== this.identity) return debug("Message has identity '" + s + "' != '" + this.identity + "', which is mine");
                    switch (d) {
                        case "render:timing":
                            f = n.timing, o = n.format;
                            return f && o ? o !== this.format ? debug("Format mismatch: got '" + o + "' expected '" + this.format + "'") : this.submitTiming("remote", f) : debug("Malformed timing message:", n);
                        case "render:cmd":
                            r = n.cmd;
                            t = n[r];
                            if (null != r && null != t) return this.handleCmd(r, t);
                            break;
                        case "render:data":
                            return this.handleData(n);
                        default:
                            return debug("Unknown message type: " + d)
                    }
                }
            }
        };
        e.prototype.haveParent = function() {
            return window.parent !== window
        };
        e.prototype.handleLink = function(e) {
            var t, n, r, i;
            t = $(e.target);
            i = t.attr("href");
            if (null != i ? i.length : void 0) {
                if (i.match(/^\#/)) return !0;
                e.preventDefault();
                try {
                    return this.navigateTo(i)
                } catch (o) {
                    e = o;
                    debug("Navigation to '" + i + "' failed:", e);
                    n = "failed";
                    r = 500;
                    t.addClass(n);
                    return setTimeout(function() {
                        return t.removeClass(n)
                    }, r)
                }
            }
        };
        e.prototype.navigateTo = function(e) {
            return e.match(/^https?:\/\//) || e.match(/^\/\//) ? this.navigateDirect(e) : this.navigateRelative(e)
        };
        e.prototype.navigateRelative = function(e) {
            var t, n, r, i, a, s, u, l;
            t = $(".js-render-shell");
            u = $("body").data("github-hostname");
            a = t.data("document-nwo");
            r = t.data("document-commit");
            s = t.data("document-path");
            n = function() {
                return e.match(/^\//) ? "" : o.call(s, "/") < 0 ? "/" : "/" + s.slice(0, +s.lastIndexOf("/") + 1 || 9e9)
            };
            if (!((null != u ? u.length : void 0) && (null != a ? a.length : void 0) && (null != s ? s.length : void 0) && (null != r ? r.length : void 0))) {
                i = "Cannot construct relative link, missing:";
                (null != u ? u.length : void 0) || (i += " root");
                (null != a ? a.length : void 0) || (i += " nwo");
                (null != s ? s.length : void 0) || (i += " path");
                (null != r ? r.length : void 0) || (i += " commit");
                throw new Error(i)
            }
            l = "//" + u + "/" + a + "/blob/" + r + n() + e;
            return this.navigateDirect(l)
        };
        e.prototype.navigateDirect = function(e) {
            return this.haveParent() ? window.top.location.href = e : window.location.href = e
        };
        return e
    }()
}).call(this);


(function() {
    var e;
    null == (e = window.GitHub).IMG && (e.IMG = {})
}).call(this);


(function() {
    var e, t = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    e = window.GitHub.IMG;
    e.Viewer = function() {
        function n(e, n) {
            var r;
            this.shell = e;
            this.status = n;
            this.fetch = t(this.fetch, this);
            this.status.set("loading");
            this.image = new Image;
            r = this.shell.data("image");
            this.encode = this.shell.data("encode");
            this.fetch(r)
        }
        n.prototype.imagePadding = 60;
        n.prototype.fetch = function(t) {
            debug("Attempting to load URL: [" + t + "]");
            return this.status.load(t, {
                attempts: 10,
                success: function(n) {
                    return function(r, i) {
                        if (n.encode) {
                            n.image.src = "data:image/svg+xml;base64," + base64EncArr(strToUTF8Arr(r));
                            n.image.onload = function() {
                                var t;
                                n.shell.append(n.image);
                                if (t = e.svgDefaultSizeIfUndefined(r)) {
                                    n.image.height = t.height;
                                    n.image.width = t.width
                                }
                                return n.status.set("ready", {
                                    height: n.imageHeightAfterResize(n.image) + n.imagePadding
                                })
                            }
                        } else {
                            n.image.src = t;
                            n.image.onload = function() {
                                n.shell.append(n.image);
                                return n.status.set("ready", {
                                    height: n.imageHeightAfterResize(n.image) + n.imagePadding
                                })
                            }
                        }
                        return n.image.onerror = function() {
                            return n.encode ? n.status.set("error:invalid") : void 0
                        }
                    }
                }(this)
            })
        };
        n.prototype.imageHeightAfterResize = function(e) {
            var t, n, r;
            t = function(t) {
                var n, r, i, o;
                null == t && (t = 600);
                r = function() {
                    try {
                        return $(".render-shell").width()
                    } catch (e) {}
                }();
                n = function() {
                    try {
                        return $(e).css("width")
                    } catch (t) {}
                }();
                o = parseInt(n);
                debug("imageHeightAfterResize: cssWidth:[" + n + "] parsedWidth:[" + o + "]");
                if (null == n || isNaN(o)) return t;
                i = Math.min(r, o);
                if ("%" === n.slice(-1)) {
                    debug("imageHeightAfterResize: Using a %: " + o + " of " + r);
                    return null == r ? t : r * (o / 100)
                }
                return 0 >= i ? t : i
            };
            n = t();
            debug("imageHeightAfterResize: maxWidth: " + n + " vs width: " + e.width + " height: " + e.height);
            e.height || (e.height = n);
            if (e.width <= n) {
                debug("Already resized, returning current height");
                return e.height
            }
            r = n / e.width;
            debug("Scaling height by " + r + " to " + e.height + " & " + r);
            return e.height * r
        };
        return n
    }()
}).call(this);


(function() {
    var e, t = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    };
    e = window.GitHub.IMG;
    e.Diff = function() {
        function n(e, n) {
            var r, i;
            this.shell = e;
            this.status = n;
            this.switchMode = t(this.switchMode, this);
            this.initOnion = t(this.initOnion, this);
            this.initSwipe = t(this.initSwipe, this);
            this.initTwoUp = t(this.initTwoUp, this);
            this.initViews = t(this.initViews, this);
            this.reInit = t(this.reInit, this);
            this.setReadyIfLoaded = t(this.setReadyIfLoaded, this);
            this.fetch = t(this.fetch, this);
            r = this.shell.data("file1");
            i = this.shell.data("file2");
            this.encode = this.shell.data("encode");
            this.fetch(r, "deleted");
            this.fetch(i, "added");
            new window.Render.ModeSwitcher(this.switchMode);
            this.shell.on("click", function(e) {
                return function() {
                    return e.clicked = !0
                }
            }(this));
            this.switchMode("two-up")
        }
        n.prototype.clicked = !1;
        n.prototype.shellWidth = 858;
        n.prototype.loaded = {
            added: !1,
            deleted: !1
        };
        n.prototype.fetch = function(t, n) {
            debug("Attempting to load URL: [" + t + "]");
            return this.status.load(t, {
                attempts: 10,
                success: function(r) {
                    return function(i, o) {
                        var a, s, u, l, c, f, d;
                        r.images = $("img." + n);
                        f = r.images;
                        d = [];
                        for (u = 0, c = f.length; c > u; u++) {
                            l = f[u];
                            if (r.encode) {
                                s = "data:image/svg+xml;base64," + base64EncArr(strToUTF8Arr(i));
                                l.src = s;
                                if (a = e.svgDefaultSizeIfUndefined(i)) {
                                    l.height = a.height;
                                    l.width = a.width
                                }
                                $("." + n + "-meta").text("")
                            } else l.src = t;
                            l.onload = function() {
                                r.loaded[n] = l;
                                return r.setReadyIfLoaded()
                            };
                            d.push(l.onerror = function() {
                                return r.encode ? r.status.set("error:invalid") : void 0
                            })
                        }
                        return d
                    }
                }(this)
            })
        };
        n.prototype.setReadyIfLoaded = function() {
            var e, t, n, r;
            e = !0;
            t = this.loaded;
            for (r in t) {
                n = t[r];
                e = e && n
            }
            return e ? this.initViews() : void 0
        };
        n.prototype.reInit = function(e) {
            null == e && (e = 100);
            if (!this.clicked) {
                this.switchMode("two-up");
                if (1e4 > e) return setTimeout(function(t) {
                    return function() {
                        return t.reInit(2 * e)
                    }
                }(this), 2 * e)
            }
        };
        n.prototype.initViews = function() {
            var e, t;
            e = $(".added");
            t = $(".deleted");
            this.initTwoUp(e[0], t[0]);
            this.initSwipe(e[1], t[1]);
            this.initOnion(e[2], t[2]);
            this.status.set("ready");
            return setTimeout(this.reInit, 100)
        };
        n.prototype.initTwoUp = function(e, t) {
            var n, r, i, o, a, s, u;
            s = {
                added: {
                    width: e.width,
                    height: e.height
                },
                deleted: {
                    width: t.width,
                    height: t.height
                },
                addedImage: $(e),
                deletedImage: $(t)
            };
            a = {
                height: Math.max(s.deleted.height, s.added.height),
                width: Math.max(s.deleted.width, s.added.width)
            };
            n = Math.floor(a.width - s.added.width) / 2;
            r = Math.floor(a.height - s.added.height) / 2;
            i = Math.floor(a.width - s.deleted.width) / 2;
            o = Math.floor(a.height - s.deleted.height) / 2;
            u = 1;
            a.width > (this.shellWidth - 30) / 2 && (u = (this.shellWidth - 30) / 2 / a.width);
            $(".added-meta .height").text(s.addedImage[0].naturalHeight + "px");
            $(".deleted-meta .height").text(s.deletedImage[0].naturalHeight + "px");
            $(".added-meta .width").text(s.addedImage[0].naturalWidth + "px");
            $(".deleted-meta .width").text(s.deletedImage[0].naturalWidth + "px");
            if (s.addedImage[0].naturalHeight !== s.deletedImage[0].naturalHeight) {
                $(".added-meta .height").addClass("changed");
                $(".deleted-meta .height").addClass("changed")
            }
            if (s.addedImage[0].naturalWidth !== s.deletedImage[0].naturalWidth) {
                $(".added-meta .width").addClass("changed");
                $(".deleted-meta .width").addClass("changed")
            }
            s.addedImage.css({
                width: s.added.width * u,
                height: s.added.height * u
            });
            s.deletedImage.css({
                width: s.deleted.width * u,
                height: s.deleted.height * u
            });
            s.addedImage.parent().css({
                margin: r * u + "px " + n * u + "px",
                width: s.added.width * u + 2,
                height: s.added.height * u + 2
            });
            return s.deletedImage.parent().css({
                margin: o * u + "px " + i * u + "px",
                width: s.deleted.width * u + 2,
                height: s.deleted.height * u + 2
            })
        };
        n.prototype.initSwipe = function(e, t) {
            var n, r, i, o, a, s, u;
            s = {
                added: {
                    width: e.width,
                    height: e.height
                },
                deleted: {
                    width: t.width,
                    height: t.height
                },
                addedImage: $(e),
                deletedImage: $(t)
            };
            a = {
                height: Math.max(s.deleted.height, s.added.height),
                width: Math.max(s.deleted.width, s.added.width)
            };
            n = Math.floor(a.width - s.added.width) / 2;
            r = Math.floor(a.height - s.added.height) / 2;
            i = Math.floor(a.width - s.deleted.width) / 2;
            o = Math.floor(a.height - s.deleted.height) / 2;
            u = 1;
            a.width > this.shellWidth - 12 && (u = (this.shellWidth - 12) / a.width);
            s.addedImage.css({
                width: s.added.width * u,
                height: s.added.height * u
            });
            s.deletedImage.css({
                width: s.deleted.width * u,
                height: s.deleted.height * u
            });
            s.addedImage.parent().css({
                margin: "0px " + n * u + "px",
                width: s.added.width * u + 2,
                height: s.added.height * u + 2
            });
            s.deletedImage.parent().css({
                margin: o * u + "px " + i * u + "px",
                width: s.deleted.width * u + 2,
                height: s.deleted.height * u + 2
            });
            s.deletedImage.parent().parent().css({
                width: a.width * u + 2,
                height: a.height * u + 2
            });
            s.addedImage.parent().parent().css({
                padding: r * u + "px 0 0 0",
                width: a.width * u + 2,
                height: a.height * u - r * u + 4
            });
            $(".swipe").css({
                width: a.width * u + 2,
                height: a.height * u + 4
            });
            return $(".swipe-bar").on("mousedown", function(e) {
                return function(e) {
                    var t, n, r, i;
                    e.preventDefault();
                    i = $(".swipe-bar");
                    t = i.parent();
                    r = 0;
                    n = t.width() - i.width();
                    $("body").css({
                        cursor: "pointer"
                    });
                    return $(document).on("mousemove.swipe", function(e) {
                        var r;
                        e.preventDefault();
                        r = e.clientX - t.offset().left;
                        0 > r && (r = 0);
                        r > n && (r = n);
                        i.css({
                            left: r
                        });
                        $(".swipe-shell").css({
                            width: $(".swipe-frame").width() - r
                        });
                        return $(document).on("mouseup.swipe", function(e) {
                            $(document).off(".swipe");
                            return $("body").css({
                                cursor: "auto"
                            })
                        })
                    })
                }
            }(this))
        };
        n.prototype.initOnion = function(e, t) {
            var n, r, i, o, a, s, u;
            s = {
                added: {
                    width: e.width,
                    height: e.height
                },
                deleted: {
                    width: t.width,
                    height: t.height
                },
                addedImage: $(e),
                deletedImage: $(t)
            };
            a = {
                height: Math.max(s.deleted.height, s.added.height),
                width: Math.max(s.deleted.width, s.added.width)
            };
            n = Math.floor(a.width - s.added.width) / 2;
            r = Math.floor(a.height - s.added.height) / 2;
            i = Math.floor(a.width - s.deleted.width) / 2;
            o = Math.floor(a.height - s.deleted.height) / 2;
            u = 1;
            a.width > this.shellWidth - 12 && (u = (this.shellWidth - 12) / a.width);
            s.addedImage.css({
                width: s.added.width * u,
                height: s.added.height * u
            });
            s.deletedImage.css({
                width: s.deleted.width * u,
                height: s.deleted.height * u
            });
            s.addedImage.parent().css({
                margin: r * u + "px " + n * u + "px",
                width: s.added.width * u + 2,
                height: s.added.height * u + 2
            });
            s.deletedImage.parent().css({
                margin: o * u + "px " + i * u + "px",
                width: s.deleted.width * u + 2,
                height: s.deleted.height * u + 2
            });
            s.deletedImage.parent().parent().css({
                width: a.width * u + 2,
                height: a.height * u + 2
            });
            $(".onion-skin").css({
                width: a.width * u + 2,
                height: a.height * u + 4
            });
            return this.slider = new window.Render.Slider({
                slide: function(e) {
                    return function(e) {
                        return s.addedImage.parent().css({
                            opacity: e / 100
                        })
                    }
                }(this)
            }, {
                percentage: 100
            })
        };
        n.prototype.switchMode = function(e) {
            var t;
            $(".view").hide();
            t = $(".render-bar").outerHeight();
            t += 40;
            "swipe" === e ? t += 14 : "onion-skin" === e && (t += 45);
            if ("two-up" !== e && "swipe" !== e && "onion-skin" !== e) return debug("Unknown mode!");
            e = "." + e;
            $(e).show();
            this.status.set("resize", {
                height: $(e).height() + t
            });
            return null != this.slider ? this.slider.setDragger() : void 0
        };
        return n
    }()
}).call(this);


(function() {
    var e;
    e = window.GitHub.IMG;
    e.ImgRenderer = function() {
        function t() {
            this.shell = $(".js-render-shell div");
            this.diffing = "diff" === this.shell.data("type");
            this.diffing ? new e.Diff(this.shell, this.status) : new e.Viewer(this.shell, this.status)
        }
        t.prototype.status = new window.Render.Status("img");
        return t
    }();
    e.svgDefaultSizeIfUndefined = function(e) {
        return function(e) {
            var t, n, r, i, o, a, s;
            i = /<svg[^>]*(width|height)\s*=\s*['"]?(\d+(\s*(px|%))?)["']?[^>]+(width|height)\s*=\s*['"]?(\d+(\s*(px|%))?)['"]?[^>]*>/i;
            a = e.match(i);
            if (null == a || "%" === a[3]) {
                o = new Image;
                n = "data:image/svg+xml;base64," + base64EncArr(strToUTF8Arr(e));
                o.src = n;
                r = Math.pow(2, 32) - 1;
                if (o.height > 1 && o.width > 1 && o.height < r && o.width < r) {
                    debug("Returning browser based SVG dimensions: " + o.height + " by " + o.width);
                    return {
                        height: o.height,
                        width: o.width
                    }
                }
                s = /<svg[^>]*viewbox\s*=\s*['"]?(-?\d+)\s*\,?\s*(-?\d+)\s*\,?\s*(\d+)\s*\,?\s*(\d+)\s*\,?\s*["']?[^>]*>/i;
                a = e.match(s);
                if (a && a[3] && a[4]) {
                    t = parseFloat(a[3]) / parseFloat(a[4]);
                    debug("Returning viewbox based SVG dimensions");
                    return {
                        height: 300,
                        width: 300 * t
                    }
                }
                debug("Returning arbitrary SVG dimensions");
                return {
                    height: 300,
                    width: 300
                }
            }
        }
    }(this);
    $(function() {
        return new e.ImgRenderer
    })
}).call(this);