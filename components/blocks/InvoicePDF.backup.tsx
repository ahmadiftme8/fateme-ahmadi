import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export interface InvoiceItem {
  label: string;
  price: number;
}

interface InvoicePDFProps {
  projectType: string;
  items?: InvoiceItem[];
  totalEstimate: number;
  onClose?: () => void;
  /** If true, immediately triggers PDF download and calls onClose when done. Renders off-screen. */
  autoDownload?: boolean;
}

/**
 * A printable Invoice component that replaces the PDF generator.
 * Uses standard HTML/CSS which allows for "Print to PDF" functionality
 * in the browser.
 */
const InvoicePDF: React.FC<InvoicePDFProps> = ({ 
    projectType, 
    items = [], 
    totalEstimate, 
    onClose,
    autoDownload = false
}) => {
  const date = new Date().toLocaleDateString();
  const estimateId = `EST-${Math.floor(Math.random() * 10000)}`;
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- PDF Generation Logic ---
  const generateAndDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
        // Wait a slight tick to ensure fonts/layout are stable
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(contentRef.current, {
            scale: 2, // High resolution
            useCORS: true, 
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const imgWidth = 210; // A4 width mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        pdf.save(`FatemeAhmadi_Estimate_${estimateId}.pdf`);

        // If auto-downloading, close after save
        if (autoDownload && onClose) {
            onClose();
        }

    } catch (error) {
        console.error("PDF Export Failed:", error);
        alert("Failed to generate PDF. Please try again.");
        if (autoDownload && onClose) onClose();
    }
  };

  // --- Auto-Run for Direct Download ---
  useEffect(() => {
    if (autoDownload) {
        generateAndDownloadPDF();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoDownload]);


  // Print handler (Manual Mode)
  const handlePrint = () => {
     generateAndDownloadPDF(); // Start using the same PDF engine for manual clicks too, for consistency
  };

  /** 
   * Styles:
   * If autoDownload is TRUE, we render this Fixed, Off-Screen (or just behind everything).
   * It needs to be "visible" to the DOM for html2canvas to capture it.
   */
  const containerClasses = autoDownload 
    ? "fixed top-0 left-[-9999px] z-[-1]" // Off-screen, but rendered
    : "fixed inset-0 z-[100] min-h-screen p-8 flex flex-col items-center justify-start overflow-y-auto font-sans";


  return (
    <div className={containerClasses} ref={containerRef} style={{ backgroundColor: '#F8FAFC', color: '#252525' }}>
      
      {/* Controls - Hidden in auto-download mode or when printing */}
      {!autoDownload && (
        <div className="mb-8 print:hidden flex gap-4 sticky top-4 z-50">
            <button 
            onClick={handlePrint}
            className="bg-[#1F67F1] text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2 transform hover:scale-105 duration-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
            Download PDF
            </button>
            {onClose && (
                <button 
                    onClick={onClose}
                    className="bg-white text-gray-700 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-2 transform hover:scale-105 duration-200 border border-gray-200"
                >
                    <X size={20} />
                    Back to Editor
                </button>
            )}
        </div>
      )}

      {/* A4 Paper Container */}
      <div 
        ref={contentRef}
        id="invoice-content"
        className="w-[210mm] min-h-[297mm] p-[15mm] md:p-[20mm] relative shadow-2xl print:shadow-none overflow-hidden shrink-0 mx-auto"
        style={{ backgroundColor: '#ffffff', color: '#000000' }}
      >
        {/* Playful Decorative Shapes */}
        <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full blur-3xl print:hidden" style={{ backgroundColor: 'rgba(31, 103, 241, 0.1)' }}></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-[150px] h-[150px] rounded-full blur-2xl print:hidden" style={{ backgroundColor: 'rgba(234, 91, 55, 0.1)' }}></div>
        
        {/* Top Creative Bar */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-[#1F67F1] via-[#1F67F1] to-[#EA5B37]"></div>

        {/* Header */}
        <div className="flex justify-between items-end mb-16 relative z-10">
          <div>
            <h1 className="text-4xl font-black text-[#1F67F1] tracking-tighter mb-2" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
              Fateme Ahmadi<span className="text-[#EA5B37]">.</span>
            </h1>
            <p className="text-sm font-medium inline-block px-2 py-1 rounded-md" style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>
              Brand Identity & Web Design
            </p>
            <div className="mt-2 text-sm font-medium" style={{ color: '#9ca3af' }}>
                devftme@gmail.com
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-5xl font-black absolute right-0 -top-4 -z-10 select-none" style={{ color: 'rgba(234, 91, 55, 0.1)' }}>ESTIMATE</h2>
            <div className="text-lg font-bold text-[#252525] uppercase tracking-widest border-b-4 border-[#EA5B37] inline-block pb-1">
              Proforma Estimate
            </div>
          </div>
        </div>

        {/* Meta Section - Cards Style */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          <div className="p-4 rounded-xl border border-[#D9D9D9]" style={{ backgroundColor: '#F8FAFC' }}>
            <span className="text-xs text-[#1F67F1] font-bold uppercase tracking-wider block mb-1">Date Issued</span>
            <span className="text-lg font-bold text-[#252525]">{date}</span>
          </div>
          <div className="p-4 rounded-xl border border-[#D9D9D9]" style={{ backgroundColor: '#F8FAFC' }}>
            <span className="text-xs text-[#1F67F1] font-bold uppercase tracking-wider block mb-1">Estimate ID</span>
            <span className="text-lg font-bold text-[#252525]">{estimateId}</span>
          </div>
          <div className="p-4 rounded-xl text-white shadow-lg" style={{ backgroundColor: '#1F67F1', boxShadow: '0 10px 15px -3px rgba(191, 219, 254, 0.5)' }}>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: '#bfdbfe' }}>Project Type</span>
            <span className="text-lg font-bold">{projectType}</span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="mb-12 relative z-10">
          {/* Table Header */}
          <div className="flex items-center pb-4 mb-4 border-b-2 border-[#1F67F1]">
            <div className="flex-[3] text-xs font-black text-[#252525] uppercase tracking-widest">Description / Item</div>
            <div className="flex-1 text-right text-xs font-black text-[#252525] uppercase tracking-widest">Cost</div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-2">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm py-1 px-4 pt-0 mt-0 bg-white rounded-lg border border-dashed border-[#D9D9D9] hover:border-[#1F67F1] transition-colors break-inside-avoid">
                <div className="flex-[3] font-medium text-[#252525]">{item.label}</div>
                <div className="flex-1 text-right font-bold text-[#1F67F1]">
                  ${Number(item.price).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Section */}
        <div className="flex justify-end mt-8 break-inside-avoid">
          <div className="bg-[#252525] text-white p-8 rounded-2xl shadow-xl transform rotate-1 print:rotate-0 print:shadow-none min-w-[300px] relative overflow-hidden" style={{ color: '#ffffff' }}>
             <div className="absolute top-0 right-0 w-16 h-16 bg-[#EA5B37] rounded-bl-[100px] opacity-20"></div>
             <div className="relative z-10">
                <span className="text-sm font-medium uppercase tracking-widest block mb-2" style={{ color: '#9ca3af' }}>Estimated Total</span>
                <span className="text-4xl font-black text-[#EA5B37]">
                  ${totalEstimate ? totalEstimate.toLocaleString() : '0'}
                </span>
             </div>
          </div>
        </div>

        {/* Footer Disclaimer - Increased Visibility */}
        <div className="absolute bottom-[20mm] left-[20mm] right-[20mm] print:bottom-10 print:left-10 print:right-10 break-inside-avoid">
          <div className="border-l-4 border-[#1F67F1] p-6 rounded-r-xl" style={{ backgroundColor: '#F0F4FF' }}>
             <div className="flex items-start gap-3">
                <div className="text-[#1F67F1] mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <div>
                   <h4 className="font-bold text-[#1F67F1] text-sm uppercase mb-1">Please Note</h4>
                   <p className="text-sm text-[#252525] leading-relaxed font-medium">
                      This is a non-binding preliminary estimate; final pricing is subject to confirmed scope and technical requirements.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePDF;
