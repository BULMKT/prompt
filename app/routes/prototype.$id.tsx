import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = ({ data }) => {
  const project = data?.project;
  return [
    { title: project ? `${project.name} - PromptoType.ai` : 'Prototype - PromptoType.ai' },
    { 
      name: 'description', 
      content: project 
        ? `${project.name} - ${project.description}`
        : 'View and explore prototypes built with PromptoType.ai' 
    },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const projectId = params.id;
  
  // In a real app, this would fetch from a database
  const project = mockProjects.find(p => p.id === projectId);
  
  if (!project) {
    throw new Response('Not Found', { status: 404 });
  }
  
  return json({ project });
}

export default function PrototypePage() {
  const { project } = useLoaderData<typeof loader>();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    // In a real app, this would send the email to a database or API
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Prototype Info */}
          <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-3xl font-bold text-bolt-elements-textPrimary">{project.name}</h1>
                  <span className="text-sm px-2 py-1 bg-bolt-elements-background-depth-3 rounded-full text-bolt-elements-textSecondary">
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
                
                <p className="text-lg text-bolt-elements-textSecondary mb-4">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <div className="flex items-center text-bolt-elements-textSecondary mb-2">
                    <div className="i-ph:user text-lg mr-2"></div>
                    <span>Created by {project.author}</span>
                  </div>
                  <div className="flex items-center text-bolt-elements-textSecondary mb-2">
                    <div className="i-ph:calendar text-lg mr-2"></div>
                    <span>Published on {new Date(project.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center text-bolt-elements-textSecondary">
                    <div className="i-ph:users-three text-lg mr-2"></div>
                    <span>{project.waitlist} people on waitlist</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Prototype Preview */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-4">Prototype Preview</h2>
              <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor p-4 h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <div className="i-ph:desktop-tower text-6xl text-bolt-elements-textTertiary mx-auto mb-4"></div>
                  <p className="text-lg text-bolt-elements-textSecondary mb-4">Interactive prototype preview</p>
                  <p className="text-sm text-bolt-elements-textTertiary max-w-md">
                    In a full implementation, this would contain an iframe with the actual prototype
                  </p>
                </div>
              </div>
            </div>
            
            {/* Waitlist Signup */}
            <div>
              <h2 className="text-2xl font-bold text-bolt-elements-textPrimary mb-4">Join Waitlist</h2>
              <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor p-6">
                {!isSubmitted ? (
                  <>
                    <p className="text-bolt-elements-textSecondary mb-4">
                      Be the first to know when {project.name} launches. Sign up for early access.
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label htmlFor="email" className="block text-bolt-elements-textSecondary text-sm mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 border border-bolt-elements-borderColor rounded-lg bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
                          placeholder="you@example.com"
                          required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 rounded-lg"
                      >
                        Join Waitlist
                      </button>
                    </form>
                    <div className="mt-4 text-sm text-bolt-elements-textTertiary text-center">
                      <div className="flex items-center justify-center">
                        <div className="i-ph:lock text-sm mr-1"></div>
                        <span>We'll never share your email with anyone else</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="i-ph:check-circle text-5xl text-green-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold text-bolt-elements-textPrimary mb-2">Thank you!</h3>
                    <p className="text-bolt-elements-textSecondary">
                      You've been added to the waitlist for {project.name}. We'll notify you when it launches.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Project Stats */}
              <div className="mt-6 bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor p-6">
                <h3 className="text-lg font-semibold text-bolt-elements-textPrimary mb-4">Project Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-bolt-elements-textSecondary">Waitlist Signups</span>
                    <span className="font-medium text-bolt-elements-textPrimary">{project.waitlist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bolt-elements-textSecondary">Days Live</span>
                    <span className="font-medium text-bolt-elements-textPrimary">
                      {Math.floor((new Date().getTime() - new Date(project.date).getTime()) / (1000 * 60 * 60 * 24))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-bolt-elements-textSecondary">Prototype Views</span>
                    <span className="font-medium text-bolt-elements-textPrimary">{project.waitlist * 5}</span>
                  </div>
                </div>
              </div>
            </div>
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
  features: string[];
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
    features: ['Skill Matching', 'Project Listings', 'Secure Payments', 'Reviews', 'Messaging']
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
    features: ['Data Visualization', 'AI Insights', 'Custom Reports', 'Goal Tracking', 'Integrations']
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
    features: ['Caregiver Profiles', 'Calendar Booking', 'In-app Payments', 'Pet Profiles', 'Real-time Updates']
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
    features: ['Recipe Sharing', 'Restaurant Reviews', 'Food Maps', 'Meetup Organization', 'Photo Galleries']
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
    features: ['Personalized Advice', 'Symptom Checker', 'Medication Reminders', 'Health Tracking', 'Doctor Referrals']
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
    features: ['Event Creation', 'Ticket Sales', 'Attendee Management', 'Event Discovery', 'Calendar Integration']
  },
];

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