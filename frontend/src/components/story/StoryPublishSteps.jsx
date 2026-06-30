const steps = [
  {
    number: "01",
    title: "Write Your Story",
    description:
      "Craft your narrative — whether it's a short story, novel, or episodic chronicle. Every great journey starts with a single chapter."
  },
  {
    number: "02",
    title: "Format & Upload",
    description:
      "Upload your text, add a compelling cover image, write a hook summary, and set your chapter structure."
  },
  {
    number: "03",
    title: "Set Your Details",
    description:
      "Add genre, tags, content warnings, language, and choose free or premium access for your readers."
  },
  {
    number: "04",
    title: "Publish & Grow",
    description:
      "Release your story to the world, collect reviews and ratings, and build a loyal reader community."
  }
];

const StoryPublishSteps = () => {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
        How To Publish Your Story
      </h2>
      <p className="text-center text-gray-500 text-sm mb-16 max-w-xl mx-auto">
        From first draft to final page — follow these four steps to share your narrative with readers around the world.
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group border border-orange-500/15 rounded-2xl p-6 bg-orange-500/5 backdrop-blur-sm hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-300"
          >
            <span className="text-4xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {step.number}
            </span>

            <h3 className="text-xl font-bold mt-3 text-white group-hover:text-orange-200 transition-colors">
              {step.title}
            </h3>

            <p className="text-gray-400 mt-2 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoryPublishSteps;
