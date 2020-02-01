/*jshint esversion: 8 */
require("dotenv").config();

(function() {
  "use strict";

  const PUBLIC_HOST = process.env.PUBLIC_HOST;
  const PUBLIC_PORT = process.env.PUBLIC_PORT;
  const LOCAL_HOST = process.env.LOCAL_HOST;
  const LOCAL_PORT = process.env.LOCAL_PORT;

  const Hapi = require("@hapi/hapi");
  const Pack = require("./package");
  const Routes = require("./routes");
  const CatboxMemory = require("@hapi/catbox-memory");
  const hapiAuthJWT = require("hapi-auth-jwt2");

  const AuthenticationHelper = require("./helpers/authenticationHelper");

  (async () => {
    const server = new Hapi.Server({
      host: LOCAL_HOST,
      port: LOCAL_PORT,
      debug: { request: ["error"] },
      cache: [
        {
          name: "tdb_cache",
          provider: {
            constructor: CatboxMemory
          }
        }
      ],
      tls: (process.env.NODE_ENV == "production" || false)
    });

    process.on('SIGINT', function() {
      console.info(' [ SERVER ] Stopping HAPI server');

      server.stop({ timeout: 10000 }).then(function (err) {
        console.info(' [ SERVER ] HAPI server stopped');
        process.exit((err) ? 1 : 0);
      });
    });

    var schemesString = process.env.SWAGGER_HTTP_SCHEMES || "http";
    var schemesArray = schemesString.split(",");

    const swaggerOptions = {
      swagger: "2.0",
      info: {
        title: Pack.name,
        version: Pack.version,
        description: Pack.description
      },
      securityDefinitions: {
        jwt: {
          type: "apiKey",
          name: "Authorization",
          in: "header"
        }
      },
      security: [{ jwt: [] }],
      host: `${PUBLIC_HOST}:${PUBLIC_PORT}`,
      basePath: "/",
      schemes: schemesArray,
      consumes: ["application/json"],
      produces: ["application/json"]
    };

    await server.register([
      require("inert"),
      require("vision"),
      {
        plugin: require("hapi-swagger"),
        options: swaggerOptions
      },
      {
        plugin: require('hapi-cors'),
        options: {
          origins: ['*'],
          allowCredentials: 'true',
          exposeHeaders: ['content-type', 'content-length'],
          maxAge: 600,
          methods: ['POST, GET, PUT, DELETE, OPTIONS'],
          headers: ['Accept', 'Content-Type', 'Authorization']
        }
      }
    ]);

    // Authentication
    await server.register(hapiAuthJWT);

    server.auth.strategy("jwt", "jwt", {
      key: process.env.JWT_SECRET,
      validate: AuthenticationHelper.Validate,
      verifyOptions: {
        ignoreExpiration: false,
        algorithms: [ 'HS256' ]
      }
    });

    server.auth.default("jwt");

    // Start server
    try {
      await server.start();
      console.info(` [ SERVER ] Server running at: ${server.info.uri}`);
      console.info(` [ SERVER ] Server documentation running at: ${server.info.uri+"/documentation"}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }

    server.route(Routes);

    // Generates list of all endpoints available (Returns paths as JSON)
    server.route(
      {
        method: "GET",
        path: "/",
        config: {
          auth: false,
          handler: async function(request, h) {
            var paths = [], serverMap = server.table();
            serverMap.forEach(item => {
              paths.push(item.path);
            });
            return {
              success: true,
              data: paths
            };
          }
        }
      }
    );
  })();
})();
