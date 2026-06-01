import { pool } from '../db.js'


export const get_ini=async (req,res)=>{
    try{
        const [rows]=await pool.query("select nom_prg, nom_prd, nom_act, nom_sub, sum(meta_fisica) as meta from metas_fisicas group by nom_prg, nom_prd, nom_act, nom_sub order by nom_prg, nom_prd, nom_act, nom_sub");
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const get_prog=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_prg), nom_prg from ktx");
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const get_prod=async (req,res)=>{
    try{
        const [rows]=await pool.query('select distinct(cod_prd), nom_prd from ktx where cod_prg = ?',[req.params.prg]);
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

