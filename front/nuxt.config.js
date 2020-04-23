export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: '~/plugins/api-service.plugin' }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    /**
     * baseURL is used in SSR mode and will be overridden if API_URL environment variable if present
     */
    baseURL: 'http://localhost:3001/',
    /**
     * browserBaseURL is used in client browser and will be proxified if API_URL environment variable is present (see proxy configuration below)
     */
    browserBaseURL: '/',
  },
  proxy: {
    /**
     * Configure proxy to dynamically route /api/** requests to API_URL if present
     */
    '/api': { target: process.env.API_URL || 'http://localhost:3001' },
  },
  server: {
    port: process.env.PORT || 3000, // default: 3000
    host: process.env.HOST || 'localhost', // default: localhost
  },
  ignore: ['**/*.spec.*'],
  build: {
    loaders: {
      scss: { sourceMap: false },
    },
  },
};
