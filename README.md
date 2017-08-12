# jquery.fixedNav
一款超轻量级的 jQuery 插件。它可以让原本不在顶部的导航条，在滚动到它的位置时固定在顶部，并且监听滚动，点击导航项滚动到指定位置。 

## 依赖

本插件依赖 jQuery，开发插件使用的 jQuery 版本为 1.11.3。

使用本插件时，需要先引入 jQuery 。

## Options

选项 | 描述
------------ | -------------
sectionSelector | section选择器（必选）
navItemSelector | 导航项选择器（必选）
speed           | 滚动时间
easing          | 滚动动画曲线
activeClass     |  导航项active class

## 使用方法
1. 在引入 jQuery 后，引入 jquery.fixedNav.js 。 
2. 然后在 `$(function(){})` 里使用 `$(selector).navFixed()` 即可。

## Example
```
$('#nav').fixedNav({
  sectionSelector: '.section',
  navItemSelector: '.nav-list a'
});
```
