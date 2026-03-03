export async function onRequestGet({ request, env }) {
  const authHeader = request.headers.get("Authorization");
  const expectedAuth = `Bearer ${env.AUTH_TOKEN}`;

  // Validate the token
  if (!authHeader || authHeader !== expectedAuth) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Return the secret payload securely
  return new Response(env.ENCRYPTION_KEY, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    }
  });
}
