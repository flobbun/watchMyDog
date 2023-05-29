const fetcher = async ({
  url,
  method = "post",
  body,
}: {
  url: string;
  method?: "post" | "get";
  body?: any;
}) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "post" ? JSON.stringify(body) : undefined,
    });
    return await res.json();
  } catch (error) {
    if (error) {
      // ...
    }
  }
};

export default fetcher;
