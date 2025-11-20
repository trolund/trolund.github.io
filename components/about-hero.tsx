'use client';

import Image from 'next/image';
import { VscCloudDownload, VscGithubInverted } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';
import * as Cronitor from '@cronitorio/cronitor-rum';
import PostBody from './post-body';
import localImageLoader from 'services/image-loader-service';

type AboutHeroProps = {
  content: string;
};

const highlights = [
  {
    label: 'Experience',
    value: '4+ yrs',
    detail: 'Full-stack development in .NET & TypeScript.',
  },
  {
    label: 'Current Focus',
    value: 'Airport Ops',
    detail: 'Building SaaS products for airports at Copenhagen Optimization.',
  },
  {
    label: 'Location',
    value: 'Copenhagen, DK',
    detail: 'Working in Copenhagen, Denmark.',
  },
  {
    label: 'Toolbox',
    value: 'C#, .NET, React',
    detail: 'Cloud native apps with .NET, TypeScript & Azure.',
  },
];

function calculateAge(birthdate: string) {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
}

export default function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white shadow-[0_35px_60px_rgba(15,23,42,0.45)]">
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-white/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[140px]" />
      <div className="relative grid gap-10 p-4 md:p-8 lg:grid-cols-[320px,1fr] lg:gap-14 lg:p-12">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="relative h-48 w-48 overflow-hidden rounded-[28px] border border-white/25 shadow-[0_20px_45px_rgba(15,15,40,0.7)]">
            <Image
              loader={localImageLoader}
              src="/profil3.png"
              alt="Portrait of Troels Lund"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 192px, 240px"
              priority
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              Software Engineer
            </p>
            <h2 className="text-4xl font-semibold leading-tight">Troels Elsvad Lund</h2>
            <i className="text-white/80">
              {calculateAge('1994-10-06')} y/o engineer combining product thinking, modern .NET
              platforms, and elegant frontend experiences to deliver resilient, user-centered
              systems.
            </i>
          </div>
          <dl className="grid w-full grid-cols-2 gap-4 text-left text-white/90">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="min-w-0 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm backdrop-blur-lg transition hover:bg-white/10"
              >
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/60">
                  {item.label}
                </dt>
                <dd className="text-balance text-[clamp(1rem,2.1vw,1.3rem)] font-semibold leading-tight text-white">
                  {item.value}
                </dd>
                <p className="mt-1 text-xs text-white/70">{item.detail}</p>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-4">
            <a
              onClick={() => Cronitor.track('CVDownload')}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.26em] transition hover:bg-white/20"
              href="/assets/Troels_Lund_CV_2025.pdf"
              aria-label="Download my CV"
            >
              <VscCloudDownload size={18} />
              CV
            </a>
            <div className="flex items-center gap-4 text-white/80">
              <a
                className="transition hover:text-white"
                href="https://github.com/trolund"
                aria-label="Link to my GitHub profile"
              >
                <VscGithubInverted size={26} />
              </a>
              <a
                className="transition hover:text-white"
                href="https://www.linkedin.com/in/trolund/"
                aria-label="Link to my Linkedin profile"
              >
                <SiLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-6 shadow-[0_25px_65px_rgba(15,23,42,0.35)] backdrop-blur">
          <PostBody className="prose prose-invert max-w-none text-white/90" content={content} />
        </div>
      </div>
    </section>
  );
}
