'use client';

import { CarouselTemplate } from './types';

interface CarouselTemplateSelectorProps {
  templates: CarouselTemplate[];
  selectedTemplate: CarouselTemplate;
  onTemplateSelect: (template: CarouselTemplate) => void;
}

export function CarouselTemplateSelector({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect 
}: CarouselTemplateSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        Choose Your Template Style
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate.id === template.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {template.preview}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {template.name}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">
                {template.description}
              </p>
            </div>
            
            {/* Preview mini layout */}
            <div className="mt-3 h-12 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded opacity-60 group-hover:opacity-80 transition-opacity">
              <div className={`h-full rounded ${getPreviewLayout(template.layout)}`}></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Template Tips
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Each template is optimized for different content types. Choose based on your message:
              <strong> Title Slide</strong> for introductions, <strong>Bullet Points</strong> for lists, 
              <strong>Big Number</strong> for statistics, and <strong>Quote Slide</strong> for testimonials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function getPreviewLayout(layout: string): string {
  switch (layout) {
    case 'title-slide':
      return 'bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-500 to-transparent';
    case 'two-column':
      return 'bg-gradient-to-r from-gray-300 dark:from-gray-500 via-transparent to-gray-300 dark:to-gray-500';
    case 'bullet-points':
      return 'bg-gradient-to-b from-gray-300 dark:from-gray-500 via-transparent via-gray-300 dark:via-gray-500 to-transparent';
    case 'quote-slide':
      return 'bg-radial-gradient from-gray-300 dark:from-gray-500 to-transparent';
    case 'big-number':
      return 'bg-gradient-to-t from-transparent via-gray-300 dark:via-gray-500 to-transparent';
    case 'timeline':
      return 'bg-gradient-to-r from-gray-300 dark:from-gray-500 via-transparent to-transparent';
    case 'comparison':
      return 'bg-gradient-to-r from-red-200 dark:from-red-800 via-transparent to-green-200 dark:to-green-800';
    case 'call-to-action':
      return 'bg-gradient-to-br from-transparent via-gray-300 dark:via-gray-500 to-transparent';
    case 'image-text':
      return 'bg-gradient-to-r from-gray-300 dark:from-gray-500 to-transparent';
    case 'minimal-text':
      return 'bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-600 to-transparent';
    default:
      return 'bg-gray-300 dark:bg-gray-500';
  }
}