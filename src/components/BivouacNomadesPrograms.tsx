import React from 'react';
import ProgramsBrowser from '@/src/components/ProgramsBrowser';

interface BivouacNomadesProgramsProps {
  className?: string;
  onSelectProgram?: (program: any) => void;
}

export default function BivouacNomadesPrograms({ className }: BivouacNomadesProgramsProps) {
  return <ProgramsBrowser className={className} />;
}
