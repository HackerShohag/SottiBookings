import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bus Ticket Booking Service",
    description: "Bus Ticket Booking Service | Shotti Bookings"
};


export default function BusServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block text-center justify-center">
                {children}
            </div>
        </section>
    );
}
