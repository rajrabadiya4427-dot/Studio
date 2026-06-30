const steps = [
  {
    number: "01",
    title: "Prepare Your Game",
    description:
      "Make sure your game files, screenshots, trailer, and description are ready."
  },
  {
    number: "02",
    title: "Upload Content",
    description:
      "Upload your game build, cover image, screenshots, and gameplay videos."
  },
  {
    number: "03",
    title: "Add Details",
    description:
      "Provide game information, genre, platform, requirements, and pricing."
  },
  {
    number: "04",
    title: "Submit & Publish",
    description:
      "Review everything and publish your game for players around the world."
  }
];

const PublishSteps = () => {
  return (
    <section className="py-20 px-6">
      {/* Heading – Gradient */}
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
        How To Publish Your Game
      </h2>

      {/* Subtitle */}
      <p className="text-center text-gray-500 text-sm mb-16 max-w-xl mx-auto">
        From development to launch — follow these four steps to get your game in front of players around the world.
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group border border-orange-500/15 rounded-2xl p-6 bg-orange-500/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
          >
            {/* Number – Gradient */}
            <span className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {step.number}
            </span>

            {/* Title – White with hover effect */}
            <h3 className="text-xl font-bold mt-3 text-white group-hover:text-orange-200 transition-colors">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PublishSteps;