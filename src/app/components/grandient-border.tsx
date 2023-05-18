export function GradientBorder({ children, className }: { children: React.ReactNode; className: string }) {
    return (
        <div className={`${className}`}>
            <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-blue-500 p-1">
                <div className={`${className} bg-gray-800 p-5`}>
                    {children}
                </div>
            </div>
        </div>
    );
}
