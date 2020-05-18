<template>
<!-- 老师代码 -->
  <div>
    <div class="list_nav">
      <ul>
        <li
          v-for="(item,index) in floor_list"
          :key="index"
          @click="tabHandle(index)"
          :class="{active:index===num}"
        >{{item.type}}</li>
      </ul>
    </div>
    <div v-for="(item,index) in floor_list" :key="index" class="list_view clearfix" ref="floor">
      <h2>{{item.type}}</h2>
      <ul class="clearfix">
        <li v-for="el in item.list" :key="el.Id">
          <router-link :to="{name:'detail',query:{goodID:el.Id}}">
            <img v-lazy="el.img_list_url" alt />
            <h4>{{el.title}}</h4>
            <p>
              <span>￥{{el.price}}</span>
              <span v-html="el.mack"></span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $axios from "../plugin/axios";
import scroll from "../plugin/scroll";
export default {
  data() {
    return {
      list: [],
      heightList: [],
      num: 0, // 表示当前选中的tab
      x: "", // 表示当前滚动到元素
      flag: true // 用来做滚动联动开始的开关
    };
  },
  beforeRouteEnter(to, from, next) {
    $axios.get(`/goodList?type_one=${to.query.type_one}`).then(({ data }) => {
      next(vm => {
        vm.list = data;
      });
    });
  },
  beforeRouteUpdate: async function(to, from, next) {
    let res = await $axios.get(`/goodList?type_one=${to.query.type_one}`);
    this.$nextTick(() => {
      this.list = res.data;
    });
    next();
  },
  computed: {
    floor_list: function() {
      let floor_list = [];
      this.list.forEach((item, index) => {
        var flag = true;
        floor_list.forEach(element => {
          if (element.type == item.type_two) {
            element.list.push(item);
            flag = false;
          }
        });
        if (flag) {
          floor_list.push({
            type: item.type_two,
            list: [item]
          });
        }
      });
      return floor_list;
    }
  },
  created(){
    this.scroll()
  },
  mounted() {
    window.addEventListener(
      "scroll",
      function() {
        //  this.scroll()
        this.flag ? this.scroll() : null;
      }.bind(this)
    );
  },
  methods: {
    
    tabHandle(index) {
      this.num = index;
      var el = this.$refs.floor[index];
      console.log(el.offsetTop);

      var start = document.body.scrollTop || document.documentElement.scrollTop;

      this.flag = false;
      // 指定元素滚动到某一个位置
      this.$scrollTo(
        el.offsetTop - 80,
        function() {
          this.flag = true;
        }.bind(this)
      );
    },
    scroll() {
      var H =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      //  獲取滾動高度
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      var content = this.$refs.floor;
      // 遍历每一个列表
      for (var i = 0; i < content.length; i++) {
        //获取 元素偏移量
        var ot = content[i].offsetTop;
        //  获取元素高度
        var h = parseFloat(getComputedStyle(content[i], null).height);
        // 当元素滚动到视图敞口 一般的高度时候
        if (st >= ot - H / 2 && st + H / 2 < ot + h && i != this.x) {
          // 实现滚动联动
          this.x = i;
          // 让tab 想与滚动元素保持一直
          this.num = this.x;
          break;
        }
      }
    }
  }
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background-color: #fff;
  background-image: none;
}
.list_nav ul {
  position: fixed;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  left: 10px;
  width: 100px;
  background: #fff;
  padding: 10px;
  border: 1px solid #773f77;
  border-radius: 5px;
}
.list_nav li {
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.list_nav li .active {
  color: purple;
  font-weight: bolder;
  -webkit-filter: drop-shadow(0 0 10px purple);
  filter: drop-shadow(0 0 10px purple);
}
.list_view h2 {
  text-align: center;
}
.list_view ul {
  width: 1200px;
  margin: 0 auto;
}
.list_view li {
  width: 220px;
  padding: 5px;
  margin: 5px 10px;
  overflow: hidden;
  background-color: #ffffff;
  float: left;
}
.list_view li:hover {
  transform: translateY(-5px);
  box-shadow: 2px 0 8px #666;
}
.list_view li img {
  width: 100%;
}
.list_view li:hover img {
  transform: scale(1.2, 1.25);
}
.list_view li h4 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  text-align: center;
}
.list_view li p {
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
}
.active {
  background-color: purple;
  color: #ffffff;
}
</style>