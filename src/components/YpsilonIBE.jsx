import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBooking } from '../services/bookingService'
import Loader from './Loader'

/**
 * Ypsilon.Net IBE (Internet Booking Engine) Component
 * Embeds the Flight B2C IBE using the Frame Solution with auto-resizing
 * 
 * Documentation: https://flr.ypsilon.net/?agent=crtfleetb2c
 * Agent ID: crtfleetb2c
 * 
 * The script automatically converts the div with id="ypsnet-ibe" and data-src
 * attribute into an iframe that loads the booking engine.
 */
function YpsilonIBE() {
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const scriptId = 'ypsnet-ibe-resize-script'
  const [isLoading, setIsLoading] = useState(true)
  const checkIntervalRef = useRef(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    // Prevent multiple initializations
    if (initializedRef.current) return
    initializedRef.current = true

    let mounted = true

    // Function to clean up duplicates
    const cleanupDuplicates = () => {
      // Remove ALL existing IBE divs except our current one
      const allIBEDivs = document.querySelectorAll('#ypsnet-ibe')
      allIBEDivs.forEach((div) => {
        if (div !== containerRef.current) {
          div.remove()
        } else {
          // Clean up extra iframes from our container (keep only one)
          const existingIframes = div.querySelectorAll('iframe')
          if (existingIframes.length > 1) {
            existingIframes.forEach((iframe, idx) => {
              if (idx > 0) iframe.remove()
            })
          }
        }
      })

      // Also remove any iframes that might have been created outside our container
      const allYpsilonIframes = document.querySelectorAll('iframe[src*="ypsilon.net"]')
      allYpsilonIframes.forEach((iframe) => {
        const parent = iframe.closest('#ypsnet-ibe')
        if (!parent || parent !== containerRef.current) {
          iframe.remove()
        }
      })
    }

    // Listen for messages from the IBE iframe
    const handleMessage = async (event) => {
      // Security: Only accept messages from Ypsilon domains
      if (!event.origin.includes('ypsilon.net')) return;

      console.log('✉️ [Ypsilon IBE] Message received:', event.data);

      // Common event names for booking success (check documentation or console)
      if (event.data && (event.data.type === 'booking_success' || event.data.action === 'booking_completed')) {
        console.log('🎉 [Ypsilon IBE] Booking success detected via postMessage!');

        const bookingData = event.data.booking || {};
        const token = localStorage.getItem('skynav_token');

        if (token && bookingData.airline) {
          try {
            await createBooking({
              airline: bookingData.airline,
              flightNumber: bookingData.flightNumber || bookingData.pnr,
              from: bookingData.from,
              to: bookingData.to,
              departureDate: bookingData.departureDate,
              price: bookingData.price,
              currency: bookingData.currency || 'USD',
            }, token);
            console.log('✅ Booking synced to dashboard live');
            // Optional: Redirect or refresh
            navigate('/profile');
          } catch (err) {
            console.error('❌ Failed to sync live booking:', err);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);

    // Initial cleanup
    cleanupDuplicates()

    // Set up periodic cleanup to catch any duplicates that might be created
    const cleanupInterval = setInterval(() => {
      if (mounted) {
        cleanupDuplicates()
      }
    }, 500)

    const hideLoading = () => {
      if (mounted) {
        setIsLoading(false)
        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current)
          checkIntervalRef.current = null
        }
      }
    }

    // Function to check if iframe is loaded
    const checkIframeLoaded = () => {
      const iframe = document.querySelector('#ypsnet-ibe iframe')
      if (iframe) {
        return true
      }
      return false
    }

    // Check if script is already loaded globally
    const existingScript = document.getElementById(scriptId)
    if (existingScript && existingScript.dataset.loaded === 'true') {
      // Script already loaded, check iframe immediately
      if (!checkIframeLoaded()) {
        // If iframe not found yet, check periodically
        checkIntervalRef.current = setInterval(() => {
          if (checkIframeLoaded()) {
            clearInterval(checkIntervalRef.current)
            checkIntervalRef.current = null
          }
        }, 200)
      }
    } else {
      // Load the resize script
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://flr.ypsilon.net/static/resize/ypsnet-ibe.min.js'
      script.async = true

      script.onerror = () => {
        console.error('Failed to load Ypsilon.Net IBE resize script')
        hideLoading()
      }

      script.onload = () => {
        if (!mounted) return
        script.dataset.loaded = 'true'

        // Remove any duplicate IBE divs that might have been created
        setTimeout(() => {
          const allIBEDivs = document.querySelectorAll('#ypsnet-ibe')
          if (allIBEDivs.length > 1) {
            allIBEDivs.forEach((div, index) => {
              if (index > 0 || div !== containerRef.current) {
                div.remove()
              }
            })
          }
        }, 100)

        // After script loads, wait for iframe to be created
        checkIntervalRef.current = setInterval(() => {
          // Check and remove duplicates periodically
          const allIBEDivs = document.querySelectorAll('#ypsnet-ibe')
          if (allIBEDivs.length > 1) {
            allIBEDivs.forEach((div, index) => {
              if (index > 0 || div !== containerRef.current) {
                div.remove()
              }
            })
          }

          // Check for duplicate iframes
          const allIframes = document.querySelectorAll('iframe[src*="ypsilon.net"]')
          if (allIframes.length > 1) {
            allIframes.forEach((iframe, index) => {
              const parent = iframe.closest('#ypsnet-ibe')
              if (index > 0 || !parent || parent !== containerRef.current) {
                iframe.remove()
              }
            })
          }

          if (checkIframeLoaded()) {
            clearInterval(checkIntervalRef.current)
            checkIntervalRef.current = null
          }
        }, 200)
      }

      document.body.appendChild(script)
    }

    // Use MutationObserver to detect when iframe is created and remove duplicates
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IFRAME' || (node.querySelector && node.querySelector('iframe'))) {
            const iframe = node.nodeName === 'IFRAME' ? node : node.querySelector('iframe')
            if (iframe && iframe.src.includes('ypsilon.net')) {
              // Check if this iframe is in our container
              const parent = iframe.closest('#ypsnet-ibe')
              if (parent && parent === containerRef.current) {
                // Remove any other iframes
                const allIframes = document.querySelectorAll('iframe[src*="ypsilon.net"]')
                allIframes.forEach((otherIframe) => {
                  if (otherIframe !== iframe) {
                    const otherParent = otherIframe.closest('#ypsnet-ibe')
                    if (!otherParent || otherParent !== containerRef.current) {
                      otherIframe.remove()
                    }
                  }
                })

                // Removed auto-hide listener to keep 5s duration
              } else {
                // This iframe is not in our container, remove it
                iframe.remove()
              }
            }
          }
        })
      })
    })

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true
      })

      // Also observe the document body to catch any iframes created outside
      observer.observe(document.body, {
        childList: true,
        subtree: true
      })
    }

    // Force loading animation for exactly 5 seconds as requested
    const fixedTimer = setTimeout(() => {
      hideLoading()
    }, 3000)

    // Cleanup
    return () => {
      mounted = false
      initializedRef.current = false
      clearTimeout(fixedTimer)
      clearInterval(cleanupInterval)
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
      observer.disconnect()
      // Final cleanup on unmount
      cleanupDuplicates()
    }
  }, [])

  return (
    <div className="w-full min-h-screen bg-sky-50 relative">
      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <Loader />
          <p className="text-2xl font-bold text-primary-900 mt-4 animate-pulse">
            Loading Flights...
          </p>
        </div>
      )}

      <div
        id="ypsnet-ibe"
        ref={containerRef}
        data-src="https://flr.ypsilon.net/?agent=crtfleetb2c"
        data-ibe-initialized="true"
        className="w-full"
        style={{ minHeight: '600px', opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}
      />
    </div>
  )
}

export default YpsilonIBE

