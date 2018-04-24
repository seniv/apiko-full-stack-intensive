const { argv } = require('yargs')
  .alias('a', 'address')
  .describe('a', 'forecast address')
  .string('a')
  .demandOption('address')

const { forecast, geocoding } = require('./methods')

async function forecastByGeocoding (address) {
  if (!address) throw(`Address can't be empty!`)
  
  const geo = await geocoding(address)
  if (!geo) throw ('Location not found!')
  const location = geo.geometry.location
  const formattedAddress = geo.formatted_address

  const forecastResponse = await forecast(location.lat, location.lng, 'si')
  const now = forecastResponse.currently
  
  console.log(`Weather in ${formattedAddress} right now:`)
  console.log(`Summary: ${now.summary}, Temperature: ${Math.round(now.temperature)}C`)
  console.log(`Humidity: ${now.humidity*100}%, Wind Speed: ${now.windSpeed}m/s`)
}
forecastByGeocoding (argv.address)
  .catch (err => console.error('Error:', err))
