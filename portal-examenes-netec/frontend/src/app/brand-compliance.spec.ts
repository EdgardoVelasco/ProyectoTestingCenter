import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';

@Component({
  standalone: true,
  template: `<header class="page-header"><h1>NETEC</h1></header><button>Acción</button>`
})
class BrandProbeComponent {}

describe('Identidad visual NETEC', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [BrandProbeComponent]}));

  it('expone los tokens corporativos oficiales', () => {
    const fixture = TestBed.createComponent(BrandProbeComponent);
    fixture.detectChanges();
    const tokens = getComputedStyle(document.documentElement);
    expect(tokens.getPropertyValue('--color-brand-primary').trim().toLowerCase()).toBe('#02419f');
    expect(tokens.getPropertyValue('--color-brand-secondary').trim().toLowerCase()).toBe('#00a1af');
    expect(tokens.getPropertyValue('--font-family-primary')).toContain('Montserrat');
  });

  it('usa Montserrat sin serif y conserva el degradado azul a teal', () => {
    const fixture = TestBed.createComponent(BrandProbeComponent);
    fixture.detectChanges();
    const font = getComputedStyle(document.body).fontFamily.toLowerCase();
    const families = font.split(',').map(value => value.trim().replaceAll('"', '').replaceAll("'", ''));
    const gradient = getComputedStyle(fixture.nativeElement.querySelector('.page-header')).backgroundImage;
    expect(font).toContain('montserrat');
    expect(families).not.toContain('serif');
    expect(families).not.toContain('times new roman');
    expect(families).not.toContain('georgia');
    expect(gradient.indexOf('rgb(2, 65, 159)')).toBeLessThan(gradient.indexOf('rgb(0, 161, 175)'));
  });
});
