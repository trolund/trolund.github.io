import { cn } from '../lib/utils';
import {
  FaAndroid,
  FaApple,
  FaBrain,
  FaBroadcastTower,
  FaCloud,
  FaCode,
  FaCodeBranch,
  FaCogs,
  FaCube,
  FaCubes,
  FaDatabase,
  FaDna,
  FaDocker,
  FaExchangeAlt,
  FaEye,
  FaFire,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJsSquare,
  FaMobileAlt,
  FaNetworkWired,
  FaNodeJs,
  FaProjectDiagram,
  FaPython,
  FaReact,
  FaServer,
  FaTerminal,
  FaCss3Alt,
} from 'react-icons/fa';

export interface ShipProps {
  value: string;
  className?: string;
  icon?: React.ReactNode;
}

function getIconForValue(value: string) {
  const v = value.toLowerCase();
  if (v.includes('react')) return <FaReact size={14} />;
  if (v.includes('next')) return <FaReact size={14} />;
  if (v.includes('typescript') || v === 'ts') return <FaCode size={14} />;
  if (v.includes('javascript') || v === 'js') return <FaJsSquare size={14} />;
  if (v.includes('node')) return <FaNodeJs size={14} />;
  if (v.includes('python')) return <FaPython size={14} />;
  if (v.includes('tailwind')) return <FaCss3Alt size={14} />;
  if (v.includes('postgres') || v.includes('sql') || v.includes('t-sql'))
    return <FaDatabase size={14} />;
  if (v.includes('mongo')) return <FaDatabase size={14} />;
  if (v.includes('docker')) return <FaDocker size={14} />;
  if (v.includes('firebase')) return <FaFire size={14} />;
  if (v.includes('vite')) return <FaCube size={14} />;
  if (v.includes('figma')) return <FaCubes size={14} />;
  if (v.includes('github')) return <FaGithub size={14} />;
  if (v.includes('git')) return <FaCodeBranch size={14} />;
  if (v.includes('ai') || v.includes('openai') || v.includes('llm')) return <FaBrain size={14} />;
  if (v.includes('mobile') || v.includes('ios') || v.includes('android')) {
    return v.includes('android') ? <FaAndroid size={14} /> : <FaMobileAlt size={13} />;
  }
  if (v.includes('swift')) return <FaApple size={14} />;
  if (v.includes('kotlin')) return <FaAndroid size={14} />;
  if (v.includes('java')) return <FaJava size={14} />;
  if (v === 'c' || v.includes('c#') || v.includes('f#')) return <FaCode size={14} />;
  if (v.includes('.net')) return <FaCubes size={14} />;
  if (v.includes('unity')) return <FaCube size={14} />;
  if (v.includes('arduino')) return <FaCogs size={14} />;
  if (v.includes('bash') || v.includes('shell') || v.includes('zsh'))
    return <FaTerminal size={14} />;
  if (v.includes('macos')) return <FaApple size={14} />;
  if (v.includes('selenium')) return <FaCogs size={14} />;
  if (v.includes('svg')) return <FaCode size={14} />;
  if (v.includes('css')) return <FaCss3Alt size={14} />;
  if (v.includes('html')) return <FaHtml5 size={14} />;
  if (v.includes('webassembly') || v === 'wat') return <FaCube size={14} />;
  if (v.includes('opencv')) return <FaEye size={14} />;
  if (v.includes('jquery')) return <FaJsSquare size={14} />;
  if (v.includes('risc-v') || v.includes('assembly')) return <FaCogs size={14} />;
  if (v.includes('rabbitmq')) return <FaServer size={14} />;
  if (v.includes('azure') || v.includes('signalr') || v.includes('bicep'))
    return <FaCloud size={14} />;
  if (v.includes('blazor')) return <FaCubes size={14} />;
  if (v.includes('pwa')) return <FaMobileAlt size={13} />;
  if (v.includes('ci/cd')) return <FaCogs size={14} />;
  if (v.includes('lua')) return <FaCode size={14} />;
  if (v.includes('soap')) return <FaBroadcastTower size={13} />;
  if (v.includes('rest')) return <FaExchangeAlt size={13} />;
  if (v.includes('simulation') || v.includes('tuple')) return <FaProjectDiagram size={13} />;
  if (v.includes('machine learning') || v === 'ai') return <FaBrain size={13} />;
  if (v.includes('genetic')) return <FaDna size={13} />;
  if (v.includes('compiler') || v.includes('compilers')) return <FaNetworkWired size={13} />;
  return null;
}

export default function Ship({ value, className, icon }: ShipProps) {
  const resolvedIcon = icon ?? getIconForValue(value);
  return (
    <span
      className={cn(
        'bg-(--footer) mb-1 mr-2 inline-flex h-8 grow-0 items-center gap-2 rounded-full border border-solid border-gray-800 border-opacity-25 px-3 py-1 text-[0.9rem] leading-none dark:border-gray-600 dark:bg-slate-950',
        className,
      )}
    >
      {resolvedIcon}
      {value}
    </span>
  );
}
