import { COMPONENT_REGEX, COMPONENTS_REGEX, ONE_COMPONENT_REGEX, ORIGIN_REGEX } from './constants';

export const getPackageComponentsFromLine = (line) => {
  const hasBracket = /{/.test(line);
  if (hasBracket) {
    const components = line.match(COMPONENTS_REGEX);
    if (components) {
      const componentArray = components[0].match(COMPONENT_REGEX);
      return componentArray.map((component) =>
        component
          .replace('{', '')
          .replace('}', '')
          .replace(',', '')
          .replace(/\s+/g, '')
      );
    } else {
      return [];
    }
  } else {
    const component = line.match(ONE_COMPONENT_REGEX);
    if (component) {
      return [component[0].replace('import ', '')];
    }
    return [];
  }
};

export const getPackageOriginFromLine = (line) => {
  const origin = line.match(ORIGIN_REGEX);
  if (origin) {
    return origin[0]
      .replace('from ', '')
      .replace(/(\.\/)+/g, '')
      .replace(/(\.\.\/?)+/g, '')
      .slice(1, -1);
  } else {
    return '';
  }
};

export const getPackageFromLine = (line) => ({
  components: getPackageComponentsFromLine(line),
  origin: getPackageOriginFromLine(line),
});
