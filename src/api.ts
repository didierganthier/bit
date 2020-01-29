import { getScopeComponent, addMany as addManyInternal, build, buildAll as buildAllApi } from './api/consumer/index';
import { AddProps } from './consumer/component-ops/add-components/add-components';
import { scopeList } from './api/scope/index';
import Extension from './extensions/extension';
import HooksManager from './hooks';
import { BaseLoadArgsProps } from './extensions/base-extension';

HooksManager.init();

export { Extension } from '../extensions/harmony';
export { Workspace } from './workspace';
export { Paper } from './paper';
export { Bit } from './bit';

export function show(scopePath: string, id: string, opts?: Record<string, any>) {
  // @ts-ignore AUTO-ADDED-AFTER-MIGRATION-PLEASE-FIX!
  return getScopeComponent({ scopePath, id, allVersions: opts && opts.versions }).then(({ component }) => {
    if (Array.isArray(component)) {
      return component.map(v => v.toObject());
    }
    return component.toObject();
  });
}
export function list(scopePath: string) {
  return scopeList(scopePath).then(listScopeResult => listScopeResult.map(result => result.id.toString()));
}

export async function buildOne(
  id: string,
  noCache = false,
  verbose = false,
  workspaceDir?: string
): Promise<string[] | undefined> {
  return build(id, noCache, verbose, workspaceDir);
}

export async function buildAll(id: string, noCache = false, verbose = false): Promise<Record<string, any>> {
  return buildAllApi(noCache, verbose);
}

export async function addMany(components: AddProps[], alternateCwd?: string) {
  return addManyInternal(components, alternateCwd);
}

// TODO: gilad - make sure it works now with harmony, nothing will work without this working
/**
 * Load extension programmatically
 */
export async function loadExtension(args: BaseLoadArgsProps): Promise<Extension> {
  const extension = await Extension.load(args);
  return Promise.resolve(extension);
}
