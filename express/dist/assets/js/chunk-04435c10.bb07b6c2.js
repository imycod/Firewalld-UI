(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04435c10"],{"20a3":function(e,t,a){"use strict";a.r(t);var c,r,n=a("0e92"),o=a("8f61"),s=a("2178"),i=a("365c"),l=a("6912"),u=a("74bf"),p={name:"register-dialog",props:{visible:{type:Boolean,default:!1}},render:function(){var e=this,t=arguments[0];return t("el-dialog",{class:"login-register-dialog",attrs:{visible:this.visible,width:"32%","show-close":!1,placement:"bottom",center:!0},on:{close:function(){return e.cancelClick()},open:function(){return e.open()}}},[t("div",{slot:"title"},["注册用户"]),t("el-form",{ref:"loginForm",attrs:{"label-position":"top"}},[t("el-form-item",{attrs:{prop:"username"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"用户名"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)}}},[t("i",{slot:"prepend",class:"el-icon-s-custom"})])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{clearable:!0,"show-password":!0,disabled:this.loading,type:"password",placeholder:"密码"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)}}},[t("i",{slot:"prepend",class:"el-icon-lock"})])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{clearable:!0,disabled:this.loading,type:"text",placeholder:"自定义口令,用于修改密码"},model:{value:e.form.secret,callback:function(t){e.$set(e.form,"secret",t)}}},[t("i",{slot:"prepend",class:"el-icon-chat-line-square"}),t("el-button",{slot:"append",on:{click:function(){return e.generateClick()}}},["生成"])])]),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{placeholder:"不区分大小写",clearable:!0},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)}}},[t("div",{slot:"append"},[t("global-captcha",{attrs:{uuid:this.uuid},on:{captcha:function(t){return e.captcha=t}}})])])])]),t("div",{slot:"footer",class:"dialog-footer"},[t("el-button",{on:{click:function(){return e.cancelClick()}}},["取 消"]),t("el-button",{attrs:{type:"primary"},on:{click:function(){return e.confirmClick()}}},["确 定"])])])},data:function(){return{form:{username:"",password:"",secret:"",code:"",secretCode:""},uuid:u(),captcha:{svg:"",publicKey:"",captchaSecret:""},loading:!1,autofocus:!1,fingerprint:"设备指纹: ".concat(sessionStorage.getItem("fingerprint"))}},methods:{open:function(){this.getCaptcha()},getCaptcha:function(){var e=this;return Object(s["a"])(Object(n["a"])().mark((function t(){var a,c;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["y"])();case 2:a=t.sent,c=a.data,e.captcha=Object(o["a"])(Object(o["a"])({},c),{},{svg:Object(l["g"])(c.svg)});case 5:case"end":return t.stop()}}),t)})))()},cancelClick:function(){this.$emit("cancel")},confirmClick:function(){var e=this;return Object(s["a"])(Object(n["a"])().mark((function t(){var a,c,r;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,e.form=Object(o["a"])(Object(o["a"])({},e.form),{},{captchaSecret:e.captcha.captchaSecret}),t.next=4,Object(i["A"])(e.form);case 4:if(a=t.sent,c=a.success,r=a.message,e.$message({showClose:!0,message:c?"注册成功":r,type:c?"success":"error"}),c||(e.uuid=u()),e.loading=!1,0!=c){t.next=12;break}return t.abrupt("return");case 12:e.form={username:"",password:"",secret:"",code:""},e.$emit("confirm");case 14:case"end":return t.stop()}}),t)})))()},generateClick:function(){this.form.secret=u(20)},usernameClick:function(){alert(1)}}},d=p,f=(a("a86e"),a("3427")),m=Object(f["a"])(d,c,r,!1,null,"e78c92ea",null);t["default"]=m.exports},a86e:function(e,t,a){"use strict";a("fc99")},fc99:function(e,t,a){}}]);