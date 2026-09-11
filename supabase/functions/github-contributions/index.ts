const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username") || "audhee";

    const response = await fetch(
      `https://github.com/${username}?tab=contributions`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioBot/1.0)",
          Accept: "text/html",
        },
      }
    );

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `GitHub returned ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = await response.text();

    // Extract all contribution day cells from the SVG graph
    // Each day is: <rect class="ContributionCalendar-day" data-date="YYYY-MM-DD" data-count="N" ... fill="..."/>
    const dayRegex =
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g;

    const days: { date: string; count: number }[] = [];
    let match: RegExpExecArray | null;

    while ((match = dayRegex.exec(html)) !== null) {
      days.push({
        date: match[1],
        count: parseInt(match[2], 10),
      });
    }

    // Extract the total contributions text, e.g. "1,234 contributions in the last year"
    const totalMatch = html.match(
      /(\d[\d,]*)\s+contributions?\s+in\s+(?:the\s+last\s+year|\d{4})/i
    );
    const totalContributions = totalMatch
      ? parseInt(totalMatch[1].replace(/,/g, ""), 10)
      : days.reduce((sum, d) => sum + d.count, 0);

    return new Response(
      JSON.stringify({
        username,
        totalContributions,
        days,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
