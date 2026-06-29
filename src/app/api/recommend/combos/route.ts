export async function POST(request: Request) {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    return Response.json(
      { detail: "API_BASE_URL 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `${apiBaseUrl.replace(/\/$/, "")}/recommend/combos`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: await request.text(),
        cache: "no-store",
      },
    );

    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch {
    return Response.json(
      { detail: "추천 서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }
}
