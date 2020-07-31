export default function calculateChipColor(rating) {
  const colorClasses = [
    'teal darken-2',
    'red darken-3',
    'deep-orange darken-3',
    'deep-orange',
    'orange darken-2',
    'amber darken-2',
    'light-green darken-1',
    'light-green darken-1',
    'green',
    'green darken-1',
    'green darken-3'
  ]
  return colorClasses[Math.floor(rating)] + ' white--text'
}
