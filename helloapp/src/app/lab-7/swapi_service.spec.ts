import { TestBed } from '@angular/core/testing';
import axios from 'axios';
import { SwapiService } from '../lab-6/swapi_service';

describe('SwapiService (API & Promise Logic)', () => {
  let service: SwapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwapiService]
    });
    service = TestBed.inject(SwapiService);
  });

  it('7. повинен успішно створити сервіс SwapiService', () => {
    expect(service).toBeTruthy();
  });

  it('8. повинен викликати axios.get при отриманні персонажів', async () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { results: [] } });
    await service.getCharacters();
    expect(axios.get).toHaveBeenCalled();
  });

  it('9. повинен підставляти speciesName = Human, якщо поле species порожнє', async () => {
    const mockApiResponse = {
      data: {
        results: [
          { name: 'Luke Skywalker', gender: 'male', species: [], birth_year: '19BBY' }
        ]
      }
    };
    vi.spyOn(axios, 'get').mockImplementation((url: string) => {
      if (url.includes('page=1')) {
        return Promise.resolve(mockApiResponse);
      }
      return Promise.resolve({ data: { results: [] } });
    });

    const result = await service.getCharacters();
    expect(result.length).toBe(1);
    expect(result[0].speciesName).toBe('Human');
  });

  it('10. повинен виконувати додатковий запит за назвою раси, якщо вказано URL раси', async () => {
    vi.spyOn(axios, 'get').mockImplementation((url: string) => {
      if (url.includes('species/2')) {
        return Promise.resolve({ data: { name: 'Droid' } });
      }
      if (url.includes('page=1')) {
        return Promise.resolve({
          data: {
            results: [
              { name: 'C-3PO', gender: 'n/a', species: ['https://swapi.dev/api/species/2/'], birth_year: '112BBY' }
            ]
          }
        });
      }
      return Promise.resolve({ data: { results: [] } });
    });

    const result = await service.getCharacters();
    expect(result.length).toBe(1);
    expect(result[0].speciesName).toBe('Droid');
  });

  it('11. метод getCharacters() повинен повертати саме Promise', () => {
    vi.spyOn(axios, 'get').mockResolvedValue({ data: { results: [] } });
    const callResult = service.getCharacters();
    expect(callResult instanceof Promise).toBe(true);
  });

  it('12. повинен коректно повертати масив із кількох персонажів', async () => {
    const mockData = {
      data: {
        results: [
          { name: 'Hero 1', species: [] },
          { name: 'Hero 2', species: [] }
        ]
      }
    };
    vi.spyOn(axios, 'get').mockImplementation((url: string) => {
      if (url.includes('page=1')) {
        return Promise.resolve(mockData);
      }
      return Promise.resolve({ data: { results: [] } });
    });

    const result = await service.getCharacters();
    expect(result.length).toBe(2);
  });
});