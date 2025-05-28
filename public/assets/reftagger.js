!(function (e, t) {
  e.refTaggerCallback || (e.refTagger = t())
}(this, () => {
  let e, t, o
  return (function (n) {
    function r(e, t) {
      return C.call(e, t)
    }
    function s(e, t) {
      let o; let n; let r; let s; let i; let a; let l; let c; let d; let h; let p; let u = t && t.split('/'); let f = T.map; let g = f && f['*'] || {}
      if (e && e.charAt(0) === '.') {
        if (t) {
          for (u = u.slice(0, u.length - 1),
          e = e.split('/'),
          i = e.length - 1,
          T.nodeIdCompat && L.test(e[i]) && (e[i] = e[i].replace(L, '')),
          e = u.concat(e),
          d = 0; d < e.length; d += 1) {
            if (p = e[d],
            p === '.') {
              e.splice(d, 1),
              d -= 1
            }
            else if (p === '..') {
              if (d === 1 && (e[2] === '..' || e[0] === '..'))
                break
              d > 0 && (e.splice(d - 1, 2),
              d -= 2)
            }
          }
          e = e.join('/')
        }
        else {
          e.indexOf('./') === 0 && (e = e.substring(2))
        }
      }
      if ((u || g) && f) {
        for (o = e.split('/'),
        d = o.length; d > 0; d -= 1) {
          if (n = o.slice(0, d).join('/'),
          u) {
            for (h = u.length; h > 0; h -= 1) {
              if (r = f[u.slice(0, h).join('/')],
              r && (r = r[n])) {
                s = r,
                a = d
                break
              }
            }
          }
          if (s)
            break
          !l && g && g[n] && (l = g[n],
          c = d)
        }
        !s && l && (s = l,
        a = c),
        s && (o.splice(0, a, s),
        e = o.join('/'))
      }
      return e
    }
    function i(e, t) {
      return function () {
        return u.apply(n, y.call(arguments, 0).concat([e, t]))
      }
    }
    function a(e) {
      return function (t) {
        return s(t, e)
      }
    }
    function l(e) {
      return function (t) {
        m[e] = t
      }
    }
    function c(e) {
      if (r(b, e)) {
        let t = b[e]
        delete b[e],
        v[e] = !0,
        p.apply(n, t)
      }
      if (!r(m, e) && !r(v, e))
        throw new Error(`No ${e}`)
      return m[e]
    }
    function d(e) {
      let t; let o = e ? e.indexOf('!') : -1
      return o > -1 && (t = e.substring(0, o),
      e = e.substring(o + 1, e.length)),
      [t, e]
    }
    function h(e) {
      return function () {
        return T && T.config && T.config[e] || {}
      }
    }
    let p; let u; let f; let g; var m = {}; var b = {}; var T = {}; var v = {}; var C = Object.prototype.hasOwnProperty; var y = [].slice; var L = /\.js$/
    f = function (e, t) {
      let o; let n = d(e); let r = n[0]
      return e = n[1],
      r && (r = s(r, t),
      o = c(r)),
      r
        ? e = o && o.normalize ? o.normalize(e, a(t)) : s(e, t)
        : (e = s(e, t),
          n = d(e),
          r = n[0],
          e = n[1],
          r && (o = c(r))),
      {
        f: r ? `${r}!${e}` : e,
        n: e,
        pr: r,
        p: o,
      }
    },
    g = {
      require(e) {
        return i(e)
      },
      exports(e) {
        let t = m[e]
        return typeof t != 'undefined' ? t : m[e] = {}
      },
      module(e) {
        return {
          id: e,
          uri: '',
          exports: m[e],
          config: h(e),
        }
      },
    },
    p = function (e, t, o, s) {
      let a; let d; let h; let p; let u; let T; let C = []; let y = typeof o
      if (s = s || e,
      y === 'undefined' || y === 'function') {
        for (t = !t.length && o.length ? ['require', 'exports', 'module'] : t,
        u = 0; u < t.length; u += 1) {
          if (p = f(t[u], s),
          d = p.f,
          d === 'require') {
            C[u] = g.require(e)
          }
          else if (d === 'exports') {
            C[u] = g.exports(e),
            T = !0
          }
          else if (d === 'module') {
            a = C[u] = g.module(e)
          }
          else if (r(m, d) || r(b, d) || r(v, d)) {
            C[u] = c(d)
          }
          else {
            if (!p.p)
              throw new Error(`${e} missing ${d}`)
            p.p.load(p.n, i(s, !0), l(d), {}),
            C[u] = m[d]
          }
        }
        h = o ? o.apply(m[e], C) : void 0,
        e && (a && a.exports !== n && a.exports !== m[e] ? m[e] = a.exports : h === n && T || (m[e] = h))
      }
      else {
        e && (m[e] = o)
      }
    },
    e = t = u = function (e, t, o, r, s) {
      if (typeof e == 'string')
        return g[e] ? g[e](t) : c(f(e, t).f)
      if (!e.splice) {
        if (T = e,
        T.deps && u(T.deps, T.callback),
        !t) {
          return
        }
        t.splice
          ? (e = t,
            t = o,
            o = null)
          : e = n
      }
      return t = t || function () { },
      typeof o == 'function' && (o = r,
      r = s),
      r
        ? p(n, e, t, o)
        : setTimeout(() => {
            p(n, e, t, o)
          }, 4),
      u
    },
    u.config = function (e) {
      return u(e)
    },
    e._defined = m,
    o = function (e, t, o) {
      t.splice || (o = t,
      t = []),
      r(m, e) || r(b, e) || (b[e] = [e, t, o])
    },
    o.amd = {
      jQuery: !0,
    }
  }()),
  o('......\node_modulesalmondalmond.js', () => { }),
  o('config', {
    brandSite: 'https://www.logos.com/reftagger?utm_source=web&utm_medium=linktologos&utm_content=reftaggertooltip&utm_campaign=biblia',
    readers: {
      'biblia': {
        url: 'https://biblia.com',
        target: 'biblia',
      },
      'bible.faithlife': {
        url: 'https://bible.faithlife.com',
        target: 'fl',
      },
      'app.logos': {
        url: 'https://ref.ly/app',
        target: 'app',
      },
    },
    noSearchTags: {
      applet: !0,
      hr: !0,
      head: !0,
      img: !0,
      input: !0,
      meta: !0,
      script: !0,
      select: !0,
      textarea: !0,
    },
    createTooltipDelay: 250,
    removeTooltipDelay: 300,
    defaultSettings: {
      addLibronixDLSLink: !1,
      addLogosLink: !1,
      appendIconToLibLinks: !1,
      appendIconToLogosLinks: !1,
      bibleReader: 'biblia',
      bibleVersion: '',
      caseInsensitive: !1,
      convertHyperlinks: !1,
      cssOverride: !1,
      customStyle: null,
      disableInlineCss: !1,
      dropShadow: !0,
      enableSharingPopups: !0,
      hyperlinkTestList: [],
      libronixBibleVersion: '',
      libronixLinkIcon: null,
      linksOpenNewWindow: !0,
      logosBibleVersion: '',
      logosLinkIcon: 'dark',
      nonce: null,
      noSearchClassNames: [],
      noSearchTagNames: ['h1', 'h2', 'h3'],
      rootNode: null,
      roundCorners: !1,
      socialSharing: ['twitter', 'facebook'],
      tagAutomatically: !0,
      tagChapters: !1,
      tooltipStyle: 'light',
      useTooltip: !0,
    },
    socialSharing: {
      twitter: {
        id: 'rtTwitter',
        link: 'https://twitter.com/intent/tweet?url=',
        windowSettings: 'width=420,height=488',
        title: 'Twitter',
      },
      facebook: {
        id: 'rtFacebook',
        link: 'https://www.facebook.com/sharer/sharer.php?u=',
        windowSettings: 'width=626,height=436',
        title: 'Facebook',
      },
    },
  }),
  o('root', [], function () {
    return this
  }),
  o('versions', {
    bibliaVersionAbbreviations: {
      dar: 'darby',
      nasb: 'nasb95',
      gw: 'godsword',
      kjv21: 'kjv1900',
      nivuk: 'niv',
      kar: 'hu-bible',
      byz: 'byzprsd',
      kjv: 'kjv1900',
      net: 'gs-netbible',
      s21: 'ec-sbgbibs212007',
    },
    supportedVersions: ['AB', 'ASV', 'CEV', 'DARBY', 'DAR', 'ESV', 'GRMNBBLGBRSTZNG', 'GW', 'HCSB', 'KJ21', 'KJV', 'LSG', 'NASB', 'NCV', 'NET', 'NIRV', 'NIV', 'NIVUK', 'NKJV', 'NLT', 'NLV', 'NRSV', 'MESSAGE', 'S21', 'TNIV', 'WE', 'WNT', 'YLT', 'TNIV', 'NIRV', 'TNIV', 'NASB', 'WESTCOTT', 'CHASAOT', 'STEPHENS', 'AV 1873', 'KJV APOC', 'ELZEVIR', 'IT-DIODATI1649', 'TISCH', 'TISCHENDORF', 'CS-KR1579', 'TR1881', 'TR1894MR', 'TR1550MR', 'KAR', 'BYZ', 'LEB', 'RVR60', 'KO-KRV', 'vulgataclem', 'douayrheims', 'nvi', 'grmnbblschl2000', 'bbl1819txtrcpts', 'bbl1914rvscrrgd', 'bbls1885vlgtltn', 'hlybbltrdshndtn', 'hlybblsmpshndtn', 'CSB', 'NTV'],
  }),
  o('nls/readerQueryParams', {}),
  o('passageManager', ['config', 'versions', 'nls/readerQueryParams'], (e, t, o) => {
    'use strict'
    function n(e, t) {
      return `${e}-${t || ''}`
    }
    function r(e) {
      return e = (e || '').toLowerCase(),
      e === 'default' && (e = ''),
      t.bibliaVersionAbbreviations[e] || e
    }
    function s(t) {
      return e.readers[t] || e.readers.biblia
    }
    function i(e, t, s, i) {
      let u, f, g, m, b
      if (t = r(t),
      u = n(e, t),
      l.hasOwnProperty(u)) {
        i && i(l[u])
      }
      else if (c.hasOwnProperty(u)) {
        i && c[u].push(i)
      }
      else {
        c[u] = i ? [i] : [],
        g = ['https:', '//reftagger.bibliacdn.com', '/bible/', t ? `${encodeURIComponent(t)}/` : '', encodeURIComponent(e), '?target=reftagger&callback=refTaggerCallback&noInlineStyle=true']
        for (m in o)
          o.hasOwnProperty(m) && Array.prototype.push.apply(g, ['&', m, '=', encodeURIComponent(o[m])])
        f = g.join(''),
        p[u] = setTimeout(() => {
          let e; let t = h[u]; let o = c[u]; let n = o.length
          for (t.parentNode.removeChild(t),
          e = 0; n > e; e++)
            o[e]()
          delete c[u]
        }, 5e3),
        b = a.createElement('script'),
        b.src = f,
        d.insertBefore(b, d.firstChild),
        h[u] = b
      }
    }
    var a = window.document
    var l = {}
    var c = {}
    var d = a.getElementsByTagName('head')[0]
    var h = {}
    var p = {}
    return window.refTaggerCallback = function (e) {
      let t; let o; let r; let s = e.requestedVersion; let i = e.requestedReference; let a = n(i, s); let d = c[a]
      if (l[a] = e,
      d) {
        for (t = h[a],
        t.parentNode.removeChild(t),
        r = d.length,
        clearTimeout(p[a]),
        o = 0; r > o; o++)
          d[o](e)
        delete c[a]
      }
    },
    {
      getPassage: i,
      getVersion: r,
      getBibleReader: s,
    }
  }),
  o('util/classNames', {
    classNames: {
      tooltip: 'rtTooltip',
      tooltipContainer: 'rtContainer',
      tooltipHeader: 'rtTooltipHeader',
      tooltipBody: 'rtTooltipBody',
      tooltipReference: 'rtTooltipReference',
      tooltipVersion: 'rtTooltipVersion',
      tooltipFooter: 'rtTooltipFooter',
      tooltipBrandLink: 'rtTooltipBrandLink',
      tooltipLogosIcon: 'rtTooltipLogosIcon',
      tooltipMoreLink: 'rtTooltipMoreLink',
      tooltipDropShadow: 'rtTooltipDropShadow',
      tooltipRoundedCorners: 'rtTooltipRoundedCorners',
      bibleRef: 'rtBibleRef',
    },
  }),
  o('util/dom', ['root'], (e) => {
    'use strict'
    function t(t) {
      let o = e.document
      let n = o.body
      let r = {}
      return t
        ? typeof t.scrollLeft == 'number' && (t.scrollLeft || t.scrollTop)
          ? (r.x = t.scrollLeft,
            r.y = t.scrollTop)
          : r = null
        : (r.x = e.pageXOffset || n.scrollLeft || o.documentElement.scrollLeft,
          r.y = e.pageYOffset || n.scrollTop || o.documentElement.scrollTop),
      r
    }
    function o(e) {
      const rect = e.getBoundingClientRect()
      return {
        x: rect.left + window.pageXOffset,
        y: rect.top + window.pageYOffset,
      }
    }
    function n() {
      let o = t()
      let n = {
        width: e.innerWidth || l.clientWidth || a.documentElement.clientWidth,
        height: e.innerHeight || l.clientHeight || a.documentElement.clientHeight,
      }
      return o && (n.x = o.x,
      n.y = o.y),
      n
    }
    function r(e, t) {
      t.parentNode.insertBefore(a.createTextNode(e), t)
    }
    function s(e, t) {
      let o; let n = a.createElement(e)
      t = t || {}
      for (o in t)
        n[o] = t[o]
      return n
    }
    function i(e, t) {
      let o
      t = t || {}
      for (o in t)
        typeof e.style[o] != 'undefined' && (e.style[o] = t[o])
      return e
    }
    var a = e.document
    var l = a.body
    return {
      applyStyles: i,
      createElement: s,
      getElementAbsoluteOffset: o,
      getElementOffset: t,
      getWindowSize: n,
      insertTextNode: r,
    }
  }),
  o('nls/resourceStrings', {
    tooltip: {
      loading: 'Loading...',
      more: 'more &raquo;',
      brandMessage: 'Powered by',
      brandMessage2: 'Logos',
      errorHeader: 'Sorry',
      errorBody: 'This reference could not be loaded at this time.',
      shareOn: 'Share on ',
    },
    logosLinkTitle: 'Open in Logos Bible Software (if available)',
    normalizeReference(e) {
      return e.replace(/(\s|\r?\n)+/g, ' ').replace(/:/g, '.').replace(/^(\d+)\.+/, '$1').replace('brief', '')
    },
  }),
  o('libs/text', ['module'], (e) => {
    'use strict'
    let o; let n; let r; let s; let i = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0']; let a = /^\s*<\?xml(\s)+version=['"](\d)*.(\d)*['"](\s)*\?>/im; let l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/i; let c = typeof location != 'undefined' && location.href; let d = c && location.protocol && location.protocol.replace(/:/, ''); let h = c && location.hostname; let p = c && (location.port || void 0); let u = {}; let f = e.config && e.config() || {}
    return o = {
      version: '2.0.7',
      strip(e) {
        if (e) {
          e = e.replace(a, '')
          let t = e.match(l)
          t && (e = t[1])
        }
        else {
          e = ''
        }
        return e
      },
      jsEscape(e) {
        return e.replace(/(['\\])/g, '\\$1').replace(/\f/g, '\\f').replace(/[\b]/g, '\\b').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029')
      },
      createXhr: f.createXhr || function () {
        let e, t, o
        if (typeof XMLHttpRequest != 'undefined')
          return new XMLHttpRequest()
        if (typeof ActiveXObject != 'undefined') {
          for (t = 0; t < 3; t += 1) {
            o = i[t]
            try {
              e = new ActiveXObject(o)
            }
            catch (n) { }
            if (e) {
              i = [o]
              break
            }
          }
        }
        return e
      },
      parseName(e) {
        let t; let o; let n; let r = !1; let s = e.indexOf('.'); let i = e.indexOf('./') === 0 || e.indexOf('../') === 0
        return s !== -1 && (!i || s > 1)
          ? (t = e.substring(0, s),
            o = e.substring(s + 1, e.length))
          : t = e,
        n = o || t,
        s = n.indexOf('!'),
        s !== -1 && (r = n.substring(s + 1) === 'strip',
        n = n.substring(0, s),
        o ? o = n : t = n),
        {
          moduleName: t,
          ext: o,
          strip: r,
        }
      },
      xdRegExp: /^((\w+):)?\/\/([^/\\]+)/,
      useXhr(e, t, n, r) {
        let s; let i; let a; let l = o.xdRegExp.exec(e)
        return l
          ? (s = l[2],
            i = l[3],
            i = i.split(':'),
            a = i[1],
            i = i[0],
            !(s && s !== t || i && i.toLowerCase() !== n.toLowerCase() || (a || i) && a !== r))
          : !0
      },
      finishLoad(e, t, n, r) {
        n = t ? o.strip(n) : n,
        f.isBuild && (u[e] = n),
        r(n)
      },
      load(e, t, n, r) {
        if (r.isBuild && !r.inlineText)
          return void n()
        f.isBuild = r.isBuild
        let s = o.parseName(e)
        let i = s.moduleName + (s.ext ? `.${s.ext}` : '')
        let a = t.toUrl(i)
        let l = f.useXhr || o.useXhr
        !c || l(a, d, h, p)
          ? o.get(a, (t) => {
              o.finishLoad(e, s.strip, t, n)
            }, (e) => {
              n.error && n.error(e)
            })
          : t([i], (e) => {
              o.finishLoad(`${s.moduleName}.${s.ext}`, s.strip, e, n)
            })
      },
      write(e, t, n, r) {
        if (u.hasOwnProperty(t)) {
          let s = o.jsEscape(u[t])
          n.asModule(`${e}!${t}`, `define(function () { return '${s}';});\n`)
        }
      },
      writeFile(e, t, n, r, s) {
        let i = o.parseName(t)
        let a = i.ext ? `.${i.ext}` : ''
        let l = i.moduleName + a
        let c = `${n.toUrl(i.moduleName + a)}.js`
        o.load(l, n, (t) => {
          let n = function (e) {
            return r(c, e)
          }
          n.asModule = function (e, t) {
            return r.asModule(e, c, t)
          },
          o.write(e, l, n, s)
        }, s)
      },
    },
    f.env === 'node' || !f.env && typeof process != 'undefined' && process.versions && process.versions.node
      ? (n = t.nodeRequire('fs'),
        o.get = function (e, t, o) {
          try {
            let r = n.readFileSync(e, 'utf8')
            r.indexOf('\uFEFF') === 0 && (r = r.substring(1)),
            t(r)
          }
          catch (s) {
            o(s)
          }
        }
        )
      : f.env === 'xhr' || !f.env && o.createXhr()
        ? o.get = function (e, t, n, r) {
          let s; let i = o.createXhr()
          if (i.open('GET', e, !0),
          r) {
            for (s in r)
              r.hasOwnProperty(s) && i.setRequestHeader(s.toLowerCase(), r[s])
          }
          f.onXhr && f.onXhr(i, e),
          i.onreadystatechange = function (o) {
            let r, s
            i.readyState === 4 && (r = i.status,
            r > 399 && r < 600
              ? (s = new Error(`${e} HTTP status: ${r}`),
                s.xhr = i,
                n(s))
              : t(i.responseText),
            f.onXhrComplete && f.onXhrComplete(i, e))
          },
          i.send(null)
        }
        : f.env === 'rhino' || !f.env && typeof Packages != 'undefined' && typeof java != 'undefined'
          ? o.get = function (e, t) {
            let o; let n; let r = 'utf-8'; let s = new java.io.File(e); let i = java.lang.System.getProperty('line.separator'); let a = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), r)); let l = ''
            try {
              for (o = new java.lang.StringBuffer(),
              n = a.readLine(),
              n && n.length() && n.charAt(0) === 65279 && (n = n.substring(1)),
              n !== null && o.append(n); (n = a.readLine()) !== null;) {
                o.append(i),
                o.append(n)
              }
              l = String(o.toString())
            }
            finally {
              a.close()
            }
            t(l)
          }
          : (f.env === 'xpconnect' || !f.env && typeof Components != 'undefined' && Components.classes && Components.interfaces) && (r = Components.classes,
            s = Components.interfaces,
            Components.utils.import('resource://gre/modules/FileUtils.jsm'),
            o.get = function (e, t) {
              let o; let n; let i = {}; let a = new FileUtils.File(e)
              try {
                o = r['@mozilla.org/network/file-input-stream;1'].createInstance(s.nsIFileInputStream),
                o.init(a, 1, 0, !1),
                n = r['@mozilla.org/intl/converter-input-stream;1'].createInstance(s.nsIConverterInputStream),
                n.init(o, 'utf-8', o.available(), s.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),
                n.readString(o.available(), i),
                n.close(),
                o.close(),
                t(i.value)
              }
              catch (l) {
                throw new Error(`${a && a.path || ''}: ${l}`)
              }
            }
            ),
    o
  }),
  o('libs/text!util/tooltipTemplate', [], () => {
    return '<div class="{{tooltipContainer}}">\n	<div class="{{tooltipHeader}}">{{reference}} {{version}} {{socialContent}}</div>\n	<div class="{{tooltipBody}}">{{content}}</div>\n	<div class="{{tooltipFooter}}">\n		<div class="{{tooltipBrandLink}}">\n			<a href="{{brandSite}}" target="_blank" rel="noopener">\n				<span>{{brandMessage}}</span>\n				<svg class="{{tooltipLogosIcon}}" xmlns="http://www.w3.org/2000/svg" width="67" height="16" viewBox="0 0 67 16" fill="none">\n					<g clip-path="url(#clip0_23886_68167)">\n						<path d="M31.5066 13.8391C28.5554 13.8391 26.4919 11.463 26.4919 8.06176V7.90148C26.4919 4.4824 28.5656 2.09363 31.5369 2.09363C34.5083 2.09363 36.5515 4.46969 36.5515 7.86842V8.02868C36.5515 11.4478 34.4779 13.8365 31.5066 13.8365V13.8391ZM31.5066 4.0474C29.7895 4.0474 28.6389 5.59667 28.6389 7.90403V8.01597C28.6389 10.2953 29.8324 11.8879 31.5395 11.8879C33.2464 11.8879 34.4071 10.3386 34.4071 8.03123V7.91929C34.4071 5.6399 33.2135 4.0474 31.5066 4.0474Z" fill="#1E6AFE"/>\n						<path d="M53.166 13.8391C50.2148 13.8391 48.1514 11.463 48.1514 8.06176V7.90148C48.1514 4.4824 50.225 2.09363 53.1963 2.09363C56.1678 2.09363 58.2109 4.46969 58.2109 7.86842V8.02868C58.2109 11.4478 56.1373 13.8365 53.166 13.8365V13.8391ZM53.166 4.0474C51.4489 4.0474 50.2984 5.59667 50.2984 7.90403V8.01597C50.2984 10.2953 51.492 11.8879 53.1989 11.8879C54.9058 11.8879 56.0666 10.3386 56.0666 8.03123V7.91929C56.0666 5.6399 54.8729 4.0474 53.166 4.0474Z" fill="#1E6AFE"/>\n						<path d="M60.1101 10.6746C61.0761 11.5421 61.9384 11.9287 62.9019 11.9287C63.8654 11.9287 64.5204 11.4098 64.5204 10.6339C64.5204 9.99279 64.2043 9.56031 62.4795 8.91923C60.4034 8.13315 59.2023 7.314 59.2023 5.44419V5.41112C59.2023 3.50061 60.6968 2.16757 62.8387 2.16757C64.1638 2.16757 65.3372 2.5975 66.331 3.4421C66.4194 3.51841 66.4322 3.65324 66.3639 3.74737L65.4205 5.02698C65.4205 5.02698 65.3675 5.08804 65.279 5.09821C65.1955 5.10585 65.1172 5.04734 65.1172 5.04734C64.3155 4.41134 63.5316 4.09081 62.7907 4.09081C61.8979 4.09081 61.2986 4.5589 61.2986 5.25594C61.2986 5.95299 61.6324 6.35239 63.5164 7.0825C65.3675 7.7999 66.6015 8.65212 66.6015 10.4787V10.5118C66.6015 12.4782 65.0741 13.852 62.8867 13.852C61.3796 13.852 60.0292 13.3228 58.8709 12.2773C58.7825 12.1984 58.7748 12.061 58.8482 11.9694L59.8572 10.7102C59.8572 10.7102 59.8951 10.6517 59.9735 10.6389C60.0519 10.6262 60.1126 10.6797 60.1126 10.6797L60.1101 10.6746Z" fill="#1E6AFE"/>\n						<path d="M45.468 4.95313L46.4415 3.64553C46.5124 3.54886 46.4972 3.41149 46.4061 3.33771C45.3617 2.4804 44.3022 2.11407 42.8886 2.11407C39.8742 2.11407 37.6843 4.55627 37.6843 7.92192V8.04913C37.6843 11.5038 39.768 13.8265 42.8734 13.8265C44.674 13.8265 45.999 13.0455 46.7779 12.4095V7.22743H43.2249C43.1212 7.22743 43.0328 7.29866 43.01 7.39787L42.666 8.82248C42.6307 8.9624 42.7368 9.09978 42.8809 9.09978H44.7927V11.3639C44.2947 11.7022 43.627 11.8956 42.9518 11.8956C41.0553 11.8956 39.8287 10.3692 39.8287 8.00587V7.90921C39.8287 5.69342 41.1007 4.08309 42.8557 4.08309C43.9481 4.08309 44.5551 4.49013 45.1241 4.9633C45.1468 4.98366 45.2253 5.04725 45.3188 5.03708C45.4123 5.02689 45.4554 4.97093 45.4654 4.95568L45.468 4.95313Z" fill="#1E6AFE"/>\n						<path d="M26.1531 11.7126H21.844V2.49587C21.844 2.37122 21.7454 2.272 21.6214 2.272H19.9853C19.8614 2.272 19.7627 2.37122 19.7627 2.49587V13.6205C19.7627 13.646 19.783 13.6663 19.8082 13.6663H25.7914C25.8951 13.6663 25.9837 13.5952 26.0065 13.4959L26.3706 11.9925C26.4059 11.8525 26.2998 11.7152 26.1557 11.7152L26.1531 11.7126Z" fill="#1E6AFE"/>\n						<path fill-rule="evenodd" clip-rule="evenodd" d="M2.20803 0H13.7642C14.9837 0 15.9722 0.988437 15.9722 2.20799V13.7642C15.9722 14.9837 14.9837 15.9722 13.7642 15.9722H2.20803C1.89326 15.9722 1.59415 15.906 1.32321 15.7871C1.25309 15.7564 1.23912 15.6652 1.29323 15.6111L4.82023 12.0797C4.85506 12.0502 4.90042 12.0408 4.94254 12.0502C5.79491 12.6933 6.85545 13.0749 8.00536 13.0749C10.8163 13.0749 13.0948 10.7964 13.0948 7.98552C13.0948 5.17465 10.8163 2.89619 8.00536 2.89619C5.19445 2.89619 2.91595 5.17465 2.91595 7.98552C2.91595 9.08087 3.26236 10.0955 3.85121 10.926C3.87686 10.9746 3.87147 11.0353 3.83447 11.0785L0.321383 14.5826C0.265643 14.6383 0.171737 14.6215 0.143722 14.548C0.0509233 14.3043 0 14.0401 0 13.7639V2.20799C0 0.988437 0.988454 0 2.20803 0ZM11.8004 7.97688C11.8004 10.1093 10.1008 11.8377 8.00402 11.8377C5.90724 11.8377 4.20761 10.1093 4.20761 7.97688C4.20761 5.84449 5.90724 4.11601 8.00402 4.11601C10.1008 4.11601 11.8004 5.84449 11.8004 7.97688ZM6.27461 6.83914C6.21189 6.83914 6.16103 6.88999 6.16103 6.95273V7.90946C6.16103 7.97219 6.21189 8.02305 6.27461 8.02305H7.41192V10.2516C7.41192 10.3144 7.46278 10.3652 7.5255 10.3652H8.48226C8.54499 10.3652 8.59585 10.3144 8.59585 10.2516V8.02305H9.73584C9.79858 8.02305 9.84944 7.97219 9.84944 7.90946V6.95273C9.84944 6.88999 9.79858 6.83914 9.73586 6.83914H8.59585V5.69916C8.59585 5.63642 8.54499 5.58557 8.48226 5.58557H7.5255C7.46278 5.58557 7.41192 5.63642 7.41192 5.69916V6.83914H6.27461Z" fill="#1E6AFE"/>\n					</g>\n					<defs>\n						<clipPath id="clip0_23886_68167">\n							<rect width="66.6016" height="16" fill="white"/>\n						</clipPath>\n					</defs>\n				</svg>\n			</a>\n		</div>\n		{{footer}}\n	</div>\n</div>'
  }),
  o('tooltips', ['config', 'root', 'util/classNames', 'util/dom', 'passageManager', 'nls/resourceStrings', 'nls/readerQueryParams', 'libs/text!util/tooltipTemplate'], (e, t, o, n, r, s, i, a) => {
    'use strict'
    function l(e, t, o, n, r) {
      let s = {
        x: t.x + o.tooltipOffsetX,
        y: t.y - r,
      }
      return s.x += n,
      s.x > e.width + e.x - o.tooltipEdgePadding && (s.x = e.width + e.x - o.tooltipOffsetX - o.tooltipEdgePadding),
      s.x < 0 && (s.x = 0),
      s.y < e.y && (t.y + r + o.tooltipOffsetY > e.height + e.y ? s.y = e.y : s.y = t.y + o.tooltipOffsetY),
      s.x -= n + 3,
      s.x < 0 && (s.x = 0),
      s
    }
    function c(e, t, o) {
      o = r.getBibleReader(o)
      let n
      if (Object.keys(i).length > 0) {
        o.target === 'app' && (o = r.getBibleReader('biblia'))
        let s; let a = `${o.url}/bible/`; let l = []
        for (s in i)
          i.hasOwnProperty(s) && l.push(`${s}=${i[s]}`)
        return t = r.getVersion(t),
        n = [a, t ? `${t}/` : '', e.replace(/:/g, '.')],
        l.length && n.push(`?${l.join('&')}`),
        encodeURI(n.join('').replace(/(\s|\r?\n)+/g, ' '))
      }
      return t = r.getVersion(t),
      n = ['https://ref.ly/', e.replace(/:/g, '.'), t ? `;${t}` : '', `?t=${o.target}`],
      encodeURI(n.join('').replace(/(\s|\r?\n)+/g, ' '))
    }
    function d(e) {
      return L.replace('{{reference}}', e.reference || '').replace('{{version}}', e.version || '').replace('{{content}}', e.content || '').replace('{{footer}}', e.footer || '').replace('{{socialContent}}', e.socialContent || '')
    }
    function h() {
      return y !== null
    }
    function p(e, t) {
      let r = n.createElement('div', {
        className: `${o.classNames.tooltip} ${e.tooltipStyle} ${e.includeDropShadow ? o.classNames.tooltipDropShadow : ''} ${e.includeRoundedCorners ? o.classNames.tooltipRoundedCorners : ''}`,
        onmouseover: T,
        onmouseout: g,
      })
      return r.innerHTML = d(t),
      r
    }
    function u(r, i, a) {
      function l() {
        let o; let i; let l; let c = a.socialSharing.length
        for (i = 0; c > i; i++) {
          if (l = a.socialSharing[i],
          e.socialSharing.hasOwnProperty(l)) {
            let h = a.customStyle && a.customStyle.heading && a.customStyle.heading.iconStyle
            let p = h || a.tooltipStyle
            o = n.createElement('a', {
              className: `rtTooltipSocialIcon ${p}`,
              id: e.socialSharing[l].id,
              href: e.socialSharing[l].link + encodeURIComponent(r.url),
              title: s.tooltip.shareOn + e.socialSharing[l].title,
              target: '_blank',
              rel: 'noopener',
              innerHTML: ' ',
            }),
            a.enableSharingPopups && (o.setAttribute('data-window-settings', e.socialSharing[l].windowSettings),
            o.addEventListener && o.addEventListener('click', function () {
              t.open(this.href, '', this.getAttribute('data-window-settings'))
            }, !1)),
            d.appendChild(o)
          }
        }
        return d.outerHTML
      }
      var d = n.createElement('div', {
        className: 'rtTooltipSocial',
      })
      let h = c(i.reference, i.version, i.bibleReader)
      let p = {
        reference: '',
        version: '',
        content: '',
        footer: '',
        socialContent: '',
      }
      return r
        ? (p.content = r.content,
          p.footer = `<a class="${o.classNames.tooltipMoreLink}" href="${h}" target="_blank" rel="noopener">${s.tooltip.more}</a>`,
          p.reference = r.reference,
          p.version = `(${r.version})`,
          a.socialSharing && a.socialSharing.length && (p.socialContent = l()))
        : (p.content = `<p>${s.tooltip.errorBody}</p>`,
          p.reference = s.tooltip.errorHeader),
      p
    }
    function f(e, o, i) {
      let a; let c; let h; let f; let g = {
        tooltipOffsetX: 15,
        tooltipOffsetY: 25,
        tooltipEdgePadding: 10,
        elementLocation: n.getElementAbsoluteOffset(e),
        windowSize: n.getWindowSize(),
      }
      if (i) {
        for (a in g)
          i.hasOwnProperty(a) && (g[a] = i[a])
      }
      y && b(),
      c = p(i, {
        reference: s.tooltip.loading,
      }),
      c.addEventListener && c.addEventListener('touchstart', (e) => {
        e.stopPropagation()
      }, !1),
      f = c.offsetHeight,
      t.document.body.appendChild(c),
      h = l(g.windowSize, g.elementLocation, g, c.offsetWidth, c.offsetHeight),
      c = n.applyStyles(c, {
        position: 'absolute',
        top: `${h.y}px`,
        left: `${h.x}px`,
        zIndex: '9999999',
      }),
      r.getPassage(o.reference, o.version, o.bibleReader, (e) => {
        let t = u(e, o, i)
        c.innerHTML = d(t),
        c.offsetHeight > f && (h = l(g.windowSize, g.elementLocation, g, c.offsetWidth, c.offsetHeight),
        c = n.applyStyles(c, {
          top: `${h.y}px`,
          left: `${h.x}px`,
        }))
      }),
      y = c
    }
    function g() {
      let t = y
      C[t] || (C[t] = setTimeout(() => {
        m(t)
      }, e.removeTooltipDelay))
    }
    function m(e) {
      v(e),
      e && e.parentNode && e.parentNode.removeChild(e),
      e === y && (y = null)
    }
    function b() {
      m(y)
    }
    function T() {
      v(y)
    }
    function v(e) {
      t.clearTimeout(C[y]),
      delete C[e]
    }
    var C = {}
    var y = null
    var L = a.replace('{{tooltipContainer}}', o.classNames.tooltipContainer).replace('{{tooltipHeader}}', o.classNames.tooltipHeader).replace('{{tooltipBody}}', o.classNames.tooltipBody).replace('{{tooltipFooter}}', o.classNames.tooltipFooter).replace('{{tooltipBrandLink}}', o.classNames.tooltipBrandLink).replace('{{tooltipMoreLink}}', o.classNames.tooltipMoreLink).replace('{{brandMessage}}', s.tooltip.brandMessage).replace('{{tooltipLogosIcon}}', o.classNames.tooltipLogosIcon).replace('{{brandMessage2}}', s.tooltip.brandMessage2).replace('{{brandSite}}', e.brandSite)
    return {
      create: f,
      remove: g,
      cancelRemove: T,
      reset: b,
      isTooltipOpen: h,
      generateLink: c,
      getTooltipDiv: p,
      getTooltipContentsFromPassage: u,
    }
  }),
  o('nls/continuationPhrases', {
    phrases: ['and', 'or', '&', '&amp;'],
  }),
  o('nls/referenceRegexesCore', {
    seriesBookRegExp: '(?:(C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|E(?:s(?:d(?:r(?:as)?)?)?|z(?:r(?:a)?)?)|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:efa|g(?:dms|s)|i(?:n(?:g(?:doms|s))?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?)|Yochanan|nd\\s(?:C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|Es(?:d(?:r(?:as)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?))|rd\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|st\\s(?:C(?:h(?:r(?:on(?:icles)?)?)?|o(?:r(?:inthians)?)?)|Es(?:d(?:r(?:as)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|P(?:e(?:t(?:er)?)?|t)?|S(?:a(?:m(?:uel)?)?|m)?|T(?:h(?:es(?:s(?:alonians)?)?)?|i(?:m(?:othy)?)?))|th\\s(?:Ez(?:r(?:a)?)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)))',
    singleChapterBookRegExp: '(?:(\'Ovadyah|Ob(?:ad(?:iah)?)?|ʿOvadyah|‘Ovadyah)|(Azariah|Pr(?:\\sAz|Azar|ayer\\sof\\sAzariah)|S(?:gThree|ong(?:\\s(?:Thr|of\\s(?:Thr(?:ee(?:\\s(?:Children|Jews|Youths))?)?|the\\sThree\\sHoly\\sChildren))|Thr))|The\\sSong\\sof\\s(?:Three\\s(?:Jews|Youths)|the\\sThree\\sHoly\\sChildren))|(Sus(?:anna)?)|(Bel(?:\\sand\\sthe\\sDragon)?)|(P(?:Ma|r(?:\\s(?:Man|of\\sMan)|Man|ayer\\sof\\sManasse(?:h|s))))|(Add(?:\\sPs(?:alm)?|itional\\sPsalm)|Ps(?:\\s151|151|a(?:\\s151|151|lm(?:\\s151|151|s(?:\\s151|151)))|lm(?:\\s151|151)|m(?:\\s151|151)|s(?:\\s151|151))|ψ(?:\\s151|151))|(Ep(?:\\sLao(?:d)?|Lao|ist(?:\\sLaodiceans|le\\s(?:Laodiceans|to\\s(?:Laodiceans|the\\sLaodiceans))))|Laod(?:iceans)?)|(P(?:h(?:ile(?:m(?:on)?)?|lm|m)|m))|(2(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|nd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|II(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Second\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(3(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|rd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|III(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Third\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(J(?:d|ud(?:e)?)|Y(?:\'hudah|ʾhudah|’hudah)))',
    standardBookRegExp: '((B(?:\'resheet|ʾresheet|’resheet)|G(?:e(?:n(?:esis)?)?|n))|(Ex(?:o(?:d(?:us)?)?)?|Sh(?:\'mot|ʾmot|’mot))|(L(?:e(?:v(?:iticus)?)?|v)|Vayikra)|(B(?:\'midbar|ʾmidbar|’midbar)|N(?:b|m|u(?:m(?:b(?:ers)?)?)?))|(D(?:\'varim|e(?:ut(?:eronomy)?)?|t|ʾvarim|’varim))|(J(?:os(?:h(?:ua)?)?|sh)|Y(?:\'hoshua|ʾhoshua|’hoshua))|(J(?:dg(?:s)?|g|udg(?:es)?)|Shof(?:\'tim|ʾtim|’tim))|(R(?:th|u(?:t(?:h)?)?))|(1(?:\\s(?:K(?:gdms|ingdoms)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?|st\\sS(?:a(?:m(?:uel)?)?|m)?)|First\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|I(?:\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|S(?:am(?:uel)?|m))|Sh(?:\'mu\'el\\sAlef|ʾmuʾel\\sAlef|’mu’el\\sAlef))|(2(?:\\s(?:K(?:gdms|ingdoms)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?|nd\\sS(?:a(?:m(?:uel)?)?|m)?)|II(?:\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|S(?:a(?:m(?:uel)?)?|m)?)|S(?:econd\\s(?:Kingdoms|S(?:a(?:m(?:uel)?)?|m)?)|h(?:\'mu\'el\\sBet|ʾmuʾel\\sBet|’mu’el\\sBet)))|(1(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|st\\sK(?:gs|i(?:n(?:gs)?)?)?)|3\\sK(?:gdms|ingdoms)|First\\sK(?:gs|i(?:n(?:gs)?)?)?|I(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|II\\sKingdoms|K(?:gs|i(?:n(?:gs)?)?)?)|M(?:\'lakhim\\sAlef|ʾlakhim\\sAlef|’lakhim\\sAlef)|Third\\sKingdoms)|(2(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|K(?:gs|i(?:n(?:gs)?)?)?|nd\\sK(?:gs|i(?:n(?:gs)?)?)?)|4\\sK(?:gdms|ingdoms)|Fourth\\sKingdoms|I(?:I(?:\\sK(?:gs|i(?:n(?:gs)?)?)?|II\\sKingdoms|K(?:gs|i(?:n(?:gs)?)?)?)|V\\sKingdoms)|M(?:\'lakhim\\sBet|ʾlakhim\\sBet|’lakhim\\sBet)|Second\\sK(?:gs|i(?:n(?:gs)?)?)?)|(1(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?|st\\sCh(?:r(?:on(?:icles)?)?)?)|Divrei-HaYamim\\sAlef|First\\sCh(?:r(?:on(?:icles)?)?)?|I(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?))|(2(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?|nd\\sCh(?:r(?:on(?:icles)?)?)?)|Divrei-HaYamim\\sBet|II(?:\\sCh(?:r(?:on(?:icles)?)?)?|Ch(?:r(?:on(?:icles)?)?)?)|Second\\sCh(?:r(?:on(?:icles)?)?)?)|(\'Ezra|Ez(?:r(?:a)?)?|ʿEzra|‘Ezra)|(Ne(?:chemyah|h(?:em(?:iah)?)?)?)|(Es(?:t(?:er|h(?:er)?)?)?)|(Iyov|J(?:b|ob))|(Ps(?:a(?:lm(?:s)?)?|lm|m|s)?|Tehillim|ψ)|(Mishlei|Pr(?:o(?:v(?:erbs)?)?|v)?)|(Ec(?:c(?:l(?:es(?:iastes)?)?)?)?|Kohelet|Qoh(?:eleth)?)|(Cant(?:\\.|icle(?:\\sof\\sCanticles|s))?|S(?:OS|S|hir-HaShirim|o(?:ng(?:\\sof\\sSo(?:l(?:omon)?|ngs))?)?))|(Is(?:a(?:i(?:ah)?)?)?|Yesha(?:\'yahu|ʿyahu|‘yahu))|(J(?:e(?:r(?:em(?:iah)?)?)?|r)|Yirmeyahu)|(Eikhah|La(?:m(?:entations)?)?)|(Ez(?:e(?:k(?:iel)?)?|k)|Yechezk(?:\'el|ʾel|’el))|(D(?:a(?:n(?:i(?:\'el|el|ʾel|’el))?)?|n))|(Ho(?:s(?:ea|hea)?)?)|(J(?:l|oe(?:l)?)|Yo(?:\'el|ʾel|’el))|(\'Amos|Am(?:os)?|ʿAmos|‘Amos)|(\'Ovadyah|Ob(?:ad(?:iah)?)?|ʿOvadyah|‘Ovadyah)|(J(?:nh|on(?:ah)?)|Yonah)|(M(?:c|i(?:c(?:ah)?|khah)))|(Na(?:chum|h(?:um)?)?)|(H(?:a(?:b(?:akkuk)?|vakuk)|b))|(Tz(?:\'fanyah|ʾfanyah|’fanyah)|Z(?:ep(?:h(?:aniah)?)?|p))|(H(?:ag(?:ai|gai)?|g))|(Z(?:\'kharyah|c|ec(?:h(?:ariah)?)?|ʾkharyah|’kharyah))|(M(?:al(?:\'akhi|achi|ʾakhi|’akhi)?|l))|(T(?:b|ob(?:it)?))|(J(?:dt(?:h)?|th|udith))|(A(?:Es|dd(?:\\sEs(?:th)?|\\.\\sEs(?:th)?|Esth|itions\\sto\\sEsther))|G(?:k(?:\\sEs(?:th)?|Es)|reek\\sEsther)|Rest\\sof\\sEsther|The\\sRest\\sof\\sEsther)|(W(?:is(?:d(?:\\sof\\sSol|\\.\\sof\\sSol|om(?:\\sof\\sSolomon)?))?|s))|(Ben\\sSira(?:h)?|Eccl(?:esiasticus|us)|Sir(?:a(?:ch|h)?)?|Wisdom\\sof\\sBen\\sSira(?:h)?)|(Bar(?:uch)?)|(Ep(?:\\sJer|Jer|ist(?:\\sJer|le\\s(?:Jeremiah|of\\sJeremiah)))|L(?:Je|et(?:\\sJer|Jer|ter\\sof\\sJeremiah)|tr\\sJer))|(Azariah|Pr(?:\\sAz|Azar|ayer\\sof\\sAzariah)|S(?:gThree|ong(?:\\s(?:Thr|of\\s(?:Thr(?:ee(?:\\s(?:Children|Jews|Youths))?)?|the\\sThree\\sHoly\\sChildren))|Thr))|The\\sSong\\sof\\s(?:Three\\s(?:Jews|Youths)|the\\sThree\\sHoly\\sChildren))|(Sus(?:anna)?)|(Bel(?:\\sand\\sthe\\sDragon)?)|(1(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|st\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|First\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|I(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?))|(2(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|nd\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|II(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Second\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|(1(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|st\\sEs(?:d(?:r(?:as)?)?)?)|First\\sEs(?:d(?:r(?:as)?)?)?|I(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?))|(P(?:Ma|r(?:\\s(?:Man|of\\sMan)|Man|ayer\\sof\\sManasse(?:h|s))))|(Add(?:\\sPs(?:alm)?|itional\\sPsalm)|Ps(?:\\s151|151|a(?:\\s151|151|lm(?:\\s151|151|s(?:\\s151|151)))|lm(?:\\s151|151)|m(?:\\s151|151)|s(?:\\s151|151))|ψ(?:\\s151|151))|(3(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|rd\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|III(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Third\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|(2(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|nd\\sEs(?:d(?:r(?:as)?)?)?)|4(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?|th\\sEz(?:r(?:a)?)?)|Fourth\\sEz(?:r(?:a)?)?|I(?:I(?:\\sEs(?:d(?:r(?:as)?)?)?|Es(?:d(?:r(?:as)?)?)?|II(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?))|V(?:\\sEz(?:r(?:a)?)?|Ez(?:r(?:a)?)?))|Second\\sEs(?:d(?:r(?:as)?)?)?)|(4(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?|th\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?)|Fourth\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|I(?:III(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)|V(?:\\sM(?:a(?:c(?:c(?:abees)?)?)?|c)?|M(?:a(?:c(?:c(?:abees)?)?)?|c)?)))|(Ode(?:s)?)|(Ps(?:\\sSol(?:\\.|omon)?|\\.\\sSol(?:\\.|omon)?|Sol|alms\\sof\\sSol(?:\\.|omon)?|s(?:\\sSol(?:\\.|omon)?|\\.\\sSol(?:omon)?|Sol))|The\\sPsalms\\sof\\sSolomon)|(Ep(?:\\sLao(?:d)?|Lao|ist(?:\\sLaodiceans|le\\s(?:Laodiceans|to\\s(?:Laodiceans|the\\sLaodiceans))))|Laod(?:iceans)?)|(M(?:at(?:\\.|t(?:h(?:ew)?|ityahu)?)?|t))|(M(?:ar(?:k)?|k|r(?:k)?))|(L(?:k(?:e)?|u(?:k(?:e)?)?))|(J(?:hn|n(?:o)?|oh(?:n)?)|Yochanan)|(Ac(?:t(?:s)?)?)|(R(?:m|o(?:m(?:ans)?)?))|(1(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?|st\\sCo(?:r(?:inthians)?)?)|First\\sCo(?:r(?:inthians)?)?|I(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?))|(2(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?|nd\\sCo(?:r(?:inthians)?)?)|II(?:\\sCo(?:r(?:inthians)?)?|Co(?:r(?:inthians)?)?)|Second\\sCo(?:r(?:inthians)?)?)|(Ga(?:l(?:atians)?)?)|(Ep(?:h(?:es(?:ians)?)?)?)|(P(?:h(?:il(?:ippians)?|p)|p))|(Co(?:l(?:ossians)?)?)|(1(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?|st\\sTh(?:es(?:s(?:alonians)?)?)?)|First\\sTh(?:es(?:s(?:alonians)?)?)?|I(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?))|(2(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?|nd\\sTh(?:es(?:s(?:alonians)?)?)?)|II(?:\\sTh(?:es(?:s(?:alonians)?)?)?|Th(?:es(?:s(?:alonians)?)?)?)|Second\\sTh(?:es(?:s(?:alonians)?)?)?)|(1(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?|st\\sTi(?:m(?:othy)?)?)|First\\sTi(?:m(?:othy)?)?|I(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?))|(2(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?|nd\\sTi(?:m(?:othy)?)?)|II(?:\\sTi(?:m(?:othy)?)?|Ti(?:m(?:othy)?)?)|Second\\sTi(?:m(?:othy)?)?)|(T(?:i(?:t(?:us)?)?|t))|(P(?:h(?:ile(?:m(?:on)?)?|lm|m)|m))|(He(?:b(?:r(?:ews)?)?)?|Messianic\\sJews)|(J(?:a(?:m(?:es)?|s)|m)|Ya(?:\'akov|ʿakov|‘akov))|(1(?:\\s(?:Kefa|P(?:e(?:t(?:er)?)?|t)?)|P(?:e(?:t(?:er)?)?|t)?|st\\sP(?:e(?:t(?:er)?)?|t)?)|First\\sP(?:e(?:t(?:er)?)?|t)?|I(?:\\sP(?:e(?:t(?:er)?)?|t)?|P(?:e(?:t(?:er)?)?|t)?))|(2(?:\\s(?:Kefa|P(?:e(?:t(?:er)?)?|t)?)|P(?:e(?:t(?:er)?)?|t)?|nd\\sP(?:e(?:t(?:er)?)?|t)?)|II(?:\\sP(?:e(?:t(?:er)?)?|t)?|P(?:e(?:t(?:er)?)?|t)?)|Second\\sP(?:e(?:t(?:er)?)?|t)?)|(1(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|st\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|First\\sJ(?:hn|n|o(?:h(?:n)?)?)?|I(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?))|(2(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|nd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|II(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Second\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(3(?:\\s(?:J(?:hn|n|o(?:h(?:n)?)?)?|Yochanan)|J(?:hn|n|o(?:h(?:n)?)?)?|rd\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|III(?:\\sJ(?:hn|n|o(?:h(?:n)?)?)?|J(?:hn|n|o(?:h(?:n)?)?)?)|Third\\sJ(?:hn|n|o(?:h(?:n)?)?)?)|(J(?:d|ud(?:e)?)|Y(?:\'hudah|ʾhudah|’hudah))|(R(?:e(?:v(?:elation)?)?|v)|The\\sRevelation))',
    abbreviations: ['Gen', 'Exod', 'Lev', 'Num', 'Deut', 'Josh', 'Judg', 'Ruth', '1 Sam', '2 Sam', '1 Kings', '2 Kings', '1 Chron', '2 Chron', 'Ezra', 'Neh', 'Esther', 'Job', 'Ps', 'Prov', 'Eccles', 'Song', 'Isa', 'Jer', 'Lam', 'Ezek', 'Dan', 'Hos', 'Joel', 'Amos', 'Obad', 'Jonah', 'Micah', 'Nah', 'Hab', 'Zeph', 'Haggai', 'Zech', 'Mal', 'Tobit', 'Jdth', 'Gk Esth', 'Wis', 'Sirach', 'Baruch', 'Let Jer', 'Song of Three', 'Susanna', 'Bel', '1 Macc', '2 Macc', '1 Esdr', 'Pr of Man', 'Ps 151', '3 Macc', '2 Esdr', '4 Macc', 'Odes', 'Ps Solomon', 'Laodiceans', 'Matt', 'Mark', 'Luke', 'John', 'Acts', 'Rom', '1 Cor', '2 Cor', 'Gal', 'Eph', 'Phil', 'Col', '1 Thess', '2 Thess', '1 Tim', '2 Tim', 'Titus', 'Philem', 'Heb', 'James', '1 Pet', '2 Pet', '1 John', '2 John', '3 John', 'Jude', 'Rev'],
    singleChapterIndexes: [30, 46, 47, 48, 52, 53, 59, 77, 83, 84, 85],
  }),
  o('referenceRegexes', ['versions', 'nls/continuationPhrases', 'nls/referenceRegexesCore'], (e, t, o) => {
    return {
      chapterReferenceRegExp: '\\b\\s\\d+(?![\\.:])\\b',
      referenceQuickTest: `((\\d{1,3})(?:(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?))?)|${o.singleChapterBookRegExp}`,
      referenceRegExp: `(\\W|^)(${o.standardBookRegExp}(?:\\.?\\s*(\\d{1,3})(?:(?:\\s?\\:\\s?|\\.)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?))?(\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?((?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?(?!\\s*${o.seriesBookRegExp}(?:\\W)))?)|${o.singleChapterBookRegExp}\\s*\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)([,.]?\\s?(?:${e.supportedVersions.join('|')})|[,.]?\\s?[(](?:${e.supportedVersions.join('|')})[)])?`,
      bookContinuationRegExp: `^((?:(?:[,;\\.]+)?\\s?(?:${t.phrases.join('|')})?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)((\\d{1,3})(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:\\s?\\:\\s?|\\.)\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)?)`,
      chapterContinuationRegExp: `^((?:(?:[,;\\.]+)?\\s?(?:${t.phrases.join('|')})?)\\s*(?:(?:(?:cf|Cf|CF|cp|Cp|CP)[.,]?\\s?(?:v(?:v|ss?)?[.]?)?)[.,]?\\s*)?)(\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?(?:\\s?(?:-|--|\\u2013|\\u2014)\\s?\\d{1,3}(?:(?:[a-z]|ff)(?=\\W|$))?)?)(?!\\s*${o.seriesBookRegExp}(?=\\W|\\d|$))`,
      abbreviations: o.abbreviations,
      singleChapterIndexes: o.singleChapterIndexes,
    }
  }),
  o('util/color', {
    hexToRgb(e) {
      return e
        ? {
            r: Number.parseInt(e.slice(1, 3), 16),
            g: Number.parseInt(e.slice(3, 5), 16),
            b: Number.parseInt(e.slice(5, 7), 16),
          }
        : null
    },
    rgbToHex(e) {
      function t(e) {
        let t = e.toString(16)
        return (`0${t}`).substr(t.length - 1, 2)
      }
      return e ? `#${t(e.r)}${t(e.g)}${t(e.b)}` : null
    },
    hslToRgb(e) {
      function t(e, t, o) {
        return o < 0 && (o += 1),
        o > 1 && (o -= 1),
        1 / 6 > o ? e + 6 * (t - e) * o : o < 0.5 ? t : 2 / 3 > o ? e + (t - e) * (2 / 3 - o) * 6 : e
      }
      let o; let n; let r; let s; let i; let a = e.h; let l = e.s; let c = e.l
      return l === 0
        ? o = n = r = c
        : (s = c < 0.5 ? c * (1 + l) : c + l - c * l,
          i = 2 * c - s,
          o = t(i, s, a + 1 / 3),
          n = t(i, s, a),
          r = t(i, s, a - 1 / 3)),
      {
        r: Math.round(255 * o),
        g: Math.round(255 * n),
        b: Math.round(255 * r),
      }
    },
    rgbToHsl(e) {
      let t; let o; let n = e.r / 255; let r = e.g / 255; let s = e.b / 255; let i = Math.max(n, r, s); let a = Math.min(n, r, s); let l = (i + a) / 2
      if (i == a) {
        t = o = 0
      }
      else {
        let c = i - a
        switch (o = l > 0.5 ? c / (2 - i - a) : c / (i + a),
        i) {
          case n:
            t = (r - s) / c + (s > r ? 6 : 0)
            break
          case r:
            t = (s - n) / c + 2
            break
          case s:
            t = (n - r) / c + 4
        }
        t /= 6
      }
      return {
        h: t,
        s: o,
        l,
      }
    },
  }),
  o('libs/text!css/default', [], () => {
    return '.rtTooltipHeader{font-family:Arial,Helvetica,serif}.rtTooltipBody{font-family:Helvetica,Arial,serif}.rtTooltipBody .ch-ref{font-weight:700}.rtTooltipFooter{font-family:Helvetica,Arial,serif}.rtTooltipDropShadow .rtContainer{-webkit-box-shadow:0 0 6px 0 #444;-moz-box-shadow:0 0 6px 0 #444;box-shadow:0 0 6px 0 #444}.rtTooltipRoundedCorners .rtContainer{-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;overflow:hidden}.rtTooltipFooter a{font-family:Helvetica,Arial,serif;font-weight:400}.rtTooltipBrandLink a:hover,.rtTooltipBrandLink a:link,.rtTooltipBrandLink a:visited,.rtTooltipMoreLink:hover,.rtTooltipMoreLink:link,.rtTooltipMoreLink:visited{text-decoration:none}.rtLight .rtContainer{background:#fff}.rtLight .rtTooltipHeader{background:#e7e7e7;color:#333}.rtLight .rtTooltipBody{color:#666}.rtLight .rtTooltipBrandLink a:link,.rtLight .rtTooltipBrandLink a:visited{color:#ccc}.rtLight .rtTooltipBrandLink a:hover{color:#666}.rtLight .rtTooltipBrandLink .rtTooltipLogosIcon path{fill:#aaa}.rtLight .rtTooltipBrandLink a:hover .rtTooltipLogosIcon path{fill:#444}.rtLight .rtTooltipMoreLink:link,.rtLight .rtTooltipMoreLink:visited{color:#0080FF}.rtLight .rtTooltipMoreLink:hover{color:#66B2FF}.rtDark .rtContainer{background:#555}.rtDark .rtTooltipHeader{background:#888;color:#eee}.rtDark .rtTooltipBody{color:#fff}.rtDark .rtTooltipBrandLink a:link,.rtDark .rtTooltipBrandLink a:visited{color:#999}.rtDark .rtTooltipBrandLink a:hover{color:#eee}.rtDark .rtTooltipBrandLink .rtTooltipLogosIcon path{fill:#aaa}.rtDark .rtTooltipBrandLink a:hover .rtTooltipLogosIcon path{fill:#fff}.rtDark .rtTooltipMoreLink:link,.rtDark .rtTooltipMoreLink:visited{color:#fff}.rtDark .rtTooltipMoreLink:hover{color:#ccc}.rtTooltipSocialIcon{background:url(https://api.reftagger.com/v2/social-icons.png)}'
  }),
  o('libs/text!css/layout', [], () => {
    return '.rtTooltip{text-align:left;text-indent:0;width:400px;min-height:140px;z-index:99;max-width:100%}.rtTooltip div{text-align:left}.rtTooltipHeader{border:0;font-size:14px;font-weight:700;line-height:32px;height:32px;margin:0;padding:0 20px 0 15px}.rtTooltipBody{border:0;line-height:1.4;font-size:14px;margin:0;min-height:40px;padding:19px 20px 0 15px}.rtTooltipBody .ch-ref,.rtTooltipBody .verse-ref{font-size:85%;position:relative;top:-1px}.rtTooltipBody .font-style-italic{font-style:italic}.rtTooltipBody .font-style-normal{font-style:normal}.rtTooltipBody .font-caps-all-caps{text-transform:uppercase}.rtTooltipBody .font-caps-all-small-caps{text-transform:uppercase;font-variant:small-caps}.rtTooltipBody .font-caps-small-caps{font-variant:small-caps}.rtTooltipBody .font-caps-normal{text-transform:none;font-variant:normal}.rtTooltipFooter{border:0;font-size:14px;line-height:14px;letter-spacing:normal;padding:22px 32px 12px 15px;text-align:left}.rtTooltipFooter div{text-align:right}.rtTooltipFooter .rtTooltipMoreLink{float:right}.rtTooltipFooter .rtTooltipBrandLink{display:inline-block;margin-right:20px;font-size:10px;text-transform:uppercase}.rtTooltipFooter .rtTooltipBrandLink a{column-gap:4px;letter-spacing:1px;font-weight:600}.rtTooltipFooter .rtTooltipBrandLink .rtTooltipLogosIcon{vertical-align:-.4em}.rtTooltipSocial{float:right}.rtTooltip .rtTooltipSocialIcon{display:inline-block;margin-top:8px;height:19px;width:21px}.rtTooltip,.rtTooltip a,.rtTooltipBody p,.rtTooltipBody span{letter-spacing:normal;margin:0;padding:0}.rtLibronix img{float:none}.libronixLinkImage{border:0;float:none;margin:0 0 0 4px;padding:0}.rtTooltipSocialIcon#rtFacebook:hover{background-position:0 -95px}.rtTooltipSocialIcon#rtFacebook{background-position:0 -76px}.rtTooltipSocialIcon#rtTwitter:hover{background-position:0 -171px}.rtTooltipSocialIcon#rtTwitter{background-position:0 -152px}.rtTooltipSocialIcon.rtDark#rtFacebook:hover{background-position:0 -133px}.rtTooltipSocialIcon.rtDark#rtFacebook{background-position:0 -114px}.rtTooltipSocialIcon.rtDark#rtTwitter:hover{background-position:0 -209px}.rtTooltipSocialIcon.rtDark#rtTwitter{background-position:0 -190px}'
  }),
  o('cssLoader', ['util/classNames', 'util/dom', 'util/color', 'libs/text!css/default', 'libs/text!css/layout'], (e, t, o, n, r) => {
    'use strict'
    return {
      loadCss(s, i) {
        function a() {
          let e = document.getElementById('rt-tooltip-styles')
          e && e.parentElement.removeChild(e)
        }
        function l(t) {
          function n(e) {
            return e.split(';')[0]
          }
          function r(e) {
            let t = /^#(\w{3}|\w{6})$/
            return t.test(e)
              ? e.replace(/^#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3')
              : (window.console && window.console.warn && window.console.warn('Invalid color value provided to Reftagger. Must be in hex format.'),
                '')
          }
          function s(e, t, o) {
            let r; let s; let i = `\n${e}{`
            for (r = 0,
            s = o.length; s > r; r++)
              t[o[r]] && (i += `${o[r].replace(/([A-Z])/g, '-$1').toLowerCase()}:${n(t[o[r]])} !important;`)
            return `${i}}\n`
          }
          function i(e) {
            let t = o.rgbToHsl(o.hexToRgb(r(e)))
            return o.rgbToHex(o.hslToRgb({
              h: t.h,
              s: t.s,
              l: Math.min(t.l + 0.2 * (t.l < 0.6 ? 1 : -1), 1),
            }))
          }
          let a; let l; let c; let d = ''; let h = ['backgroundColor', 'fontSize', 'lineHeight', 'fontWeight', 'color', 'fontFamily']
          if (t.heading) {
            if (a = r(t.heading.backgroundColor)) {
              l = o.hexToRgb(a)
              let p = (l.r + l.g + l.b) / 3 < 170
              t.heading.iconStyle = p ? 'rtDark' : 'rtLight'
            }
            d += s(`.${e.classNames.tooltipHeader}`, t.heading, h)
          }
          return t.body && (d += s(`.${e.classNames.tooltipBody}, .${e.classNames.tooltipFooter}`, t.body, h.slice(1)),
          c = r(t.body.moreLink && t.body.moreLink.color),
          c && (d += s(`.${e.classNames.tooltipMoreLink}`, t.body.moreLink, ['color']),
          d += `\n.${e.classNames.tooltipMoreLink}:hover{color:${i(t.body.moreLink.color)} !important}\n`)),
          d
        }
        let c = t.createElement('style', {
          id: 'rt-tooltip-styles',
          type: 'text/css',
          nonce: i.nonce,
        })
        let d = r
        i.cssOverride || window.location.hostname.toLowerCase().indexOf('theresurgence.com') === 0 || (d += n),
        i.customStyle && (d += l(i.customStyle)),
        c.styleSheet ? c.styleSheet.cssText = d : c.innerHTML = d,
        a(),
        s.insertBefore(c, s.firstChild)
      },
    }
  }),
  o('util/version', {
    version: 2,
  }),
  o('util/settings', {
    getSettingsOrDefaults(e, t) {
      let o; let n = {}
      if (e = e || window.refTagger && window.refTagger.settings) {
        for (o in t)
          t.hasOwnProperty(o) && (n[o] = void 0 !== e[o] ? e[o] : t[o])
      }
      return n
    },
  }),
  o('main', ['config', 'root', 'passageManager', 'tooltips', 'referenceRegexes', 'cssLoader', 'util/classNames', 'util/version', 'util/settings', 'util/dom', 'nls/resourceStrings'], (e, t, o, n, r, s, i, a, l, c, d) => {
    'use strict'
    function h(e) {
      return d.normalizeReference(e)
    }
    function p() {
      let e; let t; let o; let n = /lbsRefTaggerPrefs=(\w{2,5})\.(true|false)/.exec(M.cookie); let r = M.getElementById('lbsRefTaggerCP')
      if (n && (J.bibleVersion = n[1],
      J.addLogosLink = n[2] === 'true'),
      r !== null) {
        for (e = M.getElementById('lbsVersion'),
        t = e.length,
        o = 0; t > o; o++) {
          if (e.options[o].outerText === (J.bibleVersion || 'default').toUpperCase()) {
            e.selectedIndex = o
            break
          }
        }
        J.addLogosLink && (M.getElementById('lbsUseLibronixLinks').checked = 'true')
      }
    }
    function u(e) {
      let o
      for (e = e || t.event,
      o = e.target || e.srcElement; o.tagName.toLowerCase() !== 'a';)
        o = o.parentNode
      return o
    }
    function f(e) {
      let t = u(e)
      o.getPassage(t.getAttribute('data-reference'), t.getAttribute('data-version'), J.bibleReader)
    }
    function g(t) {
      function r() {
        n.create(i, a, {
          enableSharingPopups: J.enableSharingPopups,
          socialSharing: J.socialSharing,
          tooltipStyle: J.tooltipStyle === 'dark' ? 'rtDark' : 'rtLight',
          includeDropShadow: J.dropShadow,
          includeRoundedCorners: J.roundCorners,
        })
      }
      let s = 20
      var i = u(t)
      var a = {
        reference: i.getAttribute('data-reference').replace(/\s/g, ''),
        version: i.getAttribute('data-version'),
        bibleReader: J.bibleReader,
      }
      B = V
        ? setTimeout(r, 1)
        : setTimeout(() => {
            o.getPassage(a.reference, a.version, a.bibleReader),
            B = setTimeout(r, e.createTooltipDelay - s)
          }, s)
    }
    function m() {
      V || (t.clearTimeout(B),
      n.remove())
    }
    function b(e, t, n, r) {
      let s
      e = h(e),
      t = o.getVersion(t || J.bibleVersion),
      s = T(M.createElement('a'), e, t),
      s.innerHTML = n,
      r.parentNode.insertBefore(s, r),
      J.addLogosLink && v(r, e.replace(/(\d)\s*(?:[a-z]|ff)(\W|$)|/g, '$1$2').replace(/\s+/g, '').replace(/[‒–—―]+/g, '-'))
    }
    function T(e, t, o) {
      return H.test(e.className) || (e.className += (e.className.length ? ' ' : '') + i.classNames.bibleRef),
      e.href = n.generateLink(t, o, J.bibleReader),
      e.setAttribute('data-reference', t),
      e.setAttribute('data-version', o),
      e.setAttribute('data-purpose', 'bible-reference'),
      J.linksOpenNewWindow && (e.target = '_blank',
      e.rel = 'noopener'),
      J.useTooltip && (e.addEventListener
        ? (e.addEventListener('mouseover', g, !1),
          e.addEventListener('mouseout', m, !1),
          e.addEventListener('touchstart', f, !1),
          e.addEventListener('click', function (e) {
            V && e.target !== n.openTooltipAnchor && (e.preventDefault(),
            n.openTooltipAnchor || g.call(this, e))
          }, !1))
        : e.attachEvent && (e.attachEvent('onmouseover', g),
        e.attachEvent('onmouseout', m))),
      e
    }
    function v(e, t) {
      let o; let n; let r = J.logosBibleVersion || J.libronixBibleVersion; let s = `${A}://www.logos.com/images/Corporate/LibronixLink_${(J.libronixLinkIcon || J.logosLinkIcon).toLowerCase() === 'light' ? 'light' : 'dark'}.png`; let i = c.createElement('img', {
        src: s,
        border: 0,
        title: d.logosLinkTitle,
        className: 'libronixLinkImage',
        align: 'bottom',
      })
      t
        ? (n = `libronixdls:keylink|ref=[en]bible:${t}`,
          r && r.toLowerCase() !== 'default' && (n += `|res=LLS:${r.toUpperCase()}`),
          o = c.createElement('a', {
            href: n,
            className: 'rtLibronix',
          }),
          o.appendChild(i),
          e.parentNode.insertBefore(o, e))
        : e.appendChild(i)
    }
    function C(e, t, o, n, s, i, a) {
      let l; let d; let p; let u; let f; let g; let m; let v; let y; let L; let M; let R = !1; let N = 0; let B = J.bibleVersion; let P = null; let V = r.abbreviations; let A = V.length
      return o && (p = S.exec(e),
      p && (l = o,
      d = p[3],
      v = `${l} ${p[2]}`,
      g = p[1],
      f = e.substr(p.index + p[0].length))),
      n && !p && (p = w.exec(e),
      p && (l = o,
      d = n,
      v = i ? `${l} ${p[2]}` : `${l} ${d}:${p[2]}`,
      R = E.test(v),
      g = p[1],
      f = e.substr(p.index + p[0].length))),
      !p && k.test(e) && (p = x.exec(e),
      p && (u = p.length,
      l = p[3],
      d = p[4 + A],
      v = p[2],
      y = p.indexOf(l, 4) - 4,
      L = V[y],
      I.includes(y)
        ? (d = 1,
          R = !1)
        : R = E.test(v),
      g = e.substr(0, p.index) + p[1],
      f = e.substr(p.index + p[0].length),
      p[u - 1] && (P = p[u - 1],
      B = P.replace(/\W/g, '')))),
      p
        ? (m = p[0].substr((p[1] || '').length),
          R && !J.tagChapters
            ? (c.insertTextNode(g + m, t),
              N = C(f, t, null, null, B === J.bibleVersion ? null : B, !1) + 1)
            : d <= 155
              ? (l = l || o,
                L = L || l,
                M = L + v.substr(l.length),
                !a || a.childNodes.length !== 1 || g || f
                  ? (c.insertTextNode(g, t),
                    b(M, B, P === null ? p[2] : p[2] + P, t),
                    N = C(f, t, l, d, B === J.bibleVersion ? null : B, R),
                    N += J.addLogosLink ? 3 : 2)
                  : (B = B || J.bibleVersion,
                    T(a, h(M), B)))
              : (c.insertTextNode(g + m, t),
                N = C(f, t, null, null, B === J.bibleVersion ? null : B, R)))
        : e !== t.nodeValue && (e && s != e && c.insertTextNode(e, t),
        t.parentNode.removeChild(t)),
      N
    }
    function y(e, t, o) {
      let n; let r; let s; let i; let a; let l; let c; let d = (e.tagName || '').toLowerCase(); let p = e.className && e.className.split ? e.className.split(' ') : []; let u = e.href && e.href.toLowerCase ? e.href.toLowerCase() : ''; let f = p.length; let g = 0; let m = !1; let k = /^libronixdls:/i; let x = 0; let S = 0
      if (o = o || 0,
      o > P) {
        return 0
      }
      for (s = 0; f > s; s++) {
        if (O.noSearchClasses.hasOwnProperty(p[s].toLowerCase()))
          return x
      }
      if (O.noSearchTags[d])
        return x
      if (e.nodeType === 3)
        return x = C(e.nodeValue, e, null, null, null, !1, t)
      if (t = null,
      d === 'a') {
        if (k.test(e.href)) {
          !J.appendIconToLibLinks && !J.appendIconToLogosLinks || e.lastChild && e.lastChild.tagName && e.lastChild.tagName.toLowerCase() === 'img' || v(e, null)
        }
        else if (H.test(e.className)) {
          i = e.getAttribute('data-reference'),
          a = e.getAttribute('data-version'),
          i && T(e, h(i), a || J.bibleVersion)
        }
        else if (/bibleref/i.test(e.className)) {
          m = L(e, (e, t, o) => {
            n = h(t),
            T(e, n, o)
          })
        }
        else if (J.convertHyperlinks) {
          for (J.hyperlinkTestList.length || (t = e),
          l = J.hyperlinkTestList.length,
          c = 0; l > c; c++) {
            if (u.includes(J.hyperlinkTestList[c].toLowerCase())) {
              t = e
              break
            }
          }
        }
        if (t === null)
          return x
      }
      else {
        d === 'cite' && e.className.toLowerCase().includes('bibleref') && (m = L(e, (e, t, o) => {
          b(t, o, e.innerHTML, e.firstChild),
          e.removeChild(e.lastChild)
        }))
      }
      if (!m) {
        for (r = e.childNodes; S > g || g < (S = r ? r.length : 0);)
          g += y(r[g], t, o + 1) + 1
      }
      return x
    }
    function L(e, t) {
      let o; let n; let r; let s = !1
      return e.title && e.childNodes.length <= 1 && (o = /^([A-Z]{2,5})[\s:]/.exec(e.title),
      o
        ? (r = e.title.replace(o[1], '').trim(),
          n = o[1])
        : (r = e.title,
          n = J.bibleVersion),
      t(e, r, n),
      s = !0),
      s
    }
    let k; let x; let S; let w; let E; let I; var M = t.document; let R = M.body; let N = M.getElementsByTagName('head')[0]; var B = null; var P = 200; var V = !1; var A = M.location.protocol === 'https:' ? 'https' : 'http'; var H = new RegExp(i.classNames.bibleRef, 'i'); var J = {}; var O = {
      lbsSavePrefs() {
        let e = M.getElementById('lbsRefTaggerCP')
        let o = M.getElementById('lbsVersion')
        let n = M.getElementById('lbsUseLibronixLinks')
        let r = o ? o.value : 'ESV'
        let s = n ? !!n.checked : !1
        let i = new Date()
        if (!e)
          throw new Error('No Reftagger control panel found.')
        i.setFullYear(i.getFullYear() + 10),
        M.cookie = `lbsRefTaggerPrefs=${r}.${s};expires=${i.toGMTString()};path=/`,
        t.location.reload()
      },
      Init(t, o) {
        let i, a, c, d
        if (!O.Initialized || o) {
          for (J = l.getSettingsOrDefaults(t, e.defaultSettings),
          M.addEventListener && M.addEventListener('touchstart', (e) => {
            V = !0,
            !H.test(e.target.className) && n.isTooltipOpen() && n.reset()
          }, !1),
          J.disableInlineCss || s.loadCss(N, J),
          p(),
          O.noSearchTags = {
            textarea: !0,
            input: !0,
            script: !0,
          },
          c = J.noSearchTagNames.length,
          i = 0; c > i; i++) {
            d = J.noSearchTagNames[i],
            O.noSearchTags[d] = !0
          }
          for (O.noSearchClasses = [],
          a = J.noSearchClassNames.length,
          i = 0; a > i; i++)
            O.noSearchClasses[J.noSearchClassNames[i].toLowerCase()] = !0
          k = new RegExp(r.referenceQuickTest, 'i'),
          x = new RegExp(r.referenceRegExp, J.caseInsensitive ? 'i' : ''),
          S = new RegExp(r.bookContinuationRegExp),
          w = new RegExp(r.chapterContinuationRegExp, J.caseInsensitive ? 'i' : ''),
          E = new RegExp(r.chapterReferenceRegExp, 'i'),
          I = r.singleChapterIndexes,
          O.Initialized = !0
        }
      },
      tag(e) {
        J.addLogosLink = J.addLogosLink || J.addLibronixDLSLink,
        O.Initialized || O.Init(),
        t.location.href.indexOf('https://www.logos.com/grow/') === 0 && (J.bibleReader = 'app.logos'),
        y(e || J.rootNode || R)
      },
    }
    return O.init = O.Init,
    O.regexes = r,
    t.refTagger && t.refTagger.settings && t.refTagger.settings.tagAutomatically !== !1 && O.tag(),
    O
  }),
  t('main')
}))
