import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'PromptoType.ai - From Idea to Prototype in Minutes' },
    { name: 'description', content: 'Turn your ideas into working prototypes without writing code' },
  ];
};

export const loader = () => json({});

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-bolt-elements-textPrimary">
            From Idea to Prototype in <span className="text-accent-500">Minutes</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10 text-bolt-elements-textSecondary">
            PromptoType.ai helps non-technical founders build and validate their ideas without writing a single line of
            code.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/wizard"
              className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 px-8 rounded-lg text-lg"
            >
              Start Building
            </Link>
            <Link
              to="/showcase"
              className="bg-bolt-elements-button-secondary-background hover:bg-bolt-elements-button-secondary-backgroundHover text-bolt-elements-button-secondary-text font-medium py-3 px-8 rounded-lg text-lg"
            >
              Explore Showcase
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-bolt-elements-background-depth-2">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-bolt-elements-textPrimary">
              How PromptoType.ai Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="i-ph:lightbulb-duotone"
                title="Describe Your Idea"
                description="Tell us what you're building, who it's for, and what problem it solves."
              />
              <FeatureCard
                icon="i-ph:template-duotone"
                title="Choose a Template"
                description="Select from our gallery of proven startup templates or let us recommend one."
              />
              <FeatureCard
                icon="i-ph:rocket-launch-duotone"
                title="Build & Validate"
                description="Get a working prototype in minutes and start collecting sign-ups right away."
              />
            </div>
          </div>
        </section>

        {/* Templates Preview */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-2 text-center text-bolt-elements-textPrimary">
              Ready-to-Use Templates
            </h2>
            <p className="text-center text-bolt-elements-textSecondary mb-12 max-w-2xl mx-auto">
              Start with one of our proven templates, tailored for different types of startups and use cases.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TemplateCard
                name="Marketplace"
                description="Two-sided platform for buyers and sellers"
                image="https://images.pexels.com/photos/5833754/pexels-photo-5833754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <TemplateCard
                name="SaaS Dashboard"
                description="User portal for subscription services"
                image="https://images.pexels.com/photos/8391440/pexels-photo-8391440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              <TemplateCard
                name="Booking Platform"
                description="Appointment and reservation system"
                image="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
            </div>
            <div className="text-center mt-8">
              <Link
                to="/templates"
                className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium"
              >
                View all templates
                <div className="i-ph:arrow-right ml-1"></div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-bolt-elements-background-depth-2">
          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-4xl font-bold mb-6 text-bolt-elements-textPrimary">Ready to Build Your Prototype?</h2>
            <p className="text-xl mb-10 text-bolt-elements-textSecondary">
              No coding required. Go from idea to working prototype in minutes, not weeks.
            </p>
            <Link
              to="/wizard"
              className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 px-8 rounded-lg text-lg"
            >
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-bolt-elements-background-depth-1 p-6 rounded-lg shadow-sm border border-bolt-elements-borderColor">
      <div className={`${icon} text-4xl text-accent-500 mb-4`}></div>
      <h3 className="text-xl font-semibold mb-2 text-bolt-elements-textPrimary">{title}</h3>
      <p className="text-bolt-elements-textSecondary">{description}</p>
    </div>
  );
}

function TemplateCard({ name, description, image }: { name: string; description: string; image: string }) {
  return (
    <div className="bg-bolt-elements-background-depth-1 rounded-lg shadow-sm border border-bolt-elements-borderColor overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1 text-bolt-elements-textPrimary">{name}</h3>
        <p className="text-sm text-bolt-elements-textSecondary mb-4">{description}</p>
        <Link
          to={`/wizard?template=${name.toLowerCase()}`}
          className="text-accent-500 hover:text-accent-600 text-sm font-medium inline-flex items-center"
        >
          Use this template
          <div className="i-ph:arrow-right ml-1"></div>
        </Link>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-bolt-elements-background-depth-1 border-t border-bolt-elements-borderColor py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="i-ph:rocket-launch text-accent-500 text-2xl mr-2"></div>
              <span className="text-xl font-bold text-bolt-elements-textPrimary">PromptoType.ai</span>
            </div>
            <p className="text-sm text-bolt-elements-textSecondary mt-2">From idea to prototype in minutes</p>
          </div>
          <div className="flex gap-6">
            <Link to="/about" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">
              About
            </Link>
            <Link to="/templates" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">
              Templates
            </Link>
            <Link to="/showcase" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary">
              Showcase
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-bolt-elements-borderColor text-center text-sm text-bolt-elements-textTertiary">
          © {new Date().getFullYear()} PromptoType.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}