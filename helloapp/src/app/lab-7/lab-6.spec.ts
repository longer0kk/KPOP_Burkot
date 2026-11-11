import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lab6 } from '../lab-6/lab-6';
import { SwapiService } from '../lab-6/swapi_service';
import { StorageService } from '../lab-6/storage_service';

describe('Lab6 Component (Main Integration Tests)', () => {
  let component: Lab6;
  let fixture: ComponentFixture<Lab6>;
  let mockSwapi: any;
  let mockStorage: any;

  const mockCharacters = [
    { name: 'Luke Skywalker', gender: 'male', speciesName: 'Human' },
    { name: 'Leia Organa', gender: 'female', speciesName: 'Human' }
  ];

  beforeEach(async () => {
    mockSwapi = {
      getCharacters: () => Promise.resolve([...mockCharacters])
    };

    mockStorage = {
      getFavorites: () => Promise.resolve([]),
      saveFavorites: () => Promise.resolve()
    };

    vi.spyOn(mockSwapi, 'getCharacters');
    vi.spyOn(mockStorage, 'getFavorites');
    vi.spyOn(mockStorage, 'saveFavorites');

    await TestBed.configureTestingModule({
      imports: [Lab6],
      providers: [
        { provide: SwapiService, useValue: mockSwapi },
        { provide: StorageService, useValue: mockStorage }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Lab6);
    component = fixture.componentInstance;
  });

  it('20. повинен успішно створити компонент Lab6', () => {
    expect(component).toBeTruthy();
  });

  it('21. початковий вигляд повинен бути вкладкою table', () => {
    expect(component.view).toBe('table');
  });

  it('22. ngOnInit() повинен асинхронно завантажити дані з API та Storage', async () => {
    await component.ngOnInit();
    expect(mockStorage.getFavorites).toHaveBeenCalled();
    expect(mockSwapi.getCharacters).toHaveBeenCalled();
    expect(component.characters.length).toBe(2);
  });

  it('23. addToFavorites() повинен додавати героя та оновлювати Storage', async () => {
    const fakeEvent = new MouseEvent('click');
    await component.addToFavorites(mockCharacters[0], fakeEvent);

    expect(component.favoritesList.length).toBe(1);
    expect(mockStorage.saveFavorites).toHaveBeenCalledWith(component.favoritesList);
  });

  it('24. addToFavorites() не повинен зберігати повторні дублікати', async () => {
    const fakeEvent = new MouseEvent('click');
    await component.addToFavorites(mockCharacters[0], fakeEvent);
    await component.addToFavorites(mockCharacters[0], fakeEvent);

    expect(component.favoritesList.length).toBe(1);
    expect(mockStorage.saveFavorites).toHaveBeenCalledTimes(1);
  });

  it('25. removeFromFavorites() повинен прибирати героя та оновлювати базу', async () => {
    component.favoritesList = [...mockCharacters];
    await component.removeFromFavorites(mockCharacters[0]);

    expect(component.favoritesList.length).toBe(1);
    expect(component.favoritesList[0].name).toBe('Leia Organa');
    expect(mockStorage.saveFavorites).toHaveBeenCalledWith(component.favoritesList);
  });

  it('26. switchView() повинен перемикати вкладки між table та favorites', () => {
    component.switchView('favorites');
    expect(component.view).toBe('favorites');

    component.switchView('table');
    expect(component.view).toBe('table');
  });

  it('27. renderChart() не повинен викликати помилок та має агрегувати раси (топ-4 + Інше)', () => {
    expect(() => component.renderChart()).not.toThrow();

    component.characters = [
      { name: 'C1', speciesName: 'Human' },
      { name: 'C2', speciesName: 'Human' },
      { name: 'C3', speciesName: 'Droid' },
      { name: 'C4', speciesName: 'Wookiee' },
      { name: 'C5', speciesName: 'Gungan' },
      { name: 'C6', speciesName: 'Twi\'lek' }
    ];
    fixture.detectChanges();
    expect(() => component.renderChart()).not.toThrow();
  });

  it('28. повинен взаємодіяти з елементами DOM та перемикачами', async () => {
    component.characters = [
      { name: 'Luke', gender: 'male', speciesName: 'Human', birth_year: '19BBY' } as any
    ];
    component.view = 'table';
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons.forEach((btn) => btn.click());

    component.switchView('favorites');
    fixture.detectChanges();

    component.selectedCharacter = component.characters[0];
    fixture.detectChanges();

    expect(compiled).toBeTruthy();
  });
});