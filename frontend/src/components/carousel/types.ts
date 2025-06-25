export interface CarouselTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  layout: string;
  style: string;
  pdfStyle: {
    background: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    headerColor: string;
  };
}