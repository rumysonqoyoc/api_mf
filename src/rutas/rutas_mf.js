import {Router} from 'express';
import {eess_micro, get_ini, graf_producto_eess, graf_producto_micro, graf_sub_producto_eess, graf_sub_producto_micro, micro_redes, por_micro_eess, por_micro_programa, por_producto, por_producto_micro, por_programa, por_programa_micro, productos, programas, sub_productos} from '../controlador/ctrl_mf.js';
const router=Router();

router.get('/inicio',get_ini);
router.get('/programas',programas);
router.get('/por_programa/:prg',por_programa);
router.get('/productos/:prg',productos);
router.get('/sub_productos/:prg/:prd',sub_productos);
router.get('/por_producto/:prg/:prd',por_producto);
router.get('/por_programa_micro/:prg',por_programa_micro);
router.get('/por_producto_micro/:prg/:prd',por_producto_micro);
router.get('/por_micro_programa/:mic/:prg',por_micro_programa);
router.get('/micro_redes',micro_redes);
router.get('/eess_micro/:mic',eess_micro);
router.get('/por_micro_eess/:mic/:est',por_micro_eess);
router.get('/graf_producto_micro/:prg/:prd',graf_producto_micro);
router.get('/graf_sub_producto_micro/:prg/:prd/:sub',graf_sub_producto_micro);
router.get('/graf_producto_eess/:prg/:prd/:mic',graf_producto_eess);
router.get('/graf_sub_producto_eess/:prg/:prd/:sub/:mic',graf_sub_producto_eess);
router.get('/',(req,res)=>{
    res.send('pagina de inicio');
});
export default router;