export default {
    inserted:function(el,binding)
    {
        el.src = "../../static/images/timg.gif";
        fn();
        window.addEventListener('scroll',fn)
        function fn(){
            var h = window.innerHeight
            var st = document.documentElement.scrollTop || document.body.scrollTop
            var ot = el.offsetTop 
            if(ot<h+st-100)
            {
                el.src = binding.value
                window.removeEventListener(scroll,fn)
            }
        }
    }
}