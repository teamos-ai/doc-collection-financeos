import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({command})=>({plugins:[react()],define:command==='build'?{"process.env.NODE_ENV":JSON.stringify("production")}:{},build:{lib:{entry:'src/main.tsx',name:'DocumentCollectionBlueprint',formats:['iife'],fileName:()=> 'blueprint.js'},cssCodeSplit:false,assetsInlineLimit:1000000}}));
