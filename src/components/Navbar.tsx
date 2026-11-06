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

    const links = document.querySelectorAll('.header ul a')
    links.forEach(elem => {
      const element = elem as HTMLAnchorElement
      element.addEventListener('click', e => {
        setMobileOpen(false)
        if (window.innerWidth > 1024) {
          e.preventDefault()
          const targetElem = e.currentTarget as HTMLAnchorElement
          const section = targetElem.getAttribute('data-href')
          getSmoother()?.scrollTo(section, true, 'top top')
        }
      })
    })
    window.addEventListener('resize', () => {
      ScrollSmoother.refresh(true)
    })
  }, [])

  return (
    <>
      <header
        id="site-header"
        className="header fixed left-1/2 top-0 z-[1000] flex w-[var(--cWidth)] max-w-[var(--cMaxWidth)] -translate-x-1/2 flex-wrap items-center justify-between gap-3 box-border -mb-[100px] px-0 py-4 lg:flex-nowrap lg:py-7"
      >
        {/* Brand */}
        <div className="flex shrink-0 items-center gap-4">
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
              className="custom-class"
              tilt={0}
              fontWeight={900}
              letterSpacing={0}
              startAngle={0}
              repeat={1}
              fill
              ring={false}
            />
          </div>
        </div>

        {/* Center email — desktop only */}
        <a
          href="mailto:abhishekg6889@gmail.com"
          className="navbar-connect absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[15px] font-medium tracking-[1px] min-[1200px]:block"
        >
          abhishek.nexgen.dev@gmail.com
        </a>

        {/* Links — inline on desktop, dropdown panel on mobile. No `!important`
            so `lg:flex` correctly overrides the mobile `hidden`. */}
        <ul
          className={`m-0 list-none p-0 text-[12px] lg:flex lg:flex-row lg:items-center lg:gap-[26px] lg:text-[14px] ${
            mobileOpen
              ? 'max-lg:flex max-lg:flex-col'
              : 'max-lg:hidden'
          } order-3 w-full flex-basis-full gap-1 rounded-2xl border border-white/10 bg-black/95 px-3 py-2 lg:order-none lg:w-auto lg:flex-basis-auto lg:border-0 lg:bg-transparent lg:p-0`}
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
        </ul>

        {/* Hamburger — mobile/tablet only */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="site-header"
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
      </header>

      {/* Ambient fixed layers — styled in Landing.css */}
      <div className="landing-circle1 pointer-events-none" aria-hidden="true" />
      <div className="landing-circle2 pointer-events-none" aria-hidden="true" />
      <div className="nav-fade pointer-events-none" aria-hidden="true" />

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </>
  )
}

export default Navbar
