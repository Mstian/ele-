import detail from "@/components/home/shopDetail"
import food from "@/components/home/detail/food"
import comment from "@/components/home/detail/comment"
import seller from "@/components/home/detail/seller"
export default [
    {
      path:"/detail/:id",
      name:"detail",
      component:detail,
      meta:{
        isHave:false,
      },
      children:[
        {
           path:"/",
           component:food,
        },
        {
          path:"/comment",
          component:comment
        },
        {
          path:"/seller",
          component:seller
        }
      ]
    },
]