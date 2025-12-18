"use client";

export default function CollaborationsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-lg text-gray-600 mb-4">Our Collaborations</h2>
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 max-w-4xl mx-auto">
            We don't just teach. We connect you with the best in the industry.
          </h3>
        </div>

        {/* Placeholder for company logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-70">
          <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">Partner Logo</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">Partner Logo</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">Partner Logo</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">Partner Logo</span>
          </div>
          <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm font-medium">Partner Logo</span>
          </div>
        </div>
      </div>
    </section>
  );
}