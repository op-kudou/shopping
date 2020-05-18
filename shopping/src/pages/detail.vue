<template>
  <div>
    <tab :imgs="imgs" :title="title" :price="price" :supplier="supplier"></tab>
    <!-- <h1>{{$route.params.id}}</h1> -->
  </div>
</template>
<script>
import $axios from "@/plugin/axios";
import tab from "@/components/tab";

export default {
  components: {
    tab
  },
  beforeRouteEnter(to, from, next) {
    var detail = $axios.get("/detail?goodId=" + to.query.Id);
    var p = Promise.all([detail]);
    (async () => {
      var res = await p;
      next(vm => {
        vm.detail = res[0].data[0]; //vm指向vue实例
        vm.imgs = JSON.parse(res[0].data[0].imgs); //vm指向vue实例
        vm.title = res[0].data[0].title; //vm指向vue实例
        vm.price = res[0].data[0].price; //vm指向vue实例
        vm.supplier = res[0].data[0].supplier; //vm指向vue实例
        vm.$hideLoading();
      });
    })();
  },
  data() {
    return {
      imgs: "",
      title: "",
      price: "",
      supplier: ""
    };
  },
  // move:function(e)
  // {
  //   var view = document.getElementsByClassName('img_box')[0];
  //   this.left = e.pageX-view.offsetLeft - 133;
  //   this.top = e.pageY-view.offsetTop - 133;
  //   if(this.left <0)
  //   {
  //     this.left = 0;
  //   }
  //   else if(this.left >133)
  //   {
  //     this.left = 133;
  //   }
  //   if(this.top <0)
  //   {
  //     this.top = 0;
  //   }
  //   else if(this.top)
  // }
};
</script>
