import merge from 'lodash.merge';
import { palette } from '../palette';

const internalTheme = {
  colors: {
    background: palette.transparent,
    backgroundDark: palette.transparent,
    backgroundLight: palette.transparent,
    text: palette.obsidian,
    textInvert: palette.paper,
    transparent: palette.transparent,
  },
  layers: {
    drawer: 100000,
    scrim: 100,
  },
  spacing: {
    unit: 4,
  },
  typography: {
    baseSize: 16,
    lineHeight: 1.5,
  },
  palette: {
    colors: {
      paper: palette.paper,
    },
    primary: {
      milestone: palette.plum,
      scope: palette.shamrock,
    },
  },
  focused: {
    outline: 'none',
    boxShadow: `0 0 4px ${palette.cerulean}`,
  },
  Form: {
    borderColor: palette.aluminum,
    disabled: {
      invert: palette.paper,
      main: 'rgb(169, 169, 169)',
    },
    focused: {
      main: palette.cerulean,
      shadow: '0 0 5px 0',
    },
    dirty: {
      main: '#fbeecc',
    },
    error: {
      main: palette.sunset,
    },
    success: {
      main: palette.shamrock,
    },
    inline: {
      main: palette.transparent,
      mainHighlight: palette.cerulean,
    },
  },
  FieldSet: {
    size: 4,
    color: palette.dove,
  },
  Button: {
    primary: {
      invert: palette.paper,
      main: palette.mango,
      mainHighlight: '#c75c02',
    },
    secondary: {
      invert: palette.paper,
      main: palette.cerulean,
      mainHighlight: '#006e92',
    },
    standard: {
      invert: palette.forge,
      main: palette.paper,
      mainHighlight: palette.shuttle,
    },
    disabled: {
      invert: palette.paper,
      main: 'rgb(169, 169, 169)',
    },
    focused: {
      main: palette.cerulean,
      shadow: '0 0 4px 2px',
    },
  },
  FormField: {
    spacing: '0.5rem',
    focusColor: palette.cerulean,
    shadow: '0 0 4px 2px',
    boxShadow: `0 0 4px ${palette.cerulean}`,
  },
  Label: {
    disabled: {
      invert: palette.paper,
      main: 'rgb(169, 169, 169)',
    },
    required: {
      main: palette.sunset,
    },
  },
  Select: {
    padding: 3,
    disabled: {
      main: 'rgb(169, 169, 169)',
    },
    focused: {
      main: palette.cerulean,
    },
  },
  TextField: {
    borderColor: palette.aluminum,
    padding: 3,
    disabled: {
      invert: palette.paper,
      main: 'rgb(169, 169, 169)',
    },
    focused: {
      main: palette.cerulean,
      shadow: '0 0 5px 0',
    },
  },
  Avatar: {
    background: palette.dove,
    color: palette.gunmetal,
    borderColor: palette.paper,
    status: {
      online: palette.fern,
      offline: palette.aluminum,
      focus: palette.eggplant,
      busy: palette.sunset,
    },
  },
  Divider: {},
  Menu: {},
  ListItem: {
    selected: 'rgba(0, 169, 224, 0.1)',
    mainHighlight: 'rgba(221, 226, 233, 0.5)',
  },
  ListItemText: {
    main: palette.gunmetal,
    secondary: palette.aluminum,
  },
  Chip: {
    main: '#e0e0e0',
    focused: 'rgb(206, 206, 206)',
  },
  Tag: {
    backgroundColor: '#fbeecc',
    color: '#ca7700',
  },
  Toast: {
    canvas: palette.paper,
    warning: {
      main: palette.sunglow,
    },
    error: {
      main: palette.sunset,
    },
    info: {
      main: palette.aluminum,
    },
    success: {
      main: palette.shamrock,
    },
  },
  Lozenge: {
    warning: {
      main: palette.sunglow,
    },
    error: {
      main: palette.sunset,
    },
    info: {
      main: palette.dove,
    },
    success: {
      main: palette.shamrock,
    },
  },
  EmptyState: {
    main: palette.heather,
  },
  Link: {
    main: '#07496b',
    mainHighlight: '#009ff2',
  },
  Scrim: {
    main: palette.obsidian,
  },
  Upload: {
    main: 'rgba(0, 0, 0, 0.08)',
    iconColor: palette.shuttle,
  },
  Breadcrumb: {
    main: palette.dove,
    selected: palette.gunmetal,
    mainHighlight: '#009ff2',
  },
  Stepper: {
    active: {
      main: '#1890ff',
      inverse: palette.paper,
    },
    inactive: {
      main: palette.paper,
      inverse: palette.dove,
    },
    seen: {
      main: palette.paper,
      inverse: '#1890ff',
    },
    title: palette.gunmetal,
    description: palette.shuttle,
    fainted: palette.slate,
  },
  Timeline: {
    main: palette.dove,
    border: palette.slate,
  },
  Collapse: {
    border: '#d9d9d9',
    main: '#fafafa',
    content: palette.paper,
    status: {
      success: palette.shamrock,
      failure: palette.sunset,
      pending: '#1890ff',
      default: 'transparent',
    },
  },
};

export const defaultTheme = (parentTheme = internalTheme) => {
  return merge({}, internalTheme, parentTheme);
};
