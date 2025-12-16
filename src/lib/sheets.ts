import { google } from 'googleapis';

// スプレッドシートID（URLから抽出）
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID || '1u9dhj-OYoDlpv3tmFnESGWs9R-M2aIiHQ4gPEZ0F2RU';

// キャッシュ設定
let cachedData: any[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5分間キャッシュ

export interface SheetRow {
    [key: string]: string;
}

/**
 * Google Sheets APIからスプレッドシートのデータを取得する
 * @param sheetName シート名（デフォルト: 最初のシート）
 * @returns スプレッドシートのデータ（オブジェクト配列）
 */
export async function getSheetData(sheetName?: string): Promise<SheetRow[]> {
    // キャッシュが有効な場合はキャッシュを返す
    const now = Date.now();
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION_MS) {
        console.log('Using cached sheet data');
        return cachedData;
    }

    const apiKey = process.env.GOOGLE_SHEETS_API_KEY;

    if (!apiKey) {
        console.warn('GOOGLE_SHEETS_API_KEY is not set. Please set it in your .env file.');
        throw new Error('Google Sheets API key is not configured');
    }

    try {
        const sheets = google.sheets({ version: 'v4', auth: apiKey });

        // シートのデータを取得
        const range = sheetName ? `${sheetName}` : 'A:ZZ';
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.warn('No data found in spreadsheet');
            return [];
        }

        // ヘッダー行を取得
        const headers = rows[0] as string[];

        // データ行をオブジェクトに変換
        const data: SheetRow[] = [];
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const rowData: SheetRow = {};

            headers.forEach((header, index) => {
                rowData[header] = row[index] || '';
            });

            // 空行をスキップ（product_idがない行）
            if (rowData.product_id && rowData.product_id.trim()) {
                data.push(rowData);
            }
        }

        // キャッシュを更新
        cachedData = data;
        cacheTimestamp = now;

        console.log(`Fetched ${data.length} rows from Google Sheets`);
        return data;

    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        throw error;
    }
}

/**
 * キャッシュをクリアする
 */
export function clearSheetCache(): void {
    cachedData = null;
    cacheTimestamp = 0;
    console.log('Sheet cache cleared');
}

/**
 * スプレッドシートからMercariProduct形式のデータを取得する
 */
export async function getMercariProductsFromSheet(): Promise<SheetRow[]> {
    return getSheetData();
}
