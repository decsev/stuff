!function(Q){function F(U){if(B[U])return B[U].exports;var c=B[U]={i:U,l:!1,exports:{}};return Q[U].call(c.exports,c,c.exports,F),c.l=!0,c.exports}var B={};F.m=Q,F.c=B,F.d=function(Q,B,U){F.o(Q,B)||Object.defineProperty(Q,B,{configurable:!1,enumerable:!0,get:U})},F.n=function(Q){var B=Q&&Q.__esModule?function(){return Q.default}:function(){return Q};return F.d(B,"a",B),B},F.o=function(Q,F){return Object.prototype.hasOwnProperty.call(Q,F)},F.p="",F(F.s=10)}({0:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar Qy = function Qy(opt) {\n    this.dataLists = opt.data;\n    this.nowProgress = 0;\n    this.allProgress = opt.data.length;\n    this.allType = opt.allType;\n    this.loading = opt.loading;\n    this.complate = opt.complate;\n    this._dataLists = [];\n    this.init();\n};\nQy.prototype.init = function () {\n    this._setData();\n    //console.log(this._dataLists);\n    this._load();\n};\n// 初始化需要加载的队例\nQy.prototype._setData = function () {\n    var me = this;\n    this.dataLists.forEach(function (e) {\n        var _url = e.url || e;\n        var _type = me._getType(_url);\n        me._dataLists.push({ url: _url, type: _type });\n    });\n};\n// 获取加载url的类型\nQy.prototype._getType = function (u) {\n    var _type = u.match(/[^\\.]+$/)[0];\n    var _result = null;\n    for (var key in this.allType) {\n        if (this.allType[key].join(',').indexOf(_type) !== -1) {\n            _result = key;\n            break;\n        } else {\n            _result = 'notsupport';\n        }\n    }\n    return _result;\n};\n// 加载队列\nQy.prototype._load = function () {\n    var _this = this;\n    this._dataLists.forEach(function (e, i, o) {\n        if (e.type !== 'notsupport') {\n            // image\n            switch (e.type) {\n                case 'image':\n                    _this._loadImage(e);\n                    break;\n                case 'json':\n                    _this._json(e);\n                    break;\n                case 'audio':\n                    _this._audio(e);\n                    break;\n            }\n        } else {\n            console.log('not support');\n            _this.nowProgress++;\n            _this._loading();\n        }\n    });\n};\n// 加载图片\nQy.prototype._loadImage = function (o) {\n    var _this = this;\n    var i = new Image();\n    i.src = o.url;\n    i.onload = function () {\n        _this._loading();\n    };\n    i.onerror = function () {\n        _this._error();\n    };\n};\n// ajax资源\nQy.prototype._get = function (o, type) {\n    var _this = this;\n    var _xhr = new XMLHttpRequest();\n    _xhr.open('post', o.url, true);\n    _xhr.responseType = type;\n    _xhr.send();\n    _xhr.onload = function (e) {\n        _this._loading();\n    };\n    _xhr.onerror = function (e) {\n        _this._error();\n    };\n};\n// 加载json\nQy.prototype._json = function (o) {\n    this._get(o, 'json');\n};\n\n// 加载audio\nQy.prototype._audio = function (o) {\n    var _this = this;\n    var audio = new Audio(o.url);\n    audio.oncanplaythrough = function () {\n        _this._loading();\n    };\n};\n\n// 加载完一个的时候回调\nQy.prototype._loading = function () {\n    this.nowProgress++;\n    this.loading && this.loading({ nowProgress: this.nowProgress, allProgress: this.allProgress });\n    this._complate();\n};\n//全部加载完的时候回调\nQy.prototype._complate = function () {\n    this.complate && this.nowProgress == this.allProgress && this.complate();\n};\n\nQy.prototype._error = function (e) {\n    console.log(e);\n};\nmodule.exports = Qy;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvanMvcXkuanM/NmYyMSJdLCJuYW1lcyI6WyJReSIsIm9wdCIsImRhdGFMaXN0cyIsImRhdGEiLCJub3dQcm9ncmVzcyIsImFsbFByb2dyZXNzIiwibGVuZ3RoIiwiYWxsVHlwZSIsImxvYWRpbmciLCJjb21wbGF0ZSIsIl9kYXRhTGlzdHMiLCJpbml0IiwicHJvdG90eXBlIiwiX3NldERhdGEiLCJfbG9hZCIsIm1lIiwiZm9yRWFjaCIsImUiLCJfdXJsIiwidXJsIiwiX3R5cGUiLCJfZ2V0VHlwZSIsInB1c2giLCJ0eXBlIiwidSIsIm1hdGNoIiwiX3Jlc3VsdCIsImtleSIsImpvaW4iLCJpbmRleE9mIiwiX3RoaXMiLCJpIiwibyIsIl9sb2FkSW1hZ2UiLCJfanNvbiIsIl9hdWRpbyIsImNvbnNvbGUiLCJsb2ciLCJfbG9hZGluZyIsIkltYWdlIiwic3JjIiwib25sb2FkIiwib25lcnJvciIsIl9lcnJvciIsIl9nZXQiLCJfeGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwicmVzcG9uc2VUeXBlIiwic2VuZCIsImF1ZGlvIiwiQXVkaW8iLCJvbmNhbnBsYXl0aHJvdWdoIiwiX2NvbXBsYXRlIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxLQUFLLFNBQUxBLEVBQUssQ0FBVUMsR0FBVixFQUFlO0FBQ3RCLFNBQUtDLFNBQUwsR0FBaUJELElBQUlFLElBQXJCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUJKLElBQUlFLElBQUosQ0FBU0csTUFBNUI7QUFDQSxTQUFLQyxPQUFMLEdBQWVOLElBQUlNLE9BQW5CO0FBQ0EsU0FBS0MsT0FBTCxHQUFlUCxJQUFJTyxPQUFuQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JSLElBQUlRLFFBQXBCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFNBQUtDLElBQUw7QUFDRCxDQVREO0FBVUFYLEdB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U0FBS0gsT0FBTCxHQUFlLFVBQVV6QixDQUFWLEVBQWE7QUFDeEJhLGNBQU1hLE1BQU47QUFDSCxLQUZEO0FBR0QsQ0FaRDtBQWFBO0FBQ0EzQyxHQUFHWSxTQUFILENBQWFzQixLQUFiLEdBQXFCLFVBQVVGLENBQVYsRUFBYTtBQUNoQyxTQUFLWSxJQUFMLENBQVVaLENBQVYsRUFBYSxNQUFiO0FBQ0QsQ0FGRDs7QUFJQTtBQUNBaEMsR0FBR1ksU0FBSCxDQUFhdUIsTUFBYixHQUFzQixVQUFVSCxDQUFWLEVBQWE7QUFDakMsUUFBSUYsUUFBUSxJQUFaO0FBQ0EsUUFBSW9CLFFBQVEsSUFBSUMsS0FBSixDQUFVbkIsRUFBRWIsR0FBWixDQUFaO0FBQ0ErQixVQUFNRSxnQkFBTixHQUF5QixZQUFVO0FBQy9CdEIsY0FBTVEsUUFBTjtBQUNILEtBRkQ7QUFHRCxDQU5EOztBQVFBO0FBQ0F0QyxHQUFHWSxTQUFILENBQWEwQixRQUFiLEdBQXdCLFlBQVk7QUFDbEMsU0FBS2xDLFdBQUw7QUFDQSxTQUFLSSxPQUFMLElBQWdCLEtBQUtBLE9BQUwsQ0FBYSxFQUFDSixhQUFhLEtBQUtBLFdBQW5CLEVBQWdDQyxhQUFhLEtBQUtBLFdBQWxELEVBQWIsQ0FBaEI7QUFDQSxTQUFLZ0QsU0FBTDtBQUNELENBSkQ7QUFLQTtBQUNBckQsR0FBR1ksU0FBSCxDQUFheUMsU0FBYixHQUF5QixZQUFZO0FBQ25DLFNBQUs1QyxRQUFMLElBQWlCLEtBQUtMLFdBQUwsSUFBb0IsS0FBS0MsV0FBMUMsSUFBeUQsS0FBS0ksUUFBTCxFQUF6RDtBQUNELENBRkQ7O0FBSUFULEdBQUdZLFNBQUgsQ0FBYStCLE1BQWIsR0FBc0IsVUFBVTFCLENBQVYsRUFBYTtBQUNqQ21CLFlBQVFDLEdBQVIsQ0FBWXBCLENBQVo7QUFDRCxDQUZEO0FBR0FxQyxPQUFPQyxPQUFQLEdBQWlCdkQsRUFBakIiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBReSA9IGZ1bmN0aW9uIChvcHQpIHtcclxuICB0aGlzLmRhdGFMaXN0cyA9IG9wdC5kYXRhO1xyXG4gIHRoaXMubm93UHJvZ3Jlc3MgPSAwO1xyXG4gIHRoaXMuYWxsUHJvZ3Jlc3MgPSBvcHQuZGF0YS5sZW5ndGg7XHJcbiAgdGhpcy5hbGxUeXBlID0gb3B0LmFsbFR5cGU7XHJcbiAgdGhpcy5sb2FkaW5nID0gb3B0LmxvYWRpbmc7XHJcbiAgdGhpcy5jb21wbGF0ZSA9IG9wdC5jb21wbGF0ZTtcclxuICB0aGlzLl9kYXRhTGlzdHMgPSBbXTtcclxuICB0aGlzLmluaXQoKTtcclxufVxyXG5ReS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICB0aGlzLl9zZXREYXRhKCk7XHJcbiAgLy9jb25zb2xlLmxvZyh0aGlzLl9kYXRhTGlzdHMpO1xyXG4gIHRoaXMuX2xvYWQoKTtcclxufVxyXG4vLyDliJ3lp4vljJbpnIDopoHliqDovb3nmoTpmJ/kvotcclxuUXkucHJvdG90eXBlLl9zZXREYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBtZSA9IHRoaXM7XHJcbiAgdGhpc1xyXG4gICAgICAuZGF0YUxpc3RzXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICB2YXIgX3VybCA9IGUudXJsIHx8IGU7XHJcbiAgICAgICAgICB2YXIgX3R5cGUgPSBtZS5fZ2V0VHlwZShfdXJsKTtcclxuICAgICAgICAgIG1lXHJcbiAgICAgICAgICAgICAgLl9kYXRhTGlzdHNcclxuICAgICAgICAgICAgICAucHVzaCh7dXJsOiBfdXJsLCB0eXBlOiBfdHlwZX0pO1xyXG4gICAgICB9KVxyXG59XHJcbi8vIOiOt+WPluWKoOi9vXVybOeahOexu+Wei1xyXG5ReS5wcm90b3R5cGUuX2dldFR5cGUgPSBmdW5jdGlvbiAodSkge1xyXG4gIHZhciBfdHlwZSA9ICh1Lm1hdGNoKC9bXlxcLl0rJC8pWzBdKTtcclxuICB2YXIgX3Jlc3VsdCA9IG51bGw7XHJcbiAgZm9yICh2YXIga2V5IGluIHRoaXMuYWxsVHlwZSkge1xyXG4gICAgICBpZiAodGhpcy5hbGxUeXBlW2tleV0uam9pbignLCcpLmluZGV4T2YoX3R5cGUpICE9PSAtMSkge1xyXG4gICAgICAgICAgX3Jlc3VsdCA9IGtleTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgX3Jlc3VsdCA9ICdub3RzdXBwb3J0JztcclxuICAgICAgfVxyXG4gIH1cclxuICByZXR1cm4gX3Jlc3VsdDtcclxufVxyXG4vLyDliqDovb3pmJ/liJdcclxuUXkucHJvdG90eXBlLl9sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgdGhpc1xyXG4gICAgICAuX2RhdGFMaXN0c1xyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZSwgaSwgbykge1xyXG4gICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ25vdHN1cHBvcnQnKSB7XHJcbiAgICAgICAgICAgICAgLy8gaW1hZ2VcclxuICAgICAgICAgICAgICBzd2l0Y2ggKGUudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICBjYXNlICdpbWFnZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5fbG9hZEltYWdlKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2pzb24oZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgY2FzZSAnYXVkaW8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgX3RoaXMuX2F1ZGlvKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IHN1cHBvcnQnKTtcclxuICAgICAgICAgICAgICBfdGhpcy5ub3dQcm9ncmVzcysrO1xyXG4gICAgICAgICAgICAgIF90aGlzLl9sb2FkaW5nKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG59XHJcbi8vIOWKoOi9veWbvueJh1xyXG5ReS5wcm90b3R5cGUuX2xvYWRJbWFnZSA9IGZ1bmN0aW9uIChvKSB7XHJcbiAgdmFyIF90aGlzID0gdGhpcztcclxuICB2YXIgaSA9IG5ldyBJbWFnZSgpO1xyXG4gIGkuc3JjID0gby51cmw7XHJcbiAgaS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIF90aGlzLl9sb2FkaW5nKCk7XHJcbiAgfVxyXG4gIGkub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgX3RoaXMuX2Vycm9yKCk7XHJcbiAgfVxyXG59XHJcbi8vIGFqYXjotYTmupBcclxuUXkucHJvdG90eXBlLl9nZXQgPSBmdW5jdGlvbiAobywgdHlwZSkge1xyXG4gIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgdmFyIF94aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICBfeGhyLm9wZW4oJ3Bvc3QnLCBvLnVybCwgdHJ1ZSk7XHJcbiAgX3hoci5yZXNwb25zZVR5cGUgPSB0eXBlO1xyXG4gIF94aHIuc2VuZCgpO1xyXG4gIF94aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgX3RoaXMuX2xvYWRpbmcoKTtcclxuICB9O1xyXG4gIF94aHIub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIF90aGlzLl9lcnJvcigpO1xyXG4gIH07XHJcbn1cclxuLy8g5Yqg6L29anNvblxyXG5ReS5wcm90b3R5cGUuX2pzb24gPSBmdW5jdGlvbiAobykge1xyXG4gIHRoaXMuX2dldChvLCAnanNvbicpO1xyXG59XHJcblxyXG4vLyDliqDovb1hdWRpb1xyXG5ReS5wcm90b3R5cGUuX2F1ZGlvID0gZnVuY3Rpb24gKG8pIHtcclxuICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gIHZhciBhdWRpbyA9IG5ldyBBdWRpbyhvLnVybCk7XHJcbiAgYXVkaW8ub25jYW5wbGF5dGhyb3VnaCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIF90aGlzLl9sb2FkaW5nKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDliqDovb3lrozkuIDkuKrnmoTml7blgJnlm57osINcclxuUXkucHJvdG90eXBlLl9sb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gIHRoaXMubm93UHJvZ3Jlc3MrKztcclxuICB0aGlzLmxvYWRpbmcgJiYgdGhpcy5sb2FkaW5nKHtub3dQcm9ncmVzczogdGhpcy5ub3dQcm9ncmVzcywgYWxsUHJvZ3Jlc3M6IHRoaXMuYWxsUHJvZ3Jlc3N9KTtcclxuICB0aGlzLl9jb21wbGF0ZSgpO1xyXG59XHJcbi8v5YWo6YOo5Yqg6L295a6M55qE5pe25YCZ5Zue6LCDXHJcblF5LnByb3RvdHlwZS5fY29tcGxhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgdGhpcy5jb21wbGF0ZSAmJiB0aGlzLm5vd1Byb2dyZXNzID09IHRoaXMuYWxsUHJvZ3Jlc3MgJiYgdGhpcy5jb21wbGF0ZSgpO1xyXG59XHJcblxyXG5ReS5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGUpIHtcclxuICBjb25zb2xlLmxvZyhlKTtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IFF5O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2FwcC9qcy9xeS5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n")},10:function(module,exports,__webpack_require__){"use strict";eval("\n\nvar _qy = __webpack_require__(0);\n\nvar _qy2 = _interopRequireDefault(_qy);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar video1 = document.getElementById('video1');\nvar key1 = false,\n    key2 = false,\n    hastouch = false;\nvar hot = document.getElementById('hot');\n\nfunction fitscreen() {\n  var ratio = parseFloat(1500 / 1754 * innerHeight / 750);\n  $('.load-text').css('margin-left', -(0.21 * innerHeight * (417 / 382)) / 2 + 'px');\n  $('.loadimg').css('width', 0.3 * innerHeight * (490 / 530) + 'px').css('margin-left', -(0.3 * innerHeight) * (490 / 530) / 2 + 'px');\n  $('.btn-enter').css('margin-left', -(0.1 * innerHeight * (401 / 181)) / 2 + 'px');\n  $('.bg').css('margin-left', -(1500 / 1754 * innerHeight / 2) + 'px');\n  $('.video1').css('margin-left', -(750 / 876 * innerHeight / 2) + 'px');\n  $('.last-bg').css('margin-left', -(1500 / 1754 * innerHeight / 2) + 'px');\n  $('.last-person').css('margin-left', -(0.57 * innerHeight * (1197 / 1015)) / 2 + 'px');\n  $('.last-line').css('margin-left', -(1500 / 1754 * innerHeight / 2) + 'px');\n  $('.last-text1').css('margin-left', -(0.30 * innerHeight * (875 / 536)) / 2 + 'px');\n  $('.last-text2').css('margin-left', -(0.29 * innerHeight * (805 / 510)) / 2 + 'px');\n  $('.btn-return').css('margin-left', 750 / 877 * innerHeight * 0.18 + 'px');\n  $('.btn-jump').css('margin-right', 750 / 877 * innerHeight * 0.02 + 'px');\n  $('.btn-share').css('margin-left', 750 / 877 * innerHeight * 0.02 + 'px');\n  $('.hand-left').css('margin-left', 750 / 876 * innerHeight * 0.09 - 0.08 * innerHeight + 'px');\n  $('.hand-right').css('margin-left', 750 / 876 * innerHeight * 0.09 + 'px');\n};\n\nwindow.onresize = function () {\n  fitscreen();\n};\n\nvideo1.addEventListener('x5videoenterfullscreen', function () {\n  setTimeout(function () {\n    fitscreen();\n  }, 100);\n});\n\nvar videotimer = setInterval(function () {\n  if (video1.currentTime > 20 + 10 / 30 && !key1) {\n    video1.pause();\n    $('.page-1').removeClass('hide').addClass('top1');\n    $('.btn-music').addClass('hide');\n    key1 = true;\n  }\n\n  if (video1.ended && !key2) {\n    $('.video1').addClass('hide').removeClass('top1');\n    $('.white-page').removeClass('hide').addClass('top1');\n    $('.last-page').removeClass('hide');\n    key2 = true;\n    setTimeout(function () {\n      $('.white-page').addClass('hide').removeClass('top1');\n      $('.last-person,.last-text1').removeClass('hide');\n    }, 1000);\n    $('.btn-music').addClass('hide');\n  }\n}, 10);\n\nhot.addEventListener('touchend', function (e) {\n  if (e.touches.length >= 2 && !hastouch) {\n    setTimeout(function () {\n      video1.play();\n      $('.page-1').addClass('hide').removeClass('top1');\n      $('.btn-music').removeClass('hide');\n    }, 200);\n    hastouch = true;\n  }\n  video1.play();\n  $('.page-1').addClass('hide').removeClass('top1');\n  $('.btn-music').removeClass('hide');\n}, false);\n\n$('.btn-enter').click(function () {\n  $('.load-wrap').addClass('hide').removeClass('top1');\n  //video1.currentTime = 15;\n  $('.video1').addClass('top1');\n  $('.btn-music').removeClass('hide');\n  video1.play();\n});\n\n$('.btn-return').click(function () {\n  $('.last-page').addClass('hide').removeClass('top1');\n  $('.video1').addClass('top1').removeClass('hide');\n  //video1.currentTime = 80;\n  key1 = false, key2 = false, hastouch = false;\n  video1.play();\n});\n\n$('.btn-share').click(function () {\n  $('.share-page').removeClass('hide').addClass('top1');\n});\n\n$('.share-page').click(function () {\n  $('.share-page').addClass('hide').removeClass('top1');\n});\n\n$('.btn-jump').click(function () {\n  setTimeout(function () {\n    window.location.href = 'https://baidu.com';\n  }, 100);\n});\n\n$('.btn-music').click(function () {\n  if ($(this).hasClass('music-pause')) {\n    $(this).removeClass('music-pause');\n\n    video1.muted = false;\n  } else {\n    $(this).addClass('music-pause');\n    video1.muted = true;\n  }\n});\n\n// 页面初始化\n\nfitscreen();\n$('.load-wrap').removeClass('hide');\n$('.load-wrap').css('opacity', '1');\ndocument.addEventListener(\"touchmove\", function (e) {\n  e.preventDefault();\n}, false);\n\n// 加载进度\n\nvar percent = 0;\nvar percent_beforeLoad = 0;\nvar opt = {\n  data: [\"./src/img/han/BG.png\", \"./src/img/han/hand_left.png\", \"./src/img/han/hand_right.png\", \"./src/img/han/last_bg.png\", \"./src/img/han/last_jump.png\", \"./src/img/han/last_line.png\", \"./src/img/han/last_person.png\", \"./src/img/han/last_return.png\", \"./src/img/han/last_share.png\", \"./src/img/han/last_text1.png\", \"./src/img/han/last_text2.png\", \"./src/img/han/load_img.png\", \"./src/img/han/load_text.png\", \"./src/img/han/music.png\", \"./src/img/han/poster.jpg\", \"./src/img/han/share_ing.png\", \"./src/img/han/share_icon.jpg\", \"./src/img/han/start.png\"],\n  allType: {\n    image: ['jpg', 'png', 'gif'],\n    json: ['json'],\n    audio: ['mp3']\n  },\n  loading: function loading(o) {\n    percent_beforeLoad = Math.floor(o.nowProgress / o.allProgress * 100);\n    var loadtimer = setInterval(function () {\n      if (percent >= 100) {\n        clearInterval(loadtimer);\n        setTimeout(function () {\n          $('.load-percent').addClass('hide');\n        }, 500);\n        setTimeout(function () {\n          $('.btn-enter').removeClass('hide');\n          $('.load-wrap').addClass('enter-bg');\n        }, 1000);\n      }\n      $('.load-percent').html(percent + '%');\n      if (percent < percent_beforeLoad) percent++;\n    }, 50);\n  },\n  complate: function complate() {\n    $('.hand-left').attr('src', $('.hand-left').attr('rsrc'));\n    $('.hand-right').attr('src', $('.hand-right').attr('rsrc'));\n    $.each($('.last-bg2'), function (i, item) {\n      $(item).attr('src', $(item).attr('rsrc'));\n    });\n    //$('.last-bg2').attr('src', $('.last-bg2').attr('rsrc'));\n    // $('.last-bg').attr('src', $('.last-bg').attr('rsrc'));\n    // $('.last-line').attr('src', $('.last-line').attr('rsrc'));\n    // $('.last-person').attr('src', $('.last-person').attr('rsrc'));\n    // $('.last-text1').attr('src', $('.last-text1').attr('rsrc'));\n    // $('.last-text2').attr('src', $('.last-text2').attr('rsrc'));\n    // $('.btn-return').attr('src', $('.btn-return').attr('rsrc'));\n    // $('.btn-jump').attr('src', $('.btn-jump').attr('rsrc'));\n\n    $('.btn-share').attr('src', $('.btn-share').attr('rsrc'));\n    $('.video1').removeClass('hide');\n  }\n};\nnew _qy2.default(opt);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaGFuLmpzPzIzN2EiXSwibmFtZXMiOlsidmlkZW8xIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImtleTEiLCJrZXkyIiwiaGFzdG91Y2giLCJob3QiLCJmaXRzY3JlZW4iLCJyYXRpbyIsInBhcnNlRmxvYXQiLCJpbm5lckhlaWdodCIsIiQiLCJjc3MiLCJ3aW5kb3ciLCJvbnJlc2l6ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwidmlkZW90aW1lciIsInNldEludGVydmFsIiwiY3VycmVudFRpbWUiLCJwYXVzZSIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJlbmRlZCIsImUiLCJ0b3VjaGVzIiwibGVuZ3RoIiwicGxheSIsImNsaWNrIiwibG9jYXRpb24iLCJocmVmIiwiaGFzQ2xhc3MiLCJtdXRlZCIsInByZXZlbnREZWZhdWx0IiwicGVyY2VudCIsInBlcmNlbnRfYmVmb3JlTG9hZCIsIm9wdCIsImRhdGEiLCJhbGxUeXBlIiwiaW1hZ2UiLCJqc29uIiwiYXVkaW8iLCJsb2FkaW5nIiwibyIsIk1hdGgiLCJmbG9vciIsIm5vd1Byb2dyZXNzIiwiYWxsUHJvZ3Jlc3MiLCJsb2FkdGltZXIiLCJjbGVhckludGVydmFsIiwiaHRtbCIsImNvbXBsYXRlIiwiYXR0ciIsImVhY2giLCJpIiwiaXRlbSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsU0FBU0MsY0FBVCxDQUF3QixRQUF4QixDQUFiO0FBQ0EsSUFBSUMsT0FBTyxLQUFYO0FBQUEsSUFBa0JDLE9BQU8sS0FBekI7QUFBQSxJQUFnQ0MsV0FBVyxLQUEzQztBQUNBLElBQUlDLE1BQU1MLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBVjs7QUFFQSxTQUFTSyxTQUFULEdBQXFCO0FBQ25CLE1BQUlDLFFBQVFDLFdBQVksT0FBTyxJQUFSLEdBQWdCQyxXQUFoQixHQUE4QixHQUF6QyxDQUFaO0FBQ0FDLElBQUUs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NUMsUUFBRTRDLElBQUYsRUFBUUgsSUFBUixDQUFhLEtBQWIsRUFBb0J6QyxFQUFFNEMsSUFBRixFQUFRSCxJQUFSLENBQWEsTUFBYixDQUFwQjtBQUNELEtBRkQ7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBekMsTUFBRSxZQUFGLEVBQWdCeUMsSUFBaEIsQ0FBcUIsS0FBckIsRUFBNEJ6QyxFQUFFLFlBQUYsRUFBZ0J5QyxJQUFoQixDQUFxQixNQUFyQixDQUE1QjtBQUNBekMsTUFBRSxTQUFGLEVBQWFVLFdBQWIsQ0FBeUIsTUFBekI7QUFDRDtBQWhFTyxDQUFWO0FBa0VBLGlCQUFPZSxHQUFQIiwiZmlsZSI6IjEwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFF5IGZyb20gJy4vanMvcXkuanMnO1xyXG5cclxudmFyIHZpZGVvMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlbzEnKTtcclxudmFyIGtleTEgPSBmYWxzZSwga2V5MiA9IGZhbHNlLCBoYXN0b3VjaCA9IGZhbHNlO1xyXG52YXIgaG90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdCcpO1xyXG5cclxuZnVuY3Rpb24gZml0c2NyZWVuKCkge1xyXG4gIHZhciByYXRpbyA9IHBhcnNlRmxvYXQoKDE1MDAgLyAxNzU0KSAqIGlubmVySGVpZ2h0IC8gNzUwKTtcclxuICAkKCcubG9hZC10ZXh0JykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oKDAuMjEgKiBpbm5lckhlaWdodCkgKiAoNDE3IC8gMzgyKSkgLyAyICsgJ3B4Jyk7XHJcbiAgJCgnLmxvYWRpbWcnKS5jc3MoJ3dpZHRoJywgKDAuMyAqIGlubmVySGVpZ2h0KSAqICg0OTAgLyA1MzApICsgJ3B4JykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oMC4zICogaW5uZXJIZWlnaHQpICogKDQ5MCAvIDUzMCkgLyAyICsgJ3B4Jyk7XHJcbiAgJCgnLmJ0bi1lbnRlcicpLmNzcygnbWFyZ2luLWxlZnQnLCAtKCgwLjEgKiBpbm5lckhlaWdodCkgKiAoNDAxIC8gMTgxKSkgLyAyICsgJ3B4Jyk7XHJcbiAgJCgnLmJnJykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oKDE1MDAgLyAxNzU0KSAqIGlubmVySGVpZ2h0IC8gMikgKyAncHgnKTtcclxuICAkKCcudmlkZW8xJykuY3NzKCdtYXJnaW4tbGVmdCcsIC0oKDc1MCAvIDg3NikgKiBpbm5lckhlaWdodCAvIDIpICsgJ3B4Jyk7XHJcbiAgJCgnLmxhc3QtYmcnKS5jc3MoJ21hcmdpbi1sZWZ0JywgLSgoMTUwMCAvIDE3NTQpICogaW5uZXJIZWlnaHQgLyAyKSArICdweCcpO1xyXG4gICQoJy5sYXN0LXBlcnNvbicpLmNzcygnbWFyZ2luLWxlZnQnLCAtKCgwLjU3ICogaW5uZXJIZWlnaHQpICogKDExOTcgLyAxMDE1KSkgLyAyICsgJ3B4Jyk7XHJcbiAgJCgnLmxhc3QtbGluZScpLmNzcygnbWFyZ2luLWxlZnQnLCAtKCgxNTAwIC8gMTc1NCkgKiBpbm5lckhlaWdodCAvIDIpICsgJ3B4Jyk7XHJcbiAgJCgnLmxhc3QtdGV4dDEnKS5jc3MoJ21hcmdpbi1sZWZ0JywgLSgoMC4zMCAqIGlubmVySGVpZ2h0KSAqICg4NzUgLyA1MzYpKSAvIDIgKyAncHgnKTtcclxuICAkKCcubGFzdC10ZXh0MicpLmNzcygnbWFyZ2luLWxlZnQnLCAtKCgwLjI5ICogaW5uZXJIZWlnaHQpICogKDgwNSAvIDUxMCkpIC8gMiArICdweCcpO1xyXG4gICQoJy5idG4tcmV0dXJuJykuY3NzKCdtYXJnaW4tbGVmdCcsICgoKDc1MCAvIDg3NykgKiBpbm5lckhlaWdodCkgKiAwLjE4KSArICdweCcpO1xyXG4gICQoJy5idG4tanVtcCcpLmNzcygnbWFyZ2luLXJpZ2h0JywgKCgoNzUwIC8gODc3KSAqIGlubmVySGVpZ2h0KSAqIDAuMDIpICsgJ3B4Jyk7XHJcbiAgJCgnLmJ0bi1zaGFyZScpLmNzcygnbWFyZ2luLWxlZnQnLCAoKCg3NTAgLyA4NzcpICogaW5uZXJIZWlnaHQpICogMC4wMikgKyAncHgnKTtcclxuICAkKCcuaGFuZC1sZWZ0JykuY3NzKCdtYXJnaW4tbGVmdCcsICgoKDc1MCAvIDg3NikgKiBpbm5lckhlaWdodCkgKiAwLjA5KSAtICgwLjA4ICogaW5uZXJIZWlnaHQpICsgJ3B4Jyk7XHJcbiAgJCgnLmhhbmQtcmlnaHQnKS5jc3MoJ21hcmdpbi1sZWZ0JywgKCgoNzUwIC8gODc2KSAqIGlubmVySGVpZ2h0KSAqIDAuMDkpICsgJ3B4Jyk7XHJcbn07XHJcblxyXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZml0c2NyZWVuKCk7XHJcbn07XHJcblxyXG52aWRlbzEuYWRkRXZlbnRMaXN0ZW5lcigneDV2aWRlb2VudGVyZnVsbHNjcmVlbicsIGZ1bmN0aW9uICgpIHtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGZpdHNjcmVlbigpO1xyXG4gIH0sIDEwMCk7XHJcbn0pO1xyXG5cclxudmFyIHZpZGVvdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHZpZGVvMS5jdXJyZW50VGltZSA+ICgyMCArIDEwIC8gMzApICYmICFrZXkxKSB7XHJcbiAgICB2aWRlbzEucGF1c2UoKTtcclxuICAgICQoJy5wYWdlLTEnKS5yZW1vdmVDbGFzcygnaGlkZScpLmFkZENsYXNzKCd0b3AxJyk7XHJcbiAgICAkKCcuYnRuLW11c2ljJykuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgIGtleTEgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaWYgKHZpZGVvMS5lbmRlZCAmJiAha2V5Mikge1xyXG4gICAgJCgnLnZpZGVvMScpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxuICAgICQoJy53aGl0ZS1wYWdlJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKS5hZGRDbGFzcygndG9wMScpO1xyXG4gICAgJCgnLmxhc3QtcGFnZScpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICBrZXkyID0gdHJ1ZTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCcud2hpdGUtcGFnZScpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxuICAgICAgJCgnLmxhc3QtcGVyc29uLC5sYXN0LXRleHQxJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgIH0sIDEwMDApO1xyXG4gICAgJCgnLmJ0bi1tdXNpYycpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgfVxyXG59LCAxMCk7XHJcblxyXG5ob3QuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZSkge1xyXG4gIGlmIChlLnRvdWNoZXMubGVuZ3RoID49IDIgJiYgIWhhc3RvdWNoKSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmlkZW8xLnBsYXkoKTtcclxuICAgICAgJCgnLnBhZ2UtMScpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxuICAgICAgJCgnLmJ0bi1tdXNpYycpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICB9LCAyMDApO1xyXG4gICAgaGFzdG91Y2ggPSB0cnVlO1xyXG4gIH1cclxuICB2aWRlbzEucGxheSgpO1xyXG4gICQoJy5wYWdlLTEnKS5hZGRDbGFzcygnaGlkZScpLnJlbW92ZUNsYXNzKCd0b3AxJyk7XHJcbiAgJCgnLmJ0bi1tdXNpYycpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbiQoJy5idG4tZW50ZXInKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLmxvYWQtd3JhcCcpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxuICAvL3ZpZGVvMS5jdXJyZW50VGltZSA9IDE1O1xyXG4gICQoJy52aWRlbzEnKS5hZGRDbGFzcygndG9wMScpO1xyXG4gICQoJy5idG4tbXVzaWMnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIHZpZGVvMS5wbGF5KCk7XHJcbn0pO1xyXG5cclxuJCgnLmJ0bi1yZXR1cm4nKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgJCgnLmxhc3QtcGFnZScpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxuICAkKCcudmlkZW8xJykuYWRkQ2xhc3MoJ3RvcDEnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIC8vdmlkZW8xLmN1cnJlbnRUaW1lID0gODA7XHJcbiAga2V5MSA9IGZhbHNlLCBrZXkyID0gZmFsc2UsIGhhc3RvdWNoID0gZmFsc2U7XHJcbiAgdmlkZW8xLnBsYXkoKTtcclxuXHJcbn0pO1xyXG5cclxuJCgnLmJ0bi1zaGFyZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKCcuc2hhcmUtcGFnZScpLnJlbW92ZUNsYXNzKCdoaWRlJykuYWRkQ2xhc3MoJ3RvcDEnKTtcclxufSk7XHJcblxyXG4kKCcuc2hhcmUtcGFnZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAkKCcuc2hhcmUtcGFnZScpLmFkZENsYXNzKCdoaWRlJykucmVtb3ZlQ2xhc3MoJ3RvcDEnKTtcclxufSk7XHJcblxyXG4kKCcuYnRuLWp1bXAnKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwczovL2JhaWR1LmNvbSc7XHJcbiAgfSwgMTAwKTtcclxufSk7XHJcblxyXG4kKCcuYnRuLW11c2ljJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gIGlmICgkKHRoaXMpLmhhc0NsYXNzKCdtdXNpYy1wYXVzZScpKSB7XHJcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdtdXNpYy1wYXVzZScpO1xyXG5cclxuICAgIHZpZGVvMS5tdXRlZCA9IGZhbHNlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdtdXNpYy1wYXVzZScpO1xyXG4gICAgdmlkZW8xLm11dGVkID0gdHJ1ZTtcclxuICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG4vLyDpobXpnaLliJ3lp4vljJZcclxuXHJcbmZpdHNjcmVlbigpO1xyXG4kKCcubG9hZC13cmFwJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuJCgnLmxvYWQtd3JhcCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn0sIGZhbHNlKTtcclxuXHJcbi8vIOWKoOi9vei/m+W6plxyXG5cclxudmFyIHBlcmNlbnQgPSAwO1xyXG52YXIgcGVyY2VudF9iZWZvcmVMb2FkID0gMDtcclxudmFyIG9wdCA9IHtcclxuICBkYXRhOiBbXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vQkcucG5nXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vaGFuZF9sZWZ0LnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2hhbmRfcmlnaHQucG5nXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vbGFzdF9iZy5wbmdcIixcclxuICAgIFwiLi9zcmMvaW1nL2hhbi9sYXN0X2p1bXAucG5nXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vbGFzdF9saW5lLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2xhc3RfcGVyc29uLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2xhc3RfcmV0dXJuLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2xhc3Rfc2hhcmUucG5nXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vbGFzdF90ZXh0MS5wbmdcIixcclxuICAgIFwiLi9zcmMvaW1nL2hhbi9sYXN0X3RleHQyLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2xvYWRfaW1nLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL2xvYWRfdGV4dC5wbmdcIixcclxuICAgIFwiLi9zcmMvaW1nL2hhbi9tdXNpYy5wbmdcIixcclxuICAgIFwiLi9zcmMvaW1nL2hhbi9wb3N0ZXIuanBnXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vc2hhcmVfaW5nLnBuZ1wiLFxyXG4gICAgXCIuL3NyYy9pbWcvaGFuL3NoYXJlX2ljb24uanBnXCIsXHJcbiAgICBcIi4vc3JjL2ltZy9oYW4vc3RhcnQucG5nXCIsXHJcbiAgXSxcclxuICBhbGxUeXBlOiB7XHJcbiAgICBpbWFnZTogW1xyXG4gICAgICAnanBnJywgJ3BuZycsICdnaWYnXHJcbiAgICBdLFxyXG4gICAganNvbjogWydqc29uJ10sXHJcbiAgICBhdWRpbzogWydtcDMnXVxyXG4gIH0sXHJcbiAgbG9hZGluZzogZnVuY3Rpb24gKG8pIHtcclxuICAgIHBlcmNlbnRfYmVmb3JlTG9hZCA9IE1hdGguZmxvb3IoKG8ubm93UHJvZ3Jlc3MgLyBvLmFsbFByb2dyZXNzKSAqIDEwMCk7XHJcbiAgICB2YXIgbG9hZHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAocGVyY2VudCA+PSAxMDApIHtcclxuICAgICAgICBjbGVhckludGVydmFsKGxvYWR0aW1lcik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLmxvYWQtcGVyY2VudCcpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgfSw1MDApXHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgJCgnLmJ0bi1lbnRlcicpLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAkKCcubG9hZC13cmFwJykuYWRkQ2xhc3MoJ2VudGVyLWJnJyk7XHJcbiAgICAgICAgfSwxMDAwKVxyXG4gICAgICB9XHJcbiAgICAgICQoJy5sb2FkLXBlcmNlbnQnKS5odG1sKHBlcmNlbnQgKyAnJScpO1xyXG4gICAgICBpZiAocGVyY2VudCA8IHBlcmNlbnRfYmVmb3JlTG9hZClcclxuICAgICAgICBwZXJjZW50Kys7XHJcbiAgICB9XHJcbiAgICAgICwgNTApO1xyXG4gIH0sXHJcbiAgY29tcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5oYW5kLWxlZnQnKS5hdHRyKCdzcmMnLCAkKCcuaGFuZC1sZWZ0JykuYXR0cigncnNyYycpKTtcclxuICAgICQoJy5oYW5kLXJpZ2h0JykuYXR0cignc3JjJywgJCgnLmhhbmQtcmlnaHQnKS5hdHRyKCdyc3JjJykpO1xyXG4gICAgJC5lYWNoKCQoJy5sYXN0LWJnMicpLCBmdW5jdGlvbihpLGl0ZW0pe1xyXG4gICAgICAkKGl0ZW0pLmF0dHIoJ3NyYycsICQoaXRlbSkuYXR0cigncnNyYycpKTtcclxuICAgIH0pXHJcbiAgICAvLyQoJy5sYXN0LWJnMicpLmF0dHIoJ3NyYycsICQoJy5sYXN0LWJnMicpLmF0dHIoJ3JzcmMnKSk7XHJcbiAgICAvLyAkKCcubGFzdC1iZycpLmF0dHIoJ3NyYycsICQoJy5sYXN0LWJnJykuYXR0cigncnNyYycpKTtcclxuICAgIC8vICQoJy5sYXN0LWxpbmUnKS5hdHRyKCdzcmMnLCAkKCcubGFzdC1saW5lJykuYXR0cigncnNyYycpKTtcclxuICAgIC8vICQoJy5sYXN0LXBlcnNvbicpLmF0dHIoJ3NyYycsICQoJy5sYXN0LXBlcnNvbicpLmF0dHIoJ3JzcmMnKSk7XHJcbiAgICAvLyAkKCcubGFzdC10ZXh0MScpLmF0dHIoJ3NyYycsICQoJy5sYXN0LXRleHQxJykuYXR0cigncnNyYycpKTtcclxuICAgIC8vICQoJy5sYXN0LXRleHQyJykuYXR0cignc3JjJywgJCgnLmxhc3QtdGV4dDInKS5hdHRyKCdyc3JjJykpO1xyXG4gICAgLy8gJCgnLmJ0bi1yZXR1cm4nKS5hdHRyKCdzcmMnLCAkKCcuYnRuLXJldHVybicpLmF0dHIoJ3JzcmMnKSk7XHJcbiAgICAvLyAkKCcuYnRuLWp1bXAnKS5hdHRyKCdzcmMnLCAkKCcuYnRuLWp1bXAnKS5hdHRyKCdyc3JjJykpO1xyXG5cclxuICAgICQoJy5idG4tc2hhcmUnKS5hdHRyKCdzcmMnLCAkKCcuYnRuLXNoYXJlJykuYXR0cigncnNyYycpKTtcclxuICAgICQoJy52aWRlbzEnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gIH1cclxufVxyXG5uZXcgUXkob3B0KTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXBwL2hhbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///10\n")}});