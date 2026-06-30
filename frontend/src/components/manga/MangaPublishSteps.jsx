const steps = [
  {
    number: "01",
    title: "Create Your Panels",
    description:
      "Design your manga panels, pages, and cover art. Export in high-resolution for maximum quality."
  },
  {
    number: "02",
    title: "Upload Your Work",
    description:
      "Upload your manga pages, cover image, chapter previews, and descriptive details."
  },
  {
    number: "03",
    title: "Set Up Your Series",
    description:
      "Organize chapters, add genres, tags, age rating, and choose between free or premium access."
  },
  {
    number: "04",
    title: "Publish & Share",
    description:
      "Go live and let the community discover, read, rate, and share your manga worldwide."
  }
];

const MangaPublishSteps = () => {
  return (
    <section className="py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        How To Publish Your Manga
      </h2>
      <p className="text-center text-gray-500 text-sm mb-16 max-w-xl mx-auto">
        From first sketch to final chapter — follow these four steps to share your story with the world.
      </p>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group border border-purple-500/15 rounded-2xl p-6 bg-purple-500/5 backdrop-blur-sm hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300"
          >
            <span className="text-4xl font-black bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {step.number}
            </span>

            <h3 className="text-xl font-bold mt-3 text-white group-hover:text-purple-200 transition-colors">
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

export default MangaPublishSteps;
