import {useTheme} from '../ThemeProvider';

const defaultColors = {
  primary: '#EDF4F6',
  headerColor: '#10445C',
  headerText: '#FFFFFF',
  text: '#10445C',
  placeholder: '#aaaaaa',
  activeTab: '#205872',
  inputBackground: '#CBDFE8',
  buttonColor: '#00a1e9',

  black: '#000000',
  white: '#FFFFFF',
  100: '#F7FAFC',
  200: '#EDF2F7',
  300: '#E2E8F0',
  400: '#CBD5E0',
  500: '#A0AEC0',
  600: '#718096',
  700: '#4A5568',
  800: '#2D3748',
  900: '#1A202C',
};
const darkColors = {
  primary: '#1E1E1E',
  black: defaultColors.white,
  headerColor: '#333333',
  headerText: '#000',
  text: '#FFFFFF',
  placeholder: 'rgb(165, 165, 165)',
  activeTab: '#4C4C4C',
  inputBackground: 'rgb(42, 42, 42)',
  buttonColor: '#FFFFFF',

  white: defaultColors.black,
  100: defaultColors[900],
  200: defaultColors[800],
  300: defaultColors[700],
  400: defaultColors[600],
  500: defaultColors[500],
  600: defaultColors[400],
  700: defaultColors[300],
  800: defaultColors[200],
  900: defaultColors[100],
};

const themes = {
  default: {...defaultColors},
  dark: {...darkColors},
};
export const getThemeColor = (color, theme = 'default') => {
  const themeColor = themes[theme][color];
  const fallbackColor = themes.default[color];
  return themeColor || fallbackColor;
};
export const useThemeColor = color => {
  const {theme} = useTheme();
  return getThemeColor(color, theme);
};

export default themes;
