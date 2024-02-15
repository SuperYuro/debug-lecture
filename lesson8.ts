import { serve } from "https://deno.land/std@0.215.0/http/server.ts";

export function Lesson8() {
  const server = serve({ port: 8000 });
  console.log("http://localhost:8000/ でサーバーが起動しています");

  for await (const req of server) {
    const url = req.url;
    if (url === "/") {
      req.respond({ body: "Hello World\n" });
    } else if (url.startsWith("/welcome")) {
      const params = new URLSearchParams(url.slice(8));
      const name = params.get("name");
      req.respond({ body: `Welcome ${name}\n` });
    } else {
      req.respond({ status: 404, body: "Not Found\n" });
    }
  }
}
