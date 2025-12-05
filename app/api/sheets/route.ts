import { getSheetData } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await getSheetData();
    return NextResponse.json({ data }, { status: 200 });
}
