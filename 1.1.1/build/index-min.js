/*! offline - v1.1 - 2013-10-29 2:19:57 PM
* Copyright (c) 2013 bofang; Licensed  */
KISSY.add("gallery/offline/1.1/localstorage",function(a,b){var c,d,e={},f="DEADLINE-KEY";return a.mix(e,{init:function(){var a=(new Date).getTime();c=localStorage,d=b.parse(c.getItem(f))||{};for(var e in d)d.hasOwnProperty(e)&&(dateKey=parseInt(d[e],10),dateBet=dateKey-a,0>=dateBet?(this.removeItem(e),delete d[e],this._saveDeadLine()):this._deadlineKey(e,dateBet));return this},setItem:function(a,b,e){if(e){var f=parseInt(e,10),g=(new Date).getTime();d[a]=f+g,this._deadlineKey(a,f),this._saveDeadLine()}return c.setItem(a,b),!0},getItem:function(a){return c.getItem(a)},removeItem:function(a){return c.removeItem(a),delete d[a],this._saveDeadLine(),!this.getItem(a)},clear:function(){return c.clear(),0===this.size()},size:function(){var a=c.length;return c[f]?a-1:a},getAll:function(a){var d,e=c.length,g={};for(i=0;e>i;i++)d=c.key(i),g[d]=c.getItem(d),d===f&&delete g[d];return a?g:b.stringify(g)},timeRemain:function(a){return c[a]?a in d?d[a]-(new Date).getTime():-1:0},usedByte:function(){var a=this.getAll().length;return c[f]&&(a+=b.stringify(d).length,a+=f.length),a},_deadlineKey:function(b,e){var f=this;a.later(function(){c.removeItem(b),delete d[b],f._saveDeadLine()},e)},_saveDeadLine:function(){c.setItem(f,b.stringify(d))}}),e},{requires:["json"]}),KISSY.add("gallery/offline/1.1/ie-offline",function(a,b){var c,d,e,f={},g=document,h=(new Date).getTime(),i="IE-OFFLINE",j="IE-SINGLE-KEY",k="TIME-DEADLINE";return a.mix(f,{init:function(){return c=g.createElement("link"),c.addBehavior&&(c.style.behavior="url(#default#userData)",g.getElementsByTagName("head")[0].appendChild(c)),c.load(i),d=b.parse(c.getAttribute(j))||{},e=b.parse(c.getAttribute(k))||{},this._initDeadline(),this},_initDeadline:function(){var a,b;for(var c in e)e.hasOwnProperty(c)&&(a=parseInt(e[c],10),b=a-h,0>=b?this.removeItem(c):this._deadlineKey(c,b))},setItem:function(a,b,c){if(d[a]=b,c){var f=parseInt(c,10),g=(new Date).getTime();e[a]=f+g,this._deadlineKey(a,f)}return this._saveToBrowser()},getItem:function(a){return d[a]},removeItem:function(a){return delete d[a],delete e[a],this._saveToBrowser()},clear:function(){return d={},e={},this._saveToBrowser()},size:function(){var a=0;for(var b in d)d.hasOwnProperty(b)&&a++;return a},timeRemain:function(a){return a in d?a in e?e[a]-(new Date).getTime():-1:0},usedByte:function(){var a=0,c=b.stringify(e);return""!==e&&(a+=c.length+k.length),a+=b.stringify(d).length},getAll:function(a){return a?d:b.stringify(d)},_deadlineKey:function(b,c){var d=this;a.later(function(){d.removeItem(b)},c)},_saveToBrowser:function(){var a=!0;try{c.setAttribute(k,b.stringify(e)),c.setAttribute(j,b.stringify(d)),c.save(i)}catch(f){a=!1}return a}}),f},{requires:["json"]}),KISSY.add("gallery/offline/1.1/index",function(a,b,c){function d(){d.superclass.constructor.call(this)}var e="undefined"!=typeof window.localStorage?b:a.UA.ie<8?c:null;return e.init(),a.extend(d,Base,{setItem:function(b,c,d){var f=parseInt(d,10);return a.isString(b)&&a.isString(c)&&""!==a.trim(b)?(a.Offline.fire("setItem",{key:b,value:c,deadline:d}),e.setItem(b,c,f)):(a.error("Format error"),!1)},getItem:function(b){return a.isString(b)?e.getItem(b):(a.error("Need String"),null)},removeItem:function(b){return a.isString(b)?(a.Offline.fire("removeItem",{key:b}),e.removeItem(b)):(a.error("Need String"),!1)},clear:function(){return a.Offline.fire("clear"),e.clear()},getAll:function(a){return e.getAll(a)},size:function(){return e.size()},timeRemain:function(b){return a.isString(b)?e.timeRemain(b):(a.error("Need String"),!1)},usedByte:function(){return e.usedByte()}}),a.Offline=new d,d},{requires:["./localstorage","./ie-offline","base"]});