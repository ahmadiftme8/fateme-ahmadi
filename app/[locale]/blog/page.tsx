import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "blog" });

    return {
        title: "Blog - Fateme Ahmadi",
    };
}

export default function BlogPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            width: '100%',
            marginTop: '100px'
        }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                fontFamily: 'var(--font-outfit), sans-serif',
                textAlign: 'center'
            }}>
                Coming Soon
            </h1>
        </div>
    );
}
