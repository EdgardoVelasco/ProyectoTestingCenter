import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {TestBed} from '@angular/core/testing';
import {MatMenuHarness} from '@angular/material/menu/testing';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {AuthenticatedUserMenuComponent} from './authenticated-user-menu.component';

describe('AuthenticatedUserMenuComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [AuthenticatedUserMenuComponent],
    providers: [provideNoopAnimations()]
  }));

  function create(name = 'Lynne Robbins', username = 'testingcenter.dev@nwr1.onmicrosoft.com') {
    const fixture = TestBed.createComponent(AuthenticatedUserMenuComponent);
    fixture.componentRef.setInput('name', name);
    fixture.componentRef.setInput('username', username);
    fixture.detectChanges();
    return fixture;
  }

  it('muestra iniciales, nombre y UPN sin depender de hover', () => {
    const fixture = create();
    const trigger = fixture.nativeElement.querySelector('.user-menu-trigger') as HTMLButtonElement;
    expect(trigger.textContent).toContain('LR');
    expect(trigger.textContent).toContain('Lynne Robbins');
    expect(trigger.textContent).toContain('testingcenter.dev@nwr1.onmicrosoft.com');
  });

  it('calcula una o dos iniciales y no usa el correo', () => {
    expect(create('Edgardo Velasco').componentInstance.initials).toBe('EV');
    expect(create('Paola').componentInstance.initials).toBe('P');
    expect(create('', 'correo@netec.com').componentInstance.initials).toBe('');
  });

  it('abre menú accesible, muestra UPN completo y logout textual', async () => {
    const fixture = create();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    expect(await menu.isOpen()).toBeTrue();
    const panelText = document.body.textContent ?? '';
    expect(panelText).toContain('testingcenter.dev@nwr1.onmicrosoft.com');
    expect(panelText).toContain('Cerrar sesión');
  });

  it('emite logout sin conocer MSAL', async () => {
    const fixture = create();
    const emitted = jasmine.createSpy('logoutRequested');
    fixture.componentInstance.logoutRequested.subscribe(emitted);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    const items = await menu.getItems({text: /Cerrar sesión/});
    await items[0].click();
    expect(emitted).toHaveBeenCalled();
  });

  it('cierra con Escape y restaura foco al activador', async () => {
    const fixture = create();
    const trigger = fixture.nativeElement.querySelector('.user-menu-trigger') as HTMLButtonElement;
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    await menu.close();
    expect(await menu.isOpen()).toBeFalse();
    expect(document.activeElement).toBe(trigger);
  });

  it('cierra al activar el backdrop exterior', async () => {
    const fixture = create();
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const menu = await loader.getHarness(MatMenuHarness);
    await menu.open();
    (document.querySelector('.cdk-overlay-backdrop') as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(await menu.isOpen()).toBeFalse();
  });

  it('muestra carga segura y deshabilita el activador', () => {
    const fixture = create('', '');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('.user-menu-trigger') as HTMLButtonElement;
    expect(trigger.disabled).toBeTrue();
    expect(trigger.textContent).toContain('Cargando identidad');
    expect(trigger.textContent).not.toContain('@');
  });
});
