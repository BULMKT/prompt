import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'Building Your Prototype - PromptoType.ai' },
    { name: 'description', content: 'Your prototype is being built. Please wait...' },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const appName = url.searchParams.get('name');
  const template = url.searchParams.get('template');

  if (!appName || !template) {
    return json({ error: 'Missing required parameters' });
  }

  return json({
    appName,
    template,
  });
}

export default function Build() {
  const { appName, template, error } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Starting build...');
  const [error404, setError404] = useState(error || '');

  useEffect(() => {
    if (error404) {
      return;
    }

    const steps = [
      { text: 'Analyzing requirements...', time: 1000 },
      { text: 'Setting up project structure...', time: 1500 },
      { text: 'Generating components...', time: 2000 },
      { text: 'Applying template styling...', time: 1500 },
      { text: 'Implementing core features...', time: 3000 },
      { text: 'Optimizing for performance...', time: 1500 },
      { text: 'Finalizing prototype...', time: 1000 },
      { text: 'Build complete!', time: 500 },
    ];

    let currentIndex = 0;
    let totalTime = steps.reduce((acc, step) => acc + step.time, 0);
    let elapsedTime = 0;

    const updateProgress = () => {
      if (currentIndex >= steps.length) {
        // Navigate to prototype page when complete
        setTimeout(() => {
          navigate(`/prototype/${template}-${Date.now().toString(36)}`);
        }, 1000);
        return;
      }

      const step = steps[currentIndex];
      setCurrentStep(step.text);
      
      elapsedTime += step.time;
      setProgress(Math.floor((elapsedTime / totalTime) * 100));
      
      currentIndex++;
      setTimeout(updateProgress, step.time);
    };

    updateProgress();
  }, [navigate, appName, template, error404]);

  if (error404) {
    return (
      <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
        <Header />
        <main className="flex-1 px-6 py-10 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="i-ph:warning-circle text-6xl text-red-500 mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-bolt-elements-textPrimary mb-4">Error</h1>
            <p className="text-bolt-elements-textSecondary mb-6">{error404}</p>
            <Link
              to="/wizard"
              className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-2 px-6 rounded-lg"
            >
              Back to Wizard
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-2">Building Your Prototype</h1>
            <p className="text-lg text-bolt-elements-textSecondary">
              We're creating <span className="font-semibold">{appName}</span> using the{' '}
              <span className="font-semibold">
                {template.charAt(0).toUpperCase() + template.slice(1)}
              </span>{' '}
              template
            </p>
          </div>

          <div className="bg-bolt-elements-background-depth-2 rounded-lg shadow-sm border border-bolt-elements-borderColor p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="i-svg-spinners:90-ring-with-bg text-4xl text-accent-500"></div>
              <div className="flex-1">
                <p className="font-medium text-bolt-elements-textPrimary mb-1">{currentStep}</p>
                <div className="w-full bg-bolt-elements-background-depth-3 rounded-full h-4">
                  <div
                    className="bg-accent-500 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <BuildLogItem 
                completed={progress > 10} 
                text="Analyzing your requirements"
              />
              <BuildLogItem 
                completed={progress > 25} 
                text="Setting up project structure"
              />
              <BuildLogItem 
                completed={progress > 40} 
                text="Generating UI components"
              />
              <BuildLogItem 
                completed={progress > 55} 
                text="Implementing core features"
              />
              <BuildLogItem 
                completed={progress > 70} 
                text="Optimizing for performance"
              />
              <BuildLogItem 
                completed={progress > 85} 
                text="Finalizing your prototype"
              />
              <BuildLogItem 
                completed={progress === 100} 
                text="Build complete!"
              />
            </div>
            
            <div className="mt-8 text-center text-sm text-bolt-elements-textSecondary">
              This usually takes less than a minute. Please wait...
            </div>
          </div>
          
          {progress >= 100 && (
            <div className="mt-8 text-center">
              <p className="text-lg text-bolt-elements-textSecondary mb-4">Your prototype is ready!</p>
              <Link
                to={`/prototype/${template}-${Date.now().toString(36)}`}
                className="bg-accent-500 hover:brightness-110 transition-all text-white font-medium py-3 px-8 rounded-lg inline-block"
              >
                View Your Prototype
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function BuildLogItem({ completed, text }: { completed: boolean; text: string }) {
  return (
    <div className="flex items-center">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
        completed 
          ? 'bg-green-500 text-white' 
          : 'bg-gray-200 dark:bg-gray-700'
      }`}>
        {completed ? <div className="i-ph:check"></div> : null}
      </div>
      <span className={`${
        completed 
          ? 'text-bolt-elements-textPrimary' 
          : 'text-bolt-elements-textTertiary'
      }`}>
        {text}
      </span>
    </div>
  );
}