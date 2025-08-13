import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/header";
import Providers from "@/components/providers";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Providers>{children}</Providers>
            </main>
            <Footer />
        </div>
    );
}