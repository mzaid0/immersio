// import Sidebar from "@/components/dashboard/sidebar";
// import DashboardHeader from "@/components/dashboard/header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen ">
            <div className="flex">
                {/* <Sidebar /> */}
                <div className="flex-1 flex flex-col">
                    {/* <DashboardHeader /> */}
                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}