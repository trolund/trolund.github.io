'use client';

import Image from 'next/image';
import { VscCloudDownload } from 'react-icons/vsc';
import * as Cronitor from '@cronitorio/cronitor-rum';
import PostBody from './post-body';
import localImageLoader from 'services/image-loader-service';
import SocialLinks from './social-links';

type AboutHeroProps = {
  content: string;
};

const highlights = [
  {
    label: 'Experience',
    value: '3+ yrs',
    detail: 'Full-stack development in C#/.NET & React, TypeScript.',
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

export default function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-border-color bg-[var(--bg)] text-content-text shadow-custom">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(141,177,224,0.2),transparent_34%),radial-gradient(circle_at_96%_8%,rgba(170,92,233,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.3),transparent_38%)] dark:bg-[radial-gradient(circle_at_8%_0%,rgba(141,177,224,0.12),transparent_34%),radial-gradient(circle_at_96%_8%,rgba(170,92,233,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_40%)]" />
      <div className="relative grid gap-8 p-5 md:p-8 lg:grid-cols-[320px,1fr] lg:gap-12 lg:p-10">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="relative h-48 w-48 overflow-hidden rounded-[30px] border border-white/60 bg-white/60 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
            <Image
              loader={localImageLoader}
              src="/profil3.jpg"
              alt="Portrait of Troels Lund"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 192px, 240px"
              priority
            />
          </div>
          <div className="space-y-3">
            <p className="text-content-text/55 text-xs font-semibold uppercase tracking-[0.35em]">
              Software Engineer
            </p>
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-[2.8rem]">
              Troels Elsvad Lund
            </h2>
            <p className="text-content-text/72 text-pretty text-sm leading-7 md:text-base">
              Engineer combining product thinking, modern .NET platforms, and elegant frontend
              experiences to deliver resilient, user-centered systems.
            </p>
          </div>
          <dl className="grid w-full grid-cols-2 gap-4 text-left text-content-text">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="bg-white/72 hover:bg-white/86 min-w-0 rounded-[24px] border border-border-color p-4 text-sm shadow-[0_16px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-colors dark:bg-white/5 dark:hover:bg-white/10"
              >
                <dt className="text-content-text/55 text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
                  {item.label}
                </dt>
                <dd className="text-balance text-[clamp(1rem,2.1vw,1.3rem)] font-semibold leading-tight">
                  {item.value}
                </dd>
                <p className="text-content-text/68 mt-1 text-xs leading-5">{item.detail}</p>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-4">
            <a
              onClick={() => Cronitor.track('CVDownload')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-color bg-white/70 px-5 py-2 text-sm font-semibold uppercase tracking-[0.26em] text-content-text shadow-custom transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white/90 dark:bg-white/5 dark:hover:bg-white/10"
              href="/assets/Troels_Lund_CV_2025.pdf"
              aria-label="Download my CV"
            >
              <VscCloudDownload size={18} />
              CV
            </a>
            <SocialLinks
              iconSize={24}
              className="text-content-text/80"
              linkClassName="text-content-text/78 hover:text-content-text"
            />
          </div>
        </div>
        <div className="bg-white/74 rounded-[30px] border border-border-color p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:bg-white/5">
          <PostBody className="max-w-none" content={content} />
        </div>
      </div>
    </section>
  );
}
