import { pool } from '../db.js'


export const get_ini=async (req,res)=>{
    try{
        const [rows]=await pool.query("select nom_prg, nom_prd, nom_act, nom_sub, unidad, format(sum(meta_fisica),0) as meta from metas_fisicas group by nom_prg, nom_prd, nom_act, nom_sub, unidad order by nom_prg, nom_prd, nom_act, nom_sub");
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const programas=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_prg), nom_prg from metas_fisicas");
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}


export const por_programa=async (req,res)=>{
    try{
        const [rows]=await pool.query("select nom_prd, nom_act, nom_sub, unidad, format(sum(meta_fisica),0) as meta from metas_fisicas where cod_prg=? group by nom_prg, nom_prd, nom_act, nom_sub, unidad order by nom_prd, nom_act, nom_sub",[req.params.prg]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const productos=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_prd) as cod_prd, nom_prd from metas_fisicas where cod_prg=?",[req.params.prg]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const por_producto=async (req,res)=>{
    try{
        const [rows]=await pool.query("select nom_act, nom_sub, unidad, format(sum(meta_fisica),0) as meta from metas_fisicas where cod_prg=? and cod_prd=? group by nom_prg, nom_prd, nom_act, nom_sub, unidad order by nom_prd, nom_act, nom_sub", [req.params.prg, req.params.prd])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const por_programa_micro=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mf.nom_prd, mf.nom_act, mf.nom_sub, mr.nom_micro, mf.unidad, format(sum(mf.meta_fisica),0) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro = mr.cod_micro and mf.cod_prg=? group by mf.nom_prd, mf.nom_act, mf.nom_sub, mr.nom_micro, mf.unidad order by mf.nom_prd, mf.nom_act, mf.nom_sub, meta desc", [req.params.prg])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}


export const get_prod=async (req,res)=>{
    try{
        const [rows]=await pool.query('select distinct(cod_prd), nom_prd from ktx where cod_prg = ?',[req.params.prg, req.params.prd]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const get_activ=async (req,res)=>{
    try{
        const [rows]=await pool.query('select distinct(cod_act), nom_act from ktx where cod_prg = ? and cod_prd=?',[req.params.prg, req.params.prd]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const kit_programa=async (req,res)=>{
    try{
        const [rows]=await pool.query("select if(nivel='FAMILIA',concat(grupo, clase, familia), concat(grupo, clase, familia, item)) as codigo, nom_item, nivel, tipo, unidad, clasificador, concat(cod_prd,' ',nom_prd) as producto, concat(cod_sub, ' ', nom_sub) as sub_producto from ktx where cod_prg=?",[req.params.prg]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

