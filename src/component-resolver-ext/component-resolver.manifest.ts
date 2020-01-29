import { Extension } from '../../extensions/harmony';
import componentResolverProvider from './component-resolver.provider';
import { WorkspaceExt } from '../workspace';
import ScopeExt from '../scope/scope.extension';

export default Extension.instantiate({
  name: 'ComponentResolver',
  dependencies: [WorkspaceExt, ScopeExt],
  config: {},
  provider: componentResolverProvider
});
