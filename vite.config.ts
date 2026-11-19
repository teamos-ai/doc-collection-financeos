import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({command,mode})=>({
  plugins:[react()],
  define:command==='build'?{'process.env.NODE_ENV':JSON.stringify('production')}:{},
  // The website uses index.html. Library mode is only for the portable export.
  build:mode==='portable'?{
    outDir:'dist-portable',
    lib:{entry:'src/main.tsx',name:'DocumentCollectionBlueprint',formats:['iife'],fileName:()=> 'blueprint.js'},
    cssCodeSplit:false,
    assetsInlineLimit:1000000,
  }:{},
}));
