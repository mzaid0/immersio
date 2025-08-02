export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen ">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}