import resumePdf from '../assets/images/BINILB_FULLSTACK_DEVELOPER.pdf';
import { playUiClick } from './audio';

/**
 * Triggers automatic download of Binil B's Full Stack Developer resume PDF
 */
export const downloadResume = async () => {
  try {
    playUiClick();
  } catch (e) {
    // Ignore audio issues
  }

  try {
    // Fetch as blob to guarantee immediate file download with accurate filename
    const response = await fetch(resumePdf);
    if (!response.ok) throw new Error('Fetch failed');
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'BINILB_FULLSTACK_DEVELOPER.pdf';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 300);
  } catch (error) {
    // Fallback to standard anchor download
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'BINILB_FULLSTACK_DEVELOPER.pdf';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 300);
  }
};

export { resumePdf };
