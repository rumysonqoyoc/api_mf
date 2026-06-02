import {Router} from 'express';
import {get_ini, get_prod, kit_programa, por_producto, por_programa, por_programa_micro, productos, programas} from '../controlador/ctrl_mf.js';
const router=Router();

router.get('/inicio',get_ini);
router.get('/programas',programas);
router.get('/por_programa/:prg',por_programa);
router.get('/productos/:prg',productos);
router.get('/por_producto/:prg/:prd',por_producto);
router.get('/por_programa_micro/:prg',por_programa_micro);

router.get('/actividades/:prg/:prd',get_prod);
router.get('/kit_programa/:prg',kit_programa);

router.get('/',(req,res)=>{
    res.send('pagina de inicio');
});
export default router;