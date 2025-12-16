import fs from 'fs';
import path from 'path';
import { getMercariProductsFromSheet, SheetRow } from './sheets';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  status: string;
  category: string;
  tags: string[];
  images: string[];
  shippingMethod?: string;
  shippingPayer?: string;
  shippingOrigin?: string;
  shippingDays?: string;
}

/**
 * Parse CSV line respecting quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);

  return result.map(field => field.trim());
}

/**
 * Parse price string to number (e.g., "¥14,800" -> 14800)
 */
function parsePrice(priceStr: string): number {
  if (!priceStr) return 0;
  const cleanPrice = priceStr.replace(/[¥,]/g, '');
  return parseInt(cleanPrice, 10) || 0;
}

/**
 * Parse tags from comma-separated string (e.g., "オールドレンズ,Nikon,大口径" -> ["オールドレンズ", "Nikon", "大口径"])
 */
function parseTags(tagStr: string): string[] {
  if (!tagStr || !tagStr.trim()) return [];
  return tagStr.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
}

/**
 * Get all product images for a product
 */
function getProductImages(row: any, productTitle: string): string[] {
  const images: string[] = [];

  // Check image columns (image_01 through image_20)
  for (let i = 1; i <= 20; i++) {
    const imageKey = `image_${i.toString().padStart(2, '0')}`;
    const imagePath = row[imageKey];

    if (imagePath && imagePath.trim()) {
      // 外部URLの場合はそのまま使用
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        images.push(imagePath);
      } else if (imagePath.startsWith('product_images/')) {
        // ローカルパスの場合は/image/プレフィックスを追加
        images.push(`/image/${imagePath}`);
      } else {
        images.push(imagePath);
      }
    }
  }

  return images;
}

/**
 * スプレッドシートまたはCSVの行データをProduct形式に変換
 */
function convertRowToProduct(row: any): Product {
  return {
    id: row.product_id,
    title: row.title || '',
    description: row.description || '',
    price: parsePrice(row.price),
    condition: row.condition || '',
    status: row.status || '',
    category: row.category || '',
    tags: parseTags(row.Tag || ''),
    images: getProductImages(row, row.title),
    shippingMethod: row.shipping_method,
    shippingPayer: row.shipping_payer,
    shippingOrigin: row.shipping_origin,
    shippingDays: row.shipping_days,
  };
}

/**
 * CSVファイルから商品データを読み込む（フォールバック用）
 */
async function getProductsFromCSV(): Promise<Product[]> {
  try {
    const csvPath = path.join(process.cwd(), 'mercari_products.csv');
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());

    if (lines.length < 2) {
      return [];
    }

    // Parse header
    const headers = parseCSVLine(lines[0]);

    // Parse data rows
    const products: Product[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);

      if (values.length < headers.length) {
        continue; // Skip invalid rows
      }

      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });

      // Skip if no product_id
      if (!row.product_id) continue;

      products.push(convertRowToProduct(row));
    }

    return products;
  } catch (error) {
    console.error('Error reading CSV:', error);
    return [];
  }
}

/**
 * Googleスプレッドシートから商品データを取得
 * 失敗した場合はCSVからフォールバック
 */
export async function getProducts(): Promise<Product[]> {
  try {
    // まずGoogleスプレッドシートからデータを取得を試みる
    const sheetData = await getMercariProductsFromSheet();
    const products = sheetData
      .filter(row => row.product_id && row.product_id.trim())
      .map(convertRowToProduct);
    console.log(`Loaded ${products.length} products from Google Sheets`);
    return products;
  } catch (error) {
    // スプレッドシート取得に失敗した場合はCSVにフォールバック
    console.warn('Failed to fetch from Google Sheets, falling back to CSV:', error);
    return getProductsFromCSV();
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.category === category);
}

/**
 * Get products by tag
 */
export async function getProductsByTag(tag: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter(p => p.tags.includes(tag));
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString('ja-JP')}`;
}

/**
 * Get condition label in Japanese
 */
export function getConditionLabel(condition: string): string {
  const conditionMap: { [key: string]: string } = {
    'new': '新品・未使用',
    'like_new': '未使用に近い',
    'excellent': '目立った傷や汚れなし',
    'good': 'やや傷や汚れあり',
    'fair': '傷や汚れあり',
    'poor': '全体的に状態が悪い',
  };
  return conditionMap[condition] || condition;
}

/**
 * Yahoo Auction category ID to category name mapping
 */
const CATEGORY_ID_MAP: { [key: string]: string } = {
  // MFレンズ
  '2084261697': 'コンタックスMFレンズ',
  '2084261696': 'オリンパスMFレンズ',
  '2084261692': 'キャノンMFレンズ',
  '2084261693': 'ニコンMFレンズ',
  '2084261694': 'ペンタックスMFレンズ',
  '2084261695': 'ミノルタMFレンズ',
  '2084261698': 'ライカMFレンズ',
  '2084261699': 'マミヤMFレンズ',
  '2084261700': 'その他MFレンズ',

  // AFレンズ
  '2084261687': 'オリンパスAFレンズ',
  '2084261683': 'キャノンAFレンズ',
  '2084261684': 'ニコンAFレンズ',
  '2084261685': 'ペンタックスAFレンズ',
  '2084261686': 'ソニー・ミノルタAFレンズ',
  '2084261688': 'パナソニックAFレンズ',
  '2084261689': 'コンタックスAFレンズ',
  '2084261690': 'その他AFレンズ',

  // ミラーレス
  '2084305448': 'オリンパスミラーレス',
  '2084305444': 'キャノンミラーレス',
  '2084305445': 'ニコンミラーレス',
  '2084305446': 'ペンタックスミラーレス',
  '2084305447': 'SONYミラーレス',
  '2084305449': 'パナソニックミラーレス',
  '2084305450': '富士フィルムミラーレス',
  '2084305451': 'その他ミラーレス',

  // デジタル一眼
  '2084261639': 'オリンパスデジタル一眼',
  '2084261635': 'キャノンデジタル一眼',
  '2084261636': 'ニコンデジタル一眼',
  '2084261637': 'ペンタックスデジタル一眼',
  '2084261638': 'ソニー・ミノルタデジタル一眼',
  '2084261640': 'パナソニックデジタル一眼',
  '2084261641': 'その他デジタル一眼',

  // フィルム一眼
  '2084044781': 'オリンパスフィルム一眼',
  '2084044777': 'キャノンフィルム一眼',
  '2084044785': 'ニコンフィルム一眼',
  '2084044780': 'ペンタックスフィルム一眼',
  '2084044779': 'ソニー・ミノルタフィルム一眼',
  '2084044782': 'コンタックスフィルム一眼',
  '2084044783': 'ライカフィルム一眼',
  '2084044776': 'その他フィルム一眼',

  // アクセサリー他
  '2084261963': '三脚',
  '2084261982': '保護フィルター',
  '2084261985': 'NDフィルター',
  '2084261984': 'PLフィルター',
  '23760': 'その他',
};

/**
 * Get category name from Yahoo Auction category ID
 */
export function getCategoryName(categoryId: string): string {
  if (!categoryId) return '';
  return CATEGORY_ID_MAP[categoryId.trim()] || categoryId;
}
