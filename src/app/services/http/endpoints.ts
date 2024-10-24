// app/endpoints.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Função para pegar apenas o que vem após a última barra
export const cleanHttptUrl = (nextUrl: string | null): string | null => {
    if (!nextUrl) return null; // Caso não tenha URL, retorna null

    const lastIndex = nextUrl.lastIndexOf("/"); // Encontra o último índice da barra "/"
    return nextUrl.substring(lastIndex + 1); // Retorna apenas o que está após a última "/"
};
