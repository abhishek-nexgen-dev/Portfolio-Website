import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HoverLinks from './HoverLinks'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import RecruiterModal from './RecruiterModal'
import CircularText from './CircularText'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
import { setSmoother, getSmoother } from '../context/smoother'

const NAV_LINKS = [
  { href: '#landingDiv', label: 'HOME' },
  { href: '#about', label: 'ABOUT' },
  { href: '#career', label: 'EXPERIENCE' },
  { href: '#work', label: 'WORK' },
  { href: '#skills', label: 'SKILLS' },
  { href: '#contact', label: 'CONTACT' },
]

const Navbar = () => {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Close mobile nav when resizing back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close on Escape for a11y
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  useEffect(() => {
    setSmoother(
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,
        speed: 1.0,
        effects: false,
        autoResize: true,
        ignoreMobileResize: true
      })
    )
    const smoother = getSmoother()

    smoother?.scrollTop(0)
    smoother?.paused(true)

    const links = Array.from(
      document.querySelectorAll('.header ul a')
    ) as HTMLAnchorElement[]
    const linkHandlers = links.map((element) => {
      const handler = (e: Event) => {
        setMobileOpen(false)
        if (window.innerWidth > 1024) {
          e.preventDefault()
          const targetElem = e.currentTarget as HTMLAnchorElement
          const section = targetElem.getAttribute('data-href')
          getSmoother()?.scrollTo(section, true, 'top top')
        }
      }
      element.addEventListener('click', handler)
      return { element, handler }
    })

    const onResize = () => {
      ScrollSmoother.refresh(true)
    }
    window.addEventListener('resize', onResize)

    return () => {
      linkHandlers.forEach(({ element, handler }) => {
        element.removeEventListener('click', handler)
      })
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <header
        id="site-header"
        className="header fixed left-1/2 top-0 z-[1000] flex w-[var(--cWidth)] max-w-[var(--cMaxWidth)] -translate-x-1/2 flex-wrap items-center justify-between gap-3 box-border -mb-[100px] px-0 py-4 lg:flex-nowrap lg:py-7"
      >
        {/* Brand */}
        <a
          href="#landingDiv"
          aria-label="Scroll to top"
          onClick={(e) => {
            setMobileOpen(false)
            if (window.innerWidth > 1024) {
              const smoother = getSmoother()
              if (smoother) {
                e.preventDefault()
                smoother.scrollTo('#landingDiv', true, 'top top')
              }
            }
          }}
          className="flex shrink-0 items-center gap-4 hover:text-inherit"
        >
          <div className="origin-left scale-[0.8] sm:scale-90 lg:scale-100">
            <CircularText
              text="AKG*AKG*AKG*"
              onHover="speedUp"
              direction="clockwise"
              spinDuration={20}
              size={60}
              fontSize={10}
              draggable
              hoverTilt={20}
              tilt={0}
              fontWeight={900}
              letterSpacing={0}
              startAngle={0}
              repeat={1}
              fill
              ring={false}
            />
          </div>
        </a>

        {/* Links — inline on desktop, dropdown panel on mobile. No `!important`
            so `lg:flex` correctly overrides the mobile `hidden`. */}
        <ul
          id="mobile-nav-menu"
          className={`m-0 list-none p-0 text-[12px] lg:flex lg:flex-row lg:items-center lg:gap-[26px] lg:text-[14px] ${
            mobileOpen
              ? 'max-lg:flex max-lg:flex-col'
              : 'max-lg:hidden'
          } order-3 w-full basis-full gap-1 rounded-2xl border border-white/10 bg-black/90 px-3 py-2 backdrop-blur-md lg:order-none lg:w-auto lg:basis-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none`}
        >
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className="cursor-pointer whitespace-nowrap rounded-lg px-2 py-2 text-left font-semibold tracking-[1px] text-[#ccc] transition-colors hover:text-[#FF6B00] lg:py-0 lg:text-center lg:text-white"
            >
              <a
                data-href={link.href}
                href={link.href}
                className="block w-full no-underline"
              >
                <HoverLinks text={link.label} />
              </a>
            </li>
          ))}
          <li className="pt-2 lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setIsRecruiterOpen(true);
              }}
              className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#CC5200] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_2px_10px_rgba(255,107,0,0.3)] cursor-pointer"
            >
              Recruiter Brief & Resume
            </button>
          </li>
        </ul>

        {/* Action Zone: Primary CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsRecruiterOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#FFB380] transition-all hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] hover:shadow-[0_0_16px_rgba(255,107,0,0.4)] cursor-pointer whitespace-nowrap"
            title="View Recruiter Executive Brief & Resume"
          >
            <span>Recruiter Brief</span>
          </button>

          {/* Hamburger — mobile/tablet only */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 cursor-pointer flex-col justify-center gap-[5px] rounded-[10px] border border-white/15 bg-white/5 p-[10px] backdrop-blur-md transition-colors hover:border-[#FF6B00] lg:hidden"
          >
            <span
              className={`block h-[2px] w-full rounded bg-white transition-transform duration-300 ${
                mobileOpen ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded bg-white transition-opacity duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded bg-white transition-transform duration-300 ${
                mobileOpen ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Ambient fixed layers */}
      <div
        className="landing-circle1 pointer-events-none fixed left-0 top-0 z-[var(--z-ambient)] h-[300px] w-[300px] rounded-full bg-[#FF6B00] opacity-25 blur-[60px] shadow-[inset_-50px_40px_50px_rgba(255,107,0,0.6)] animate-[loadingCircle_5s_linear_infinite]"
        aria-hidden="true"
      />
      <div
        className="landing-circle2 pointer-events-none fixed right-0 top-1/2 z-[var(--z-ambient)] hidden h-[300px] w-[300px] rounded-full bg-[#FF6B00] opacity-20 blur-[50px] shadow-[inset_-50px_40px_50px_rgba(255,107,0,0.6)] animate-[loadingCircle2_5s_linear_infinite]"
        aria-hidden="true"
      />
      <div
        className="nav-fade pointer-events-none fixed left-0 top-0 z-[var(--z-nav-fade)] h-[100px] w-full opacity-0 bg-[linear-gradient(0deg,transparent,rgba(0,0,0,0.86)_76%)]"
        aria-hidden="true"
      />

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </>
  )
}

export default Navbar
