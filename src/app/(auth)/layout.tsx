import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 h-full">
        {/* Left section - Background Image */}
        <div className="relative flex-1 hidden lg:block">
          <Image
            src="/hotel-bg.jpg"
            alt="Hotel background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Right section - White panel */}
        <div className="w-full lg:w-[35%] bg-white flex flex-col justify-center p-10 shadow-lg">
          <div className="max-w-md w-full mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
