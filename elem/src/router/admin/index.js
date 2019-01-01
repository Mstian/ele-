import addAdmin from '@/components/admin/addAdmin'
import adminLog from '@/components/admin/adminLog'
import checkAdmin from '@/components/admin/checkAdmin'
export default[
    {
      path: '/',
      name: 'adminLog',
      component: adminLog
    },
    {
      path:'/addAdmin',
      name:'addAdmin',
      component:addAdmin
    },
    {
      path:'/checkAdmin',
      name:'checkAdmin',
      component:checkAdmin
    }
]