export default WrappedComponent =>
  typeof WrappedComponent === 'string'
    ? WrappedComponent
    : WrappedComponent.displayName || WrappedComponent.name || 'Component';
