import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HoverLinks from './HoverLinks'
import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'
import RecruiterModal from './RecruiterModal'
import './styles/Navbar.css'
import CircularText from './CircularText'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)
export let smoother: ScrollSmoother

const Navbar = () => {
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false)

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.8,
      speed: 1.0,
      effects: false,
      autoResize: true,
      ignoreMobileResize: true
    })

    smoother.scrollTop(0)
    smoother.paused(true)

    const links = document.querySelectorAll('.header ul a')
    links.forEach(elem => {
      const element = elem as HTMLAnchorElement
      element.addEventListener('click', e => {
        if (window.innerWidth > 1024) {
          e.preventDefault()
          const targetElem = e.currentTarget as HTMLAnchorElement
          const section = targetElem.getAttribute('data-href')
          smoother.scrollTo(section, true, 'top top')
        }
      })
    })
    window.addEventListener('resize', () => {
      ScrollSmoother.refresh(true)
    })
  }, [])

  return (
    <>
      <div className='header'>
        <div className='navbar-brand-wrap'>
          <CircularText
            text='AKG*AKG*AKG*'
            onHover='speedUp'
            direction='clockwise'
            spinDuration={20}
            size={60}
            fontSize={10}
            draggable
            hoverTilt={20}
            className='custom-class'
            tilt={0}
            fontWeight={900}
            letterSpacing={0}
            startAngle={0}
            repeat={1}
            fill
            ring={false}
          />
        </div>

        <a
          href='mailto:abhishekg6889@gmail.com'
          className='navbar-connect'
          data-cursor='disable'
        >
          abhishek.nexgen.dev@gmail.com
        </a>

        <ul>
          <li>
            <a data-href='#about' href='#about'>
              <HoverLinks text='ABOUT' />
            </a>
          </li>
          <li>
            <a data-href='#career' href='#career'>
              <HoverLinks text='EXPERIENCE' />
            </a>
          </li>
          <li>
            <a data-href='#work' href='#work'>
              <HoverLinks text='WORK' />
            </a>
          </li>
          <li>
            <a data-href='#skills' href='#skills'>
              <HoverLinks text='SKILLS' />
            </a>
          </li>
          <li>
            <a data-href='#gallery' href='#gallery'>
              <HoverLinks text='GALLERY' />
            </a>
          </li>
          <li>
            <a data-href='#testimonials' href='#testimonials'>
              <HoverLinks text='REVIEWS' />
            </a>
          </li>
          <li>
            <a data-href='#contact' href='#contact'>
              <HoverLinks text='CONTACT' />
            </a>
          </li>
        </ul>
      </div>

      <div className='landing-circle1'></div>
      <div className='landing-circle2'></div>
      <div className='nav-fade'></div>

      <RecruiterModal
        isOpen={isRecruiterOpen}
        onClose={() => setIsRecruiterOpen(false)}
      />
    </>
  )
}

export default Navbar
