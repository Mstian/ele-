import home from '@/components/home/home'
import search from "@/components/search"
import order from "@/components/order/order"
import my from "@/components/my/my"
export default[
    {
        path:"/home",
        name:"home",
        component:home,
        alias:"/",
        meta:{
          isHave:true,
        }
     },
     {
       path:"/search",
       name:"search",
       component:search,
       meta:{
         isHave:true,
       }
     },
     {
       path:"/order",
       name:"order",
       component:order,
       meta:{
         isHave:true,
       }
     },
     {
       path:"/my",
       name:"my",
       component:my,
       meta:{
         isHave:true,
       }
     },
]