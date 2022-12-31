const homeHandleRouter=require('./handle/HomeHandleRouter')

const router = {
    'home': homeHandleRouter.showHome,
    'create':homeHandleRouter.createStudent,
    'delete': homeHandleRouter.deleteStudent,
    'edit': homeHandleRouter.editStudent
}
module.exports= router;
