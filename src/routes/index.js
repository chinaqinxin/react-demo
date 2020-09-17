import {
    Dashboard,Login,NotFound,ActicleList,ActicleEdit,Settings,Notifications,NoAuth,Profie
    // ,Test
} from '../views'

export const mainRouters = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

export const adminRouters = [{
    pathname:'/admin/dashboard',
    component:Dashboard,
    title:'仪表盘',
    icon:'dashboard',
    isNav:true,
    roles:['001','002','003']
},{
    pathname:'/admin/article',
    component:ActicleList,
    exact:true,
    title:'文章管理',
    icon:'unordered-list',
    isNav:true,
    roles:['001','002']
},{
    pathname:'/admin/article/edit/:id',
    component:ActicleEdit,
    roles:['001','002']
},{
    pathname:'/admin/notifications',
    component:Notifications,
    roles:['001','002','003']
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    icon:'setting',
    isNav:true,
    roles:['001']
},{
    pathname:'/admin/noauth',
    component:NoAuth,
    roles:['001','002','003']
},{
    pathname:'/admin/profie',
    component:Profie,
    roles:['001','002','003']
}]