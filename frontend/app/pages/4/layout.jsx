import { API_URL } from "@/config";
export async function generateMetadata() {
  let response;
  try {
    response = await fetch(`${API_URL}/`);
  } catch {
    return {};
  }
  const data = await response.json();
  let meta = data[0][4];
  return {
    title: meta,
    // description: `Conectado a la API en ${API_URL}`,
    // Otros metadatos que desees incluir
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
