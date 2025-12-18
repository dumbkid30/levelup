"use client";

export default function StatsSection() {
  const stats = [
    {
      number: "20K+",
      label: "Students Assisted",
    },
    {
      number: "30+",
      label: "Years of Combined Experience",
    },
    {
      number: "100+",
      label: "Industry Experts",
    },
    {
      number: "500+",
      label: "Universities",
    },
  ];

  return (
    <section className="bg-black text-white py-16 relative overflow-hidden">
      {/* Decorative orange stripes */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-orange-500 to-orange-400 transform -skew-x-12 -translate-x-16"></div>

      {/* Decorative plus sign */}
      <div className="absolute bottom-8 left-8 text-orange-500 text-6xl font-light opacity-30">+</div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center relative"
            >
              <div className="text-4xl lg:text-6xl font-bold mb-2 text-white">
                {stat.number}
              </div>
              <div className="text-sm lg:text-base text-gray-300 max-w-[120px] mx-auto leading-tight">
                {stat.label}
              </div>

              {/* Divider line (not shown on last item) */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-16 bg-gray-600"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}