import { WithBreakpoint } from './WithBreakpoint';
import { keys as breakpointKeys } from './breakpoints';
import {
  getBreakpointValue,
  isBreakpointDown,
  isBreakpointUp,
} from './breakpointUtils';

WithBreakpoint.getBreakpointValue = getBreakpointValue;
WithBreakpoint.isBreakpointDown = isBreakpointDown;
WithBreakpoint.isBreakpointUp = isBreakpointUp;
WithBreakpoint.breakpointKeys = breakpointKeys;

export { WithBreakpoint };
