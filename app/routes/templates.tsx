import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'PromptoType.ai - Template Gallery' },
    { name: 'description', content: 'Explore our pre-built templates to kickstart your prototype' },
  ];
};

export const loader = () => json({});

export default function Templates() {
  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-bolt-elements-textPrimary mb-4">Template Gallery</h1>
            <p className="text-xl text-bolt-elements-textSecondary max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates to jumpstart your prototype
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface Template {
  id: string;
  name: string;
  description: string;
  features: string[];
  image: string;
  category: string;
}

const templates: Template[] = [
  {
    id: 'marketplace',
    name: 'Marketplace Platform',
    description: 'Two-sided platform connecting buyers and sellers',
    features: ['User profiles', 'Product listings', 'Search & filter', 'Messaging', 'Reviews & ratings'],
    image: 'https://images.pexels.com/photos/5833754/pexels-photo-5833754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'E-commerce',
  },
  {
    id: 'saas',
    name: 'SaaS Dashboard',
    description: 'User portal for subscription-based services',
    features: ['User management', 'Analytics dashboard', 'Settings panel', 'Subscription management', 'Notifications'],
    image: 'https://images.pexels.com/photos/8391440/pexels-photo-8391440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Business',
  },
  {
    id: 'booking',
    name: 'Booking Platform',
    description: 'Appointment and reservation system',
    features: ['Calendar view', 'Availability management', 'Notifications', 'Payment integration', 'User accounts'],
    image: 'https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Service',
  },
  {
    id: 'social',
    name: 'Social Feed',
    description: 'Content sharing and social interaction platform',
    features: ['User profiles', 'Content feed', 'Comments & reactions', 'Follow system', 'Notifications'],
    image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Social',
  },
  {
    id: 'chatbot',
    name: 'Chatbot Interface',
    description: 'Conversational user experience',
    features: ['Chat interface', 'AI responses', 'User input handling', 'Custom persona', 'Integration ready'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'AI',
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Conversion-focused single page website',
    features: ['Hero section', 'Feature showcase', 'Testimonials', 'Pricing', 'Contact form'],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Marketing',
  },
];

function TemplateCard({ template }: { template: Template }) {
  return (
    <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={template.image} alt={template.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">{template.name}</h3>
          <span className="text-xs px-2 py-1 bg-bolt-elements-background-depth-3 rounded-full text-bolt-elements-textSecondary">
            {template.category}
          </span>
        </div>
        <p className="text-bolt-elements-textSecondary mb-4">{template.description}</p>
        <div className="mb-5">
          <h4 className="text-sm font-medium text-bolt-elements-textSecondary mb-2">Key Features:</h4>
          <ul className="text-sm text-bolt-elements-textSecondary">
            {template.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center mb-1">
                <div className="i-ph:check-circle text-accent-500 mr-1"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to={`/wizard?template=${template.id}`}
          className="w-full block text-center bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-2 rounded-lg"
        >
          Use This Template
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