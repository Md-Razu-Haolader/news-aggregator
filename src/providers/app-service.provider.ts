import ServiceProvider from './service-provider';

export default class AppServiceProvider extends ServiceProvider {
  register() {
    // Container.set('user.repository', new UserSQLRepository());
  }
}
