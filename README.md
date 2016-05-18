# deepValidator
Deep-Validator表单验证插件

use

        var vform = document.getElementById('vform');
        var vsubmit = vform.getElementsByTagName('button')[0];

        deepValidator({
            vform : vform, // *必填 需要验证的表单
            vsubmit : vsubmit // *必填 提交的按钮
        });