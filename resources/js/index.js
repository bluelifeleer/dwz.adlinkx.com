$(function() {
    'use strict';
    jsts.confirm({
        'title': '请输入邀请码',
        'text': '<input type="text" name="invite-code" id="invite-code" placeholder = "请输入邀请码" style="display:block;width:498px;height:40px;line-height:40px;border:1px solid #c1c1c1;padding-left:10px;margin:30px 0 30px 8px;" />',
        'confirm': function() {
            var inviteCode = $('#invite-code').val();
            if (jsts.empty(inviteCode)) {
                jsts.alert({
                    'title': '提示信息',
                    'text': '请输入邀请码!',
                    'confirm': function() {
                        return false;
                    }
                });
            } else {
                $.ajax({
                    url: encodeURI('/inviteCode/verification'),
                    type: 'POST',
                    sync: false,
                    data: { inviteCode: inviteCode },
                    success: function(res) {
                        if (res.code == 1) {
                            jsts.alert({
                                'title': '提示信息',
                                'text': res.msg,
                                'confirm': function() {
                                    return false;
                                }
                            });
                        }
                        // console.log(res);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            }
        },
        'cancel': function() {
            jsts.alert({
                'title': '提示信息',
                'text': '请输入邀请码，否则可能导致您生成的短链没有监测数据！',
                'confirm': function() {
                    return false;
                }
            });
        }
    });

    $('#select-generate-qr-but').on('click', function() {
        if ($(this).attr('data-selected') == 'true') {
            $(this).attr('data-selected', false);
            $(this).css('background', 'url("/resources/images/checkbox_icon_bg.png") no-repeat 2px 12px')
        } else {
            $(this).attr('data-selected', true);
            $(this).css('background', 'url("/resources/images/checkbox_checked_icon_bg.png") no-repeat 2px 12px')
        }
    });

    $('#generate-short-link-but').on('click', function() {
        var isQR = $('#select-generate-qr-but').attr('data-selected') == 'true' ? 1 : 0;
        var link = $('#log-link-input').val();
        var selftIdentifier = $('#short-identifier').val();
        if (jsts.empty(link)) {
            jsts.alert({
                'title': '提示信息',
                'text': '请输入要转换的连接！',
                'confirm': function() {
                    return false;
                }
            });
        } else {
            $.ajax({
                url: encodeURI('/short/generate'),
                type: 'POST',
                saync: false,
                data: { 'link': link, 'identifier': selftIdentifier, 'isQR': isQR },
                success: function(res) {
                    if (res.code == 0) {
                        $('#short-link-block').html(res.data.short_url);
                        if (res.data && res.data != '') { $('#QR-img').attr('src', res.data.QR_code_url); }
                        jsts.alert({
                            'title': '提示信息',
                            'text': '生成短链成功！',
                        });

                        var clipboard = new Clipboard('#copy-short-but', {
                            target: function() {
                                return document.querySelector('#short-link-block');
                            }
                        });

                        clipboard.on('success', function(e) {
                            // console.log(e);
                            jsts.msg({
                                'text': '复制成功',
                                'timeout': 3,
                            });
                        });

                        clipboard.on('error', function(e) {
                            // console.log(e);
                            jsts.alert({
                                'title': '提示信息',
                                'text': '您的浏览器不支持自动复制，请使用CTRL+C进行复制'
                            });
                        });

                    } else {
                        jsts.alert({
                            'title': '提示信息',
                            'text': '生成短链失败！',
                            'confirm': function() {
                                alert(res);
                            }
                        });
                    }
                },
                error: function(err) {
                    console.log(err);
                }
            });
        }

    });
});
