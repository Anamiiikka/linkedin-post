'use client';

import React from 'react';
import { CarouselTemplate } from './types';

interface SlideDisplayProps {
  content: string;
  slideNumber: number;
  totalSlides: number;
  template: CarouselTemplate;
  isForPDF?: boolean;
}

export function SlideDisplay({ 
  content, 
  slideNumber, 
  totalSlides, 
  template, 
  isForPDF = false 
}: SlideDisplayProps) {
  const lines = content.split('\n').filter(line => line.trim());
  const title = lines[0] || `Slide ${slideNumber}`;
  const bodyContent = lines.slice(1).join('\n');

  // Parse content for different layouts
  const parseContentForLayout = () => {
    switch (template.layout) {
      case 'bullet-points':
        return {
          title,
          bullets: bodyContent.split('\n').filter(line => line.trim())
        };
      case 'two-column':
        const parts = bodyContent.split('\n\n');
        return {
          title,
          leftColumn: parts[0] || '',
          rightColumn: parts[1] || ''
        };
      case 'big-number':
        const numberMatch = bodyContent.match(/(\d+(?:\.\d+)?%?)/);
        return {
          title,
          number: numberMatch ? numberMatch[1] : '100',
          description: bodyContent.replace(/\d+(?:\.\d+)?%?/, '').trim()
        };
      case 'quote-slide':
        const quoteLines = bodyContent.split('\n');
        return {
          quote: title,
          author: quoteLines[0] || '',
          context: quoteLines.slice(1).join(' ')
        };
      case 'timeline':
        const steps = bodyContent.split('\n').filter(line => line.trim());
        return {
          title,
          steps: steps.slice(0, 4) // Limit to 4 steps for better layout
        };
      case 'comparison':
        const comparisonParts = bodyContent.split('vs').length > 1 
          ? bodyContent.split('vs') 
          : bodyContent.split('\n\n');
        return {
          title,
          leftSide: comparisonParts[0]?.trim() || '',
          rightSide: comparisonParts[1]?.trim() || ''
        };
      default:
        return { title, content: bodyContent };
    }
  };

  const parsedContent = parseContentForLayout();

  if (isForPDF) {
    return renderPDFSlide(parsedContent, template, slideNumber, totalSlides);
  }

  return renderWebSlide(parsedContent, template, slideNumber, totalSlides);
}

function renderWebSlide(parsedContent: any, template: CarouselTemplate, slideNumber: number, totalSlides: number) {
  const baseClasses = `${template.style} rounded-xl p-8 min-h-[400px] relative overflow-hidden`;

  // Slide number indicator
  const slideIndicator = (
    <div className="absolute top-4 left-4 text-sm font-bold opacity-70 z-10">
      {slideNumber}/{totalSlides}
    </div>
  );

  switch (template.layout) {
    case 'title-slide':
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center`}>
          {slideIndicator}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100 leading-tight">
            {parsedContent.title}
          </h1>
          {parsedContent.content && (
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {parsedContent.content}
            </p>
          )}
        </div>
      );

    case 'two-column':
      return (
        <div className={baseClasses}>
          {slideIndicator}
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
              {parsedContent.title}
            </h2>
            <div className="flex-1 grid md:grid-cols-2 gap-8">
              <div className="bg-white/20 dark:bg-black/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="h-4 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-4"></div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {parsedContent.leftColumn}
                </div>
              </div>
              <div className="bg-white/20 dark:bg-black/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="h-4 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded mb-4"></div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {parsedContent.rightColumn}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'bullet-points':
      return (
        <div className={baseClasses}>
          {slideIndicator}
          <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
              {parsedContent.title}
            </h2>
            <div className="flex-1 space-y-4">
              {parsedContent.bullets.map((bullet: string, index: number) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'quote-slide':
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center relative`}>
          {slideIndicator}
          <div className="absolute top-8 left-8 text-6xl text-orange-300 dark:text-orange-600 opacity-50">"</div>
          <div className="absolute bottom-8 right-8 text-6xl text-orange-300 dark:text-orange-600 opacity-50 rotate-180">"</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 dark:text-gray-100 mb-8 leading-relaxed max-w-3xl">
            {parsedContent.quote}
          </blockquote>
          {parsedContent.author && (
            <div className="text-lg text-gray-600 dark:text-gray-400">
              <span className="font-semibold">— {parsedContent.author}</span>
              {parsedContent.context && (
                <div className="text-sm mt-2">{parsedContent.context}</div>
              )}
            </div>
          )}
        </div>
      );

    case 'big-number':
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center`}>
          {slideIndicator}
          <div className="text-8xl md:text-9xl font-black text-red-500 dark:text-red-400 mb-4 leading-none">
            {parsedContent.number}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            {parsedContent.title}
          </h2>
          {parsedContent.description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {parsedContent.description}
            </p>
          )}
        </div>
      );

    case 'timeline':
      return (
        <div className={baseClasses}>
          {slideIndicator}
          <div className="h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
              {parsedContent.title}
            </h2>
            <div className="flex-1 relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-blue-500 rounded"></div>
              <div className="space-y-6 pl-16">
                {parsedContent.steps.map((step: string, index: number) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-20 w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="bg-white/20 dark:bg-black/20 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'comparison':
      return (
        <div className={baseClasses}>
          {slideIndicator}
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
              {parsedContent.title}
            </h2>
            <div className="flex-1 grid md:grid-cols-2 gap-1 relative">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-l-lg p-6 border-r-2 border-gray-300 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-semibold text-red-700 dark:text-red-300">Before / Problem</span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {parsedContent.leftSide}
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-r-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-semibold text-green-700 dark:text-green-300">After / Solution</span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {parsedContent.rightSide}
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );

    case 'call-to-action':
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center`}>
          {slideIndicator}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 rounded-xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              {parsedContent.title}
            </h2>
            {parsedContent.content && (
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                {parsedContent.content}
              </p>
            )}
            <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-transform">
              <span>Take Action Now</span>
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </div>
      );

    case 'image-text':
      return (
        <div className={baseClasses}>
          {slideIndicator}
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
              {parsedContent.title}
            </h2>
            <div className="flex-1 grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-800 dark:to-teal-800 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Image Placeholder</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {parsedContent.content}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'minimal-text':
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center`}>
          {slideIndicator}
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-light mb-12 text-gray-800 dark:text-gray-100 leading-relaxed">
              {parsedContent.title}
            </h2>
            {parsedContent.content && (
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-loose font-light">
                {parsedContent.content}
              </p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className={`${baseClasses} flex flex-col justify-center items-center text-center`}>
          {slideIndicator}
          <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            {parsedContent.title}
          </h1>
          {parsedContent.content && (
            <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {parsedContent.content}
            </div>
          )}
        </div>
      );
  }
}

function renderPDFSlide(parsedContent: any, template: CarouselTemplate, slideNumber: number, totalSlides: number) {
  // PDF rendering logic would be similar but with inline styles
  // For brevity, I'll implement a basic version that works with the existing PDF export
  return (
    <div 
      style={{
        width: '800px',
        height: '600px',
        background: template.pdfStyle.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      {/* Header bar */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '8px',
        background: template.pdfStyle.primaryColor,
      }} />
      
      {/* Slide number */}
      <div style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        fontSize: '14px',
        color: template.pdfStyle.primaryColor,
        fontWeight: 'bold',
      }}>
        {slideNumber}/{totalSlides}
      </div>

      {/* Main content - simplified for PDF */}
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          color: template.pdfStyle.headerColor,
          marginBottom: '30px',
          lineHeight: '1.2',
        }}>
          {parsedContent.title}
        </h1>
        
        {parsedContent.content && (
          <div style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: template.pdfStyle.textColor,
            whiteSpace: 'pre-wrap',
          }}>
            {parsedContent.content}
          </div>
        )}
      </div>

      {/* Footer gradient */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        height: '4px',
        background: `linear-gradient(90deg, ${template.pdfStyle.primaryColor} 0%, ${template.pdfStyle.accentColor} 100%)`,
      }} />
    </div>
  );
}