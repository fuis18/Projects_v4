import { API_URL } from "@/config";
export async function generateMetadata() {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  let meta = data[0][2];
  return {
    title: meta,
    // description: `Conectado a la API en ${API_URL}`,
    // Otros metadatos que desees incluir
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
