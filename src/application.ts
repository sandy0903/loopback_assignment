import {AuthenticationComponent} from '@loopback/authentication';
import {JWTAuthenticationComponent, SECURITY_SCHEME_SPEC, UserServiceBindings} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {CronComponent} from '@loopback/cron';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {RestExplorerBindings, RestExplorerComponent} from '@loopback/rest-explorer';
import {registerAuthenticationStrategy} from '@loopback/authentication';
import {ServiceMixin} from '@loopback/service-proxy';
import 'dotenv/config';
import path from 'path';
import * as CronJobs from "./cronjobs"
// import * as CronJobs from './cronjobs';
import {MongdbDataSource} from './datasources';
import {MySequence} from './sequence';
import { AuthorizationComponent, AuthorizationDecision, AuthorizationOptions, AuthorizationTags } from '@loopback/authorization';
import { basicAuthorization } from './services/basic.authorizor';
import { PasswordHasherBindings } from './key';
import { BcryptHasher } from './services';
// import {JWTAuthenticationComponent} from './services/jwt-component';
// import {MySequence} from './sequence';
export {ApplicationConfig};

export class AppAssigmentApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {

  }) {
    super(options);
    // Set up the custom sequence
    this.sequence(MySequence);
    // Bind migration component related elements
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    // this.component(JWTAuthenticationComponent);
    this.dataSource(MongdbDataSource, UserServiceBindings.DATASOURCE_NAME);
    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));
    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    const authoptions: AuthorizationOptions = {
      precedence: AuthorizationDecision.DENY,
      defaultDecision: AuthorizationDecision.DENY,
    };
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher),
this.bind(PasswordHasherBindings.ROUNDS).to(10)
// this.bind()
    // mount authorization component
    const binding = this.component(AuthorizationComponent);
    // configure authorization component
    this.configure(binding.key).to(authoptions);

    // bind the authorizer provider
    this
      .bind('authorizationProviders.my-authorizer-provider')

      .tag(AuthorizationTags.AUTHORIZER);




    this.component(RestExplorerComponent);
    this.component(RestExplorerComponent);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    }

    Object.entries(CronJobs).forEach(([_key, value]) => {
      const cronJob = value;
      this.add(cronJob);
    });
    this.addSecuritySpec();
    this.component(CronComponent);
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'TODO API',
        version: '1.0.0',
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [{jwt: []}],
      servers: [{url: '/'}],
    });
  }
}