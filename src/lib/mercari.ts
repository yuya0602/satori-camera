import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { getMercariProductsFromSheet, SheetRow } from './sheets';

export interface MercariProduct {
  product_id: string;
  title: string;
  description: string;
  category: string;
  Tag: string;
  price: string;
  rental_price?: string; // レンタル価格（1泊2日）
  condition: string;
  Featured?: string;
  image_01?: string;
  image_02?: string;
  image_03?: string;
  image_04?: string;
  image_05?: string;
  image_06?: string;
  image_07?: string;
  image_08?: string;
  image_09?: string;
  image_10?: string;
  image_11?: string;
  image_12?: string;
  image_13?: string;
  image_14?: string;
  image_15?: string;
  image_16?: string;
}

/**
 * 画像パスを処理する
 * - https://で始まる場合はそのまま使用
 * - ローカルパスの場合は/image/プレフィックスを追加
 */
function processImagePath(imagePath: string | undefined): string | undefined {
  if (!imagePath) return undefined;
  // 外部URLの場合はそのまま返す
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // ローカルパスの場合は/image/プレフィックスを追加
  return `/image/${imagePath}`;
}

/**
 * スプレッドシートの行データをMercariProduct形式に変換
 */
function convertSheetRowToProduct(record: SheetRow): MercariProduct {
  return {
    product_id: record.product_id || '',
    title: record.title || '',
    description: record.description || '',
    category: record.category || '',
    Tag: record.Tag || '',
    price: record.price || '',
    rental_price: record['rental price'] || record.rental_price || '', // H列: rental price
    condition: record.condition || '',
    Featured: record.Featured,
    // 画像パスを処理（URLはそのまま、ローカルパスは/image/を追加）
    image_01: processImagePath(record.image_01),
    image_02: processImagePath(record.image_02),
    image_03: processImagePath(record.image_03),
    image_04: processImagePath(record.image_04),
    image_05: processImagePath(record.image_05),
    image_06: processImagePath(record.image_06),
    image_07: processImagePath(record.image_07),
    image_08: processImagePath(record.image_08),
    image_09: processImagePath(record.image_09),
    image_10: processImagePath(record.image_10),
    image_11: processImagePath(record.image_11),
    image_12: processImagePath(record.image_12),
    image_13: processImagePath(record.image_13),
    image_14: processImagePath(record.image_14),
    image_15: processImagePath(record.image_15),
    image_16: processImagePath(record.image_16),
  };
}

/**
 * CSVファイルから商品データを読み込む（フォールバック用）
 */
async function getMercariProductsFromCSV(): Promise<MercariProduct[]> {
  const csvPath = path.join(process.cwd(), 'mercari_products.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  return new Promise((resolve, reject) => {
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    }, (err, records) => {
      if (err) {
        reject(err);
        return;
      }

      const products: MercariProduct[] = records.map((record: any) => convertSheetRowToProduct(record));
      resolve(products);
    });
  });
}

/**
 * Googleスプレッドシートから商品データを取得
 * 失敗した場合はCSVからフォールバック
 */
export async function getMercariProducts(): Promise<MercariProduct[]> {
  try {
    // まずGoogleスプレッドシートからデータを取得を試みる
    const sheetData = await getMercariProductsFromSheet();
    const products = sheetData.map(convertSheetRowToProduct);
    console.log(`Loaded ${products.length} products from Google Sheets`);
    return products;
  } catch (error) {
    // スプレッドシート取得に失敗した場合はCSVにフォールバック
    console.warn('Failed to fetch from Google Sheets, falling back to CSV:', error);
    return getMercariProductsFromCSV();
  }
}

export function extractLensName(title: string): string {
  // Extract the main lens name from the title
  // Remove Japanese prefix (整＆テスト, etc.) and product IDs
  const cleanedTitle = title.replace(/^[^\w\s]+|整＆テスト\s*/g, '').trim();

  // Match lens name including hyphens (e.g., "Ai-s")
  // Pattern: Brand + model (with hyphens) + focal length + aperture details
  const match = cleanedTitle.match(/([A-Za-z\s-]+\d+mm.*?)(?:\s+\d+\s*$|\s+\d+$|$)/);
  return match ? match[1].trim() : cleanedTitle.split(' ').slice(0, 3).join(' ');
}

export function extractMountType(title: string, tags: string): string {
  if (title.includes('Nikon') || tags.includes('Nikon')) return 'F-mount';
  if (title.includes('Canon') || tags.includes('Canon')) return 'EF';
  if (title.includes('M42')) return 'M42';
  if (title.includes('Leica')) return 'L-mount';
  return 'Vintage';
}

export function formatPrice(price: string): string {
  return price.replace('¥', '¥').replace(',', ',');
}

export function parseTags(tagString: string): string[] {
  if (!tagString) return [];
  return tagString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
}

export async function getProductsByTag(tagName: string): Promise<MercariProduct[]> {
  const allProducts = await getMercariProducts();
  return allProducts.filter(product => {
    const tags = parseTags(product.Tag);
    return tags.includes(tagName);
  });
}

export async function getFeaturedProducts(): Promise<MercariProduct[]> {
  const allProducts = await getMercariProducts();
  return allProducts.filter(product => product.Featured === '1');
}

export interface LensSpecs {
  focalLength?: string;
  maxAperture?: string;
  minFocusDistance?: string;
}

export function extractLensSpecs(description: string): LensSpecs {
  const specs: LensSpecs = {};

  if (!description) return specs;

  // Remove HTML tags for easier parsing, but preserve structure
  const text = description.replace(/<[^>]*>/g, ' ');

  // Extract focal length (焦点距離)
  const focalLengthMatch = text.match(/焦点距離[：:\s]*([0-9.]+\s*mm)/i);
  if (focalLengthMatch) {
    specs.focalLength = focalLengthMatch[1].trim();
  }

  // Extract max aperture (開放F値)
  const apertureMatch = text.match(/開放F値[：:\s]*([Ff]\/?\s*[0-9.]+)/i);
  if (apertureMatch) {
    specs.maxAperture = apertureMatch[1].trim().replace(/\s+/g, '');
  }

  // Extract minimum focus distance (最短撮影距離)
  const focusDistanceMatch = text.match(/最短撮影距離[：:\s]*([約]?\s*[0-9.]+\s*[m]+)/i);
  if (focusDistanceMatch) {
    specs.minFocusDistance = focusDistanceMatch[1].trim();
  }

  return specs;
}

export const CAMERA_CATEGORY_ID = '2084305447';

export async function getSonyCameras(): Promise<MercariProduct[]> {
  const allProducts = await getMercariProducts();
  return allProducts.filter(product => product.category === CAMERA_CATEGORY_ID);
}

export async function getLenses(): Promise<MercariProduct[]> {
  const allProducts = await getMercariProducts();
  return allProducts.filter(product => product.category !== CAMERA_CATEGORY_ID);
}

export function extractCameraName(title: string): string {
  // Extract simple camera name like "SONY α7C", "SONY α6600"
  // Remove "1201回/" or other prefixes
  // Match "SONY" followed by alpha/digit chars
  const match = title.match(/SONY\s+α[0-9a-zA-Z]+/i);
  if (match) return match[0];

  // Fallback: splitting and cleaning
  const parts = title.split(' ');
  const sonyIndex = parts.findIndex(p => p.toUpperCase() === 'SONY');
  if (sonyIndex !== -1 && parts[sonyIndex + 1]) {
    return `${parts[sonyIndex]} ${parts[sonyIndex + 1]}`;
  }

  return title.substring(0, 20) + '...';
}

export async function searchProducts(query: string): Promise<MercariProduct[]> {
  const allProducts = await getMercariProducts();
  if (!query) return allProducts;

  // Split query by half-width or full-width spaces
  const keywords = query.trim().split(/[\s　]+/);

  return allProducts.filter((product) => {
    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();
    const tag = product.Tag.toLowerCase();

    // Check if EVERY keyword is contained in at least one of the fields (AND search)
    return keywords.every((keyword) => {
      const lowerKeyword = keyword.toLowerCase();
      return (
        title.includes(lowerKeyword) ||
        description.includes(lowerKeyword) ||
        tag.includes(lowerKeyword)
      );
    });
  });
}

export async function searchLenses(query: string): Promise<MercariProduct[]> {
  const allLenses = await getLenses();
  if (!query) return allLenses;

  const keywords = query.trim().split(/[\s　]+/);

  return allLenses.filter((product) => {
    const title = product.title.toLowerCase();
    const description = product.description.toLowerCase();
    const tag = product.Tag.toLowerCase();

    return keywords.every((keyword) => {
      const lowerKeyword = keyword.toLowerCase();
      return (
        title.includes(lowerKeyword) ||
        description.includes(lowerKeyword) ||
        tag.includes(lowerKeyword)
      );
    });
  });
}
