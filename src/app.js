import express from 'express';
import cors from 'cors';
import rutas_mf from './rutas/rutas_mf.js';

const app=express();

app.use(cors());
app.use('/api',rutas_mf);

app.use((req,res,next)=>{
    res.status(404).json({
        mensaje:'ruta no existe en este servidor'
    })
})

export default app;