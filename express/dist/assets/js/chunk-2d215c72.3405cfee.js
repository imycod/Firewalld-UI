(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d215c72"],{c03b:function(i,r,t){"use strict";t.r(r),r["default"]=function(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return{data:function(){return{displayPriority:0}},created:function(){this.runDisplayPriority()},methods:{runDisplayPriority:function(){var r=this;console.log(this.displayPriority);var t=function t(){requestAnimationFrame((function(){r.displayPriority++,r.displayPriority<i&&t()}))};t()},clearDefer:function(){this.displayPriority=0,this.runDisplayPriority()},defer:function(i){return this.displayPriority>=i}}}}}}]);