import {Router} from 'express';
import {get_ini, get_prod, kit_programa, programas} from '../controlador/ctrl_mf.js';
const router=Router();

router.get('/inicio',get_ini);
router.get('/programas',programas);
router.get('/productos/:prg',get_prod);
router.get('/actividades/:prg/:prd',get_prod);
router.get('/kit_programa/:prg',kit_programa);

router.get('/',(req,res)=>{
    res.send('pagina de inicio');
});
export default router;