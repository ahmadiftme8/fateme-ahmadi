import { google } from "googleapis";

export async function getSheetData() {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error("Missing Google Sheets credentials in environment variables.");
            return [];
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = "1xrOfLGzPUofmJgeNBicavmned5DAEA7Q56DVrn8fClU";
        const range = "Sheet1!A1:Z";

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        // Extract headers (first row) and data
        const headers = rows[0];
        const rawData = rows.slice(1);

        const processedData = rawData
            .map((row) => {
                const rowObject: { [key: string]: string } = {};
                headers.forEach((header, index) => {
                    rowObject[header] = row[index] || ""; // Handle empty cells
                });
                return rowObject;
            })
            .filter((item) => {
                // Filter by is_featured = TRUE (case insensitive)
                const isFeatured = item["is_featured"]?.toString().toUpperCase() === "TRUE";
                return isFeatured;
            });

        return processedData;
    } catch (error) {
        console.error("Google Sheets API Error:", error);
        return [];
    }
}
