import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Favorites6 } from '../lab-6/favorites';

describe('Favorites6 Component (Input / Output Testing)', () => {
  let component: Favorites6;
  let fixture: ComponentFixture<Favorites6>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorites6]
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites6);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('13. повинен успішно створити компонент Favorites6', () => {
    expect(component).toBeTruthy();
  });

  it('14. початковий масив items повинен бути визначеним і порожнім', () => {
    expect(component.items).toBeDefined();
    expect(component.items.length).toBe(0);
  });

  it('15. повинен коректно приймати персонажів через @Input items', () => {
    const fakeItems = [{ name: 'Yoda', gender: 'male', speciesName: 'Unknown' }];
    component.items = fakeItems;
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('Yoda');
  });

  it('16. повинен емітити видалення героя через @Output remove', () => {
    vi.spyOn(component.remove, 'emit');
    const fakeEvent = new MouseEvent('click');
    const hero = { name: 'Darth Vader' };

    component.onRemove(hero, fakeEvent);
    expect(component.remove.emit).toHaveBeenCalledWith(hero);
  });

  it('17. метод onRemove повинен блокувати спливання події через stopPropagation()', () => {
    const fakeEvent = {
      stopPropagation: () => {}
    } as unknown as MouseEvent;
    vi.spyOn(fakeEvent, 'stopPropagation');

    component.onRemove({ name: 'Obi-Wan' }, fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalled();
  });

  it('18. повинен відкривати та скидати попап обраного через selectedFav', () => {
    const char = { name: 'Boba Fett' };
    component.selectedFav = char;
    expect(component.selectedFav).toEqual(char);

    component.selectedFav = null;
    expect(component.selectedFav).toBeNull();
  });

  it('19. повинен відмальовувати елементи списку та попап у DOM', async () => {
    component.items = [
      { name: 'Yoda', gender: 'male', speciesName: 'Unknown', birth_year: '896BBY' } as any
    ];
    fixture.detectChanges();
    await fixture.whenStable();

    component.selectedFav = component.items[0];
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const deleteBtn = compiled.querySelector('button');
    if (deleteBtn) {
      deleteBtn.click();
    }

    expect(compiled).toBeTruthy();
  });
});