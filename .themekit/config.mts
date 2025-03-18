import { defineConfig } from 'themekit-js'

import RemoteAssets from 'vite-plugin-remote-assets'
const siteBase="/2x/"
export default defineConfig({ 
  vite:{ 
     plugins:[ 
       RemoteAssets({ assetsDir:".themekit/dist/assets" })
     ]
  }, 
  title: " ",  
  base:siteBase,
  themeName: "default theme + customization",
  description: "A VitePress Site", 
  themeConfig: { 
    logo:  '/2x.svg',  
    nav: [
        { text: '首页', link: '/' },
        { text: '项目',   link: '/' },
        { text: '开发人员', link: '/' },  
        { text: '@转', link: '/' }
    ],  
    footer: {
      message: 'aa',
      copyright: 'Copyright © 2019-2024 Seedunk'
    }
  }
})

 