import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getProducts } from './api';

describe('API Service Cache', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('should fetch products and save them to localStorage', async () => {
    const mockProducts = [{ id: '1', model: 'Test Phone' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    }));

    const data = await getProducts();
    expect(data).toEqual(mockProducts);
    
    const cached = JSON.parse(localStorage.getItem('products_list'));
    expect(cached).toHaveProperty('timestamp');
    expect(cached.data).toEqual(mockProducts);
    expect(cached.data[0].model).toBe('Test Phone');
  });

  it('should return cached data if not expired', async () => {
    const mockData = [{ id: '1' }];
    const timestamp = Date.now();
    localStorage.setItem('products_list', JSON.stringify({ data: mockData, timestamp }));

    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    
    const data = await getProducts();
    
    expect(data).toEqual(mockData);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should fetch new data if cache is expired (1 hour)', async () => {
    const oldData = [{ id: 'old' }];
    const newData = [{ id: 'new' }];
    
    // Guardar datos antiguos
    localStorage.setItem('products_list', JSON.stringify({ data: oldData, timestamp: Date.now() }));

    // Adelantar el tiempo 1 hora y 1 minuto
    vi.advanceTimersByTime(60 * 61 * 1000);

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(newData),
    }));

    const data = await getProducts();
    expect(data).toEqual(newData);
  });

  it('should handle fetch errors by returning empty array/null', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

    const data = await getProducts();
    expect(data).toEqual([]);
  });
});