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

export const defaultTheme = (parentTheme = internalTheme) => {
  return merge({}, internalTheme, parentTheme);
};
