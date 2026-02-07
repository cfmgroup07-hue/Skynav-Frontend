/**
 * Ypsilon.Net API Test Utility
 * Tests API connection and shows what's needed
 */

const XML_USER = import.meta.env.VITE_YPSILON_XML_USER || 'crtfleetxml'
const XML_PASSWORD = import.meta.env.VITE_YPSILON_XML_PASSWORD || '5b3a4361dfc22f760d56a63e31f9aa9c'
const STANDARD_API_URL = 'http://stagingxml.infosys.de:10816'

/**
 * Test API connection
 */
export async function testAPIConnection() {
  console.log('🧪 [API Test] Testing Ypsilon.Net API Connection...')
  console.log('🧪 [API Test] Configuration:', {
    URL: STANDARD_API_URL,
    User: XML_USER,
    Password: XML_PASSWORD ? '***' : 'MISSING',
  })

  const testXML = `<?xml version="1.0" encoding="UTF-8"?>
<Request>
  <Header>
    <accessmode>agency</accessmode>
    <accessid>crtfleet crtfleetxml</accessid>
    <apiversion>3.92</apiversion>
    <username>${XML_USER}</username>
    <password>${XML_PASSWORD}</password>
  </Header>
  <Body>
    <FlightSearchRequest>
      <Origin>LHR</Origin>
      <Destination>JED</Destination>
      <DepartureDate>2025-01-15</DepartureDate>
      <Adults>1</Adults>
      <Children>0</Children>
      <Infants>0</Infants>
      <CabinClass>Economy</CabinClass>
    </FlightSearchRequest>
  </Body>
</Request>`

  try {
    console.log('🧪 [API Test] Sending test request...')
    const response = await fetch(STANDARD_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/xml',
        'Accept': 'application/xml',
      },
      body: testXML,
      mode: 'cors',
    })

    console.log('🧪 [API Test] Response Status:', response.status)
    const text = await response.text()
    console.log('🧪 [API Test] Response:', text.substring(0, 500))
    
    return {
      success: response.ok,
      status: response.status,
      response: text,
    }
  } catch (error) {
    console.error('🧪 [API Test] Error:', error)
    return {
      success: false,
      error: error.message,
      type: error.name,
    }
  }
}

