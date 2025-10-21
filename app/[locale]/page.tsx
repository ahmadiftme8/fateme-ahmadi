// app/[locale]/page.tsx
export default function HomePage({ params }: { params: { locale: string } }) {
  return (
    <main style={{ padding: 20 }}>
      <h1>Hello from {params.locale.toUpperCase()} version!</h1>
    </main>
  );
}
