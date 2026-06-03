import {Router} from 'express';
import {get_ini, micro_redes, por_micro_programa, por_producto, por_producto_micro, por_programa, por_programa_micro, productos, programas} from '../controlador/ctrl_mf.js';
const router=Router();

router.get('/inicio',get_ini);
router.get('/programas',programas);
router.get('/por_programa/:prg',por_programa);
router.get('/productos/:prg',productos);
router.get('/por_producto/:prg/:prd',por_producto);
router.get('/por_programa_micro/:prg',por_programa_micro);
router.get('/por_producto_micro/:prg/:prd',por_producto_micro);
router.get('/por_micro_programa/:mic/:prg',por_micro_programa);
router.get('/micro_redes',micro_redes);

router.get('/',(req,res)=>{
    res.send('pagina de inicio');
});
export default router;