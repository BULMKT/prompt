import { useState } from 'react';
import { json, redirect, type ActionFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { Header } from '~/components/header/Header';

export const meta: MetaFunction = () => {
  return [
    { title: 'PromptoType.ai - Build Your Prototype' },
    { name: 'description', content: 'Create your prototype by answering a few simple questions' },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const appName = formData.get('appName')?.toString();
  const problemStatement = formData.get('problemStatement')?.toString();
  const targetAudience = formData.get('targetAudience')?.toString();
  const templateType = formData.get('templateType')?.toString();

  // Validate required fields
  if (!appName || !problemStatement || !targetAudience || !templateType) {
    return json({ error: 'All fields are required' });
  }

  // In a real application, we would process this data and create a prototype
  // For now, we'll just redirect to the build page
  return redirect(`/build?name=${encodeURIComponent(appName)}&template=${encodeURIComponent(templateType)}`);
}

export default function Wizard() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    appName: '',
    problemStatement: '',
    targetAudience: '',
    templateType: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.appName || !formData.problemStatement)) {
      return;
    }
    if (step === 2 && !formData.targetAudience) {
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleTemplateSelect = (template: string) => {
    setFormData((prev) => ({ ...prev, templateType: template }));
    // Navigate to build page
    navigate(`/build?name=${encodeURIComponent(formData.appName)}&template=${encodeURIComponent(template)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bolt-elements-background-depth-1">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-bolt-elements-textPrimary mb-2">Create Your Prototype</h1>
            <p className="text-bolt-elements-textSecondary">
              Answer a few questions to help us understand what you're building
            </p>
          </div>

          <div className="flex mb-8">
            <StepIndicator step={1} currentStep={step} title="App Details" />
            <StepIndicator step={2} currentStep={step} title="Target Audience" />
            <StepIndicator step={3} currentStep={step} title="Select Template" />
          </div>

          {actionData?.error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-lg border border-red-200">
              {actionData.error}
            </div>
          )}

          <Form method="post">
            {step === 1 && (
              <div className="bg-bolt-elements-background-depth-2 rounded-lg p-8 shadow-sm border border-bolt-elements-borderColor">
                <div className="mb-6">
                  <label htmlFor="appName" className="block text-bolt-elements-textPrimary font-medium mb-2">
                    App Name
                  </label>
                  <input
                    type="text"
                    id="appName"
                    name="appName"
                    value={formData.appName}
                    onChange={handleInputChange}
                    placeholder="e.g., TaskMaster, FitConnect, etc."
                    className="w-full p-3 border border-bolt-elements-borderColor rounded-lg bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="problemStatement" className="block text-bolt-elements-textPrimary font-medium mb-2">
                    Problem Statement
                  </label>
                  <textarea
                    id="problemStatement"
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleInputChange}
                    placeholder="Describe the problem your app will solve..."
                    rows={4}
                    className="w-full p-3 border border-bolt-elements-borderColor rounded-lg bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.appName || !formData.problemStatement}
                    className="bg-accent-500 hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 transition-all text-white font-medium py-2 px-6 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-bolt-elements-background-depth-2 rounded-lg p-8 shadow-sm border border-bolt-elements-borderColor">
                <div className="mb-6">
                  <label htmlFor="targetAudience" className="block text-bolt-elements-textPrimary font-medium mb-2">
                    Target Audience
                  </label>
                  <textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Who will use your app? Be as specific as possible..."
                    rows={4}
                    className="w-full p-3 border border-bolt-elements-borderColor rounded-lg bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary"
                    required
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-bolt-elements-button-secondary-background hover:bg-bolt-elements-button-secondary-backgroundHover text-bolt-elements-button-secondary-text font-medium py-2 px-6 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.targetAudience}
                    className="bg-accent-500 hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 transition-all text-white font-medium py-2 px-6 rounded-lg"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-bolt-elements-background-depth-2 rounded-lg p-8 shadow-sm border border-bolt-elements-borderColor">
                <h3 className="text-xl font-semibold mb-6 text-bolt-elements-textPrimary">Choose a Template</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <TemplateOption
                    name="Marketplace"
                    description="Two-sided platform for buyers and sellers"
                    image="https://images.pexels.com/photos/5833754/pexels-photo-5833754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    onClick={() => handleTemplateSelect('marketplace')}
                  />
                  <TemplateOption
                    name="SaaS Dashboard"
                    description="User portal for subscription services"
                    image="https://images.pexels.com/photos/8391440/pexels-photo-8391440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    onClick={() => handleTemplateSelect('saas')}
                  />
                  <TemplateOption
                    name="Booking Platform"
                    description="Appointment and reservation system"
                    image="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    onClick={() => handleTemplateSelect('booking')}
                  />
                  <TemplateOption
                    name="Social Feed"
                    description="Content sharing and social interaction"
                    image="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    onClick={() => handleTemplateSelect('social')}
                  />
                  <TemplateOption
                    name="Chatbot Interface"
                    description="Conversational user experience"
                    image="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    onClick={() => handleTemplateSelect('chatbot')}
                  />
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-bolt-elements-button-secondary-background hover:bg-bolt-elements-button-secondary-backgroundHover text-bolt-elements-button-secondary-text font-medium py-2 px-6 rounded-lg"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </Form>
        </div>
      </main>
    </div>
  );
}

function StepIndicator({ step, currentStep, title }: { step: number; currentStep: number; title: string }) {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex-1">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            isActive
              ? 'bg-accent-500 text-white'
              : isCompleted
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
          }`}
        >
          {isCompleted ? <div className="i-ph:check"></div> : step}
        </div>
        <span
          className={`text-sm ${
            isActive || isCompleted ? 'text-bolt-elements-textPrimary' : 'text-bolt-elements-textTertiary'
          }`}
        >
          {title}
        </span>
      </div>
      {step < 3 && (
        <div
          className={`h-1 w-full mt-2 ${
            isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}
        ></div>
      )}
    </div>
  );
}

function TemplateOption({
  name,
  description,
  image,
  onClick,
}: {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-bolt-elements-background-depth-1 rounded-lg shadow-sm border border-bolt-elements-borderColor overflow-hidden hover:border-accent-300 transition-all"
    >
      <div className="h-40 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 text-left">
        <h4 className="font-semibold text-bolt-elements-textPrimary">{name}</h4>
        <p className="text-sm text-bolt-elements-textSecondary">{description}</p>
      </div>
    </button>
  );
}