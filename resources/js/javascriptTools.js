'use strict';

function JSTools($) {
    this.JQ = $;
    this.winW = document.documentElement.clientWidth || document.body.clientWidth;
    this.winH = document.documentElement.clientHeight || document.body.clientHeight;
    this.confirmWidth = 550;
    this.confirmHeight = 242;
    this.alertWidth = 348;
    this.alertHeight = 208;
    this.showCloseBut = true;
    this.confirmButBG = '#015407';
    this.msgWidth = 120;
    this.msgHeight = 50;
    this.store = window.localStorage ? window.localStorage : document.cookie;
}

JSTools.prototype.alert = function(o) {
    this.timerout = 3;
    var _this = this,
        _w = !this.isUndefind(o.width) && !this.empty(o.width) ? o.width : this.alertWidth,
        _h = !this.isUndefind(o.height) && !this.empty(o.height) ? o.height : this.alertHeight;
    var maskLayer = document.createElement('div');
    maskLayer.id = 'alert-mask-layer';
    maskLayer.style.width = this.winW + 'px';
    maskLayer.style.height = this.winH + 'px';
    maskLayer.style.background = '#999';
    maskLayer.style.position = 'fixed';
    maskLayer.style.left = 0;
    maskLayer.style.top = 0;
    maskLayer.style.opacity = 0.6;
    maskLayer.style.filter = 'alpha(opacity:60)';
    maskLayer.style.zIndex = 999;
    var contentLayer = document.createElement('div');
    contentLayer.id = 'alert-content-layer';
    contentLayer.style.width = _w + 'px';
    contentLayer.style.height = _h + 'px';
    contentLayer.style.background = '#FFF';
    contentLayer.style.position = 'fixed';
    contentLayer.style.left = parseInt((this.winW - _w) / 2) + 'px';
    contentLayer.style.top = parseInt((this.winH - _h) / 2) + 'px';
    contentLayer.style.border = '1px solid #c1c1c1';
    contentLayer.style.borderRadius = '5px';
    contentLayer.style.zIndex = 1000;
    contentLayer.innerHTML = '<div class="alert-head-block-box">' +
        '<div class="alert-head-title">' + (this.isUndefind(o.title) || this.empty(o.title) ? jsts.domain() + ' say:' : o.title + ':') + '</div>' +
        (this.showCloseBut ? '<div class="alert-head-close"><a href="javascript:void(0);" id="alert-close-but" title="关闭"></a></div>' : '') +
        '</div>' +
        '<div class="alert-body-block-box">' + o.text + '</div>' +
        (this.isUndefind(o.confirm) ? '' : (
            '<div class="alert-foot-block-box">' +
            '<a href="javascript:void(0);" id="alert-alert-but">确定</a>' +
            '</div>'
        )) +
        '<style>' +
        '.alert-head-block-box{width:' + parseInt(_w - 20) + 'px;height:50px;border-bottom:1px solid #c1c1c1;padding:0 10px;}\n' +
        '.alert-head-title{float:left;height:50px;line-height:50px;font-size:15px;color:#3c3c3c}\n' +
        '.alert-head-close{float:right;width:50px;height:50px;}\n' +
        '#alert-close-but{display:block;width:50px;height:50px;background:url("/resources/images/confirm_close_icon_bg.png") no-repeat 17px 17px;}' +
        '#alert-close-but:hover{background:url("/resources/images/confirm_close_icon_hover_bg.png") no-repeat 17px 17px;}' +
        '.alert-body-block-box{width:' + parseInt(_w - 20) + 'px;height:70px;padding:10px;word-wrap:break-word;word-break:break-all;}\n' +
        '.alert-foot-block-box{width:' + parseInt(_w - 20) + 'px;height:50px;padding:0 10px;}\n' +
        '#alert-alert-but{display:block;float:right;width:80px;height:40px;line-height:40px;text-align:center;background:' + this.confirmButBG + ';color:#FFF;text-decoration:none;border-radius:2px;border:1px solid #014106;margin:5px 30px 0 0;}' +
        '#alert-alert-but:hover{background:#014106;}\n' +
        '</style>';
    document.body.appendChild(maskLayer);
    document.body.appendChild(contentLayer);
    this.JQ('#alert-close-but').on('click', function() {
        _this.JQ('#alert-content-layer').remove();
        _this.JQ('#alert-mask-layer').remove();
    });

    this.timerout = this.isUndefind(o.timerout) || this.empty(o.timerout) ? this.timerout * 1000 : parseInt(o.timerout) * 1000;

    if (this.isUndefind(o.timerout)) {
        if (!this.isUndefind(o.confirm)) {
            this.JQ('#alert-alert-but').on('click', function() {
                o.confirm();
                _this.JQ('#alert-content-layer').remove();
                _this.JQ('#alert-mask-layer').remove();
            });
        } else {
            this.setTimeOut(function() {
                _this.JQ('#alert-content-layer').remove();
                _this.JQ('#alert-mask-layer').remove();
            }, _this.timerout);
        }

    } else {
        this.setTimeOut(function() {
            _this.JQ('#alert-content-layer').remove();
            _this.JQ('#alert-mask-layer').remove();
        }, _this.timerout);
    }

}

JSTools.prototype.confirm = function(o) {
    var _this = this,
        _w = !this.isUndefind(o.width) && !this.empty(o.width) ? o.width : this.confirmWidth,
        _h = !this.isUndefind(o.height) && !this.empty(o.height) ? o.height : this.confirmHeight;
    var maskLayer = document.createElement('div');
    maskLayer.id = 'confirm-mask-layer';
    maskLayer.style.width = this.winW + 'px';
    maskLayer.style.height = this.winH + 'px';
    maskLayer.style.background = '#999';
    maskLayer.style.position = 'fixed';
    maskLayer.style.left = 0;
    maskLayer.style.top = 0;
    maskLayer.style.opacity = 0.6;
    maskLayer.style.filter = 'alpha(opacity:60)';
    maskLayer.style.zIndex = 999;
    var contentLayer = document.createElement('div');
    contentLayer.id = 'confirm-content-layer';
    contentLayer.style.width = _w + 'px';
    contentLayer.style.height = _h + 'px';
    contentLayer.style.background = '#FFF';
    contentLayer.style.position = 'fixed';
    contentLayer.style.left = parseInt((this.winW - _w) / 2) + 'px';
    contentLayer.style.top = parseInt((this.winH - _h) / 2) + 'px';
    contentLayer.style.border = '1px solid #c1c1c1';
    contentLayer.style.borderRadius = '5px';
    contentLayer.style.zIndex = 1000;
    contentLayer.innerHTML = '<div class="confirm-head-block-box">' +
        '<div class="confirm-head-title">' + (this.isUndefind(o.title) || this.empty(o.title) ? jsts.domain() + ' say:' : o.title + ':') + '</div>' +
        (this.showCloseBut ? '<div class="confirm-head-close"><a href="javascript:void(0);" id="confirm-close-but" title="关闭"></a></div>' : '') +
        '</div>' +
        '<div class="confirm-body-block-box">' + o.text + '</div>' +
        '<div class="confirm-foot-block-box">' +
        '<a href="javascript:void(0);" id="confirm-cancel-but">取消</a>' +
        '<a href="javascript:void(0);" id="confirm-confirm-but">确定</a>' +
        '</div>' +
        '<style>' +
        '.confirm-head-block-box{width:' + parseInt(_w - 20) + 'px;height:50px;border-bottom:1px solid #c1c1c1;padding:0 10px;}\n' +
        '.confirm-head-title{float:left;height:50px;line-height:50px;font-size:15px;color:#3c3c3c}\n' +
        '.confirm-head-close{float:right;width:50px;height:50px;}\n' +
        '#confirm-close-but{display:block;width:50px;height:50px;background:url("/resources/images/confirm_close_icon_bg.png") no-repeat 17px 17px;}' +
        '#confirm-close-but:hover{background:url("/resources/images/confirm_close_icon_hover_bg.png") no-repeat 17px 17px;}' +
        '.confirm-body-block-box{width:' + parseInt(_w - 20) + 'px;padding:0 10px;}\n' +
        '.confirm-foot-block-box{width:' + parseInt(_w - 20) + 'px;height:50px;padding:0 10px;}\n' +
        '#confirm-confirm-but{display:block;float:right;width:80px;height:40px;line-height:40px;text-align:center;background:' + this.confirmButBG + ';color:#FFF;text-decoration:none;border-radius:2px;border:1px solid #014106;margin:5px 30px 0 0;}' +
        '#confirm-confirm-but:hover{background:#014106;}\n' +
        '#confirm-cancel-but{display:block;float:right;width:80px;height:40px;line-height:40px;text-align:center;background:#FFF;text-decoration:none;border-radius:2px;color:#3c3c3c;border:1px solid #c1c1c1;margin:5px 30px 0 0;}' +
        '#confirm-cancel-but:hover{background:#c1c1c1;}\n' +
        '</style>';
    document.body.appendChild(maskLayer);
    document.body.appendChild(contentLayer);

    this.JQ('#confirm-close-but').on('click', function() {
        _this.JQ('#confirm-content-layer').remove();
        _this.JQ('#confirm-mask-layer').remove();
    });
    this.JQ('#confirm-confirm-but').on('click', function() {
        o.confirm();
        _this.JQ('#confirm-content-layer').remove();
        _this.JQ('#confirm-mask-layer').remove();
    });
    this.JQ('#confirm-cancel-but').on('click', function() {
        o.cancel();
        _this.JQ('#confirm-content-layer').remove();
        _this.JQ('#confirm-mask-layer').remove();
    });
}

/**
 * 简单的提示
 * @param  {[type]} o [description]
 * @return {[type]}   [description]
 */
JSTools.prototype.msg = function(o) {
    var _this = this;
    var maskLayer = document.createElement('div');
    maskLayer.id = 'confirm-mask-layer';
    maskLayer.style.width = this.winW + 'px';
    maskLayer.style.height = this.winH + 'px';
    maskLayer.style.background = '#FFF';
    maskLayer.style.position = 'fixed';
    maskLayer.style.left = 0;
    maskLayer.style.top = 0;
    maskLayer.style.opacity = 0;
    maskLayer.style.filter = 'alpha(opacity:0)';
    maskLayer.style.zIndex = 999;
    var contentLayer = document.createElement('div');
    contentLayer.id = 'confirm-content-layer';
    contentLayer.style.width = this.msgWidth + 'px';
    contentLayer.style.height = this.msgHeight + 'px';
    contentLayer.style.background = '#252525';
    contentLayer.style.position = 'fixed';
    contentLayer.style.left = parseInt((this.winW - this.msgWidth) / 2) + 'px';
    contentLayer.style.top = parseInt((this.winH - this.msgHeight) / 2) + 'px';
    contentLayer.style.border = '1px solid #c1c1c1';
    contentLayer.style.borderRadius = '5px';
    contentLayer.style.lineHeight = this.msgHeight + 'px';
    contentLayer.style.textAlign = 'center';
    contentLayer.style.color = '#FFF';
    contentLayer.style.zIndex = 1000;
    contentLayer.innerHTML = o.text;
    document.body.appendChild(maskLayer);
    document.body.appendChild(contentLayer);
    var timeout = this.isUndefind(o.timeout) && this.empty(o.timeout) ? parseInt(o.timeout) * 1000 : 3000;
    this.setTimeOut(function() {
        _this.JQ('#confirm-content-layer').remove();
        _this.JQ('#confirm-mask-layer').remove();
    }, timeout);
}


JSTools.prototype.setTimeOut = function(fn, s) {
    setTimeout(fn, s);
}
JSTools.prototype.create = function(o) {
    var el = document.createElement(o.name);
    document.body.appendChild(el);
}

JSTools.prototype.domain = function() {
    return window.location.host || document.domain;
}

JSTools.prototype.isUndefind = function(paras) {
    return paras === void 0 ? true : false;
}

JSTools.prototype.empty = function(paras) {
    return paras == '' ? true : false;
}

JSTools.prototype.getUrlParas = function() {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    return r != null ? unescape(r[2]) : null;
}

/**
 * Save data to borwser laclStore
 * params:
 *    one:
 *        type string     get borwser data              return data;
 *        json object     set data to borwser store     return window;
 *    tow: string         set data to borwser store     return window;
 * author:bluelife
 * date:2017-05-12
 * email:thebulelife@163.com
 */
JSTools.prototype.save_store = function() {
    if (arguments.length == 1) {
        if (typeof arguments[0] == 'object') {
            var i = '';
            for (i in arguments[0]) {
                this.store.setItem(i, arguments[0][i]);
            }
        } else {
            this.store.getItem(arguments[0]);
        }
    } else {
        this.store.setItem(arguments[0], arguments[1]);
    }
}

window.jsts = new JSTools($);
