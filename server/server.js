import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import path from 'path';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// React And Redux Setup
import { configureStore } from '../client/store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import { fetchComponentData } from './util/fetchData';
import serverConfig from './config';

// Set native promises as mongoose promise


// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '../public')));
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  // Import Manifests
  const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
       </head>
      <body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white page-sidebar-closed">
      <div id="loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFF; z-index: 10000;">
      <div style="margin: 0 auto; left: 0; right: 0; margin-top: 20%; width: 80px;">
      <img src="./img/loading.svg" width="50" height="50"/>
      </div>
      </div>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
    `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/dist/vendor.js'] : '/dist/vendor.js'}'></script>
        <script type="text/javascript">
       document.addEventListener('DOMContentLoaded', function() {
  console.log('here');
    document.getElementById('loading').style.display = 'none';
});
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/dist/app.js'] : '/dist/app.js'}'></script>
        <script src="layout/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="layout/assets/global/plugins/moment.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/morris/morris.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/morris/raphael-min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/counterup/jquery.waypoints.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/counterup/jquery.counterup.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/amcharts.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/serial.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/pie.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/radar.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/themes/light.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/themes/patterns.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amcharts/themes/chalk.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/ammap/ammap.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/ammap/maps/js/worldLow.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/amcharts/amstockcharts/amstock.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/horizontal-timeline/horizontal-timeline.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/flot/jquery.flot.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/flot/jquery.flot.resize.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/flot/jquery.flot.categories.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery-easypiechart/jquery.easypiechart.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/jquery.vmap.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.russia.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.world.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.europe.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.germany.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/maps/jquery.vmap.usa.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jqvmap/jqvmap/data/jquery.vmap.sampledata.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="layout/assets/global/scripts/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <script src="layout/assets/pages/scripts/dashboard.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="layout/assets/layouts/layout4/scripts/layout.min.js" type="text/javascript"></script>
        <script src="layout/assets/layouts/layout4/scripts/demo.min.js" type="text/javascript"></script>
        <script src="layout/assets/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="./layout/assets/layouts/global/scripts/quick-nav.min.js" type="text/javascript"></script>
        <!-- END THEME LAYOUT SCRIPTS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="layout/assets/global/plugins/bootstrap-toastr/toastr.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/jquery-validation/js/additional-methods.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js" type="text/javascript"></script>
        <script src="layout/assets/global/plugins/bootstrap-daterangepicker/daterangepicker.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
        <script src="layout/assets/global/plugins/select2/js/select2.full.min.js" type="text/javascript"></script>
        <script src="layout/assets/pages/scripts/components-select2.min.js" type="text/javascript"></script>
        <script src="layout/assets/pages/scripts/components-date-time-pickers.min.js" type="text/javascript"></script>
        <link href="layout/css/bootstrap-datetimepicker.min.css" rel="stylesheet"></link>

        <!--End add by Bang-->
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

export default app;
