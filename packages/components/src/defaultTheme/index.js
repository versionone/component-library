import merge from 'lodash.merge';
import { palette } from '../palette';

const internalTheme = {
  colors: {
    background: palette.transparent,
    backgroundDark: palette.transparent,
    backgroundLight: palette.transparent,
    text: palette.forge,
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
    borderColor: palette.chrome500,
    background: palette.paper,
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
  Paper: {
    background: palette.paper,
    borderRadius: 4,
    boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
  },
  Button: {
    primary: {
      invert: palette.paper,
      main: palette.mango,
      mainHighlight: '#c75c02',
    },
    secondary: {
      invert: palette,
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
  Drawer: {
    background: palette.paper,
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
      main: palette.forge,
    },
    default: {
      main: 'rgb(99, 76, 71)',
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
    borderColor: palette.chrome500,
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
    before: palette.dove,
    status: {
      online: palette.fern,
      offline: palette.aluminum,
      focus: palette.eggplant,
      busy: palette.sunset,
    },
  },
  Divider: {
    lighterBackground: palette.slate,
    darkerBackground: palette.Forge,
  },
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
    iconColor: palette.shuttle,
  },
  Icon: {
    main: palette.gunmetal,
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
    current: {
      main: '#1890ff',
      inverse: palette.paper,
      title: palette.gunmetal,
      description: palette.shuttle,
      lineStyle: "dashed",
      lineColor: palette.dove,
      lineWidth: 1,
    },
    default: {
      main: palette.paper,
      inverse: palette.dove,
      title: palette.slate,
      description: palette.slate,
      lineStyle: "dashed",
      lineColor: palette.dove,
      lineWidth: 1,
    },
    seen: {
      main: palette.paper,
      inverse: '#1890ff',
      title: palette.slate,
      description: palette.slate,
      lineStyle: "solid",
      lineColor: "#1890ff",
      lineWidth: 1,
    },
    titleWeight: "normal",
  },
  Timeline: {
    main: palette.dove,
    border: palette.slate,
  },
  UnderlineTab: {
    border: {
      selected: palette.obsidian,
      unselected: palette.transparent,
    },
    color: {
      selected: palette.obsidian,
      unselected: palette.dove,
    }
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
  Code: {
    'code[class*="language-"]': {
      MozTabSize: '2',
      OTabSize: '2',
      tabSize: '2',
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      whiteSpace: 'pre-wrap',
      wordWrap: 'normal',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: '14px',
      color: '#76d9e6',
      textShadow: 'none',
    },
    'pre[class*="language-"]': {
      MozTabSize: '2',
      OTabSize: '2',
      tabSize: '2',
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      whiteSpace: 'pre-wrap',
      wordWrap: 'normal',
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: '14px',
      color: '#76d9e6',
      textShadow: 'none',
      background: '#2a2a2a',
      padding: '15px',
      borderRadius: '4px',
      border: '1px solid #e1e1e8',
      overflow: 'auto',
      position: 'relative',
    },
    ':not(pre)>code[class*="language-"]': {
      background: '#2a2a2a',
      padding: '0.15em 0.2em 0.05em',
      borderRadius: '.3em',
      border: '0.13em solid #7a6652',
      boxShadow: '1px 1px 0.3em -0.1em #000 inset',
    },
    'pre[class*="language-"] code': {
      whiteSpace: 'pre',
      display: 'block',
    },
    namespace: {
      Opacity: '.7',
    },
    comment: {
      color: '#6f705e',
    },
    prolog: {
      color: '#6f705e',
    },
    doctype: {
      color: '#6f705e',
    },
    cdata: {
      color: '#6f705e',
    },
    operator: {
      color: '#a77afe',
    },
    boolean: {
      color: '#a77afe',
    },
    number: {
      color: '#a77afe',
    },
    'attr-name': {
      color: '#e6d06c',
    },
    string: {
      color: '#e6d06c',
    },
    entity: {
      color: '#e6d06c',
      cursor: 'help',
    },
    url: {
      color: '#e6d06c',
    },
    '.language-css .token.string': {
      color: '#e6d06c',
    },
    '.style .token.string': {
      color: '#e6d06c',
    },
    selector: {
      color: '#a6e22d',
    },
    inserted: {
      color: '#a6e22d',
    },
    atrule: {
      color: '#ef3b7d',
    },
    'attr-value': {
      color: '#ef3b7d',
    },
    keyword: {
      color: '#ef3b7d',
    },
    important: {
      color: '#ef3b7d',
      fontWeight: 'bold',
    },
    deleted: {
      color: '#ef3b7d',
    },
    regex: {
      color: '#76d9e6',
    },
    statement: {
      color: '#76d9e6',
      fontWeight: 'bold',
    },
    placeholder: {
      color: '#fff',
    },
    variable: {
      color: '#fff',
    },
    bold: {
      fontWeight: 'bold',
    },
    punctuation: {
      color: '#bebec5',
    },
    italic: {
      fontStyle: 'italic',
    },
    'code.language-markup': {
      color: '#f9f9f9',
    },
    'code.language-markup .token.tag': {
      color: '#ef3b7d',
    },
    'code.language-markup .token.attr-name': {
      color: '#a6e22d',
    },
    'code.language-markup .token.attr-value': {
      color: '#e6d06c',
    },
    'code.language-markup .token.style': {
      color: '#76d9e6',
    },
    'code.language-markup .token.script': {
      color: '#76d9e6',
    },
    'code.language-markup .token.script .token.keyword': {
      color: '#76d9e6',
    },
    'pre[class*="language-"][data-line]': {
      position: 'relative',
      padding: '1em 0 1em 3em',
    },
    'pre[data-line] .line-highlight': {
      position: 'absolute',
      left: '0',
      right: '0',
      padding: '0',
      marginTop: '1em',
      background: 'rgba(255, 255, 255, 0.08)',
      pointerEvents: 'none',
      lineHeight: 'inherit',
      whiteSpace: 'pre',
    },
    'pre[data-line] .line-highlight:before': {
      content: 'attr(data-start)',
      position: 'absolute',
      top: '.4em',
      left: '.6em',
      minWidth: '1em',
      padding: '0.2em 0.5em',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: 'black',
      font: 'bold 65%/1 sans-serif',
      height: '1em',
      lineHeight: '1em',
      textAlign: 'center',
      borderRadius: '999px',
      textShadow: 'none',
      boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
    },
    'pre[data-line] .line-highlight[data-end]:after': {
      content: 'attr(data-end)',
      position: 'absolute',
      top: 'auto',
      left: '.6em',
      minWidth: '1em',
      padding: '0.2em 0.5em',
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: 'black',
      font: 'bold 65%/1 sans-serif',
      height: '1em',
      lineHeight: '1em',
      textAlign: 'center',
      borderRadius: '999px',
      textShadow: 'none',
      boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
      bottom: '.4em',
    },
  },
};

const themeDark = {
  Drawer: {
    background: palette.chrome800,
  },
  FieldSet: {
    size: 4,
    color: palette.heather,
  },
  Label: {
    disabled: {
      invert: palette.forge,
      main: palette.paper,
    },
    required: {
      main: palette.sunset,
    },
    default: {
      main: palette.paper,
    }
  },
  Avatar: {
    background: palette.chrome800,
    color: palette.paper,
    borderColor: palette.chrome800,
    before: palette.chrome800,
    status: {
      online: palette.fern,
      offline: palette.aluminum,
      focus: palette.eggplant,
      busy: palette.sunset,
    },
  },
  Chip: {
    main: palette.chrome700,
    focused: palette.chrome600,
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
  Form: {
    background: palette.chrome800,
  },
  Icon: {
    main: palette.pale,
  },
  Link: {
    main: palette.cerulean,
    mainHighlight: '#009ff2',
  },
  ListItem: {
    selected: 'rgba(0, 169, 224, 0.1)',
    mainHighlight: 'rgba(221, 226, 233, 0.5)',
  },
  ListItemText: {
    main: palette.paper,
    secondary: palette.pale,
  },
  Breadcrumb: {
    main: palette.dove,
    selected: palette.paper,
    mainHighlight: '#009ff2',
  },
  Stepper: {
    current: {
      main: '#1890ff',
      inverse: palette.paper,
      title: palette.chrome50,
      description: palette.chrome100,
      lineStyle: "dashed",
      lineColor: palette.chrome200,
      lineWidth: 1,
    },
    default: {
      main: palette.chrome800,
      inverse: palette.chrome200,
      title: palette.chrome200,
      description: palette.chrome200,
      lineStyle: "dashed",
      lineColor: palette.chrome200,
      lineWidth: 1,
    },
    seen: {
      main: palette.chrome800,
      inverse: '#1890ff',
      title: palette.chrome200,
      description: palette.chrome200,
      lineStyle: "solid",
      lineColor: "#1890ff",
      lineWidth: 1,
    },
    titleWeight: "normal",
  },
  TextField: {
    borderColor: palette.chrome500,
    disabled: {
      invert: palette.paper,
      main: 'rgb(169, 169, 169)',
    },
    focused: {
      main: palette.cerulean,
      shadow: '0 0 5px 0',
    },
  },
  Paper: {
    background: palette.chrome800,
  },
  UnderlineTab: {
    border: {
      selected: palette.chrome500,
      unselected: palette.transparent,
    },
    color: {
      selected: palette.dove,
      unselected: palette.forge,
    }
  },
};

export const defaultTheme = (parentTheme = internalTheme) => {
  return merge({}, internalTheme, parentTheme);
};

export const darkTheme = (parentTheme = themeDark) => {
  return merge({}, internalTheme, themeDark, parentTheme);
};
