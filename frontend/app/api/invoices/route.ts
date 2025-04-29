export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);

  const newinvoice = {
    id: 1,
    ...body,
  };

  return new Response(JSON.stringify(newinvoice), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
