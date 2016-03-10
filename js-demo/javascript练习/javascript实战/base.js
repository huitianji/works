/*函数方式*/
//function $(id){
//    return document.getElementById(id);
//}
/*对象方式*/
//    Base = {
//        getId:function(id){return document.getElementById(id);},
//        getName: function(name) {return document.getElementsByName(name);}
//    }
//调用
//Base.gitId("id").innerHTML;
//创建一个数组，来保持获取的节点或节点数组
//前台调用
var $ = function(_this){
    return new Base(_this);
}
//类库
function Base(_this){
    //创建一个数组来保持节点和节点数组
    this.elements = [];
    if(_this != undefined){//_this是一个对象 undefined 也是一个对象 区别与typeof返回的带引号的“undefined”
        this.elements[0] = _this;
    }
}

//获取元素
Base.prototype.getId = function(id){
    this.elements.push(document.getElementById(id));
    return this;
};
//获取元素节点
Base.prototype.getName = function (tag) {
    var tags = document.getElementsByTagName(tag);
    for(var i= 0,length = tags.length;i< length;i++){
        this.elements.push(tags[i]);
    }
    return this;
}
//获取class节点数组
Base.prototype.getClass = function (className,idName){
    var node = null;
    if(arguments.length == 2){
        node = document.getElementById(idName);
    }else{
        node = document;
    }
    var all = node.getElementsByTagName("*");
    for(var i= 0,length = all.length;i<length;i++){
        if(all[i].className == className){
            this.elements.push(all[i]);
        }
    }
    return this;
}
//获取某一个节点
Base.prototype.getElement = function (num) {
    var element = this.elements[num];
    this.elements = [];
    this.elements[0] = element;
    return this;
}
//设置css
Base.prototype.css = function (attr,value){
    for(var i= 0,length = this.elements.length;i< length; i++){
        if(arguments.length == 1){
            //return this.elements[i].style[attr];
            if(typeof window.getComputedStyle != "undefined"){//w3c
                return window.getComputedStyle(this.elements[i],null)[attr];
            }else if( typeof this.elements[i].currentStyle != "undefined"){//ie
                return this.elements[i].currentStyle[attr];
            }
        }
        this.elements[i].style[attr] = value;
    }
    return this;
    //console.log(this.elements[0]);
}
//添加class
Base.prototype.addClass = function (className) {
    for(var i= 0,length = this.elements.length; i<length; i++){
        if(!this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))){
          this.elements[i].className += " " + className;
        }
    }
    return this;
}
//删除类
Base.prototype.removeClass = function (className){
    for(var i= 0,length = this.elements.length; i<length; i++){
        if(this.elements[i].className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))){
            this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)"+className+"(\\s|$)"),"");
        }
    }
    return this;
}
//添加link 或者 style的css规则
Base.prototype.addRule = function(num,selectorTesxt,cssText,position){//num 第几个 position位置
    var sheet = document.styleSheets[num];
    //alert(sheet.addRule);
    if(typeof sheet.insertRule != "undefined"){
        sheet.insertRule(selectorTesxt+"{"+cssText+"}",position);
    }else if(typeof sheet.addRule != "undefined"){
        sheet.addRule(selectorTesxt,cssText,position);
    }
    return this;
}
//移除link 或者 style的css规则
Base.prototype.removeRule = function(num,index) {
    var sheet = document.styleSheets[num];
    if(typeof sheet.deleteRule != "undefined"){//w3c
        sheet.deleteRule(index);
    }else if(typeof sheet.removeRule != "undefined"){
        sheet.removeRule(index);
    }
    return this;
}
//设置鼠标移入移出方法
Base.prototype.hover = function (over,out) {
    for(var i= 0,length = this.elements.length;i<length; i++){
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}
//设置显示
Base.prototype.show = function() {
    for(var i= 0,length = this.elements.length;i<length; i++){
        this.elements[i].style.display = "block";
    }
    return this;
}
//设置隐藏
Base.prototype.hidden = function() {
    for(var i= 0,length = this.elements.length;i<length; i++){
        this.elements[i].style.display = "none";
    }
    return this;
}
//设置html
Base.prototype.html = function (str){
    for(var i= 0,length = this.elements.length;i< length; i++){
        if(arguments.length == 0){
            return this.elements[i].innerHTML;
        }
        this.elements[i].innerHTML = str;
    }
    return this;
}
//设置物体居中
Base.prototype.center = function(width,height) {
    var left = (document.body.clientWidth - 250)/2;
    var top = (document.documentElement.clientHeight -250)/2 ;
    for(var i= 0,length = this.elements.length;i<length; i++){
        this.elements[i].style.top = top + "px";
        this.elements[i].style.left = left + "px";
    }
    return this;
}
//触发函数
Base.prototype.click = function (fn) {
    for(var i= 0,length = this.elements.length;i<length; i++){
        this.elements[i].onclick = fn;
    }
    return this;
}
//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
    window.onresize = fn;
    return this;
}