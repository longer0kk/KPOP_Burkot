import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../lab-6/storage_service';

describe('StorageService (Ionic Storage Testing)', () => {
  let service: StorageService;
  let mockStorageInstance: any;
  let mockStorageFactory: any;

  beforeEach(() => {
    mockStorageInstance = {
      get: () => Promise.resolve(null),
      set: () => Promise.resolve()
    };

    mockStorageFactory = {
      create: () => Promise.resolve(mockStorageInstance)
    };

    vi.spyOn(mockStorageFactory, 'create');
    vi.spyOn(mockStorageInstance, 'get');
    vi.spyOn(mockStorageInstance, 'set');

    TestBed.configureTestingModule({
      providers: [
        StorageService,
        { provide: Storage, useValue: mockStorageFactory }
      ]
    });

    service = TestBed.inject(StorageService);
  });

  it('1. повинен успішно створити сервіс StorageService', () => {
    expect(service).toBeTruthy();
  });

  it('2. метод init() повинен викликати storage.create()', async () => {
    await service.init();
    expect(mockStorageFactory.create).toHaveBeenCalledTimes(1);
  });

  it('3. повторний виклик init() не повинен створювати сховище вдруге', async () => {
    await service.init();
    await service.init();
    expect(mockStorageFactory.create).toHaveBeenCalledTimes(1);
  });

  it('4. getFavorites() повинен повертати порожній масив, якщо база порожня', async () => {
    const result = await service.getFavorites();
    expect(result).toEqual([]);
    expect(result.length).toBe(0);
  });

  it('5. getFavorites() повинен повертати збережений список персонажів', async () => {
    const savedData = [{ name: 'Luke Skywalker' }];
    mockStorageInstance.get = () => Promise.resolve(savedData);

    const result = await service.getFavorites();
    expect(result).toEqual(savedData);
    expect(result.length).toBe(1);
  });

  it('6. saveFavorites() повинен викликати set з ключем favorites та переданим масивом', async () => {
    const itemsToSave = [{ name: 'Leia Organa' }, { name: 'Han Solo' }];
    await service.saveFavorites(itemsToSave);

    expect(mockStorageInstance.set).toHaveBeenCalledWith('favorites', itemsToSave);
  });
});