<template>
  <div>
    <h1>我是shopping</h1>
  </div>
</template>
<script>
import $axios from "../plugin/axios";
// import $route from '../router';
export default 
{
    created() 
    {
        let { token } = this.$store.state;
        if (token) 
        {
            $axios.get(`/shoplist?token=${token}`).then(({ data }) => 
            {
                this.list = data;
            });
        }
        else 
        {
            this.$router.push("/login");
        }
    },
    watch: 
    {
        $route: function(to) 
        {
            if (to.meta.cart == "/shoplist") 
            {
                let { token } = this.$store.state;
                if (token) 
                {
                    $axios.get(`/shoplist?token=${token}`).then(({ data }) => 
                    {
                        this.list = data;
                    });
                } 
                else 
                {
                    this.$router.push("/login");
                }
            }
        }
    }
}

</script>
<style scoped>
</style>

