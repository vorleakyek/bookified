import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="rounded-[28px] bg-[var(--bg-secondary)] p-7 sm:p-10 lg:p-12 shadow-[var(--shadow-soft-lg)] wrapper mb-10 md:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
        {/* Left column */}
        <div className="space-y-5 lg:space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-[var(--text-primary)]">
            Your Library
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl">
            Convert your books into interactive AI conversations. Listen, learn,
            and discuss your favorite reads from one place.
          </p>
          <Link
            href="/books/new"
            className="library-cta-primary mt-4 flex items-center justify-center"
          >
            <span className="text-3xl font-light mb-1 mr-2">+</span>
            <span className="text-[#212a3b]">Add new book</span>
          </Link>
        </div>

        {/* Center column */}
        <div className="relative py-8 lg:py-0 flex justify-center">
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-none lg:w-auto">
            <Image
              src="/assets/hero-illustration.png"
              alt="Vintage books and globe illustration"
              width={420}
              height={320}
              className="mx-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right column */}
        <div className="rounded-2xl bg-white p-5 sm:p-6 shadow-[var(--shadow-soft)] border border-[var(--border-subtle)]">
          <h2 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">
            How it works
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-semibold text-white">
                1
              </span>
              <p className="text-sm text-[var(--text-secondary)]">
                Upload PDF book file
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-semibold text-white">
                2
              </span>
              <p className="text-sm text-[var(--text-secondary)]">
                AI processing and analysis
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[var(--color-brand)] text-xs font-semibold text-white">
                3
              </span>
              <p className="text-sm text-[var(--text-secondary)]">
                Voice chat and discussion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
