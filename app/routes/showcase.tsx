import { json, type MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'PromptoType.ai - Prototype Showcase' },
    { name: 'description', content: 'Explore and discover working prototypes built with PromptoType.ai' },
  ];
};

export const loader = () => json({});

export default function Showcase() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? mockProjects 
    : mockProjects.filter(project => project.category === filter);

  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-bolt-elements-textPrimary mb-4">Prototype Showcase</h1>
            <p className="text-xl text-bolt-elements-textSecondary max-w-2xl mx-auto">
              Explore prototypes built by founders just like you using PromptoType.ai
            </p>
          </div>

          {/* Filter options */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            <FilterButton 
              active={filter === 'all'} 
              onClick={() => setFilter('all')}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              active={filter === 'marketplace'} 
              onClick={() => setFilter('marketplace')}
            >
              Marketplace
            </FilterButton>
            <FilterButton 
              active={filter === 'saas'} 
              onClick={() => setFilter('saas')}
            >
              SaaS
            </FilterButton>
            <FilterButton 
              active={filter === 'booking'} 
              onClick={() => setFilter('booking')}
            >
              Booking
            </FilterButton>
            <FilterButton 
              active={filter === 'social'} 
              onClick={() => setFilter('social')}
            >
              Social
            </FilterButton>
            <FilterButton 
              active={filter === 'chatbot'} 
              onClick={() => setFilter('chatbot')}
            >
              Chatbot
            </FilterButton>
          </div>

          {/* Project grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="i-ph:smiley-sad text-5xl text-bolt-elements-textTertiary mx-auto mb-4"></div>
              <p className="text-bolt-elements-textSecondary mb-4">No projects found with this filter</p>
              <button 
                onClick={() => setFilter('all')}
                className="text-accent-500 hover:text-accent-600"
              >
                View all projects
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-bolt-elements-background-depth-2 rounded-lg p-10 text-center">
            <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-3">Ready to showcase your idea?</h2>
            <p className="text-bolt-elements-textSecondary mb-6 max-w-2xl mx-auto">
              Join these founders and create your own prototype in minutes. No coding required.
            </p>
            <Link
              to="/wizard"
              className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 px-8 rounded-lg inline-block"
            >
              Start Building
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  waitlist: number;
  author: string;
  date: string;
}

const mockProjects: Project[] = [
  {
    id: 'skillshare',
    name: 'SkillShare Connect',
    description: 'Marketplace for connecting skilled professionals with local projects',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'marketplace',
    waitlist: 47,
    author: 'Sarah Johnson',
    date: '2025-05-15',
  },
  {
    id: 'analytiq',
    name: 'AnalytiQ',
    description: 'AI-powered business analytics dashboard for small businesses',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'saas',
    waitlist: 124,
    author: 'Michael Chen',
    date: '2025-05-12',
  },
  {
    id: 'petcare',
    name: 'PetCare Connect',
    description: 'Book pet sitting and walking services in your neighborhood',
    image: 'https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'booking',
    waitlist: 83,
    author: 'Emma Rodriguez',
    date: '2025-05-10',
  },
  {
    id: 'foodie',
    name: 'FoodieShare',
    description: 'Social network for sharing and discovering local food experiences',
    image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'social',
    waitlist: 62,
    author: 'David Kim',
    date: '2025-05-08',
  },
  {
    id: 'healthbot',
    name: 'HealthBot',
    description: 'AI chatbot that provides personalized wellness recommendations',
    image: 'https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'chatbot',
    waitlist: 156,
    author: 'Priya Patel',
    date: '2025-05-05',
  },
  {
    id: 'eventify',
    name: 'Eventify',
    description: 'Event planning and ticket booking platform for local events',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'booking',
    waitlist: 74,
    author: 'James Wilson',
    date: '2025-05-02',
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-bolt-elements-textPrimary">{project.name}</h3>
          <span className="text-xs px-2 py-1 bg-bolt-elements-background-depth-3 rounded-full text-bolt-elements-textSecondary">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
        <p className="text-bolt-elements-textSecondary mb-4">{project.description}</p>
        
        <div className="flex justify-between items-center text-sm text-bolt-elements-textTertiary mb-4">
          <span>By {project.author}</span>
          <span>{new Date(project.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="i-ph:users-three text-bolt-elements-textSecondary mr-1"></div>
          <span className="text-sm text-bolt-elements-textSecondary">{project.waitlist} on waitlist</span>
        </div>
        
        <Link
          to={`/prototype/${project.id}`}
          className="w-full block text-center bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-2 rounded-lg"
        >
          View Prototype
        </Link>
      </div>
    </div>
  );
}

function FilterButton({ children, active, onClick }: { children: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active 
          ? 'bg-accent-500 text-white' 
          : 'bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:bg-bolt-elements-background-depth-3'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
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