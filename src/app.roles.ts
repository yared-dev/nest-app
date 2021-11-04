import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  AUTHOR = 'AUTHOR',
  ADMIN = 'ADMIN',
}
export enum AppResources {
  USER = 'USER',
  POST = 'POST',
  PRODUCTO = 'PRODUCTO',
}
export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.AUTHOR)
  .updateOwn(AppResources.USER)
  .deleteOwn(AppResources.USER)
  .createOwn(AppResources.POST)
  .updateOwn(AppResources.POST)
  .deleteOwn(AppResources.POST)
  .createOwn(AppResources.PRODUCTO)
  .updateOwn(AppResources.PRODUCTO)
  .deleteOwn(AppResources.PRODUCTO)

  .grant(AppRoles.ADMIN)
  .extend(AppRoles.AUTHOR)
  .createAny(AppResources.USER)
  .updateAny(AppResources.POST, AppResources.USER)
  .deleteAny(AppResources.USER, AppResources.POST)
  .updateAny(AppResources.PRODUCTO, AppResources.USER)
  .deleteAny(AppResources.PRODUCTO, AppResources.USER);
