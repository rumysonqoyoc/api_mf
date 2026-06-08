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

export const sub_productos=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_sub) as cod_sub, nom_sub from metas_fisicas where cod_prg=? and cod_prd=?",[req.params.prg, req.params.prd]);
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

export const por_producto_micro=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mf.nom_prd, mf.nom_act, mf.nom_sub, mr.nom_micro, mf.unidad, format(sum(mf.meta_fisica),0) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro = mr.cod_micro and mf.cod_prg=? and cod_prd=? group by mf.nom_prd, mf.nom_act, mf.nom_sub, mr.nom_micro, mf.unidad order by mf.nom_prd, mf.nom_act, mf.nom_sub, meta desc", [req.params.prg, req.params.prd])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const por_micro_programa=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mf.nom_prd, mf.nom_act, mf.nom_sub, est.nom_eess, mf.unidad, format(sum(mf.meta_fisica),0) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro = mr.cod_micro and mr.cod_micro=? and mf.cod_prg=? group by mf.nom_prd, mf.nom_act, mf.nom_sub, est.nom_eess, mf.unidad order by mf.nom_prd, mf.nom_act, mf.nom_sub, meta desc", [req.params.mic, req.params.prg])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const por_micro_eess=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mf.nom_prg, mf.nom_prd, mf.nom_act, mf.nom_sub, mf.unidad, format(sum(mf.meta_fisica),0) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro = mr.cod_micro and mr.cod_micro=? and est.cod_eess=? group by mf.nom_prg, mf.nom_prd, mf.nom_act, mf.nom_sub, est.nom_eess, mf.unidad order by mf.nom_prg, mf.nom_prd, mf.nom_act, mf.nom_sub, meta desc", [req.params.mic, req.params.est])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const micro_redes=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_micro), nom_micro from micro_red");
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const eess_micro=async (req,res)=>{
    try{
        const [rows]=await pool.query("select distinct(cod_eess), nom_eess from eess where cod_micro=?",[req.params.mic]);
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const graf_producto_micro=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mr.nom_micro, sum(mf.meta_fisica) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro=mr.cod_micro and mf.cod_prg=? and mf.cod_prd=? group by mr.nom_micro, mf.nom_prd order by sum(mf.meta_fisica) desc ", [req.params.prg, req.params.prd])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const graf_sub_producto_micro=async (req,res)=>{
    try{
        const [rows]=await pool.query("select mr.nom_micro, sum(mf.meta_fisica) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro=mr.cod_micro and mf.cod_prg=? and mf.cod_prd=? and mf.cod_sub=? group by mr.nom_micro, mf.nom_prd order by sum(mf.meta_fisica) desc ", [req.params.prg, req.params.prd, req.params.sub])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}


export const graf_producto_eess=async (req,res)=>{
    try{
        const [rows]=await pool.query("select est.nom_eess, sum(mf.meta_fisica) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro=mr.cod_micro and mf.cod_prg=? and mf.cod_prd=? and mr.cod_micro=? group by est.nom_eess order by sum(mf.meta_fisica) desc", [req.params.prg, req.params.prd, req.params.mic])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}

export const graf_sub_producto_eess=async (req,res)=>{
    try{
        const [rows]=await pool.query("select est.nom_eess, sum(mf.meta_fisica) as meta from metas_fisicas mf, micro_red mr, eess est where mf.cod_eess=est.cod_eess and est.cod_micro=mr.cod_micro and mf.cod_prg=? and mf.cod_prd=? and mf.cod_sub=? and mr.cod_micro=? group by est.nom_eess order by sum(mf.meta_fisica) desc", [req.params.prg, req.params.prd, req.params.sub, req.params.mic])
        res.json(rows);
    }catch(error){
        return res.status(500).json({mensaje:'ocurrio un error'});
    }
}
