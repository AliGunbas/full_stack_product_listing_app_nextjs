import { NextResponse } from "next/server";
import * as h from "./helper"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Tüm sorgu parametrelerini bir obje olarak topla
  const queryParams: { [key: string]: string | number } = {};
  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  const productsResult = await h.filterProducts(queryParams)

  const response = NextResponse.json(productsResult);

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
