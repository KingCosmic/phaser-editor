import React from 'react';
import Projects from '../components/Projects';

type Props = {
  setView(view: string): void;
};

export default function ProjectsPage({ setView }: Props) {
  return <Projects setView={setView} />;
}
