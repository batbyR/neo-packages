import {
  getPackageComponentsFromLine,
  getPackageOriginFromLine,
  getPackageFromLine,
} from './component';

describe('ImportExtractor getPackageComponentsFromLine', () => {
  it('should get component with no brackets', () => {
    const line = "import component from 'origin'";
    const components = getPackageComponentsFromLine(line);
    expect(components).toEqual(['component']);
  });

  it('should get component with brackets', () => {
    const line = 'import { component } from origin';
    const components = getPackageComponentsFromLine(line);
    expect(components).toEqual(['component']);
  });

  it('should return empty when there is no import', () => {
    const line = "Je ne suis pas une ligne d'import";
    const components = getPackageComponentsFromLine(line);
    expect(components).toEqual([]);
  });

  it('should get package from import line with bracket', () => {
    const line = "import { component } from 'origin'";
    const pack = getPackageComponentsFromLine(line);
    expect(pack).toEqual(['component']);
    const line2 = "import {component} from 'origin'";
    const pack2 = getPackageComponentsFromLine(line2);
    expect(pack2).toEqual(['component']);
  });
  it('should get mutliple packages from import line with bracket', () => {
    const line = "import { component1, component2 } from 'origin'";
    const pack = getPackageComponentsFromLine(line);
    expect(pack).toEqual(['component1', 'component2']);
    const line2 = "import {component1,component2} from 'origin'";
    const pack2 = getPackageComponentsFromLine(line2);
    expect(pack2).toEqual(['component1', 'component2']);
  });
  it('should get package from line with as statement', () => {
    const line = "import { component1 as myComponent } from 'origin'";
    const pack = getPackageComponentsFromLine(line);
    expect(pack).toEqual(['component1']);
    const line2 = "import {component1 as myComponent} from 'origin'";
    const pack2 = getPackageComponentsFromLine(line2);
    expect(pack2).toEqual(['component1']);
  });
});

describe('ImportExtractor getPackageOriginFromLine', () => {
  it('should get origin from import line', () => {
    const line = "import component from 'origin'";
    const origin = getPackageOriginFromLine(line);
    expect(origin).toBe('origin');
  });

  it('should return empty when there is no import', () => {
    const line = "Je ne suis pas une ligne d'import";
    const origin = getPackageOriginFromLine(line);
    expect(origin).toBe('');
  });

  it('should remove points and intitial slash', () => {
    const line = "import component from './folder/origin'";
    const origin = getPackageOriginFromLine(line);
    expect(origin).toBe('folder/origin');
    const line2 = "import component from '../../folder/origin'";
    const origin2 = getPackageOriginFromLine(line2);
    expect(origin2).toBe('folder/origin');
  });
});

describe('ImportExtractor getPackageFromLine', () => {
  it('should get package from simple import line', () => {
    const line = "import component from 'origin'";
    const pack = getPackageFromLine(line);
    expect(pack).toEqual({ components: ['component'], origin: 'origin' });
  });

  it('should get package in import line with no component specified', () => {
    const line = 'import component';
    const pack = getPackageFromLine(line);
    expect(pack).toEqual({ components: ['component'], origin: '' });
  });

  it('should return empty when there is no import', () => {
    const line = 'Je ne suis pas une ligne intéressante';
    const pack = getPackageFromLine(line);
    expect(pack).toEqual({ components: [], origin: '' });
  });
});
