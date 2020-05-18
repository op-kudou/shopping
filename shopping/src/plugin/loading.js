// import './loading.css'

export default {
    // 当vue.use() 就会执行install这个函数
    install(Vue){
        var node  = document.createElement('div');
        node.id = 'vue_Loading_plugin'
        document.body.appendChild(node);
        // 加载的图片
        // node.style.background = "url("+Img+")  center center no-repeat rgb(230,230,230)"
        node.style.background = "url('../../static/images/car.gif')  center center no-repeat rgb(230,230,230)"
        node.style.position = 'fixed';
        node.style.height = '100%';
        node.style.top = '0';
        node.style.bottom = '0';
        node.style.left = '0';
        node.style.width = '100%';
        node.style.transition = 'all 1s';
        node.style.opacity = '0';

        Vue.prototype.$showLoading = function(){
            node.style.display = 'block';
            node.style.opacity = '0.9'
        }

        Vue.prototype.$hideLoading = function (){
            node.style.opacity = '0'
        }

        // 为了实现过度效果；监听过度时间
        node.addEventListener('transitionend',function(){
            // 过度动画执行完毕执行
            // 获取过度元素
            var o = getComputedStyle(this,null).opacity;
            if(o=='0'){
                node.style.display = 'none';
            }
        })
    }
}
/**
 * 
 *     background: url('./') center center no-repeat rgb(230, 230, 230);

 *     position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: all 1s;
    display: none;
    opacity: 0;
}
 */
