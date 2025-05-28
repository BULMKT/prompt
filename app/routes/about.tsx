import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'About PromptoType.ai' },
    { name: 'description', content: 'Learn about PromptoType.ai - the AI-powered prototyping platform for non-technical founders' },
  ];
};

export const loader = () => json({});

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-bolt-elements-textPrimary mb-6 text-center">About PromptoType.ai</h1>
          
          <section className="mb-12 bg-bolt-elements-background-depth-2 rounded-lg p-8 shadow-sm border border-bolt-elements-borderColor">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-4">Our Mission</h2>
            <p className="text-bolt-elements-textSecondary mb-6 text-lg">
              PromptoType.ai was created with a simple but powerful mission: to democratize the startup building process 
              by enabling anyone to quickly create, test, and validate their ideas without writing a single line of code.
            </p>
            <p className="text-bolt-elements-textSecondary">
              We believe that great ideas can come from anywhere, but technical barriers often prevent non-technical founders 
              from bringing their visions to life. PromptoType.ai removes these barriers by leveraging AI to transform plain 
              English descriptions into working prototypes in minutes, not weeks or months.
            </p>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                number={1} 
                title="Describe Your Idea" 
                description="Tell us what you're building, who it's for, and what problem it solves."
              />
              <FeatureCard 
                number={2} 
                title="Choose a Template" 
                description="Select from our gallery of proven startup templates or let us recommend one."
              />
              <FeatureCard 
                number={3} 
                title="Build & Validate" 
                description="Get a working prototype in minutes and start collecting sign-ups right away."
              />
            </div>
          </section>
          
          <section className="mb-12 bg-bolt-elements-background-depth-2 rounded-lg p-8 shadow-sm border border-bolt-elements-borderColor">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-4">Why Choose PromptoType.ai?</h2>
            <div className="space-y-4">
              <BenefitItem 
                icon="i-ph:clock-counter-clockwise-duotone" 
                title="Save Time" 
                description="Go from idea to prototype in under 10 minutes instead of weeks or months."
              />
              <BenefitItem 
                icon="i-ph:currency-dollar-duotone" 
                title="Save Money" 
                description="No need to hire developers or designers for your initial prototype."
              />
              <BenefitItem 
                icon="i-ph:pencil-simple-duotone" 
                title="No Coding Required" 
                description="Describe your idea in plain English and let our AI handle the technical details."
              />
              <BenefitItem 
                icon="i-ph:chart-line-up-duotone" 
                title="Validate Faster" 
                description="Start collecting feedback and building your waitlist immediately."
              />
              <BenefitItem 
                icon="i-ph:devices-duotone" 
                title="Real Working Prototypes" 
                description="Not just mockups—fully interactive applications you can share and test."
              />
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">Our Technology</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <TechCard 
                icon="i-ph:brain-duotone" 
                title="Advanced AI" 
                description="Powered by cutting-edge AI models that understand your requirements and generate appropriate code."
              />
              <TechCard 
                icon="i-ph:cube-duotone" 
                title="WebContainer Technology" 
                description="Run full-stack applications directly in your browser with no servers or complex setup."
              />
              <TechCard 
                icon="i-ph:template-duotone" 
                title="Proven Templates" 
                description="Start with battle-tested templates designed for common startup use cases."
              />
              <TechCard 
                icon="i-ph:code-duotone" 
                title="Modern Web Stack" 
                description="Built on Remix, React, and other modern web technologies for optimal performance."
              />
            </div>
          </section>
          
          <section className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-6">Ready to Build Your Prototype?</h2>
            <p className="text-bolt-elements-textSecondary mb-8 max-w-2xl mx-auto">
              Join hundreds of founders who have already brought their ideas to life with PromptoType.ai.
              No coding required. Go from idea to working prototype in minutes, not weeks.
            </p>
            <Link
              to="/wizard"
              className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 px-8 rounded-lg inline-block"
            >
              Get Started for Free
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg shadow-sm border border-bolt-elements-borderColor relative">
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3 mt-2 text-bolt-elements-textPrimary">{title}</h3>
      <p className="text-bolt-elements-textSecondary">{description}</p>
    </div>
  );
}

function BenefitItem({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex items-start">
      <div className={`${icon} text-2xl text-accent-500 mr-4 mt-1`}></div>
      <div>
        <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-1">{title}</h3>
        <p className="text-bolt-elements-textSecondary">{description}</p>
      </div>
    </div>
  );
}

function TechCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-bolt-elements-background-depth-2 p-6 rounded-lg shadow-sm border border-bolt-elements-borderColor">
      <div className={`${icon} text-3xl text-accent-500 mb-4`}></div>
      <h3 className="text-xl font-semibold mb-2 text-bolt-elements-textPrimary">{title}</h3>
      <p className="text-bolt-elements-textSecondary">{description}</p>
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