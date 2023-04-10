/*!
 * vue-qrcode v1.0.2
 * https://fengyuanchen.github.io/vue-qrcode
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-01-18T06:04:33.222Z
 */
function sr() {
  throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs");
}
function mr(tr, rr) {
  return rr = { exports: {} }, tr(rr, rr.exports), rr.exports;
}
var dr = mr(function(tr, rr) {
  (function(m) {
    tr.exports = m();
  })(function() {
    return function() {
      function m(_, c, p) {
        function s(u, f) {
          if (!c[u]) {
            if (!_[u]) {
              var n = typeof sr == "function" && sr;
              if (!f && n)
                return n(u, !0);
              if (a)
                return a(u, !0);
              var d = new Error("Cannot find module '" + u + "'");
              throw d.code = "MODULE_NOT_FOUND", d;
            }
            var w = c[u] = { exports: {} };
            _[u][0].call(w.exports, function(C) {
              var b = _[u][1][C];
              return s(b || C);
            }, w, w.exports, m, _, c, p);
          }
          return c[u].exports;
        }
        for (var a = typeof sr == "function" && sr, i = 0; i < p.length; i++)
          s(p[i]);
        return s;
      }
      return m;
    }()({ 1: [function(m, _, c) {
      _.exports = function() {
        return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
      };
    }, {}], 2: [function(m, _, c) {
      var p = m("./utils").getSymbolSize;
      c.getRowColCoords = function(a) {
        if (a === 1)
          return [];
        for (var i = Math.floor(a / 7) + 2, u = p(a), f = u === 145 ? 26 : Math.ceil((u - 13) / (2 * i - 2)) * 2, n = [u - 7], d = 1; d < i - 1; d++)
          n[d] = n[d - 1] - f;
        return n.push(6), n.reverse();
      }, c.getPositions = function(a) {
        for (var i = [], u = c.getRowColCoords(a), f = u.length, n = 0; n < f; n++)
          for (var d = 0; d < f; d++)
            n === 0 && d === 0 || // top-left
            n === 0 && d === f - 1 || // bottom-left
            n === f - 1 && d === 0 || i.push([u[n], u[d]]);
        return i;
      };
    }, { "./utils": 21 }], 3: [function(m, _, c) {
      var p = m("./mode"), s = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
      ];
      function a(i) {
        this.mode = p.ALPHANUMERIC, this.data = i;
      }
      a.getBitsLength = function(u) {
        return 11 * Math.floor(u / 2) + 6 * (u % 2);
      }, a.prototype.getLength = function() {
        return this.data.length;
      }, a.prototype.getBitsLength = function() {
        return a.getBitsLength(this.data.length);
      }, a.prototype.write = function(u) {
        var f;
        for (f = 0; f + 2 <= this.data.length; f += 2) {
          var n = s.indexOf(this.data[f]) * 45;
          n += s.indexOf(this.data[f + 1]), u.put(n, 11);
        }
        this.data.length % 2 && u.put(s.indexOf(this.data[f]), 6);
      }, _.exports = a;
    }, { "./mode": 14 }], 4: [function(m, _, c) {
      function p() {
        this.buffer = [], this.length = 0;
      }
      p.prototype = {
        get: function(s) {
          var a = Math.floor(s / 8);
          return (this.buffer[a] >>> 7 - s % 8 & 1) === 1;
        },
        put: function(s, a) {
          for (var i = 0; i < a; i++)
            this.putBit((s >>> a - i - 1 & 1) === 1);
        },
        getLengthInBits: function() {
          return this.length;
        },
        putBit: function(s) {
          var a = Math.floor(this.length / 8);
          this.buffer.length <= a && this.buffer.push(0), s && (this.buffer[a] |= 128 >>> this.length % 8), this.length++;
        }
      }, _.exports = p;
    }, {}], 5: [function(m, _, c) {
      var p = m("../utils/buffer");
      function s(a) {
        if (!a || a < 1)
          throw new Error("BitMatrix size must be defined and greater than 0");
        this.size = a, this.data = p.alloc(a * a), this.reservedBit = p.alloc(a * a);
      }
      s.prototype.set = function(a, i, u, f) {
        var n = a * this.size + i;
        this.data[n] = u, f && (this.reservedBit[n] = !0);
      }, s.prototype.get = function(a, i) {
        return this.data[a * this.size + i];
      }, s.prototype.xor = function(a, i, u) {
        this.data[a * this.size + i] ^= u;
      }, s.prototype.isReserved = function(a, i) {
        return this.reservedBit[a * this.size + i];
      }, _.exports = s;
    }, { "../utils/buffer": 28 }], 6: [function(m, _, c) {
      var p = m("../utils/buffer"), s = m("./mode");
      function a(i) {
        this.mode = s.BYTE, this.data = p.from(i);
      }
      a.getBitsLength = function(u) {
        return u * 8;
      }, a.prototype.getLength = function() {
        return this.data.length;
      }, a.prototype.getBitsLength = function() {
        return a.getBitsLength(this.data.length);
      }, a.prototype.write = function(i) {
        for (var u = 0, f = this.data.length; u < f; u++)
          i.put(this.data[u], 8);
      }, _.exports = a;
    }, { "../utils/buffer": 28, "./mode": 14 }], 7: [function(m, _, c) {
      var p = m("./error-correction-level"), s = [
        // L  M  Q  H
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        4,
        1,
        2,
        4,
        4,
        2,
        4,
        4,
        4,
        2,
        4,
        6,
        5,
        2,
        4,
        6,
        6,
        2,
        5,
        8,
        8,
        4,
        5,
        8,
        8,
        4,
        5,
        8,
        11,
        4,
        8,
        10,
        11,
        4,
        9,
        12,
        16,
        4,
        9,
        16,
        16,
        6,
        10,
        12,
        18,
        6,
        10,
        17,
        16,
        6,
        11,
        16,
        19,
        6,
        13,
        18,
        21,
        7,
        14,
        21,
        25,
        8,
        16,
        20,
        25,
        8,
        17,
        23,
        25,
        9,
        17,
        23,
        34,
        9,
        18,
        25,
        30,
        10,
        20,
        27,
        32,
        12,
        21,
        29,
        35,
        12,
        23,
        34,
        37,
        12,
        25,
        34,
        40,
        13,
        26,
        35,
        42,
        14,
        28,
        38,
        45,
        15,
        29,
        40,
        48,
        16,
        31,
        43,
        51,
        17,
        33,
        45,
        54,
        18,
        35,
        48,
        57,
        19,
        37,
        51,
        60,
        19,
        38,
        53,
        63,
        20,
        40,
        56,
        66,
        21,
        43,
        59,
        70,
        22,
        45,
        62,
        74,
        24,
        47,
        65,
        77,
        25,
        49,
        68,
        81
      ], a = [
        // L  M  Q  H
        7,
        10,
        13,
        17,
        10,
        16,
        22,
        28,
        15,
        26,
        36,
        44,
        20,
        36,
        52,
        64,
        26,
        48,
        72,
        88,
        36,
        64,
        96,
        112,
        40,
        72,
        108,
        130,
        48,
        88,
        132,
        156,
        60,
        110,
        160,
        192,
        72,
        130,
        192,
        224,
        80,
        150,
        224,
        264,
        96,
        176,
        260,
        308,
        104,
        198,
        288,
        352,
        120,
        216,
        320,
        384,
        132,
        240,
        360,
        432,
        144,
        280,
        408,
        480,
        168,
        308,
        448,
        532,
        180,
        338,
        504,
        588,
        196,
        364,
        546,
        650,
        224,
        416,
        600,
        700,
        224,
        442,
        644,
        750,
        252,
        476,
        690,
        816,
        270,
        504,
        750,
        900,
        300,
        560,
        810,
        960,
        312,
        588,
        870,
        1050,
        336,
        644,
        952,
        1110,
        360,
        700,
        1020,
        1200,
        390,
        728,
        1050,
        1260,
        420,
        784,
        1140,
        1350,
        450,
        812,
        1200,
        1440,
        480,
        868,
        1290,
        1530,
        510,
        924,
        1350,
        1620,
        540,
        980,
        1440,
        1710,
        570,
        1036,
        1530,
        1800,
        570,
        1064,
        1590,
        1890,
        600,
        1120,
        1680,
        1980,
        630,
        1204,
        1770,
        2100,
        660,
        1260,
        1860,
        2220,
        720,
        1316,
        1950,
        2310,
        750,
        1372,
        2040,
        2430
      ];
      c.getBlocksCount = function(u, f) {
        switch (f) {
          case p.L:
            return s[(u - 1) * 4 + 0];
          case p.M:
            return s[(u - 1) * 4 + 1];
          case p.Q:
            return s[(u - 1) * 4 + 2];
          case p.H:
            return s[(u - 1) * 4 + 3];
          default:
            return;
        }
      }, c.getTotalCodewordsCount = function(u, f) {
        switch (f) {
          case p.L:
            return a[(u - 1) * 4 + 0];
          case p.M:
            return a[(u - 1) * 4 + 1];
          case p.Q:
            return a[(u - 1) * 4 + 2];
          case p.H:
            return a[(u - 1) * 4 + 3];
          default:
            return;
        }
      };
    }, { "./error-correction-level": 8 }], 8: [function(m, _, c) {
      c.L = { bit: 1 }, c.M = { bit: 0 }, c.Q = { bit: 3 }, c.H = { bit: 2 };
      function p(s) {
        if (typeof s != "string")
          throw new Error("Param is not a string");
        var a = s.toLowerCase();
        switch (a) {
          case "l":
          case "low":
            return c.L;
          case "m":
          case "medium":
            return c.M;
          case "q":
          case "quartile":
            return c.Q;
          case "h":
          case "high":
            return c.H;
          default:
            throw new Error("Unknown EC Level: " + s);
        }
      }
      c.isValid = function(a) {
        return a && typeof a.bit < "u" && a.bit >= 0 && a.bit < 4;
      }, c.from = function(a, i) {
        if (c.isValid(a))
          return a;
        try {
          return p(a);
        } catch {
          return i;
        }
      };
    }, {}], 9: [function(m, _, c) {
      var p = m("./utils").getSymbolSize, s = 7;
      c.getPositions = function(i) {
        var u = p(i);
        return [
          // top-left
          [0, 0],
          // top-right
          [u - s, 0],
          // bottom-left
          [0, u - s]
        ];
      };
    }, { "./utils": 21 }], 10: [function(m, _, c) {
      var p = m("./utils"), s = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0, a = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1, i = p.getBCHDigit(s);
      c.getEncodedBits = function(f, n) {
        for (var d = f.bit << 3 | n, w = d << 10; p.getBCHDigit(w) - i >= 0; )
          w ^= s << p.getBCHDigit(w) - i;
        return (d << 10 | w) ^ a;
      };
    }, { "./utils": 21 }], 11: [function(m, _, c) {
      var p = m("../utils/buffer"), s = p.alloc(512), a = p.alloc(256);
      (function() {
        for (var u = 1, f = 0; f < 255; f++)
          s[f] = u, a[u] = f, u <<= 1, u & 256 && (u ^= 285);
        for (f = 255; f < 512; f++)
          s[f] = s[f - 255];
      })(), c.log = function(u) {
        if (u < 1)
          throw new Error("log(" + u + ")");
        return a[u];
      }, c.exp = function(u) {
        return s[u];
      }, c.mul = function(u, f) {
        return u === 0 || f === 0 ? 0 : s[a[u] + a[f]];
      };
    }, { "../utils/buffer": 28 }], 12: [function(m, _, c) {
      var p = m("./mode"), s = m("./utils");
      function a(i) {
        this.mode = p.KANJI, this.data = i;
      }
      a.getBitsLength = function(u) {
        return u * 13;
      }, a.prototype.getLength = function() {
        return this.data.length;
      }, a.prototype.getBitsLength = function() {
        return a.getBitsLength(this.data.length);
      }, a.prototype.write = function(i) {
        var u;
        for (u = 0; u < this.data.length; u++) {
          var f = s.toSJIS(this.data[u]);
          if (f >= 33088 && f <= 40956)
            f -= 33088;
          else if (f >= 57408 && f <= 60351)
            f -= 49472;
          else
            throw new Error(
              "Invalid SJIS character: " + this.data[u] + `
Make sure your charset is UTF-8`
            );
          f = (f >>> 8 & 255) * 192 + (f & 255), i.put(f, 13);
        }
      }, _.exports = a;
    }, { "./mode": 14, "./utils": 21 }], 13: [function(m, _, c) {
      c.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var p = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      c.isValid = function(i) {
        return i != null && i !== "" && !isNaN(i) && i >= 0 && i <= 7;
      }, c.from = function(i) {
        return c.isValid(i) ? parseInt(i, 10) : void 0;
      }, c.getPenaltyN1 = function(i) {
        for (var u = i.size, f = 0, n = 0, d = 0, w = null, C = null, b = 0; b < u; b++) {
          n = d = 0, w = C = null;
          for (var I = 0; I < u; I++) {
            var U = i.get(b, I);
            U === w ? n++ : (n >= 5 && (f += p.N1 + (n - 5)), w = U, n = 1), U = i.get(I, b), U === C ? d++ : (d >= 5 && (f += p.N1 + (d - 5)), C = U, d = 1);
          }
          n >= 5 && (f += p.N1 + (n - 5)), d >= 5 && (f += p.N1 + (d - 5));
        }
        return f;
      }, c.getPenaltyN2 = function(i) {
        for (var u = i.size, f = 0, n = 0; n < u - 1; n++)
          for (var d = 0; d < u - 1; d++) {
            var w = i.get(n, d) + i.get(n, d + 1) + i.get(n + 1, d) + i.get(n + 1, d + 1);
            (w === 4 || w === 0) && f++;
          }
        return f * p.N2;
      }, c.getPenaltyN3 = function(i) {
        for (var u = i.size, f = 0, n = 0, d = 0, w = 0; w < u; w++) {
          n = d = 0;
          for (var C = 0; C < u; C++)
            n = n << 1 & 2047 | i.get(w, C), C >= 10 && (n === 1488 || n === 93) && f++, d = d << 1 & 2047 | i.get(C, w), C >= 10 && (d === 1488 || d === 93) && f++;
        }
        return f * p.N3;
      }, c.getPenaltyN4 = function(i) {
        for (var u = 0, f = i.data.length, n = 0; n < f; n++)
          u += i.data[n];
        var d = Math.abs(Math.ceil(u * 100 / f / 5) - 10);
        return d * p.N4;
      };
      function s(a, i, u) {
        switch (a) {
          case c.Patterns.PATTERN000:
            return (i + u) % 2 === 0;
          case c.Patterns.PATTERN001:
            return i % 2 === 0;
          case c.Patterns.PATTERN010:
            return u % 3 === 0;
          case c.Patterns.PATTERN011:
            return (i + u) % 3 === 0;
          case c.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(u / 3)) % 2 === 0;
          case c.Patterns.PATTERN101:
            return i * u % 2 + i * u % 3 === 0;
          case c.Patterns.PATTERN110:
            return (i * u % 2 + i * u % 3) % 2 === 0;
          case c.Patterns.PATTERN111:
            return (i * u % 3 + (i + u) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + a);
        }
      }
      c.applyMask = function(i, u) {
        for (var f = u.size, n = 0; n < f; n++)
          for (var d = 0; d < f; d++)
            u.isReserved(d, n) || u.xor(d, n, s(i, d, n));
      }, c.getBestMask = function(i, u) {
        for (var f = Object.keys(c.Patterns).length, n = 0, d = 1 / 0, w = 0; w < f; w++) {
          u(w), c.applyMask(w, i);
          var C = c.getPenaltyN1(i) + c.getPenaltyN2(i) + c.getPenaltyN3(i) + c.getPenaltyN4(i);
          c.applyMask(w, i), C < d && (d = C, n = w);
        }
        return n;
      };
    }, {}], 14: [function(m, _, c) {
      var p = m("./version-check"), s = m("./regex");
      c.NUMERIC = {
        id: "Numeric",
        bit: 1 << 0,
        ccBits: [10, 12, 14]
      }, c.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 1 << 1,
        ccBits: [9, 11, 13]
      }, c.BYTE = {
        id: "Byte",
        bit: 1 << 2,
        ccBits: [8, 16, 16]
      }, c.KANJI = {
        id: "Kanji",
        bit: 1 << 3,
        ccBits: [8, 10, 12]
      }, c.MIXED = {
        bit: -1
      }, c.getCharCountIndicator = function(u, f) {
        if (!u.ccBits)
          throw new Error("Invalid mode: " + u);
        if (!p.isValid(f))
          throw new Error("Invalid version: " + f);
        return f >= 1 && f < 10 ? u.ccBits[0] : f < 27 ? u.ccBits[1] : u.ccBits[2];
      }, c.getBestModeForData = function(u) {
        return s.testNumeric(u) ? c.NUMERIC : s.testAlphanumeric(u) ? c.ALPHANUMERIC : s.testKanji(u) ? c.KANJI : c.BYTE;
      }, c.toString = function(u) {
        if (u && u.id)
          return u.id;
        throw new Error("Invalid mode");
      }, c.isValid = function(u) {
        return u && u.bit && u.ccBits;
      };
      function a(i) {
        if (typeof i != "string")
          throw new Error("Param is not a string");
        var u = i.toLowerCase();
        switch (u) {
          case "numeric":
            return c.NUMERIC;
          case "alphanumeric":
            return c.ALPHANUMERIC;
          case "kanji":
            return c.KANJI;
          case "byte":
            return c.BYTE;
          default:
            throw new Error("Unknown mode: " + i);
        }
      }
      c.from = function(u, f) {
        if (c.isValid(u))
          return u;
        try {
          return a(u);
        } catch {
          return f;
        }
      };
    }, { "./regex": 19, "./version-check": 22 }], 15: [function(m, _, c) {
      var p = m("./mode");
      function s(a) {
        this.mode = p.NUMERIC, this.data = a.toString();
      }
      s.getBitsLength = function(i) {
        return 10 * Math.floor(i / 3) + (i % 3 ? i % 3 * 3 + 1 : 0);
      }, s.prototype.getLength = function() {
        return this.data.length;
      }, s.prototype.getBitsLength = function() {
        return s.getBitsLength(this.data.length);
      }, s.prototype.write = function(i) {
        var u, f, n;
        for (u = 0; u + 3 <= this.data.length; u += 3)
          f = this.data.substr(u, 3), n = parseInt(f, 10), i.put(n, 10);
        var d = this.data.length - u;
        d > 0 && (f = this.data.substr(u), n = parseInt(f, 10), i.put(n, d * 3 + 1));
      }, _.exports = s;
    }, { "./mode": 14 }], 16: [function(m, _, c) {
      var p = m("../utils/buffer"), s = m("./galois-field");
      c.mul = function(i, u) {
        for (var f = p.alloc(i.length + u.length - 1), n = 0; n < i.length; n++)
          for (var d = 0; d < u.length; d++)
            f[n + d] ^= s.mul(i[n], u[d]);
        return f;
      }, c.mod = function(i, u) {
        for (var f = p.from(i); f.length - u.length >= 0; ) {
          for (var n = f[0], d = 0; d < u.length; d++)
            f[d] ^= s.mul(u[d], n);
          for (var w = 0; w < f.length && f[w] === 0; )
            w++;
          f = f.slice(w);
        }
        return f;
      }, c.generateECPolynomial = function(i) {
        for (var u = p.from([1]), f = 0; f < i; f++)
          u = c.mul(u, [1, s.exp(f)]);
        return u;
      };
    }, { "../utils/buffer": 28, "./galois-field": 11 }], 17: [function(m, _, c) {
      var p = m("../utils/buffer"), s = m("./utils"), a = m("./error-correction-level"), i = m("./bit-buffer"), u = m("./bit-matrix"), f = m("./alignment-pattern"), n = m("./finder-pattern"), d = m("./mask-pattern"), w = m("./error-correction-code"), C = m("./reed-solomon-encoder"), b = m("./version"), I = m("./format-info"), U = m("./mode"), E = m("./segments"), F = m("isarray");
      function R(S, N) {
        for (var P = S.size, M = n.getPositions(N), k = 0; k < M.length; k++)
          for (var Y = M[k][0], D = M[k][1], H = -1; H <= 7; H++)
            if (!(Y + H <= -1 || P <= Y + H))
              for (var K = -1; K <= 7; K++)
                D + K <= -1 || P <= D + K || (H >= 0 && H <= 6 && (K === 0 || K === 6) || K >= 0 && K <= 6 && (H === 0 || H === 6) || H >= 2 && H <= 4 && K >= 2 && K <= 4 ? S.set(Y + H, D + K, !0, !0) : S.set(Y + H, D + K, !1, !0));
      }
      function T(S) {
        for (var N = S.size, P = 8; P < N - 8; P++) {
          var M = P % 2 === 0;
          S.set(P, 6, M, !0), S.set(6, P, M, !0);
        }
      }
      function v(S, N) {
        for (var P = f.getPositions(N), M = 0; M < P.length; M++)
          for (var k = P[M][0], Y = P[M][1], D = -2; D <= 2; D++)
            for (var H = -2; H <= 2; H++)
              D === -2 || D === 2 || H === -2 || H === 2 || D === 0 && H === 0 ? S.set(k + D, Y + H, !0, !0) : S.set(k + D, Y + H, !1, !0);
      }
      function l(S, N) {
        for (var P = S.size, M = b.getEncodedBits(N), k, Y, D, H = 0; H < 18; H++)
          k = Math.floor(H / 3), Y = H % 3 + P - 8 - 3, D = (M >> H & 1) === 1, S.set(k, Y, D, !0), S.set(Y, k, D, !0);
      }
      function h(S, N, P) {
        var M = S.size, k = I.getEncodedBits(N, P), Y, D;
        for (Y = 0; Y < 15; Y++)
          D = (k >> Y & 1) === 1, Y < 6 ? S.set(Y, 8, D, !0) : Y < 8 ? S.set(Y + 1, 8, D, !0) : S.set(M - 15 + Y, 8, D, !0), Y < 8 ? S.set(8, M - Y - 1, D, !0) : Y < 9 ? S.set(8, 15 - Y - 1 + 1, D, !0) : S.set(8, 15 - Y - 1, D, !0);
        S.set(M - 8, 8, 1, !0);
      }
      function y(S, N) {
        for (var P = S.size, M = -1, k = P - 1, Y = 7, D = 0, H = P - 1; H > 0; H -= 2)
          for (H === 6 && H--; ; ) {
            for (var K = 0; K < 2; K++)
              if (!S.isReserved(k, H - K)) {
                var q = !1;
                D < N.length && (q = (N[D] >>> Y & 1) === 1), S.set(k, H - K, q), Y--, Y === -1 && (D++, Y = 7);
              }
            if (k += M, k < 0 || P <= k) {
              k -= M, M = -M;
              break;
            }
          }
      }
      function x(S, N, P) {
        var M = new i();
        P.forEach(function(q) {
          M.put(q.mode.bit, 4), M.put(q.getLength(), U.getCharCountIndicator(q.mode, S)), q.write(M);
        });
        var k = s.getSymbolTotalCodewords(S), Y = w.getTotalCodewordsCount(S, N), D = (k - Y) * 8;
        for (M.getLengthInBits() + 4 <= D && M.put(0, 4); M.getLengthInBits() % 8 !== 0; )
          M.putBit(0);
        for (var H = (D - M.getLengthInBits()) / 8, K = 0; K < H; K++)
          M.put(K % 2 ? 17 : 236, 8);
        return L(M, S, N);
      }
      function L(S, N, P) {
        for (var M = s.getSymbolTotalCodewords(N), k = w.getTotalCodewordsCount(N, P), Y = M - k, D = w.getBlocksCount(N, P), H = M % D, K = D - H, q = Math.floor(M / D), $ = Math.floor(Y / D), cr = $ + 1, W = q - $, X = new C(W), ir = 0, nr = new Array(D), or = new Array(D), ur = 0, gr = p.from(S.buffer), er = 0; er < D; er++) {
          var ar = er < K ? $ : cr;
          nr[er] = gr.slice(ir, ir + ar), or[er] = X.encode(nr[er]), ir += ar, ur = Math.max(ur, ar);
        }
        var fr = p.alloc(M), hr = 0, j, Q;
        for (j = 0; j < ur; j++)
          for (Q = 0; Q < D; Q++)
            j < nr[Q].length && (fr[hr++] = nr[Q][j]);
        for (j = 0; j < W; j++)
          for (Q = 0; Q < D; Q++)
            fr[hr++] = or[Q][j];
        return fr;
      }
      function O(S, N, P, M) {
        var k;
        if (F(S))
          k = E.fromArray(S);
        else if (typeof S == "string") {
          var Y = N;
          if (!Y) {
            var D = E.rawSplit(S);
            Y = b.getBestVersionForData(
              D,
              P
            );
          }
          k = E.fromString(S, Y || 40);
        } else
          throw new Error("Invalid data");
        var H = b.getBestVersionForData(
          k,
          P
        );
        if (!H)
          throw new Error("The amount of data is too big to be stored in a QR Code");
        if (!N)
          N = H;
        else if (N < H)
          throw new Error(
            `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + H + `.
`
          );
        var K = x(N, P, k), q = s.getSymbolSize(N), $ = new u(q);
        return R($, N), T($), v($, N), h($, P, 0), N >= 7 && l($, N), y($, K), isNaN(M) && (M = d.getBestMask(
          $,
          h.bind(null, $, P)
        )), d.applyMask(M, $), h($, P, M), {
          modules: $,
          version: N,
          errorCorrectionLevel: P,
          maskPattern: M,
          segments: k
        };
      }
      c.create = function(N, P) {
        if (typeof N > "u" || N === "")
          throw new Error("No input text");
        var M = a.M, k, Y;
        return typeof P < "u" && (M = a.from(P.errorCorrectionLevel, a.M), k = b.from(P.version), Y = d.from(P.maskPattern), P.toSJISFunc && s.setToSJISFunction(P.toSJISFunc)), O(N, k, M, Y);
      };
    }, { "../utils/buffer": 28, "./alignment-pattern": 2, "./bit-buffer": 4, "./bit-matrix": 5, "./error-correction-code": 7, "./error-correction-level": 8, "./finder-pattern": 9, "./format-info": 10, "./mask-pattern": 13, "./mode": 14, "./reed-solomon-encoder": 18, "./segments": 20, "./utils": 21, "./version": 23, isarray: 33 }], 18: [function(m, _, c) {
      var p = m("../utils/buffer"), s = m("./polynomial"), a = m("buffer").Buffer;
      function i(u) {
        this.genPoly = void 0, this.degree = u, this.degree && this.initialize(this.degree);
      }
      i.prototype.initialize = function(f) {
        this.degree = f, this.genPoly = s.generateECPolynomial(this.degree);
      }, i.prototype.encode = function(f) {
        if (!this.genPoly)
          throw new Error("Encoder not initialized");
        var n = p.alloc(this.degree), d = a.concat([f, n], f.length + this.degree), w = s.mod(d, this.genPoly), C = this.degree - w.length;
        if (C > 0) {
          var b = p.alloc(this.degree);
          return w.copy(b, C), b;
        }
        return w;
      }, _.exports = i;
    }, { "../utils/buffer": 28, "./polynomial": 16, buffer: 30 }], 19: [function(m, _, c) {
      var p = "[0-9]+", s = "[A-Z $%*+\\-./:]+", a = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      a = a.replace(/u/g, "\\u");
      var i = "(?:(?![A-Z0-9 $%*+\\-./:]|" + a + `)(?:.|[\r
]))+`;
      c.KANJI = new RegExp(a, "g"), c.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), c.BYTE = new RegExp(i, "g"), c.NUMERIC = new RegExp(p, "g"), c.ALPHANUMERIC = new RegExp(s, "g");
      var u = new RegExp("^" + a + "$"), f = new RegExp("^" + p + "$"), n = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      c.testKanji = function(w) {
        return u.test(w);
      }, c.testNumeric = function(w) {
        return f.test(w);
      }, c.testAlphanumeric = function(w) {
        return n.test(w);
      };
    }, {}], 20: [function(m, _, c) {
      var p = m("./mode"), s = m("./numeric-data"), a = m("./alphanumeric-data"), i = m("./byte-data"), u = m("./kanji-data"), f = m("./regex"), n = m("./utils"), d = m("dijkstrajs");
      function w(T) {
        return unescape(encodeURIComponent(T)).length;
      }
      function C(T, v, l) {
        for (var h = [], y; (y = T.exec(l)) !== null; )
          h.push({
            data: y[0],
            index: y.index,
            mode: v,
            length: y[0].length
          });
        return h;
      }
      function b(T) {
        var v = C(f.NUMERIC, p.NUMERIC, T), l = C(f.ALPHANUMERIC, p.ALPHANUMERIC, T), h, y;
        n.isKanjiModeEnabled() ? (h = C(f.BYTE, p.BYTE, T), y = C(f.KANJI, p.KANJI, T)) : (h = C(f.BYTE_KANJI, p.BYTE, T), y = []);
        var x = v.concat(l, h, y);
        return x.sort(function(L, O) {
          return L.index - O.index;
        }).map(function(L) {
          return {
            data: L.data,
            mode: L.mode,
            length: L.length
          };
        });
      }
      function I(T, v) {
        switch (v) {
          case p.NUMERIC:
            return s.getBitsLength(T);
          case p.ALPHANUMERIC:
            return a.getBitsLength(T);
          case p.KANJI:
            return u.getBitsLength(T);
          case p.BYTE:
            return i.getBitsLength(T);
        }
      }
      function U(T) {
        return T.reduce(function(v, l) {
          var h = v.length - 1 >= 0 ? v[v.length - 1] : null;
          return h && h.mode === l.mode ? (v[v.length - 1].data += l.data, v) : (v.push(l), v);
        }, []);
      }
      function E(T) {
        for (var v = [], l = 0; l < T.length; l++) {
          var h = T[l];
          switch (h.mode) {
            case p.NUMERIC:
              v.push([
                h,
                { data: h.data, mode: p.ALPHANUMERIC, length: h.length },
                { data: h.data, mode: p.BYTE, length: h.length }
              ]);
              break;
            case p.ALPHANUMERIC:
              v.push([
                h,
                { data: h.data, mode: p.BYTE, length: h.length }
              ]);
              break;
            case p.KANJI:
              v.push([
                h,
                { data: h.data, mode: p.BYTE, length: w(h.data) }
              ]);
              break;
            case p.BYTE:
              v.push([
                { data: h.data, mode: p.BYTE, length: w(h.data) }
              ]);
          }
        }
        return v;
      }
      function F(T, v) {
        for (var l = {}, h = { start: {} }, y = ["start"], x = 0; x < T.length; x++) {
          for (var L = T[x], O = [], S = 0; S < L.length; S++) {
            var N = L[S], P = "" + x + S;
            O.push(P), l[P] = { node: N, lastCount: 0 }, h[P] = {};
            for (var M = 0; M < y.length; M++) {
              var k = y[M];
              l[k] && l[k].node.mode === N.mode ? (h[k][P] = I(l[k].lastCount + N.length, N.mode) - I(l[k].lastCount, N.mode), l[k].lastCount += N.length) : (l[k] && (l[k].lastCount = N.length), h[k][P] = I(N.length, N.mode) + 4 + p.getCharCountIndicator(N.mode, v));
            }
          }
          y = O;
        }
        for (M = 0; M < y.length; M++)
          h[y[M]].end = 0;
        return { map: h, table: l };
      }
      function R(T, v) {
        var l, h = p.getBestModeForData(T);
        if (l = p.from(v, h), l !== p.BYTE && l.bit < h.bit)
          throw new Error('"' + T + '" cannot be encoded with mode ' + p.toString(l) + `.
 Suggested mode is: ` + p.toString(h));
        switch (l === p.KANJI && !n.isKanjiModeEnabled() && (l = p.BYTE), l) {
          case p.NUMERIC:
            return new s(T);
          case p.ALPHANUMERIC:
            return new a(T);
          case p.KANJI:
            return new u(T);
          case p.BYTE:
            return new i(T);
        }
      }
      c.fromArray = function(v) {
        return v.reduce(function(l, h) {
          return typeof h == "string" ? l.push(R(h, null)) : h.data && l.push(R(h.data, h.mode)), l;
        }, []);
      }, c.fromString = function(v, l) {
        for (var h = b(v, n.isKanjiModeEnabled()), y = E(h), x = F(y, l), L = d.find_path(x.map, "start", "end"), O = [], S = 1; S < L.length - 1; S++)
          O.push(x.table[L[S]].node);
        return c.fromArray(U(O));
      }, c.rawSplit = function(v) {
        return c.fromArray(
          b(v, n.isKanjiModeEnabled())
        );
      };
    }, { "./alphanumeric-data": 3, "./byte-data": 6, "./kanji-data": 12, "./mode": 14, "./numeric-data": 15, "./regex": 19, "./utils": 21, dijkstrajs: 31 }], 21: [function(m, _, c) {
      var p, s = [
        0,
        // Not used
        26,
        44,
        70,
        100,
        134,
        172,
        196,
        242,
        292,
        346,
        404,
        466,
        532,
        581,
        655,
        733,
        815,
        901,
        991,
        1085,
        1156,
        1258,
        1364,
        1474,
        1588,
        1706,
        1828,
        1921,
        2051,
        2185,
        2323,
        2465,
        2611,
        2761,
        2876,
        3034,
        3196,
        3362,
        3532,
        3706
      ];
      c.getSymbolSize = function(i) {
        if (!i)
          throw new Error('"version" cannot be null or undefined');
        if (i < 1 || i > 40)
          throw new Error('"version" should be in range from 1 to 40');
        return i * 4 + 17;
      }, c.getSymbolTotalCodewords = function(i) {
        return s[i];
      }, c.getBCHDigit = function(a) {
        for (var i = 0; a !== 0; )
          i++, a >>>= 1;
        return i;
      }, c.setToSJISFunction = function(i) {
        if (typeof i != "function")
          throw new Error('"toSJISFunc" is not a valid function.');
        p = i;
      }, c.isKanjiModeEnabled = function() {
        return typeof p < "u";
      }, c.toSJIS = function(i) {
        return p(i);
      };
    }, {}], 22: [function(m, _, c) {
      c.isValid = function(s) {
        return !isNaN(s) && s >= 1 && s <= 40;
      };
    }, {}], 23: [function(m, _, c) {
      var p = m("./utils"), s = m("./error-correction-code"), a = m("./error-correction-level"), i = m("./mode"), u = m("./version-check"), f = m("isarray"), n = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0, d = p.getBCHDigit(n);
      function w(U, E, F) {
        for (var R = 1; R <= 40; R++)
          if (E <= c.getCapacity(R, F, U))
            return R;
      }
      function C(U, E) {
        return i.getCharCountIndicator(U, E) + 4;
      }
      function b(U, E) {
        var F = 0;
        return U.forEach(function(R) {
          var T = C(R.mode, E);
          F += T + R.getBitsLength();
        }), F;
      }
      function I(U, E) {
        for (var F = 1; F <= 40; F++) {
          var R = b(U, F);
          if (R <= c.getCapacity(F, E, i.MIXED))
            return F;
        }
      }
      c.from = function(E, F) {
        return u.isValid(E) ? parseInt(E, 10) : F;
      }, c.getCapacity = function(E, F, R) {
        if (!u.isValid(E))
          throw new Error("Invalid QR Code version");
        typeof R > "u" && (R = i.BYTE);
        var T = p.getSymbolTotalCodewords(E), v = s.getTotalCodewordsCount(E, F), l = (T - v) * 8;
        if (R === i.MIXED)
          return l;
        var h = l - C(R, E);
        switch (R) {
          case i.NUMERIC:
            return Math.floor(h / 10 * 3);
          case i.ALPHANUMERIC:
            return Math.floor(h / 11 * 2);
          case i.KANJI:
            return Math.floor(h / 13);
          case i.BYTE:
          default:
            return Math.floor(h / 8);
        }
      }, c.getBestVersionForData = function(E, F) {
        var R, T = a.from(F, a.M);
        if (f(E)) {
          if (E.length > 1)
            return I(E, T);
          if (E.length === 0)
            return 1;
          R = E[0];
        } else
          R = E;
        return w(R.mode, R.getLength(), T);
      }, c.getEncodedBits = function(E) {
        if (!u.isValid(E) || E < 7)
          throw new Error("Invalid QR Code version");
        for (var F = E << 12; p.getBCHDigit(F) - d >= 0; )
          F ^= n << p.getBCHDigit(F) - d;
        return E << 12 | F;
      };
    }, { "./error-correction-code": 7, "./error-correction-level": 8, "./mode": 14, "./utils": 21, "./version-check": 22, isarray: 33 }], 24: [function(m, _, c) {
      var p = m("./can-promise"), s = m("./core/qrcode"), a = m("./renderer/canvas"), i = m("./renderer/svg-tag.js");
      function u(f, n, d, w, C) {
        var b = [].slice.call(arguments, 1), I = b.length, U = typeof b[I - 1] == "function";
        if (!U && !p())
          throw new Error("Callback required as last argument");
        if (U) {
          if (I < 2)
            throw new Error("Too few arguments provided");
          I === 2 ? (C = d, d = n, n = w = void 0) : I === 3 && (n.getContext && typeof C > "u" ? (C = w, w = void 0) : (C = w, w = d, d = n, n = void 0));
        } else {
          if (I < 1)
            throw new Error("Too few arguments provided");
          return I === 1 ? (d = n, n = w = void 0) : I === 2 && !n.getContext && (w = d, d = n, n = void 0), new Promise(function(F, R) {
            try {
              var T = s.create(d, w);
              F(f(T, n, w));
            } catch (v) {
              R(v);
            }
          });
        }
        try {
          var E = s.create(d, w);
          C(null, f(E, n, w));
        } catch (F) {
          C(F);
        }
      }
      c.create = s.create, c.toCanvas = u.bind(null, a.render), c.toDataURL = u.bind(null, a.renderToDataURL), c.toString = u.bind(null, function(f, n, d) {
        return i.render(f, d);
      });
    }, { "./can-promise": 1, "./core/qrcode": 17, "./renderer/canvas": 25, "./renderer/svg-tag.js": 26 }], 25: [function(m, _, c) {
      var p = m("./utils");
      function s(i, u, f) {
        i.clearRect(0, 0, u.width, u.height), u.style || (u.style = {}), u.height = f, u.width = f, u.style.height = f + "px", u.style.width = f + "px";
      }
      function a() {
        try {
          return document.createElement("canvas");
        } catch {
          throw new Error("You need to specify a canvas element");
        }
      }
      c.render = function(u, f, n) {
        var d = n, w = f;
        typeof d > "u" && (!f || !f.getContext) && (d = f, f = void 0), f || (w = a()), d = p.getOptions(d);
        var C = p.getImageWidth(u.modules.size, d), b = w.getContext("2d"), I = b.createImageData(C, C);
        return p.qrToImageData(I.data, u, d), s(b, w, C), b.putImageData(I, 0, 0), w;
      }, c.renderToDataURL = function(u, f, n) {
        var d = n;
        typeof d > "u" && (!f || !f.getContext) && (d = f, f = void 0), d || (d = {});
        var w = c.render(u, f, d), C = d.type || "image/png", b = d.rendererOpts || {};
        return w.toDataURL(C, b.quality);
      };
    }, { "./utils": 27 }], 26: [function(m, _, c) {
      var p = m("./utils");
      function s(u, f) {
        var n = u.a / 255, d = f + '="' + u.hex + '"';
        return n < 1 ? d + " " + f + '-opacity="' + n.toFixed(2).slice(1) + '"' : d;
      }
      function a(u, f, n) {
        var d = u + f;
        return typeof n < "u" && (d += " " + n), d;
      }
      function i(u, f, n) {
        for (var d = "", w = 0, C = !1, b = 0, I = 0; I < u.length; I++) {
          var U = Math.floor(I % f), E = Math.floor(I / f);
          !U && !C && (C = !0), u[I] ? (b++, I > 0 && U > 0 && u[I - 1] || (d += C ? a("M", U + n, 0.5 + E + n) : a("m", w, 0), w = 0, C = !1), U + 1 < f && u[I + 1] || (d += a("h", b), b = 0)) : w++;
        }
        return d;
      }
      c.render = function(f, n, d) {
        var w = p.getOptions(n), C = f.modules.size, b = f.modules.data, I = C + w.margin * 2, U = w.color.light.a ? "<path " + s(w.color.light, "fill") + ' d="M0 0h' + I + "v" + I + 'H0z"/>' : "", E = "<path " + s(w.color.dark, "stroke") + ' d="' + i(b, C, w.margin) + '"/>', F = 'viewBox="0 0 ' + I + " " + I + '"', R = w.width ? 'width="' + w.width + '" height="' + w.width + '" ' : "", T = '<svg xmlns="http://www.w3.org/2000/svg" ' + R + F + ' shape-rendering="crispEdges">' + U + E + `</svg>
`;
        return typeof d == "function" && d(null, T), T;
      };
    }, { "./utils": 27 }], 27: [function(m, _, c) {
      function p(s) {
        if (typeof s == "number" && (s = s.toString()), typeof s != "string")
          throw new Error("Color should be defined as hex string");
        var a = s.slice().replace("#", "").split("");
        if (a.length < 3 || a.length === 5 || a.length > 8)
          throw new Error("Invalid hex color: " + s);
        (a.length === 3 || a.length === 4) && (a = Array.prototype.concat.apply([], a.map(function(u) {
          return [u, u];
        }))), a.length === 6 && a.push("F", "F");
        var i = parseInt(a.join(""), 16);
        return {
          r: i >> 24 & 255,
          g: i >> 16 & 255,
          b: i >> 8 & 255,
          a: i & 255,
          hex: "#" + a.slice(0, 6).join("")
        };
      }
      c.getOptions = function(a) {
        a || (a = {}), a.color || (a.color = {});
        var i = typeof a.margin > "u" || a.margin === null || a.margin < 0 ? 4 : a.margin, u = a.width && a.width >= 21 ? a.width : void 0, f = a.scale || 4;
        return {
          width: u,
          scale: u ? 4 : f,
          margin: i,
          color: {
            dark: p(a.color.dark || "#000000ff"),
            light: p(a.color.light || "#ffffffff")
          },
          type: a.type,
          rendererOpts: a.rendererOpts || {}
        };
      }, c.getScale = function(a, i) {
        return i.width && i.width >= a + i.margin * 2 ? i.width / (a + i.margin * 2) : i.scale;
      }, c.getImageWidth = function(a, i) {
        var u = c.getScale(a, i);
        return Math.floor((a + i.margin * 2) * u);
      }, c.qrToImageData = function(a, i, u) {
        for (var f = i.modules.size, n = i.modules.data, d = c.getScale(f, u), w = Math.floor((f + u.margin * 2) * d), C = u.margin * d, b = [u.color.light, u.color.dark], I = 0; I < w; I++)
          for (var U = 0; U < w; U++) {
            var E = (I * w + U) * 4, F = u.color.light;
            if (I >= C && U >= C && I < w - C && U < w - C) {
              var R = Math.floor((I - C) / d), T = Math.floor((U - C) / d);
              F = b[n[R * f + T] ? 1 : 0];
            }
            a[E++] = F.r, a[E++] = F.g, a[E++] = F.b, a[E] = F.a;
          }
      };
    }, {}], 28: [function(m, _, c) {
      var p = m("isarray");
      function s() {
        try {
          var v = new Uint8Array(1);
          return v.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
            return 42;
          } }, v.foo() === 42;
        } catch {
          return !1;
        }
      }
      i.TYPED_ARRAY_SUPPORT = s();
      var a = i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      function i(v, l, h) {
        return !i.TYPED_ARRAY_SUPPORT && !(this instanceof i) ? new i(v, l, h) : typeof v == "number" ? d(this, v) : T(this, v, l, h);
      }
      i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, typeof Symbol < "u" && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
        value: null,
        configurable: !0,
        enumerable: !1,
        writable: !1
      }));
      function u(v) {
        if (v >= a)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
        return v | 0;
      }
      function f(v) {
        return v !== v;
      }
      function n(v, l) {
        var h;
        return i.TYPED_ARRAY_SUPPORT ? (h = new Uint8Array(l), h.__proto__ = i.prototype) : (h = v, h === null && (h = new i(l)), h.length = l), h;
      }
      function d(v, l) {
        var h = n(v, l < 0 ? 0 : u(l) | 0);
        if (!i.TYPED_ARRAY_SUPPORT)
          for (var y = 0; y < l; ++y)
            h[y] = 0;
        return h;
      }
      function w(v, l) {
        var h = E(l) | 0, y = n(v, h), x = y.write(l);
        return x !== h && (y = y.slice(0, x)), y;
      }
      function C(v, l) {
        for (var h = l.length < 0 ? 0 : u(l.length) | 0, y = n(v, h), x = 0; x < h; x += 1)
          y[x] = l[x] & 255;
        return y;
      }
      function b(v, l, h, y) {
        if (h < 0 || l.byteLength < h)
          throw new RangeError("'offset' is out of bounds");
        if (l.byteLength < h + (y || 0))
          throw new RangeError("'length' is out of bounds");
        var x;
        return h === void 0 && y === void 0 ? x = new Uint8Array(l) : y === void 0 ? x = new Uint8Array(l, h) : x = new Uint8Array(l, h, y), i.TYPED_ARRAY_SUPPORT ? x.__proto__ = i.prototype : x = C(v, x), x;
      }
      function I(v, l) {
        if (i.isBuffer(l)) {
          var h = u(l.length) | 0, y = n(v, h);
          return y.length === 0 || l.copy(y, 0, 0, h), y;
        }
        if (l) {
          if (typeof ArrayBuffer < "u" && l.buffer instanceof ArrayBuffer || "length" in l)
            return typeof l.length != "number" || f(l.length) ? n(v, 0) : C(v, l);
          if (l.type === "Buffer" && Array.isArray(l.data))
            return C(v, l.data);
        }
        throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
      }
      function U(v, l) {
        l = l || 1 / 0;
        for (var h, y = v.length, x = null, L = [], O = 0; O < y; ++O) {
          if (h = v.charCodeAt(O), h > 55295 && h < 57344) {
            if (!x) {
              if (h > 56319) {
                (l -= 3) > -1 && L.push(239, 191, 189);
                continue;
              } else if (O + 1 === y) {
                (l -= 3) > -1 && L.push(239, 191, 189);
                continue;
              }
              x = h;
              continue;
            }
            if (h < 56320) {
              (l -= 3) > -1 && L.push(239, 191, 189), x = h;
              continue;
            }
            h = (x - 55296 << 10 | h - 56320) + 65536;
          } else
            x && (l -= 3) > -1 && L.push(239, 191, 189);
          if (x = null, h < 128) {
            if ((l -= 1) < 0)
              break;
            L.push(h);
          } else if (h < 2048) {
            if ((l -= 2) < 0)
              break;
            L.push(
              h >> 6 | 192,
              h & 63 | 128
            );
          } else if (h < 65536) {
            if ((l -= 3) < 0)
              break;
            L.push(
              h >> 12 | 224,
              h >> 6 & 63 | 128,
              h & 63 | 128
            );
          } else if (h < 1114112) {
            if ((l -= 4) < 0)
              break;
            L.push(
              h >> 18 | 240,
              h >> 12 & 63 | 128,
              h >> 6 & 63 | 128,
              h & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return L;
      }
      function E(v) {
        if (i.isBuffer(v))
          return v.length;
        if (typeof ArrayBuffer < "u" && typeof ArrayBuffer.isView == "function" && (ArrayBuffer.isView(v) || v instanceof ArrayBuffer))
          return v.byteLength;
        typeof v != "string" && (v = "" + v);
        var l = v.length;
        return l === 0 ? 0 : U(v).length;
      }
      function F(v, l, h, y) {
        for (var x = 0; x < y && !(x + h >= l.length || x >= v.length); ++x)
          l[x + h] = v[x];
        return x;
      }
      function R(v, l, h, y) {
        return F(U(l, v.length - h), v, h, y);
      }
      function T(v, l, h, y) {
        if (typeof l == "number")
          throw new TypeError('"value" argument must not be a number');
        return typeof ArrayBuffer < "u" && l instanceof ArrayBuffer ? b(v, l, h, y) : typeof l == "string" ? w(v, l) : I(v, l);
      }
      i.prototype.write = function(l, h, y) {
        h === void 0 ? (y = this.length, h = 0) : y === void 0 && typeof h == "string" ? (y = this.length, h = 0) : isFinite(h) && (h = h | 0, isFinite(y) ? y = y | 0 : y = void 0);
        var x = this.length - h;
        if ((y === void 0 || y > x) && (y = x), l.length > 0 && (y < 0 || h < 0) || h > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        return R(this, l, h, y);
      }, i.prototype.slice = function(l, h) {
        var y = this.length;
        l = ~~l, h = h === void 0 ? y : ~~h, l < 0 ? (l += y, l < 0 && (l = 0)) : l > y && (l = y), h < 0 ? (h += y, h < 0 && (h = 0)) : h > y && (h = y), h < l && (h = l);
        var x;
        if (i.TYPED_ARRAY_SUPPORT)
          x = this.subarray(l, h), x.__proto__ = i.prototype;
        else {
          var L = h - l;
          x = new i(L, void 0);
          for (var O = 0; O < L; ++O)
            x[O] = this[O + l];
        }
        return x;
      }, i.prototype.copy = function(l, h, y, x) {
        if (y || (y = 0), !x && x !== 0 && (x = this.length), h >= l.length && (h = l.length), h || (h = 0), x > 0 && x < y && (x = y), x === y || l.length === 0 || this.length === 0)
          return 0;
        if (h < 0)
          throw new RangeError("targetStart out of bounds");
        if (y < 0 || y >= this.length)
          throw new RangeError("sourceStart out of bounds");
        if (x < 0)
          throw new RangeError("sourceEnd out of bounds");
        x > this.length && (x = this.length), l.length - h < x - y && (x = l.length - h + y);
        var L = x - y, O;
        if (this === l && y < h && h < x)
          for (O = L - 1; O >= 0; --O)
            l[O + h] = this[O + y];
        else if (L < 1e3 || !i.TYPED_ARRAY_SUPPORT)
          for (O = 0; O < L; ++O)
            l[O + h] = this[O + y];
        else
          Uint8Array.prototype.set.call(
            l,
            this.subarray(y, y + L),
            h
          );
        return L;
      }, i.prototype.fill = function(l, h, y) {
        if (typeof l == "string") {
          if (typeof h == "string" ? (h = 0, y = this.length) : typeof y == "string" && (y = this.length), l.length === 1) {
            var x = l.charCodeAt(0);
            x < 256 && (l = x);
          }
        } else
          typeof l == "number" && (l = l & 255);
        if (h < 0 || this.length < h || this.length < y)
          throw new RangeError("Out of range index");
        if (y <= h)
          return this;
        h = h >>> 0, y = y === void 0 ? this.length : y >>> 0, l || (l = 0);
        var L;
        if (typeof l == "number")
          for (L = h; L < y; ++L)
            this[L] = l;
        else {
          var O = i.isBuffer(l) ? l : new i(l), S = O.length;
          for (L = 0; L < y - h; ++L)
            this[L + h] = O[L % S];
        }
        return this;
      }, i.concat = function(l, h) {
        if (!p(l))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (l.length === 0)
          return n(null, 0);
        var y;
        if (h === void 0)
          for (h = 0, y = 0; y < l.length; ++y)
            h += l[y].length;
        var x = d(null, h), L = 0;
        for (y = 0; y < l.length; ++y) {
          var O = l[y];
          if (!i.isBuffer(O))
            throw new TypeError('"list" argument must be an Array of Buffers');
          O.copy(x, L), L += O.length;
        }
        return x;
      }, i.byteLength = E, i.prototype._isBuffer = !0, i.isBuffer = function(l) {
        return !!(l != null && l._isBuffer);
      }, _.exports.alloc = function(v) {
        var l = new i(v);
        return l.fill(0), l;
      }, _.exports.from = function(v) {
        return new i(v);
      };
    }, { isarray: 33 }], 29: [function(m, _, c) {
      c.byteLength = d, c.toByteArray = C, c.fromByteArray = U;
      for (var p = [], s = [], a = typeof Uint8Array < "u" ? Uint8Array : Array, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u = 0, f = i.length; u < f; ++u)
        p[u] = i[u], s[i.charCodeAt(u)] = u;
      s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63;
      function n(E) {
        var F = E.length;
        if (F % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var R = E.indexOf("=");
        R === -1 && (R = F);
        var T = R === F ? 0 : 4 - R % 4;
        return [R, T];
      }
      function d(E) {
        var F = n(E), R = F[0], T = F[1];
        return (R + T) * 3 / 4 - T;
      }
      function w(E, F, R) {
        return (F + R) * 3 / 4 - R;
      }
      function C(E) {
        var F, R = n(E), T = R[0], v = R[1], l = new a(w(E, T, v)), h = 0, y = v > 0 ? T - 4 : T, x;
        for (x = 0; x < y; x += 4)
          F = s[E.charCodeAt(x)] << 18 | s[E.charCodeAt(x + 1)] << 12 | s[E.charCodeAt(x + 2)] << 6 | s[E.charCodeAt(x + 3)], l[h++] = F >> 16 & 255, l[h++] = F >> 8 & 255, l[h++] = F & 255;
        return v === 2 && (F = s[E.charCodeAt(x)] << 2 | s[E.charCodeAt(x + 1)] >> 4, l[h++] = F & 255), v === 1 && (F = s[E.charCodeAt(x)] << 10 | s[E.charCodeAt(x + 1)] << 4 | s[E.charCodeAt(x + 2)] >> 2, l[h++] = F >> 8 & 255, l[h++] = F & 255), l;
      }
      function b(E) {
        return p[E >> 18 & 63] + p[E >> 12 & 63] + p[E >> 6 & 63] + p[E & 63];
      }
      function I(E, F, R) {
        for (var T, v = [], l = F; l < R; l += 3)
          T = (E[l] << 16 & 16711680) + (E[l + 1] << 8 & 65280) + (E[l + 2] & 255), v.push(b(T));
        return v.join("");
      }
      function U(E) {
        for (var F, R = E.length, T = R % 3, v = [], l = 16383, h = 0, y = R - T; h < y; h += l)
          v.push(I(
            E,
            h,
            h + l > y ? y : h + l
          ));
        return T === 1 ? (F = E[R - 1], v.push(
          p[F >> 2] + p[F << 4 & 63] + "=="
        )) : T === 2 && (F = (E[R - 2] << 8) + E[R - 1], v.push(
          p[F >> 10] + p[F >> 4 & 63] + p[F << 2 & 63] + "="
        )), v.join("");
      }
    }, {}], 30: [function(m, _, c) {
      var p = m("base64-js"), s = m("ieee754"), a = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
      c.Buffer = n, c.SlowBuffer = T, c.INSPECT_MAX_BYTES = 50;
      var i = 2147483647;
      c.kMaxLength = i, n.TYPED_ARRAY_SUPPORT = u(), !n.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
      function u() {
        try {
          var t = new Uint8Array(1), r = { foo: function() {
            return 42;
          } };
          return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(t, r), t.foo() === 42;
        } catch {
          return !1;
        }
      }
      Object.defineProperty(n.prototype, "parent", {
        enumerable: !0,
        get: function() {
          if (n.isBuffer(this))
            return this.buffer;
        }
      }), Object.defineProperty(n.prototype, "offset", {
        enumerable: !0,
        get: function() {
          if (n.isBuffer(this))
            return this.byteOffset;
        }
      });
      function f(t) {
        if (t > i)
          throw new RangeError('The value "' + t + '" is invalid for option "size"');
        var r = new Uint8Array(t);
        return Object.setPrototypeOf(r, n.prototype), r;
      }
      function n(t, r, e) {
        if (typeof t == "number") {
          if (typeof r == "string")
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return b(t);
        }
        return d(t, r, e);
      }
      typeof Symbol < "u" && Symbol.species != null && n[Symbol.species] === n && Object.defineProperty(n, Symbol.species, {
        value: null,
        configurable: !0,
        enumerable: !1,
        writable: !1
      }), n.poolSize = 8192;
      function d(t, r, e) {
        if (typeof t == "string")
          return I(t, r);
        if (ArrayBuffer.isView(t))
          return U(t);
        if (t == null)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
          );
        if (Q(t, ArrayBuffer) || t && Q(t.buffer, ArrayBuffer))
          return E(t, r, e);
        if (typeof t == "number")
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        var o = t.valueOf && t.valueOf();
        if (o != null && o !== t)
          return n.from(o, r, e);
        var g = F(t);
        if (g)
          return g;
        if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof t[Symbol.toPrimitive] == "function")
          return n.from(
            t[Symbol.toPrimitive]("string"),
            r,
            e
          );
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t
        );
      }
      n.from = function(t, r, e) {
        return d(t, r, e);
      }, Object.setPrototypeOf(n.prototype, Uint8Array.prototype), Object.setPrototypeOf(n, Uint8Array);
      function w(t) {
        if (typeof t != "number")
          throw new TypeError('"size" argument must be of type number');
        if (t < 0)
          throw new RangeError('The value "' + t + '" is invalid for option "size"');
      }
      function C(t, r, e) {
        return w(t), t <= 0 ? f(t) : r !== void 0 ? typeof e == "string" ? f(t).fill(r, e) : f(t).fill(r) : f(t);
      }
      n.alloc = function(t, r, e) {
        return C(t, r, e);
      };
      function b(t) {
        return w(t), f(t < 0 ? 0 : R(t) | 0);
      }
      n.allocUnsafe = function(t) {
        return b(t);
      }, n.allocUnsafeSlow = function(t) {
        return b(t);
      };
      function I(t, r) {
        if ((typeof r != "string" || r === "") && (r = "utf8"), !n.isEncoding(r))
          throw new TypeError("Unknown encoding: " + r);
        var e = v(t, r) | 0, o = f(e), g = o.write(t, r);
        return g !== e && (o = o.slice(0, g)), o;
      }
      function U(t) {
        for (var r = t.length < 0 ? 0 : R(t.length) | 0, e = f(r), o = 0; o < r; o += 1)
          e[o] = t[o] & 255;
        return e;
      }
      function E(t, r, e) {
        if (r < 0 || t.byteLength < r)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < r + (e || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        var o;
        return r === void 0 && e === void 0 ? o = new Uint8Array(t) : e === void 0 ? o = new Uint8Array(t, r) : o = new Uint8Array(t, r, e), Object.setPrototypeOf(o, n.prototype), o;
      }
      function F(t) {
        if (n.isBuffer(t)) {
          var r = R(t.length) | 0, e = f(r);
          return e.length === 0 || t.copy(e, 0, 0, r), e;
        }
        if (t.length !== void 0)
          return typeof t.length != "number" || pr(t.length) ? f(0) : U(t);
        if (t.type === "Buffer" && Array.isArray(t.data))
          return U(t.data);
      }
      function R(t) {
        if (t >= i)
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + i.toString(16) + " bytes");
        return t | 0;
      }
      function T(t) {
        return +t != t && (t = 0), n.alloc(+t);
      }
      n.isBuffer = function(r) {
        return r != null && r._isBuffer === !0 && r !== n.prototype;
      }, n.compare = function(r, e) {
        if (Q(r, Uint8Array) && (r = n.from(r, r.offset, r.byteLength)), Q(e, Uint8Array) && (e = n.from(e, e.offset, e.byteLength)), !n.isBuffer(r) || !n.isBuffer(e))
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        if (r === e)
          return 0;
        for (var o = r.length, g = e.length, B = 0, A = Math.min(o, g); B < A; ++B)
          if (r[B] !== e[B]) {
            o = r[B], g = e[B];
            break;
          }
        return o < g ? -1 : g < o ? 1 : 0;
      }, n.isEncoding = function(r) {
        switch (String(r).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }, n.concat = function(r, e) {
        if (!Array.isArray(r))
          throw new TypeError('"list" argument must be an Array of Buffers');
        if (r.length === 0)
          return n.alloc(0);
        var o;
        if (e === void 0)
          for (e = 0, o = 0; o < r.length; ++o)
            e += r[o].length;
        var g = n.allocUnsafe(e), B = 0;
        for (o = 0; o < r.length; ++o) {
          var A = r[o];
          if (Q(A, Uint8Array) && (A = n.from(A)), !n.isBuffer(A))
            throw new TypeError('"list" argument must be an Array of Buffers');
          A.copy(g, B), B += A.length;
        }
        return g;
      };
      function v(t, r) {
        if (n.isBuffer(t))
          return t.length;
        if (ArrayBuffer.isView(t) || Q(t, ArrayBuffer))
          return t.byteLength;
        if (typeof t != "string")
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t
          );
        var e = t.length, o = arguments.length > 2 && arguments[2] === !0;
        if (!o && e === 0)
          return 0;
        for (var g = !1; ; )
          switch (r) {
            case "ascii":
            case "latin1":
            case "binary":
              return e;
            case "utf8":
            case "utf-8":
              return er(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return e * 2;
            case "hex":
              return e >>> 1;
            case "base64":
              return hr(t).length;
            default:
              if (g)
                return o ? -1 : er(t).length;
              r = ("" + r).toLowerCase(), g = !0;
          }
      }
      n.byteLength = v;
      function l(t, r, e) {
        var o = !1;
        if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((e === void 0 || e > this.length) && (e = this.length), e <= 0) || (e >>>= 0, r >>>= 0, e <= r))
          return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return $(this, r, e);
            case "utf8":
            case "utf-8":
              return Y(this, r, e);
            case "ascii":
              return K(this, r, e);
            case "latin1":
            case "binary":
              return q(this, r, e);
            case "base64":
              return k(this, r, e);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return cr(this, r, e);
            default:
              if (o)
                throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), o = !0;
          }
      }
      n.prototype._isBuffer = !0;
      function h(t, r, e) {
        var o = t[r];
        t[r] = t[e], t[e] = o;
      }
      n.prototype.swap16 = function() {
        var r = this.length;
        if (r % 2 !== 0)
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < r; e += 2)
          h(this, e, e + 1);
        return this;
      }, n.prototype.swap32 = function() {
        var r = this.length;
        if (r % 4 !== 0)
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < r; e += 4)
          h(this, e, e + 3), h(this, e + 1, e + 2);
        return this;
      }, n.prototype.swap64 = function() {
        var r = this.length;
        if (r % 8 !== 0)
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < r; e += 8)
          h(this, e, e + 7), h(this, e + 1, e + 6), h(this, e + 2, e + 5), h(this, e + 3, e + 4);
        return this;
      }, n.prototype.toString = function() {
        var r = this.length;
        return r === 0 ? "" : arguments.length === 0 ? Y(this, 0, r) : l.apply(this, arguments);
      }, n.prototype.toLocaleString = n.prototype.toString, n.prototype.equals = function(r) {
        if (!n.isBuffer(r))
          throw new TypeError("Argument must be a Buffer");
        return this === r ? !0 : n.compare(this, r) === 0;
      }, n.prototype.inspect = function() {
        var r = "", e = c.INSPECT_MAX_BYTES;
        return r = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (r += " ... "), "<Buffer " + r + ">";
      }, a && (n.prototype[a] = n.prototype.inspect), n.prototype.compare = function(r, e, o, g, B) {
        if (Q(r, Uint8Array) && (r = n.from(r, r.offset, r.byteLength)), !n.isBuffer(r))
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
          );
        if (e === void 0 && (e = 0), o === void 0 && (o = r ? r.length : 0), g === void 0 && (g = 0), B === void 0 && (B = this.length), e < 0 || o > r.length || g < 0 || B > this.length)
          throw new RangeError("out of range index");
        if (g >= B && e >= o)
          return 0;
        if (g >= B)
          return -1;
        if (e >= o)
          return 1;
        if (e >>>= 0, o >>>= 0, g >>>= 0, B >>>= 0, this === r)
          return 0;
        for (var A = B - g, z = o - e, J = Math.min(A, z), V = this.slice(g, B), Z = r.slice(e, o), G = 0; G < J; ++G)
          if (V[G] !== Z[G]) {
            A = V[G], z = Z[G];
            break;
          }
        return A < z ? -1 : z < A ? 1 : 0;
      };
      function y(t, r, e, o, g) {
        if (t.length === 0)
          return -1;
        if (typeof e == "string" ? (o = e, e = 0) : e > 2147483647 ? e = 2147483647 : e < -2147483648 && (e = -2147483648), e = +e, pr(e) && (e = g ? 0 : t.length - 1), e < 0 && (e = t.length + e), e >= t.length) {
          if (g)
            return -1;
          e = t.length - 1;
        } else if (e < 0)
          if (g)
            e = 0;
          else
            return -1;
        if (typeof r == "string" && (r = n.from(r, o)), n.isBuffer(r))
          return r.length === 0 ? -1 : x(t, r, e, o, g);
        if (typeof r == "number")
          return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? g ? Uint8Array.prototype.indexOf.call(t, r, e) : Uint8Array.prototype.lastIndexOf.call(t, r, e) : x(t, [r], e, o, g);
        throw new TypeError("val must be string, number or Buffer");
      }
      function x(t, r, e, o, g) {
        var B = 1, A = t.length, z = r.length;
        if (o !== void 0 && (o = String(o).toLowerCase(), o === "ucs2" || o === "ucs-2" || o === "utf16le" || o === "utf-16le")) {
          if (t.length < 2 || r.length < 2)
            return -1;
          B = 2, A /= 2, z /= 2, e /= 2;
        }
        function J(vr, yr) {
          return B === 1 ? vr[yr] : vr.readUInt16BE(yr * B);
        }
        var V;
        if (g) {
          var Z = -1;
          for (V = e; V < A; V++)
            if (J(t, V) === J(r, Z === -1 ? 0 : V - Z)) {
              if (Z === -1 && (Z = V), V - Z + 1 === z)
                return Z * B;
            } else
              Z !== -1 && (V -= V - Z), Z = -1;
        } else
          for (e + z > A && (e = A - z), V = e; V >= 0; V--) {
            for (var G = !0, lr = 0; lr < z; lr++)
              if (J(t, V + lr) !== J(r, lr)) {
                G = !1;
                break;
              }
            if (G)
              return V;
          }
        return -1;
      }
      n.prototype.includes = function(r, e, o) {
        return this.indexOf(r, e, o) !== -1;
      }, n.prototype.indexOf = function(r, e, o) {
        return y(this, r, e, o, !0);
      }, n.prototype.lastIndexOf = function(r, e, o) {
        return y(this, r, e, o, !1);
      };
      function L(t, r, e, o) {
        e = Number(e) || 0;
        var g = t.length - e;
        o ? (o = Number(o), o > g && (o = g)) : o = g;
        var B = r.length;
        o > B / 2 && (o = B / 2);
        for (var A = 0; A < o; ++A) {
          var z = parseInt(r.substr(A * 2, 2), 16);
          if (pr(z))
            return A;
          t[e + A] = z;
        }
        return A;
      }
      function O(t, r, e, o) {
        return j(er(r, t.length - e), t, e, o);
      }
      function S(t, r, e, o) {
        return j(ar(r), t, e, o);
      }
      function N(t, r, e, o) {
        return S(t, r, e, o);
      }
      function P(t, r, e, o) {
        return j(hr(r), t, e, o);
      }
      function M(t, r, e, o) {
        return j(fr(r, t.length - e), t, e, o);
      }
      n.prototype.write = function(r, e, o, g) {
        if (e === void 0)
          g = "utf8", o = this.length, e = 0;
        else if (o === void 0 && typeof e == "string")
          g = e, o = this.length, e = 0;
        else if (isFinite(e))
          e = e >>> 0, isFinite(o) ? (o = o >>> 0, g === void 0 && (g = "utf8")) : (g = o, o = void 0);
        else
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        var B = this.length - e;
        if ((o === void 0 || o > B) && (o = B), r.length > 0 && (o < 0 || e < 0) || e > this.length)
          throw new RangeError("Attempt to write outside buffer bounds");
        g || (g = "utf8");
        for (var A = !1; ; )
          switch (g) {
            case "hex":
              return L(this, r, e, o);
            case "utf8":
            case "utf-8":
              return O(this, r, e, o);
            case "ascii":
              return S(this, r, e, o);
            case "latin1":
            case "binary":
              return N(this, r, e, o);
            case "base64":
              return P(this, r, e, o);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return M(this, r, e, o);
            default:
              if (A)
                throw new TypeError("Unknown encoding: " + g);
              g = ("" + g).toLowerCase(), A = !0;
          }
      }, n.prototype.toJSON = function() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function k(t, r, e) {
        return r === 0 && e === t.length ? p.fromByteArray(t) : p.fromByteArray(t.slice(r, e));
      }
      function Y(t, r, e) {
        e = Math.min(t.length, e);
        for (var o = [], g = r; g < e; ) {
          var B = t[g], A = null, z = B > 239 ? 4 : B > 223 ? 3 : B > 191 ? 2 : 1;
          if (g + z <= e) {
            var J, V, Z, G;
            switch (z) {
              case 1:
                B < 128 && (A = B);
                break;
              case 2:
                J = t[g + 1], (J & 192) === 128 && (G = (B & 31) << 6 | J & 63, G > 127 && (A = G));
                break;
              case 3:
                J = t[g + 1], V = t[g + 2], (J & 192) === 128 && (V & 192) === 128 && (G = (B & 15) << 12 | (J & 63) << 6 | V & 63, G > 2047 && (G < 55296 || G > 57343) && (A = G));
                break;
              case 4:
                J = t[g + 1], V = t[g + 2], Z = t[g + 3], (J & 192) === 128 && (V & 192) === 128 && (Z & 192) === 128 && (G = (B & 15) << 18 | (J & 63) << 12 | (V & 63) << 6 | Z & 63, G > 65535 && G < 1114112 && (A = G));
            }
          }
          A === null ? (A = 65533, z = 1) : A > 65535 && (A -= 65536, o.push(A >>> 10 & 1023 | 55296), A = 56320 | A & 1023), o.push(A), g += z;
        }
        return H(o);
      }
      var D = 4096;
      function H(t) {
        var r = t.length;
        if (r <= D)
          return String.fromCharCode.apply(String, t);
        for (var e = "", o = 0; o < r; )
          e += String.fromCharCode.apply(
            String,
            t.slice(o, o += D)
          );
        return e;
      }
      function K(t, r, e) {
        var o = "";
        e = Math.min(t.length, e);
        for (var g = r; g < e; ++g)
          o += String.fromCharCode(t[g] & 127);
        return o;
      }
      function q(t, r, e) {
        var o = "";
        e = Math.min(t.length, e);
        for (var g = r; g < e; ++g)
          o += String.fromCharCode(t[g]);
        return o;
      }
      function $(t, r, e) {
        var o = t.length;
        (!r || r < 0) && (r = 0), (!e || e < 0 || e > o) && (e = o);
        for (var g = "", B = r; B < e; ++B)
          g += wr[t[B]];
        return g;
      }
      function cr(t, r, e) {
        for (var o = t.slice(r, e), g = "", B = 0; B < o.length; B += 2)
          g += String.fromCharCode(o[B] + o[B + 1] * 256);
        return g;
      }
      n.prototype.slice = function(r, e) {
        var o = this.length;
        r = ~~r, e = e === void 0 ? o : ~~e, r < 0 ? (r += o, r < 0 && (r = 0)) : r > o && (r = o), e < 0 ? (e += o, e < 0 && (e = 0)) : e > o && (e = o), e < r && (e = r);
        var g = this.subarray(r, e);
        return Object.setPrototypeOf(g, n.prototype), g;
      };
      function W(t, r, e) {
        if (t % 1 !== 0 || t < 0)
          throw new RangeError("offset is not uint");
        if (t + r > e)
          throw new RangeError("Trying to access beyond buffer length");
      }
      n.prototype.readUIntLE = function(r, e, o) {
        r = r >>> 0, e = e >>> 0, o || W(r, e, this.length);
        for (var g = this[r], B = 1, A = 0; ++A < e && (B *= 256); )
          g += this[r + A] * B;
        return g;
      }, n.prototype.readUIntBE = function(r, e, o) {
        r = r >>> 0, e = e >>> 0, o || W(r, e, this.length);
        for (var g = this[r + --e], B = 1; e > 0 && (B *= 256); )
          g += this[r + --e] * B;
        return g;
      }, n.prototype.readUInt8 = function(r, e) {
        return r = r >>> 0, e || W(r, 1, this.length), this[r];
      }, n.prototype.readUInt16LE = function(r, e) {
        return r = r >>> 0, e || W(r, 2, this.length), this[r] | this[r + 1] << 8;
      }, n.prototype.readUInt16BE = function(r, e) {
        return r = r >>> 0, e || W(r, 2, this.length), this[r] << 8 | this[r + 1];
      }, n.prototype.readUInt32LE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
      }, n.prototype.readUInt32BE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
      }, n.prototype.readIntLE = function(r, e, o) {
        r = r >>> 0, e = e >>> 0, o || W(r, e, this.length);
        for (var g = this[r], B = 1, A = 0; ++A < e && (B *= 256); )
          g += this[r + A] * B;
        return B *= 128, g >= B && (g -= Math.pow(2, 8 * e)), g;
      }, n.prototype.readIntBE = function(r, e, o) {
        r = r >>> 0, e = e >>> 0, o || W(r, e, this.length);
        for (var g = e, B = 1, A = this[r + --g]; g > 0 && (B *= 256); )
          A += this[r + --g] * B;
        return B *= 128, A >= B && (A -= Math.pow(2, 8 * e)), A;
      }, n.prototype.readInt8 = function(r, e) {
        return r = r >>> 0, e || W(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
      }, n.prototype.readInt16LE = function(r, e) {
        r = r >>> 0, e || W(r, 2, this.length);
        var o = this[r] | this[r + 1] << 8;
        return o & 32768 ? o | 4294901760 : o;
      }, n.prototype.readInt16BE = function(r, e) {
        r = r >>> 0, e || W(r, 2, this.length);
        var o = this[r + 1] | this[r] << 8;
        return o & 32768 ? o | 4294901760 : o;
      }, n.prototype.readInt32LE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
      }, n.prototype.readInt32BE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
      }, n.prototype.readFloatLE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), s.read(this, r, !0, 23, 4);
      }, n.prototype.readFloatBE = function(r, e) {
        return r = r >>> 0, e || W(r, 4, this.length), s.read(this, r, !1, 23, 4);
      }, n.prototype.readDoubleLE = function(r, e) {
        return r = r >>> 0, e || W(r, 8, this.length), s.read(this, r, !0, 52, 8);
      }, n.prototype.readDoubleBE = function(r, e) {
        return r = r >>> 0, e || W(r, 8, this.length), s.read(this, r, !1, 52, 8);
      };
      function X(t, r, e, o, g, B) {
        if (!n.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (r > g || r < B)
          throw new RangeError('"value" argument is out of bounds');
        if (e + o > t.length)
          throw new RangeError("Index out of range");
      }
      n.prototype.writeUIntLE = function(r, e, o, g) {
        if (r = +r, e = e >>> 0, o = o >>> 0, !g) {
          var B = Math.pow(2, 8 * o) - 1;
          X(this, r, e, o, B, 0);
        }
        var A = 1, z = 0;
        for (this[e] = r & 255; ++z < o && (A *= 256); )
          this[e + z] = r / A & 255;
        return e + o;
      }, n.prototype.writeUIntBE = function(r, e, o, g) {
        if (r = +r, e = e >>> 0, o = o >>> 0, !g) {
          var B = Math.pow(2, 8 * o) - 1;
          X(this, r, e, o, B, 0);
        }
        var A = o - 1, z = 1;
        for (this[e + A] = r & 255; --A >= 0 && (z *= 256); )
          this[e + A] = r / z & 255;
        return e + o;
      }, n.prototype.writeUInt8 = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 1, 255, 0), this[e] = r & 255, e + 1;
      }, n.prototype.writeUInt16LE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 2, 65535, 0), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
      }, n.prototype.writeUInt16BE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 2, 65535, 0), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
      }, n.prototype.writeUInt32LE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 4, 4294967295, 0), this[e + 3] = r >>> 24, this[e + 2] = r >>> 16, this[e + 1] = r >>> 8, this[e] = r & 255, e + 4;
      }, n.prototype.writeUInt32BE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 4, 4294967295, 0), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
      }, n.prototype.writeIntLE = function(r, e, o, g) {
        if (r = +r, e = e >>> 0, !g) {
          var B = Math.pow(2, 8 * o - 1);
          X(this, r, e, o, B - 1, -B);
        }
        var A = 0, z = 1, J = 0;
        for (this[e] = r & 255; ++A < o && (z *= 256); )
          r < 0 && J === 0 && this[e + A - 1] !== 0 && (J = 1), this[e + A] = (r / z >> 0) - J & 255;
        return e + o;
      }, n.prototype.writeIntBE = function(r, e, o, g) {
        if (r = +r, e = e >>> 0, !g) {
          var B = Math.pow(2, 8 * o - 1);
          X(this, r, e, o, B - 1, -B);
        }
        var A = o - 1, z = 1, J = 0;
        for (this[e + A] = r & 255; --A >= 0 && (z *= 256); )
          r < 0 && J === 0 && this[e + A + 1] !== 0 && (J = 1), this[e + A] = (r / z >> 0) - J & 255;
        return e + o;
      }, n.prototype.writeInt8 = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[e] = r & 255, e + 1;
      }, n.prototype.writeInt16LE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 2, 32767, -32768), this[e] = r & 255, this[e + 1] = r >>> 8, e + 2;
      }, n.prototype.writeInt16BE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 2, 32767, -32768), this[e] = r >>> 8, this[e + 1] = r & 255, e + 2;
      }, n.prototype.writeInt32LE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 4, 2147483647, -2147483648), this[e] = r & 255, this[e + 1] = r >>> 8, this[e + 2] = r >>> 16, this[e + 3] = r >>> 24, e + 4;
      }, n.prototype.writeInt32BE = function(r, e, o) {
        return r = +r, e = e >>> 0, o || X(this, r, e, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[e] = r >>> 24, this[e + 1] = r >>> 16, this[e + 2] = r >>> 8, this[e + 3] = r & 255, e + 4;
      };
      function ir(t, r, e, o, g, B) {
        if (e + o > t.length)
          throw new RangeError("Index out of range");
        if (e < 0)
          throw new RangeError("Index out of range");
      }
      function nr(t, r, e, o, g) {
        return r = +r, e = e >>> 0, g || ir(t, r, e, 4), s.write(t, r, e, o, 23, 4), e + 4;
      }
      n.prototype.writeFloatLE = function(r, e, o) {
        return nr(this, r, e, !0, o);
      }, n.prototype.writeFloatBE = function(r, e, o) {
        return nr(this, r, e, !1, o);
      };
      function or(t, r, e, o, g) {
        return r = +r, e = e >>> 0, g || ir(t, r, e, 8), s.write(t, r, e, o, 52, 8), e + 8;
      }
      n.prototype.writeDoubleLE = function(r, e, o) {
        return or(this, r, e, !0, o);
      }, n.prototype.writeDoubleBE = function(r, e, o) {
        return or(this, r, e, !1, o);
      }, n.prototype.copy = function(r, e, o, g) {
        if (!n.isBuffer(r))
          throw new TypeError("argument should be a Buffer");
        if (o || (o = 0), !g && g !== 0 && (g = this.length), e >= r.length && (e = r.length), e || (e = 0), g > 0 && g < o && (g = o), g === o || r.length === 0 || this.length === 0)
          return 0;
        if (e < 0)
          throw new RangeError("targetStart out of bounds");
        if (o < 0 || o >= this.length)
          throw new RangeError("Index out of range");
        if (g < 0)
          throw new RangeError("sourceEnd out of bounds");
        g > this.length && (g = this.length), r.length - e < g - o && (g = r.length - e + o);
        var B = g - o;
        if (this === r && typeof Uint8Array.prototype.copyWithin == "function")
          this.copyWithin(e, o, g);
        else if (this === r && o < e && e < g)
          for (var A = B - 1; A >= 0; --A)
            r[A + e] = this[A + o];
        else
          Uint8Array.prototype.set.call(
            r,
            this.subarray(o, g),
            e
          );
        return B;
      }, n.prototype.fill = function(r, e, o, g) {
        if (typeof r == "string") {
          if (typeof e == "string" ? (g = e, e = 0, o = this.length) : typeof o == "string" && (g = o, o = this.length), g !== void 0 && typeof g != "string")
            throw new TypeError("encoding must be a string");
          if (typeof g == "string" && !n.isEncoding(g))
            throw new TypeError("Unknown encoding: " + g);
          if (r.length === 1) {
            var B = r.charCodeAt(0);
            (g === "utf8" && B < 128 || g === "latin1") && (r = B);
          }
        } else
          typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
        if (e < 0 || this.length < e || this.length < o)
          throw new RangeError("Out of range index");
        if (o <= e)
          return this;
        e = e >>> 0, o = o === void 0 ? this.length : o >>> 0, r || (r = 0);
        var A;
        if (typeof r == "number")
          for (A = e; A < o; ++A)
            this[A] = r;
        else {
          var z = n.isBuffer(r) ? r : n.from(r, g), J = z.length;
          if (J === 0)
            throw new TypeError('The value "' + r + '" is invalid for argument "value"');
          for (A = 0; A < o - e; ++A)
            this[A + e] = z[A % J];
        }
        return this;
      };
      var ur = /[^+/0-9A-Za-z-_]/g;
      function gr(t) {
        if (t = t.split("=")[0], t = t.trim().replace(ur, ""), t.length < 2)
          return "";
        for (; t.length % 4 !== 0; )
          t = t + "=";
        return t;
      }
      function er(t, r) {
        r = r || 1 / 0;
        for (var e, o = t.length, g = null, B = [], A = 0; A < o; ++A) {
          if (e = t.charCodeAt(A), e > 55295 && e < 57344) {
            if (!g) {
              if (e > 56319) {
                (r -= 3) > -1 && B.push(239, 191, 189);
                continue;
              } else if (A + 1 === o) {
                (r -= 3) > -1 && B.push(239, 191, 189);
                continue;
              }
              g = e;
              continue;
            }
            if (e < 56320) {
              (r -= 3) > -1 && B.push(239, 191, 189), g = e;
              continue;
            }
            e = (g - 55296 << 10 | e - 56320) + 65536;
          } else
            g && (r -= 3) > -1 && B.push(239, 191, 189);
          if (g = null, e < 128) {
            if ((r -= 1) < 0)
              break;
            B.push(e);
          } else if (e < 2048) {
            if ((r -= 2) < 0)
              break;
            B.push(
              e >> 6 | 192,
              e & 63 | 128
            );
          } else if (e < 65536) {
            if ((r -= 3) < 0)
              break;
            B.push(
              e >> 12 | 224,
              e >> 6 & 63 | 128,
              e & 63 | 128
            );
          } else if (e < 1114112) {
            if ((r -= 4) < 0)
              break;
            B.push(
              e >> 18 | 240,
              e >> 12 & 63 | 128,
              e >> 6 & 63 | 128,
              e & 63 | 128
            );
          } else
            throw new Error("Invalid code point");
        }
        return B;
      }
      function ar(t) {
        for (var r = [], e = 0; e < t.length; ++e)
          r.push(t.charCodeAt(e) & 255);
        return r;
      }
      function fr(t, r) {
        for (var e, o, g, B = [], A = 0; A < t.length && !((r -= 2) < 0); ++A)
          e = t.charCodeAt(A), o = e >> 8, g = e % 256, B.push(g), B.push(o);
        return B;
      }
      function hr(t) {
        return p.toByteArray(gr(t));
      }
      function j(t, r, e, o) {
        for (var g = 0; g < o && !(g + e >= r.length || g >= t.length); ++g)
          r[g + e] = t[g];
        return g;
      }
      function Q(t, r) {
        return t instanceof r || t != null && t.constructor != null && t.constructor.name != null && t.constructor.name === r.name;
      }
      function pr(t) {
        return t !== t;
      }
      var wr = function() {
        for (var t = "0123456789abcdef", r = new Array(256), e = 0; e < 16; ++e)
          for (var o = e * 16, g = 0; g < 16; ++g)
            r[o + g] = t[e] + t[g];
        return r;
      }();
    }, { "base64-js": 29, ieee754: 32 }], 31: [function(m, _, c) {
      var p = {
        single_source_shortest_paths: function(s, a, i) {
          var u = {}, f = {};
          f[a] = 0;
          var n = p.PriorityQueue.make();
          n.push(a, 0);
          for (var d, w, C, b, I, U, E, F, R; !n.empty(); ) {
            d = n.pop(), w = d.value, b = d.cost, I = s[w] || {};
            for (C in I)
              I.hasOwnProperty(C) && (U = I[C], E = b + U, F = f[C], R = typeof f[C] > "u", (R || F > E) && (f[C] = E, n.push(C, E), u[C] = w));
          }
          if (typeof i < "u" && typeof f[i] > "u") {
            var T = ["Could not find a path from ", a, " to ", i, "."].join("");
            throw new Error(T);
          }
          return u;
        },
        extract_shortest_path_from_predecessor_list: function(s, a) {
          for (var i = [], u = a; u; )
            i.push(u), s[u], u = s[u];
          return i.reverse(), i;
        },
        find_path: function(s, a, i) {
          var u = p.single_source_shortest_paths(s, a, i);
          return p.extract_shortest_path_from_predecessor_list(
            u,
            i
          );
        },
        /**
         * A very naive priority queue implementation.
         */
        PriorityQueue: {
          make: function(s) {
            var a = p.PriorityQueue, i = {}, u;
            s = s || {};
            for (u in a)
              a.hasOwnProperty(u) && (i[u] = a[u]);
            return i.queue = [], i.sorter = s.sorter || a.default_sorter, i;
          },
          default_sorter: function(s, a) {
            return s.cost - a.cost;
          },
          /**
           * Add a new item to the queue and ensure the highest priority element
           * is at the front of the queue.
           */
          push: function(s, a) {
            var i = { value: s, cost: a };
            this.queue.push(i), this.queue.sort(this.sorter);
          },
          /**
           * Return the highest priority element in the queue.
           */
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      typeof _ < "u" && (_.exports = p);
    }, {}], 32: [function(m, _, c) {
      c.read = function(p, s, a, i, u) {
        var f, n, d = u * 8 - i - 1, w = (1 << d) - 1, C = w >> 1, b = -7, I = a ? u - 1 : 0, U = a ? -1 : 1, E = p[s + I];
        for (I += U, f = E & (1 << -b) - 1, E >>= -b, b += d; b > 0; f = f * 256 + p[s + I], I += U, b -= 8)
          ;
        for (n = f & (1 << -b) - 1, f >>= -b, b += i; b > 0; n = n * 256 + p[s + I], I += U, b -= 8)
          ;
        if (f === 0)
          f = 1 - C;
        else {
          if (f === w)
            return n ? NaN : (E ? -1 : 1) * (1 / 0);
          n = n + Math.pow(2, i), f = f - C;
        }
        return (E ? -1 : 1) * n * Math.pow(2, f - i);
      }, c.write = function(p, s, a, i, u, f) {
        var n, d, w, C = f * 8 - u - 1, b = (1 << C) - 1, I = b >> 1, U = u === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, E = i ? 0 : f - 1, F = i ? 1 : -1, R = s < 0 || s === 0 && 1 / s < 0 ? 1 : 0;
        for (s = Math.abs(s), isNaN(s) || s === 1 / 0 ? (d = isNaN(s) ? 1 : 0, n = b) : (n = Math.floor(Math.log(s) / Math.LN2), s * (w = Math.pow(2, -n)) < 1 && (n--, w *= 2), n + I >= 1 ? s += U / w : s += U * Math.pow(2, 1 - I), s * w >= 2 && (n++, w /= 2), n + I >= b ? (d = 0, n = b) : n + I >= 1 ? (d = (s * w - 1) * Math.pow(2, u), n = n + I) : (d = s * Math.pow(2, I - 1) * Math.pow(2, u), n = 0)); u >= 8; p[a + E] = d & 255, E += F, d /= 256, u -= 8)
          ;
        for (n = n << u | d, C += u; C > 0; p[a + E] = n & 255, E += F, n /= 256, C -= 8)
          ;
        p[a + E - F] |= R * 128;
      };
    }, {}], 33: [function(m, _, c) {
      var p = {}.toString;
      _.exports = Array.isArray || function(s) {
        return p.call(s) == "[object Array]";
      };
    }, {}] }, {}, [24])(24);
  });
}), Er = {
  name: "qrcode",
  props: {
    /**
     * The value of the QR code.
     */
    value: null,
    /**
     * The options for the QR code generator.
     * {@link https://github.com/soldair/node-qrcode#qr-code-options}
     */
    options: Object,
    /**
     * The tag name of the component's root element.
     */
    tag: {
      type: String,
      default: "canvas"
    }
  },
  render: function(rr) {
    return rr(this.tag, this.$slots.default);
  },
  watch: {
    $props: {
      deep: !0,
      immediate: !0,
      /**
       * Update the QR code when props changed.
       */
      handler: function() {
        this.$el && this.generate();
      }
    }
  },
  methods: {
    /**
     * Generate QR code.
     */
    generate: function() {
      var rr = this, m = this.options, _ = this.tag, c = String(this.value);
      _ === "canvas" ? dr.toCanvas(this.$el, c, m, function(p) {
        if (p)
          throw p;
      }) : _ === "img" ? dr.toDataURL(c, m, function(p, s) {
        if (p)
          throw p;
        rr.$el.src = s;
      }) : dr.toString(c, m, function(p, s) {
        if (p)
          throw p;
        rr.$el.innerHTML = s;
      });
    }
  },
  mounted: function() {
    this.generate();
  }
};
export {
  Er as i
};
