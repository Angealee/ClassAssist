import type { EnrolledStudent, EnrollmentImportResult } from '../types';

/**
 * Parses a plain CSV text (from .csv file) into EnrolledStudent[]
 * Expected columns (case-insensitive, order flexible):
 *   Student ID | Last Name | First Name | Middle Name (optional) | Email (optional)
 */
export function parseCSV(text: string): EnrollmentImportResult {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return { success: [], errors: [{ row: 0, reason: 'File is empty or has no data rows.' }], total: 0 };
  }

  // Normalize header
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, ''));

  const colIndex = (variants: string[]): number => {
    for (const v of variants) {
      const i = headers.findIndex(h => h.includes(v));
      if (i !== -1) return i;
    }
    return -1;
  };

  const idCol         = colIndex(['studentid', 'id', 'studid']);
  const lastCol       = colIndex(['lastname', 'last', 'surname']);
  const firstCol      = colIndex(['firstname', 'first', 'given']);
  const middleCol     = colIndex(['middlename', 'middle', 'mi']);
  const emailCol      = colIndex(['email', 'mail']);

  const success: EnrolledStudent[] = [];
  const errors: { row: number; reason: string }[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(',').map(c => c.trim());

    const studentId = idCol >= 0 ? cols[idCol] : '';
    const lastName  = lastCol >= 0 ? cols[lastCol] : '';
    const firstName = firstCol >= 0 ? cols[firstCol] : '';

    if (!studentId || !lastName || !firstName) {
      errors.push({ row: i + 1, reason: `Row ${i + 1}: Missing required field (Student ID, Last Name, or First Name).` });
      continue;
    }

    success.push({
      studentId,
      lastName,
      firstName,
      middleName: middleCol >= 0 ? (cols[middleCol] || undefined) : undefined,
      email:      emailCol  >= 0 ? (cols[emailCol]  || undefined) : undefined,
    });
  }

  return { success, errors, total: lines.length - 1 };
}

/**
 * Parses XLSX file using SheetJS (must be loaded via CDN or installed).
 * Accepts an ArrayBuffer from FileReader.
 * Falls back gracefully if XLSX is not available.
 */
export async function parseXLSX(buffer: ArrayBuffer): Promise<EnrollmentImportResult> {
  try {
    // Dynamic import for SheetJS - works if installed via npm or CDN
    const XLSX = await import('xlsx');
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert to CSV then reuse parser
    const csv: string = XLSX.utils.sheet_to_csv(sheet);
    return parseCSV(csv);
  } catch {
    return {
      success: [],
      errors: [{ row: 0, reason: 'Could not parse Excel file. Try saving as CSV and importing that instead.' }],
      total: 0,
    };
  }
}

/**
 * Main entry point — detects file type and parses accordingly
 */
export async function parseEnrollmentFile(file: File): Promise<EnrollmentImportResult> {
  const name = file.name.toLowerCase();

  if (name.endsWith('.csv')) {
    const text = await file.text();
    return parseCSV(text);
  }

  if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
    const buffer = await file.arrayBuffer();
    return parseXLSX(buffer);
  }

  return {
    success: [],
    errors: [{ row: 0, reason: 'Unsupported file type. Please upload a .csv or .xlsx file.' }],
    total: 0,
  };
}