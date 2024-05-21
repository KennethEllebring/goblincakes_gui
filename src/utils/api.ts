export interface FetchOptions {
    method?: "GET" | "POST" | "PATCH" | "DELETE";
    body?: BodyInit | null;
    headers?: HeadersInit;
    credentials?: RequestCredentials;
}

export async function fetchData<T>(
    url: string,
    options?: FetchOptions,
): Promise<T> {
    try {
        const method = options?.method || "GET";

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            body:
                method !== "GET" && method !== "DELETE" ? options?.body : null,
            credentials: options?.credentials || "same-origin",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return (await response.json()) as T;
        } else {
            throw new Error("Received non-JSON response from server");
        }
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
}
