import { CarouselTemplate } from './types';

export const templates: CarouselTemplate[] = [
  {
    id: 'title-slide',
    name: 'Title Slide',
    description: 'Large centered title with subtitle - perfect for opening slides',
    preview: '📋',
    layout: 'title-slide',
    style: 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
      primaryColor: '#3b82f6',
      secondaryColor: '#1e40af',
      accentColor: '#60a5fa',
      textColor: '#1f2937',
      headerColor: '#1e3a8a'
    }
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Split layout with title and two equal columns for comparisons',
    preview: '📊',
    layout: 'two-column',
    style: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
      primaryColor: '#10b981',
      secondaryColor: '#047857',
      accentColor: '#34d399',
      textColor: '#1f2937',
      headerColor: '#064e3b'
    }
  },
  {
    id: 'bullet-points',
    name: 'Bullet Points',
    description: 'Traditional bullet point layout with title and list items',
    preview: '📝',
    layout: 'bullet-points',
    style: 'bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900 dark:to-violet-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #faf5ff 0%, #ede9fe 100%)',
      primaryColor: '#8b5cf6',
      secondaryColor: '#7c3aed',
      accentColor: '#a78bfa',
      textColor: '#374151',
      headerColor: '#5b21b6'
    }
  },
  {
    id: 'quote-slide',
    name: 'Quote Slide',
    description: 'Large quote with attribution - great for testimonials or key insights',
    preview: '💬',
    layout: 'quote-slide',
    style: 'bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900 dark:to-amber-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
      primaryColor: '#f59e0b',
      secondaryColor: '#d97706',
      accentColor: '#fbbf24',
      textColor: '#1f2937',
      headerColor: '#92400e'
    }
  },
  {
    id: 'image-text',
    name: 'Image & Text',
    description: 'Side-by-side layout with space for image and descriptive text',
    preview: '🖼️',
    layout: 'image-text',
    style: 'bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-900 dark:to-teal-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #ecfeff 0%, #f0fdfa 100%)',
      primaryColor: '#06b6d4',
      secondaryColor: '#0891b2',
      accentColor: '#67e8f9',
      textColor: '#0f172a',
      headerColor: '#164e63'
    }
  },
  {
    id: 'big-number',
    name: 'Big Number',
    description: 'Highlight statistics or key metrics with large numbers',
    preview: '💯',
    layout: 'big-number',
    style: 'bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900 dark:to-rose-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #fef2f2 0%, #fce7e7 100%)',
      primaryColor: '#ef4444',
      secondaryColor: '#dc2626',
      accentColor: '#f87171',
      textColor: '#1f2937',
      headerColor: '#991b1b'
    }
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Step-by-step process or chronological information',
    preview: '⏰',
    layout: 'timeline',
    style: 'bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900 dark:to-blue-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #eef2ff 0%, #dbeafe 100%)',
      primaryColor: '#6366f1',
      secondaryColor: '#4f46e5',
      accentColor: '#818cf8',
      textColor: '#1e293b',
      headerColor: '#312e81'
    }
  },
  {
    id: 'comparison',
    name: 'Comparison',
    description: 'Before/After or This vs That layout with visual separation',
    preview: '⚖️',
    layout: 'comparison',
    style: 'bg-gradient-to-br from-pink-50 to-fuchsia-100 dark:from-pink-900 dark:to-fuchsia-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #fdf2f8 0%, #fae8ff 100%)',
      primaryColor: '#ec4899',
      secondaryColor: '#db2777',
      accentColor: '#f472b6',
      textColor: '#374151',
      headerColor: '#be185d'
    }
  },
  {
    id: 'call-to-action',
    name: 'Call to Action',
    description: 'Centered message with prominent action button or next steps',
    preview: '🎯',
    layout: 'call-to-action',
    style: 'bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900 dark:to-green-800',
    pdfStyle: {
      background: 'linear-gradient(135deg, #ecfdf5 0%, #dcfce7 100%)',
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981',
      textColor: '#1f2937',
      headerColor: '#064e3b'
    }
  },
  {
    id: 'minimal-text',
    name: 'Minimal Text',
    description: 'Clean, spacious layout focusing on key message with lots of whitespace',
    preview: '✨',
    layout: 'minimal-text',
    style: 'bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-700 dark:to-slate-600',
    pdfStyle: {
      background: 'linear-gradient(135deg, #f9fafb 0%, #f1f5f9 100%)',
      primaryColor: '#6b7280',
      secondaryColor: '#374151',
      accentColor: '#9ca3af',
      textColor: '#111827',
      headerColor: '#1f2937'
    }
  }
];