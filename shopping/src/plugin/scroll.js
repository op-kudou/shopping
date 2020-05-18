export default {
    install(Vue){
        // end=0 设置end 默认值
        Vue.prototype.$scrollTo=function(end=0,cb){
            var start = document.body.scrollTop || document.documentElement.scrollTop;
            // var s = start - end;
            // var step = (s / 100) * 16.7;
            var timer = setInterval(() => {
                // start -= step;
                // document.documentElement.scrollTop = start;
                // document.documentElement.scrollTop =start;
                // if((s>0&&start>=end)||(s<0&&start<=end)){
                //     clearInterval(timer);
                //     cb?cb():null;
                // }
              document.documentElement.scrollTop =
                parseInt(document.documentElement.scrollTop) - 100;
              if (document.documentElement.scrollTop <= 0) {
                document.documentElement.scrollTop = 0;
                clearInterval(timer);
                cb?cb():null;
              }
            }, 16.7);
        }
    }
}
